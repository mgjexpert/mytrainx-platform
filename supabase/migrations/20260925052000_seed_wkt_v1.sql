-- Seed current validated WKT catalogue

insert into public.products (slug, name, product_type, price_cents, currency, active, metadata)
values ('wkt-militar', 'WKT Militar', 'program', 6700, 'BRL', true, '{"current_offer":"access_21"}'::jsonb)
on conflict (slug) do update
set name = excluded.name,
    product_type = excluded.product_type,
    price_cents = excluded.price_cents,
    currency = excluded.currency,
    active = excluded.active,
    metadata = excluded.metadata,
    updated_at = now();

insert into public.programs (slug, name, description, product_id, active, metadata)
select
  'wkt-militar',
  'WKT Militar',
  'Programa follow-along com 21 treinos guiados.',
  p.id,
  true,
  '{"catalog_version":"wkt-21-v1","schedule_status":"not_yet_persisted"}'::jsonb
from public.products p
where p.slug = 'wkt-militar'
on conflict (slug) do update
set name = excluded.name,
    description = excluded.description,
    product_id = excluded.product_id,
    active = excluded.active,
    metadata = excluded.metadata,
    updated_at = now();

with program as (
  select id from public.programs where slug = 'wkt-militar'
),
seed(number, slug, code, focus, provider_asset_id) as (
  values
  (1,'01-alpha-peito-triceps-perna','Alpha','Peito, tríceps e perna','1th_JxC2ZulUa46TMvCEpWSP3qfygby0z'),
  (2,'02-alpha-costas-biceps','Alpha','Costas e bíceps','1OrNO5JsxTqVSv3qMDOZgEbxeMGuh_jfz'),
  (3,'03-bravo-ombro-perna','Bravo','Ombro e perna','16uFbORuhT_QxRJQjat9Uc_iqMnTFm9zW'),
  (4,'04-charlie-costas-pernas-biceps','Charlie','Costas, pernas e bíceps','120WOwe27yHHbnBFL3d1lLTCVEfcqLhOR'),
  (5,'05-charlie-abdomen','Charlie','Abdômen','1FBVE9i6HfwYtWtJNpii2WLBSfdlcMBpo'),
  (6,'06-delta-peito-biceps','Delta','Peito e bíceps','1ySmXWmtHmg8027mWjjgWORfk4y_Zl3jV'),
  (7,'07-alpha-costas-triceps-pernas','Alpha','Costas, tríceps e pernas','1WP7SMKr5bj1eEhw9RAhs1MlrTIlHNJOR'),
  (8,'08-echo-ombros-panturrilhas','Echo','Ombros e panturrilhas','1wphP404GWYMUxiVm9BCQw_GBsTSnLJoO'),
  (9,'09-echo-biceps-triceps','Echo','Bíceps e tríceps','1oPIeBOAiimFV-KP0uZ8Zwu10gwfwf1IM'),
  (10,'10-bravo-pernas-abdomen','Bravo','Pernas e abdômen','1MUjXbY4zGoC7bekyidNPhvJ_jyr_plRX'),
  (11,'11-delta-costas','Delta','Costas','1NSGXImpU4e2JEdD65dEoZFUSH-nwraTU'),
  (12,'12-echo-ombros-peitos','Echo','Ombros e peito','1DSKa1kWb0WUucRzitezLvb_fbhpgq382'),
  (13,'13-alpha-pernas-abdomen','Alpha','Pernas e abdômen','1xCQRd9JFMaPTD7ChhPZD8wHteeV-Bw-Z'),
  (14,'14-charlie-costas','Charlie','Costas','13aO6IiP4bS5DE-EqFI92M2890YHCc-4h'),
  (15,'15-echo-pernas','Echo','Pernas','1A5pFxUdG8DktnYNmSocpVGvrW9pnfbYv'),
  (16,'16-charlie-peitos-pernas','Charlie','Peito e pernas','1WGJnuOSZvrywmSJivSuc4c9LufvtZtCQ'),
  (17,'17-delta-ombros-costas','Delta','Ombros e costas','1JZOgEpp0LXpOSlW4vxpc243wq3EPCPOF'),
  (18,'18-bravo-costas-biceps-abdomen','Bravo','Costas, bíceps e abdômen','1PpuKZzciJuMZ0y6jsAX3pD5QfTtn14Sc'),
  (19,'19-charlie-pernas-abdomen','Charlie','Pernas e abdômen','12AaeOa2o0xN7VvlSvXRTWtbd6ACchm3r'),
  (20,'20-bravo-biceps-triceps-panturrilha','Bravo','Bíceps, tríceps e panturrilha','1um0YLGPJznqd4o8ae9dOXZagSeVYQ8Bk'),
  (21,'21-bravo-peitos-costas-abdomen','Bravo','Peito, costas e abdômen','1nTm2jQQG4psz-m7wo44FU-KuwnvnllMX')
)
insert into public.workouts (
  program_id, number, slug, code, title, focus, provider, provider_asset_id, active, metadata
)
select
  program.id,
  seed.number,
  seed.slug,
  seed.code,
  'Missão ' || lpad(seed.number::text, 2, '0'),
  seed.focus,
  'google_drive',
  seed.provider_asset_id,
  true,
  jsonb_build_object('catalog_source','validated_legacy_wkt')
from seed cross join program
on conflict (slug) do update
set program_id = excluded.program_id,
    number = excluded.number,
    code = excluded.code,
    title = excluded.title,
    focus = excluded.focus,
    provider = excluded.provider,
    provider_asset_id = excluded.provider_asset_id,
    active = excluded.active,
    metadata = excluded.metadata,
    updated_at = now();
