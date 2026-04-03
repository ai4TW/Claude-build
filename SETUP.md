# RealtyVoice AI — Setup Guide

## Step 1: Set your API keys (SECURE method — no pasting in chat)

Open your terminal and run:
```bash
cd "/Users/bmyer/Documents/Claude Build/realty-receptionist"
cp .env.example .env
```

Then open `.env` and fill in:
- `ANTHROPIC_API_KEY` — your Claude API key (from console.anthropic.com)
- `TRILLET_API_KEY` — from Trillet dashboard (need Agency plan for white-label)

## Step 2: Install dependencies

```bash
cd "/Users/bmyer/Documents/Claude Build/realty-receptionist"
export PATH=$PATH:/usr/local/bin
npm install
```

## Step 3: Initialize Paperclip

```bash
export PATH=$PATH:/usr/local/bin
npx paperclipai onboard --yes
```

This opens a browser dashboard. Import the agent configs from `/agents/*.yaml`.

## Step 4: Test the onboarding pipeline (dry run)

```bash
node scripts/create-client.js \
  --name "Sarah Johnson" \
  --brokerage "Compass Realty" \
  --email "sarah@test.com" \
  --website "https://compass.com" \
  --dry-run
```

## Step 5: Run your first real client onboarding

```bash
node scripts/create-client.js \
  --name "Client Name" \
  --brokerage "Their Brokerage" \
  --email "client@email.com" \
  --website "https://theirwebsite.com"
```

## What Gets Built Next (Week 1 Sprint)
See shared-workspace/WEEK1_SPRINT.md

## Architecture
```
realty-receptionist/
├── agents/              # Paperclip agent role definitions
│   ├── ceo.yaml
│   ├── cto.yaml
│   ├── sales.yaml
│   ├── client-success.yaml
│   └── content.yaml
├── integrations/        # API integration modules
│   ├── trillet.js       # Trillet AI REST API
│   └── claude-personas.js  # Claude API for custom scripts
├── scripts/             # Runnable automation scripts
│   └── create-client.js # Full client onboarding in one command
├── shared-workspace/    # Paperclip agent shared memory
│   ├── COMPANY_BRIEF.md
│   └── WEEK1_SPRINT.md
├── paperclip.config.js  # Paperclip orchestration config
├── package.json
└── .env.example
```
