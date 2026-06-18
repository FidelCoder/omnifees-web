import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OmniFees",
  description: "Dashboard for tracking and syncing Omniston referral fees."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
