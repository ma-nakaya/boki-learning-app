# ボキコミ！

簿記3級を、マンガ風の説明とクイズで段階的に学べるWebアプリです。

## 公開サイト

- [GitHub Pages版](https://ma-nakaya.github.io/boki-comi/)
- [ChatGPT Sites版](https://boki-manga-quest.eager-deer-7173.chatgpt.site)

## 学習コース

- **初級｜仕訳の土台編**  
  資産・負債・純資産・収益・費用、借方・貸方、仕訳バトル
- **中級｜帳簿と転記編**  
  補助簿、3伝票、勘定記入、訂正仕訳、帳簿締切り
- **上級｜決算の総合編**  
  売上原価、貸倒引当金、減価償却、経過勘定、精算表、P/L・B/S

学習進捗と最高得点はブラウザのローカルストレージへ保存されます。

## 技術構成

React 19 / Next.js 16 / TypeScript / Vinext / Vite / Cloudflare Workers / GitHub Pages

## 開発

Node.js 22.13.0以上が必要です。

```bash
npm ci
npm run dev
```

## 確認

```bash
npm run lint
npm test
npm run build:pages
```

`main` ブランチへプッシュすると、GitHub ActionsがGitHub Pages版を自動更新します。
