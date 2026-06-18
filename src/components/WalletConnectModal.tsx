import { useState } from "react";
import { X, Wallet, Loader2, Check } from "lucide-react";
import { WalletState } from "../types";

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (wallet: WalletState) => void;
}

export default function WalletConnectModal({ isOpen, onClose, onConnect }: WalletConnectModalProps) {
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);

  if (!isOpen) return null;

  const walletOptions = [
    {
      id: "tonkeeper",
      name: "TON Keeper",
      desc: "Connect using Tonkeeper popular mobile wallet",
      logo: "💎",
      network: "TON"
    },
    {
      id: "telegram",
      name: "Telegram Wallet",
      desc: "Connect directly via Telegram @Wallet bot account",
      logo: "✈️",
      network: "TON"
    },
    {
      id: "tonhub",
      name: "Tonhub",
      desc: "Advanced security wallet built on TON",
      logo: "🛡️",
      network: "TON"
    },
    {
      id: "metamask",
      name: "MetaMask",
      desc: "Popular EVM wallet for bridge networks",
      logo: "🦊",
      network: "EVM Bridge"
    }
  ];

  const handleConnectWallet = (walletId: string, walletName: string, network: string) => {
    setConnectingWallet(walletId);
    
    // Simulate connection delay for high-fidelity interactive flow
    setTimeout(() => {
      let address = "";
      if (network === "TON") {
        address = "EQAc_7a5uB3M...8f9D";
      } else {
        address = "0x7a5D...8f9D";
      }
      
      onConnect({
        connected: true,
        address,
        name: walletName,
        balanceTON: 342.50,
        balanceUSDC: 12450.00
      });
      setConnectingWallet(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-slate/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-deep-slate border border-emerald-glow/20 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,255,163,0.15)]">
        {/* Glow header border */}
        <div className="h-1 bg-gradient-to-r from-emerald-glow/20 via-emerald-glow to-emerald-glow/20" />
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-emerald-glow/10 border border-emerald-glow/20 text-emerald-glow">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-headline font-semibold text-lg text-on-surface">Connect Wallet</h3>
                <p className="text-xs text-on-surface-variant font-sans">Choose your entry gateway proxy</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-on-surface-variant hover:text-emerald-glow p-1.5 rounded-lg hover:bg-surface-variant/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            {walletOptions.map((opt) => {
              const isConnecting = connectingWallet === opt.id;
              return (
                <button
                  key={opt.id}
                  disabled={connectingWallet !== null}
                  onClick={() => handleConnectWallet(opt.id, opt.name, opt.network)}
                  className="w-full relative flex items-center gap-4 p-4 text-left rounded-lg bg-[#0B0F1A] border border-surface-variant hover:border-emerald-glow/40 transition-all group disabled:opacity-50"
                >
                  <div className="w-10 h-10 rounded bg-slate-800/80 flex items-center justify-center text-xl shadow-inner border border-surface-variant group-hover:border-emerald-glow/20 transition-all">
                    {opt.logo}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-headline font-medium text-sm text-on-surface group-hover:text-emerald-glow transition-colors">
                        {opt.name}
                      </span>
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-surface-variant text-on-surface-variant">
                        {opt.network}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant/80 mt-1 leading-normal pr-4">
                      {opt.desc}
                    </p>
                  </div>
                  
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {isConnecting ? (
                      <Loader2 className="w-5 h-5 text-emerald-glow animate-spin" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-surface-variant group-hover:bg-emerald-glow group-hover:shadow-[0_0_8px_rgba(0,255,163,0.8)] transition-all" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-[10px] text-on-surface-variant/60 font-mono text-center mt-6 leading-relaxed">
            By connecting a wallet, you agree to OmniFees Integrator Proxy Terms of Service and routing commissions splits.
          </p>
        </div>
      </div>
    </div>
  );
}
