-- Full section-based ingestion for MyTrainX Progress sem Ruído V1.
update public.knowledge_documents kd
set status='ready',
    extraction_method='github_markdown_section_v2',
    char_count=13814,
    token_estimate=3454,
    metadata=kd.metadata || jsonb_build_object(
      'source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','review_gate','scientific','chunks_ready',true,
      'retrieval_blocked_until_review',true,'section_parser_version',2,'ingested_at','2026-09-26'
    ),
    updated_at=now()
from public.content_items ci
where kd.content_id=ci.id and ci.slug='progress-sem-ruido-v1' and kd.version=1;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,0,'O guia MyTrainX para acompanhar evolução sem ser enganado por um único número','**MyTrainX Editorial 2026**
**Edition:** 1.0
**Language:** pt-BR
**Format:** Web-first ebook + branded PDF
**Rights:** MyTrainX original
**Review status:** Editorial complete / exercise-science review pending for final commercial PDF
**Brand export:** follow `docs/WATERMARK-BRANDING-STANDARD.md`',74,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','O guia MyTrainX para acompanhar evolução sem ser enganado por um único número'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,1,'Capa / direção visual','BLACK PERFORMANCE SYSTEM + MYTRAINX ORANGE.

Hero concept:
- fundo preto/carvão;
- gráfico de tendência sutil;
- fotografia atlética não-transformacional;
- título branco;
- “SEM RUÍDO” em laranja;
- selo discreto “MYTRAINX PROGRESS / 2026”;
- footer: `© MyTrainX • mytrainx.fit • v1.0`.',72,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','Capa / direção visual'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,2,'Antes de começar','A evolução física raramente acontece em linha reta.

Seu peso pode subir numa manhã e descer na outra. A cintura pode mudar lentamente enquanto a força cresce. Uma fotografia pode parecer dramaticamente diferente por causa da luz. Uma balança inteligente pode mostrar “massa muscular” com uma casa decimal mesmo quando o método usado para estimá-la possui uma margem de erro muito maior do que essa aparência de precisão sugere.

Este guia existe para separar **sinal** de **ruído**.

O objetivo do MyTrainX Progress não é vigiar o corpo. É reunir informação suficiente para responder melhor a perguntas úteis:

- Estou conseguindo treinar com consistência?
- Minha força ou capacidade de trabalho está melhorando?
- Meu peso está seguindo uma tendência coerente com o objetivo que escolhi?
- Minhas medidas estão mudando?
- Minha recuperação está sustentando o programa?
- Estou comparando dados obtidos de forma parecida?
- Preciso realmente mudar algo ou apenas continuar?

Nenhuma métrica é obrigatória. Se acompanhar peso, medidas ou fotografias piora sua relação com o corpo ou a alimentação, reduza a frequência, desative a função ou procure orientação adequada.',293,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','Antes de começar'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,3,'1. Progresso é um sistema, não um número','A primeira armadilha do acompanhamento é escolher uma única medida e tratá-la como verdade absoluta.

Peso não é composição corporal.
Composição corporal não é performance.
Performance não é saúde completa.
Uma fotografia não mede gordura.
Uma semana perfeita não prova que um programa é sustentável.

O MyTrainX organiza progresso em cinco famílias:

### 1. Consistência
Quantas sessões você planejou? Quantas completou? Conseguiu retornar depois de uma semana difícil?

### 2. Performance
Você executa o mesmo movimento com mais controle? Faz mais repetições? Usa uma variação mais difícil? Tolera melhor o treino?

### 3. Corpo
Peso, circunferências e estimativas de composição podem ser úteis quando realmente ajudam a acompanhar seu objetivo.

### 4. Recuperação
Sono, energia, soreness, stress e motivação ajudam a explicar por que duas semanas com o mesmo programa podem parecer completamente diferentes.

### 5. Experiência
A rotina cabe na sua vida? Você consegue repeti-la? O programa está ajudando a construir autonomia?

A melhor leitura quase sempre aparece **na combinação**.

> **COACH X TIP**
> Antes de perguntar “por que meu peso não mudou?”, pergunte “o que mais mudou nas últimas quatro semanas?”',304,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','1. Progresso é um sistema, não um número'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,4,'2. O que a balança realmente mede','Uma balança comum mede massa naquele instante.

Ela não separa automaticamente:
- água;
- gordura;
- músculo;
- glicogênio;
- alimento e líquidos ainda no sistema gastrointestinal;
- variações transitórias de conteúdo corporal.

Por isso, pequenas mudanças de um dia para o outro podem não representar ganho ou perda real de gordura.',84,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','2. O que a balança realmente mede'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,5,'Pense em tendência','Se você decide pesar-se com frequência, uma leitura ganha mais significado quando faz parte de uma sequência.

Um exemplo:

**Segunda:** 82,1 kg  
**Terça:** 81,6 kg  
**Quarta:** 82,0 kg  
**Quinta:** 81,8 kg  
**Sexta:** 81,7 kg  

Perguntar “por que subi 400 g na quarta?” normalmente é menos útil do que observar o comportamento da média ao longo de semanas comparáveis.',94,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','Pense em tendência'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,6,'Quando medir','Não existe obrigação universal de pesagem diária.

Você pode escolher:
- não acompanhar peso;
- pesar-se ocasionalmente;
- usar uma medição semanal;
- registrar diariamente e observar apenas tendência.

A frequência certa é aquela que produz informação útil sem criar comportamento compulsivo.',74,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','Quando medir'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,7,'Checklist MyTrainX','1. Use a mesma balança.
2. Coloque-a sobre superfície estável.
3. Prefira horários semelhantes.
4. Use condições de roupa semelhantes.
5. Evite interpretar uma leitura excepcional depois de viagem, grande alteração de ingestão, desidratação ou outro contexto diferente como se fosse equivalente à rotina.
6. Registre, não julgue.
7. Revise tendência em janelas equivalentes.

Você não precisa transformar a manhã num laboratório.

Precisamos de **consistência suficiente**, não perfeição.',122,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','Checklist MyTrainX'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,8,'4. Cintura e outras medidas','Circunferências podem adicionar contexto quando o peso não conta toda a história.

Mas existe um problema simples: medir em locais diferentes produz números diferentes.',42,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','4. Cintura e outras medidas'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,9,'Cintura','O protocolo de referência da Organização Mundial da Saúde utiliza o ponto médio entre a última costela palpável e a parte superior da crista ilíaca.

A fita:
- fica horizontal;
- encosta no corpo;
- não comprime a pele;
- é lida ao final de uma expiração normal.

O MyTrainX permite armazenar outras circunferências, mas o princípio é o mesmo: **registre o protocolo e tente repeti-lo**.',97,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','Cintura'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,10,'Não transforme centímetros em competição','Uma fita é uma ferramenta de observação.

Não há valor em apertá-la mais para “melhorar” o resultado ou escolher um ponto diferente porque o número parece mais favorável. Isso destrói justamente a informação que você estava tentando criar.',60,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','Não transforme centímetros em competição'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,11,'5. BIA, smart scale e a ilusão da casa decimal','Muitas balanças inteligentes apresentam:
- gordura corporal;
- massa magra;
- massa muscular;
- água;
- massa óssea;
- “idade metabólica” e outras métricas.

Algumas são úteis como **estimativas**. O problema aparece quando o utilizador interpreta a interface como se cada valor tivesse sido medido diretamente.',78,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','5. BIA, smart scale e a ilusão da casa decimal'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,12,'Como funciona a BIA','Bioimpedância elétrica mede como uma pequena corrente elétrica atravessa o corpo. A partir dessa medição e de equações proprietárias ou publicadas, o sistema estima diferentes compartimentos corporais.

Portanto:

**impedância = medição**
  
**“massa muscular = 34,7 kg” = estimativa derivada**

Uma revisão sistemática publicada em 2026 comparando BIA com um modelo corporal de quatro compartimentos encontrou limitações importantes na concordância individual para gordura e massa livre de gordura.

Isso não torna a balança inútil.

Significa apenas que devemos usá-la de forma intelectualmente honesta.',152,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','Como funciona a BIA'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,13,'Regra MyTrainX para composição corporal','Sempre armazenamos:
- valor;
- data;
- método;
- dispositivo/origem quando conhecido;
- qualidade aproximada do método.

E priorizamos:

**mesmo método + condições semelhantes + tendência**

em vez de:

**comparar números absolutos de equipamentos diferentes.**',66,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','Regra MyTrainX para composição corporal'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,14,'6. “Massa muscular” na App','O MyTrainX pode armazenar a estimativa de massa muscular fornecida por:
- smart scale;
- equipamento BIA profissional;
- DXA ou outro método;
- integração futura com dispositivo autorizado.

Mas a App não deve dizer:

> “Você ganhou exatamente 1,2 kg de músculo.”

apenas porque duas leituras de uma balança BIA diferem em 1,2 kg.

Uma apresentação melhor é:

> “Sua estimativa de massa muscular neste dispositivo está acima da medição anterior. Como BIA varia com condições de medição, observe a tendência junto com força, medidas e outras semanas.”

Esse tipo de linguagem é menos espetacular — e muito mais útil.',154,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','6. “Massa muscular” na App'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,15,'7. Fotos de evolução','Uma fotografia pode ser uma excelente memória visual.

Também pode ser uma excelente máquina de produzir conclusões erradas.

Mude:
- a luz;
- a distância;
- a lente;
- a postura;
- a contração;
- o ângulo;
- a roupa;

e você pode parecer diferente em minutos.',65,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','7. Fotos de evolução'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,16,'Protocolo MyTrainX','Se quiser comparar fotos:

### Posição
- frente;
- lado;
- costas.

### Ambiente
- mesmo local quando possível;
- distância semelhante;
- câmera em altura semelhante;
- iluminação parecida.

### Corpo
- postura natural;
- evite deliberadamente contrair em uma data e relaxar em outra;
- use roupa semelhante apenas se isso for confortável.

### Frequência
Semanal pode funcionar para algumas pessoas, mas quinzenal ou mensal muitas vezes oferece uma comparação visual mais significativa.',122,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','Protocolo MyTrainX'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,17,'Privacidade','Fotos de progresso no MyTrainX são projetadas como **conteúdo privado**.

Elas:
- não ficam em URL pública;
- usam Storage privado;
- exigem autorização do utilizador;
- são apresentadas através de links temporários;
- não são automaticamente enviadas ao Coach X;
- não habilitam análise por IA sem opt-in.',77,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','Privacidade'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,18,'8. IA não é um scanner corporal mágico','Modelos de visão conseguem descrever elementos de uma imagem e, em alguns contextos, sistemas específicos tentam estimar composição corporal.

Isso não autoriza o MyTrainX a transformar uma selfie em “18,4% de gordura corporal” e apresentar isso como medição.

Existem diferenças entre:
- uma ferramenta de pesquisa validada para um protocolo específico;
- uma aplicação comercial;
- uma fotografia casual;
- uma estimativa de modelo generativo.

No MyTrainX, a primeira função da fotografia é **documentação visual privada**.

Uma futura função de IA pode ajudar em observações descritivas — por exemplo, comparar enquadramento ou lembrar que a iluminação está diferente — mas não deve diagnosticar nem fingir precisão biométrica que a imagem não fornece.',189,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','8. IA não é um scanner corporal mágico'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,19,'9. Performance: a métrica que muita gente esquece','Imagine duas pessoas com o mesmo peso corporal por oito semanas.

A primeira:
- não consegue manter o plano;
- dorme pior;
- perdeu força.

A segunda:
- passou de 5 para 10 flexões;
- aumentou a carga no goblet squat;
- completou 85% dos treinos;
- sente-se com mais energia;
- reduziu cintura.

A balança pode dizer “sem mudança”.

O sistema completo diz outra coisa.',92,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','9. Performance: a métrica que muita gente esquece'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,20,'Métricas de performance futuras no MyTrainX','- cargas;
- repetições;
- séries;
- volume;
- dificuldade da variação;
- tempo ou distância;
- repetições técnicas;
- recordes pessoais;
- consistência por programa.

O objetivo é evitar que o progresso físico seja reduzido ao que cabe num visor de balança.',65,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','Métricas de performance futuras no MyTrainX'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,21,'10. O check-in semanal','Dados objetivos ajudam. Contexto também.

O check-in MyTrainX acompanha:
- energia;
- qualidade do sono;
- soreness;
- stress;
- motivação;
- consistência alimentar;
- treinos planejados;
- treinos concluídos;
- observações.

Cada item é simples.

A utilidade aparece na sequência.

Uma semana de stress alto não significa que o programa esteja errado. Quatro semanas de recuperação ruim enquanto o volume continua crescendo merecem atenção.

O Coach X deve usar esses dados como contexto para conversar — não como gatilho automático para conclusões clínicas.',140,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','10. O check-in semanal'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,22,'11. Platô ou apenas uma semana comum?','Antes de declarar um platô, verifique:

- Quanto tempo passou?
- A métrica é suficientemente estável para comparação?
- O protocolo de medição mudou?
- O treino foi realmente realizado?
- A recuperação foi semelhante?
- O objetivo continua o mesmo?
- Há progresso em outra dimensão?

Uma semana raramente é suficiente para redefinir todo o plano.

O sistema MyTrainX deve favorecer ajustes pequenos, testáveis e reversíveis em vez de respostas dramáticas a ruído.',116,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','11. Platô ou apenas uma semana comum?'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,23,'Semana 1 — Baseline','Escolha apenas as métricas que têm utilidade.

Sugestão:
- sessões planejadas;
- peso, se relevante;
- cintura, se relevante;
- 1 set de fotos, se desejar;
- check-in semanal.',44,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','Semana 1 — Baseline'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,24,'Semana 4 — Revisão','Faça uma revisão com Coach X:

1. O que eu queria melhorar?
2. Quais dados são confiáveis o suficiente para comparar?
3. O que mudou?
4. O que provavelmente é ruído?
5. Qual é o menor ajuste que faz sentido?
6. O que devo manter exatamente igual?',62,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','Semana 4 — Revisão'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,25,'13. O painel ideal não diz apenas “você perdeu 2 kg”','Um bom painel pode dizer:

> “Nas últimas quatro semanas, você completou 10 de 12 sessões. Sua média de peso está 0,8 kg abaixo da janela anterior, sua cintura caiu 1,5 cm e você registrou melhor energia em duas semanas consecutivas. Sua estimativa BIA de massa muscular oscilou, mas foi obtida no mesmo dispositivo e não acompanha uma queda de performance. Continue observando antes de concluir que houve perda muscular.”

Isso é muito mais próximo do que queremos construir.

**Dados + contexto + limites + próxima ação.**',131,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','13. O painel ideal não diz apenas “você perdeu 2 kg”'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,26,'Fontes-base','- American College of Sports Medicine. Resistance Training Guidelines Update, 2026.
- World Health Organization. Waist Circumference and Waist–Hip Ratio: Report of a WHO Expert Consultation.
- Systematic review (2026): validity of Bioelectrical Impedance Analysis compared with a four-compartment model in healthy adults. PubMed PMID 41718193.
- Review (2026): mobile applications for body composition estimation. PubMed PMID 42335590.
- Research on day-to-day variability in euvolemic body mass. PubMed PMID 37955103.',130,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','Fontes-base'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,27,'Nota de segurança','Este material é educação geral. Não substitui avaliação individual, diagnóstico ou tratamento. Em caso de condição clínica, lesão, alteração rápida/inexplicada de peso, sintomas persistentes ou necessidade nutricional específica, procure um profissional habilitado.',67,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','Nota de segurança'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
insert into public.knowledge_chunks(document_id,ordinal,heading,body,token_count,locator,metadata)
select kd.id,28,'Próximo passo','Abra **MyTrainX Progress** e escolha apenas o que vale a pena acompanhar.

**Registre menos. Entenda mais. Evolua com contexto.**',33,
       jsonb_build_object('source_path','content/ebooks/PROGRESS-SEM-RUIDO-V1.md','section','Próximo passo'),
       jsonb_build_object('rights_basis','owned','review_gate','scientific','retrieval_blocked_until_review',true,'parser_version',2)
from public.knowledge_documents kd
join public.content_items ci on ci.id=kd.content_id
where ci.slug='progress-sem-ruido-v1' and kd.version=1
on conflict (document_id,ordinal) do update set
 heading=excluded.heading,body=excluded.body,token_count=excluded.token_count,
 locator=excluded.locator,metadata=excluded.metadata;
