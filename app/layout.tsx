import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.GITHUB_PAGES === "true" ? "/boki-comi" : "";

export const metadata: Metadata = {
  title: "ボキコミ！｜マンガでわかる簿記3級",
  description: "資産・負債・純資産・収益・費用・借方・貸方を、マンガ風の解説とクイズで段階的に学べる簿記3級教材。",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
