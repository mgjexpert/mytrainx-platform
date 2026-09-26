-- Draft information architecture for the MyTrainX Digital Library.
-- These shelves are intentionally draft until real approved content is attached.

insert into public.content_collections (
  slug,title,description,collection_type,access_policy,status,sort_priority,metadata
) values
('library-start','Comece Aqui','Conteúdos essenciais para orientar novos membros dentro do ecossistema MyTrainX.','shelf','registered','draft',100,jsonb_build_object('domain','onboarding')),
('library-training','Treinos & Exercícios','Biblioteca de treino, técnica, força, condicionamento, HIIT, funcional e treino em casa.','shelf','registered','draft',90,jsonb_build_object('domain','training')),
('library-skills','Skills & Calistenia','Progressões técnicas de calistenia e habilidades como handstand, front lever, back lever e planche.','pathway','registered','draft',80,jsonb_build_object('domain','training','topic','calisthenics')),
('library-nutrition','Nutrição','Fundamentos de nutrição, macronutrientes, hidratação, planeamento alimentar e educação nutricional.','shelf','registered','draft',70,jsonb_build_object('domain','nutrition')),
('library-recipes','MyTrainX Kitchen','Receitas estruturadas, ingredientes, porções, informação nutricional e meal prep.','shelf','registered','draft',60,jsonb_build_object('domain','recipes')),
('library-wellness','Bem-estar & Hábitos','Conteúdos de hábitos, consistência, descanso, mindfulness e bem-estar.','shelf','registered','draft',50,jsonb_build_object('domain','wellness')),
('library-recovery','Recovery & Mobilidade','Mobilidade, recuperação e materiais complementares ao treino.','shelf','registered','draft',40,jsonb_build_object('domain','wellness','topic','recovery')),
('library-programs','Programas & Desafios','Programas estruturados, desafios e materiais associados aos produtos MyTrainX.','shelf','registered','draft',30,jsonb_build_object('domain','training','kind','programs')),
('library-guides','Guias & Ebooks','Ebooks, manuais, checklists e recursos educativos aprovados.','shelf','registered','draft',20,jsonb_build_object('domain','knowledge')),
('library-master','MyTrainX Master','Conteúdo premium recorrente disponível a membros MyTrainX Master.','shelf','master','draft',10,jsonb_build_object('domain','master'))
on conflict (slug) do nothing;
