import { ArrowRight, Boxes, WalletCards } from "lucide-react";
import { ReferralLookup } from "../components/ReferralLookup";

export default function Home() {
  return (
    <main className="min-h-screen bg-paper">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-mint text-white">
              <WalletCards className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-mint">OmniFees</p>
              <h1 className="text-2xl font-semibold text-ink sm:text-3xl">Referral-fee infrastructure for Omniston integrators.</h1>
            </div>
          </div>
          <a
            href="https://docs.ston.fi/developer-section/omniston/referral-fees"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white px-4 text-sm font-semibold text-ink shadow-sm transition hover:border-mint hover:text-mint"
          >
            Docs
            <ArrowRight className="h-4 w-4" />
          </a>
        </header>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-line bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-ink">DEX v2 vault discovery</p>
            <p className="mt-2 text-sm leading-6 text-stone-600">Lookup referral vaults exposed by STON.fi REST.</p>
          </div>
          <div className="rounded-lg border border-line bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-ink">Mongo snapshots</p>
            <p className="mt-2 text-sm leading-6 text-stone-600">Persist sync results for integrator reporting.</p>
          </div>
          <div className="rounded-lg border border-line bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Boxes className="h-4 w-4 text-amber" />
              <p className="text-sm font-semibold text-ink">Indexer roadmap</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-stone-600">External Omniston routes are marked for on-chain coverage.</p>
          </div>
        </div>
      </section>

      <ReferralLookup />
    </main>
  );
}
