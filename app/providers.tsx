"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

const manifestUrl =
  process.env.NEXT_PUBLIC_TONCONNECT_MANIFEST_URL ||
  "https://omnifees-web.vercel.app/tonconnect-manifest.json";

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <TonConnectUIProvider
      manifestUrl={manifestUrl}
      restoreConnection
      analytics={{ mode: "off" }}
    >
      {children}
    </TonConnectUIProvider>
  );
}
