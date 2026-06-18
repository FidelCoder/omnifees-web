"use client";

import { CheckCircle2, Clock3, Copy, Database, ExternalLink, History, Loader2, RefreshCw, Search, TriangleAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { getApiBaseUrl, getReferralSnapshots, getReferralSummary, syncReferralSummary, type ReferralSnapshot, type ReferralSummary } from "../lib/api";

const statusClass = {
  available: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  manual: "bg-amber-50 text-amber-800 ring-amber-200",
  planned: "bg-sky-50 text-sky-800 ring-sky-200",
  ok: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  error: "bg-red-50 text-red-700 ring-red-200",
  skipped: "bg-stone-100 text-stone-700 ring-stone-200"
};

const shorten = (value?: string) => {
  if (!value) {
    return "-";
  }

  if (value.length <= 18) {
    return value;
  }

  return `${value.slice(0, 8)}...${value.slice(-6)}`;
};

const formatDate = (value?: string) => {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
};

const exampleWallet = "EQCXSs2xZ2dhk9TAxzGzXra2EbG_S2SqyN8Tfi6fJ82EYiVj";

export function ReferralLookup() {
  const [wallet, setWallet] = useState("");
  const [summary, setSummary] = useState<ReferralSummary | null>(null);
  const [snapshots, setSnapshots] = useState<ReferralSnapshot[]>([]);
  const [snapshotNote, setSnapshotNote] = useState("");
  const [loading, setLoading] = useState<"lookup" | "sync" | "history" | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const curl = useMemo(() => {
    const target = wallet.trim() || exampleWallet;
    return `curl ${getApiBaseUrl()}/api/referrers/${encodeURIComponent(target)}/summary`;
  }, [wallet]);

  const loadSnapshots = async (target: string) => {
    const response = await getReferralSnapshots(target);
    setSnapshots(response.snapshots);
    setSnapshotNote(response.note ?? "");
  };

  const lookup = async () => {
    const target = wallet.trim();
    if (!target) {
      setError("Enter a TON referrer wallet.");
      return;
    }

    setLoading("lookup");
    setError("");

    try {
      setSummary(await getReferralSummary(target));
      await loadSnapshots(target);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Lookup failed.");
    } finally {
      setLoading(null);
    }
  };

  const sync = async () => {
    const target = wallet.trim();
    if (!target) {
      setError("Enter a TON referrer wallet.");
      return;
    }

    setLoading("sync");
    setError("");

    try {
      setSummary(await syncReferralSummary(target));
      await loadSnapshots(target);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Sync failed.");
    } finally {
      setLoading(null);
    }
  };

  const refreshHistory = async () => {
    const target = wallet.trim();
    if (!target) {
      setError("Enter a TON referrer wallet.");
      return;
    }

    setLoading("history");
    setError("");

    try {
      await loadSnapshots(target);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "History failed.");
    } finally {
      setLoading(null);
    }
  };

  const copyCurl = async () => {
    await navigator.clipboard.writeText(curl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 pb-10 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)] lg:px-8">
      <div className="rounded-lg border border-line bg-white p-5 shadow-soft sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-ink text-white">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-mint">Integrator workspace</p>
            <h2 className="text-xl font-semibold text-ink">Referral wallet lookup</h2>
          </div>
        </div>

        <label className="text-sm font-medium text-stone-700" htmlFor="wallet">
          Referrer wallet
        </label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input
            id="wallet"
            value={wallet}
            onChange={(event) => setWallet(event.target.value)}
            placeholder="EQ..."
            className="min-h-12 flex-1 rounded-lg border border-line bg-paper px-4 text-sm outline-none transition focus:border-mint focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
          <button
            type="button"
            onClick={lookup}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-ink px-4 text-sm font-semibold text-white transition hover:bg-mint disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading !== null}
          >
            {loading === "lookup" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Lookup
          </button>
          <button
            type="button"
            onClick={sync}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-line bg-white px-4 text-sm font-semibold text-ink transition hover:border-mint hover:text-mint disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading !== null}
          >
            {loading === "sync" ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Sync
          </button>
        </div>

        {error ? (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        ) : null}

        <div className="mt-5 rounded-lg border border-line bg-paper p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-ink">API request</p>
            <button
              type="button"
              onClick={copyCurl}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-ink transition hover:border-mint hover:text-mint"
              aria-label="Copy API request"
              title="Copy API request"
            >
              {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
          <code className="mt-3 block overflow-x-auto whitespace-nowrap rounded-md bg-white px-3 py-2 text-xs text-stone-700">{curl}</code>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-line bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Vaults</p>
            <p className="mt-2 text-3xl font-semibold text-ink">{summary?.totals.vaultCount ?? "-"}</p>
          </div>
          <div className="rounded-lg border border-line bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Claimable</p>
            <p className="mt-2 text-3xl font-semibold text-ink">{summary?.totals.claimableVaults ?? "-"}</p>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-line bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-ink">Snapshot history</p>
              <p className="mt-1 text-xs text-stone-500">Latest 20 Mongo sync results</p>
            </div>
            <button
              type="button"
              onClick={refreshHistory}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-ink transition hover:border-mint hover:text-mint disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading !== null}
              aria-label="Refresh history"
              title="Refresh history"
            >
              {loading === "history" ? <Loader2 className="h-4 w-4 animate-spin" /> : <History className="h-4 w-4" />}
            </button>
          </div>
          <div className="mt-3 space-y-2">
            {snapshots.length ? (
              snapshots.slice(0, 5).map((snapshot) => (
                <button
                  type="button"
                  key={snapshot._id ?? snapshot.createdAt}
                  onClick={() => setSummary(snapshot)}
                  className="grid w-full grid-cols-[1fr_auto] gap-3 rounded-lg border border-line bg-paper p-3 text-left transition hover:border-mint"
                >
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 text-sm font-medium text-ink">
                      <Clock3 className="h-4 w-4 shrink-0 text-mint" />
                      {formatDate(snapshot.createdAt)}
                    </span>
                    <span className="mt-1 block truncate text-xs text-stone-500">{shorten(snapshot.wallet)}</span>
                  </span>
                  <span className="text-right text-sm font-semibold text-ink">{snapshot.totals.vaultCount}</span>
                </button>
              ))
            ) : (
              <p className="rounded-lg border border-line bg-paper p-3 text-sm text-stone-500">{snapshotNote || "Synced snapshots appear here."}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-lg border border-line bg-white p-5 shadow-soft sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-mint">Coverage</p>
              <h2 className="text-xl font-semibold text-ink">Route support</h2>
            </div>
            {summary?.persisted ? <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">Saved</span> : null}
          </div>

          <div className="mt-4 space-y-3">
            {(summary?.coverage ?? [
              {
                protocol: "STON.fi DEX v2",
                status: "available" as const,
                note: "Ready through the public fee vault endpoint."
              },
              {
                protocol: "External Omniston routes",
                status: "planned" as const,
                note: "Requires on-chain/indexer coverage."
              }
            ]).map((item) => (
              <div key={item.protocol} className="rounded-lg border border-line bg-paper p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-ink">{item.protocol}</p>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClass[item.status]}`}>{item.status}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-stone-600">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-line bg-white p-5 shadow-soft sm:p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-mint">Vaults</p>
              <h2 className="text-xl font-semibold text-ink">DEX v2 results</h2>
            </div>
            <a
              href="https://sdk-demo-app.ston.fi/vault"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-ink transition hover:border-mint hover:text-mint"
              aria-label="Open STON.fi vault demo"
              title="Open STON.fi vault demo"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="overflow-hidden rounded-lg border border-line">
            <div className="grid grid-cols-[1.1fr_0.9fr_0.8fr] bg-paper px-3 py-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
              <span>Vault</span>
              <span>Token</span>
              <span>Balance</span>
            </div>
            {summary?.vaults.length ? (
              summary.vaults.map((vault, index) => (
                <div key={`${vault.vaultAddress ?? "vault"}-${index}`} className="grid grid-cols-[1.1fr_0.9fr_0.8fr] border-t border-line px-3 py-3 text-sm text-stone-700">
                  <span className="truncate font-medium text-ink" title={vault.vaultAddress}>{shorten(vault.vaultAddress)}</span>
                  <span className="truncate" title={vault.tokenAddress}>{vault.tokenSymbol || shorten(vault.tokenAddress)}</span>
                  <span className="truncate">{vault.balance ?? "-"}</span>
                </div>
              ))
            ) : (
              <div className="border-t border-line px-3 py-8 text-center text-sm text-stone-500">
                {summary ? "No DEX v2 fee vaults returned for this referrer." : "Run a lookup to load vault data."}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-line bg-white p-5 shadow-soft sm:p-6">
          <p className="text-sm font-semibold text-mint">Source health</p>
          <div className="mt-3 space-y-2">
            {(summary?.sources ?? []).map((source) => (
              <div key={source.url} className="rounded-lg border border-line bg-paper p-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium text-ink">{source.name}</span>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusClass[source.status]}`}>{source.status}</span>
                </div>
                <p className="mt-2 break-all text-xs text-stone-500">{source.url}</p>
                {source.detail ? <p className="mt-2 text-xs text-red-700">{source.detail}</p> : null}
              </div>
            ))}
            {!summary ? <p className="text-sm text-stone-500">Source checks appear after lookup.</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
