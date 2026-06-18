import { useMemo, useState } from "react";
import { Search, RotateCw, Copy, Check, Info, ArrowUpRight, Layers, Database, Compass, AlertCircle } from "lucide-react";
import { getApiBaseUrl, type ReferralSnapshot, type ReferralSummary } from "../../lib/api";

interface WorkspaceViewProps {
  targetWallet: string;
  onTargetWalletChange: (wallet: string) => void;
  summary: ReferralSummary | null;
  snapshots: ReferralSnapshot[];
  snapshotNote: string;
  backendAction: "lookup" | "sync" | "history" | null;
  backendError: string;
  onLookup: (wallet: string) => Promise<void>;
  onSync: (wallet: string) => Promise<void>;
  onRefreshHistory: (wallet: string) => Promise<void>;
}

const exampleWallet = "EQCXSs2xZ2dhk9TAxzGzXra2EbG_S2SqyN8Tfi6fJ82EYiVj";

const shorten = (value?: string) => {
  if (!value) return "-";
  if (value.length <= 18) return value;
  return value.slice(0, 8) + "..." + value.slice(-6);
};

const formatDate = (value?: string) => {
  if (!value) return "-";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
};

export default function WorkspaceView({
  targetWallet,
  onTargetWalletChange,
  summary,
  snapshots,
  snapshotNote,
  backendAction,
  backendError,
  onLookup,
  onSync,
  onRefreshHistory
}: WorkspaceViewProps) {
  const [copiedText, setCopiedText] = useState(false);
  const [searchHistoryQuery, setSearchHistoryQuery] = useState("");

  const curlCommand = useMemo(() => {
    const target = targetWallet.trim() || exampleWallet;
    return "curl -X GET \"" + getApiBaseUrl() + "/api/referrers/" + encodeURIComponent(target) + "/summary\"";
  }, [targetWallet]);

  const filteredHistory = snapshots.filter((item) => {
    const query = searchHistoryQuery.toLowerCase();
    return item.wallet.toLowerCase().includes(query) || item.createdAt.toLowerCase().includes(query) || item.sources.some((source) => source.status.toLowerCase().includes(query) || source.name.toLowerCase().includes(query));
  });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(curlCommand);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-1.5 border-b border-surface-variant/20 pb-6">
        <div className="flex items-center gap-2 text-emerald-glow font-mono text-[10px] tracking-widest uppercase mb-1">
          <Layers className="w-4 h-4 text-emerald-glow" />
          <span>LIVE REFERRAL LOOKUP ENVIRONMENT</span>
        </div>
        <h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight">Integrator Workspace</h2>
        <p className="text-sm font-sans text-on-surface-variant/80 max-w-2xl leading-normal mt-0.5">
          Enter a TON referrer wallet, query the OmniFees API, and sync backend snapshots for STON.fi DEX v2 referral fee vaults.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-stretch">
          <div className="p-6 bg-surface-variant/15 border border-emerald-glow/10 rounded-xl relative overflow-hidden group flex flex-col">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-glow/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:scale-110 transition-transform duration-300" />

            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-[10px] text-on-surface-variant/70 uppercase tracking-widest">Backend Referral API</span>
              <Compass className="w-5 h-5 text-emerald-glow" />
            </div>

            <h3 className="font-headline text-lg font-semibold text-on-surface mb-2">Wallet Lookup</h3>
            <p className="text-xs text-on-surface-variant/90 font-sans mb-6 leading-relaxed">
              This form calls the deployed API at {getApiBaseUrl()} and returns live upstream source health plus normalized DEX v2 vault rows.
            </p>

            <div className="space-y-4 flex-1">
              <div>
                <label className="block font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2">TON Referrer Wallet</label>
                <input
                  type="text"
                  value={targetWallet}
                  onChange={(event) => onTargetWalletChange(event.target.value)}
                  placeholder="EQ..."
                  className="w-full bg-[#0B0F1A] border border-surface-variant rounded-lg px-4 py-3 font-mono text-xs text-emerald-glow focus:border-emerald-glow/50 focus:outline-none transition-all placeholder:text-on-surface-variant/40"
                />
              </div>

              <div>
                <span className="block font-mono text-[9px] text-on-surface-variant/60 uppercase mb-2 tracking-wider">Quick Query Option:</span>
                <button
                  type="button"
                  onClick={() => onTargetWalletChange(exampleWallet)}
                  className="w-full text-[10px] font-sans text-left px-2.5 py-1.5 rounded transition-all border bg-terminal-bg text-on-surface-variant border-surface-variant/40 hover:text-on-surface hover:border-surface-variant"
                >
                  <span className="block truncate font-mono">Example STON.fi referrer</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => onSync(targetWallet)}
                  disabled={backendAction !== null}
                  className="py-2.5 bg-emerald-glow hover:bg-primary-fixed-dim text-deep-slate font-mono text-[10px] font-bold uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RotateCw className={"w-3.5 h-3.5 " + (backendAction === "sync" ? "animate-spin" : "")} />
                  {backendAction === "sync" ? "Syncing..." : "Sync Node"}
                </button>
                <button
                  type="button"
                  onClick={() => onLookup(targetWallet)}
                  disabled={backendAction !== null}
                  className="py-2.5 bg-[#0B0F1A] border border-emerald-glow/30 hover:bg-[#0B0F1A]/50 text-emerald-glow font-mono text-[10px] font-bold uppercase rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  {backendAction === "lookup" ? "Loading" : "Lookup"} <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {backendError ? (
              <div className="mt-5 p-3 bg-red-950/30 border border-red-500/20 rounded-lg flex items-start gap-2.5 text-xs text-red-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{backendError}</span>
              </div>
            ) : null}

            <div className="mt-6 pt-4 border-t border-surface-variant/30 space-y-2">
              <span className="block font-mono text-[9px] text-on-surface-variant/60 uppercase tracking-widest pl-1">API Curl endpoint generator</span>
              <div className="bg-[#0B0F1A] border border-surface-variant/60 rounded-lg p-3 relative font-mono text-[11px]">
                <button onClick={handleCopy} className="absolute top-2 right-2 text-on-surface-variant hover:text-emerald-glow transition-all" title="Copy terminal command">
                  {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-glow" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <span className="text-emerald-glow font-bold block mb-1">GET /api/referrers/:wallet/summary</span>
                <pre className="text-on-surface-variant/90 leading-relaxed overflow-x-auto select-all pr-4 text-[10px] whitespace-pre-wrap">{curlCommand}</pre>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-surface-variant/15 border border-emerald-glow/10 rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-glow/5 rounded-full blur-2xl -mr-6 -mt-6" />
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] text-on-surface-variant/70 uppercase tracking-wider">DEX v2 Fee Vaults</span>
                <Database className="w-4 h-4 text-emerald-glow" />
              </div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-4xl font-mono font-bold text-emerald-glow tracking-tight">{summary?.totals.vaultCount ?? "-"}</span>
                <span className="text-xs font-mono text-on-surface-variant">Returned by backend</span>
              </div>
            </div>

            <div className="p-6 bg-surface-variant/15 border border-emerald-glow/10 rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-glow/5 rounded-full blur-2xl -mr-6 -mt-6" />
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] text-on-surface-variant/70 uppercase tracking-wider">Claimable Vaults</span>
                <span className={(summary ? "text-[#10B981] bg-[#10B981]/15" : "text-[#64748B] bg-[#64748B]/15") + " text-xs font-mono px-1.5 py-0.5 rounded font-bold uppercase"}>
                  {summary ? "LIVE" : "WAITING"}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-mono font-bold text-on-surface tracking-tight">{summary?.totals.claimableVaults ?? "-"}</span>
                <span className="text-xs font-mono text-on-surface-variant ml-1">{summary ? "vault signals" : "run lookup"}</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-surface-variant/15 border border-emerald-glow/10 rounded-xl flex flex-col relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="font-mono text-[10px] text-emerald-glow uppercase tracking-wider">BACKEND SNAPSHOT STORE</span>
                <h3 className="font-headline text-lg font-semibold text-on-surface mt-1">Snapshot History</h3>
              </div>
              <div className="relative max-w-xs w-full sm:w-64">
                <Search className="w-4 h-4 pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="text"
                  value={searchHistoryQuery}
                  onChange={(event) => setSearchHistoryQuery(event.target.value)}
                  placeholder="Search snapshot target..."
                  className="w-full bg-[#0B0F1A] border border-surface-variant rounded-lg py-2 pl-9 pr-4 font-mono text-xs text-on-surface focus:border-emerald-glow focus:outline-none transition-all placeholder:text-on-surface-variant/55"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-surface-variant/40 bg-[#0B0F1A]/50">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-surface-variant/30 border-b border-surface-variant/55 font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
                    <th className="py-3 px-6 font-semibold">Wallet</th>
                    <th className="py-3 px-6 font-semibold">Created</th>
                    <th className="py-3 px-6 font-semibold">Vaults</th>
                    <th className="py-3 px-6 font-semibold text-center">Source Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant/30 font-mono text-xs text-on-surface-variant">
                  {filteredHistory.length > 0 ? (
                    filteredHistory.map((item) => {
                      const sourceStatus = item.sources[0]?.status ?? "skipped";
                      return (
                        <tr key={item._id ?? item.createdAt} className="hover:bg-surface-variant/10 transition-colors">
                          <td className="py-4 px-6 text-on-surface font-semibold select-all" title={item.wallet}>{shorten(item.wallet)}</td>
                          <td className="py-4 px-6">{formatDate(item.createdAt)}</td>
                          <td className="py-4 px-6 text-emerald-glow font-semibold">{item.totals.vaultCount}</td>
                          <td className="py-4 px-6 text-center">
                            <span className={(sourceStatus === "ok" ? "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/20" : "bg-[#64748B]/15 text-[#64748B] border border-[#64748B]/20") + " inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"}>
                              <span className={(sourceStatus === "ok" ? "bg-[#10B981]" : "bg-[#64748B]") + " w-1.5 h-1.5 rounded-full"} />
                              {sourceStatus}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-on-surface-variant/50">
                        {snapshotNote || "No backend snapshots yet. Run Sync Node after a successful lookup."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between gap-3 mt-4 text-[11px] text-on-surface-variant/60 font-mono">
              <div className="flex items-center gap-2.5">
                <Info className="w-4 h-4 text-emerald-glow" />
                <span>Snapshots are read from /api/referrers/:wallet/snapshots.</span>
              </div>
              <button type="button" onClick={() => onRefreshHistory(targetWallet)} disabled={backendAction !== null} className="text-emerald-glow hover:text-primary-fixed-dim disabled:opacity-50">
                {backendAction === "history" ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

