import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ボキコミ！｜マンガでわかる簿記3級",
  description: "資産・負債・純資産・収益・費用・借方・貸方を、マンガ風の解説とクイズで段階的に学べる簿記3級教材。",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
