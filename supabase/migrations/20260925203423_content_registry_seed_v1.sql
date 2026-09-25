-- MyTrainX initial taxonomy and source registry V1

alter table public.source_collections
  drop constraint if exists source_collections_default_rights_basis_check;
alter table public.source_collections
  add constraint source_collections_default_rights_basis_check
  check (default_rights_basis = any (array[
    'owned','commissioned','plr','public_domain','cc0','cc_by','cc_by_sa',
    'cc_by_nc_sa','cc_by_nd','odbl','ogl','licensed','reference_only','unknown'
  ]));

alter table public.content_rights
  drop constraint if exists content_rights_rights_basis_check;
alter table public.content_rights
  add constraint content_rights_rights_basis_check
  check (rights_basis = any (array[
    'owned','commissioned','plr','public_domain','cc0','cc_by','cc_by_sa',
    'cc_by_nc_sa','cc_by_nd','odbl','ogl','licensed','reference_only','unknown'
  ]));

insert into public.taxonomy_terms (slug,label,kind,description)
values
  ('training','Treino','domain','Conteúdo de treino e programação física.'),
  ('nutrition','Nutrição','domain','Conteúdo educativo de nutrição e alimentação.'),
  ('recipes','Receitas','domain','Receitas e preparação alimentar.'),
  ('wellness','Bem-estar','domain','Hábitos, recuperação, mobilidade e bem-estar.'),
  ('knowledge','Conhecimento','domain','Materiais didáticos e base de conhecimento.')
on conflict (slug) do nothing;

insert into public.taxonomy_terms (slug,label,kind,parent_id)
select v.slug,v.label,v.kind,p.id
from (values
  ('strength-training','Musculação e força','topic','training'),
  ('hypertrophy','Hipertrofia','topic','training'),
  ('conditioning','Condicionamento','topic','training'),
  ('hiit','HIIT','topic','training'),
  ('calisthenics','Calistenia','topic','training'),
  ('core-training','Core e abdómen','topic','training'),
  ('functional-training','Treino funcional','topic','training'),
  ('home-workout','Treino em casa','topic','training'),
  ('mobility','Mobilidade','topic','wellness'),
  ('yoga','Yoga','topic','wellness'),
  ('recovery','Recuperação','topic','wellness'),
  ('mindset','Mindset e consistência','topic','wellness'),
  ('nutrition-fundamentals','Fundamentos da nutrição','topic','nutrition'),
  ('macronutrients','Macronutrientes','topic','nutrition'),
  ('meal-planning','Planeamento alimentar','topic','nutrition'),
  ('hydration','Hidratação','topic','nutrition'),
  ('weight-management','Gestão de peso','topic','nutrition'),
  ('healthy-recipes','Receitas equilibradas','topic','recipes')
) as v(slug,label,kind,parent_slug)
join public.taxonomy_terms p on p.slug=v.parent_slug
on conflict (slug) do nothing;

insert into public.taxonomy_terms (slug,label,kind)
values
  ('muscle-gain','Ganho de massa','goal'),
  ('fat-loss','Redução de gordura','goal'),
  ('improve-conditioning','Melhorar condicionamento','goal'),
  ('improve-mobility','Melhorar mobilidade','goal'),
  ('learn-skill','Aprender habilidade','goal'),
  ('general-health','Saúde geral','goal'),
  ('consistency','Consistência','goal'),
  ('beginner','Iniciante','audience'),
  ('intermediate','Intermediário','audience'),
  ('advanced','Avançado','audience'),
  ('bodyweight','Peso corporal','equipment'),
  ('dumbbells','Halteres','equipment'),
  ('kettlebell','Kettlebell','equipment'),
  ('resistance-bands','Bandas elásticas','equipment'),
  ('gym-equipment','Equipamento de academia','equipment'),
  ('handstand','Handstand','skill'),
  ('planche','Planche','skill'),
  ('front-lever','Front Lever','skill'),
  ('back-lever','Back Lever','skill'),
  ('high-protein','Alto teor proteico','dietary'),
  ('vegetarian','Vegetariano','dietary'),
  ('gluten-free','Sem glúten','dietary'),
  ('medical-review-required','Revisão clínica obrigatória','safety'),
  ('scientific-review-required','Revisão científica obrigatória','safety'),
  ('rights-review-required','Revisão de direitos obrigatória','safety')
on conflict (slug) do nothing;

insert into public.source_collections (
  slug,name,provider,external_id,source_url,source_kind,relevance_status,
  default_rights_basis,rights_verification_status,ingestion_policy,ai_policy_default,domain_tags,status
) values
('drive-courses-initial','Drive inicial — cursos e programas','google_drive','1LE_S1d1bBUREVfHGCe7c4JUSLBR29Xak','https://drive.google.com/drive/folders/1LE_S1d1bBUREVfHGCe7c4JUSLBR29Xak','drive_folder','core','unknown','pending','metadata','none',array['training','nutrition','wellness'],'active'),
('drive-plr-library','Drive inicial — biblioteca PLR temática','google_drive','142RqTcC32roulyCBU7_Rhs6cFxmvnne8','https://drive.google.com/drive/folders/142RqTcC32roulyCBU7_Rhs6cFxmvnne8','drive_folder','core','unknown','pending','metadata','none',array['training','nutrition','recipes','wellness'],'active'),
('usda-fooddata-central','USDA FoodData Central','usda_fdc',null,'https://fdc.nal.usda.gov/','api','core','cc0','verified','full','retrievable',array['nutrition','foods','nutrients'],'active'),
('wrkout-exercises-json','wrkout/exercises.json','github','wrkout/exercises.json','https://github.com/wrkout/exercises.json','dataset','core','public_domain','pending','metadata','metadata_only',array['training','exercises'],'active'),
('open-food-facts','Open Food Facts','open_food_facts',null,'https://world.openfoodfacts.org/','api','adjacent','odbl','restricted','inventory_only','metadata_only',array['nutrition','packaged-foods'],'paused')
on conflict (slug) do nothing;

with root as (select id from public.source_collections where slug='drive-courses-initial')
insert into public.source_collections (
 parent_id,slug,name,provider,external_id,source_url,source_kind,relevance_status,
 default_rights_basis,rights_verification_status,ingestion_policy,ai_policy_default,domain_tags,status,metadata
)
select root.id,v.slug,v.name,'google_drive',v.external_id,v.url,'drive_folder',v.relevance,
       v.rights_basis,v.rights_status,'metadata','none',v.tags,v.status,
       jsonb_build_object('initial_inventory',true,'clinical_review_required',v.clinical_review)
from root
cross join (values
 ('mentes-ansiosas','Treinamento para Mentes Ansiosas - Dr. Marco Abud','1GKXhES0YDyXkPo2S_iIK4zNqlvVGE07U','https://drive.google.com/drive/folders/1GKXhES0YDyXkPo2S_iIK4zNqlvVGE07U','quarantine','reference_only','restricted',array['wellness','mindset'],'quarantined',true),
 ('segredos-definicao','Segredos da definição','1cW8O6zNfeBNTQ8XtPDcDLToz5Vny3ML_','https://drive.google.com/drive/folders/1cW8O6zNfeBNTQ8XtPDcDLToz5Vny3ML_','core','reference_only','restricted',array['training','nutrition'],'active',false),
 ('pompoarismo','Segredos do Pompoarismo','1HvouZSckTbwpLa_K7CyD6f7wgnzKQ0oo','https://drive.google.com/drive/folders/1HvouZSckTbwpLa_K7CyD6f7wgnzKQ0oo','excluded','reference_only','restricted',array['wellness'],'archived',true),
 ('vida-longa','Segredos Para Uma Vida Longa - Dr Victor Sorrentino','1wpwDomDIHHP4oIikpR-qT_YlYUaUQiLg','https://drive.google.com/drive/folders/1wpwDomDIHHP4oIikpR-qT_YlYUaUQiLg','quarantine','reference_only','restricted',array['wellness'],'quarantined',true),
 ('hipopressivo-stc-2021','Sistema de Transformacao Corporal Metodo Hipopressivo - STC 2021','1bO3KSCwvDMlefN1U_i8kbAk6KnLXb8ZY','https://drive.google.com/drive/folders/1bO3KSCwvDMlefN1U_i8kbAk6KnLXb8ZY','quarantine','reference_only','restricted',array['training','core'],'quarantined',true),
 ('summer-abs','SUMMER ABS','1UfPx-1bwuuQLEMO60JVYkl16vHeXg_BQ','https://drive.google.com/drive/folders/1UfPx-1bwuuQLEMO60JVYkl16vHeXg_BQ','core','reference_only','restricted',array['training','core'],'active',false),
 ('tecnica-brutalidade-2','Técnica com Brutalidade 2.0 - Fabrício Pacholok','1pidpAfc4ZNsKtKHxndf5ppR8twecgVSG','https://drive.google.com/drive/folders/1pidpAfc4ZNsKtKHxndf5ppR8twecgVSG','core','reference_only','restricted',array['training','strength'],'active',false),
 ('homeopatia','Terapeuta em Homeopatia - Marcelo Rigotti','1Gyal4o-zKoEq9PHp35wCNFmq73Lof4UF','https://drive.google.com/drive/folders/1Gyal4o-zKoEq9PHp35wCNFmq73Lof4UF','excluded','reference_only','restricted',array['wellness'],'quarantined',true),
 ('total-hiit','TOTAL HIIT - TIAGO PUGLIESI','1n69yLY8KhQx5ozse_EosYdLCLJG_P_hz','https://drive.google.com/drive/folders/1n69yLY8KhQx5ozse_EosYdLCLJG_P_hz','core','reference_only','restricted',array['training','hiit'],'active',false),
 ('treino-calistenia','Treino Calistenia','1_zds1wcaY9kxxHEmvLSYUxGJLbPC5oNu','https://drive.google.com/drive/folders/1_zds1wcaY9kxxHEmvLSYUxGJLbPC5oNu','core','reference_only','restricted',array['training','calisthenics'],'active',false),
 ('treino-evolution','Treino Evolution','1bDB3oBU9vgpuDb-2dujK0Wlidtw1euR1','https://drive.google.com/drive/folders/1bDB3oBU9vgpuDb-2dujK0Wlidtw1euR1','core','reference_only','restricted',array['training','strength'],'active',false),
 ('treino-fisico','Treino Físico -Italo Marsili- Tony Geremias','1HJvi2WeV0kkxHAOV0-S9qRwGQj4u7_dW','https://drive.google.com/drive/folders/1HJvi2WeV0kkxHAOV0-S9qRwGQj4u7_dW','core','reference_only','restricted',array['training'],'active',false),
 ('prana-yoga','TUTORIAIS PRÁNA YOGA','1UOrTJn-eYZJKVtpqrpvDPk3fgvmfuHnJ','https://drive.google.com/drive/folders/1UOrTJn-eYZJKVtpqrpvDPk3fgvmfuHnJ','adjacent','reference_only','restricted',array['wellness','yoga'],'active',false),
 ('universidade-maromba','Universidade Maromba','1yP3OZM3eQPHoU_wzietyXuHXLt2I592e','https://drive.google.com/drive/folders/1yP3OZM3eQPHoU_wzietyXuHXLt2I592e','core','reference_only','restricted',array['training','nutrition'],'active',true),
 ('barriga-negativa','Veronica Motta - Barriga Negativa','1DHjbAHyHf-M7TEMRGbpJmVl-g_kiksqb','https://drive.google.com/drive/folders/1DHjbAHyHf-M7TEMRGbpJmVl-g_kiksqb','quarantine','reference_only','restricted',array['training','weight-management'],'quarantined',true),
 ('vida-funcional','Vida Funcional - Andréa Santa Rosa e Márcio Garcia','1oEnLcgI8n5NftYWJi6JegNCotu2pjXaL','https://drive.google.com/drive/folders/1oEnLcgI8n5NftYWJi6JegNCotu2pjXaL','core','reference_only','restricted',array['nutrition','recipes','training'],'active',true),
 ('sem-gluten','Viva Melhor Sem Glúten','19NHLNzVIBaYD4AXAj0ZUaYDLbN3rYbvN','https://drive.google.com/drive/folders/19NHLNzVIBaYD4AXAj0ZUaYDLbN3rYbvN','quarantine','reference_only','restricted',array['nutrition'],'quarantined',true),
 ('viver-sem-diabetes','Viver sem Diabetes - Dayan Siebra','1b1T9rrUR__KiguPLvZ13Vsv0JETPXCMe','https://drive.google.com/drive/folders/1b1T9rrUR__KiguPLvZ13Vsv0JETPXCMe','quarantine','reference_only','restricted',array['nutrition','wellness'],'quarantined',true),
 ('wellness','Wellness Bem Estar e Saúde - Flavia Machioni','10HvEQzmxQMUHr_8htotJcahS560ZGVF3','https://drive.google.com/drive/folders/10HvEQzmxQMUHr_8htotJcahS560ZGVF3','core','reference_only','restricted',array['wellness','nutrition'],'active',false),
 ('wkt-militar-source','WKT MILITAR','1S_BCJ347SIjVQ0tHQcevJzoFQ518ZeUC','https://drive.google.com/drive/folders/1S_BCJ347SIjVQ0tHQcevJzoFQ518ZeUC','core','unknown','pending',array['training','wkt'],'active',false),
 ('xtreme','Xtreme','1hvT1MByUkWZ_WRDFar_e7n1tiHjXDGV3','https://drive.google.com/drive/folders/1hvT1MByUkWZ_WRDFar_e7n1tiHjXDGV3','core','reference_only','restricted',array['training','nutrition'],'active',false),
 ('xtreme-21','Xtreme 21','14gsX68KTmygs7WE1x9Pp0HThva6ui5X2','https://drive.google.com/drive/folders/14gsX68KTmygs7WE1x9Pp0HThva6ui5X2','core','reference_only','restricted',array['training','hiit'],'active',false),
 ('xtreme-bonus','XTREME BÔNUS','1Q7Ypi1afVwpirmsZl0Q5EGyEJdMA0DcT','https://drive.google.com/drive/folders/1Q7Ypi1afVwpirmsZl0Q5EGyEJdMA0DcT','core','reference_only','restricted',array['training','recovery','yoga'],'active',false),
 ('xtreme-light','XTREME LIGHT','1zdwVMgjpkZuaHNQs2t1wXAyiNwsJ3mf8','https://drive.google.com/drive/folders/1zdwVMgjpkZuaHNQs2t1wXAyiNwsJ3mf8','core','reference_only','restricted',array['training','beginner'],'active',false),
 ('gravidade-zero','GRAVIDADE_ZERO','19TzwXExvaXcRVkN39OhH9pw6eaplKtHE','https://drive.google.com/drive/folders/19TzwXExvaXcRVkN39OhH9pw6eaplKtHE','core','reference_only','restricted',array['training','calisthenics','skills'],'active',false),
 ('revalida-2023','Revalida 2023 - Estratégia','1DQQB6jeYgEXVpoKoCbxysP2WYyuYh-w8','https://drive.google.com/drive/folders/1DQQB6jeYgEXVpoKoCbxysP2WYyuYh-w8','excluded','reference_only','restricted',array['medical'],'archived',true),
 ('detox-7-dias','Detox de 7 Dias','1BT2QT-eNWi6qGEkG1hpzPEIa3GLjdKAh','https://drive.google.com/drive/folders/1BT2QT-eNWi6qGEkG1hpzPEIa3GLjdKAh','quarantine','reference_only','restricted',array['nutrition','weight-management'],'quarantined',true),
 ('emergencias-herlon','Emergências Herlon 2019','1g7I8B2wxAJ32GZaMo8tWEYvcEVsqjvG0','https://drive.google.com/drive/folders/1g7I8B2wxAJ32GZaMo8tWEYvcEVsqjvG0','excluded','reference_only','restricted',array['medical'],'archived',true),
 ('respire-melhor','Programa Respire Melhor - Cinco Produtora','1-VkqfjClS17tadNGm4WhNrCy0NQXjU8y','https://drive.google.com/drive/folders/1-VkqfjClS17tadNGm4WhNrCy0NQXjU8y','quarantine','reference_only','restricted',array['wellness','medical'],'quarantined',true),
 ('emagrecimento-acelerado-2','CURSO EMAGRECIMENTO ACELERADO 2','1z6da4SjbFNmUMvEqOv8g0tE7gFiqSUaz','https://drive.google.com/drive/folders/1z6da4SjbFNmUMvEqOv8g0tE7gFiqSUaz','quarantine','reference_only','restricted',array['nutrition','weight-management'],'quarantined',true),
 ('funcional-pablo','Funcional do Pablo','1_5gMzsBNiUbywYft-938AQACcwmCrwFe','https://drive.google.com/drive/folders/1_5gMzsBNiUbywYft-938AQACcwmCrwFe','core','reference_only','restricted',array['training','functional'],'active',false),
 ('smart-emagrecimento-2','Smart Emagrecimento 2','1wQGHuWCXWrZNfbSTBgBz2rvWQGDGTuAZ','https://drive.google.com/drive/folders/1wQGHuWCXWrZNfbSTBgBz2rvWQGDGTuAZ','core','reference_only','restricted',array['nutrition','recipes','weight-management'],'active',true)
) as v(slug,name,external_id,url,relevance,rights_basis,rights_status,tags,status,clinical_review)
on conflict (slug) do nothing;

with root as (select id from public.source_collections where slug='drive-plr-library')
insert into public.source_collections (
 parent_id,slug,name,provider,external_id,source_url,source_kind,relevance_status,
 default_rights_basis,rights_verification_status,ingestion_policy,ai_policy_default,domain_tags,status,metadata
)
select root.id,v.slug,v.name,'google_drive',v.external_id,v.url,'archive',v.relevance,
       v.rights_basis,v.rights_status,'metadata','none',v.tags,'active',
       jsonb_build_object('initial_inventory',true,'verify_each_package_license',true,'size_bytes',v.size_bytes)
from root
cross join (values
 ('plr-saude-bem-estar','Saúde e Bem Estar-20220330T022710Z-001.zip','1vB1h-N_osUmw2G1KFjws8DdPFpWqHMZf','https://drive.google.com/file/d/1vB1h-N_osUmw2G1KFjws8DdPFpWqHMZf/view?usp=drivesdk','core','plr','pending',array['wellness','nutrition'],1780403334::bigint),
 ('plr-mindset','Mindset-20220330T021905Z-001.zip','1dGdOldHgeSvB0dM5NFFO09k2Eaf7uFv8','https://drive.google.com/file/d/1dGdOldHgeSvB0dM5NFFO09k2Eaf7uFv8/view?usp=drivesdk','adjacent','plr','pending',array['wellness','mindset'],222292655::bigint),
 ('plr-musculacao','Musculação-20220330T021951Z-001.zip','1sdpiybXQZLfEBEsrCwoN2qygkOAtMDJo','https://drive.google.com/file/d/1sdpiybXQZLfEBEsrCwoN2qygkOAtMDJo/view?usp=drivesdk','core','plr','pending',array['training','strength'],173363357::bigint),
 ('plr-culinaria','Culinária-20220330T020827Z-001.zip','1ZAHI5u7VqYuYGay71Z4NU5AbnZvX_Mmd','https://drive.google.com/file/d/1ZAHI5u7VqYuYGay71Z4NU5AbnZvX_Mmd/view?usp=drivesdk','core','plr','pending',array['recipes','nutrition'],51637868::bigint),
 ('plr-alimentacao-dieta','Alimentação e Dieta-20220330T020000Z-001.zip','1G8cEgUdWDYKgjHLXIJ-ELmZn2VOcewOC','https://drive.google.com/file/d/1G8cEgUdWDYKgjHLXIJ-ELmZn2VOcewOC/view?usp=drivesdk','core','plr','pending',array['nutrition','recipes'],185116099::bigint)
) as v(slug,name,external_id,url,relevance,rights_basis,rights_status,tags,size_bytes)
on conflict (slug) do nothing;
