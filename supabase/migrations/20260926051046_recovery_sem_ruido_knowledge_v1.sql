
-- Recovery sem Ruído V1 — owned MyTrainX ebook + review-gated knowledge document.

insert into public.content_items(
  slug,title,subtitle,content_type,language,summary,tags,topics,access_policy,
  ai_index_policy,status,version,reading_time_minutes,downloadable,featured,metadata
)
values(
  'recovery-sem-ruido-v1',
  'Recovery sem Ruído',
  'Sono, fadiga e recuperação sem transformar cada dia ruim num problema',
  'ebook_pdf','pt-BR',
  'Guia MyTrainX para interpretar sono, energia, soreness, stress, aderência e recuperação sem pseudo-precisão.',
  array['recuperacao','sono','stress','aderencia','check-in'],
  array['wellness','recovery','training'],
  'registered','metadata_only','needs_ingestion',1,28,true,true,
  '{"rights_basis":"owned","source_path":"content/ebooks/RECOVERY-SEM-RUIDO-V1.md","review_gate":"scientific","knowledge_layer":"KB-PUBLISHABLE","retrieval_blocked_until_review":true}'::jsonb
)
on conflict(slug) do update set
 title=excluded.title,subtitle=excluded.subtitle,summary=excluded.summary,tags=excluded.tags,
 topics=excluded.topics,access_policy=excluded.access_policy,ai_index_policy=excluded.ai_index_policy,
 status=excluded.status,reading_time_minutes=excluded.reading_time_minutes,downloadable=excluded.downloadable,
 featured=excluded.featured,metadata=public.content_items.metadata || excluded.metadata,updated_at=now();

insert into public.content_rights(
 content_id,rights_basis,copyright_holder,commercial_use_allowed,derivatives_allowed,
 redistribution_allowed,attribution_required,ai_retrieval_allowed,ai_derivative_generation_allowed,
 verification_status,verified_at,verified_by,notes,metadata
)
select id,'owned','MyTrainX',true,true,true,false,true,true,'verified',now(),'MyTrainX content governance',
 'Original MyTrainX editorial work. Scientific review gate applies before commercial final PDF/retrieval activation.',
 '{"brandable":true,"source_path":"content/ebooks/RECOVERY-SEM-RUIDO-V1.md"}'::jsonb
from public.content_items where slug='recovery-sem-ruido-v1'
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
select id,'github','mytrainx-data:content/ebooks/RECOVERY-SEM-RUIDO-V1.md',
 'content/ebooks/RECOVERY-SEM-RUIDO-V1.md','Recovery sem Ruído','none','ready',
 '{"repository":"mgjexpert/mytrainx-data","branch":"feat/library-registry-v1","authorship":"MyTrainX Editorial 2026"}'::jsonb
from public.content_items where slug='recovery-sem-ruido-v1'
on conflict(provider,external_id) do update set
 content_id=excluded.content_id,source_path=excluded.source_path,original_title=excluded.original_title,
 extraction_status=excluded.extraction_status,metadata=excluded.metadata,updated_at=now();

insert into public.content_reviews(content_id,review_type,status,review_version,notes,evidence_urls,metadata)
select ci.id,'scientific','pending',1,
 'Review sleep/recovery language, clinical escalation boundaries and source freshness before enabling retrieval or final commercial PDF.',
 array[
  'https://www.cdc.gov/sleep/about/',
  'https://www.cdc.gov/nchs/products/databriefs/db559.htm',
  'https://acsm.org/education-resources/pronouncements-scientific-communications/position-stands/'
 ]::text[],
 '{"gate":"scientific","retrieval_blocked_until_review":true}'::jsonb
from public.content_items ci
where ci.slug='recovery-sem-ruido-v1'
and not exists(
 select 1 from public.content_reviews cr
 where cr.content_id=ci.id and cr.review_type='scientific' and cr.review_version=1
);

insert into public.knowledge_documents(
 content_id,source_id,version,status,extraction_method,source_checksum,language,
 char_count,token_estimate,metadata
)
select ci.id,cs.id,1,'ready','github_markdown_section_v1','698ffe048f53e0200b50024aaf43d501f8a5ae1b','pt-BR',
 10620,2655,
 '{"source_path":"content/ebooks/RECOVERY-SEM-RUIDO-V1.md","review_gate":"scientific","chunks_ready":true,"retrieval_blocked_until_review":true}'::jsonb
from public.content_items ci
join public.content_sources cs on cs.content_id=ci.id
where ci.slug='recovery-sem-ruido-v1' and cs.external_id='mytrainx-data:content/ebooks/RECOVERY-SEM-RUIDO-V1.md'
on conflict(content_id,source_id,version) do update set
 status=excluded.status,extraction_method=excluded.extraction_method,source_checksum=excluded.source_checksum,
 char_count=excluded.char_count,token_estimate=excluded.token_estimate,
 metadata=excluded.metadata,updated_at=now();

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,0,'Sono, fadiga e recuperação sem transformar cada dia ruim num problema','**MyTrainX Editorial 2026**  
**Edition:** 1.0  
**Language:** pt-BR  
**Format:** Web-first ebook + branded PDF  
**Rights:** MyTrainX original  
**Review status:** Editorial complete / scientific review pending  
**Knowledge gate:** scientific  
**Brand export:** follow `docs/WATERMARK-BRANDING-STANDARD.md`',78,
 jsonb_build_object('source_path','content/ebooks/RECOVERY-SEM-RUIDO-V1.md','section','Sono, fadiga e recuperação sem transformar cada dia ruim num problema'),
 '{"rights_basis":"owned","review_gate":"scientific","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='recovery-sem-ruido-v1' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,1,'Antes de começar','Recuperação não é um botão que fica verde ou vermelho.

Uma noite ruim não destrói o treino. Um dia cansado não prova excesso de treino. Soreness não mede automaticamente a qualidade da sessão. Dormir bem ajuda, mas recuperação também envolve alimentação, stress, rotina, carga de treino, contexto profissional e espaço para repetir o plano.

O MyTrainX usa recuperação para responder perguntas práticas:

- Estou conseguindo sustentar o programa?
- Estou dormindo o suficiente com regularidade?
- Minha energia está consistentemente pior?
- A soreness está diminuindo entre as sessões?
- O stress da vida está mudando a forma como tolero o treino?
- Estou completando o que planejei?
- Preciso reduzir o treino ou apenas tive dois dias difíceis?

O objetivo não é vigiar cada sensação. É reconhecer padrões úteis.',204,
 jsonb_build_object('source_path','content/ebooks/RECOVERY-SEM-RUIDO-V1.md','section','Antes de começar'),
 '{"rights_basis":"owned","review_gate":"scientific","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='recovery-sem-ruido-v1' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,2,'1. Recuperação é capacidade de repetir','O teste mais útil de recuperação não acontece necessariamente de manhã.

A pergunta central é:

> Consigo repetir treino, trabalho e vida com qualidade suficiente ao longo das semanas?

Recuperação adequada tende a permitir que você:
- volte ao treino;
- mantenha ou desenvolva performance;
- tolere o volume planejado;
- durma de forma razoavelmente estável;
- mantenha motivação compatível com a rotina;
- execute tarefas normais sem sentir que o programa domina sua vida.

Isso não significa sentir-se perfeito todos os dias.

Programas sustentáveis convivem com variação.',144,
 jsonb_build_object('source_path','content/ebooks/RECOVERY-SEM-RUIDO-V1.md','section','1. Recuperação é capacidade de repetir'),
 '{"rights_basis":"owned","review_gate":"scientific","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='recovery-sem-ruido-v1' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,3,'2. Sono: suficiente antes de perfeito','Para adultos, recomendações amplamente utilizadas colocam **7 horas ou mais por noite regularmente** como um ponto importante para saúde e funcionamento diurno. Necessidade individual varia, e duração não é a única dimensão: qualidade, regularidade e timing também importam.

O MyTrainX não deve transformar isso numa competição de sono.

Se alguém registra 6h40 numa noite, a App não precisa emitir um alerta dramático.

Mais útil é observar:
- padrão semanal;
- horário aproximado;
- dificuldade persistente para adormecer;
- despertares frequentes;
- sensação ao acordar;
- impacto diurno.

Problemas de sono persistentes, ronco importante com pausas respiratórias observadas, sonolência excessiva ou insônia prolongada merecem avaliação profissional.',189,
 jsonb_build_object('source_path','content/ebooks/RECOVERY-SEM-RUIDO-V1.md','section','2. Sono: suficiente antes de perfeito'),
 '{"rights_basis":"owned","review_gate":"scientific","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='recovery-sem-ruido-v1' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,4,'3. Uma noite ruim não exige um programa novo','Imagine:

**Segunda:** dormiu bem.  
**Terça:** reunião até tarde.  
**Quarta:** 5h30 de sono e treino marcado.

A decisão não precisa ser automaticamente:
- cancelar tudo;
- fazer exatamente o mesmo custe o que custar;
- redesenhar quatro semanas de treino.

Pode existir uma terceira via:

- fazer aquecimento;
- avaliar como se sente;
- reduzir uma série;
- usar carga um pouco menor;
- manter técnica e sair.

A ideia MyTrainX é **autorregulação simples**, não improvisação caótica.',122,
 jsonb_build_object('source_path','content/ebooks/RECOVERY-SEM-RUIDO-V1.md','section','3. Uma noite ruim não exige um programa novo'),
 '{"rights_basis":"owned","review_gate":"scientific","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='recovery-sem-ruido-v1' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,5,'4. Soreness não é nota do treino','Dor muscular tardia pode aparecer depois de:
- exercício novo;
- aumento de volume;
- maior amplitude;
- retorno após pausa;
- estímulo ao qual você não estava habituado.

Mas:

**mais soreness ≠ mais resultado**

e

**zero soreness ≠ treino inútil**

Se a dor muscular é leve e o movimento normal, muitas pessoas conseguem treinar normalmente ou com ajustes.

Se existe:
- dor aguda;
- dor articular significativa;
- inchaço relevante;
- perda importante de função;
- trauma;
- sintomas que pioram;

isso deixa de ser uma conversa genérica sobre “recuperação de treino” e merece outra abordagem.',149,
 jsonb_build_object('source_path','content/ebooks/RECOVERY-SEM-RUIDO-V1.md','section','4. Soreness não é nota do treino'),
 '{"rights_basis":"owned","review_gate":"scientific","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='recovery-sem-ruido-v1' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,6,'5. Fadiga não tem uma única origem','Cansaço pode refletir:
- treino;
- pouco sono;
- stress;
- viagem;
- alimentação insuficiente;
- calor;
- trabalho;
- doença;
- ciclo de rotina;
- acúmulo de responsabilidades.

Por isso, Coach X não deve dizer:

> “Você está em overtraining.”

porque o utilizador marcou energia 2/5 durante uma semana.

O sistema precisa primeiro procurar contexto.',88,
 jsonb_build_object('source_path','content/ebooks/RECOVERY-SEM-RUIDO-V1.md','section','5. Fadiga não tem uma única origem'),
 '{"rights_basis":"owned","review_gate":"scientific","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='recovery-sem-ruido-v1' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,7,'6. O check-in semanal MyTrainX','O check-in não pretende diagnosticar.

Ele cria memória longitudinal.

Campos centrais:
- energia;
- qualidade do sono;
- soreness;
- stress;
- motivação;
- consistência alimentar;
- horas médias de sono, se o utilizador quiser;
- treinos planejados;
- treinos concluídos;
- notas.

Uma leitura isolada vale pouco.

Quatro semanas contam uma história muito melhor.

### Exemplo

Semana 1:
- energia 4;
- sono 4;
- stress 2;
- 3/3 treinos.

Semana 2:
- energia 3;
- sono 3;
- stress 4;
- 3/3 treinos.

Semana 3:
- energia 2;
- sono 2;
- stress 5;
- 2/3 treinos.

Semana 4:
- energia 2;
- sono 2;
- stress 5;
- 1/3 treino.

Agora existe um padrão que merece conversa.

Ainda não existe diagnóstico.',174,
 jsonb_build_object('source_path','content/ebooks/RECOVERY-SEM-RUIDO-V1.md','section','6. O check-in semanal MyTrainX'),
 '{"rights_basis":"owned","review_gate":"scientific","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='recovery-sem-ruido-v1' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,8,'7. Aderência é parte da recuperação','Um programa pode estar “ótimo no papel” e inadequado na vida real.

Se o utilizador planeja cinco sessões e completa duas por quatro semanas, perguntar apenas “como aumentar motivação?” pode ser a pergunta errada.

Talvez seja necessário:
- reduzir frequência;
- encurtar sessões;
- criar uma versão mínima;
- reorganizar dias;
- ajustar volume;
- simplificar escolhas.

Recuperação inclui **capacidade logística de sustentar o plano**.',109,
 jsonb_build_object('source_path','content/ebooks/RECOVERY-SEM-RUIDO-V1.md','section','7. Aderência é parte da recuperação'),
 '{"rights_basis":"owned","review_gate":"scientific","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='recovery-sem-ruido-v1' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,9,'8. Treino mínimo também é treino','Nem toda sessão precisa ser a sessão ideal.

MyTrainX pode trabalhar com três versões:

### Plano A — completo
Sessão planejada quando tempo e energia estão normais.

### Plano B — reduzido
Menos volume, mesmos movimentos principais.

### Plano C — mínimo
Uma dose pequena o suficiente para manter a rotina em semanas difíceis.

Isto não significa treinar doente, lesionado ou ignorar sintomas.

Significa evitar o pensamento:

> “Ou faço 100%, ou não conta.”',115,
 jsonb_build_object('source_path','content/ebooks/RECOVERY-SEM-RUIDO-V1.md','section','8. Treino mínimo também é treino'),
 '{"rights_basis":"owned","review_gate":"scientific","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='recovery-sem-ruido-v1' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,10,'9. Quando reduzir volume faz sentido','Ajustar temporariamente pode ser razoável quando existe um conjunto consistente de sinais:

- queda de performance durante várias sessões;
- energia persistentemente baixa;
- recuperação entre sessões pior que o habitual;
- sono claramente pior;
- stress externo elevado;
- aderência deteriorando;
- sensação de que cada treino exige esforço desproporcional.

Um ajuste simples pode ser:
- reduzir séries por alguns dias;
- manter exercícios e técnica;
- usar cargas moderadas;
- aumentar intervalo entre sessões difíceis.

Depois se reavalia.

A redução não precisa virar um evento dramático.',149,
 jsonb_build_object('source_path','content/ebooks/RECOVERY-SEM-RUIDO-V1.md','section','9. Quando reduzir volume faz sentido'),
 '{"rights_basis":"owned","review_gate":"scientific","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='recovery-sem-ruido-v1' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,11,'10. Deload sem religião','“Deload” é uma redução planejada da exigência do treino.

Pode envolver:
- menos volume;
- menor carga;
- menor esforço;
- combinação dessas opções.

Nem toda pessoa precisa de deload em calendário fixo.

Algumas respondem melhor a ajustes conforme:
- programa;
- nível;
- volume;
- proximidade de competições;
- stress total;
- histórico individual.

O MyTrainX deve evitar regras universais do tipo:

> “A cada quatro semanas é obrigatório.”',111,
 jsonb_build_object('source_path','content/ebooks/RECOVERY-SEM-RUIDO-V1.md','section','10. Deload sem religião'),
 '{"rights_basis":"owned","review_gate":"scientific","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='recovery-sem-ruido-v1' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,12,'11. O que Coach X pode fazer','Coach X pode juntar:

**treino**
- frequência;
- conclusão;
- volume planejado;
- performance;

**check-in**
- sono;
- energia;
- soreness;
- stress;
- motivação;

**contexto**
- viagem;
- mudança de rotina;
- dias de trabalho mais longos;
- preferência do utilizador.

E responder:

> “As duas últimas semanas tiveram stress mais alto, sono pior e duas sessões não concluídas. Antes de mudar o programa inteiro, podemos reduzir o volume desta semana e manter os principais movimentos. Depois revemos.”

Isto é muito diferente de:

> “Você está em overtraining.”',141,
 jsonb_build_object('source_path','content/ebooks/RECOVERY-SEM-RUIDO-V1.md','section','11. O que Coach X pode fazer'),
 '{"rights_basis":"owned","review_gate":"scientific","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='recovery-sem-ruido-v1' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,13,'12. Quando o Coach X deve sair do caminho','A IA não deve tentar resolver tudo.

Encaminhar para profissional adequado quando houver, por exemplo:
- dor intensa ou progressiva;
- trauma;
- perda importante de função;
- falta de ar inexplicada;
- dor no peito;
- desmaio;
- sintomas neurológicos;
- febre ou doença aguda relevante;
- alteração persistente e inexplicada de energia;
- problema importante ou persistente de sono;
- preocupação significativa do utilizador com alimentação, peso ou comportamento compulsivo.

MyTrainX é uma plataforma de treino e educação.

Não é um substituto para avaliação clínica.',143,
 jsonb_build_object('source_path','content/ebooks/RECOVERY-SEM-RUIDO-V1.md','section','12. Quando o Coach X deve sair do caminho'),
 '{"rights_basis":"owned","review_gate":"scientific","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='recovery-sem-ruido-v1' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,14,'13. Protocolo semanal de 3 minutos','### Passo 1 — O que aconteceu?
Registre:
- treinos planejados/concluídos;
- sono;
- energia;
- soreness;
- stress.

### Passo 2 — Existe tendência?
Compare com as últimas semanas.

### Passo 3 — O que mudou fora do treino?
Trabalho? Viagem? Horário? Alimentação? Doença? Rotina?

### Passo 4 — Qual é o menor ajuste útil?
- nada;
- mudar um dia;
- reduzir uma série;
- baixar carga;
- fazer versão mínima;
- descansar.

### Passo 5 — Marque nova revisão
Não avalie eternamente a mesma semana.',123,
 jsonb_build_object('source_path','content/ebooks/RECOVERY-SEM-RUIDO-V1.md','section','13. Protocolo semanal de 3 minutos'),
 '{"rights_basis":"owned","review_gate":"scientific","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='recovery-sem-ruido-v1' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,15,'14. Recovery Score? Com cuidado','É tentador condensar tudo num número:

**Recovery = 82/100**

O problema é que uma aparência de precisão pode esconder escolhas arbitrárias.

Se criarmos um score no futuro, ele deve:
- mostrar os componentes;
- permitir entender por que mudou;
- não ser diagnóstico;
- não bloquear treino automaticamente;
- não ser usado como verdade absoluta;
- respeitar preferências do utilizador.

No V1, MyTrainX ganha mais mostrando contexto do que fingindo precisão.',115,
 jsonb_build_object('source_path','content/ebooks/RECOVERY-SEM-RUIDO-V1.md','section','14. Recovery Score? Com cuidado'),
 '{"rights_basis":"owned","review_gate":"scientific","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='recovery-sem-ruido-v1' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,16,'15. A regra MyTrainX','**Não ajuste um programa por ruído.  
Não ignore um padrão só porque um dia isolado parece normal.**

Colete pouco.
Compare semanas.
Procure contexto.
Faça o menor ajuste útil.
Volte a observar.',49,
 jsonb_build_object('source_path','content/ebooks/RECOVERY-SEM-RUIDO-V1.md','section','15. A regra MyTrainX'),
 '{"rights_basis":"owned","review_gate":"scientific","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='recovery-sem-ruido-v1' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,17,'Fontes-base','- American Academy of Sleep Medicine / Sleep Research Society. Recommended Amount of Sleep for a Healthy Adult: adults should sleep 7 or more hours per night on a regular basis.
- CDC. About Sleep; Short Sleep Duration and Sleep Difficulties Among Adults: United States, 2024. NCHS Data Brief 559, 2026.
- American College of Sports Medicine. Resistance Training Prescription for Muscle Function, Hypertrophy, and Physical Performance in Healthy Adults, 2026.
- American College of Sports Medicine. Load, Overload, and Recovery in the Athlete: Select Issues for the Team Physician.',146,
 jsonb_build_object('source_path','content/ebooks/RECOVERY-SEM-RUIDO-V1.md','section','Fontes-base'),
 '{"rights_basis":"owned","review_gate":"scientific","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='recovery-sem-ruido-v1' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,18,'Nota de segurança','Conteúdo educacional geral. Não substitui avaliação, diagnóstico ou tratamento. Sintomas relevantes, persistentes, inexplicados ou associados a lesão/doença devem ser avaliados por profissional habilitado.',52,
 jsonb_build_object('source_path','content/ebooks/RECOVERY-SEM-RUIDO-V1.md','section','Nota de segurança'),
 '{"rights_basis":"owned","review_gate":"scientific","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='recovery-sem-ruido-v1' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;

insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,19,'Próximo passo','Abra o **Check-in Semanal** no MyTrainX.

Registre o mínimo necessário e deixe o sistema procurar tendências ao longo do tempo.

**Recuperação não precisa de drama. Precisa de contexto.**',47,
 jsonb_build_object('source_path','content/ebooks/RECOVERY-SEM-RUIDO-V1.md','section','Próximo passo'),
 '{"rights_basis":"owned","review_gate":"scientific","retrieval_blocked_until_review":true}'::jsonb
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='recovery-sem-ruido-v1' and kd.version=1
on conflict(document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
