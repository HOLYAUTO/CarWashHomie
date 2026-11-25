-- Footnotes shown under the /menu price tables (「※ シミや汚れのない新車価格」
-- etc.), editable from the admin panel instead of being hard-coded in
-- components/Services.tsx. One row per footnote line; `section` picks the
-- price table it sits under. Mirrors the other menu tables: public read of
-- published rows only (RLS), writes through the service-role admin API,
-- and updated_at maintained by the shared set_updated_at() trigger.

create table if not exists public.menu_notes (
  id uuid primary key default gen_random_uuid(),
  section text not null
    check (section in ('body', 'interior', 'glass', 'wheel')),
  body text not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists menu_notes_section_sort_idx
  on public.menu_notes (section, sort_order);

alter table public.menu_notes enable row level security;

drop policy if exists "public read published menu_notes" on public.menu_notes;
create policy "public read published menu_notes"
  on public.menu_notes
  for select
  to anon, authenticated
  using (published = true);

drop trigger if exists trg_menu_notes_updated_at on public.menu_notes;
create trigger trg_menu_notes_updated_at
  before update on public.menu_notes
  for each row execute function public.set_updated_at();

-- Seed with the footnotes that were hard-coded on the site, only if the
-- table is still empty (so re-running never duplicates or overwrites edits).
insert into public.menu_notes (section, body, sort_order)
select v.section, v.body, v.sort_order
from (values
  ('body',     '※ 全てケミカル洗車・研磨あり', 1),
  ('body',     '※ 耐久年数はお客様とのご協力次第になります。環境やメンテナンス状況もご考慮ください。', 2),
  ('body',     '※ お車の大きさ・新車／中古、花粉時期や新車時の状態によって内容・金額が変動する場合がございます。', 3),
  ('interior', '※ 汚れ・素材に応じて金額が前後する場合がございます。事前の問診にてすり合わせさせていただきます。', 4),
  ('glass',    '※ シミや汚れのない新車価格', 5),
  ('glass',    '※ 1年保証ですが使用頻度や使用状況で変化', 6),
  ('glass',    '※ 愛車検証で3年経過後も撥水性能は良好です（2026年2月現在）', 7),
  ('wheel',    '※ ボディーコーティングとセットがお得になりますので、同時施工をおすすめいたします！', 8)
) as v(section, body, sort_order)
where not exists (select 1 from public.menu_notes);
