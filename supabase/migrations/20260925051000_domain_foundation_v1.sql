-- MyTrainX Domain Foundation V1
-- Project: oitfnnsfgaxcxqvizorw
-- 2026-09-25

create extension if not exists pgcrypto with schema extensions;

-- Supabase's RLS auto-enable helper should not be callable through the Data API.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke execute on function public.set_updated_at() from public, anon, authenticated;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  timezone text not null default 'America/Sao_Paulo',
  locale text not null default 'pt-BR',
  training_goal text,
  experience_level text,
  equipment jsonb not null default '{}'::jsonb,
  preferences jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  product_type text not null check (product_type in ('program','ebook','subscription','event','bundle','content_pack','addon')),
  price_cents integer check (price_cents is null or price_cents >= 0),
  currency text not null default 'BRL',
  active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  external_id text not null unique,
  user_email text not null,
  user_id uuid references auth.users(id) on delete set null,
  provider text not null,
  provider_payment_id text unique,
  product_slug text not null,
  product_id uuid references public.products(id) on delete restrict,
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'BRL',
  status text not null,
  source jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create table public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  user_id uuid references auth.users(id) on delete cascade,
  product_slug text not null,
  product_id uuid references public.products(id) on delete restrict,
  status text not null check (status in ('active','revoked','expired')),
  starts_at timestamptz not null default now(),
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint entitlements_email_product_unique unique (user_email, product_slug)
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  user_email text not null,
  plan_slug text not null,
  product_id uuid references public.products(id) on delete restrict,
  provider text,
  provider_subscription_id text unique,
  status text not null,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  cover_url text,
  product_id uuid references public.products(id) on delete set null,
  active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workouts (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs(id) on delete cascade,
  number integer not null check (number > 0),
  slug text not null unique,
  code text not null,
  title text,
  focus text,
  provider text not null,
  provider_asset_id text not null,
  duration_seconds integer check (duration_seconds is null or duration_seconds >= 0),
  active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint workouts_program_number_unique unique (program_id, number)
);

create table public.program_days (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs(id) on delete cascade,
  week integer not null check (week > 0),
  weekday integer not null check (weekday between 1 and 7),
  workout_id uuid not null references public.workouts(id) on delete cascade,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  constraint program_days_unique unique (program_id, week, weekday, order_index)
);

create table public.program_enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  program_id uuid not null references public.programs(id) on delete cascade,
  entitlement_id uuid references public.entitlements(id) on delete set null,
  status text not null default 'active' check (status in ('active','paused','completed','cancelled')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint program_enrollments_user_program_unique unique (user_id, program_id)
);

create table public.workout_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  workout_id uuid not null references public.workouts(id) on delete cascade,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  watch_seconds integer not null default 0 check (watch_seconds >= 0),
  percentage numeric(5,2) not null default 0 check (percentage >= 0 and percentage <= 100),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  key text not null,
  value jsonb not null,
  source text not null default 'user',
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint user_preferences_unique unique (user_id, key)
);

create table public.content_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  content_type text not null check (content_type in ('workout_video','educational_video','ebook_pdf','manual','recipe','article','checklist','program_material','event_live','audio','image')),
  language text not null default 'pt-BR',
  summary text,
  tags text[] not null default '{}',
  topics text[] not null default '{}',
  cover_url text,
  access_policy text not null default 'registered' check (access_policy in ('public','registered','owned_product','master','staff_only')),
  ai_index_policy text not null default 'metadata_only' check (ai_index_policy in ('none','metadata_only','retrievable')),
  status text not null default 'inventory' check (status in ('inventory','needs_ingestion','indexed','published','archived')),
  version integer not null default 1 check (version > 0),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.content_sources (
  id uuid primary key default gen_random_uuid(),
  content_id uuid not null references public.content_items(id) on delete cascade,
  provider text not null check (provider in ('google_drive','upload','external','generated')),
  external_id text,
  source_url text,
  media_url text,
  transcript_status text not null default 'none' check (transcript_status in ('none','pending','ready','failed')),
  extraction_status text not null default 'none' check (extraction_status in ('none','pending','ready','failed')),
  transcript_text text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint content_sources_provider_external_unique unique nulls not distinct (provider, external_id)
);

create table public.content_product_access (
  content_id uuid not null references public.content_items(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (content_id, product_id)
);

create table public.recipes (
  content_id uuid primary key references public.content_items(id) on delete cascade,
  meal_type text,
  servings numeric check (servings is null or servings > 0),
  ingredients jsonb not null default '[]'::jsonb,
  steps jsonb not null default '[]'::jsonb,
  allergens text[] not null default '{}',
  nutrition jsonb,
  metadata jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  event_type text,
  start_at timestamptz,
  end_at timestamptz,
  location_or_url text,
  capacity integer check (capacity is null or capacity >= 0),
  access_policy text not null default 'registered' check (access_policy in ('public','registered','master','owned_product')),
  product_id uuid references public.products(id) on delete set null,
  price_cents integer check (price_cents is null or price_cents >= 0),
  status text not null default 'draft' check (status in ('draft','published','cancelled','completed')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index orders_user_id_idx on public.orders(user_id);
create index orders_user_email_idx on public.orders(lower(user_email));
create index orders_product_slug_idx on public.orders(product_slug);
create index orders_status_idx on public.orders(status);

create index entitlements_user_id_idx on public.entitlements(user_id);
create index entitlements_user_email_idx on public.entitlements(lower(user_email));
create index entitlements_product_slug_idx on public.entitlements(product_slug);
create index entitlements_status_idx on public.entitlements(status);

create index subscriptions_user_id_idx on public.subscriptions(user_id);
create index subscriptions_user_email_idx on public.subscriptions(lower(user_email));
create index subscriptions_status_idx on public.subscriptions(status);

create index workouts_program_id_idx on public.workouts(program_id);
create index program_days_program_id_idx on public.program_days(program_id);
create index program_enrollments_user_id_idx on public.program_enrollments(user_id);
create index workout_progress_user_id_idx on public.workout_progress(user_id);
create index workout_progress_workout_id_idx on public.workout_progress(workout_id);
create index user_preferences_user_id_idx on public.user_preferences(user_id);
create index content_items_status_idx on public.content_items(status);
create index content_items_access_policy_idx on public.content_items(access_policy);
create index content_items_tags_gin_idx on public.content_items using gin(tags);
create index content_items_topics_gin_idx on public.content_items using gin(topics);
create index content_sources_content_id_idx on public.content_sources(content_id);
create index content_product_access_product_id_idx on public.content_product_access(product_id);
create index events_status_idx on public.events(status);
create index events_start_at_idx on public.events(start_at);

create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger products_set_updated_at before update on public.products for each row execute function public.set_updated_at();
create trigger entitlements_set_updated_at before update on public.entitlements for each row execute function public.set_updated_at();
create trigger subscriptions_set_updated_at before update on public.subscriptions for each row execute function public.set_updated_at();
create trigger programs_set_updated_at before update on public.programs for each row execute function public.set_updated_at();
create trigger workouts_set_updated_at before update on public.workouts for each row execute function public.set_updated_at();
create trigger program_enrollments_set_updated_at before update on public.program_enrollments for each row execute function public.set_updated_at();
create trigger workout_progress_set_updated_at before update on public.workout_progress for each row execute function public.set_updated_at();
create trigger user_preferences_set_updated_at before update on public.user_preferences for each row execute function public.set_updated_at();
create trigger content_items_set_updated_at before update on public.content_items for each row execute function public.set_updated_at();
create trigger content_sources_set_updated_at before update on public.content_sources for each row execute function public.set_updated_at();
create trigger recipes_set_updated_at before update on public.recipes for each row execute function public.set_updated_at();
create trigger events_set_updated_at before update on public.events for each row execute function public.set_updated_at();

-- Explicit RLS for every exposed public table.
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.entitlements enable row level security;
alter table public.subscriptions enable row level security;
alter table public.programs enable row level security;
alter table public.workouts enable row level security;
alter table public.program_days enable row level security;
alter table public.program_enrollments enable row level security;
alter table public.workout_progress enable row level security;
alter table public.user_preferences enable row level security;
alter table public.content_items enable row level security;
alter table public.content_sources enable row level security;
alter table public.content_product_access enable row level security;
alter table public.recipes enable row level security;
alter table public.events enable row level security;

create policy "profiles_select_own" on public.profiles
for select to authenticated
using ((select auth.uid()) is not null and id = (select auth.uid()));

create policy "profiles_insert_own" on public.profiles
for insert to authenticated
with check ((select auth.uid()) is not null and id = (select auth.uid()));

create policy "profiles_update_own" on public.profiles
for update to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

create policy "products_select_active" on public.products
for select to anon, authenticated
using (active = true);

create policy "orders_select_own" on public.orders
for select to authenticated
using (
  user_id = (select auth.uid())
  or lower(user_email) = lower(coalesce((select auth.jwt()->>'email'), ''))
);

create policy "entitlements_select_own" on public.entitlements
for select to authenticated
using (
  user_id = (select auth.uid())
  or lower(user_email) = lower(coalesce((select auth.jwt()->>'email'), ''))
);

create policy "subscriptions_select_own" on public.subscriptions
for select to authenticated
using (
  user_id = (select auth.uid())
  or lower(user_email) = lower(coalesce((select auth.jwt()->>'email'), ''))
);

create policy "programs_select_active" on public.programs
for select to anon, authenticated
using (active = true);

create policy "workouts_select_active" on public.workouts
for select to anon, authenticated
using (
  active = true
  and exists (
    select 1 from public.programs p
    where p.id = workouts.program_id and p.active = true
  )
);

create policy "program_days_select_active" on public.program_days
for select to anon, authenticated
using (
  exists (
    select 1 from public.programs p
    where p.id = program_days.program_id and p.active = true
  )
);

create policy "program_enrollments_select_own" on public.program_enrollments
for select to authenticated
using (user_id = (select auth.uid()));

create policy "workout_progress_select_own" on public.workout_progress
for select to authenticated
using (user_id = (select auth.uid()));

create policy "workout_progress_insert_own" on public.workout_progress
for insert to authenticated
with check (user_id = (select auth.uid()));

create policy "workout_progress_update_own" on public.workout_progress
for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

create policy "workout_progress_delete_own" on public.workout_progress
for delete to authenticated
using (user_id = (select auth.uid()));

create policy "user_preferences_select_own" on public.user_preferences
for select to authenticated
using (user_id = (select auth.uid()));

create policy "user_preferences_insert_own" on public.user_preferences
for insert to authenticated
with check (user_id = (select auth.uid()));

create policy "user_preferences_update_own" on public.user_preferences
for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

create policy "user_preferences_delete_own" on public.user_preferences
for delete to authenticated
using (user_id = (select auth.uid()));

create policy "content_product_access_select" on public.content_product_access
for select to anon, authenticated
using (true);

create policy "content_items_select_authorized" on public.content_items
for select to anon, authenticated
using (
  status = 'published'
  and (
    access_policy = 'public'
    or (
      access_policy = 'registered'
      and (select auth.uid()) is not null
    )
    or (
      access_policy = 'owned_product'
      and (select auth.uid()) is not null
      and exists (
        select 1
        from public.content_product_access cpa
        join public.products p on p.id = cpa.product_id
        join public.entitlements e on e.product_slug = p.slug
        where cpa.content_id = content_items.id
          and e.status = 'active'
          and (e.expires_at is null or e.expires_at > now())
          and (
            e.user_id = (select auth.uid())
            or lower(e.user_email) = lower(coalesce((select auth.jwt()->>'email'), ''))
          )
      )
    )
    or (
      access_policy = 'master'
      and (select auth.uid()) is not null
      and exists (
        select 1
        from public.subscriptions s
        where s.status = 'active'
          and (s.current_period_end is null or s.current_period_end > now())
          and (
            s.user_id = (select auth.uid())
            or lower(s.user_email) = lower(coalesce((select auth.jwt()->>'email'), ''))
          )
      )
    )
  )
);

-- content_sources intentionally has no anon/authenticated SELECT policy.

create policy "recipes_select_authorized" on public.recipes
for select to anon, authenticated
using (
  exists (
    select 1 from public.content_items ci
    where ci.id = recipes.content_id
  )
);

create policy "events_select_authorized" on public.events
for select to anon, authenticated
using (
  status = 'published'
  and (
    access_policy = 'public'
    or (access_policy = 'registered' and (select auth.uid()) is not null)
    or (
      access_policy = 'master'
      and exists (
        select 1 from public.subscriptions s
        where s.status = 'active'
          and (s.current_period_end is null or s.current_period_end > now())
          and (
            s.user_id = (select auth.uid())
            or lower(s.user_email) = lower(coalesce((select auth.jwt()->>'email'), ''))
          )
      )
    )
    or (
      access_policy = 'owned_product'
      and product_id is not null
      and exists (
        select 1
        from public.products p
        join public.entitlements e on e.product_slug = p.slug
        where p.id = events.product_id
          and e.status = 'active'
          and (e.expires_at is null or e.expires_at > now())
          and (
            e.user_id = (select auth.uid())
            or lower(e.user_email) = lower(coalesce((select auth.jwt()->>'email'), ''))
          )
      )
    )
  )
);

-- Remove implicit broad privileges and grant only what the product needs.
revoke all on table
  public.profiles,
  public.products,
  public.orders,
  public.entitlements,
  public.subscriptions,
  public.programs,
  public.workouts,
  public.program_days,
  public.program_enrollments,
  public.workout_progress,
  public.user_preferences,
  public.content_items,
  public.content_sources,
  public.content_product_access,
  public.recipes,
  public.events
from anon, authenticated;

grant select on public.products, public.programs, public.workouts, public.program_days,
  public.content_items, public.content_product_access, public.recipes, public.events
to anon, authenticated;

grant select, insert, update on public.profiles to authenticated;
grant select on public.orders, public.entitlements, public.subscriptions, public.program_enrollments to authenticated;
grant select, insert, update, delete on public.workout_progress, public.user_preferences to authenticated;

grant all on table
  public.profiles,
  public.products,
  public.orders,
  public.entitlements,
  public.subscriptions,
  public.programs,
  public.workouts,
  public.program_days,
  public.program_enrollments,
  public.workout_progress,
  public.user_preferences,
  public.content_items,
  public.content_sources,
  public.content_product_access,
  public.recipes,
  public.events
to service_role;
