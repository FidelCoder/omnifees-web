import { Wallet } from "lucide-react";
import { WalletState } from "../types";

interface HeaderProps {
  activeTab: string;
  walletState: WalletState;
  onConnectClick: () => void;
  onDisconnectClick: () => void;
}

const shorten = (value: string) => {
  if (value.length <= 18) return value;
  return value.slice(0, 8) + "..." + value.slice(-6);
};

export default function Header({ activeTab, walletState, onConnectClick, onDisconnectClick }: HeaderProps) {
  const getBreadcrumbs = () => {
    switch (activeTab) {
      case "workspace":
        return { parent: "Infrastructure", child: "Workspace" };
      case "coverage":
        return { parent: "Infrastructure", child: "Coverage" };
      case "vaults":
        return { parent: "Referral Vaults", child: "DEX v2" };
      case "docs":
        return { parent: "API Reference", child: "Live Endpoints" };
      default:
        return { parent: "Infrastructure", child: "Workspace" };
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="bg-[#020617]/70 backdrop-blur-md w-full sticky top-0 z-30 flex items-center justify-between px-6 lg:px-10 h-20 border-b border-surface-variant/20 transition-all duration-300">
      <div className="flex items-center gap-4 lg:hidden">
        <h1 className="font-headline text-lg font-bold text-emerald-glow tracking-tight">OmniFees</h1>
      </div>

      <div className="hidden lg:flex items-center gap-3 text-sm font-medium text-on-surface-variant">
        <span className="text-on-surface-variant/50">{breadcrumbs.parent}</span>
        <span className="text-on-surface-variant/30 text-xs">/</span>
        <span className="text-on-surface select-none font-semibold text-emerald-glow">{breadcrumbs.child}</span>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-glow/5 border border-emerald-glow/10 hover:bg-emerald-glow/15 transition-all">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
          </span>
          <span className="font-mono text-[10px] text-emerald-glow tracking-wider uppercase">
            API LIVE
          </span>
        </div>

        {walletState.connected && walletState.address ? (
          <button
            onClick={onDisconnectClick}
            className="bg-emerald-glow/5 border border-emerald-glow/20 text-on-surface hover:text-red-400 hover:border-red-500/30 px-3.5 py-1.5 rounded-lg font-mono text-[11px] font-medium transition-all flex items-center gap-1.5 group cursor-pointer"
            title="Clear loaded referrer wallet"
          >
            <Wallet className="w-3.5 h-3.5 text-emerald-glow group-hover:text-red-400" />
            <span>{shorten(walletState.address)}</span>
          </button>
        ) : (
          <button
            onClick={onConnectClick}
            className="bg-emerald-glow text-[#002111] font-mono text-[11px] font-bold px-4 py-2 rounded-lg hover:bg-[#00ffa3] hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,255,163,0.35)] cursor-pointer"
          >
            ENTER WALLET
          </button>
        )}

        <div className="w-9 h-9 rounded-full bg-surface-variant border border-emerald-glow/20 overflow-hidden cursor-pointer hover:border-emerald-glow/55 transition-colors flex items-center justify-center">
          <img
            alt="User Profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9vSMt3MapvX3L3B0Es9vnt8LN9PIZtpOEcU91n7H8bymPi8PNitIjgygOG1ArDfiaqJotaIlLLYJKq-CBke2f70eDXH3CCCREIdF1HOlGNuk6W1fXkj3WqD8TQQc1-BYTQiDnBhY5Q4cej7l5iWbSMifrZNWkMQH1WB39hhLOpX7NHphOITCmOoZhx0mwXsij3nKCPNJOveQF4clPRf7-SZXl6cELH7oN6Qy_8_G2ddyla-jejom6FXxlprzRTY7Em83a39s35Qw"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}

