# ボキコミ！

マンガでわかる簿記3級。簿記3級の内容を、マンガ風の説明とクイズで段階的に学べるWebアプリです。全3コース・全19ミッションで、仕訳の基礎から決算までを通して練習できます。

## 公開サイト

[GitHub Pages版を開く](https://ma-nakaya.github.io/boki-learning-app/)

## 特徴

- 各ミッションは約1分のマンガ形式の会話で要点をつかみ、クイズで確認する構成です。
- 初級コースには、5問で力試しする「仕訳バトル」があります。
- 学習進捗と最高得点はブラウザのローカルストレージへ保存されます。アカウント登録は不要です。

## 学習コース

- **初級｜仕訳の土台編**
  資産・負債・純資産・収益・費用、借方・貸方、仕訳バトル
- **中級｜帳簿と転記編**
  補助簿、3伝票、勘定記入、訂正仕訳、帳簿締切り
- **上級｜決算の総合編**
  売上原価、貸倒引当金、減価償却、経過勘定、精算表、P/L・B/S

## 技術構成

React 19 / Next.js 16 / TypeScript / Vinext / Vite / Tailwind CSS 4 / Cloudflare Workers / GitHub Pages

## 動作要件

Node.js 22.13.0以上

## 開発

```bash
npm ci
npm run dev
```

本番相当のビルドと起動:

```bash
npm run build
npm start
```

## 確認

```bash
npm run lint
npm test
npm run build:pages
```

## デプロイ

`main` ブランチへプッシュすると、GitHub Actions（`deploy-pages.yml`）がGitHub Pages版を自動更新します。

## ライセンス

MIT License（[LICENSE](LICENSE) を参照）
