
-- MyTrainX canonical launch seed: exercises + recipes.
-- Additive and idempotent. Exercise publication remains gated by exercise review.

insert into public.exercises (
  slug, name, canonical_name, locale, aliases, exercise_type, difficulty,
  equipment, primary_muscles, secondary_muscles, movement_patterns, body_regions,
  instructions, coaching_cues, common_mistakes, safety_notes, status, review_status, metadata
)
values
(
  'agachamento-livre','Agachamento livre','Bodyweight Squat','pt-BR',
  array['agachamento','bodyweight squat'],'strength','beginner',
  array['bodyweight'],array['quadriceps','glutes'],array['adductors','calves','core'],
  array['squat'],array['lower_body','core'],
  '["Adote uma base estável e confortável.","Flexione joelhos e quadris ao mesmo tempo, mantendo os pés apoiados.","Desça até uma amplitude que consiga controlar.","Empurre o chão e retorne à posição inicial com controle."]'::jsonb,
  '["Pés firmes no chão.","Joelhos acompanham a direção dos pés.","Controle a descida e suba com intenção."]'::jsonb,
  '["Perder o apoio dos pés.","Acelerar a descida sem controle.","Forçar amplitude dolorosa."]'::jsonb,
  '["Use uma amplitude tolerável e controlada.","Dor aguda ou crescente não é um objetivo do exercício."]'::jsonb,
  'review','pending',
  '{"rights_basis":"owned_editorial","seed_basis":["mytrainx_editorial","wrkout_exercises_unlicense"],"launch_batch":"exercise_core_v1"}'::jsonb
),
(
  'goblet-squat','Goblet squat','Goblet Squat','pt-BR',
  array['agachamento goblet','agachamento com halter'],'strength','beginner',
  array['dumbbell','kettlebell'],array['quadriceps','glutes'],array['adductors','core','upper_back'],
  array['squat'],array['lower_body','core'],
  '["Segure a carga próxima ao peito e organize uma base estável.","Desça flexionando joelhos e quadris.","Mantenha a carga perto do corpo e os pés apoiados.","Empurre o chão para retornar ao topo."]'::jsonb,
  '["Carga perto do corpo.","Pés inteiros no chão.","Controle primeiro, carga depois."]'::jsonb,
  '["Afastar a carga do corpo.","Escolher carga que degrada a técnica.","Perder estabilidade dos pés."]'::jsonb,
  '["Use uma carga que consiga posicionar e retirar com segurança."]'::jsonb,
  'review','pending',
  '{"rights_basis":"owned_editorial","seed_basis":["mytrainx_editorial","wrkout_exercises_unlicense"],"launch_batch":"exercise_core_v1"}'::jsonb
),
(
  'levantamento-romeno-com-halteres','Levantamento romeno com halteres','Dumbbell Romanian Deadlift','pt-BR',
  array['RDL com halteres','levantamento terra romeno com halteres'],'strength','intermediate',
  array['dumbbell'],array['hamstrings','glutes'],array['erector_spinae','adductors','forearms'],
  array['hinge'],array['lower_body','posterior_chain'],
  '["Fique em pé com os halteres próximos às coxas e joelhos levemente flexionados.","Leve o quadril para trás enquanto os halteres descem próximos às pernas.","Pare antes de perder o controle do tronco ou da pelve.","Estenda o quadril para voltar à posição inicial."]'::jsonb,
  '["Quadril para trás.","Halteres perto das pernas.","Mantenha tensão nos posteriores sem buscar o chão a qualquer custo."]'::jsonb,
  '["Transformar o movimento em agachamento.","Arredondar o tronco para ganhar amplitude.","Afastar os halteres do corpo."]'::jsonb,
  '["A amplitude deve ser definida pela capacidade de manter controle.","Reduza carga e amplitude se a técnica se deteriorar."]'::jsonb,
  'review','pending',
  '{"rights_basis":"owned_editorial","seed_basis":["mytrainx_editorial","wrkout_exercises_unlicense"],"launch_batch":"exercise_core_v1"}'::jsonb
),
(
  'ponte-de-gluteos','Ponte de glúteos','Glute Bridge','pt-BR',
  array['glute bridge','ponte de quadril'],'strength','beginner',
  array['bodyweight'],array['glutes'],array['hamstrings','core'],
  array['hip_extension'],array['lower_body','core'],
  '["Deite-se de costas com joelhos flexionados e pés apoiados.","Pressione os pés no chão e eleve o quadril.","Pare numa posição confortável sem hiperestender a lombar.","Desça com controle."]'::jsonb,
  '["Costelas organizadas.","Suba pelo quadril.","Controle a descida."]'::jsonb,
  '["Arquear excessivamente a lombar.","Empurrar apenas pelas pontas dos pés.","Perder controle na descida."]'::jsonb,
  '["Se usar carga externa, estabilize-a e escolha uma posição segura."]'::jsonb,
  'review','pending',
  '{"rights_basis":"owned_editorial","seed_basis":["mytrainx_editorial","wrkout_exercises_unlicense"],"launch_batch":"exercise_core_v1"}'::jsonb
),
(
  'flexao-inclinada','Flexão inclinada','Incline Push-Up','pt-BR',
  array['incline push-up','flexão elevada'],'strength','beginner',
  array['bodyweight','stable_support'],array['chest','triceps'],array['anterior_deltoid','core'],
  array['horizontal_push'],array['upper_body','core'],
  '["Coloque as mãos num apoio firme e estável.","Afaste os pés até formar uma posição corporal controlável.","Leve o peito em direção ao apoio com controle.","Empurre o apoio e retorne à posição inicial."]'::jsonb,
  '["Corpo como uma unidade.","Mãos firmes.","Ajuste a altura do apoio para regular a dificuldade."]'::jsonb,
  '["Deixar o quadril cair.","Usar apoio instável.","Forçar amplitude desconfortável."]'::jsonb,
  '["O apoio deve suportar o peso sem deslizar ou tombar."]'::jsonb,
  'review','pending',
  '{"rights_basis":"owned_editorial","seed_basis":["mytrainx_editorial","wrkout_exercises_unlicense"],"launch_batch":"exercise_core_v1"}'::jsonb
),
(
  'flexao-de-bracos','Flexão de braços','Push-Up','pt-BR',
  array['push-up','flexão'],'strength','intermediate',
  array['bodyweight'],array['chest','triceps'],array['anterior_deltoid','core'],
  array['horizontal_push'],array['upper_body','core'],
  '["Posicione as mãos numa largura confortável e organize tronco e pernas.","Desça o corpo como uma unidade até uma amplitude controlada.","Empurre o chão para retornar à posição inicial."]'::jsonb,
  '["Empurre o chão.","Mantenha o tronco firme.","Controle a descida."]'::jsonb,
  '["Perder a posição do quadril.","Cair rapidamente na descida.","Insistir numa amplitude dolorosa."]'::jsonb,
  '["Use flexão inclinada se a versão no chão não permitir controle confortável."]'::jsonb,
  'review','pending',
  '{"rights_basis":"owned_editorial","seed_basis":["mytrainx_editorial","wrkout_exercises_unlicense"],"launch_batch":"exercise_core_v1"}'::jsonb
),
(
  'remada-unilateral-com-halter','Remada unilateral com halter','One-Arm Dumbbell Row','pt-BR',
  array['one arm dumbbell row','remada serrote'],'strength','beginner',
  array['dumbbell','bench_optional'],array['latissimus_dorsi','mid_back'],array['biceps','rear_deltoid','forearms'],
  array['horizontal_pull'],array['upper_body','back'],
  '["Organize uma base estável e use apoio se necessário.","Puxe o halter em direção ao tronco.","Evite girar o corpo para criar impulso.","Retorne com controle até o braço estender confortavelmente."]'::jsonb,
  '["Cotovelo viaja para trás.","Tronco estável.","Controle a volta."]'::jsonb,
  '["Rodar excessivamente o tronco.","Encolher o ombro.","Usar impulso para terminar a repetição."]'::jsonb,
  '["Prepare uma base estável antes de levantar a carga."]'::jsonb,
  'review','pending',
  '{"rights_basis":"owned_editorial","seed_basis":["mytrainx_editorial","wrkout_exercises_unlicense"],"launch_batch":"exercise_core_v1"}'::jsonb
),
(
  'afundo-estatico','Afundo estático','Split Squat','pt-BR',
  array['split squat','afundo parado'],'strength','beginner',
  array['bodyweight'],array['quadriceps','glutes'],array['adductors','calves','core'],
  array['lunge'],array['lower_body'],
  '["Posicione um pé à frente e outro atrás numa base estável.","Desça verticalmente dentro da amplitude confortável.","Mantenha o pé da frente apoiado.","Empurre o chão para retornar."]'::jsonb,
  '["Base estável.","Desça para baixo, não apenas para frente.","Controle os dois lados."]'::jsonb,
  '["Base estreita demais.","Perder equilíbrio por excesso de amplitude.","Acelerar a descida."]'::jsonb,
  '["Use um apoio externo se o equilíbrio limitar a execução antes da força das pernas."]'::jsonb,
  'review','pending',
  '{"rights_basis":"owned_editorial","seed_basis":["mytrainx_editorial","wrkout_exercises_unlicense"],"launch_batch":"exercise_core_v1"}'::jsonb
),
(
  'dead-bug','Dead bug','Dead Bug','pt-BR',
  array['deadbug'],'strength','beginner',
  array['bodyweight'],array['core'],array['hip_flexors','shoulder_stabilizers'],
  array['anti_extension'],array['core'],
  '["Deite-se de costas e organize braços e pernas numa posição confortável.","Estenda lentamente um braço e a perna oposta.","Pare antes de perder o controle do tronco.","Retorne e alterne os lados."]'::jsonb,
  '["Movimento lento.","Expire durante a extensão.","Menos amplitude pode ser melhor."]'::jsonb,
  '["Buscar amplitude sacrificando o controle.","Prender a respiração.","Acelerar as trocas."]'::jsonb,
  '["Reduza a amplitude se houver desconforto lombar."]'::jsonb,
  'review','pending',
  '{"rights_basis":"owned_editorial","seed_basis":["mytrainx_editorial","wrkout_exercises_unlicense"],"launch_batch":"exercise_core_v1"}'::jsonb
),
(
  'prancha-frontal','Prancha frontal','Front Plank','pt-BR',
  array['plank','prancha'],'strength','beginner',
  array['bodyweight'],array['core'],array['shoulders','glutes','quadriceps'],
  array['anti_extension'],array['core'],
  '["Apoie antebraços e pés e organize o corpo numa posição estável.","Mantenha tensão sem prender a respiração.","Finalize antes de perder claramente a posição."]'::jsonb,
  '["Empurre o chão.","Respire.","Qualidade antes do cronómetro."]'::jsonb,
  '["Deixar o quadril cair.","Elevar demais o quadril.","Transformar duração em competição."]'::jsonb,
  '["Use versão inclinada ou com joelhos apoiados quando necessário.","Interrompa se houver dor aguda ou desconforto crescente."]'::jsonb,
  'review','pending',
  '{"rights_basis":"owned_editorial","seed_basis":["mytrainx_editorial","wrkout_exercises_unlicense"],"launch_batch":"exercise_core_v1"}'::jsonb
)
on conflict (slug) do update set
  name=excluded.name,
  canonical_name=excluded.canonical_name,
  aliases=excluded.aliases,
  exercise_type=excluded.exercise_type,
  difficulty=excluded.difficulty,
  equipment=excluded.equipment,
  primary_muscles=excluded.primary_muscles,
  secondary_muscles=excluded.secondary_muscles,
  movement_patterns=excluded.movement_patterns,
  body_regions=excluded.body_regions,
  instructions=excluded.instructions,
  coaching_cues=excluded.coaching_cues,
  common_mistakes=excluded.common_mistakes,
  safety_notes=excluded.safety_notes,
  metadata=public.exercises.metadata || excluded.metadata,
  updated_at=now();

insert into public.exercise_relations (exercise_id,related_exercise_id,relation_type,rank,metadata)
select a.id,b.id,'progression',1,'{"basis":"editorial"}'::jsonb
from public.exercises a, public.exercises b
where a.slug='agachamento-livre' and b.slug='goblet-squat'
on conflict do nothing;

insert into public.exercise_relations (exercise_id,related_exercise_id,relation_type,rank,metadata)
select a.id,b.id,'regression',1,'{"basis":"editorial"}'::jsonb
from public.exercises a, public.exercises b
where a.slug='goblet-squat' and b.slug='agachamento-livre'
on conflict do nothing;

insert into public.exercise_relations (exercise_id,related_exercise_id,relation_type,rank,metadata)
select a.id,b.id,'progression',1,'{"basis":"editorial"}'::jsonb
from public.exercises a, public.exercises b
where a.slug='flexao-inclinada' and b.slug='flexao-de-bracos'
on conflict do nothing;

insert into public.exercise_relations (exercise_id,related_exercise_id,relation_type,rank,metadata)
select a.id,b.id,'regression',1,'{"basis":"editorial"}'::jsonb
from public.exercises a, public.exercises b
where a.slug='flexao-de-bracos' and b.slug='flexao-inclinada'
on conflict do nothing;

insert into public.content_items (
  slug,title,subtitle,content_type,language,summary,tags,topics,access_policy,
  ai_index_policy,status,version,reading_time_minutes,featured,published_at,metadata
)
values
('overnight-oats-iogurte-fruta','Overnight oats com iogurte e fruta','Pequeno-almoço preparado na véspera','recipe','pt-BR',
 'Aveia, iogurte e fruta numa receita simples de meal prep.',
 array['cafe-da-manha','meal-prep','aveia'],array['recipes','nutrition'],'public','metadata_only','published',1,3,true,now(),
 '{"rights_basis":"owned","launch_batch":"kitchen_v1","nutrition_values_status":"not_calculated"}'::jsonb),
('omelete-legumes-ricota','Omelete de legumes e ricota','Refeição rápida em poucos minutos','recipe','pt-BR',
 'Ovos, vegetais e ricota numa refeição simples e flexível.',
 array['ovos','rapido','proteina'],array['recipes','nutrition'],'public','metadata_only','published',1,4,false,now(),
 '{"rights_basis":"owned","launch_batch":"kitchen_v1","nutrition_values_status":"not_calculated"}'::jsonb),
('bowl-frango-arroz-vegetais','Bowl de frango, arroz e vegetais','Uma base versátil para meal prep','recipe','pt-BR',
 'Base combinável de frango, arroz e vegetais para refeições práticas.',
 array['frango','arroz','marmita'],array['recipes','nutrition'],'public','metadata_only','published',1,5,false,now(),
 '{"rights_basis":"owned","launch_batch":"kitchen_v1","nutrition_values_status":"not_calculated"}'::jsonb),
('salada-morna-grao-de-bico-ovos','Salada morna de grão-de-bico e ovos','Leguminosas, ovos e vegetais','recipe','pt-BR',
 'Uma refeição vegetariana baseada em grão-de-bico, ovos, vegetais e ervas.',
 array['grao-de-bico','ovos','vegetariano'],array['recipes','nutrition'],'public','metadata_only','published',1,5,false,now(),
 '{"rights_basis":"owned","launch_batch":"kitchen_v1","nutrition_values_status":"not_calculated"}'::jsonb)
on conflict (slug) do update set
  title=excluded.title, subtitle=excluded.subtitle, summary=excluded.summary,
  tags=excluded.tags, topics=excluded.topics, access_policy=excluded.access_policy,
  metadata=public.content_items.metadata || excluded.metadata, updated_at=now();

insert into public.recipes (content_id,meal_type,servings,ingredients,steps,allergens,nutrition,metadata)
select id,'breakfast',1,
 '[{"name":"Aveia em flocos","quantity":40,"unit":"g"},{"name":"Iogurte natural","quantity":170,"unit":"g"},{"name":"Leite ou bebida de preferência","quantity":80,"unit":"ml"},{"name":"Banana ou outra fruta","quantity":1,"unit":"portion"},{"name":"Chia","quantity":1,"unit":"tsp"},{"name":"Canela","quantity":null,"unit":"to_taste"}]'::jsonb,
 '["Misture aveia, iogurte, parte do líquido e chia.","Ajuste a textura com mais líquido, se necessário.","Adicione a fruta e a canela.","Cubra e deixe na geladeira durante a noite."]'::jsonb,
 array['milk'],null,
 '{"substitutions":["Troque a fruta conforme a estação.","Use iogurte sem lactose quando necessário."],"storage":["Conserve refrigerado em recipiente fechado.","Prefira consumir no dia seguinte para melhor textura."],"nutrition_status":"pending_fdc_mapping"}'::jsonb
from public.content_items where slug='overnight-oats-iogurte-fruta'
on conflict (content_id) do update set ingredients=excluded.ingredients,steps=excluded.steps,allergens=excluded.allergens,nutrition=excluded.nutrition,metadata=excluded.metadata,updated_at=now();

insert into public.recipes (content_id,meal_type,servings,ingredients,steps,allergens,nutrition,metadata)
select id,'breakfast',1,
 '[{"name":"Ovos","quantity":3,"unit":"unit"},{"name":"Tomate","quantity":0.5,"unit":"unit"},{"name":"Espinafre ou couve","quantity":1,"unit":"handful"},{"name":"Ricota","quantity":2,"unit":"tbsp"},{"name":"Azeite","quantity":1,"unit":"tsp"},{"name":"Sal, pimenta e ervas","quantity":null,"unit":"to_taste"}]'::jsonb,
 '["Bata os ovos com temperos.","Refogue rapidamente os vegetais.","Adicione os ovos e cozinhe em fogo baixo a médio.","Distribua a ricota e finalize."]'::jsonb,
 array['egg','milk'],null,
 '{"substitutions":["Use outros vegetais disponíveis.","Troque ricota por outro queijo fresco compatível com sua preferência."],"storage":["Melhor consumida após o preparo; se guardar, refrigere rapidamente."],"nutrition_status":"pending_fdc_mapping"}'::jsonb
from public.content_items where slug='omelete-legumes-ricota'
on conflict (content_id) do update set ingredients=excluded.ingredients,steps=excluded.steps,allergens=excluded.allergens,nutrition=excluded.nutrition,metadata=excluded.metadata,updated_at=now();

insert into public.recipes (content_id,meal_type,servings,ingredients,steps,allergens,nutrition,metadata)
select id,'lunch',2,
 '[{"name":"Frango sem osso","quantity":300,"unit":"g"},{"name":"Arroz cozido","quantity":2,"unit":"portion"},{"name":"Cenoura","quantity":1,"unit":"small_unit"},{"name":"Abobrinha","quantity":0.5,"unit":"unit"},{"name":"Brócolis","quantity":1,"unit":"cup"},{"name":"Azeite","quantity":1,"unit":"tbsp"},{"name":"Limão, alho, páprica e ervas","quantity":null,"unit":"to_taste"}]'::jsonb,
 '["Tempere o frango e corte os vegetais.","Cozinhe o frango completamente.","Salteie ou asse os vegetais.","Monte com arroz, vegetais e frango.","Finalize com limão e ervas."]'::jsonb,
 array[]::text[],null,
 '{"substitutions":["Troque frango por tofu, ovos, peixe ou leguminosas conforme o contexto.","Troque arroz por batata, quinoa, massa ou outro cereal."],"storage":["Refrigere em recipientes adequados e reaqueça completamente quando aplicável."],"nutrition_status":"pending_fdc_mapping"}'::jsonb
from public.content_items where slug='bowl-frango-arroz-vegetais'
on conflict (content_id) do update set ingredients=excluded.ingredients,steps=excluded.steps,allergens=excluded.allergens,nutrition=excluded.nutrition,metadata=excluded.metadata,updated_at=now();

insert into public.recipes (content_id,meal_type,servings,ingredients,steps,allergens,nutrition,metadata)
select id,'lunch',2,
 '[{"name":"Grão-de-bico cozido","quantity":2,"unit":"cup"},{"name":"Ovos cozidos","quantity":4,"unit":"unit"},{"name":"Tomate-cereja","quantity":1,"unit":"cup"},{"name":"Folhas verdes","quantity":2,"unit":"handful"},{"name":"Cebola roxa","quantity":0.25,"unit":"unit"},{"name":"Azeite e limão","quantity":null,"unit":"to_taste"},{"name":"Salsinha ou coentro","quantity":null,"unit":"to_taste"}]'::jsonb,
 '["Aqueça rapidamente o grão-de-bico com temperos.","Misture tomate, folhas e cebola.","Adicione o grão-de-bico morno.","Finalize com ovos, limão, azeite e ervas."]'::jsonb,
 array['egg'],null,
 '{"substitutions":["Use feijão branco ou lentilhas.","Substitua ovos por tofu grelhado se preferir versão sem ovos."],"storage":["Guarde o molho separado se preparar com antecedência.","Conserve refrigerado."],"nutrition_status":"pending_fdc_mapping"}'::jsonb
from public.content_items where slug='salada-morna-grao-de-bico-ovos'
on conflict (content_id) do update set ingredients=excluded.ingredients,steps=excluded.steps,allergens=excluded.allergens,nutrition=excluded.nutrition,metadata=excluded.metadata,updated_at=now();

insert into public.content_rights (
  content_id,rights_basis,copyright_holder,commercial_use_allowed,derivatives_allowed,
  redistribution_allowed,attribution_required,ai_retrieval_allowed,ai_derivative_generation_allowed,
  verification_status,verified_at,verified_by,notes,metadata
)
select id,'owned','MyTrainX',true,true,true,false,true,true,'verified',now(),'MyTrainX content governance',
       'Original MyTrainX editorial recipe. Photography rights are governed separately.'::text,
       '{"brandable":true,"watermark_allowed":true}'::jsonb
from public.content_items
where slug in ('overnight-oats-iogurte-fruta','omelete-legumes-ricota','bowl-frango-arroz-vegetais','salada-morna-grao-de-bico-ovos')
on conflict (content_id) do update set
  rights_basis=excluded.rights_basis,
  copyright_holder=excluded.copyright_holder,
  commercial_use_allowed=excluded.commercial_use_allowed,
  derivatives_allowed=excluded.derivatives_allowed,
  redistribution_allowed=excluded.redistribution_allowed,
  attribution_required=excluded.attribution_required,
  ai_retrieval_allowed=excluded.ai_retrieval_allowed,
  ai_derivative_generation_allowed=excluded.ai_derivative_generation_allowed,
  verification_status=excluded.verification_status,
  verified_at=excluded.verified_at,
  verified_by=excluded.verified_by,
  notes=excluded.notes,
  metadata=excluded.metadata,
  updated_at=now();

insert into public.content_sources (
  content_id,provider,external_id,source_path,original_title,transcript_status,extraction_status,metadata
)
select id,'generated','mytrainx:'||slug||':v1','lib/library-launch.ts',title,'none','ready',
       '{"authorship":"MyTrainX Editorial 2026","source_kind":"owned_original"}'::jsonb
from public.content_items
where slug in ('overnight-oats-iogurte-fruta','omelete-legumes-ricota','bowl-frango-arroz-vegetais','salada-morna-grao-de-bico-ovos')
on conflict (provider,external_id) do update set
  content_id=excluded.content_id,source_path=excluded.source_path,original_title=excluded.original_title,
  extraction_status=excluded.extraction_status,metadata=excluded.metadata,updated_at=now();

insert into public.content_reviews (content_id,review_type,status,review_version,notes,evidence_urls,metadata)
select ci.id,'nutrition','pending',1,
       'Recipe is publishable as general culinary content; nutrient calculations remain blocked until canonical food mapping/review.',
       array[]::text[],
       '{"gate":"nutrition_calculation","launch_batch":"kitchen_v1"}'::jsonb
from public.content_items ci
where ci.slug in ('overnight-oats-iogurte-fruta','omelete-legumes-ricota','bowl-frango-arroz-vegetais','salada-morna-grao-de-bico-ovos')
and not exists (
  select 1 from public.content_reviews cr
  where cr.content_id=ci.id and cr.review_type='nutrition' and cr.review_version=1
);
