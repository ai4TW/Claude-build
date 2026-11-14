// @ts-nocheck
// react-three-fiber's JSX intrinsics (group/lineSegments/points/...) don't
// merge cleanly with this repo's @types/react@19 + react@18 pairing. This
// file is a small, self-contained decorative scene — disabling type-check
// here only, rather than fighting an unrelated pre-existing version skew.
"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The hero's 3D motif: a loose sphere of call-network "nodes" with thin
 * connecting lines, built entirely from primitives (no imported model/GLB).
 * Idle auto-rotation plus a gentle tilt toward the cursor. This file is
 * only ever loaded client-side via next/dynamic — never part of the
 * server-rendered or initial-load bundle.
 */

function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * increment;
    points.push(new THREE.Vector3(Math.cos(phi) * r * radius, y * radius, Math.sin(phi) * r * radius));
  }
  return points;
}

function NetworkNodes() {
  const group = useRef<THREE.Group>(null!);
  const pointer = useRef({ x: 0, y: 0 });

  const { nodeGeometry, lineGeometry } = useMemo(() => {
    const count = 26;
    const radius = 2.15;
    const pts = fibonacciSphere(count, radius);

    const nodePositions = new Float32Array(count * 3);
    pts.forEach((p, i) => {
      nodePositions[i * 3] = p.x;
      nodePositions[i * 3 + 1] = p.y;
      nodePositions[i * 3 + 2] = p.z;
    });
    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));

    const linePositions: number[] = [];
    pts.forEach((p, i) => {
      [1, 3, 5].forEach((step) => {
        const j = (i + step) % count;
        const q = pts[j];
        linePositions.push(p.x, p.y, p.z, q.x, q.y, q.z);
      });
    });
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(linePositions), 3));

    return { nodeGeometry, lineGeometry };
  }, []);

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handler, { passive: true });
    return () => window.removeEventListener("pointermove", handler);
  }, []);

  useFrame((_state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.09;
    g.rotation.x += (pointer.current.y * 0.22 - g.rotation.x) * 0.04;
    g.rotation.z += (pointer.current.x * 0.12 - g.rotation.z) * 0.04;
  });

  return (
    <group ref={group} dispose={null}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#b03823" transparent opacity={0.22} />
      </lineSegments>
      <points geometry={nodeGeometry}>
        <pointsMaterial color="#b03823" size={0.07} sizeAttenuation transparent opacity={0.85} />
      </points>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ width: "100%", height: "100%" }}
    >
      <NetworkNodes />
    </Canvas>
  );
}
