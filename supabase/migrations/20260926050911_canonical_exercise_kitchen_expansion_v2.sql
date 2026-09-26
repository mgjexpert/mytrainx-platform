
-- MyTrainX canonical exercise + Kitchen expansion V2.
-- Additive/idempotent. Exercises remain review-gated.

insert into public.exercises (
  slug,name,canonical_name,locale,aliases,exercise_type,difficulty,equipment,
  primary_muscles,secondary_muscles,movement_patterns,body_regions,
  instructions,coaching_cues,common_mistakes,safety_notes,status,review_status,metadata
)
values
('agachamento-ao-banco','Agachamento ao banco','Chair Squat','pt-BR',
 array['chair squat','agachamento para banco'],'strength','beginner',
 array['bodyweight','bench'],array['quadriceps','glutes'],array['adductors','core'],
 array['squat'],array['lower_body'],
 '["Fique à frente de um banco ou caixa estável.","Leve o quadril para trás enquanto flexiona os joelhos.","Toque ou sente brevemente no apoio sem relaxar totalmente.","Empurre o chão para retornar em pé."]'::jsonb,
 '["Use o banco como referência, não como queda.","Pés firmes.","Suba com controle."]'::jsonb,
 '["Cair no banco sem controle.","Impulsionar com balanço.","Usar altura que force desconforto."]'::jsonb,
 '["O apoio deve estar estável e não deslizar.","Ajuste a altura para manter amplitude confortável."]'::jsonb,
 'review','pending','{"source_key":"Chair_Squat","source_license":"Unlicense","editorial_layer":"MyTrainX PT-BR v1","launch_batch":"exercise_core_v2"}'::jsonb),

('agachamento-com-barra','Agachamento com barra','Barbell Squat','pt-BR',
 array['barbell squat','back squat'],'strength','intermediate',
 array['barbell','rack'],array['quadriceps','glutes'],array['adductors','hamstrings','core'],
 array['squat'],array['lower_body','core'],
 '["Ajuste o rack para retirar a barra com segurança.","Posicione a barra de forma estável nas costas e crie uma base confortável.","Desça flexionando joelhos e quadris mantendo os pés apoiados.","Retorne empurrando o chão e mantendo a barra controlada."]'::jsonb,
 '["Barra estável antes de sair do rack.","Base repetível.","Amplitude controlada."]'::jsonb,
 '["Retirar a barra com rack mal ajustado.","Perder o apoio dos pés.","Aumentar carga antes de dominar a trajetória."]'::jsonb,
 '["Use travas e suportes de segurança quando disponíveis.","Treine a retirada e devolução da barra com carga leve antes de progredir."]'::jsonb,
 'review','pending','{"source_key":"Barbell_Squat","source_license":"Unlicense","editorial_layer":"MyTrainX PT-BR v1","launch_batch":"exercise_core_v2"}'::jsonb),

('front-squat','Front squat','Front Barbell Squat','pt-BR',
 array['agachamento frontal'],'strength','intermediate',
 array['barbell','rack'],array['quadriceps','glutes'],array['upper_back','core'],
 array['squat'],array['lower_body','core'],
 '["Apoie a barra na posição frontal com pegada confortável.","Retire a barra do rack mantendo o tronco organizado.","Agache dentro da amplitude que consegue controlar.","Suba mantendo a posição frontal estável."]'::jsonb,
 '["Cotovelos organizados.","Tronco firme.","Carga permanece próxima ao centro do corpo."]'::jsonb,
 '["Deixar a barra rolar para frente.","Escolher pegada que provoque dor.","Aumentar a carga sem estabilidade frontal."]'::jsonb,
 '["Use rack e suportes de segurança quando disponíveis.","Mobilidade de punho/ombro limitada pode exigir outra posição de pegada ou exercício alternativo."]'::jsonb,
 'review','pending','{"source_key":"Front_Barbell_Squat","source_license":"Unlicense","editorial_layer":"MyTrainX PT-BR v1","launch_batch":"exercise_core_v2"}'::jsonb),

('trap-bar-deadlift','Levantamento terra com trap bar','Trap Bar Deadlift','pt-BR',
 array['hex bar deadlift','terra com trap bar'],'strength','intermediate',
 array['trap_bar'],array['glutes','quadriceps'],array['hamstrings','back','forearms','core'],
 array['hinge','squat_hinge'],array['lower_body','posterior_chain'],
 '["Entre no centro da trap bar e organize os pés.","Segure as alças e crie tensão antes de retirar a carga do chão.","Estenda joelhos e quadris mantendo a carga controlada.","Retorne a carga ao chão com trajetória estável."]'::jsonb,
 '["Crie tensão antes de levantar.","Empurre o chão.","Finalize em pé sem hiperestender."]'::jsonb,
 '["Arrancar a carga sem tensão.","Perder a posição do tronco.","Descer a carga sem controle."]'::jsonb,
 '["Comece com carga que permita repetir a mesma posição.","Use espaço livre ao redor da barra."]'::jsonb,
 'review','pending','{"source_key":"Trap_Bar_Deadlift","source_license":"Unlicense","editorial_layer":"MyTrainX PT-BR v1","launch_batch":"exercise_core_v2"}'::jsonb),

('hip-thrust-com-barra','Hip thrust com barra','Barbell Hip Thrust','pt-BR',
 array['barbell hip thrust','elevação pélvica com barra'],'strength','intermediate',
 array['barbell','bench'],array['glutes'],array['hamstrings','adductors','core'],
 array['hip_extension'],array['lower_body','posterior_chain'],
 '["Apoie a parte superior das costas num banco estável.","Posicione a barra sobre o quadril usando proteção confortável quando necessário.","Eleve o quadril mantendo pés e banco estáveis.","Finalize numa posição neutra e desça com controle."]'::jsonb,
 '["Banco firme.","Suba pelo quadril.","Evite hiperextender a lombar."]'::jsonb,
 '["Banco escorregando.","Barra mal posicionada.","Buscar altura extra arqueando a lombar."]'::jsonb,
 '["Confirme que o banco não pode deslizar.","Use carga que consiga posicionar e retirar com segurança."]'::jsonb,
 'review','pending','{"source_key":"Barbell_Hip_Thrust","source_license":"Unlicense","editorial_layer":"MyTrainX PT-BR v1","launch_batch":"exercise_core_v2"}'::jsonb),

('afundo-reverso-com-halteres','Afundo reverso com halteres','Dumbbell Rear Lunge','pt-BR',
 array['reverse lunge','afundo para trás'],'strength','intermediate',
 array['dumbbell'],array['quadriceps','glutes'],array['hamstrings','adductors','core'],
 array['lunge'],array['lower_body'],
 '["Fique em pé segurando os halteres com postura estável.","Dê um passo para trás e desça dentro da amplitude controlada.","Mantenha o pé da frente firme.","Empurre o chão e retorne à posição inicial."]'::jsonb,
 '["Passo para trás controlado.","Pé da frente firme.","Alterne os lados com a mesma técnica."]'::jsonb,
 '["Passo estreito demais.","Bater o joelho no chão.","Perder equilíbrio por excesso de carga."]'::jsonb,
 '["Use apoio externo ou versão sem carga se equilíbrio for o principal limitador."]'::jsonb,
 'review','pending','{"source_key":"Dumbbell_Rear_Lunge","source_license":"Unlicense","editorial_layer":"MyTrainX PT-BR v1","launch_batch":"exercise_core_v2"}'::jsonb),

('step-up-com-halteres','Step-up com halteres','Dumbbell Step Ups','pt-BR',
 array['subida no banco com halteres','dumbbell step up'],'strength','intermediate',
 array['dumbbell','box'],array['quadriceps','glutes'],array['hamstrings','calves','core'],
 array['step'],array['lower_body'],
 '["Escolha um step ou caixa firme e de altura controlável.","Coloque um pé inteiro sobre o apoio.","Suba usando principalmente a perna apoiada.","Desça com controle e repita antes de trocar o lado."]'::jsonb,
 '["Pé inteiro no apoio.","Suba sem impulso excessivo da perna de baixo.","Controle a descida."]'::jsonb,
 '["Caixa alta demais.","Empurrar quase tudo com a perna no chão.","Descer rapidamente."]'::jsonb,
 '["O apoio deve ser estável e antiderrapante.","Reduza a altura antes de aumentar a carga."]'::jsonb,
 'review','pending','{"source_key":"Dumbbell_Step_Ups","source_license":"Unlicense","editorial_layer":"MyTrainX PT-BR v1","launch_batch":"exercise_core_v2"}'::jsonb),

('supino-com-halteres','Supino com halteres','Dumbbell Bench Press','pt-BR',
 array['dumbbell bench press'],'strength','beginner',
 array['dumbbell','bench'],array['chest'],array['triceps','anterior_deltoid'],
 array['horizontal_push'],array['upper_body'],
 '["Sente-se no banco com os halteres apoiados de forma controlada.","Deite-se levando os halteres à posição inicial próxima ao peito.","Empurre as cargas até os braços ficarem estendidos confortavelmente.","Desça com controle até uma amplitude tolerável."]'::jsonb,
 '["Pés estáveis.","Punhos organizados.","Controle a descida."]'::jsonb,
 '["Descer além da amplitude confortável.","Bater os halteres no topo.","Tentar posicionar carga pesada sem estratégia."]'::jsonb,
 '["Escolha carga que consiga colocar e retirar com segurança.","Use ajuda de um parceiro quando a carga exigir."]'::jsonb,
 'review','pending','{"source_key":"Dumbbell_Bench_Press","source_license":"Unlicense","editorial_layer":"MyTrainX PT-BR v1","launch_batch":"exercise_core_v2"}'::jsonb),

('desenvolvimento-com-halteres','Desenvolvimento com halteres','Dumbbell Shoulder Press','pt-BR',
 array['dumbbell shoulder press','shoulder press'],'strength','beginner',
 array['dumbbell','bench_optional'],array['shoulders'],array['triceps','upper_chest','core'],
 array['vertical_push'],array['upper_body'],
 '["Segure os halteres próximos aos ombros em posição confortável.","Estabilize tronco e pés.","Empurre as cargas acima da cabeça sem perder controle.","Retorne lentamente à posição inicial."]'::jsonb,
 '["Costelas controladas.","Empurre em trajetória confortável.","Mantenha punhos estáveis."]'::jsonb,
 '["Arquear excessivamente a lombar.","Descer além da mobilidade confortável.","Usar impulso não planejado."]'::jsonb,
 '["Use encosto quando necessário.","Reduza carga ou amplitude se o ombro apresentar desconforto crescente."]'::jsonb,
 'review','pending','{"source_key":"Dumbbell_Shoulder_Press","source_license":"Unlicense","editorial_layer":"MyTrainX PT-BR v1","launch_batch":"exercise_core_v2"}'::jsonb),

('puxada-frente-pegada-neutra','Puxada na frente','Close-Grip Front Lat Pulldown','pt-BR',
 array['lat pulldown','puxada alta'],'strength','beginner',
 array['cable_machine'],array['latissimus_dorsi'],array['biceps','mid_back','rear_deltoid'],
 array['vertical_pull'],array['upper_body','back'],
 '["Sente-se e ajuste o apoio das pernas.","Segure a barra ou pegador de forma confortável.","Puxe o implemento em direção à parte superior do tronco mantendo controle.","Retorne até os braços estenderem confortavelmente."]'::jsonb,
 '["Ombros longe das orelhas.","Puxe com controle.","Evite transformar o movimento num balanço."]'::jsonb,
 '["Inclinar excessivamente o tronco.","Usar impulso.","Puxar para trás da cabeça sem necessidade."]'::jsonb,
 '["Ajuste banco e apoio antes de iniciar.","Use amplitude sem dor e carga que mantenha a trajetória controlada."]'::jsonb,
 'review','pending','{"source_key":"Close-Grip_Front_Lat_Pulldown","source_license":"Unlicense","editorial_layer":"MyTrainX PT-BR v1","launch_batch":"exercise_core_v2"}'::jsonb),

('barra-fixa-pronada','Barra fixa pronada','Pullups','pt-BR',
 array['pull-up','pullups','barra fixa'],'strength','intermediate',
 array['pullup_bar'],array['latissimus_dorsi'],array['biceps','mid_back','forearms'],
 array['vertical_pull'],array['upper_body','back'],
 '["Segure a barra com pegada confortável e fique suspenso de forma controlada.","Inicie a puxada levando o corpo em direção à barra.","Finalize na altura que consegue atingir sem perder posição.","Desça com controle até a posição inicial."]'::jsonb,
 '["Comece a puxada com controle.","Evite chutar para criar impulso quando o objetivo for força estrita.","Controle a descida."]'::jsonb,
 '["Usar balanço involuntário.","Encolher excessivamente os ombros.","Insistir além da capacidade técnica."]'::jsonb,
 '["Use assistência por banda ou máquina quando necessário.","Certifique-se de que a barra está firme e adequada para suportar a carga."]'::jsonb,
 'review','pending','{"source_key":"Pullups","source_license":"Unlicense","editorial_layer":"MyTrainX PT-BR v1","launch_batch":"exercise_core_v2"}'::jsonb),

('remada-invertida','Remada invertida','Inverted Row','pt-BR',
 array['inverted row','body row'],'strength','beginner',
 array['bar','bodyweight'],array['mid_back','latissimus_dorsi'],array['biceps','rear_deltoid','core'],
 array['horizontal_pull'],array['upper_body','core'],
 '["Use uma barra fixa e estável numa altura adequada.","Posicione o corpo abaixo dela com apoio firme dos pés.","Puxe o peito em direção à barra mantendo o corpo organizado.","Desça até os braços estenderem confortavelmente."]'::jsonb,
 '["Corpo firme.","Puxe o peito para a barra.","Altere a inclinação para ajustar dificuldade."]'::jsonb,
 '["Barra ou apoio instável.","Quadril caindo.","Buscar amplitude com rotação do tronco."]'::jsonb,
 '["Confirme que a estrutura suporta o peso corporal.","Use posição mais vertical para reduzir dificuldade."]'::jsonb,
 'review','pending','{"source_key":"Inverted_Row","source_license":"Unlicense","editorial_layer":"MyTrainX PT-BR v1","launch_batch":"exercise_core_v2"}'::jsonb),

('remada-baixa-no-cabo','Remada baixa no cabo','Seated Cable Row','pt-BR',
 array['seated cable row','remada sentada'],'strength','beginner',
 array['cable_machine'],array['mid_back','latissimus_dorsi'],array['biceps','rear_deltoid'],
 array['horizontal_pull'],array['upper_body','back'],
 '["Sente-se com pés apoiados e tronco organizado.","Segure o pegador e crie tensão antes de puxar.","Leve o pegador em direção ao tronco sem balanço excessivo.","Retorne com controle."]'::jsonb,
 '["Tronco estável.","Cotovelos viajam para trás.","Controle a extensão dos braços."]'::jsonb,
 '["Usar balanço para mover a carga.","Encolher os ombros.","Deixar a pilha de pesos cair entre repetições."]'::jsonb,
 '["Ajuste banco e apoio antes de começar.","Escolha carga que permita trajetória consistente."]'::jsonb,
 'review','pending','{"source_key":"Seated_Cable_Rows","source_license":"Unlicense","editorial_layer":"MyTrainX PT-BR v1","launch_batch":"exercise_core_v2"}'::jsonb),

('pallof-press','Pallof press','Pallof Press','pt-BR',
 array['press anti-rotação','pallof'],'strength','beginner',
 array['cable_machine','resistance_band'],array['core'],array['glutes','shoulders'],
 array['anti_rotation'],array['core'],
 '["Posicione-se lateralmente à origem da resistência.","Segure o cabo ou banda junto ao peito.","Estenda os braços à frente sem permitir rotação do tronco.","Retorne e repita antes de trocar o lado."]'::jsonb,
 '["Quadril e costelas estáveis.","Resista à rotação.","Respire enquanto mantém posição."]'::jsonb,
 '["Usar carga que gira o tronco.","Prender a respiração.","Perder alinhamento dos pés."]'::jsonb,
 '["Garanta que a banda esteja presa com segurança.","Reduza a resistência para manter controle."]'::jsonb,
 'review','pending','{"source_key":"Pallof_Press","source_license":"Unlicense","editorial_layer":"MyTrainX PT-BR v1","launch_batch":"exercise_core_v2"}'::jsonb),

('prancha-lateral','Prancha lateral','Side Plank','pt-BR',
 array['side plank'],'strength','beginner',
 array['bodyweight'],array['core'],array['glute_med','shoulders'],
 array['anti_lateral_flexion'],array['core'],
 '["Apoie antebraço e lateral do pé ou joelhos.","Eleve o quadril até formar uma posição estável.","Mantenha tensão e respiração normal.","Finalize antes de perder claramente a posição."]'::jsonb,
 '["Empurre o chão.","Quadril alto o suficiente para manter alinhamento.","Respire."]'::jsonb,
 '["Colapsar sobre o ombro.","Rodar o tronco.","Segurar além da qualidade técnica."]'::jsonb,
 '["Use joelhos apoiados se necessário.","Interrompa se houver dor crescente no ombro."]'::jsonb,
 'review','pending','{"source_key":"Side_Bridge","source_license":"Unlicense","editorial_layer":"MyTrainX PT-BR v1","launch_batch":"exercise_core_v2"}'::jsonb),

('elevacao-panturrilha-em-pe','Elevação de panturrilha em pé','Standing Calf Raise','pt-BR',
 array['standing calf raise'],'strength','beginner',
 array['bodyweight','machine_optional'],array['calves'],array[]::text[],
 array['ankle_plantar_flexion'],array['lower_body'],
 '["Fique em pé com apoio estável próximo, se necessário.","Eleve os calcanhares mantendo controle.","Faça uma breve pausa no topo.","Desça lentamente até a amplitude confortável."]'::jsonb,
 '["Suba e desça sem quicar.","Distribua o peso de forma estável.","Use apoio para equilíbrio se necessário."]'::jsonb,
 '["Usar impulso.","Perder equilíbrio.","Forçar alongamento desconfortável."]'::jsonb,
 '["Use apoio estável e amplitude tolerável.","Carga externa só deve ser adicionada quando o equilíbrio estiver resolvido."]'::jsonb,
 'review','pending','{"source_key":"Standing_Calf_Raises","source_license":"Unlicense","editorial_layer":"MyTrainX PT-BR v1","launch_batch":"exercise_core_v2"}'::jsonb),

('rosca-alternada-com-halteres','Rosca alternada com halteres','Dumbbell Alternate Bicep Curl','pt-BR',
 array['dumbbell curl','rosca bíceps'],'strength','beginner',
 array['dumbbell'],array['biceps'],array['forearms'],
 array['elbow_flexion'],array['upper_body','arms'],
 '["Fique em pé ou sentado com os halteres controlados.","Flexione um cotovelo levando o halter para cima sem mover excessivamente o braço.","Desça com controle.","Alterne os lados."]'::jsonb,
 '["Cotovelo estável.","Punho neutro.","Controle a descida."]'::jsonb,
 '["Balançar o tronco.","Jogar o cotovelo para frente.","Soltar a carga na descida."]'::jsonb,
 '["Use carga que permita controlar todo o percurso."]'::jsonb,
 'review','pending','{"source_key":"Dumbbell_Alternate_Bicep_Curl","source_license":"Unlicense","editorial_layer":"MyTrainX PT-BR v1","launch_batch":"exercise_core_v2"}'::jsonb),

('extensao-triceps-corda','Extensão de tríceps com corda','Cable Rope Triceps Extension','pt-BR',
 array['triceps rope pushdown','tríceps corda'],'strength','beginner',
 array['cable_machine','rope'],array['triceps'],array[]::text[],
 array['elbow_extension'],array['upper_body','arms'],
 '["Fique de frente para a polia com postura estável.","Segure a corda com cotovelos próximos ao tronco.","Estenda os cotovelos mantendo braços controlados.","Retorne lentamente até a posição inicial."]'::jsonb,
 '["Cotovelos estáveis.","Sem balanço.","Controle a volta."]'::jsonb,
 '["Mover o ombro para terminar a repetição.","Inclinar excessivamente o tronco.","Deixar a carga subir sem controle."]'::jsonb,
 '["Ajuste a polia e carga antes de iniciar.","Mantenha distância segura da pilha de pesos."]'::jsonb,
 'review','pending','{"source_key":"Cable_Rope_Overhead_Triceps_Extension","source_license":"Unlicense","editorial_layer":"MyTrainX PT-BR v1","launch_batch":"exercise_core_v2"}'::jsonb),

('mountain-climber','Mountain climber','Mountain Climbers','pt-BR',
 array['escalador','mountain climbers'],'conditioning','beginner',
 array['bodyweight'],array['core','hip_flexors'],array['shoulders','quadriceps'],
 array['locomotion','conditioning'],array['full_body','core'],
 '["Comece em posição de apoio alto com mãos firmes.","Leve um joelho em direção ao tronco sem perder a estabilidade.","Alterne as pernas na velocidade que consegue controlar.","Mantenha a respiração contínua."]'::jsonb,
 '["Controle antes da velocidade.","Empurre o chão.","Quadril estável."]'::jsonb,
 '["Transformar o movimento em corrida desorganizada.","Deixar o quadril cair.","Prender a respiração."]'::jsonb,
 '["Use apoio elevado para reduzir exigência dos punhos/ombros.","Interrompa se perder controle ou houver dor."]'::jsonb,
 'review','pending','{"source_key":"Mountain_Climbers","source_license":"Unlicense","editorial_layer":"MyTrainX PT-BR v1","launch_batch":"exercise_core_v2"}'::jsonb),

('caminhada-do-fazendeiro','Caminhada do fazendeiro','Farmer''s Walk','pt-BR',
 array['farmer walk','farmer carry'],'strength','beginner',
 array['dumbbell','kettlebell'],array['forearms','upper_back','core'],array['glutes','calves','shoulders'],
 array['carry','locomotion'],array['full_body'],
 '["Pegue duas cargas que consiga segurar com postura estável.","Fique em pé antes de começar a caminhar.","Caminhe com passos controlados e espaço livre à frente.","Pare, estabilize e deposite as cargas com controle."]'::jsonb,
 '["Postura alta.","Passos controlados.","Pegada firme sem pressa."]'::jsonb,
 '["Escolher carga que compromete a caminhada.","Largar as cargas sem controle.","Caminhar em área obstruída."]'::jsonb,
 '["Use percurso livre e piso seguro.","Aprenda a pegar e devolver as cargas antes de aumentar peso."]'::jsonb,
 'review','pending','{"source_key":"Farmer''s_Walk","source_license":"Unlicense","editorial_layer":"MyTrainX PT-BR v1","launch_batch":"exercise_core_v2"}'::jsonb)
on conflict (slug) do update set
  name=excluded.name,canonical_name=excluded.canonical_name,aliases=excluded.aliases,
  exercise_type=excluded.exercise_type,difficulty=excluded.difficulty,equipment=excluded.equipment,
  primary_muscles=excluded.primary_muscles,secondary_muscles=excluded.secondary_muscles,
  movement_patterns=excluded.movement_patterns,body_regions=excluded.body_regions,
  instructions=excluded.instructions,coaching_cues=excluded.coaching_cues,
  common_mistakes=excluded.common_mistakes,safety_notes=excluded.safety_notes,
  metadata=public.exercises.metadata || excluded.metadata,updated_at=now();

insert into public.exercise_relations (exercise_id,related_exercise_id,relation_type,rank,metadata)
select a.id,b.id,'progression',1,'{"basis":"MyTrainX editorial"}'::jsonb
from public.exercises a, public.exercises b
where a.slug='agachamento-ao-banco' and b.slug='agachamento-livre'
on conflict do nothing;

insert into public.exercise_relations (exercise_id,related_exercise_id,relation_type,rank,metadata)
select a.id,b.id,'progression',2,'{"basis":"MyTrainX editorial"}'::jsonb
from public.exercises a, public.exercises b
where a.slug='goblet-squat' and b.slug='agachamento-com-barra'
on conflict do nothing;

insert into public.exercise_relations (exercise_id,related_exercise_id,relation_type,rank,metadata)
select a.id,b.id,'progression',1,'{"basis":"MyTrainX editorial"}'::jsonb
from public.exercises a, public.exercises b
where a.slug='remada-invertida' and b.slug='barra-fixa-pronada'
on conflict do nothing;

insert into public.content_items (
 slug,title,subtitle,content_type,language,summary,tags,topics,access_policy,
 ai_index_policy,status,version,reading_time_minutes,featured,published_at,metadata
)
values
('arroz-feijao-ovos-vegetais','Arroz, feijão, ovos e vegetais','Base brasileira simples e adaptável','recipe','pt-BR',
 'Uma combinação prática de arroz, feijão, ovos e vegetais para uma refeição completa e fácil de repetir.',
 array['arroz','feijao','ovos','brasil'],array['recipes','nutrition'],'public','metadata_only','published',1,5,false,now(),
 '{"rights_basis":"owned","launch_batch":"kitchen_v2","nutrition_values_status":"not_calculated"}'::jsonb),
('panqueca-aveia-banana-ovo','Panqueca de aveia, banana e ovo','Café da manhã de frigideira','recipe','pt-BR',
 'Panqueca simples com banana, aveia e ovos, fácil de personalizar.',
 array['banana','aveia','ovos','cafe-da-manha'],array['recipes','nutrition'],'public','metadata_only','published',1,4,false,now(),
 '{"rights_basis":"owned","launch_batch":"kitchen_v2","nutrition_values_status":"not_calculated"}'::jsonb),
('sopa-lentilha-legumes','Sopa de lentilha e legumes','Panela única para dias corridos','recipe','pt-BR',
 'Lentilha, legumes e ervas numa receita de panela única adequada a meal prep.',
 array['lentilha','sopa','vegetariano','meal-prep'],array['recipes','nutrition'],'public','metadata_only','published',1,6,false,now(),
 '{"rights_basis":"owned","launch_batch":"kitchen_v2","nutrition_values_status":"not_calculated"}'::jsonb),
('wrap-frango-feijao-salada','Wrap de frango, feijão e salada','Montagem rápida para almoço ou jantar','recipe','pt-BR',
 'Wrap flexível com frango, feijão e vegetais frescos.',
 array['frango','feijao','wrap','rapido'],array['recipes','nutrition'],'public','metadata_only','published',1,5,false,now(),
 '{"rights_basis":"owned","launch_batch":"kitchen_v2","nutrition_values_status":"not_calculated"}'::jsonb),
('massa-atum-tomate-ervilhas','Massa com atum, tomate e ervilhas','Refeição rápida de despensa','recipe','pt-BR',
 'Massa, atum, tomate e ervilhas numa preparação simples para dias de pouca disponibilidade.',
 array['massa','atum','tomate','rapido'],array['recipes','nutrition'],'public','metadata_only','published',1,5,false,now(),
 '{"rights_basis":"owned","launch_batch":"kitchen_v2","nutrition_values_status":"not_calculated"}'::jsonb),
('tofu-arroz-brocolis','Tofu, arroz e brócolis na frigideira','Opção vegetal para meal prep','recipe','pt-BR',
 'Tofu dourado, arroz e brócolis com temperos simples.',
 array['tofu','arroz','brocolis','vegetariano'],array['recipes','nutrition'],'public','metadata_only','published',1,5,false,now(),
 '{"rights_basis":"owned","launch_batch":"kitchen_v2","nutrition_values_status":"not_calculated"}'::jsonb),
('batata-assada-cottage-salada','Batata assada com cottage e salada','Montagem simples de forno','recipe','pt-BR',
 'Batata assada servida com cottage e salada crocante.',
 array['batata','cottage','salada'],array['recipes','nutrition'],'public','metadata_only','published',1,5,false,now(),
 '{"rights_basis":"owned","launch_batch":"kitchen_v2","nutrition_values_status":"not_calculated"}'::jsonb),
('iogurte-fruta-aveia-castanhas','Iogurte com fruta, aveia e castanhas','Lanche sem cozinha','recipe','pt-BR',
 'Taça rápida de iogurte, fruta, aveia e castanhas para um lanche ou café da manhã simples.',
 array['iogurte','fruta','aveia','lanche'],array['recipes','nutrition'],'public','metadata_only','published',1,3,false,now(),
 '{"rights_basis":"owned","launch_batch":"kitchen_v2","nutrition_values_status":"not_calculated"}'::jsonb)
on conflict (slug) do update set
 title=excluded.title,subtitle=excluded.subtitle,summary=excluded.summary,
 tags=excluded.tags,topics=excluded.topics,access_policy=excluded.access_policy,
 metadata=public.content_items.metadata || excluded.metadata,updated_at=now();

insert into public.recipes(content_id,meal_type,servings,ingredients,steps,allergens,nutrition,metadata)
select id,'lunch',1,
 '[{"name":"Arroz cozido","quantity":1,"unit":"portion"},{"name":"Feijão cozido","quantity":1,"unit":"portion"},{"name":"Ovos","quantity":2,"unit":"unit"},{"name":"Vegetais variados","quantity":2,"unit":"handful"},{"name":"Azeite, alho e ervas","quantity":null,"unit":"to_taste"}]'::jsonb,
 '["Aqueça arroz e feijão adequadamente.","Prepare os ovos da forma escolhida até o ponto seguro.","Salteie ou aqueça os vegetais.","Monte o prato e finalize com temperos."]'::jsonb,
 array['egg'],null,
 '{"nutrition_status":"pending_fdc_mapping","substitutions":["Troque ovos por tofu, frango ou outra fonte de proteína.","Varie os vegetais conforme disponibilidade."],"storage":["Arroz e feijão cozidos devem ser refrigerados adequadamente quando preparados com antecedência."]}'::jsonb
from public.content_items where slug='arroz-feijao-ovos-vegetais'
on conflict(content_id) do update set ingredients=excluded.ingredients,steps=excluded.steps,allergens=excluded.allergens,metadata=excluded.metadata,updated_at=now();

insert into public.recipes(content_id,meal_type,servings,ingredients,steps,allergens,nutrition,metadata)
select id,'breakfast',1,
 '[{"name":"Banana madura","quantity":1,"unit":"unit"},{"name":"Ovos","quantity":2,"unit":"unit"},{"name":"Aveia em flocos","quantity":30,"unit":"g"},{"name":"Canela","quantity":null,"unit":"to_taste"},{"name":"Óleo ou azeite","quantity":1,"unit":"tsp"}]'::jsonb,
 '["Amasse a banana.","Misture ovos, aveia e canela.","Aqueça uma frigideira levemente untada.","Cozinhe porções pequenas dos dois lados até firmarem."]'::jsonb,
 array['egg'],null,
 '{"nutrition_status":"pending_fdc_mapping","substitutions":["Use outras especiarias como baunilha ou cacau sem açúcar."],"storage":["Melhor consumida após o preparo; pode ser refrigerada por curto período em recipiente fechado."]}'::jsonb
from public.content_items where slug='panqueca-aveia-banana-ovo'
on conflict(content_id) do update set ingredients=excluded.ingredients,steps=excluded.steps,allergens=excluded.allergens,metadata=excluded.metadata,updated_at=now();

insert into public.recipes(content_id,meal_type,servings,ingredients,steps,allergens,nutrition,metadata)
select id,'dinner',4,
 '[{"name":"Lentilha seca","quantity":1,"unit":"cup"},{"name":"Cenoura","quantity":2,"unit":"unit"},{"name":"Tomate","quantity":2,"unit":"unit"},{"name":"Cebola","quantity":1,"unit":"unit"},{"name":"Abobrinha","quantity":1,"unit":"unit"},{"name":"Água ou caldo sem excesso de sal","quantity":1.5,"unit":"liter"},{"name":"Alho, ervas e azeite","quantity":null,"unit":"to_taste"}]'::jsonb,
 '["Lave a lentilha e corte os vegetais.","Refogue cebola e alho.","Adicione lentilha, tomate, cenoura e líquido.","Cozinhe até a lentilha ficar macia.","Adicione a abobrinha próximo do final e ajuste os temperos."]'::jsonb,
 array[]::text[],null,
 '{"nutrition_status":"pending_fdc_mapping","substitutions":["Use outros vegetais firmes.","Adicione folhas no final do cozimento."],"storage":["Divida em recipientes rasos, refrigere adequadamente ou congele porções."]}'::jsonb
from public.content_items where slug='sopa-lentilha-legumes'
on conflict(content_id) do update set ingredients=excluded.ingredients,steps=excluded.steps,allergens=excluded.allergens,metadata=excluded.metadata,updated_at=now();

insert into public.recipes(content_id,meal_type,servings,ingredients,steps,allergens,nutrition,metadata)
select id,'lunch',2,
 '[{"name":"Tortilhas tipo wrap","quantity":2,"unit":"unit"},{"name":"Frango cozido ou grelhado","quantity":200,"unit":"g"},{"name":"Feijão cozido","quantity":1,"unit":"cup"},{"name":"Alface ou folhas","quantity":2,"unit":"handful"},{"name":"Tomate","quantity":1,"unit":"unit"},{"name":"Iogurte natural, limão e ervas para molho","quantity":null,"unit":"to_taste"}]'::jsonb,
 '["Aqueça o frango e o feijão se necessário.","Misture os ingredientes do molho.","Distribua folhas, tomate, feijão e frango nas tortilhas.","Finalize com molho e enrole."]'::jsonb,
 array['gluten','milk'],null,
 '{"nutrition_status":"pending_fdc_mapping","substitutions":["Use tortilha sem glúten quando necessário.","Troque frango por tofu ou outra proteína."],"storage":["Monte próximo do consumo para preservar textura das folhas."]}'::jsonb
from public.content_items where slug='wrap-frango-feijao-salada'
on conflict(content_id) do update set ingredients=excluded.ingredients,steps=excluded.steps,allergens=excluded.allergens,metadata=excluded.metadata,updated_at=now();

insert into public.recipes(content_id,meal_type,servings,ingredients,steps,allergens,nutrition,metadata)
select id,'lunch',2,
 '[{"name":"Massa seca","quantity":160,"unit":"g"},{"name":"Atum em conserva escorrido","quantity":1,"unit":"can"},{"name":"Tomate pelado ou passata","quantity":250,"unit":"g"},{"name":"Ervilhas","quantity":1,"unit":"cup"},{"name":"Cebola","quantity":0.5,"unit":"unit"},{"name":"Azeite e ervas","quantity":null,"unit":"to_taste"}]'::jsonb,
 '["Cozinhe a massa conforme a embalagem.","Refogue cebola e adicione tomate e ervilhas.","Junte o atum ao molho e aqueça.","Misture com a massa e finalize com ervas."]'::jsonb,
 array['gluten','fish'],null,
 '{"nutrition_status":"pending_fdc_mapping","substitutions":["Use massa sem glúten quando necessário.","Troque atum por grão-de-bico para uma versão sem peixe."],"storage":["Refrigere rapidamente se guardar e reaqueça completamente quando aplicável."]}'::jsonb
from public.content_items where slug='massa-atum-tomate-ervilhas'
on conflict(content_id) do update set ingredients=excluded.ingredients,steps=excluded.steps,allergens=excluded.allergens,metadata=excluded.metadata,updated_at=now();

insert into public.recipes(content_id,meal_type,servings,ingredients,steps,allergens,nutrition,metadata)
select id,'lunch',2,
 '[{"name":"Tofu firme","quantity":300,"unit":"g"},{"name":"Arroz cozido","quantity":2,"unit":"portion"},{"name":"Brócolis","quantity":2,"unit":"cup"},{"name":"Cenoura","quantity":1,"unit":"unit"},{"name":"Molho de soja","quantity":1,"unit":"tbsp"},{"name":"Gengibre, alho e óleo","quantity":null,"unit":"to_taste"}]'::jsonb,
 '["Seque o tofu e corte em cubos.","Doure o tofu numa frigideira.","Adicione cenoura e brócolis e cozinhe até a textura desejada.","Tempere com gengibre, alho e pequena quantidade de molho de soja.","Sirva sobre o arroz."]'::jsonb,
 array['soy'],null,
 '{"nutrition_status":"pending_fdc_mapping","substitutions":["Use tamari certificado sem glúten quando necessário.","Troque os vegetais conforme disponibilidade."],"storage":["Conserve refrigerado em recipiente fechado e reaqueça adequadamente."]}'::jsonb
from public.content_items where slug='tofu-arroz-brocolis'
on conflict(content_id) do update set ingredients=excluded.ingredients,steps=excluded.steps,allergens=excluded.allergens,metadata=excluded.metadata,updated_at=now();

insert into public.recipes(content_id,meal_type,servings,ingredients,steps,allergens,nutrition,metadata)
select id,'dinner',2,
 '[{"name":"Batatas médias","quantity":2,"unit":"unit"},{"name":"Cottage","quantity":160,"unit":"g"},{"name":"Folhas verdes","quantity":2,"unit":"handful"},{"name":"Tomate","quantity":1,"unit":"unit"},{"name":"Pepino","quantity":0.5,"unit":"unit"},{"name":"Azeite, limão e ervas","quantity":null,"unit":"to_taste"}]'::jsonb,
 '["Asse as batatas até ficarem macias por dentro.","Prepare a salada com folhas, tomate e pepino.","Abra as batatas e distribua o cottage.","Sirva com a salada e finalize com ervas."]'::jsonb,
 array['milk'],null,
 '{"nutrition_status":"pending_fdc_mapping","substitutions":["Troque cottage por tofu temperado ou outra opção compatível."],"storage":["Batatas cozidas devem ser refrigeradas se não forem consumidas logo após o preparo."]}'::jsonb
from public.content_items where slug='batata-assada-cottage-salada'
on conflict(content_id) do update set ingredients=excluded.ingredients,steps=excluded.steps,allergens=excluded.allergens,metadata=excluded.metadata,updated_at=now();

insert into public.recipes(content_id,meal_type,servings,ingredients,steps,allergens,nutrition,metadata)
select id,'snack',1,
 '[{"name":"Iogurte natural","quantity":170,"unit":"g"},{"name":"Fruta","quantity":1,"unit":"portion"},{"name":"Aveia em flocos","quantity":25,"unit":"g"},{"name":"Castanhas","quantity":15,"unit":"g"},{"name":"Canela","quantity":null,"unit":"to_taste"}]'::jsonb,
 '["Coloque o iogurte numa tigela.","Adicione fruta cortada e aveia.","Finalize com castanhas e canela."]'::jsonb,
 array['milk','tree_nuts'],null,
 '{"nutrition_status":"pending_fdc_mapping","substitutions":["Use iogurte sem lactose quando necessário.","Omitir castanhas em caso de alergia e substituir por outro ingrediente seguro."],"storage":["Monte próximo do consumo para melhor textura."]}'::jsonb
from public.content_items where slug='iogurte-fruta-aveia-castanhas'
on conflict(content_id) do update set ingredients=excluded.ingredients,steps=excluded.steps,allergens=excluded.allergens,metadata=excluded.metadata,updated_at=now();

insert into public.content_rights(
 content_id,rights_basis,copyright_holder,commercial_use_allowed,derivatives_allowed,
 redistribution_allowed,attribution_required,ai_retrieval_allowed,ai_derivative_generation_allowed,
 verification_status,verified_at,verified_by,notes,metadata
)
select id,'owned','MyTrainX',true,true,true,false,true,true,'verified',now(),'MyTrainX content governance',
 'Original MyTrainX culinary/editorial content. Ingredient nutrient calculations governed separately.',
 '{"brandable":true,"launch_batch":"kitchen_v2"}'::jsonb
from public.content_items
where slug in (
 'arroz-feijao-ovos-vegetais','panqueca-aveia-banana-ovo','sopa-lentilha-legumes',
 'wrap-frango-feijao-salada','massa-atum-tomate-ervilhas','tofu-arroz-brocolis',
 'batata-assada-cottage-salada','iogurte-fruta-aveia-castanhas'
)
on conflict(content_id) do update set
 rights_basis=excluded.rights_basis,copyright_holder=excluded.copyright_holder,
 commercial_use_allowed=excluded.commercial_use_allowed,derivatives_allowed=excluded.derivatives_allowed,
 redistribution_allowed=excluded.redistribution_allowed,attribution_required=excluded.attribution_required,
 ai_retrieval_allowed=excluded.ai_retrieval_allowed,ai_derivative_generation_allowed=excluded.ai_derivative_generation_allowed,
 verification_status=excluded.verification_status,verified_at=excluded.verified_at,verified_by=excluded.verified_by,
 notes=excluded.notes,metadata=excluded.metadata,updated_at=now();

insert into public.content_sources(content_id,provider,external_id,source_path,original_title,transcript_status,extraction_status,metadata)
select id,'generated','mytrainx:'||slug||':v1','mytrainx-data/content/recipes',title,'none','ready',
 '{"authorship":"MyTrainX Editorial 2026","source_kind":"owned_original","launch_batch":"kitchen_v2"}'::jsonb
from public.content_items
where slug in (
 'arroz-feijao-ovos-vegetais','panqueca-aveia-banana-ovo','sopa-lentilha-legumes',
 'wrap-frango-feijao-salada','massa-atum-tomate-ervilhas','tofu-arroz-brocolis',
 'batata-assada-cottage-salada','iogurte-fruta-aveia-castanhas'
)
on conflict(provider,external_id) do update set
 content_id=excluded.content_id,source_path=excluded.source_path,original_title=excluded.original_title,
 extraction_status=excluded.extraction_status,metadata=excluded.metadata,updated_at=now();

insert into public.content_reviews(content_id,review_type,status,review_version,notes,evidence_urls,metadata)
select ci.id,'nutrition','pending',1,
 'General culinary content is usable. Numeric nutrient values remain blocked until canonical ingredient/FoodData Central mapping and nutrition review.',
 array[]::text[],'{"gate":"nutrition_calculation","launch_batch":"kitchen_v2"}'::jsonb
from public.content_items ci
where ci.slug in (
 'arroz-feijao-ovos-vegetais','panqueca-aveia-banana-ovo','sopa-lentilha-legumes',
 'wrap-frango-feijao-salada','massa-atum-tomate-ervilhas','tofu-arroz-brocolis',
 'batata-assada-cottage-salada','iogurte-fruta-aveia-castanhas'
)
and not exists(
 select 1 from public.content_reviews cr
 where cr.content_id=ci.id and cr.review_type='nutrition' and cr.review_version=1
);
