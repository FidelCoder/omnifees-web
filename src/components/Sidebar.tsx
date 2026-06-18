import { LayoutDashboard, Shield, Coins, Terminal, Sparkles, Settings, HelpCircle, ChevronRight } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onUpgradeTrigger: () => void;
}

export default function Sidebar({ activeTab, onTabChange, onUpgradeTrigger }: SidebarProps) {
  const menuItems = [
    {
      id: "workspace",
      name: "Integrator Workspace",
      icon: LayoutDashboard,
      desc: "Node endpoints & fee trees"
    },
    {
      id: "coverage",
      name: "Coverage",
      icon: Shield,
      desc: "Live routing network support"
    },
    {
      id: "vaults",
      name: "Vaults",
      icon: Coins,
      desc: "High-yield liquidity pools"
    },
    {
      id: "docs",
      name: "API Docs",
      icon: Terminal,
      desc: "Reference & developers SDK"
    }
  ];

  return (
    <nav className="h-screen w-64 hidden lg:flex flex-col fixed left-0 top-0 bg-[#020617]/95 backdrop-blur-2xl border-r border-surface-variant/40 z-40">
      {/* Brand area */}
      <div className="px-6 py-6 border-b border-surface-variant/30 flex flex-col justify-center">
        <h2 className="font-headline text-2xl font-bold text-emerald-glow tracking-tight flex items-center gap-2">
          <Coins className="w-6 h-6 text-emerald-glow animate-pulse-available" />
          OmniFees
        </h2>
        <p className="font-mono text-[9px] text-on-surface-variant/70 mt-2 tracking-widest uppercase ml-8">
          INFRASTRUCTURE DEPOT
        </p>
      </div>

      {/* Navigation menu list */}
      <div className="flex flex-col h-full py-6 flex-1 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const isSelected = activeTab === item.id;
            const IconComponent = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-left cursor-pointer ${
                    isSelected
                      ? "text-emerald-glow bg-emerald-glow/15 border border-emerald-glow/30 shadow-[0_0_15px_rgba(0,255,163,0.1)] font-bold text-glow"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/20"
                  }`}
                >
                  <IconComponent className={`w-5 h-5 flex-shrink-0 ${isSelected ? "text-emerald-glow" : "text-on-surface-variant/80"}`} />
                  <div className="flex-1">
                    <span className="block">{item.name}</span>
                  </div>
                  {isSelected && <ChevronRight className="w-4 h-4 text-emerald-glow" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer Area with Upgrade plans */}
      <div className="p-6 mt-auto border-t border-surface-variant/30 bg-gradient-to-t from-surface-container-low/50 to-transparent space-y-4">
        <div className="p-3.5 bg-surface-variant/20 border border-emerald-glow/10 rounded-lg">
          <div className="font-mono text-[9px] text-emerald-glow uppercase tracking-wider mb-1">
            Current Tier
          </div>
          <p className="text-xs font-headline font-semibold text-on-surface mb-2">Developer Account</p>
          <button 
            onClick={onUpgradeTrigger}
            className="w-full flex items-center justify-center gap-1.5 border border-emerald-glow/40 hover:border-emerald-glow hover:bg-emerald-glow/10 text-emerald-glow font-mono text-[10px] uppercase py-2 rounded-lg transition-all duration-300 tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5" /> Upgrade Plan
          </button>
        </div>

        <div className="flex justify-between items-center px-2 text-on-surface-variant/60 text-xs">
          <button 
            type="button" 
            onClick={() => onTabChange("workspace")}
            className="hover:text-emerald-glow transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-mono tracking-widest text-on-surface-variant/40">v2.4.1</span>
          <button 
            type="button"
            onClick={() => alert("Please consult OmniFees developer chat or system administrator (griffinesonyango@gmail.com).")}
            className="hover:text-emerald-glow transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}
