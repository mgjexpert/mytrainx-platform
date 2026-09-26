create table public.progress_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  height_cm numeric(5,2) check (height_cm is null or (height_cm >= 50 and height_cm <= 260)),
  unit_system text not null default 'metric' check (unit_system in ('metric','imperial')),
  weigh_in_frequency text not null default 'optional' check (weigh_in_frequency in ('optional','daily','weekly')),
  trend_window_days integer not null default 7 check (trend_window_days between 3 and 30),
  weekly_checkin_weekday smallint not null default 1 check (weekly_checkin_weekday between 1 and 7),
  progress_photo_frequency text not null default 'monthly' check (progress_photo_frequency in ('never','weekly','biweekly','monthly')),
  photo_ai_analysis_opt_in boolean not null default false,
  preferences jsonb not null default '{}'::jsonb check (jsonb_typeof(preferences) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.body_metric_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  measured_at timestamptz not null default now(),
  measurement_method text not null default 'manual_scale'
    check (measurement_method in ('manual_scale','smart_scale_bia','bia_professional','dexa','bodpod','skinfold','3d_scan','other')),
  measurement_quality text not null default 'unverified'
    check (measurement_quality in ('unverified','consumer_estimate','professional_estimate','reference_method')),
  source_provider text,
  source_external_id text,
  device_name text,
  weight_kg numeric(6,2) check (weight_kg is null or (weight_kg > 0 and weight_kg <= 500)),
  body_fat_pct numeric(5,2) check (body_fat_pct is null or (body_fat_pct >= 0 and body_fat_pct <= 100)),
  lean_mass_kg numeric(6,2) check (lean_mass_kg is null or (lean_mass_kg >= 0 and lean_mass_kg <= 500)),
  muscle_mass_kg numeric(6,2) check (muscle_mass_kg is null or (muscle_mass_kg >= 0 and muscle_mass_kg <= 500)),
  fat_mass_kg numeric(6,2) check (fat_mass_kg is null or (fat_mass_kg >= 0 and fat_mass_kg <= 500)),
  bone_mass_kg numeric(6,2) check (bone_mass_kg is null or (bone_mass_kg >= 0 and bone_mass_kg <= 50)),
  hydration_pct numeric(5,2) check (hydration_pct is null or (hydration_pct >= 0 and hydration_pct <= 100)),
  notes text,
  raw_metrics jsonb not null default '{}'::jsonb check (jsonb_typeof(raw_metrics) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    weight_kg is not null
    or body_fat_pct is not null
    or lean_mass_kg is not null
    or muscle_mass_kg is not null
    or fat_mass_kg is not null
    or bone_mass_kg is not null
    or hydration_pct is not null
  )
);
create index body_metric_entries_user_measured_idx on public.body_metric_entries (user_id, measured_at desc);

create table public.body_circumference_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  measured_at timestamptz not null default now(),
  measurement_method text not null default 'tape'
    check (measurement_method in ('tape','professional_tape','3d_scan','other')),
  waist_cm numeric(6,2) check (waist_cm is null or (waist_cm > 0 and waist_cm <= 300)),
  hip_cm numeric(6,2) check (hip_cm is null or (hip_cm > 0 and hip_cm <= 300)),
  chest_cm numeric(6,2) check (chest_cm is null or (chest_cm > 0 and chest_cm <= 300)),
  neck_cm numeric(6,2) check (neck_cm is null or (neck_cm > 0 and neck_cm <= 150)),
  arm_left_cm numeric(6,2) check (arm_left_cm is null or (arm_left_cm > 0 and arm_left_cm <= 150)),
  arm_right_cm numeric(6,2) check (arm_right_cm is null or (arm_right_cm > 0 and arm_right_cm <= 150)),
  thigh_left_cm numeric(6,2) check (thigh_left_cm is null or (thigh_left_cm > 0 and thigh_left_cm <= 200)),
  thigh_right_cm numeric(6,2) check (thigh_right_cm is null or (thigh_right_cm > 0 and thigh_right_cm <= 200)),
  calf_left_cm numeric(6,2) check (calf_left_cm is null or (calf_left_cm > 0 and calf_left_cm <= 120)),
  calf_right_cm numeric(6,2) check (calf_right_cm is null or (calf_right_cm > 0 and calf_right_cm <= 120)),
  measurement_protocol text,
  notes text,
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    waist_cm is not null or hip_cm is not null or chest_cm is not null or neck_cm is not null
    or arm_left_cm is not null or arm_right_cm is not null
    or thigh_left_cm is not null or thigh_right_cm is not null
    or calf_left_cm is not null or calf_right_cm is not null
  )
);
create index body_circumference_entries_user_measured_idx on public.body_circumference_entries (user_id, measured_at desc);

create table public.weekly_checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  week_start date not null,
  energy_score smallint check (energy_score between 1 and 5),
  sleep_quality_score smallint check (sleep_quality_score between 1 and 5),
  soreness_score smallint check (soreness_score between 1 and 5),
  stress_score smallint check (stress_score between 1 and 5),
  motivation_score smallint check (motivation_score between 1 and 5),
  nutrition_consistency_score smallint check (nutrition_consistency_score between 1 and 5),
  avg_sleep_hours numeric(4,2) check (avg_sleep_hours is null or (avg_sleep_hours >= 0 and avg_sleep_hours <= 24)),
  training_sessions_planned smallint check (training_sessions_planned is null or training_sessions_planned between 0 and 21),
  training_sessions_completed smallint check (training_sessions_completed is null or training_sessions_completed between 0 and 21),
  notes text,
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, week_start),
  check (
    training_sessions_planned is null
    or training_sessions_completed is null
    or training_sessions_completed <= training_sessions_planned
  )
);
create index weekly_checkins_user_week_idx on public.weekly_checkins (user_id, week_start desc);

create table public.progress_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  goal_type text not null
    check (goal_type in ('consistency','weight','waist','body_fat_estimate','muscle_mass_estimate','strength','mobility','endurance','custom')),
  title text not null,
  target_direction text
    check (target_direction is null or target_direction in ('increase','decrease','maintain','at_least','at_most','custom')),
  start_value numeric,
  target_value numeric,
  unit text,
  start_date date not null default current_date,
  target_date date,
  status text not null default 'active' check (status in ('active','achieved','paused','cancelled')),
  notes text,
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (target_date is null or target_date >= start_date)
);
create index progress_goals_user_status_idx on public.progress_goals (user_id, status, created_at desc);

create table public.progress_photo_sets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  captured_on date not null default current_date,
  label text,
  notes text,
  ai_analysis_allowed boolean not null default false,
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, user_id)
);
create index progress_photo_sets_user_date_idx on public.progress_photo_sets (user_id, captured_on desc);

create table public.progress_photos (
  id uuid primary key default gen_random_uuid(),
  photo_set_id uuid not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  angle text not null check (angle in ('front','side_left','side_right','back','custom')),
  object_path text not null unique,
  captured_at timestamptz not null default now(),
  width_px integer check (width_px is null or width_px > 0),
  height_px integer check (height_px is null or height_px > 0),
  notes text,
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz not null default now(),
  foreign key (photo_set_id, user_id) references public.progress_photo_sets(id, user_id) on delete cascade
);
create index progress_photos_user_captured_idx on public.progress_photos (user_id, captured_at desc);

create trigger progress_preferences_set_updated_at before update on public.progress_preferences
for each row execute function public.set_updated_at();
create trigger body_metric_entries_set_updated_at before update on public.body_metric_entries
for each row execute function public.set_updated_at();
create trigger body_circumference_entries_set_updated_at before update on public.body_circumference_entries
for each row execute function public.set_updated_at();
create trigger weekly_checkins_set_updated_at before update on public.weekly_checkins
for each row execute function public.set_updated_at();
create trigger progress_goals_set_updated_at before update on public.progress_goals
for each row execute function public.set_updated_at();
create trigger progress_photo_sets_set_updated_at before update on public.progress_photo_sets
for each row execute function public.set_updated_at();

alter table public.progress_preferences enable row level security;
alter table public.body_metric_entries enable row level security;
alter table public.body_circumference_entries enable row level security;
alter table public.weekly_checkins enable row level security;
alter table public.progress_goals enable row level security;
alter table public.progress_photo_sets enable row level security;
alter table public.progress_photos enable row level security;

grant select, insert, update, delete on public.progress_preferences to authenticated;
grant select, insert, update, delete on public.body_metric_entries to authenticated;
grant select, insert, update, delete on public.body_circumference_entries to authenticated;
grant select, insert, update, delete on public.weekly_checkins to authenticated;
grant select, insert, update, delete on public.progress_goals to authenticated;
grant select, insert, update, delete on public.progress_photo_sets to authenticated;
grant select, insert, update, delete on public.progress_photos to authenticated;

create policy progress_preferences_select_own on public.progress_preferences for select to authenticated
using ((select auth.uid()) is not null and user_id = (select auth.uid()));
create policy progress_preferences_insert_own on public.progress_preferences for insert to authenticated
with check ((select auth.uid()) is not null and user_id = (select auth.uid()));
create policy progress_preferences_update_own on public.progress_preferences for update to authenticated
using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy progress_preferences_delete_own on public.progress_preferences for delete to authenticated
using (user_id = (select auth.uid()));

create policy body_metric_entries_select_own on public.body_metric_entries for select to authenticated
using ((select auth.uid()) is not null and user_id = (select auth.uid()));
create policy body_metric_entries_insert_own on public.body_metric_entries for insert to authenticated
with check ((select auth.uid()) is not null and user_id = (select auth.uid()));
create policy body_metric_entries_update_own on public.body_metric_entries for update to authenticated
using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy body_metric_entries_delete_own on public.body_metric_entries for delete to authenticated
using (user_id = (select auth.uid()));

create policy body_circumference_entries_select_own on public.body_circumference_entries for select to authenticated
using ((select auth.uid()) is not null and user_id = (select auth.uid()));
create policy body_circumference_entries_insert_own on public.body_circumference_entries for insert to authenticated
with check ((select auth.uid()) is not null and user_id = (select auth.uid()));
create policy body_circumference_entries_update_own on public.body_circumference_entries for update to authenticated
using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy body_circumference_entries_delete_own on public.body_circumference_entries for delete to authenticated
using (user_id = (select auth.uid()));

create policy weekly_checkins_select_own on public.weekly_checkins for select to authenticated
using ((select auth.uid()) is not null and user_id = (select auth.uid()));
create policy weekly_checkins_insert_own on public.weekly_checkins for insert to authenticated
with check ((select auth.uid()) is not null and user_id = (select auth.uid()));
create policy weekly_checkins_update_own on public.weekly_checkins for update to authenticated
using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy weekly_checkins_delete_own on public.weekly_checkins for delete to authenticated
using (user_id = (select auth.uid()));

create policy progress_goals_select_own on public.progress_goals for select to authenticated
using ((select auth.uid()) is not null and user_id = (select auth.uid()));
create policy progress_goals_insert_own on public.progress_goals for insert to authenticated
with check ((select auth.uid()) is not null and user_id = (select auth.uid()));
create policy progress_goals_update_own on public.progress_goals for update to authenticated
using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy progress_goals_delete_own on public.progress_goals for delete to authenticated
using (user_id = (select auth.uid()));

create policy progress_photo_sets_select_own on public.progress_photo_sets for select to authenticated
using ((select auth.uid()) is not null and user_id = (select auth.uid()));
create policy progress_photo_sets_insert_own on public.progress_photo_sets for insert to authenticated
with check ((select auth.uid()) is not null and user_id = (select auth.uid()));
create policy progress_photo_sets_update_own on public.progress_photo_sets for update to authenticated
using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy progress_photo_sets_delete_own on public.progress_photo_sets for delete to authenticated
using (user_id = (select auth.uid()));

create policy progress_photos_select_own on public.progress_photos for select to authenticated
using ((select auth.uid()) is not null and user_id = (select auth.uid()));
create policy progress_photos_insert_own on public.progress_photos for insert to authenticated
with check ((select auth.uid()) is not null and user_id = (select auth.uid()));
create policy progress_photos_update_own on public.progress_photos for update to authenticated
using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy progress_photos_delete_own on public.progress_photos for delete to authenticated
using (user_id = (select auth.uid()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('progress-photos','progress-photos',false,8388608,array['image/jpeg','image/png','image/webp']::text[])
on conflict (id) do update
set public=false, file_size_limit=excluded.file_size_limit, allowed_mime_types=excluded.allowed_mime_types;

create policy progress_photos_storage_select_own on storage.objects for select to authenticated
using (bucket_id='progress-photos' and (storage.foldername(name))[1]=(select auth.uid()::text));
create policy progress_photos_storage_insert_own on storage.objects for insert to authenticated
with check (bucket_id='progress-photos' and (storage.foldername(name))[1]=(select auth.uid()::text));
create policy progress_photos_storage_update_own on storage.objects for update to authenticated
using (bucket_id='progress-photos' and (storage.foldername(name))[1]=(select auth.uid()::text))
with check (bucket_id='progress-photos' and (storage.foldername(name))[1]=(select auth.uid()::text));
create policy progress_photos_storage_delete_own on storage.objects for delete to authenticated
using (bucket_id='progress-photos' and (storage.foldername(name))[1]=(select auth.uid()::text));
