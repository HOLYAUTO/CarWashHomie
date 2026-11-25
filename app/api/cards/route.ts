import { NextResponse } from "next/server";
import { getCards } from "@/lib/content";

/* GET /api/cards — public list of PUBLISHED collectible cards.
   Read by the client CollectionProvider to render the book / badge
   and to look up each dropped card's visual. Kept dynamic so newly
   published cards appear without a redeploy. */

export const dynamic = "force-dynamic";
// force-dynamic alone does not stop Next.js 14 from caching the Supabase
// fetch inside a route handler (the Data Cache served the first result
// forever, so admin-panel card edits never showed up). Opt out explicitly,
// as the force-dynamic pages do.
export const fetchCache = "force-no-store";

export async function GET() {
  const cards = await getCards();
  return NextResponse.json(
    { cards },
    { headers: { "Cache-Control": "no-store" } },
  );
}
