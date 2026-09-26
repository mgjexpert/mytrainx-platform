
-- MyTrainX Start V1.1 program foundation.
-- Program/workouts stay inactive until exercise + safety review gates are approved.

insert into public.programs(slug,name,description,active,metadata)
values(
  'mytrainx-start-4-weeks',
  'MyTrainX Start — 4 Weeks',
  'Programa introdutório de quatro semanas para construir consistência, confiança nos movimentos e hábito sustentável.',
  false,
  '{
    "version":"1.1",
    "source_path":"content/programs/MYTRAINX-START-V1.md",
    "sessions_planned":12,
    "difficulty":"beginner",
    "audience":"healthy adults beginning or returning to structured exercise",
    "review_gates":["exercise","safety","editorial"],
    "access_target":["registered","master"],
    "inactive_reason":"review_pending"
  }'::jsonb
)
on conflict(slug) do update set
  name=excluded.name,
  description=excluded.description,
  active=false,
  metadata=public.programs.metadata || excluded.metadata,
  updated_at=now();

with p as (
  select id from public.programs where slug='mytrainx-start-4-weeks'
),
templates as (
  select * from (values
    (1,'A',1,'Full body A','squat + horizontal push/pull + hip extension + core',
      '[
        {"exercise_slug":"agachamento-ao-banco","sets":2,"reps":"8-12"},
        {"exercise_slug":"flexao-inclinada","sets":2,"reps":"6-12"},
        {"exercise_slug":"remada-unilateral-com-halter","sets":2,"reps":"8-12/side"},
        {"exercise_slug":"ponte-de-gluteos","sets":2,"reps":"10-15"},
        {"exercise_slug":"dead-bug","sets":2,"reps":"6-10/side"}
      ]'::jsonb),
    (2,'B',3,'Full body B','lunge + hinge + vertical push + anti-rotation + calf',
      '[
        {"exercise_slug":"afundo-estatico","sets":2,"reps":"6-10/side"},
        {"exercise_slug":"levantamento-romeno-com-halteres","sets":2,"reps":"8-12"},
        {"exercise_slug":"desenvolvimento-com-halteres","sets":2,"reps":"8-12"},
        {"exercise_slug":"pallof-press","sets":2,"reps":"8-12/side","fallback_slug":"prancha-lateral"},
        {"exercise_slug":"elevacao-panturrilha-em-pe","sets":2,"reps":"12-20"}
      ]'::jsonb),
    (3,'C',5,'Full body C','squat + push + pull + carry + core',
      '[
        {"exercise_slug":"agachamento-livre","sets":2,"reps":"8-12","progression_slug":"goblet-squat"},
        {"exercise_slug":"flexao-inclinada","sets":2,"reps":"6-12","progression_slug":"flexao-de-bracos"},
        {"exercise_slug":"remada-invertida","sets":2,"reps":"8-12","fallback_slug":"remada-baixa-no-cabo"},
        {"exercise_slug":"caminhada-do-fazendeiro","sets":3,"reps":"20-40s","optional":true},
        {"exercise_slug":"prancha-frontal","sets":2,"reps":"20-40s"}
      ]'::jsonb)
  ) as t(ordinal,letter,weekday,title,focus,exercise_sequence)
),
weeks as (
  select generate_series(1,4) as week
),
rows as (
  select
    p.id as program_id,
    ((w.week-1)*3+t.ordinal) as number,
    'mytrainx-start-'||w.week||lower(t.letter) as slug,
    'START-'||w.week||t.letter as code,
    'Week '||w.week||' — '||t.title as title,
    t.focus,
    t.weekday,
    t.ordinal,
    t.exercise_sequence,
    case w.week
      when 1 then 'learn_patterns'
      when 2 then 'repeat_then_progress_one_variable'
      when 3 then 'selected_primary_movements_may_add_one_set'
      when 4 then 'consolidate_or_small_progression_or_reduce'
    end as progression_rule
  from p cross join templates t cross join weeks w
)
insert into public.workouts(
  program_id,number,slug,code,title,focus,provider,provider_asset_id,duration_seconds,active,metadata
)
select
  program_id,number,slug,code,title,focus,
  'mytrainx_program',
  slug,
  2400,
  false,
  jsonb_build_object(
    'week',((number-1)/3)+1,
    'session_letter',right(code,1),
    'exercise_sequence',exercise_sequence,
    'progression_rule',progression_rule,
    'default_rir','2-4',
    'minimum_version','squat + push + pull, 1-2 sets each',
    'review_gates',jsonb_build_array('exercise','safety')
  )
from rows
on conflict(slug) do update set
  title=excluded.title,
  focus=excluded.focus,
  provider=excluded.provider,
  provider_asset_id=excluded.provider_asset_id,
  duration_seconds=excluded.duration_seconds,
  active=false,
  metadata=excluded.metadata,
  updated_at=now();

with p as (
  select id from public.programs where slug='mytrainx-start-4-weeks'
),
w as (
  select id,program_id,
         (metadata->>'week')::int as week,
         case metadata->>'session_letter' when 'A' then 1 when 'B' then 3 else 5 end as weekday,
         number
  from public.workouts
  where program_id=(select id from p)
)
insert into public.program_days(program_id,week,weekday,workout_id,order_index)
select program_id,week,weekday,id,number
from w
on conflict(program_id,week,weekday,order_index) do update set workout_id=excluded.workout_id;

insert into public.content_items(
  slug,title,subtitle,content_type,language,summary,tags,topics,access_policy,
  ai_index_policy,status,version,reading_time_minutes,downloadable,featured,metadata
)
values(
  'mytrainx-start-4-weeks',
  'MyTrainX Start — 4 Weeks',
  'Aprenda o sistema antes de tentar complicá-lo',
  'program_material','pt-BR',
  'Programa introdutório com 12 sessões, progressão conservadora e revisão semanal com contexto de recuperação.',
  array['iniciante','programa','forca','consistencia'],
  array['programs','training','habits'],
  'registered','metadata_only','needs_ingestion',1,20,false,true,
  '{
    "rights_basis":"owned",
    "source_path":"content/programs/MYTRAINX-START-V1.md",
    "program_slug":"mytrainx-start-4-weeks",
    "review_gates":["exercise","safety","editorial"],
    "knowledge_layer":"KB-PUBLISHABLE",
    "retrieval_blocked_until_review":true
  }'::jsonb
)
on conflict(slug) do update set
  title=excluded.title,subtitle=excluded.subtitle,summary=excluded.summary,tags=excluded.tags,
  topics=excluded.topics,access_policy=excluded.access_policy,ai_index_policy=excluded.ai_index_policy,
  status=excluded.status,version=excluded.version,metadata=public.content_items.metadata || excluded.metadata,
  updated_at=now();

insert into public.content_rights(
 content_id,rights_basis,copyright_holder,commercial_use_allowed,derivatives_allowed,
 redistribution_allowed,attribution_required,ai_retrieval_allowed,ai_derivative_generation_allowed,
 verification_status,verified_at,verified_by,notes,metadata
)
select id,'owned','MyTrainX',true,true,true,false,true,true,'verified',now(),'MyTrainX content governance',
 'Original MyTrainX program framework. Publication remains gated by exercise/safety review.',
 '{"brandable":true,"program_slug":"mytrainx-start-4-weeks"}'::jsonb
from public.content_items where slug='mytrainx-start-4-weeks'
on conflict(content_id) do update set
 rights_basis=excluded.rights_basis,copyright_holder=excluded.copyright_holder,
 commercial_use_allowed=excluded.commercial_use_allowed,derivatives_allowed=excluded.derivatives_allowed,
 redistribution_allowed=excluded.redistribution_allowed,attribution_required=excluded.attribution_required,
 ai_retrieval_allowed=excluded.ai_retrieval_allowed,ai_derivative_generation_allowed=excluded.ai_derivative_generation_allowed,
 verification_status=excluded.verification_status,verified_at=excluded.verified_at,verified_by=excluded.verified_by,
 notes=excluded.notes,metadata=excluded.metadata,updated_at=now();

insert into public.content_sources(
 content_id,provider,external_id,source_path,original_title,transcript_status,extraction_status,metadata
)
select id,'github','mytrainx-data:content/programs/MYTRAINX-START-V1.md',
 'content/programs/MYTRAINX-START-V1.md','MyTrainX Start — 4 Weeks','none','ready',
 '{"repository":"mgjexpert/mytrainx-data","branch":"feat/library-registry-v1","authorship":"MyTrainX Editorial 2026"}'::jsonb
from public.content_items where slug='mytrainx-start-4-weeks'
on conflict(provider,external_id) do update set
 content_id=excluded.content_id,source_path=excluded.source_path,original_title=excluded.original_title,
 extraction_status=excluded.extraction_status,metadata=excluded.metadata,updated_at=now();

insert into public.content_reviews(content_id,review_type,status,review_version,notes,evidence_urls,metadata)
select ci.id,'exercise','pending',1,
 'Review exercise selection, progression ranges, equipment substitutions and general healthy-adult scope before activation.',
 array['https://acsm.org/education-resources/pronouncements-scientific-communications/position-stands/']::text[],
 '{"gate":"exercise","program_slug":"mytrainx-start-4-weeks"}'::jsonb
from public.content_items ci
where ci.slug='mytrainx-start-4-weeks'
and not exists(
 select 1 from public.content_reviews cr
 where cr.content_id=ci.id and cr.review_type='exercise' and cr.review_version=1
);

insert into public.content_reviews(content_id,review_type,status,review_version,notes,evidence_urls,metadata)
select ci.id,'safety','pending',1,
 'Validate safety language, stop/escalation rules and non-clinical scope before program activation.',
 array[]::text[],
 '{"gate":"safety","program_slug":"mytrainx-start-4-weeks"}'::jsonb
from public.content_items ci
where ci.slug='mytrainx-start-4-weeks'
and not exists(
 select 1 from public.content_reviews cr
 where cr.content_id=ci.id and cr.review_type='safety' and cr.review_version=1
);
