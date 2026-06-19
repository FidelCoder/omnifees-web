"use client";

import { useEffect, useState } from "react";
import { useTonAddress, useTonConnectModal, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import Header from "./components/Header";
import MobileNav from "./components/MobileNav";
import Sidebar from "./components/Sidebar";
import CoverageView from "./components/CoverageView";
import DocsView from "./components/DocsView";
import VaultsView from "./components/VaultsView";
import WorkspaceView from "./components/WorkspaceView";
import { WalletState } from "./types";
import { Sparkles, X } from "lucide-react";
import {
  getReferralSnapshots,
  getReferralSummary,
  syncReferralSummary,
  type ReferralSnapshot,
  type ReferralSummary
} from "../lib/api";

const exampleWallet = "EQCXSs2xZ2dhk9TAxzGzXra2EbG_S2SqyN8Tfi6fJ82EYiVj";

type BackendAction = "lookup" | "sync" | "history" | null;

export default function App() {
  const [tonConnectUI] = useTonConnectUI();
  const tonWallet = useTonWallet();
  const connectedAddress = useTonAddress();
  const walletModal = useTonConnectModal();

  const [activeTab, setActiveTab] = useState<string>("workspace");
  const [targetWallet, setTargetWallet] = useState(exampleWallet);
  const [summary, setSummary] = useState<ReferralSummary | null>(null);
  const [snapshots, setSnapshots] = useState<ReferralSnapshot[]>([]);
  const [snapshotNote, setSnapshotNote] = useState("");
  const [backendAction, setBackendAction] = useState<BackendAction>(null);
  const [backendError, setBackendError] = useState("");
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const [walletState, setWalletState] = useState<WalletState>({
    connected: false,
    address: null,
    name: null,
    balanceTON: 0,
    balanceUSDC: 0
  });

  const loadSnapshots = async (wallet: string) => {
    const response = await getReferralSnapshots(wallet);
    setSnapshots(response.snapshots);
    setSnapshotNote(response.note ?? "");
  };

  const runLookup = async (wallet: string) => {
    const trimmed = wallet.trim();
    if (!trimmed) {
      setBackendError("Enter a TON referrer wallet.");
      return;
    }

    setBackendAction("lookup");
    setBackendError("");

    try {
      const nextSummary = await getReferralSummary(trimmed);
      setSummary(nextSummary);
      setTargetWallet(nextSummary.wallet);
      await loadSnapshots(nextSummary.wallet);
    } catch (error) {
      setBackendError(error instanceof Error ? error.message : "Lookup failed.");
    } finally {
      setBackendAction(null);
    }
  };

  const runSync = async (wallet: string) => {
    const trimmed = wallet.trim();
    if (!trimmed) {
      setBackendError("Enter a TON referrer wallet.");
      return;
    }

    setBackendAction("sync");
    setBackendError("");

    try {
      const nextSummary = await syncReferralSummary(trimmed);
      setSummary(nextSummary);
      setTargetWallet(nextSummary.wallet);
      await loadSnapshots(nextSummary.wallet);
    } catch (error) {
      setBackendError(error instanceof Error ? error.message : "Sync failed.");
    } finally {
      setBackendAction(null);
    }
  };

  const refreshHistory = async (wallet: string) => {
    const trimmed = wallet.trim();
    if (!trimmed) {
      setBackendError("Enter a TON referrer wallet.");
      return;
    }

    setBackendAction("history");
    setBackendError("");

    try {
      await loadSnapshots(trimmed);
    } catch (error) {
      setBackendError(error instanceof Error ? error.message : "History refresh failed.");
    } finally {
      setBackendAction(null);
    }
  };

  useEffect(() => {
    if (!connectedAddress) {
      setWalletState({
        connected: false,
        address: null,
        name: null,
        balanceTON: 0,
        balanceUSDC: 0
      });
      return;
    }

    setWalletState({
      connected: true,
      address: connectedAddress,
      name: tonWallet?.device.appName ?? "TON wallet",
      balanceTON: 0,
      balanceUSDC: 0
    });
    setTargetWallet(connectedAddress);
  }, [connectedAddress, tonWallet?.device.appName]);

  const handleConnectWallet = () => {
    walletModal.open();
  };

  const handleDisconnectWallet = () => {
    void tonConnectUI.disconnect();
    setWalletState({
      connected: false,
      address: null,
      name: null,
      balanceTON: 0,
      balanceUSDC: 0
    });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpgradeTrigger = () => {
    setIsUpgradeModalOpen(true);
  };

  return (
    <div className="bg-[#050A08] text-on-surface min-h-screen font-sans selection:bg-emerald-glow/30 selection:text-emerald-glow antialiased flex">
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onUpgradeTrigger={handleUpgradeTrigger}
      />

      <div className="flex-grow lg:pl-64 flex flex-col min-h-screen relative pb-16 lg:pb-0">
        <Header
          activeTab={activeTab}
          walletState={walletState}
          onConnectClick={handleConnectWallet}
          onDisconnectClick={handleDisconnectWallet}
        />

        <main className="flex-1 px-6 py-8 lg:px-10 max-w-[1400px] w-full mx-auto relative">
          <div className="absolute top-10 left-1/3 w-80 h-80 bg-emerald-glow/5 rounded-full blur-[140px] pointer-events-none -z-10" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-glow/3 rounded-full blur-[160px] pointer-events-none -z-10" />

          {activeTab === "workspace" && (
            <WorkspaceView
              targetWallet={targetWallet}
              onTargetWalletChange={setTargetWallet}
              summary={summary}
              snapshots={snapshots}
              snapshotNote={snapshotNote}
              backendAction={backendAction}
              backendError={backendError}
              onLookup={runLookup}
              onSync={runSync}
              onRefreshHistory={refreshHistory}
            />
          )}

          {activeTab === "coverage" && (
            <CoverageView
              summary={summary}
              targetWallet={targetWallet}
              backendAction={backendAction}
            />
          )}

          {activeTab === "vaults" && (
            <VaultsView summary={summary} targetWallet={targetWallet} />
          )}

          {activeTab === "docs" && <DocsView />}
        </main>
      </div>

      <MobileNav activeTab={activeTab} onTabChange={handleTabChange} />

      {isUpgradeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020617]/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-deep-slate border border-emerald-glow/20 rounded-xl overflow-hidden shadow-[0_0_35px_rgba(0,255,163,0.25)]">
            <div className="h-1 bg-gradient-to-r from-emerald-glow/30 via-emerald-glow to-emerald-glow/30" />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-glow animate-pulse" />
                  <h3 className="font-headline font-bold text-lg text-on-surface">Upgrade Workspace</h3>
                </div>
                <button
                  onClick={() => setIsUpgradeModalOpen(false)}
                  className="text-on-surface-variant hover:text-emerald-glow p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
                Upgrade plans are a roadmap item. Live production data currently comes from the referral summary, sync, and snapshot endpoints.
              </p>
              <button
                onClick={() => setIsUpgradeModalOpen(false)}
                className="w-full bg-emerald-glow text-deep-slate font-sans text-xs font-bold py-2.5 rounded hover:bg-primary-fixed-dim transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

