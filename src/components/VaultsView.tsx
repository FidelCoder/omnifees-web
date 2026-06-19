import { useState } from "react";
import { Coins, Lock, Search, SlidersHorizontal, Info } from "lucide-react";
import type { FeeVault, ReferralSummary } from "../../lib/api";

interface VaultsViewProps {
  summary: ReferralSummary | null;
  targetWallet: string;
}

const shorten = (value?: string) => {
  if (!value) return "-";
  if (value.length <= 18) return value;
  return value.slice(0, 8) + "..." + value.slice(-6);
};

const getVaultId = (vault: FeeVault, index: number) => vault.vaultAddress ?? vault.tokenAddress ?? String(index);

const hasPositiveBalance = (balance?: string) => {
  if (!balance) return false;
  const normalized = balance.trim();
  if (!normalized || normalized === "0") return false;
  return Number(normalized) > 0 || /^0*[1-9]/.test(normalized);
};

export default function VaultsView({ summary, targetWallet }: VaultsViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProtocol, setSelectedProtocol] = useState<string>("All");

  const filteredVaults = (summary?.vaults ?? []).filter((vault) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (vault.vaultAddress ?? "").toLowerCase().includes(query) ||
      (vault.tokenAddress ?? "").toLowerCase().includes(query) ||
      (vault.tokenSymbol ?? "").toLowerCase().includes(query) ||
      vault.protocol.toLowerCase().includes(query);
    const matchesProtocol = selectedProtocol === "All" || vault.protocol === selectedProtocol;
    return matchesSearch && matchesProtocol;
  });

  const claimableVaults = (summary?.vaults ?? []).filter((vault) => vault.claimable || hasPositiveBalance(vault.balance)).length;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-1.5 border-b border-surface-variant/20 pb-6">
        <div className="flex items-center gap-2 text-emerald-glow font-mono text-[10px] tracking-widest uppercase mb-1">
          <Lock className="w-4 h-4 text-emerald-glow" />
          <span>LIVE REFERRAL FEE VAULT EXPLORER</span>
        </div>
        <h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight animate-fade-in">Vaults Explorer</h2>
        <p className="text-sm font-sans text-on-surface-variant/80 max-w-2xl leading-normal mt-0.5">
          Vault rows are loaded from /api/referrers/:wallet/summary for {summary ? summary.wallet : targetWallet || "the selected wallet"}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-surface-variant/15 border border-emerald-glow/10 rounded-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-glow/5 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none group-hover:scale-110 transition-transform duration-300" />
          <div className="flex items-center gap-2 font-mono text-[10px] text-on-surface-variant/70 uppercase mb-4 tracking-wider">
            <Lock className="w-4 h-4 text-emerald-glow" />
            <span>Total Vaults</span>
          </div>
          <div className="text-3xl font-mono font-bold text-on-surface tracking-tight text-glow">{summary?.totals.vaultCount ?? "-"}</div>
          <div className="text-xs font-sans text-on-surface-variant mt-2.5">Returned by STON.fi fee vault endpoint.</div>
        </div>

        <div className="p-6 bg-surface-variant/15 border border-emerald-glow/10 rounded-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-glow/5 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none group-hover:scale-110 transition-transform duration-300" />
          <div className="flex items-center gap-2 font-mono text-[10px] text-on-surface-variant/70 uppercase mb-4 tracking-wider">
            <Coins className="w-4 h-4 text-emerald-glow" />
            <span>Claimable Signals</span>
          </div>
          <div className="text-3xl font-mono font-bold text-on-surface tracking-tight text-glow">{summary?.totals.claimableVaults ?? "-"}</div>
          <div className="text-xs font-sans text-on-surface-variant mt-2.5">Vaults marked claimable or carrying a positive balance.</div>
        </div>

        <div className="p-6 bg-surface-variant/15 border border-emerald-glow/10 rounded-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-glow/5 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none group-hover:scale-110 transition-transform duration-300" />
          <div className="flex items-center gap-2 font-mono text-[10px] text-on-surface-variant/70 uppercase mb-4 tracking-wider">
            <Info className="w-4 h-4 text-emerald-glow" />
            <span>Source Status</span>
          </div>
          <div className="text-3xl font-mono font-bold text-on-surface tracking-tight text-glow uppercase">{summary?.sources[0]?.status ?? "idle"}</div>
          <div className="text-xs font-sans text-on-surface-variant mt-2.5">{summary?.sources[0]?.name ?? "Run Lookup in Workspace."}</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#0B0F1A]/80 border border-surface-variant rounded-xl p-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search token, vault, or address..."
            className="w-full bg-[#020617] border border-surface-variant rounded-lg py-2.5 pl-10 pr-4 font-sans text-xs text-on-surface focus:border-emerald-glow focus:ring-1 focus:ring-emerald-glow/20 focus:outline-none transition-all placeholder:text-on-surface-variant/50"
          />
        </div>

        <div className="flex gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-[#020617] border border-surface-variant px-3 py-2.5 rounded-lg text-xs font-mono text-on-surface-variant">
            <SlidersHorizontal className="w-4 h-4 text-emerald-glow" />
            <span>Protocol:</span>
            <select
              value={selectedProtocol}
              onChange={(event) => setSelectedProtocol(event.target.value)}
              className="bg-transparent border-none py-0 pl-1 pr-6 font-mono text-xs text-on-surface font-bold focus:ring-0 active:bg-[#020617]"
            >
              <option value="All" className="bg-[#020617]">All Routers</option>
              <option value="stonfi-dex-v2" className="bg-[#020617]">STON.fi DEX v2</option>
            </select>
          </div>
        </div>
      </div>

      {summary ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVaults.length > 0 ? (
            filteredVaults.map((vault, index) => {
              const isClaimable = vault.claimable || hasPositiveBalance(vault.balance);
              return (
                <div key={getVaultId(vault, index)} className="p-5 rounded-xl border flex flex-col justify-between transition-all duration-300 relative group h-full bg-surface-variant/20 border-emerald-glow/10 hover:border-emerald-glow/40 hover:shadow-[0_0_20px_rgba(0,255,163,0.12)]">
                  <div className="absolute -right-4 -top-4 w-20 h-20 bg-emerald-glow/5 rounded-full blur-2xl group-hover:bg-emerald-glow/10 transition-colors pointer-events-none" />
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border bg-[#0c150f] p-1 flex items-center justify-center font-bold text-xs border-emerald-glow/30 text-emerald-glow">
                        {vault.tokenSymbol?.slice(0, 2).toUpperCase() ?? "FV"}
                      </div>
                      <div>
                        <h4 className="font-headline font-bold text-sm text-on-surface group-hover:text-emerald-glow transition-all">{vault.tokenSymbol || "Fee Vault"}</h4>
                        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#0B0F1A] border border-surface-variant/40 text-on-surface-variant">{vault.protocol}</span>
                      </div>
                    </div>
                    <span className={(isClaimable ? "bg-emerald-glow/10 border border-emerald-glow/30 text-emerald-glow" : "bg-[#64748B]/10 border border-[#64748B]/30 text-[#64748B]") + " font-mono text-[10px] px-2 py-0.5 rounded flex items-center gap-1 font-bold uppercase"}>
                      {isClaimable ? "Claimable" : "Empty"}
                    </span>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-headline text-2xl font-bold text-on-surface">{vault.tokenSymbol || shorten(vault.tokenAddress)}</h3>
                    <p className="text-xs text-on-surface-variant font-sans mt-1" title={vault.vaultAddress}>Vault: {shorten(vault.vaultAddress)}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 mb-6 pt-4 border-t border-surface-variant/30 flex-grow">
                    <div>
                      <span className="block font-mono text-[10px] text-on-surface-variant/80 mb-1">Token Address</span>
                      <span className="font-mono font-bold text-sm text-on-surface" title={vault.tokenAddress}>{shorten(vault.tokenAddress)}</span>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] text-on-surface-variant/80 mb-1">Raw Balance</span>
                      <span className="font-mono text-sm text-emerald-glow">{vault.balance ?? "-"}</span>
                    </div>
                  </div>

                  <button type="button" className="w-full py-2.5 rounded-lg border border-emerald-glow/40 text-emerald-glow font-mono text-[11px] font-bold uppercase tracking-wider cursor-default">
                    Backend Read Only
                  </button>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 text-on-surface-variant/50 font-sans border border-dashed border-surface-variant/30 rounded-xl bg-[#0B0F1A]/20">
              Lookup completed successfully, but STON.fi returned no DEX v2 fee vaults for this referrer. Try a wallet that has actually earned STON.fi DEX v2 referral fees.
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 text-on-surface-variant/50 font-sans border border-dashed border-surface-variant/30 rounded-xl bg-[#0B0F1A]/20">
          Run a Lookup in Workspace to load live backend vault data.
        </div>
      )}
    </div>
  );
}

