export interface Vault {
  id: string;
  name: string;
  protocol: string;
  version: string;
  assetPair: string;
  type: string;
  tvl: number;
  volume24h: number;
  apy: number;
  balance: number;
  logoUrl?: string;
  logoText?: string;
  status: "Active" | "Planned";
}

export interface HistoryEntry {
  id: string;
  target: string;
  timestamp: string;
  split: string;
  status: "Synced" | "Queued" | "Failed";
}

export interface DocPage {
  id: string;
  title: string;
  category: string;
  intro: string;
  description: string;
  endpoint?: {
    method: "POST" | "GET" | "PUT" | "DELETE";
    url: string;
  };
  parameters?: {
    name: string;
    type: string;
    required: boolean;
    description: string;
    defaultValue?: string;
  }[];
  codeSamples: {
    curl: string;
    node: string;
    python: string;
  };
  responseSnippet?: string;
}

export interface WalletState {
  connected: boolean;
  address: string | null;
  name: string | null;
  balanceTON: number;
  balanceUSDC: number;
}
