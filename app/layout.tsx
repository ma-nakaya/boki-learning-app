import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.GITHUB_PAGES === "true" ? "/boki-learning-app" : "";
const siteUrl = "https://ma-nakaya.github.io/boki-learning-app/";
const title = "ボキコミ！｜マンガでわかる簿記3級";
const description =
  "資産・負債・純資産・収益・費用・借方・貸方を、マンガ風の解説とクイズで段階的に学べる簿記3級教材。";

export const metadata: Metadata = {
  metadataBase: new URL("https://ma-nakaya.github.io"),
  title,
  description,
  applicationName: "ボキコミ！",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "ボキコミ！",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
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
