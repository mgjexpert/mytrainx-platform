import type { LibraryItem, LibrarySource } from "@/lib/library-launch";
const acsm: LibrarySource={label:"ACSM — Resistance Training Guidelines Update, 2026",url:"https://acsm.org/resistance-training-guidelines-update-2026/"};
const who: LibrarySource={label:"WHO — Physical Activity",url:"https://www.who.int/europe/news-room/fact-sheets/item/physical-activity"};
const guia: LibrarySource={label:"Ministério da Saúde — Guia Alimentar para a População Brasileira",url:"https://www.gov.br/saude/pt-br/assuntos/saude-brasil/publicacoes-para-promocao-a-saude/guia_alimentar_populacao_brasileira_2ed.pdf/view"};
const sources={acsm,who,guia} as const;
export const libraryExpansion2026B: LibraryItem[]=[{
 slug:"como-escolher-a-carga-inicial",type:"article" as const,title:"Como escolher a carga inicial",eyebrow:"TREINO DE FORÇA",
 description:"A carga certa é a que permite cumprir a faixa planejada com técnica estável e margem compatível com o objetivo.",readTime:"6 min",access:"PUBLIC" as const,
 tags:["carga","força","iniciante"],updated:"2026-09-26",
 body:[{"heading":"Comece abaixo do seu limite","paragraphs":["A primeira sessão não precisa descobrir a maior carga possível. Use um peso que permita aprender a trajetória, controlar a repetição e terminar com margem."]},{"heading":"A faixa de repetições ajuda","paragraphs":["Se o plano pede uma faixa, a carga deve permitir permanecer nela sem transformar as últimas repetições em compensações técnicas."],"bullets":["Muito fácil: progrida gradualmente.","Muito difícil: reduza antes de sacrificar execução.","Adequado: esforço claro com controle repetível."]},{"heading":"O primeiro treino é calibração","paragraphs":["Anote carga, repetições e percepção de esforço. Na sessão seguinte, ajuste a partir de informação real em vez de tentar acertar tudo antes de começar."]},{"heading":"Não compare números entre exercícios","paragraphs":["Dez quilos num exercício não têm o mesmo significado em outro. Compare o seu próprio desempenho no mesmo movimento, com contexto semelhante."]}],
 sources:[sources.acsm],
},
{
 slug:"treino-de-20-a-30-minutos-funciona",type:"article" as const,title:"Treino de 20 a 30 minutos funciona?",eyebrow:"TEMPO & ADERÊNCIA",
 description:"Sessões curtas podem ser produtivas quando priorizam movimentos importantes e eliminam tempo desperdiçado.",readTime:"6 min",access:"PUBLIC" as const,
 tags:["treino curto","aderência","tempo"],updated:"2026-09-26",
 body:[{"heading":"Curto não significa inútil","paragraphs":["A ACSM 2026 reforça que consistência e adequação do programa importam mais do que complexidade. Uma sessão curta feita regularmente pode ter mais valor do que um plano longo que não cabe na rotina."]},{"heading":"Priorize","paragraphs":["Em pouco tempo, escolha poucos movimentos que cubram grandes padrões e objetivos do dia."],"bullets":["1–2 movimentos principais.","1–3 acessórios úteis.","Descanso suficiente para manter qualidade.","Supersets apenas quando não atrapalham o trabalho principal."]},{"heading":"Tenha uma versão mínima","paragraphs":["Dias apertados não precisam virar dias perdidos. Uma versão reduzida preserva o hábito e mantém contato com os movimentos principais."]},{"heading":"Não comprima tudo","paragraphs":["Tentar encaixar uma sessão de 70 minutos em 25 apenas cortando descanso pode transformar treino de força em circuito desorganizado. Reduza escopo, não apenas intervalos."]}],
 sources:[sources.acsm],
},
{
 slug:"cardio-e-forca-na-mesma-semana",type:"article" as const,title:"Cardio e força na mesma semana",eyebrow:"CONDICIONAMENTO",
 description:"Força e atividade aeróbia não precisam competir. A organização depende da prioridade, volume e recuperação.",readTime:"7 min",access:"PUBLIC" as const,
 tags:["cardio","força","condicionamento"],updated:"2026-09-26",
 body:[{"heading":"Os dois fazem parte do quadro","paragraphs":["A WHO recomenda atividade aeróbia regular e fortalecimento muscular para adultos. Isso significa que a rotina não precisa escolher uma única capacidade física."]},{"heading":"Organize pela prioridade","paragraphs":["Se força é prioridade, preserve qualidade nos treinos principais. Se capacidade aeróbia é prioridade, organize as sessões intensas de forma que uma não sabote sistematicamente a outra."]},{"heading":"Nem todo cardio precisa ser duro","paragraphs":["Caminhadas, bicicleta leve e outras atividades podem aumentar movimento semanal sem exigir a mesma recuperação de intervalos intensos."]},{"heading":"Observe o todo","paragraphs":["Se performance cai, pernas nunca recuperam ou aderência piora, o problema pode ser carga total da semana — não a existência de cardio por si só."]}],
 sources:[sources.who,sources.acsm],
},
{
 slug:"mobilidade-sem-ritual",type:"article" as const,title:"Mobilidade sem ritual",eyebrow:"MOVIMENTO",
 description:"Mobilidade deve resolver uma necessidade real de movimento; não precisa virar uma lista infinita antes de cada treino.",readTime:"6 min",access:"PUBLIC" as const,
 tags:["mobilidade","aquecimento","movimento"],updated:"2026-09-26",
 body:[{"heading":"Mobilidade é específica","paragraphs":["A capacidade de alcançar uma posição depende da articulação, do exercício e do controle. Nem toda pessoa precisa da mesma sequência."]},{"heading":"Use o treino como diagnóstico prático","paragraphs":["Se uma posição necessária está difícil, teste uma preparação simples e veja se melhora a execução. Se não muda nada, talvez o ritual não esteja resolvendo o problema."]},{"heading":"Três usos úteis","paragraphs":["Preparar uma amplitude que será usada na sessão.","Praticar controle em posições relevantes.","Trabalhar uma limitação clara sem transformar aquecimento em treino paralelo."]},{"heading":"Dor não é falta de alongamento automaticamente","paragraphs":["Dor persistente ou progressiva não deve ser explicada automaticamente como 'falta de mobilidade'. Quando necessário, procure avaliação adequada."]}],
 sources:[sources.acsm],
},
{
 slug:"como-voltar-ao-treino-depois-de-uma-pausa",type:"article" as const,title:"Como voltar ao treino depois de uma pausa",eyebrow:"RETORNO",
 description:"Voltar bem é reconstruir tolerância, não tentar compensar semanas perdidas em três sessões.",readTime:"7 min",access:"PUBLIC" as const,
 tags:["retorno","consistência","progressão"],updated:"2026-09-26",
 body:[{"heading":"Você não precisa pagar uma dívida","paragraphs":["Depois de férias, doença já resolvida ou semanas corridas, a vontade de 'recuperar o tempo perdido' pode levar a volume desnecessário."]},{"heading":"Reduza antes de reconstruir","paragraphs":["Use menos séries, cargas confortáveis e movimentos conhecidos. Aumente conforme técnica e recuperação voltarem ao padrão."]},{"heading":"Espere alguma soreness","paragraphs":["Estímulos que deixaram de ser habituais podem gerar mais dor muscular tardia. Isso não significa que o programa deva continuar agressivo."]},{"heading":"Meta da primeira semana","paragraphs":["Terminar a semana com vontade e capacidade de fazer a segunda. O retorno é uma sequência, não um evento."]}],
 sources:[sources.acsm],
},
{
 slug:"como-registrar-o-treino-sem-obsessao",type:"article" as const,title:"Como registrar o treino sem obsessão",eyebrow:"PROGRESS",
 description:"Poucos dados consistentes são mais úteis do que uma planilha enorme que você abandona.",readTime:"6 min",access:"PUBLIC" as const,
 tags:["tracking","progress","hábitos"],updated:"2026-09-26",
 body:[{"heading":"Registre o que muda decisões","paragraphs":["Para treino de força, carga, repetições, séries e uma nota simples de esforço já contam uma história útil."]},{"heading":"Contexto mínimo","paragraphs":["Quando algo foge muito do normal, uma pequena nota pode explicar o dado: pouco sono, viagem, exercício novo ou tempo reduzido."]},{"heading":"Não transforme o registo no treino","paragraphs":["Se o sistema exige minutos de digitação entre séries, ele está competindo com a sessão. Registo deve ser rápido."]},{"heading":"Compare tendências","paragraphs":["Uma sessão ruim não exige reprogramação completa. Procure padrões de várias sessões e semanas."]}],
 sources:[sources.acsm],
},
{
 slug:"hidratacao-sem-numero-magico",type:"article" as const,title:"Hidratação sem número mágico",eyebrow:"NUTRIÇÃO PRÁTICA",
 description:"Necessidade de líquidos varia com clima, tamanho corporal, alimentação, suor e atividade. Rotina e contexto valem mais do que uma regra universal.",readTime:"6 min",access:"PUBLIC" as const,
 tags:["hidratação","água","hábitos"],updated:"2026-09-26",
 body:[{"heading":"Água como base","paragraphs":["O Guia Alimentar brasileiro inclui água como parte central de uma alimentação adequada. Para a maioria das rotinas, ter água acessível e beber regularmente é um ponto de partida simples."]},{"heading":"Necessidade varia","paragraphs":["Calor, treino prolongado, maior produção de suor e mudanças de rotina alteram a necessidade. Por isso, uma meta fixa igual para todas as pessoas pode ser pouco útil."]},{"heading":"Sinais práticos","paragraphs":["Sede, frequência de ingestão e contexto de atividade ajudam a organizar a rotina. Situações médicas específicas podem exigir orientação individual."]},{"heading":"No treino","paragraphs":["Comece a sessão já hidratado, tenha líquido disponível e evite usar desconforto extremo como lembrete para beber."]}],
 sources:[sources.guia],
},
{
 slug:"ultraprocessados-sem-terrorismo",type:"article" as const,title:"Ultraprocessados sem terrorismo",eyebrow:"ALIMENTAÇÃO",
 description:"O Guia Alimentar brasileiro ajuda a pensar em padrão alimentar sem transformar um alimento isolado em julgamento moral.",readTime:"7 min",access:"PUBLIC" as const,
 tags:["ultraprocessados","guia alimentar","hábitos"],updated:"2026-09-26",
 body:[{"heading":"A base importa mais","paragraphs":["O Guia Alimentar para a População Brasileira propõe que alimentos in natura ou minimamente processados formem a base da alimentação."]},{"heading":"Classificação não é culpa","paragraphs":["O objetivo de reconhecer ultraprocessados é entender o padrão de consumo e facilitar escolhas, não criar medo de comer fora do plano."]},{"heading":"Use contexto","paragraphs":["Frequência, quantidade, conveniência, custo, cultura e o restante da dieta importam. Uma alimentação sustentável precisa funcionar fora de um cenário perfeito."]},{"heading":"Pergunta útil","paragraphs":["Em vez de 'este alimento é proibido?', pergunte 'qual papel ele está ocupando na minha rotina e o que está substituindo?'"]}],
 sources:[sources.guia],
},
{
 slug:"lista-de-compras-base-mytrainx",type:"article" as const,title:"Lista de compras base MyTrainX",eyebrow:"MYTRAINX KITCHEN",
 description:"Uma despensa simples reduz decisões e torna mais fácil montar refeições sem depender de receitas complexas.",readTime:"6 min",access:"PUBLIC" as const,
 tags:["compras","cozinha","meal prep"],updated:"2026-09-26",
 body:[{"heading":"Compre blocos de construção","paragraphs":["A lista funciona melhor quando reúne ingredientes que podem formar várias refeições diferentes."]},{"heading":"Proteínas e leguminosas","paragraphs":["Ovos, frango, peixe, tofu, iogurte natural, feijão, lentilha e grão-de-bico podem entrar conforme preferência, orçamento e contexto."]},{"heading":"Bases e vegetais","paragraphs":["Arroz, aveia, batata, mandioca, massas simples, frutas, folhas e vegetais variados tornam a combinação flexível."]},{"heading":"Temperos e conveniência","paragraphs":["Alho, cebola, ervas, especiarias, limão e alguns itens congelados ou enlatados simples podem reduzir tempo sem exigir uma cozinha perfeita."]}],
 sources:[sources.guia],
},
{
 slug:"metodo-dos-componentes-para-montar-refeicoes",type:"article" as const,title:"Método dos componentes para montar refeições",eyebrow:"MYTRAINX KITCHEN",
 description:"Monte refeições combinando componentes em vez de depender de um cardápio rígido.",readTime:"7 min",access:"PUBLIC" as const,
 tags:["refeições","cozinha","flexibilidade"],updated:"2026-09-26",
 body:[{"heading":"Quatro blocos simples","paragraphs":["Uma refeição pode ser pensada como combinação de fonte proteica, base energética, vegetais/frutas e complementos de sabor."]},{"heading":"Exemplo","paragraphs":["Arroz + feijão + ovos + vegetais é uma combinação; batata + frango + salada é outra. O método permite trocar componentes sem 'quebrar' o plano."]},{"heading":"Por que funciona","paragraphs":["Ao aprender combinações, o utilizador deixa de depender de uma receita específica e consegue adaptar disponibilidade, preço e preferência."]},{"heading":"Coach X pode usar isso","paragraphs":["No futuro, o Coach X pode sugerir substituições dentro da mesma função culinária, respeitando preferências e alergénios registrados, sem assumir uma prescrição clínica."]}],
 sources:[sources.guia],
}];
