import { useState } from "react";
import { Shield, Sparkles, SlidersHorizontal, Search, Info } from "lucide-react";
import type { ReferralSummary } from "../../lib/api";

interface CoverageViewProps {
  summary: ReferralSummary | null;
  targetWallet: string;
  backendAction: "lookup" | "sync" | "history" | null;
}

const statusStyles = {
  available: "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/20",
  manual: "bg-[#f59e0b]/15 text-[#fbbf24] border border-[#f59e0b]/20",
  planned: "bg-[#64748B]/15 text-[#94a3b8] border border-[#64748B]/20"
};

const sourceStyles = {
  ok: "bg-[#10B981] shadow-[0_0_8px_#10B981]",
  error: "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]",
  skipped: "bg-[#64748B] shadow-[0_0_6px_#64748B]"
};

const fallbackCoverage: ReferralSummary["coverage"] = [
  {
    protocol: "STON.fi DEX v2",
    status: "available",
    note: "Run a wallet lookup to verify live source health and vault results."
  },
  {
    protocol: "STON.fi DEX v1",
    status: "manual",
    note: "Fees are paid directly in swap transactions, so vault discovery does not apply."
  },
  {
    protocol: "DeDust / Tonco / Escrow via Omniston",
    status: "planned",
    note: "External Omniston routes require on-chain/indexer coverage."
  }
];

export default function CoverageView({ summary, targetWallet, backendAction }: CoverageViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const coverage = summary?.coverage ?? fallbackCoverage;
  const source = summary?.sources[0];
  const rows = coverage.filter((row) => row.protocol.toLowerCase().includes(searchQuery.toLowerCase()) || row.status.toLowerCase().includes(searchQuery.toLowerCase()) || row.note.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-1.5 border-b border-surface-variant/20 pb-6">
        <div className="flex items-center gap-2 text-emerald-glow font-mono text-[10px] tracking-widest uppercase mb-1">
          <Shield className="w-4 h-4 text-emerald-glow" />
          <span>ROUTE SUPPORT & LIVE BACKEND COVERAGE</span>
        </div>
        <h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight">Route Support</h2>
        <p className="text-sm font-sans text-on-surface-variant/80 max-w-2xl leading-normal mt-0.5">
          Coverage states come from the referral summary endpoint for {summary ? summary.wallet : targetWallet || "the selected wallet"}.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-4 flex flex-col gap-6">
          <div className="p-7 bg-gradient-to-br from-[#0c150f] to-[#141e17] border border-emerald-glow/20 rounded-2xl relative overflow-hidden group shadow-[0_0_20px_-5px_rgba(0,255,163,0.15)]">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-glow/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none transition-transform group-hover:scale-110 duration-300" />
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <span className="font-mono text-[10px] text-on-surface-variant/70 tracking-widest uppercase block mb-1">Primary Protocol</span>
                <h3 className="font-headline text-2xl font-bold text-on-surface">STON.fi DEX v2</h3>
              </div>
              <div className="p-2.5 bg-emerald-glow/10 border border-emerald-glow/20 text-emerald-glow rounded-lg">
                <Sparkles className="w-5 h-5 text-emerald-glow animate-pulse" />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-8">
              <div className="relative flex h-3.5 w-3.5">
                {source?.status === "ok" ? <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span> : null}
                <span className={(source ? sourceStyles[source.status] : "bg-[#64748B] shadow-[0_0_6px_#64748B]") + " relative inline-flex rounded-full h-3.5 w-3.5"}></span>
              </div>
              <span className="font-mono text-[11px] text-[#10B981] uppercase tracking-widest font-bold">
                {source ? source.status : backendAction ? "Loading" : "Awaiting Lookup"}
              </span>
            </div>
            <div className="mt-8 pt-5 border-t border-surface-variant/30 flex justify-between items-center text-sm font-medium text-on-surface-variant">
              <span>Vaults Returned</span>
              <span className="font-mono text-[11px] font-bold text-emerald-glow bg-emerald-glow/15 px-2.5 py-1 rounded">
                {summary?.totals.vaultCount ?? "-"}
              </span>
            </div>
          </div>

          <div className="p-7 bg-[#141e17]/40 border border-surface-variant/40 rounded-2xl relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <span className="font-mono text-[10px] text-on-surface-variant/60 tracking-widest uppercase block mb-1">Backend Source</span>
                <h3 className="font-headline text-xl font-medium text-on-surface-variant/90">{source?.name ?? "No source loaded"}</h3>
              </div>
              <div className="p-2.5 bg-surface-variant/30 border border-surface-variant/50 text-on-surface-variant">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-8">
              <div className={(source ? sourceStyles[source.status] : "bg-[#64748B] shadow-[0_0_6px_#64748B]") + " w-2.5 h-2.5 rounded-full"} />
              <span className="font-mono text-[11px] text-[#64748B] uppercase tracking-widest font-bold">
                {source?.status ?? "not requested"}
              </span>
            </div>
            <div className="mt-8 pt-5 border-t border-surface-variant/30 text-xs font-mono text-on-surface-variant/70 break-all">
              {source?.url ?? "Run Lookup in Workspace to query upstream coverage."}
            </div>
          </div>
        </div>

        <div className="xl:col-span-8 flex flex-col justify-stretch">
          <div className="p-6 bg-[#141e17]/20 border border-emerald-glow/10 rounded-2xl flex flex-col h-full relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-emerald-glow/10 border border-emerald-glow/20 rounded-md">
                  <span className="text-emerald-glow text-sm font-bold font-mono">API</span>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-on-surface">Coverage Results</h3>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="font-mono text-[10px] px-2.5 py-1 bg-emerald-glow/10 border border-emerald-glow/20 text-emerald-glow rounded-md tracking-widest font-bold block select-none">
                  {summary ? "LIVE" : "IDLE"}
                </span>
                <div className="relative max-w-xs w-full sm:w-56 ml-auto">
                  <Search className="w-4 h-4 pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search coverage..."
                    className="w-full bg-[#0B0F1A] border border-surface-variant rounded-lg py-2.5 pl-9 pr-4 font-sans text-xs text-on-surface focus:border-emerald-glow focus:outline-none transition-all placeholder:text-on-surface-variant/50"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-surface-variant/40 bg-[#0B0F1A]/50 flex-1">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-surface-variant/30 border-b border-surface-variant/55 font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
                    <th className="py-3 px-6 font-semibold">Protocol</th>
                    <th className="py-3 px-6 font-semibold">Status</th>
                    <th className="py-3 px-6 font-semibold">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant/20 font-mono text-xs text-on-surface-variant">
                  {rows.map((row) => (
                    <tr key={row.protocol} className="hover:bg-surface-variant/15 transition-colors group">
                      <td className="py-4 px-6 text-on-surface font-semibold">{row.protocol}</td>
                      <td className="py-4 px-6">
                        <span className={(statusStyles[row.status] ?? statusStyles.planned) + " inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-on-surface-variant whitespace-normal min-w-[320px]">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center gap-2.5 mt-5 text-[11px] text-on-surface-variant/60 font-mono">
              <Info className="w-4 h-4 text-emerald-glow" />
              <span>These statuses mirror the backend coverage array; planned routes are not counted as real balances.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

