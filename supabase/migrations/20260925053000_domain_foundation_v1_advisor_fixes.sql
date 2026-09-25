-- MyTrainX Domain Foundation V1 advisor fixes

create index entitlements_product_id_idx on public.entitlements(product_id);
create index events_product_id_idx on public.events(product_id);
create index orders_product_id_idx on public.orders(product_id);
create index program_days_workout_id_idx on public.program_days(workout_id);
create index program_enrollments_entitlement_id_idx on public.program_enrollments(entitlement_id);
create index program_enrollments_program_id_idx on public.program_enrollments(program_id);
create index programs_product_id_idx on public.programs(product_id);
create index subscriptions_product_id_idx on public.subscriptions(product_id);

drop policy if exists "orders_select_own" on public.orders;
create policy "orders_select_own" on public.orders
for select to authenticated
using (
  user_id = (select auth.uid())
  or lower(user_email) = lower(coalesce(((select auth.jwt()) ->> 'email'), ''))
);

drop policy if exists "entitlements_select_own" on public.entitlements;
create policy "entitlements_select_own" on public.entitlements
for select to authenticated
using (
  user_id = (select auth.uid())
  or lower(user_email) = lower(coalesce(((select auth.jwt()) ->> 'email'), ''))
);

drop policy if exists "subscriptions_select_own" on public.subscriptions;
create policy "subscriptions_select_own" on public.subscriptions
for select to authenticated
using (
  user_id = (select auth.uid())
  or lower(user_email) = lower(coalesce(((select auth.jwt()) ->> 'email'), ''))
);

drop policy if exists "content_items_select_authorized" on public.content_items;
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
            or lower(e.user_email) = lower(coalesce(((select auth.jwt()) ->> 'email'), ''))
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
            or lower(s.user_email) = lower(coalesce(((select auth.jwt()) ->> 'email'), ''))
          )
      )
    )
  )
);

drop policy if exists "events_select_authorized" on public.events;
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
            or lower(s.user_email) = lower(coalesce(((select auth.jwt()) ->> 'email'), ''))
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
            or lower(e.user_email) = lower(coalesce(((select auth.jwt()) ->> 'email'), ''))
          )
      )
    )
  )
);

-- Explicitly document that source URLs/transcripts are server-only.
create policy "content_sources_deny_client"
on public.content_sources
for all
to anon, authenticated
using (false)
with check (false);
