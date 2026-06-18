import { Vault, HistoryEntry, DocPage } from "./types";

export const INITIAL_VAULTS: Vault[] = [
  {
    id: "v-ston-1",
    name: "STON.fi",
    protocol: "STON.fi",
    version: "DEX v2",
    assetPair: "TON / USDT",
    type: "Liquidity Pool Vault",
    tvl: 14200000,
    volume24h: 3100000,
    apy: 18.4,
    balance: 0.00,
    logoText: "SF",
    logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDpZJ2iczzv6iaO6crnxoLCEtr1ZvUsXJ2MyZh4P400ky6_4-yZDo5SfnfqB-ozFtNYmlpwwnkNZBn3YSEP7lAJp5f5ugPQbSdqahpGLbJo74bVv2PRPb98NYB1Z4mVBEZk7mQ9ql0vVqQaQrX7_QEkZZAA5SsbK3XdMNDWCbGewdUAl71mCBYJre2mDwUEcZAdCoqLi1psNLRZtwh3AYYjaxLO7_dfkCXnVU5xfnd6cP-NcuUNTAABJdViSjtUCzZRQ2hNfwP0w8",
    status: "Active"
  },
  {
    id: "v-dedust-1",
    name: "DeDust",
    protocol: "DeDust",
    version: "DEX v2",
    assetPair: "TON / USDC",
    type: "Liquidity Pool Vault",
    tvl: 8700000,
    volume24h: 1500000,
    apy: 14.2,
    balance: 1250.00,
    logoText: "DD",
    logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkEjD4itUd0F64bMAjATEYVIxL-D7WOL5F7P7KLpNlL6_7VyA58bzti09oY2wlRXBV09aSuO8IUhwQ0LgHL6xKD5REp4Kiy-QML_6eUndspLRHopOBzSdzPM4qz_dJHSw_jXJZInw5hQ8o-8f2jc2JQACp0y2uM41q1XLesNzHaOb1XJ0Va7lTbwo8T-2SVog7W1FgM8DQ416GM5Klsp0Jfl_M9MEQ90omj6XrtdOfkiZr8jk3C2kjN00pINlF4gWZ_xRo_ou291Q",
    status: "Active"
  },
  {
    id: "v-omnivault-1",
    name: "OmniVault",
    protocol: "OmniVault",
    version: "Auto-Compounder",
    assetPair: "USDT / USDC",
    type: "Stablecoin Strategy",
    tvl: 50000000, // target TVL cap
    volume24h: 0,
    apy: 8.5,
    balance: 0,
    logoText: "OV",
    status: "Planned"
  },
  {
    id: "v-tegro-1",
    name: "Tegro",
    protocol: "Tegro",
    version: "DEX v1",
    assetPair: "TON / USDT",
    type: "Liquidity Pool Vault",
    tvl: 4300000,
    volume24h: 900000,
    apy: 12.1,
    balance: 0.00,
    logoText: "TG",
    status: "Active"
  },
  {
    id: "v-ston-2",
    name: "STON.fi v1",
    protocol: "STON.fi",
    version: "DEX v1",
    assetPair: "TON / USDC",
    type: "Legacy LP Vault",
    tvl: 19400000,
    volume24h: 4800000,
    apy: 16.5,
    balance: 5400.00,
    logoText: "SF",
    logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDpZJ2iczzv6iaO6crnxoLCEtr1ZvUsXJ2MyZh4P400ky6_4-yZDo5SfnfqB-ozFtNYmlpwwnkNZBn3YSEP7lAJp5f5ugPQbSdqahpGLbJo74bVv2PRPb98NYB1Z4mVBEZk7mQ9ql0vVqQaQrX7_QEkZZAA5SsbK3XdMNDWCbGewdUAl71mCBYJre2mDwUEcZAdCoqLi1psNLRZtwh3AYYjaxLO7_dfkCXnVU5xfnd6cP-NcuUNTAABJdViSjtUCzZRQ2hNfwP0w8",
    status: "Active"
  },
  {
    id: "v-dedust-2",
    name: "DeDust Stable",
    protocol: "DeDust",
    version: "DEX v2",
    assetPair: "USDT / USDC",
    type: "Stable Asset Vault",
    tvl: 11200000,
    volume24h: 2100000,
    apy: 6.8,
    balance: 0.00,
    logoText: "DD",
    logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkEjD4itUd0F64bMAjATEYVIxL-D7WOL5F7P7KLpNlL6_7VyA58bzti09oY2wlRXBV09aSuO8IUhwQ0LgHL6xKD5REp4Kiy-QML_6eUndspLRHopOBzSdzPM4qz_dJHSw_jXJZInw5hQ8o-8f2jc2JQACp0y2uM41q1XLesNzHaOb1XJ0Va7lTbwo8T-2SVog7W1FgM8DQ416GM5Klsp0Jfl_M9MEQ90omj6XrtdOfkiZr8jk3C2kjN00pINlF4gWZ_xRo_ou291Q",
    status: "Active"
  }
];

export const INITIAL_HISTORY: HistoryEntry[] = [
  {
    id: "h1",
    target: "0x1a2...3b4C",
    timestamp: "2 mins ago",
    split: "80 / 20",
    status: "Synced"
  },
  {
    id: "h2",
    target: "0x9f8...7e6D",
    timestamp: "15 mins ago",
    split: "50 / 50",
    status: "Synced"
  },
  {
    id: "h3",
    target: "0x5c4...2a1B",
    timestamp: "1 hr ago",
    split: "None",
    status: "Queued"
  },
  {
    id: "h4",
    target: "0x3d2...1f0E",
    timestamp: "3 hrs ago",
    split: "90 / 10",
    status: "Synced"
  }
];

export const DOC_PAGES: DocPage[] = [
  {
    id: "intro",
    title: "Introduction",
    category: "Getting Started",
    intro: "OmniFees is an institutional routing fee middleware built for decentralized exchanges.",
    description: "Our API allows blockchain developers, telegram app bots, and wallet providers to integrate STON.fi, DeDust, and external Omniston routers while automatically tracking splitting fees, referral hierarchies, and claimable yields. Use this documentation to hook up your workspace directly with smart contract transactions.",
    codeSamples: {
      curl: `# Fetch general workspace protocol configuration\ncurl -X GET https://api.omnifees.dev/v1/intro \\\n  -H "Authorization: Bearer pk_live_YOUR_KEY"`,
      node: `// Import OmniFees SDK\nimport { OmniFees } from '@omnifees/sdk';\nconst omni = new OmniFees('sk_live_YOUR_KEY');\n\nconst metrics = await omni.metrics.getOverview();\nconsole.log("TVL:", metrics.tvl);`,
      python: `# Initialize python wrapper\nimport omnifees\nclient = omnifees.Client(api_key="sk_live_YOUR_KEY")\n\noverview = client.get_overview()\nprint(f"Total TVL Locked: {overview['tvl']}")`
    },
    responseSnippet: `{\n  "status": "success",\n  "data": {\n    "version": "2.4.1",\n    "environment": "production",\n    "active_routing_chains": ["TON"],\n    "supported_protocols": ["STON.fi DEX v2", "DeDust DEX v2"]\n  }\n}`
  },
  {
    id: "auth",
    title: "Authentication",
    category: "Getting Started",
    intro: "OmniFees uses API keys to authenticate requests. You can view mock API responses or request temporary tokens.",
    description: "All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail. Authenticate your API keys by providing your API key in the Authorization header.",
    endpoint: {
      method: "POST",
      url: "https://api.omnifees.dev/v1/auth/session"
    },
    parameters: [
      {
        name: "client_id",
        type: "string",
        required: true,
        description: "The unique identifier for your application environment, found in your coverage settings."
      },
      {
        name: "scopes",
        type: "array[string]",
        required: false,
        description: "List of permissions to grant this session. Valid options: 'vault:read', 'tx:write'. Defaults to ['vault:read'].",
        defaultValue: "['vault:read']"
      },
      {
        name: "expires_in",
        type: "integer",
        required: false,
        description: "Session duration in seconds. Maximum is 3600 (1 hour).",
        defaultValue: "3600"
      }
    ],
    codeSamples: {
      curl: `# Generate a session token\ncurl -X POST https://api.omnifees.dev/v1/auth/session \\\n  -H "Authorization: Bearer pk_live_YOUR_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "client_id": "app_9x2bM4",\n    "scopes": ["vault:read", "tx:write"],\n    "expires_in": 3600\n  }'`,
      node: `// Generate session for frontend client-side widgets\nimport { OmniFees } from '@omnifees/sdk';\nconst omni = new OmniFees('sk_live_YOUR_KEY');\n\nconst session = await omni.auth.createSession({\n  client_id: "app_9x2bM4",\n  scopes: ["vault:read", "tx:write"],\n  expires_in: 3600\n});\nconsole.log("Token:", session.token);`,
      python: `# Authenticate and request scoped session\nimport omnifees\nclient = omnifees.Client(api_key="sk_live_YOUR_KEY")\n\nsession = client.auth.create_session(\n    client_id="app_9x2bM4",\n    scopes=["vault:read", "tx:write"],\n    expires_in=3600\n)\nprint("Token is:", session["token"])`
    },
    responseSnippet: `{\n  "id": "sess_L9Kj2...",\n  "object": "session",\n  "token": "oft_1x89...",\n  "expires_at": 1709245800,\n  "livemode": true\n}`
  },
  {
    id: "limits",
    title: "Rate Limits",
    category: "Getting Started",
    intro: "Understand rate parameters and header limits to prevent API throttling.",
    description: "The OmniFees API has limit guidelines to ensure fair platform performance. Upgrades to higher tiers increase limits proportionately. Standard developer accounts allow up to 100 requests per minute.",
    codeSamples: {
      curl: `# Inspect limits headers on any lookup response\ncurl -I -X GET https://api.omnifees.dev/v1/lookup \\\n  -H "Authorization: Bearer pk_live_YOUR_KEY"`,
      node: `// Checks headers mapping on client requests\nimport { OmniFees } from '@omnifees/sdk';\nconst omni = new OmniFees('sk_live_YOUR_KEY');\n\nconst rates = await omni.limits.getRemaining();\nconsole.log(\`Remaining: \${rates.remaining} / \${rates.limit}\`);`,
      python: `# Python wrapper rates monitoring\nimport omnifees\nclient = omnifees.Client(api_key="sk_live_YOUR_KEY")\nrates = client.limits.get_rates()\nprint(f"IP Window resets in {rates['reset_seconds']}s")`
    },
    responseSnippet: `{\n  "limit": 100,\n  "remaining": 99,\n  "reset_in_seconds": 58,\n  "tier": "Developer Tier"\n}`
  },
  {
    id: "vaults",
    title: "Vaults API",
    category: "Core API",
    intro: "Fetch yield numbers, live TVL, and deposit balances directly for specific DEX routing points.",
    description: "Lookup current pools on STON.fi or DeDust with their respective volume and APYs. You can also monitor specific sub-vault contract addresses.",
    endpoint: {
      method: "GET",
      url: "https://api.omnifees.dev/v1/vaults"
    },
    parameters: [
      {
        name: "protocol",
        type: "string",
        required: false,
        description: "Filter vaults by protocol name (e.g., 'STON.fi', 'DeDust')."
      },
      {
        name: "min_apy",
        type: "float",
        required: false,
        description: "Only return vaults with an APY greater than or equal to this threshold."
      }
    ],
    codeSamples: {
      curl: `# Fetch active liquidity vaults with filters\ncurl -X GET "https://api.omnifees.dev/v1/vaults?protocol=STON.fi" \\\n  -H "Authorization: Bearer pk_live_YOUR_KEY"`,
      node: `// Fetch vaults from SDK\nimport { OmniFees } from '@omnifees/sdk';\nconst omni = new OmniFees('sk_live_YOUR_KEY');\n\nconst vaultsList = await omni.vaults.list({\n  protocol: 'STON.fi',\n  min_apy: 10.0\n});\nconsole.log("Found", vaultsList.length, "vaults");`,
      python: `# Python SDK request\nimport omnifees\nclient = omnifees.Client(api_key="sk_live_YOUR_KEY")\n\nvaults_list = client.vaults.list_active(protocol="STON.fi", min_apy=10.0)\nfor v in vaults_list:\n    print(f"{v['asset_pair']}: {v['apy']}%")`
    },
    responseSnippet: `{\n  "status": "success",\n  "data": [\n    {\n      "id": "v-ston-1",\n      "protocol": "STON.fi",\n      "asset_pair": "TON / USDT",\n      "tvl": "14,250,000.00",\n      "apy": 18.4,\n      "is_active": true\n    }\n  ]\n}`
  },
  {
    id: "transactions",
    title: "Transactions",
    category: "Core API",
    intro: "Retrieve audit trails and individual on-chain splitting fees.",
    description: "Every yield distribution and routing trade triggers an immutable fee claim. Use this endpoint to query network snapshots.",
    endpoint: {
      method: "GET",
      url: "https://api.omnifees.dev/v1/transactions"
    },
    parameters: [
      {
        name: "wallet_address",
        type: "string",
        required: true,
        description: "The on-chain wallet address of the search target."
      }
    ],
    codeSamples: {
      curl: `# Request split activity history\ncurl -X GET "https://api.omnifees.dev/v1/transactions?address=0x1a2...3b4C" \\\n  -H "Authorization: Bearer pk_live_YOUR_KEY"`,
      node: `import { OmniFees } from '@omnifees/sdk';\nconst omni = new OmniFees('sk_live_YOUR_KEY');\n\nconst history = await omni.transactions.getHistory({\n  wallet_address: '0x1a2...3b4C'\n});`,
      python: `import omnifees\nclient = omnifees.Client(api_key="sk_live_YOUR_KEY")\ntxs = client.transactions.get_history(address="0x1a2...3b4C")`
    },
    responseSnippet: `{\n  "status": "success",\n  "results_count": 1,\n  "data": [\n    {\n      "tx_hash": "tx_abc123...",\n      "timestamp": "2024-06-18T10:42:00Z",\n      "split_ratio": "80/20",\n      "status": "Synced"\n    }\n  ]\n}`
  },
  {
    id: "webhooks",
    title: "Webhooks",
    category: "Core API",
    intro: "Configure dynamic real-time event updates to listen for split confirmations.",
    description: "Configure callback listeners in your Integrator Workspace. OmniFees will POST JSON payloads whenever yield changes or a split finishes registering.",
    endpoint: {
      method: "POST",
      url: "https://api.omnifees.dev/v1/webhooks/subscribe"
    },
    parameters: [
      {
        name: "target_url",
        type: "string",
        required: true,
        description: "The HTTP endpoint in your platform where OmniFees should POST notification events."
      },
      {
        name: "events",
        type: "array[string]",
        required: true,
        description: "Subscribed events list. Valid: 'yield.claimed', 'split.registered'."
      }
    ],
    codeSamples: {
      curl: `# Register a new webhook target url\ncurl -X POST https://api.omnifees.dev/v1/webhooks/subscribe \\\n  -H "Authorization: Bearer pk_live_YOUR_KEY" \\\n  -d '{\n    "target_url": "https://callback.myplatform.com/events",\n    "events": ["yield.claimed"]\n  }'`,
      node: `// Subscribe webhook\nimport { OmniFees } from '@omnifees/sdk';\nconst omni = new OmniFees('sk_live_YOUR_KEY');\n\nconst sub = await omni.webhooks.subscribe({\n  target_url: 'https://callback.myplatform.com/events',\n  events: ['yield.claimed']\n});`,
      python: `# Python subscribe syntax\nimport omnifees\nclient = omnifees.Client(api_key="sk_live_YOUR_KEY")\n\nsub = client.webhooks.subscribe(\n    target_url="https://callback.myplatform.com/events",\n    events=["yield.claimed"]\n)`
    },
    responseSnippet: `{\n  "webhook_id": "wh_8x8bFh1",\n  "status": "enabled",\n  "events": ["yield.claimed"],\n  "target_url": "https://callback.myplatform.com/events"\n}`
  },
  {
    id: "nodesdk",
    title: "Node.js SDK",
    category: "Libraries",
    intro: "Official Node.js typescript-ready helper module for quick workspace automation.",
    description: "Learn how to fetch client sessions and sync data pools directly with low-latency async endpoints.",
    codeSamples: {
      curl: `# Node SDK is installed via standard npm package managers\nnpm install @omnifees/sdk`,
      node: `// Quickstart script\nimport { OmniFees } from '@omnifees/sdk';\n\nconst client = new OmniFees('sk_live_YOUR_API_KEY');\nconst activeVaults = await client.vaults.list();\n\nconsole.log(\`Currently tracking \${activeVaults.length} DEX routes.\`);`,
      python: `# Node.js SDK reference can only be initiated inside JS / TS runtimes.`
    },
    responseSnippet: `// SDK response structure matches JSON format\n[\n  { "id": "v-ston-1", "tvl": 14200000, "apy": 18.4 }\n]`
  },
  {
    id: "pythonsdk",
    title: "Python SDK",
    category: "Libraries",
    intro: "Official Python client package with automatic type-casting and rate-limiting handles.",
    description: "Integrate with Django, FastAPI, Flask, or Telegram bot plugins using synchronous and asynchronous python clients.",
    codeSamples: {
      curl: `# Python package is installed via pip\npip install omnifees-sdk`,
      node: `// Node.js does not run the Python SDK. Use npm package instead.`,
      python: `# Quickstart Python script\nfrom omnifees import OmniFeesClient\n\nclient = OmniFeesClient(api_key='sk_live_YOUR_API_KEY')\nvaults_info = client.vault_explorer()\n\nfor vault in vaults_info:\n    print(f"Pair: {vault.pair} | Current Yield: {vault.apy}%")`
    },
    responseSnippet: `# Python wrapper JSON-parsed response\n[\n  {"pair": "TON/USDT", "apy": 18.4, "status": "Active"}\n]`
  }
];
