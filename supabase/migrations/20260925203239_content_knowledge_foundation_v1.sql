-- MyTrainX Content & Knowledge Foundation V1
-- Applied to Supabase project oitfnnsfgaxcxqvizorw.
-- Extends the existing domain foundation without changing current WKT/auth/payment behavior.

alter table public.content_items
  add column if not exists subtitle text,
  add column if not exists audience text[] not null default '{}',
  add column if not exists difficulty text,
  add column if not exists estimated_duration_seconds integer,
  add column if not exists reading_time_minutes integer,
  add column if not exists downloadable boolean not null default false,
  add column if not exists featured boolean not null default false,
  add column if not exists sort_priority integer not null default 0,
  add column if not exists published_at timestamptz;

alter table public.content_items
  drop constraint if exists content_items_difficulty_check,
  add constraint content_items_difficulty_check
    check (difficulty is null or difficulty = any (array['beginner','intermediate','advanced','all_levels'])),
  drop constraint if exists content_items_estimated_duration_seconds_check,
  add constraint content_items_estimated_duration_seconds_check
    check (estimated_duration_seconds is null or estimated_duration_seconds >= 0),
  drop constraint if exists content_items_reading_time_minutes_check,
  add constraint content_items_reading_time_minutes_check
    check (reading_time_minutes is null or reading_time_minutes >= 0);

create table if not exists public.source_collections (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.source_collections(id) on delete cascade,
  slug text not null unique,
  name text not null,
  provider text not null check (provider = any (array[
    'google_drive','github','upload','owned','external','usda_fdc',
    'open_food_facts','who','nhs','gov_br','other'
  ])),
  external_id text,
  source_url text,
  source_kind text not null check (source_kind = any (array[
    'drive_folder','archive','dataset','website','api','manual_upload','owned_production','other'
  ])),
  relevance_status text not null default 'unreviewed' check (relevance_status = any (array[
    'core','adjacent','quarantine','excluded','unreviewed'
  ])),
  default_rights_basis text not null default 'unknown' check (default_rights_basis = any (array[
    'owned','commissioned','plr','public_domain','cc0','cc_by','cc_by_sa','odbl',
    'ogl','licensed','reference_only','unknown'
  ])),
  rights_verification_status text not null default 'unverified' check (rights_verification_status = any (array[
    'unverified','pending','verified','restricted','disputed'
  ])),
  ingestion_policy text not null default 'inventory_only' check (ingestion_policy = any (array[
    'inventory_only','metadata','extract_text','transcribe','full'
  ])),
  ai_policy_default text not null default 'none' check (ai_policy_default = any (array[
    'none','metadata_only','retrievable'
  ])),
  domain_tags text[] not null default '{}',
  status text not null default 'active' check (status = any (array[
    'active','paused','quarantined','archived'
  ])),
  last_scanned_at timestamptz,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.content_sources
  add column if not exists source_collection_id uuid references public.source_collections(id) on delete set null,
  add column if not exists source_path text,
  add column if not exists original_title text,
  add column if not exists mime_type text,
  add column if not exists size_bytes bigint,
  add column if not exists checksum_sha256 text,
  add column if not exists last_scanned_at timestamptz;

alter table public.content_sources
  drop constraint if exists content_sources_provider_check;
alter table public.content_sources
  add constraint content_sources_provider_check
  check (provider = any (array[
    'google_drive','upload','external','generated','github','owned_media',
    'usda_fdc','open_food_facts','who','nhs','gov_br'
  ]));

create table if not exists public.content_rights (
  content_id uuid primary key references public.content_items(id) on delete cascade,
  rights_basis text not null default 'unknown' check (rights_basis = any (array[
    'owned','commissioned','plr','public_domain','cc0','cc_by','cc_by_sa','odbl',
    'ogl','licensed','reference_only','unknown'
  ])),
  copyright_holder text,
  license_name text,
  license_url text,
  license_document_url text,
  commercial_use_allowed boolean,
  derivatives_allowed boolean,
  redistribution_allowed boolean,
  attribution_required boolean,
  attribution_text text,
  ai_retrieval_allowed boolean,
  ai_derivative_generation_allowed boolean,
  verification_status text not null default 'unverified' check (verification_status = any (array[
    'unverified','pending','verified','restricted','expired','disputed'
  ])),
  verified_at timestamptz,
  verified_by text,
  notes text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_reviews (
  id uuid primary key default gen_random_uuid(),
  content_id uuid not null references public.content_items(id) on delete cascade,
  review_type text not null check (review_type = any (array[
    'editorial','scientific','legal','safety','nutrition','exercise'
  ])),
  status text not null default 'pending' check (status = any (array[
    'pending','approved','changes_required','rejected','expired'
  ])),
  reviewer_name text,
  reviewer_role text,
  review_version integer not null default 1 check (review_version > 0),
  notes text,
  evidence_urls text[] not null default '{}',
  reviewed_at timestamptz,
  expires_at timestamptz,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.content_collections (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  collection_type text not null check (collection_type = any (array[
    'shelf','series','course','challenge','ebook_bundle','recipe_pack','knowledge_pack','pathway'
  ])),
  access_policy text not null default 'registered' check (access_policy = any (array[
    'public','registered','owned_product','master','staff_only'
  ])),
  cover_url text,
  status text not null default 'draft' check (status = any (array[
    'draft','published','archived'
  ])),
  sort_priority integer not null default 0,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_collection_product_access (
  collection_id uuid not null references public.content_collections(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (collection_id, product_id)
);

create table if not exists public.content_collection_items (
  collection_id uuid not null references public.content_collections(id) on delete cascade,
  content_id uuid not null references public.content_items(id) on delete cascade,
  position integer not null default 0,
  section_title text,
  is_required boolean not null default false,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  primary key (collection_id, content_id)
);

create table if not exists public.taxonomy_terms (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  kind text not null check (kind = any (array[
    'domain','topic','goal','format','equipment','muscle','movement_pattern',
    'skill','dietary','audience','lifecycle','safety'
  ])),
  parent_id uuid references public.taxonomy_terms(id) on delete set null,
  aliases text[] not null default '{}',
  description text,
  active boolean not null default true,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_taxonomy (
  content_id uuid not null references public.content_items(id) on delete cascade,
  term_id uuid not null references public.taxonomy_terms(id) on delete cascade,
  role text not null default 'filter' check (role = any (array[
    'primary','secondary','filter','safety'
  ])),
  weight numeric(5,4) not null default 1 check (weight >= 0 and weight <= 1),
  created_at timestamptz not null default now(),
  primary key (content_id, term_id)
);

create table if not exists public.content_relationships (
  source_content_id uuid not null references public.content_items(id) on delete cascade,
  target_content_id uuid not null references public.content_items(id) on delete cascade,
  relation_type text not null check (relation_type = any (array[
    'part_of','prerequisite','next','related','companion','translation_of',
    'transcript_of','supersedes','derived_from','references'
  ])),
  position integer not null default 0,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  primary key (source_content_id, target_content_id, relation_type),
  check (source_content_id <> target_content_id)
);

create table if not exists public.user_content_state (
  user_id uuid not null references auth.users(id) on delete cascade,
  content_id uuid not null references public.content_items(id) on delete cascade,
  state text not null default 'saved' check (state = any (array[
    'saved','in_progress','completed','hidden'
  ])),
  progress_percent numeric(5,2) not null default 0 check (progress_percent >= 0 and progress_percent <= 100),
  last_position_seconds integer check (last_position_seconds is null or last_position_seconds >= 0),
  last_page integer check (last_page is null or last_page >= 1),
  saved_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  last_opened_at timestamptz,
  metadata jsonb not null default '{}',
  updated_at timestamptz not null default now(),
  primary key (user_id, content_id)
);

create table if not exists public.exercises (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  canonical_name text,
  locale text not null default 'pt-BR',
  aliases text[] not null default '{}',
  exercise_type text not null default 'strength' check (exercise_type = any (array[
    'strength','conditioning','mobility','flexibility','balance','skill',
    'warmup','recovery','other'
  ])),
  difficulty text not null default 'all_levels' check (difficulty = any (array[
    'beginner','intermediate','advanced','all_levels'
  ])),
  equipment text[] not null default '{}',
  primary_muscles text[] not null default '{}',
  secondary_muscles text[] not null default '{}',
  movement_patterns text[] not null default '{}',
  body_regions text[] not null default '{}',
  instructions jsonb not null default '[]',
  coaching_cues jsonb not null default '[]',
  common_mistakes jsonb not null default '[]',
  safety_notes jsonb not null default '[]',
  status text not null default 'draft' check (status = any (array[
    'draft','review','published','archived'
  ])),
  review_status text not null default 'unreviewed' check (review_status = any (array[
    'unreviewed','pending','approved','changes_required'
  ])),
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.exercise_content_links (
  exercise_id uuid not null references public.exercises(id) on delete cascade,
  content_id uuid not null references public.content_items(id) on delete cascade,
  relation_type text not null check (relation_type = any (array[
    'demo','tutorial','progression_guide','regression_guide','article','workout_usage'
  ])),
  position integer not null default 0,
  created_at timestamptz not null default now(),
  primary key (exercise_id, content_id, relation_type)
);

create table if not exists public.exercise_relations (
  exercise_id uuid not null references public.exercises(id) on delete cascade,
  related_exercise_id uuid not null references public.exercises(id) on delete cascade,
  relation_type text not null check (relation_type = any (array[
    'progression','regression','alternative','variation','warmup','mobility'
  ])),
  rank integer not null default 0,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  primary key (exercise_id, related_exercise_id, relation_type),
  check (exercise_id <> related_exercise_id)
);

create table if not exists public.food_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  brand text,
  locale text not null default 'pt-BR',
  source_provider text,
  source_external_id text,
  food_group text,
  default_serving_quantity numeric,
  default_serving_unit text,
  allergens text[] not null default '{}',
  status text not null default 'draft' check (status = any (array[
    'draft','review','published','archived'
  ])),
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique nulls not distinct (source_provider, source_external_id)
);

create table if not exists public.food_nutrients (
  food_id uuid not null references public.food_items(id) on delete cascade,
  nutrient_code text not null,
  nutrient_name text not null,
  amount_per_100g numeric,
  unit text not null,
  source_version text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  primary key (food_id, nutrient_code)
);

create table if not exists public.recipe_ingredients (
  id uuid primary key default gen_random_uuid(),
  recipe_content_id uuid not null references public.recipes(content_id) on delete cascade,
  food_id uuid references public.food_items(id) on delete set null,
  raw_name text not null,
  quantity numeric,
  unit text,
  preparation text,
  optional boolean not null default false,
  position integer not null default 0,
  metadata jsonb not null default '{}'
);

create table if not exists public.knowledge_documents (
  id uuid primary key default gen_random_uuid(),
  content_id uuid not null references public.content_items(id) on delete cascade,
  source_id uuid references public.content_sources(id) on delete set null,
  version integer not null default 1 check (version > 0),
  status text not null default 'pending' check (status = any (array[
    'pending','ready','failed','stale','blocked'
  ])),
  extraction_method text,
  source_checksum text,
  language text not null default 'pt-BR',
  char_count integer check (char_count is null or char_count >= 0),
  token_estimate integer check (token_estimate is null or token_estimate >= 0),
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (content_id, source_id, version)
);

create table if not exists public.knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.knowledge_documents(id) on delete cascade,
  ordinal integer not null check (ordinal >= 0),
  heading text,
  body text not null,
  token_count integer check (token_count is null or token_count >= 0),
  locator jsonb not null default '{}',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  unique (document_id, ordinal)
);

create index if not exists content_items_library_idx
  on public.content_items(status, access_policy, sort_priority desc);
create index if not exists content_items_tags_idx
  on public.content_items using gin(tags);
create index if not exists content_items_topics_idx
  on public.content_items using gin(topics);
create index if not exists source_collections_parent_idx on public.source_collections(parent_id);
create index if not exists source_collections_relevance_idx on public.source_collections(relevance_status, status);
create index if not exists content_sources_collection_idx on public.content_sources(source_collection_id);
create index if not exists content_rights_verification_idx on public.content_rights(verification_status, rights_basis);
create index if not exists content_reviews_content_idx on public.content_reviews(content_id, review_type, status);
create index if not exists content_collections_library_idx on public.content_collections(status, access_policy, sort_priority desc);
create index if not exists content_collection_items_position_idx on public.content_collection_items(collection_id, position);
create index if not exists taxonomy_terms_kind_idx on public.taxonomy_terms(kind, active);
create index if not exists taxonomy_terms_parent_idx on public.taxonomy_terms(parent_id);
create index if not exists content_taxonomy_term_idx on public.content_taxonomy(term_id, role);
create index if not exists user_content_state_content_idx on public.user_content_state(content_id, state);
create index if not exists exercises_type_idx on public.exercises(status, exercise_type, difficulty);
create index if not exists exercises_equipment_idx on public.exercises using gin(equipment);
create index if not exists exercises_primary_muscles_idx on public.exercises using gin(primary_muscles);
create index if not exists food_items_source_idx on public.food_items(source_provider, source_external_id);
create index if not exists recipe_ingredients_recipe_idx on public.recipe_ingredients(recipe_content_id, position);
create index if not exists knowledge_documents_content_idx on public.knowledge_documents(content_id, status);
create index if not exists knowledge_chunks_document_idx on public.knowledge_chunks(document_id, ordinal);
create index if not exists knowledge_chunks_fts_idx on public.knowledge_chunks using gin (to_tsvector('simple', body));

drop trigger if exists source_collections_set_updated_at on public.source_collections;
create trigger source_collections_set_updated_at before update on public.source_collections
for each row execute function public.set_updated_at();

drop trigger if exists content_rights_set_updated_at on public.content_rights;
create trigger content_rights_set_updated_at before update on public.content_rights
for each row execute function public.set_updated_at();

drop trigger if exists content_collections_set_updated_at on public.content_collections;
create trigger content_collections_set_updated_at before update on public.content_collections
for each row execute function public.set_updated_at();

drop trigger if exists taxonomy_terms_set_updated_at on public.taxonomy_terms;
create trigger taxonomy_terms_set_updated_at before update on public.taxonomy_terms
for each row execute function public.set_updated_at();

drop trigger if exists user_content_state_set_updated_at on public.user_content_state;
create trigger user_content_state_set_updated_at before update on public.user_content_state
for each row execute function public.set_updated_at();

drop trigger if exists exercises_set_updated_at on public.exercises;
create trigger exercises_set_updated_at before update on public.exercises
for each row execute function public.set_updated_at();

drop trigger if exists food_items_set_updated_at on public.food_items;
create trigger food_items_set_updated_at before update on public.food_items
for each row execute function public.set_updated_at();

drop trigger if exists knowledge_documents_set_updated_at on public.knowledge_documents;
create trigger knowledge_documents_set_updated_at before update on public.knowledge_documents
for each row execute function public.set_updated_at();

alter table public.source_collections enable row level security;
alter table public.content_rights enable row level security;
alter table public.content_reviews enable row level security;
alter table public.content_collections enable row level security;
alter table public.content_collection_product_access enable row level security;
alter table public.content_collection_items enable row level security;
alter table public.taxonomy_terms enable row level security;
alter table public.content_taxonomy enable row level security;
alter table public.content_relationships enable row level security;
alter table public.user_content_state enable row level security;
alter table public.exercises enable row level security;
alter table public.exercise_content_links enable row level security;
alter table public.exercise_relations enable row level security;
alter table public.food_items enable row level security;
alter table public.food_nutrients enable row level security;
alter table public.recipe_ingredients enable row level security;
alter table public.knowledge_documents enable row level security;
alter table public.knowledge_chunks enable row level security;

drop policy if exists content_collections_select_authorized on public.content_collections;
create policy content_collections_select_authorized
on public.content_collections for select
to anon, authenticated
using (
  status = 'published'
  and (
    access_policy = 'public'
    or (access_policy = 'registered' and (select auth.uid()) is not null)
    or (
      access_policy = 'owned_product'
      and (select auth.uid()) is not null
      and exists (
        select 1
        from public.content_collection_product_access ccpa
        join public.products p on p.id = ccpa.product_id
        join public.entitlements e on e.product_slug = p.slug
        where ccpa.collection_id = content_collections.id
          and e.status = 'active'
          and (e.expires_at is null or e.expires_at > now())
          and (
            e.user_id = (select auth.uid())
            or lower(e.user_email) = lower(coalesce((select auth.jwt()) ->> 'email',''))
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
            or lower(s.user_email) = lower(coalesce((select auth.jwt()) ->> 'email',''))
          )
      )
    )
  )
);

drop policy if exists content_collection_product_access_select on public.content_collection_product_access;
create policy content_collection_product_access_select
on public.content_collection_product_access for select
to anon, authenticated using (true);

drop policy if exists content_collection_items_select_authorized on public.content_collection_items;
create policy content_collection_items_select_authorized
on public.content_collection_items for select
to anon, authenticated
using (
  exists (select 1 from public.content_collections c where c.id = collection_id)
  and exists (select 1 from public.content_items ci where ci.id = content_id)
);

drop policy if exists taxonomy_terms_select_active on public.taxonomy_terms;
create policy taxonomy_terms_select_active
on public.taxonomy_terms for select
to anon, authenticated using (active = true);

drop policy if exists content_taxonomy_select_authorized on public.content_taxonomy;
create policy content_taxonomy_select_authorized
on public.content_taxonomy for select
to anon, authenticated
using (exists (select 1 from public.content_items ci where ci.id = content_id));

drop policy if exists content_relationships_select_authorized on public.content_relationships;
create policy content_relationships_select_authorized
on public.content_relationships for select
to anon, authenticated
using (
  exists (select 1 from public.content_items a where a.id = source_content_id)
  and exists (select 1 from public.content_items b where b.id = target_content_id)
);

drop policy if exists user_content_state_select_own on public.user_content_state;
create policy user_content_state_select_own
on public.user_content_state for select to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists user_content_state_insert_own on public.user_content_state;
create policy user_content_state_insert_own
on public.user_content_state for insert to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists user_content_state_update_own on public.user_content_state;
create policy user_content_state_update_own
on public.user_content_state for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists user_content_state_delete_own on public.user_content_state;
create policy user_content_state_delete_own
on public.user_content_state for delete to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists exercises_select_published on public.exercises;
create policy exercises_select_published
on public.exercises for select to anon, authenticated
using (status = 'published');

drop policy if exists exercise_content_links_select_authorized on public.exercise_content_links;
create policy exercise_content_links_select_authorized
on public.exercise_content_links for select to anon, authenticated
using (
  exists (select 1 from public.exercises e where e.id = exercise_id)
  and exists (select 1 from public.content_items ci where ci.id = content_id)
);

drop policy if exists exercise_relations_select_published on public.exercise_relations;
create policy exercise_relations_select_published
on public.exercise_relations for select to anon, authenticated
using (
  exists (select 1 from public.exercises e1 where e1.id = exercise_id)
  and exists (select 1 from public.exercises e2 where e2.id = related_exercise_id)
);

drop policy if exists food_items_select_published on public.food_items;
create policy food_items_select_published
on public.food_items for select to anon, authenticated
using (status = 'published');

drop policy if exists food_nutrients_select_published on public.food_nutrients;
create policy food_nutrients_select_published
on public.food_nutrients for select to anon, authenticated
using (exists (select 1 from public.food_items f where f.id = food_id));

drop policy if exists recipe_ingredients_select_authorized on public.recipe_ingredients;
create policy recipe_ingredients_select_authorized
on public.recipe_ingredients for select to anon, authenticated
using (exists (select 1 from public.content_items ci where ci.id = recipe_content_id));

grant select on public.content_items to anon, authenticated;
grant select on public.content_product_access to anon, authenticated;
grant select on public.recipes to anon, authenticated;
grant select on public.content_collections to anon, authenticated;
grant select on public.content_collection_product_access to anon, authenticated;
grant select on public.content_collection_items to anon, authenticated;
grant select on public.taxonomy_terms to anon, authenticated;
grant select on public.content_taxonomy to anon, authenticated;
grant select on public.content_relationships to anon, authenticated;
grant select on public.exercises to anon, authenticated;
grant select on public.exercise_content_links to anon, authenticated;
grant select on public.exercise_relations to anon, authenticated;
grant select on public.food_items to anon, authenticated;
grant select on public.food_nutrients to anon, authenticated;
grant select on public.recipe_ingredients to anon, authenticated;
grant select, insert, update, delete on public.user_content_state to authenticated;

revoke all on public.source_collections from anon, authenticated;
revoke all on public.content_rights from anon, authenticated;
revoke all on public.content_reviews from anon, authenticated;
revoke all on public.knowledge_documents from anon, authenticated;
revoke all on public.knowledge_chunks from anon, authenticated;
revoke all on public.content_sources from anon, authenticated;

grant select, insert, update, delete on public.source_collections to service_role;
grant select, insert, update, delete on public.content_rights to service_role;
grant select, insert, update, delete on public.content_reviews to service_role;
grant select, insert, update, delete on public.content_collections to service_role;
grant select, insert, update, delete on public.content_collection_product_access to service_role;
grant select, insert, update, delete on public.content_collection_items to service_role;
grant select, insert, update, delete on public.taxonomy_terms to service_role;
grant select, insert, update, delete on public.content_taxonomy to service_role;
grant select, insert, update, delete on public.content_relationships to service_role;
grant select, insert, update, delete on public.user_content_state to service_role;
grant select, insert, update, delete on public.exercises to service_role;
grant select, insert, update, delete on public.exercise_content_links to service_role;
grant select, insert, update, delete on public.exercise_relations to service_role;
grant select, insert, update, delete on public.food_items to service_role;
grant select, insert, update, delete on public.food_nutrients to service_role;
grant select, insert, update, delete on public.recipe_ingredients to service_role;
grant select, insert, update, delete on public.knowledge_documents to service_role;
grant select, insert, update, delete on public.knowledge_chunks to service_role;
grant select, insert, update, delete on public.content_sources to service_role;
