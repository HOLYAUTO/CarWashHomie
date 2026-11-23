import { revalidatePath } from "next/cache";

/* 管理画面で保存・追加・削除したあとに呼ぶ。サイト全体のキャッシュ
   （Vercel のページキャッシュ／Next.js の Data Cache）を破棄して、
   次のアクセスで必ず最新の内容を描画させる。

   メニュー・ブランドは force-dynamic のページだが、本番で古い料金が
   表示され続ける事象があったため、書き込み側からも明示的に破棄する。
   どのリソースがどのページ（トップ・llms.txt・sitemap など）に
   出ているかを個別に管理すると漏れやすいので、レイアウトごと丸ごと
   無効化する。更新頻度が低いサイトなのでコストは問題にならない。 */
export function revalidateSite(): void {
  try {
    revalidatePath("/", "layout");
  } catch (e) {
    // キャッシュ破棄の失敗で保存自体をエラーにはしない。
    console.error("revalidateSite:", e);
  }
}
