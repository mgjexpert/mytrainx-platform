
insert into public.knowledge_documents(
 content_id,source_id,version,status,extraction_method,source_checksum,language,
 char_count,token_estimate,metadata
)
select ci.id,cs.id,1,'ready','github_markdown_section_v1','b8c8656903ad5db6271167c64141dda7d2f4a576','pt-BR',
 7782,1946,
 '{"source_path":"content/programs/MYTRAINX-START-V1.md","review_gate":"exercise+safety","chunks_ready":true,"retrieval_blocked_until_review":true}'::jsonb
from public.content_items ci
join public.content_sources cs on cs.content_id=ci.id
where ci.slug='mytrainx-start-4-weeks' and cs.external_id='mytrainx-data:content/programs/MYTRAINX-START-V1.md'
on conflict(content_id,source_id,version) do update set
 status=excluded.status,extraction_method=excluded.extraction_method,source_checksum=excluded.source_checksum,
 char_count=excluded.char_count,token_estimate=excluded.token_estimate,metadata=excluded.metadata,updated_at=now();

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,0,'MyTrainX Start — 4 Weeks','**Status:** DRAFT / ORIGINAL PRODUCTION  
**Audience:** healthy adults beginning or returning to structured exercise  
**Access target:** registered preview + Master/full product  
**Primary goal:** build consistency, movement confidence and a sustainable training habit  
**Version:** 1.1 — 2026-09-26',76,
 jsonb_build_object('source_path','content/programs/MYTRAINX-START-V1.md','section','MyTrainX Start — 4 Weeks'),
 '{"rights_basis":"owned","review_gate":"exercise+safety","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='mytrainx-start-4-weeks' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,1,'Product promise','A four-week guided introduction to MyTrainX that teaches the user how to train, not merely how to copy workouts.

The program is deliberately simple:
- three full-body sessions per week;
- five primary movements per session;
- optional low-intensity activity between sessions;
- one small progression at a time;
- Coach X uses adherence + check-in context before changing the plan.

This is a general product template, not medical prescription.',111,
 jsonb_build_object('source_path','content/programs/MYTRAINX-START-V1.md','section','Product promise'),
 '{"rights_basis":"owned","review_gate":"exercise+safety","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='mytrainx-start-4-weeks' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,2,'Week 0 — onboarding and readiness','Before session 1:

1. choose the preferred tracking dimensions in MyTrainX Progress;
2. optionally record baseline weight/waist/photos;
3. complete first weekly check-in;
4. identify available equipment;
5. choose the exercise track that fits the environment;
6. learn RIR/RPE basics;
7. read **Treino de Força sem Complicação**;
8. read **Recovery sem Ruído**.',91,
 jsonb_build_object('source_path','content/programs/MYTRAINX-START-V1.md','section','Week 0 — onboarding and readiness'),
 '{"rights_basis":"owned","review_gate":"exercise+safety","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='mytrainx-start-4-weeks' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,3,'Equipment tracks','### Track A — minimal
- stable chair/bench;
- bodyweight;
- one or two dumbbells when available.

### Track B — home basic
- dumbbells;
- resistance band;
- stable bench/support.

### Track C — gym
- dumbbells;
- cable station;
- rack/machines as appropriate.

Coach X chooses variations from the same movement family rather than changing the whole session architecture.',93,
 jsonb_build_object('source_path','content/programs/MYTRAINX-START-V1.md','section','Equipment tracks'),
 '{"rights_basis":"owned","review_gate":"exercise+safety","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='mytrainx-start-4-weeks' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,4,'Session architecture','Every session follows:

1. **Readiness check — 30 seconds**
   - energy;
   - unusual pain/symptoms;
   - previous-session recovery.

2. **Warm-up — 5–8 min**
   - easy locomotion;
   - 1–2 preparation sets for first movements.

3. **Five primary exercises**

4. **Optional finisher — 3–8 min**
   - only when useful and tolerated.

5. **Quick reflection**
   - session completed?
   - effort appropriate?
   - any exercise to modify next time?',111,
 jsonb_build_object('source_path','content/programs/MYTRAINX-START-V1.md','section','Session architecture'),
 '{"rights_basis":"owned","review_gate":"exercise+safety","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='mytrainx-start-4-weeks' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,5,'Default effort','Most working sets should finish with roughly **2–4 repetitions in reserve** during the first weeks.

The goal is not to test maximum capacity.',36,
 jsonb_build_object('source_path','content/programs/MYTRAINX-START-V1.md','section','Default effort'),
 '{"rights_basis":"owned","review_gate":"exercise+safety","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='mytrainx-start-4-weeks' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,6,'Squat','Primary options:
- `agachamento-ao-banco`
- `agachamento-livre`
- `goblet-squat`

Later:
- `agachamento-com-barra`
- `front-squat`',33,
 jsonb_build_object('source_path','content/programs/MYTRAINX-START-V1.md','section','Squat'),
 '{"rights_basis":"owned","review_gate":"exercise+safety","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='mytrainx-start-4-weeks' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,7,'Hinge / hip extension','Primary options:
- `ponte-de-gluteos`
- `levantamento-romeno-com-halteres`

Later:
- `hip-thrust-com-barra`
- `trap-bar-deadlift`',33,
 jsonb_build_object('source_path','content/programs/MYTRAINX-START-V1.md','section','Hinge / hip extension'),
 '{"rights_basis":"owned","review_gate":"exercise+safety","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='mytrainx-start-4-weeks' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,8,'Horizontal / vertical pull','Primary options:
- `remada-unilateral-com-halter`
- `remada-invertida`
- `remada-baixa-no-cabo`
- `puxada-frente-pegada-neutra`

Later:
- `barra-fixa-pronada`',40,
 jsonb_build_object('source_path','content/programs/MYTRAINX-START-V1.md','section','Horizontal / vertical pull'),
 '{"rights_basis":"owned","review_gate":"exercise+safety","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='mytrainx-start-4-weeks' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,9,'Session 1A','1. Squat — 2 × 8–12  
   Default: `agachamento-ao-banco`

2. Horizontal push — 2 × 6–12  
   Default: `flexao-inclinada`

3. Horizontal pull — 2 × 8–12 / side  
   Default: `remada-unilateral-com-halter`

4. Hip extension — 2 × 10–15  
   Default: `ponte-de-gluteos`

5. Core — 2 × 6–10 / side  
   Default: `dead-bug`',80,
 jsonb_build_object('source_path','content/programs/MYTRAINX-START-V1.md','section','Session 1A'),
 '{"rights_basis":"owned","review_gate":"exercise+safety","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='mytrainx-start-4-weeks' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,10,'Session 1B','1. Lunge — 2 × 6–10 / side  
   Default: `afundo-estatico`

2. Hinge — 2 × 8–12  
   Default: `levantamento-romeno-com-halteres`

3. Vertical push — 2 × 8–12  
   Default: `desenvolvimento-com-halteres`

4. Anti-rotation — 2 × 8–12 / side  
   Default: `pallof-press`  
   Minimal alternative: `prancha-lateral`

5. Calf — 2 × 12–20  
   Default: `elevacao-panturrilha-em-pe`',94,
 jsonb_build_object('source_path','content/programs/MYTRAINX-START-V1.md','section','Session 1B'),
 '{"rights_basis":"owned","review_gate":"exercise+safety","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='mytrainx-start-4-weeks' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,11,'Session 1C','1. Squat — 2 × 8–12  
   Default: `agachamento-livre`

2. Push — 2 × 6–12  
   Default: `flexao-inclinada` or `flexao-de-bracos`

3. Pull — 2 × 8–12  
   Default: `remada-invertida` or `remada-baixa-no-cabo`

4. Carry — 3 × 20–40 s  
   Default: `caminhada-do-fazendeiro`  
   No-weight alternative: controlled walking + posture drill.

5. Core — 2 × 20–40 s  
   Default: `prancha-frontal`',98,
 jsonb_build_object('source_path','content/programs/MYTRAINX-START-V1.md','section','Session 1C'),
 '{"rights_basis":"owned","review_gate":"exercise+safety","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='mytrainx-start-4-weeks' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,12,'Week 2 — Repeat before adding','Repeat A / B / C.

Primary objective:
- same technique;
- same exercise family;
- more confidence.

Choose **one** progression where appropriate:
- +1–2 repetitions per set;
- slightly lower support on incline push-up;
- slightly heavier dumbbell;
- longer controlled carry;
- small increase in plank duration.

Do not progress every exercise simultaneously.',90,
 jsonb_build_object('source_path','content/programs/MYTRAINX-START-V1.md','section','Week 2 — Repeat before adding'),
 '{"rights_basis":"owned","review_gate":"exercise+safety","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='mytrainx-start-4-weeks' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,13,'Week 3 — Build a little more work','If Week 2 was completed with adequate recovery:

- selected first/second movements may move from 2 to **3 sets**;
- other movements remain at 2 sets;
- maintain 1–3 repetitions in reserve on most sets.',51,
 jsonb_build_object('source_path','content/programs/MYTRAINX-START-V1.md','section','Week 3 — Build a little more work'),
 '{"rights_basis":"owned","review_gate":"exercise+safety","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='mytrainx-start-4-weeks' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,14,'Session 3C','- squat: 2–3 sets;
- push: 2–3 sets;
- pull: 2–3 sets;
- carry: 3 rounds;
- core: 2 sets.

If weekly check-in shows clear deterioration in sleep/energy/adherence, Coach X can keep Week 2 volume instead of forcing progression.',57,
 jsonb_build_object('source_path','content/programs/MYTRAINX-START-V1.md','section','Session 3C'),
 '{"rights_basis":"owned","review_gate":"exercise+safety","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='mytrainx-start-4-weeks' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,15,'Week 4 — Consolidate','Week 4 is not a test week.

The goal is to prove the routine is repeatable.

Choose one of three options:

### Option 1 — consolidate
Repeat Week 3.

### Option 2 — slightly progress
Increase load or reps in 1–3 movements only.

### Option 3 — reduce
Return selected exercises to two sets if fatigue/context warrants.',80,
 jsonb_build_object('source_path','content/programs/MYTRAINX-START-V1.md','section','Week 4 — Consolidate'),
 '{"rights_basis":"owned","review_gate":"exercise+safety","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='mytrainx-start-4-weeks' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,16,'End-of-week review','Coach X reviews:
- 12 planned sessions;
- sessions completed;
- movement confidence;
- exercise substitutions;
- latest weekly check-ins;
- optional body trends;
- subjective enjoyment;
- equipment preferences.

Then route the member toward:
- Strength Foundations;
- Home 30;
- HIIT Pathway;
- WKT;
- Calisthenics Foundations;
- general Master programming.',90,
 jsonb_build_object('source_path','content/programs/MYTRAINX-START-V1.md','section','End-of-week review'),
 '{"rights_basis":"owned","review_gate":"exercise+safety","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='mytrainx-start-4-weeks' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,17,'Version-minimum rule','Every session must have a smaller version.

Example:

Full:
- 5 exercises × 2–3 sets.

Minimum:
- squat;
- push;
- pull;
- 1–2 sets each.

A difficult week should not automatically convert into zero weeks.

This rule applies only when the user is otherwise well enough to train and has no warning symptoms requiring another course of action.',86,
 jsonb_build_object('source_path','content/programs/MYTRAINX-START-V1.md','section','Version-minimum rule'),
 '{"rights_basis":"owned","review_gate":"exercise+safety","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='mytrainx-start-4-weeks' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,18,'Coach X decision hierarchy','Before changing the program:

1. Did the user complete the planned sessions?
2. Was technique acceptable?
3. Was effort within target?
4. Did recovery remain reasonably stable?
5. Does the user want progression?
6. What is the smallest useful change?

Prefer:
- one more rep;
- a small load increase;
- one extra set;
- a slightly harder variation.

Avoid changing five variables simultaneously.',99,
 jsonb_build_object('source_path','content/programs/MYTRAINX-START-V1.md','section','Coach X decision hierarchy'),
 '{"rights_basis":"owned","review_gate":"exercise+safety","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='mytrainx-start-4-weeks' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,19,'Required supporting content','Now available / in production:
- onboarding and Progress system;
- `Treino de Força sem Complicação`;
- `Recovery sem Ruído`;
- exercise encyclopedia;
- weekly check-in;
- goals;
- private progress photos.

Still required:
- session warm-up cards;
- RPE/RIR micro lesson;
- equipment substitution matrix;
- completion badge;
- Coach X program-review prompt;
- program completion assessment.',98,
 jsonb_build_object('source_path','content/programs/MYTRAINX-START-V1.md','section','Required supporting content'),
 '{"rights_basis":"owned","review_gate":"exercise+safety","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='mytrainx-start-4-weeks' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,20,'Safety','Stop and seek appropriate professional assessment for concerning pain, acute injury symptoms or medical warning signs.

Exercise substitutions should solve capability/equipment problems without pretending to diagnose the reason for a limitation.

The program is designed for general healthy-adult fitness use and must not be presented as treatment for disease or injury.',93,
 jsonb_build_object('source_path','content/programs/MYTRAINX-START-V1.md','section','Safety'),
 '{"rights_basis":"owned","review_gate":"exercise+safety","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='mytrainx-start-4-weeks' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
