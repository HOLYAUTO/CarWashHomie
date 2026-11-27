# template/ — 他店HP制作用テンプレート一式

Car Wash Homies のサイトを、他のカーコーティング・ディテイリング店のHP制作に転用するための資料と初期ファイルをまとめたフォルダ。
**このフォルダの中身は Car Wash Homies のサイト表示には一切使われない**（読み物と、新店舗にコピーする雛形だけ）。

## 中身

| ファイル | 内容 | 使う場面 |
|---|---|---|
| [`01-design.md`](01-design.md) | テンプレ設計書。3層構造・汎用ページ構成・用語置き換え表・差し替えポイント・立ち上げ手順・集客設計 | 最初に読む |
| [`02-seo-meo-llmo-guide.md`](02-seo-meo-llmo-guide.md) | SEO・MEO・LLMO・CMS の実装ガイドと公開前チェックリスト | 実装・公開時 |
| [`hearing-sheet.md`](hearing-sheet.md) | ヒアリングシート（記入用）。回答ごとに反映先ファイルつき | 初回訪問時 |
| [`starter/lib/constants.ts`](starter/lib/constants.ts) | 店舗情報・コンセプト語・サイト設定の雛形（「◯◯」を差し替える） | 複製直後 |
| [`starter/lib/routes.ts`](starter/lib/routes.ts) | ページ一覧・ナビの雛形（施工事例・代表紹介など汎用の言葉） | 複製直後 |
| [`proposal/detailing-hp-proposal.html`](proposal/detailing-hp-proposal.html) | 他店向け提案ページの元ファイル（claude.ai の Artifact として公開済み） | 営業時 |

## 新しい店舗を立ち上げる流れ

1. `hearing-sheet.md` を埋める
2. このリポジトリを新しいリポジトリに複製する
3. `template/starter/lib/` の2ファイルを `lib/` に上書きコピーし、「◯◯」をヒアリング結果で埋める
4. `01-design.md` §3 に沿って文章・配色・ロゴを差し替え、不要な機能（カードコレクション等）を外す
5. `02-seo-meo-llmo-guide.md` §8 のチェックリストで公開
6. 新しいリポジトリからは `template/` フォルダを消してよい

## 本体側のどこが「設定」か

テンプレ化のために、店舗ごとに変わる値は本体の次の2ファイルに集約している。`starter/` はこの2ファイルと同じ構造。

- `lib/constants.ts` — `BUSINESS`（店舗情報）/ `BRAND`（コンセプト語・CTA）/ `SITE`（ドメイン・title・業種）
- `lib/routes.ts` — ページ一覧・sitemap・llms.txt・ヘッダー/フッターのナビ

本体の `lib/constants.ts` や `lib/routes.ts` に項目を増やしたときは、`starter/` の同じファイルにも同じ項目を足す。
