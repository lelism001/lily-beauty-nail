# Lily Beauty Nail

東京都中央区築地のプライベートネイルサロン「Lily Beauty Nail」の公式サイトです。

## ページ構成

- `index.html` — トップページ
- `concept.html` — About（コンセプト）
- `gallery.html` — 施術例
- `menu.html` — メニュー
- `staff.html` — スタッフ紹介
- `faq.html` — よくある質問
- `access.html` — アクセス
- `privacy.html` — プライバシーポリシー

## 技術構成

素のHTML / CSS / JavaScriptで構築された静的サイトです。ビルドツールは使用していません。

- `style.css` — 全ページ共通のスタイルシート
- `script.js` — ナビゲーション、カルーセル、スクロールアニメーション、固定バーなどの共通スクリプト
- `script.test.js` — `script.js`から抽出した純粋関数のテスト（Node標準の `node --test` で実行）

```bash
node --test
```

## ローカルプレビュー

```bash
npx serve -l 4173 .
```

`http://localhost:4173` で確認できます。
