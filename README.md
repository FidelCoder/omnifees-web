# OmniFees Web

Dashboard for tracking and syncing Omniston referral fees.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

The dashboard runs on `http://localhost:3000` and expects the API at `http://localhost:4000`.

## Environment

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Current Scope

- Lookup STON.fi DEX v2 referral fee vaults by referrer wallet.
- Sync results through the API into MongoDB.
- Show route coverage clearly, including external Omniston routes that need indexer/on-chain support.

## Backend

Use this with `omnifees-api`.
