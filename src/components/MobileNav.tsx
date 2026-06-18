import { LayoutDashboard, Shield, Coins, Terminal } from "lucide-react";

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  const tabs = [
    {
      id: "workspace",
      name: "Workspace",
      icon: LayoutDashboard
    },
    {
      id: "coverage",
      name: "Coverage",
      icon: Shield
    },
    {
      id: "vaults",
      name: "Vaults",
      icon: Coins
    },
    {
      id: "docs",
      name: "Docs",
      icon: Terminal
    }
  ];

  return (
    <nav className="bg-[#020617]/95 backdrop-blur-lg fixed bottom-0 w-full lg:hidden z-50 border-t border-emerald-glow/20 shadow-[0_-4px_30px_rgba(0,0,0,0.8)] pb-safe">
      <div className="flex justify-around items-center h-16 px-4">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all relative ${
                isSelected
                  ? "text-emerald-glow bg-emerald-glow/10 border border-emerald-glow/20 px-4 py-1.5 -mt-3 shadow-[0_0_15px_rgba(0,255,163,0.2)] font-bold"
                  : "text-on-secondary-container hover:text-on-surface"
              }`}
            >
              <IconComponent className={`w-5 h-5`} />
              <span className="font-mono text-[9px] mt-1 uppercase tracking-wider">
                {tab.name}
              </span>
              {isSelected && (
                <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-emerald-glow" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
