export interface FeeVault {
  vaultAddress?: string;
  tokenAddress?: string;
  tokenSymbol?: string;
  balance?: string;
  claimable?: boolean;
  protocol: "stonfi-dex-v2";
  raw: Record<string, unknown>;
}

export interface ReferralSummary {
  wallet: string;
  updatedAt: string;
  totals: {
    vaultCount: number;
    claimableVaults: number;
  };
  coverage: Array<{
    protocol: string;
    status: "available" | "manual" | "planned";
    note: string;
  }>;
  vaults: FeeVault[];
  sources: Array<{
    name: string;
    url: string;
    status: "ok" | "error" | "skipped";
    detail?: string;
  }>;
  notes: string[];
  persisted?: boolean;
}

export interface ReferralSnapshot extends ReferralSummary {
  _id?: string;
  createdAt: string;
}

export interface ReferralSnapshotsResponse {
  wallet: string;
  snapshots: ReferralSnapshot[];
  note?: string;
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...init?.headers
    }
  });

  const text = await response.text();
  const payload = text ? (JSON.parse(text) as unknown) : null;

  if (!response.ok) {
    const message = payload && typeof payload === "object" && "error" in payload ? String(payload.error) : "Request failed";
    throw new Error(message);
  }

  return payload as T;
};

export const getReferralSummary = (wallet: string) => request<ReferralSummary>(`/api/referrers/${encodeURIComponent(wallet)}/summary`);

export const syncReferralSummary = (wallet: string) =>
  request<ReferralSummary>(`/api/referrers/${encodeURIComponent(wallet)}/sync`, {
    method: "POST"
  });

export const getReferralSnapshots = (wallet: string) => request<ReferralSnapshotsResponse>(`/api/referrers/${encodeURIComponent(wallet)}/snapshots`);

export const getApiBaseUrl = () => apiBaseUrl;
