-- Ingest owned MyTrainX foundation ebooks as section-based knowledge chunks.

-- treino-de-forca-sem-complicacao-v1
update public.knowledge_documents kd
set status='ready',
    extraction_method='github_markdown_section_v1',
    char_count=10883,
    token_estimate=2721,
    metadata = kd.metadata || jsonb_build_object(
      'source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md',
      'review_gate','exercise',
      'chunks_ready',true,
      'retrieval_blocked_until_review',true,
      'ingested_at','2026-09-26'
    ),
    updated_at=now()
from public.content_items ci
where kd.content_id=ci.id and ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,0,'Fundamentos MyTrainX 2026 para ficar mais forte, construir músculo e treinar de forma sustentável','**MyTrainX Editorial 2026**
**Edition:** 1.0
**Language:** pt-BR
**Format:** Web-first ebook + branded PDF
**Rights:** MyTrainX original
**Review status:** Editorial V1 complete / exercise-professional review required before final commercial release
**Evidence anchor:** ACSM 2026 resistance training position stand
**Brand export:** follow `docs/WATERMARK-BRANDING-STANDARD.md`',95,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','Fundamentos MyTrainX 2026 para ficar mais forte, construir músculo e treinar de forma sustentável'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,1,'Introdução — a indústria complicou o que precisava ser praticável','O treino de força funciona quando existe:
- estímulo adequado;
- repetição;
- progressão;
- recuperação;
- tempo.

Em 2026, o American College of Sports Medicine publicou sua primeira grande atualização de recomendações de treino de resistência desde 2009. A revisão sintetizou 137 revisões sistemáticas, com dados de mais de 30 mil participantes.

Uma das mensagens mais importantes é simples:

**consistência vence complexidade desnecessária.**

Isso não significa que programação avançada não tenha valor.

Significa que, para a maioria dos adultos saudáveis, fazer um programa razoável de maneira consistente costuma importar mais do que discutir detalhes que impedem a pessoa de começar.',173,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','Introdução — a indústria complicou o que precisava ser praticável'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,2,'1. O que é treino de força','Treino de resistência é qualquer atividade em que músculos trabalham contra resistência.

Pode usar:
- peso corporal;
- halteres;
- barras;
- máquinas;
- bandas;
- kettlebells;
- cabos;
- objetos externos.

O equipamento é uma ferramenta.

O programa é o sistema.',66,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','1. O que é treino de força'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,3,'Core / carregar / estabilizar','- dead bug;
- pranchas;
- carries;
- exercícios anti-rotação.

O Exercise Encyclopedia MyTrainX organiza centenas de movimentos dentro dessas relações.',38,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','Core / carregar / estabilizar'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,4,'Força','O ACSM 2026 aponta cargas mais altas como especialmente relevantes para maximizar força.

Isso não significa que iniciantes devam começar testando limites.

Primeiro:
- técnica;
- tolerância;
- consistência.',52,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','Força'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,5,'Hipertrofia','Volume semanal passa a ter papel importante.

A síntese ACSM usa aproximadamente 10 séries por grupo muscular por semana como referência prática para otimizar hipertrofia em muitos contextos — não como número obrigatório para toda pessoa.',60,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','Hipertrofia'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,6,'Potência','Potência envolve produzir força rapidamente.

A programação usa carga apropriada e intenção de mover a fase concêntrica rapidamente.',33,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','Potência'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,7,'4. Séries e repetições','Repetições são uma forma de organizar trabalho.

Não existe um intervalo mágico que invalida todos os outros.

Faixas diferentes podem ser úteis conforme:
- carga;
- exercício;
- objetivo;
- nível;
- proximidade da falha;
- tolerância.

Para um iniciante, o mais importante é escolher um intervalo que permita:
- técnica consistente;
- esforço suficiente;
- progressão mensurável.',95,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','4. Séries e repetições'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,8,'RIR','Repetitions in Reserve.

RIR 2 significa que você estima ter aproximadamente duas repetições possíveis antes da falha técnica/voluntária.',35,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','RIR'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,9,'Regra MyTrainX','Na maioria das sessões gerais, deixe margem suficiente para manter técnica e recuperação coerentes com o programa.

Treino até a falha pode ser ferramenta, não ritual obrigatório.',45,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','Regra MyTrainX'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,10,'6. Progressão','Progressive overload é frequentemente reduzido a “mais peso”.

Na prática, você pode progredir com:
- carga;
- repetições;
- séries;
- amplitude;
- controle;
- menor assistência;
- variação mais difícil;
- densidade de trabalho;
- melhor técnica.',62,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','6. Progressão'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,11,'Progressão dupla','Exemplo:
3 séries de 8–12 repetições.

Quando você consegue realizar 12 repetições nas séries planejadas com técnica e esforço apropriados, aumenta levemente a carga e volta a uma faixa inferior.

É simples, mensurável e útil.',57,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','Progressão dupla'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,12,'7. Frequência','Frequência é quantas vezes um músculo, movimento ou sessão aparece na semana.

Para muitas pessoas, treinar grandes grupos musculares mais de uma vez por semana facilita distribuir volume.

Mas frequência não precisa virar dogma.

O melhor arranjo depende de:
- agenda;
- recuperação;
- volume;
- preferência;
- programa.',81,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','7. Frequência'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,13,'8. Descanso entre séries','Descansar não é perder tempo.

Descanso permite produzir força e manter qualidade.

Exercícios pesados e compostos normalmente exigem mais recuperação entre séries que movimentos leves ou acessórios.

Se a próxima série degrada apenas porque o cronômetro disse para começar, o intervalo pode estar inadequado ao objetivo.',81,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','8. Descanso entre séries'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,14,'9. Máquinas ou pesos livres?','Ambos podem funcionar.

Máquinas oferecem:
- estabilidade;
- simplicidade;
- facilidade de isolar determinados movimentos.

Pesos livres oferecem:
- grande variedade;
- liberdade de trajetória;
- demandas de estabilidade em diferentes contextos.

A atualização ACSM de 2026 não encontrou uma superioridade universal de um tipo de equipamento para todos os resultados do praticante médio.

Escolha ferramentas que:
- estejam disponíveis;
- possam ser usadas com segurança;
- permitam progressão;
- combinem com o objetivo.',131,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','9. Máquinas ou pesos livres?'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,15,'10. Amplitude de movimento','Maior amplitude não é automaticamente melhor se ela não pode ser controlada.

A amplitude útil depende de:
- exercício;
- articulação;
- estrutura individual;
- mobilidade;
- carga;
- objetivo;
- conforto.

Busque uma amplitude:
- controlável;
- progressiva;
- compatível com sua anatomia e treinamento.

Dor aguda não é meta de amplitude.',85,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','10. Amplitude de movimento'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,16,'11. Técnica','Técnica não é uma única fotografia perfeita.

Existe uma faixa de soluções de movimento adequadas.

Ao avaliar técnica, observe:
- controle;
- estabilidade;
- trajetória;
- capacidade de produzir esforço;
- repetibilidade;
- sintomas.

O MyTrainX deve evitar transformar pequenas diferenças individuais em “erro fatal”.',80,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','11. Técnica'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,17,'12. Aquecimento','Um bom aquecimento prepara para o que vem depois.

Pode incluir:
1. aumento leve de temperatura;
2. movimentos relacionados à sessão;
3. séries de aproximação do exercício principal.

Você não precisa gastar 30 minutos em mobilidades aleatórias antes de cada treino.

Aquecimento deve facilitar o treino, não substituir o treino.',83,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','12. Aquecimento'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,18,'13. Treinar em casa','Seu músculo não conhece o CEP da academia.

Treino em casa funciona quando existe resistência e progressão suficientes.

Ferramentas:
- peso corporal;
- bandas;
- halteres;
- mochila;
- kettlebell;
- móveis realmente seguros como apoio.

O ACSM 2026 reconhece que treino domiciliar, com peso corporal ou elásticos, pode produzir benefícios importantes.',88,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','13. Treinar em casa'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,19,'14. Falha muscular','Falha pode ser útil em determinados exercícios e contextos.

Mas não é obrigatória para todo set.

Treinar sempre até a falha pode:
- aumentar fadiga;
- piorar técnica;
- aumentar tempo de recuperação.

A pergunta correta não é “falha funciona?”

É:

> “Qual quantidade de esforço permite o estímulo que queremos com o custo de fadiga que conseguimos recuperar?”',91,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','14. Falha muscular'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,20,'15. Volume','Volume descreve quanto trabalho você faz.

Pode ser representado por:
- séries;
- repetições;
- carga total;
- séries por grupo muscular.

Mais volume pode ajudar hipertrofia até certo ponto.

Depois, o benefício marginal diminui e a recuperação pode piorar.

Comece com o volume mínimo capaz de gerar progresso e aumente quando houver motivo.',86,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','15. Volume'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,21,'16. Deload','Deload é uma redução planejada de estresse de treino.

Pode reduzir:
- volume;
- carga;
- proximidade da falha;
- complexidade.

Nem toda pessoa precisa de deload numa frequência fixa.

Use quando:
- fadiga se acumula;
- performance cai;
- o bloco de treino terminou;
- o programa pede uma transição.',75,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','16. Deload'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,22,'17. Dor e desconforto','Treino pode produzir:
- esforço;
- queima muscular;
- fadiga;
- soreness posterior.

Isso é diferente de qualquer dor que precisa ser ignorada.

Dor aguda, sintomas neurológicos, trauma ou sinais preocupantes merecem interrupção e avaliação apropriada.

Coach X não diagnostica lesões.

Ele pode:
- sugerir regressão geral;
- reduzir carga;
- orientar a procurar avaliação quando necessário.',98,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','17. Dor e desconforto'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,23,'Opção A — 3 dias full body','### Dia A
- squat
- horizontal push
- horizontal pull
- hinge
- core

### Dia B
- lunge
- vertical push
- vertical pull
- hip extension
- carry

### Dia C
- squat variation
- push variation
- row
- hinge variation
- core',55,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','Opção A — 3 dias full body'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,24,'Opção B — 4 dias upper/lower','### Lower 1
Squat + hinge + unilateral + calf + core

### Upper 1
Push + row + vertical pull + shoulders + arms

### Lower 2
Hinge + squat variation + unilateral + calf + core

### Upper 2
Press + pull + row + shoulders + arms

Não é uma prescrição universal.
É um mapa de organização.',72,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','Opção B — 4 dias upper/lower'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,25,'19. O algoritmo humano de progressão','Antes de aumentar dificuldade, responda:

1. Completei o trabalho planejado?
2. A técnica permaneceu adequada?
3. O esforço ficou dentro da meta?
4. Recuperei para a próxima sessão?
5. Tenho dados suficientes ou estou reagindo a um único treino?

Se sim, escolha **uma** pequena progressão.

Se não:
- mantenha;
- reduza;
- ajuste exercício;
- recupere.

Progresso não exige heroísmo.',96,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','19. O algoritmo humano de progressão'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,26,'20. O papel do Coach X','Coach X deve unir:
- programa;
- histórico;
- exercícios;
- progresso;
- disponibilidade;
- equipamento;
- feedback semanal.

Em vez de simplesmente gerar “um treino diferente”, deve responder:

> Qual é a próxima sessão mais coerente com o que esta pessoa está tentando construir?

Essa é a diferença entre IA geradora de rotinas e um sistema de treino com memória e contexto.',95,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','20. O papel do Coach X'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,27,'Fontes-base 2026','- American College of Sports Medicine. Resistance Training Prescription for Muscle Function, Hypertrophy, and Physical Performance in Healthy Adults: An Overview of Reviews. 2026.
- ACSM. Resistance Training Guidelines Update — March 2026.
- World Health Organization. Physical activity guidance.',74,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','Fontes-base 2026'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,28,'Nota de segurança','Conteúdo educacional para adultos saudáveis em contexto geral. Pessoas com doença, gravidez, lesão, sintomas preocupantes ou restrições específicas devem obter orientação profissional apropriada.',49,
       jsonb_build_object('source_path','content/ebooks/TREINO-DE-FORCA-SEM-COMPLICACAO-V1.md','section','Nota de segurança'),
       jsonb_build_object('rights_basis','owned','review_gate','exercise','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='treino-de-forca-sem-complicacao-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;

-- nutricao-sem-ruido-v1
update public.knowledge_documents kd
set status='ready',
    extraction_method='github_markdown_section_v1',
    char_count=13975,
    token_estimate=3494,
    metadata = kd.metadata || jsonb_build_object(
      'source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md',
      'review_gate','nutrition',
      'chunks_ready',true,
      'retrieval_blocked_until_review',true,
      'ingested_at','2026-09-26'
    ),
    updated_at=now()
from public.content_items ci
where kd.content_id=ci.id and ci.slug='nutricao-sem-ruido-v1' and kd.version=1;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,0,'Fundamentos MyTrainX para comer melhor sem transformar a vida numa planilha','**MyTrainX Editorial 2026**
**Edition:** 1.0
**Language:** pt-BR
**Format:** Web-first ebook + branded PDF
**Rights:** MyTrainX original
**Review status:** Editorial V1 complete / qualified nutrition review required before final commercial release
**Brand export:** follow `docs/WATERMARK-BRANDING-STANDARD.md`',78,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','Fundamentos MyTrainX para comer melhor sem transformar a vida numa planilha'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,1,'Direção visual','BLACK PERFORMANCE SYSTEM + MYTRAINX ORANGE.

A estética deve fugir completamente do ebook PLR tradicional:
- capa preta/carvão;
- fotografia culinária realista e limpa;
- tipografia editorial premium;
- boxes Coach X;
- gráficos simples;
- páginas claras para leitura longa;
- footer `© MyTrainX • mytrainx.fit • v1.0`;
- watermark discreto nas páginas de download quando aplicável.',96,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','Direção visual'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,2,'Introdução — comida não precisa virar ruído','Nutrição ficou complicada porque muita gente ganhou dinheiro tornando-a complicada.

Um alimento é promovido como solução. Outro vira vilão. Uma estratégia que funciona para uma pessoa é transformada em regra universal. O contexto some e sobra uma lista infinita de proibições.

O MyTrainX segue outro caminho.

A Organização Mundial da Saúde resume uma alimentação saudável em quatro ideias amplas: **adequação, equilíbrio, moderação e diversidade**. O Guia Alimentar para a População Brasileira acrescenta uma perspectiva especialmente útil: alimentação não é apenas uma soma de nutrientes; envolve alimentos, preparações, cultura, tempo, ambiente e convivência.

Este material ensina fundamentos para decisões cotidianas. Não substitui acompanhamento nutricional individual quando existe condição clínica, necessidade específica, transtorno alimentar, gravidez ou outra situação que exija cuidado profissional.',229,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','Introdução — comida não precisa virar ruído'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,3,'1. Antes de macros: construa uma base','Uma alimentação sólida precisa funcionar no mundo real.

Isso significa considerar:
- orçamento;
- disponibilidade;
- cultura;
- tempo;
- habilidades culinárias;
- preferências;
- rotina de treino;
- fome;
- praticidade.

Um plano nutricional perfeito que ninguém consegue repetir não é um bom sistema.',76,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','1. Antes de macros: construa uma base'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,4,'O princípio MyTrainX','Comece organizando refeições que tenham:
- uma fonte relevante de proteína;
- alimentos vegetais variados;
- uma fonte de energia adequada ao contexto;
- gorduras em quantidade compatível com a refeição;
- água e hidratação ao longo do dia.

Não é uma fórmula clínica. É uma estrutura para pensar.',75,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','O princípio MyTrainX'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,5,'2. Energia: o conceito sem terrorismo','Seu corpo usa energia para:
- manter funções vitais;
- mover-se;
- digerir;
- treinar;
- recuperar;
- construir e renovar tecidos.

A energia entra principalmente pela alimentação.

Mudanças sustentadas no peso corporal envolvem o balanço entre energia consumida e energia utilizada ao longo do tempo. Isso é um princípio fisiológico, mas não significa que comportamento alimentar possa ser reduzido a “força de vontade” ou que todas as calorias produzam a mesma experiência de saciedade, prazer, praticidade e densidade nutricional.',134,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','2. Energia: o conceito sem terrorismo'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,6,'Quando calorias são úteis','Contagem pode ser ferramenta para algumas pessoas e desnecessária para outras.

Pode ajudar:
- a aprender porções;
- a investigar um platô;
- a estruturar um objetivo esportivo.

Pode atrapalhar:
- quando vira obsessão;
- quando elimina flexibilidade;
- quando incentiva compensações;
- quando substitui sinais de fome/saciedade sem necessidade.

O MyTrainX não exige contagem para participar da plataforma.',102,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','Quando calorias são úteis'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,7,'3. Proteína','Proteínas fornecem aminoácidos usados em inúmeros processos corporais e na manutenção de tecidos.

Para quem treina, é útil pensar em duas perguntas:

1. Tenho fontes de proteína ao longo do dia?
2. Minha alimentação total é adequada ao meu objetivo?

Fontes podem incluir:
- ovos;
- leite, iogurte e queijos;
- carnes, aves e peixes;
- feijões, lentilhas, ervilhas e grão-de-bico;
- soja, tofu e derivados;
- combinações de alimentos conforme preferência e cultura.',117,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','3. Proteína'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,8,'Não transforme proteína em competição','Mais não é automaticamente melhor.

Necessidades variam com:
- peso corporal;
- treinamento;
- objetivo;
- ingestão energética;
- idade;
- contexto clínico.

Prescrições individualizadas ficam fora do escopo de um ebook geral.',57,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','Não transforme proteína em competição'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,9,'4. Carboidratos','Carboidratos são uma fonte importante de energia, especialmente em atividades de maior intensidade.

Boas fontes dentro de diferentes padrões alimentares podem incluir:
- arroz;
- feijão e outras leguminosas;
- aveia;
- batata e mandioca;
- frutas;
- milho;
- pães e massas;
- outros cereais.

O objetivo não é classificar carboidratos como “bons” ou “ruins” de forma absoluta.

Importam:
- quantidade;
- contexto;
- grau de processamento;
- frequência;
- composição da refeição;
- necessidade de energia.

Uma pessoa que treina intensamente pode usar carboidratos de forma diferente de alguém sedentário. Isso não transforma o nutriente em obrigatório ou proibido.',167,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','4. Carboidratos'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,10,'5. Gorduras','Gorduras:
- fornecem energia;
- fazem parte de membranas celulares;
- participam da absorção de vitaminas;
- contribuem para sabor e saciedade.

Fontes culinárias incluem:
- azeite e outros óleos;
- castanhas;
- sementes;
- abacate;
- peixes;
- ovos;
- laticínios e carnes em diferentes quantidades.

A recomendação prática não é “evitar gordura”. É construir um padrão alimentar equilibrado e evitar que alimentos com grande densidade energética entrem automaticamente em quantidades maiores do que o contexto pede.',129,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','5. Gorduras'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,11,'6. Fibras e alimentos vegetais','Frutas, verduras, legumes, cereais integrais e leguminosas ajudam a aumentar:
- variedade alimentar;
- fibras;
- micronutrientes;
- volume e textura das refeições.

Você não precisa comer “superalimentos”.

Feijão, arroz, frutas locais, ovos, verduras, aveia, mandioca e dezenas de alimentos comuns podem formar uma excelente base.

O Guia Alimentar brasileiro é especialmente forte nesse ponto: ele valoriza alimentos in natura ou minimamente processados, preparações culinárias e padrões alimentares culturalmente reais.',131,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','6. Fibras e alimentos vegetais'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,12,'7. Processamento sem extremismo','O grau de processamento é uma lente útil para analisar o padrão alimentar.

Mas uma boa educação nutricional não precisa produzir pânico.

O objetivo é aumentar o espaço ocupado por:
- alimentos in natura;
- minimamente processados;
- preparações culinárias.

E reduzir a dependência de produtos ultraprocessados quando eles dominam a alimentação.

Isso não exige uma identidade de “comedor perfeito”.

Uma alimentação precisa funcionar em:
- viagens;
- festas;
- trabalho;
- restaurantes;
- dias cansativos.

O padrão importa mais que um alimento isolado.',139,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','7. Processamento sem extremismo'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,13,'8. Como montar uma refeição sem pesar tudo','Use quatro perguntas:

### 1. Onde está a proteína?
Escolha uma fonte compatível com sua preferência.

### 2. Onde estão os vegetais ou frutas?
Não precisam aparecer em todas as refeições da mesma forma, mas variedade ao longo do dia e da semana é útil.

### 3. Qual é a fonte de energia?
Arroz, batata, massa, pão, fruta, aveia ou outra opção adequada ao momento.

### 4. Esta refeição é repetível?
Uma refeição que leva 90 minutos para preparar talvez não resolva a rotina de terça-feira.

> **COACH X TIP**
> A melhor refeição não é a que parece perfeita numa fotografia. É a que resolve sua necessidade e cabe no sistema alimentar que você consegue sustentar.',166,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','8. Como montar uma refeição sem pesar tudo'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,14,'9. Hidratação','Necessidade de líquidos varia com:
- clima;
- suor;
- atividade;
- alimentação;
- tamanho corporal;
- condições individuais.

Água continua sendo a base.

Em treino prolongado, calor intenso ou situações específicas, eletrólitos e estratégias adicionais podem ser úteis, mas não devem ser tratados como obrigatórios para qualquer sessão.

Sinais como sede, contexto ambiental e padrão urinário podem ajudar a perceber a rotina, mas não substituem avaliação clínica quando existe problema de hidratação ou doença.',128,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','9. Hidratação'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,15,'10. Antes do treino','A refeição pré-treino tem uma função simples: permitir que você treine bem sem criar desconforto desnecessário.

O timing e o tamanho dependem de:
- horário;
- tolerância gastrointestinal;
- tipo de treino;
- duração;
- última refeição.

Exemplos práticos podem combinar carboidrato com alguma proteína:
- iogurte + fruta + aveia;
- pão + ovos;
- arroz + feijão + proteína numa refeição mais distante do treino;
- fruta e iogurte numa opção menor.

Não existe um alimento pré-treino universal.',124,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','10. Antes do treino'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,16,'11. Depois do treino','Pós-treino não é uma janela de minutos que fecha.

Uma refeição normal com:
- proteína;
- energia suficiente;
- líquidos;
- alimentos variados

já resolve boa parte das necessidades de quem treina recreativamente.

Para atletas ou volumes de treino elevados, timing e reposição podem ganhar maior importância e merecem orientação específica.',86,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','11. Depois do treino'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,17,'Sistema de bases','Prepare:
- 2 fontes de proteína;
- 2 fontes de carboidrato;
- 3 vegetais;
- 1–2 molhos/temperos;
- frutas e snacks simples.

Em vez de produzir sete pratos totalmente diferentes, combine bases.

Exemplo:
- frango + arroz + legumes;
- frango + batata + salada;
- grão-de-bico + arroz + vegetais;
- omelete + salada + pão.

Isso é **Meal Prep MyTrainX**.',88,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','Sistema de bases'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,18,'13. Supermercado','Uma lista funcional pode ser dividida em:

### Proteínas
ovos, frango, peixe, carnes, iogurte, queijo, tofu, feijões.

### Vegetais e frutas
opções da estação e do orçamento.

### Fontes de energia
arroz, aveia, batata, mandioca, pães, massas, outros cereais.

### Gorduras e complementos
azeite, castanhas, sementes, abacate conforme preferência.

### Sabor
ervas, especiarias, alho, cebola, limão, molhos preparados conscientemente.

Comprar melhor começa muito antes de abrir um aplicativo de calorias.',127,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','13. Supermercado'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,19,'14. Comer fora','A regra não é “estraguei a dieta”.

Uma refeição fora pode ser apenas uma refeição fora.

Estratégias:
- observe fome real antes de escolher;
- priorize alimentos que gosta;
- procure uma fonte de proteína quando fizer sentido;
- inclua vegetais se disponíveis;
- pare quando estiver confortavelmente satisfeito;
- retome sua rotina na próxima refeição.

Evite compensar com jejum extremo ou treino punitivo.',102,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','14. Comer fora'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,20,'15. Weight management sem promessas aceleradas','Materiais antigos frequentemente usam:
- “metabolismo acelerado”;
- “secar rápido”;
- “detox”;
- “alimentos que queimam gordura”.

O MyTrainX não utiliza esse enquadramento.

Mudança de peso sustentável depende de uma combinação de:
- ingestão energética;
- comportamento;
- ambiente;
- atividade física;
- sono e rotina;
- aderência.

Quando redução de peso é um objetivo escolhido, o caminho deve preservar:
- alimentação suficiente;
- qualidade nutricional;
- capacidade de treinar;
- sustentabilidade.

Velocidade não é a única métrica de sucesso.',138,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','15. Weight management sem promessas aceleradas'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,21,'16. Fome, saciedade e ambiente','Decisões alimentares não acontecem no vácuo.

É mais difícil escolher algo adequado quando:
- você ficou horas sem comer e está extremamente faminto;
- não há comida pronta;
- todas as opções visíveis são altamente palatáveis e imediatas;
- o dia está caótico.

Por isso, organização do ambiente pode ser mais útil que depender de disciplina infinita.

Exemplos:
- deixar frutas visíveis;
- ter proteína prática disponível;
- congelar porções;
- carregar um snack;
- planejar duas refeições críticas do dia.',127,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','16. Fome, saciedade e ambiente'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,22,'17. Suplementos','Suplemento não corrige automaticamente:
- falta de sono;
- treino mal programado;
- alimentação inadequada;
- baixa consistência.

Antes de comprar:
1. Qual problema estou tentando resolver?
2. Existe evidência relevante?
3. A dose do produto corresponde ao que foi estudado?
4. Há risco de contaminação ou interação?
5. Eu realmente preciso disso?

Produtos com alegações terapêuticas, estimulantes fortes ou substâncias de risco exigem cautela adicional.',114,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','17. Suplementos'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,23,'18. Creatina sem hype','Creatina é um dos suplementos mais estudados no contexto de desempenho e treinamento de força.

Mas isso não significa:
- que todos precisam usar;
- que substitui treino;
- que qualquer produto é igual;
- que uma dose individual deva ser prescrita por um ebook geral.

O conteúdo MyTrainX sobre creatina deve:
- explicar a evidência;
- diferenciar desempenho de marketing;
- abordar segurança dentro do escopo apropriado;
- orientar procura profissional quando houver condição clínica.',122,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','18. Creatina sem hype'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,24,'19. O que significa “comer bem” no MyTrainX','Não significa:
- nunca comer sobremesa;
- pesar tudo;
- cortar grupos alimentares sem motivo;
- cozinhar receitas fitness o dia inteiro;
- ter medo de restaurantes.

Significa construir uma alimentação:
- adequada;
- equilibrada;
- moderada;
- diversa;
- segura;
- culturalmente possível;
- sustentável.',76,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','19. O que significa “comer bem” no MyTrainX'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,25,'20. Plano prático de 7 dias','Não é detox.

É um **reset de rotina**.

### Dia 1
Organize água e horários.

### Dia 2
Monte uma lista de compras.

### Dia 3
Prepare duas bases de proteína.

### Dia 4
Aumente variedade de vegetais/frutas.

### Dia 5
Planeje uma refeição para o dia mais difícil.

### Dia 6
Cozinhe uma receita nova da MyTrainX Kitchen.

### Dia 7
Revise:
- o que facilitou;
- o que atrapalhou;
- o que você consegue repetir.

Na semana seguinte, repita o que funcionou.',114,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','20. Plano prático de 7 dias'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,26,'Fontes-base 2026','- World Health Organization. Healthy diet. Atualizado em 26 Jan 2026.
- Ministério da Saúde. Guia Alimentar para a População Brasileira. 2ª edição; reimpressões registradas em 2026.
- Ministério da Saúde. Guias Alimentares.
- USDA Agricultural Research Service. FoodData Central — fonte canônica de composição nutricional para cálculos MyTrainX, quando aplicável.',91,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','Fontes-base 2026'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,27,'Nota profissional','Conteúdo geral de educação nutricional. Pessoas com condições clínicas, gestação, alergias complexas, transtornos alimentares ou necessidades terapêuticas devem procurar profissional habilitado.',49,
       jsonb_build_object('source_path','content/ebooks/NUTRICAO-SEM-RUIDO-V1.md','section','Nota profissional'),
       jsonb_build_object('rights_basis','owned','review_gate','nutrition','retrieval_blocked_until_review',true)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='nutricao-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
  heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
  locator=excluded.locator,metadata=excluded.metadata;
