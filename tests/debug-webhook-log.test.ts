/**
 * The debug webhook log route is not part of the product. Nothing in the app
 * reads it; call handling logs straight to the database from the Trillet
 * webhook. Unauthenticated HTTP requests must not receive stored payloads.
 */

import assert from "node:assert/strict";
import { spawn, type ChildProcess } from "node:child_process";
import { access, readdir, readFile } from "node:fs/promises";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const ROUTE_PATH = "/api/debug/webhook-log";
const ROUTE_FILE = path.join(ROOT, "app/api/debug/webhook-log/route.ts");
const PROBE = "WEBHOOK_LOG_SECRET_PROBE";
const PROBE_PHONE = "+15555550199";

const SOURCE_DIRS = ["app", "components", "lib", "integrations", "scripts"];

function assertNoWebhookData(status: number, body: string, label: string): void {
  assert.equal(status, 404, `${label}: expected 404, got ${status}`);
  assert.equal(body.includes(PROBE), false, `${label}: response included the posted probe`);
  assert.equal(body.includes(PROBE_PHONE), false, `${label}: response included the posted phone number`);
  assert.equal(body.includes("webhook_debug_log"), false, `${label}: response named the log table`);
  assert.equal(/"logs"\s*:/.test(body), false, `${label}: response included a logs payload`);
}

async function fileExists(file: string): Promise<boolean> {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function sourceFiles(dir: string): Promise<string[]> {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await sourceFiles(full)));
      continue;
    }
    if (/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(entry.name)) files.push(full);
  }
  return files;
}

type RouteHandlers = {
  GET?: (request: Request) => Promise<Response> | Response;
  POST?: (request: Request) => Promise<Response> | Response;
};

async function unauthenticatedResponse(method: "GET" | "POST", rawBody?: string): Promise<Response> {
  if (!(await fileExists(ROUTE_FILE))) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const mod = (await import(pathToFileURL(ROUTE_FILE).href)) as RouteHandlers;
  const handler = mod[method];
  if (typeof handler !== "function") {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return handler(
    new Request(`http://127.0.0.1${ROUTE_PATH}`, {
      method,
      headers: { "content-type": "application/json" },
      body: rawBody,
    }),
  );
}

function listen(handler: (req: import("node:http").IncomingMessage, res: import("node:http").ServerResponse) => Promise<void>): Promise<{ server: Server; port: number }> {
  const server = createServer((req, res) => {
    handler(req, res).catch((error: unknown) => {
      res.writeHead(500, { "content-type": "text/plain" });
      res.end(error instanceof Error ? error.message : "request failed");
    });
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address() as AddressInfo;
      resolve({ server, port: address.port });
    });
  });
}

function closeServer(server: Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}

async function httpRequest(port: number, method: "GET" | "POST"): Promise<{ status: number; body: string }> {
  const response = await fetch(`http://127.0.0.1:${port}${ROUTE_PATH}`, {
    method,
    redirect: "manual",
    headers: { "content-type": "application/json", accept: "application/json" },
    body:
      method === "POST"
        ? JSON.stringify({ callerNumber: PROBE_PHONE, transcript: PROBE })
        : undefined,
  });
  return { status: response.status, body: await response.text() };
}

function safeServerEnv(): NodeJS.ProcessEnv {
  return {
    PATH: process.env.PATH ?? "",
    HOME: process.env.HOME ?? "",
    TMPDIR: process.env.TMPDIR ?? "/tmp",
    LANG: process.env.LANG ?? "C.UTF-8",
    NODE_ENV: "production",
    NEXT_TELEMETRY_DISABLED: "1",
    HOSTNAME: "127.0.0.1",
    NEXT_PUBLIC_APP_URL: "http://127.0.0.1",
    SUPABASE_URL: "",
    SUPABASE_ANON_KEY: "",
    SUPABASE_SERVICE_ROLE_KEY: "",
    STRIPE_SECRET_KEY: "",
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: "",
    STRIPE_WEBHOOK_SECRET: "",
    RESEND_API_KEY: "",
    TRILLET_API_KEY: "",
    TRILLET_WORKSPACE_ID: "",
    ANTHROPIC_API_KEY: "",
    SESSION_SECRET: "",
    DEBUG_WEBHOOK_LOG_SECRET: "",
    NEXT_PUBLIC_META_PIXEL_ID: "",
  };
}

async function stopProcess(child: ChildProcess): Promise<void> {
  if (child.exitCode !== null || child.signalCode !== null) return;
  child.kill("SIGTERM");
  await new Promise<void>((resolve) => {
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      resolve();
    }, 5_000);
    child.once("exit", () => {
      clearTimeout(timer);
      resolve();
    });
  });
}

test("unauthenticated /api/debug/webhook-log requests get no webhook data", async () => {
  const references: string[] = [];
  for (const dir of SOURCE_DIRS) {
    for (const file of await sourceFiles(path.join(ROOT, dir))) {
      const text = await readFile(file, "utf8");
      if (text.includes(ROUTE_PATH)) references.push(path.relative(ROOT, file));
    }
  }
  assert.deepEqual(references, [], "application code still references the debug webhook log route");

  const { server, port } = await listen(async (req, res) => {
    const method = req.method === "POST" ? "POST" : "GET";
    const chunks: Buffer[] = [];
    for await (const chunk of req) chunks.push(chunk as Buffer);
    const rawBody = Buffer.concat(chunks).toString("utf8");
    const response = await unauthenticatedResponse(method, method === "POST" ? rawBody : undefined);
    const body = Buffer.from(await response.arrayBuffer());
    const headers: Record<string, string> = {};
    const contentType = response.headers.get("content-type");
    if (contentType) headers["content-type"] = contentType;
    res.writeHead(response.status, headers);
    res.end(body);
  });

  try {
    for (const method of ["GET", "POST"] as const) {
      const result = await httpRequest(port, method);
      assertNoWebhookData(result.status, result.body, method);
    }
  } finally {
    await closeServer(server);
  }

  if (!(await fileExists(path.join(ROOT, ".next", "BUILD_ID")))) return;
  if (!(await fileExists(path.join(ROOT, "node_modules", "next", "dist", "bin", "next")))) return;

  const nextPort = await new Promise<number>((resolve, reject) => {
    const probe = createServer();
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const address = probe.address() as AddressInfo;
      probe.close(() => resolve(address.port));
    });
  });

  const child = spawn(
    process.execPath,
    [
      path.join(ROOT, "node_modules", "next", "dist", "bin", "next"),
      "start",
      "--hostname",
      "127.0.0.1",
      "--port",
      String(nextPort),
    ],
    { cwd: ROOT, env: safeServerEnv(), stdio: ["ignore", "pipe", "pipe"] },
  );

  let logs = "";
  child.stdout?.on("data", (chunk: Buffer) => {
    logs += chunk.toString("utf8");
  });
  child.stderr?.on("data", (chunk: Buffer) => {
    logs += chunk.toString("utf8");
  });

  try {
    const deadline = Date.now() + 45_000;
    let ready = false;
    while (Date.now() < deadline) {
      if (child.exitCode !== null) {
        throw new Error(`next start exited ${child.exitCode}\n${logs}`);
      }
      try {
        const result = await httpRequest(nextPort, "GET");
        assertNoWebhookData(result.status, result.body, "production GET");
        ready = true;
        break;
      } catch (error) {
        const code = error && typeof error === "object" && "cause" in error ? (error.cause as { code?: string }).code : undefined;
        const refused = code === "ECONNREFUSED" || (error instanceof Error && /ECONNREFUSED|fetch failed/i.test(error.message));
        if (!refused && error instanceof assert.AssertionError) throw error;
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    }
    assert.equal(ready, true, `production server did not accept a request\n${logs}`);

    const posted = await httpRequest(nextPort, "POST");
    assertNoWebhookData(posted.status, posted.body, "production POST");
  } finally {
    await stopProcess(child);
  }
});
