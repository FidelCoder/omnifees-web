import React, { useState } from "react";
import { X, ArrowRight, Wallet, Check, AlertCircle, Loader2 } from "lucide-react";
import { Vault, WalletState } from "../types";

interface VaultModalProps {
  isOpen: boolean;
  vault: Vault | null;
  walletState: WalletState;
  onClose: () => void;
  onUpdateBalances: (ton: number, usdc: number, vaultId: string, updatedBalanceValue: number, changeType: "deposit" | "withdraw") => void;
}

export default function VaultModal({ isOpen, vault, walletState, onClose, onUpdateBalances }: VaultModalProps) {
  const [action, setAction] = useState<"deposit" | "withdraw">("deposit");
  const [amount, setAmount] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  if (!isOpen || !vault) return null;

  const isStable = vault.assetPair.includes("USDC") || vault.assetPair.includes("USDT");
  const userMax = action === "deposit" 
    ? (isStable ? walletState.balanceUSDC : walletState.balanceTON)
    : vault.balance;

  const symbol = vault.assetPair.split(" / ")[action === "deposit" ? 1 : 0] || "TON";

  const handleSetMax = () => {
    setAmount(userMax.toFixed(2));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      setStatus("error");
      setStatusMsg("Please input a valid positive amount.");
      return;
    }

    if (val > userMax) {
      setStatus("error");
      setStatusMsg(`Insufficient funds in standard ${action === "deposit" ? "Wallet" : "Vault"} balance.`);
      return;
    }

    setStatus("submitting");

    // Simulate smart contract signing & gas estimation of TON network
    setTimeout(() => {
      let isSuccess = true;
      if (isSuccess) {
        let finalWalletTON = walletState.balanceTON;
        let finalWalletUSDC = walletState.balanceUSDC;

        if (action === "deposit") {
          if (isStable) {
            finalWalletUSDC -= val;
          } else {
            finalWalletTON -= val;
          }
        } else {
          // withdraw
          if (isStable) {
            finalWalletUSDC += val;
          } else {
            finalWalletTON += val;
          }
        }

        // Apply contract state gas fee
        finalWalletTON -= 0.05; // 0.05 TON transaction gas fee

        onUpdateBalances(
          finalWalletTON, 
          finalWalletUSDC, 
          vault.id, 
          action === "deposit" ? vault.balance + val : vault.balance - val,
          action
        );

        setStatus("success");
        setStatusMsg(`Successfully signed transaction! ${action === "deposit" ? "Deposited" : "Withdrawn"} ${val.toLocaleString(undefined, { minimumFractionDigits: 2 })} ${symbol} with 0.05 TON network gas.`);
      } else {
        setStatus("error");
        setStatusMsg("Blockchain integration timeout. Failed to fetch smart contract signatures.");
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-slate/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-deep-slate border border-emerald-glow/20 rounded-xl overflow-hidden shadow-[0_0_35px_rgba(0,255,163,0.2)]">
        {/* Luminous dynamic accent bar */}
        <div className="h-1 bg-gradient-to-r from-emerald-glow/20 via-emerald-glow to-emerald-glow/20" />

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-emerald-glow/30 bg-slate-900 flex items-center justify-center text-sm font-bold text-emerald-glow">
                {vault.logoUrl ? (
                  <img src={vault.logoUrl} alt={vault.name} referrerPolicy="no-referrer" className="w-8 h-8 rounded-full object-contain" />
                ) : (
                  <span>{vault.logoText}</span>
                )}
              </div>
              <div>
                <h4 className="font-headline font-semibold text-base text-on-surface flex items-center gap-2">
                  {vault.name} <span className="text-xs px-2 py-0.5 rounded bg-surface-variant/50 border border-emerald-glow/10 text-on-surface-variant">{vault.version}</span>
                </h4>
                <p className="text-xs text-on-surface-variant font-sans">{vault.type} • {vault.assetPair}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-on-surface-variant hover:text-emerald-glow p-1.5 rounded-lg hover:bg-surface-variant/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {status === "success" ? (
            <div className="py-6 text-center animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-status-available/10 border border-status-available/20 text-status-available flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6" />
              </div>
              <h5 className="font-headline font-semibold text-[#10B981] text-lg mb-2">Tx Registered Live</h5>
              <p className="text-sm text-on-surface-variant/90 px-4 mb-6 leading-relaxed">
                {statusMsg}
              </p>
              <div className="bg-terminal-bg border border-surface-variant p-3 rounded-lg text-left font-mono text-xs text-on-surface-variant/90 max-w-sm mx-auto mb-6">
                <div className="flex justify-between">
                  <span>Network Status:</span>
                  <span className="text-emerald-glow">TON v2.4.1 LIVE</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Tx Hash:</span>
                  <span className="text-on-surface select-all">tx_9a2b8e3dfd04...</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setStatus("idle");
                  setAmount("");
                  onClose();
                }}
                className="px-6 py-2 bg-emerald-glow text-deep-slate font-sans text-xs font-bold rounded hover:bg-primary-fixed-dim transition-colors"
              >
                Return to Workspace
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tab selector for Deposit / Withdraw action */}
              {vault.status === "Active" ? (
                <div className="grid grid-cols-2 p-1 bg-surface-variant/20 border border-surface-variant rounded-lg gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setAction("deposit");
                      setAmount("");
                      setStatus("idle");
                    }}
                    className={`py-2 text-center rounded text-xs font-mono transition-all ${
                      action === "deposit"
                        ? "bg-emerald-glow/10 text-emerald-glow border border-emerald-glow/30"
                        : "text-on-surface-variant hover:text-on-surface border border-transparent"
                    }`}
                  >
                    DEPOSIT ASSETS
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAction("withdraw");
                      setAmount("");
                      setStatus("idle");
                    }}
                    className={`py-2 text-center rounded text-xs font-mono transition-all ${
                      action === "withdraw"
                        ? "bg-emerald-glow/10 text-emerald-glow border border-emerald-glow/30"
                        : "text-on-surface-variant hover:text-on-surface border border-transparent"
                    }`}
                  >
                    WITHDRAW ASSETS
                  </button>
                </div>
              ) : (
                <div className="bg-surface-variant/20 border border-status-planned/20 p-3 rounded-lg text-center font-mono text-xs text-status-planned mb-4">
                  ⚠️ This strategy is currently PLANNED for Q3 2024. Deposits are not yet open to public nodes.
                </div>
              )}

              {/* Balance Summary Row */}
              <div className="grid grid-cols-2 gap-4 bg-terminal-bg border border-surface-variant p-4 rounded-lg">
                <div>
                  <span className="block text-[10px] text-on-surface-variant uppercase font-mono tracking-wider">Vault APR</span>
                  <span className="text-xl font-headline font-bold text-emerald-glow">{vault.apy}%</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-on-surface-variant uppercase font-mono tracking-wider">
                    {action === "deposit" ? "Holdings Balance" : "Staked Vault Balance"}
                  </span>
                  <span className="text-sm font-mono text-on-surface">
                    {userMax.toFixed(2)} {symbol}
                  </span>
                </div>
              </div>

              {walletState.connected ? (
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs text-on-surface-variant uppercase font-mono tracking-wider">Transaction Amount</label>
                      <button
                        type="button"
                        onClick={handleSetMax}
                        className="text-xs text-emerald-glow hover:underline text-glow"
                      >
                        Use Max Value
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        step="any"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-[#0B0F1A] border border-surface-variant rounded-lg py-3 pl-4 pr-16 font-mono text-on-surface focus:border-emerald-glow focus:ring-1 focus:ring-emerald-glow/20 focus:outline-none transition-all"
                        disabled={status === "submitting" || vault.status === "Planned"}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-on-surface-variant">
                        {symbol}
                      </span>
                    </div>
                  </div>

                  {/* Gas & Fee estimate */}
                  <div className="p-3 bg-[#0B0F1A] border border-surface-variant rounded-lg space-y-1 text-xs font-mono text-on-surface-variant">
                    <div className="flex justify-between">
                      <span>Network Gas Fee:</span>
                      <span className="text-on-surface">~0.05 TON</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Workspace Routing cut:</span>
                      <span className="text-emerald-glow">0.00% (Claimed on Yield Split)</span>
                    </div>
                  </div>

                  {status === "error" && (
                    <div className="p-3 bg-red-950/30 border border-red-500/20 rounded-lg flex items-start gap-2.5 text-xs text-red-200">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{statusMsg}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    {vault.status === "Planned" ? (
                      <button
                        type="button"
                        disabled
                        className="w-full py-3 bg-[#0B0F1A] border border-surface-variant text-status-planned font-mono text-xs rounded-lg uppercase cursor-not-allowed"
                      >
                        STAGING GATE CLOSED
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full py-3 bg-emerald-glow hover:bg-primary-fixed-dim text-deep-slate font-headline font-bold text-xs rounded-lg uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                      >
                        {status === "submitting" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Signing contract codes...
                          </>
                        ) : (
                          <>
                            Confirm {action === "deposit" ? "Deposit" : "Withdrawal"} <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-[#0B0F1A] border border-surface-variant rounded-lg text-center">
                  <Wallet className="w-8 h-8 text-on-surface-variant mx-auto mb-2 opacity-55" />
                  <p className="text-sm text-on-surface-variant mb-4">Please connect your Web3 decentralized wallet to initialize sandbox contract deposits.</p>
                  <p className="text-xs text-status-planned font-mono">Requires secure network handshake prior to sign-off.</p>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
