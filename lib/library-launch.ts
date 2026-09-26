export type LibraryContentType = "article" | "exercise" | "recipe";

export type LibrarySource = {
  label: string;
  url: string;
};

export type ArticleSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type ExerciseDetails = {
  movementPattern: string;
  difficulty: string;
  equipment: string[];
  primaryMuscles: string[];
  secondaryMuscles: string[];
  setup: string[];
  execution: string[];
  cues: string[];
  mistakes: string[];
  regressions: string[];
  progressions: string[];
  safety: string[];
};

export type RecipeIngredient = {
  item: string;
  amount: string;
};

export type RecipeDetails = {
  servings: string;
  prepTime: string;
  cookTime: string;
  profile: string[];
  ingredients: RecipeIngredient[];
  steps: string[];
  substitutions: string[];
  storage: string[];
};

export type LibraryItem = {
  slug: string;
  type: LibraryContentType;
  title: string;
  eyebrow: string;
  description: string;
  readTime: string;
  access: "PUBLIC" | "REGISTERED" | "MASTER";
  featured?: boolean;
  tags: string[];
  updated: string;
  body?: ArticleSection[];
  exercise?: ExerciseDetails;
  recipe?: RecipeDetails;
  sources?: LibrarySource[];
};

const acsm2026: LibrarySource = {
  label: "ACSM — Resistance Training Guidelines Update, 2026",
  url: "https://acsm.org/resistance-training-guidelines-update-2026/",
};

const whoActivity: LibrarySource = {
  label: "WHO — Physical Activity",
  url: "https://www.who.int/europe/news-room/fact-sheets/item/physical-activity",
};

const usdaFdc: LibrarySource = {
  label: "USDA — FoodData Central",
  url: "https://fdc.nal.usda.gov/",
};

const guiaAlimentar: LibrarySource = {
  label: "Ministério da Saúde — Guia Alimentar para a População Brasileira",
  url: "https://www.gov.br/saude/pt-br/assuntos/saude-brasil/publicacoes-para-promocao-a-saude/guia_alimentar_populacao_brasileira_2ed.pdf/view",
};

const biaValidity2026: LibrarySource = {
  label: "Systematic review — BIA vs. four-compartment model, 2026",
  url: "https://pubmed.ncbi.nlm.nih.gov/41718193/",
};

const mobileBodyComposition2026: LibrarySource = {
  label: "Review — Mobile apps for body composition estimation, 2026",
  url: "https://pubmed.ncbi.nlm.nih.gov/42335590/",
};

const whoWaist: LibrarySource = {
  label: "WHO — Waist circumference and waist–hip ratio",
  url: "https://www.who.int/publications/i/item/9789241501491",
};

const dailyWeightVariability: LibrarySource = {
  label: "Day-to-day variability in euvolemic body mass",
  url: "https://pubmed.ncbi.nlm.nih.gov/37955103/",
};

export const libraryLaunchItems: LibraryItem[] = [
  {
    slug: "como-comecar-treino-de-forca-2026",
    type: "article",
    title: "Como começar o treino de força em 2026",
    eyebrow: "FUNDAMENTOS DO TREINO",
    description:
      "Um ponto de partida simples para criar consistência, aprender os movimentos e evoluir sem transformar o treino num projeto impossível de manter.",
    readTime: "7 min",
    access: "PUBLIC",
    featured: true,
    tags: ["força", "iniciante", "consistência"],
    updated: "2026-09-25",
    body: [
      {
        heading: "Comece pelo que consegue repetir",
        paragraphs: [
          "O melhor programa inicial não é o mais complexo. É aquele que cabe na sua semana, permite repetir os principais padrões de movimento e deixa espaço para recuperar.",
          "A atualização de 2026 do American College of Sports Medicine reforça uma ideia útil: consistência e esforço adequado importam mais, para a maioria dos adultos saudáveis, do que perseguir um plano excessivamente sofisticado.",
        ],
      },
      {
        heading: "Uma base prática",
        bullets: [
          "Treine os grandes grupos musculares ao longo da semana.",
          "Use movimentos que consiga executar com controle e amplitude confortável.",
          "Comece com um volume que permita voltar ao treino sem sentir que precisa 'sobreviver' a cada sessão.",
          "Registre repetições, variações e percepção de esforço para conseguir progredir.",
          "Caminhadas, bicicleta, esportes e outras atividades também contam para a sua rotina de movimento.",
        ],
      },
      {
        heading: "Os padrões que valem aprender",
        paragraphs: [
          "Em vez de decorar dezenas de exercícios, aprenda primeiro famílias de movimentos: agachar, dobrar o quadril, empurrar, puxar, avançar, sustentar o tronco e locomover-se. Depois, escolha variações compatíveis com o seu ambiente e nível.",
        ],
        bullets: [
          "Agachar: agachamento ao banco, livre ou goblet.",
          "Hinge: levantamento romeno leve ou variações de ponte de glúteos.",
          "Empurrar: flexão inclinada, flexão no chão ou supino.",
          "Puxar: remadas, puxadas e progressões de barra.",
          "Core: dead bug, prancha e exercícios anti-rotação.",
        ],
      },
      {
        heading: "Progressão não significa aumentar peso sempre",
        paragraphs: [
          "Progredir pode significar fazer uma repetição a mais com boa técnica, usar uma amplitude melhor, acrescentar uma série, escolher uma variação um pouco mais difícil ou aumentar a carga de forma pequena. O objetivo é criar um estímulo ligeiramente maior quando o atual já está bem tolerado.",
        ],
      },
      {
        heading: "A regra MyTrainX",
        paragraphs: [
          "Saia do treino com informação para a próxima sessão. Se a execução piorou, o desconforto foi estranho ou o esforço ficou muito acima do planejado, isso também é dado. Ajustar faz parte do treinamento.",
        ],
      },
    ],
    sources: [acsm2026, whoActivity],
  },
  {
    slug: "consistencia-supera-complexidade",
    type: "article",
    title: "Consistência supera complexidade",
    eyebrow: "PERFORMANCE REAL",
    description:
      "Por que um plano bom e repetível tende a produzir mais valor do que um sistema perfeito que você abandona em duas semanas.",
    readTime: "5 min",
    access: "PUBLIC",
    featured: true,
    tags: ["hábitos", "treino", "aderência"],
    updated: "2026-09-25",
    body: [
      {
        heading: "O plano precisa sobreviver à vida real",
        paragraphs: [
          "Treino não acontece num laboratório. Trabalho, sono, deslocamento, família e energia disponível mudam de uma semana para outra. Por isso, um sistema sustentável precisa ter uma versão ideal e uma versão mínima.",
          "A atualização do ACSM de 2026 coloca a aderência no centro da conversa: para a maioria dos adultos saudáveis, fazer treino de resistência de forma consistente vale mais do que depender de detalhes avançados que não melhoram a capacidade de manter o programa.",
        ],
      },
      {
        heading: "Crie o seu mínimo viável",
        bullets: [
          "Defina quantas sessões cabem numa semana difícil, não apenas numa semana perfeita.",
          "Tenha versões mais curtas de treinos importantes.",
          "Mantenha 4–6 movimentos fundamentais como âncora.",
          "Use progressões pequenas e mensuráveis.",
          "Volte rapidamente ao plano depois de interrupções, sem tentar 'pagar a dívida' com excesso de treino.",
        ],
      },
      {
        heading: "Perdeu uma sessão? Não perdeu o programa",
        paragraphs: [
          "Uma rotina robusta tolera falhas. O objetivo não é construir uma sequência impecável; é reduzir o tempo entre sair do plano e voltar para ele.",
        ],
      },
    ],
    sources: [acsm2026],
  },
  {
    slug: "progressao-sem-complicar",
    type: "article",
    title: "Progressão sem complicar",
    eyebrow: "TREINO INTELIGENTE",
    description:
      "Carga, repetições, séries, amplitude e variações: cinco maneiras de evoluir sem transformar cada treino numa prova máxima.",
    readTime: "6 min",
    access: "PUBLIC",
    tags: ["progressão", "força", "hipertrofia"],
    updated: "2026-09-25",
    body: [
      {
        heading: "Progressão é aumentar o desafio de forma apropriada",
        paragraphs: [
          "Progressive overload não significa colocar mais peso na barra em toda sessão. Significa adaptar uma ou mais variáveis quando o estímulo atual já está bem tolerado.",
        ],
      },
      {
        heading: "Cinco alavancas úteis",
        bullets: [
          "Repetições: manter a carga e executar um pouco mais de trabalho.",
          "Séries: aumentar o volume total quando fizer sentido.",
          "Carga: subir de forma pequena quando a técnica permanece estável.",
          "Amplitude e controle: executar melhor antes de executar mais.",
          "Variação: usar uma progressão do exercício quando o padrão básico está sólido.",
        ],
      },
      {
        heading: "Não mude tudo ao mesmo tempo",
        paragraphs: [
          "Se carga, volume, frequência e complexidade aumentam juntos, fica difícil saber o que funcionou e a recuperação pode não acompanhar. Prefira mudanças pequenas que possam ser avaliadas.",
        ],
      },
      {
        heading: "Um sinal simples",
        paragraphs: [
          "Quando você completa o trabalho planejado repetidamente com boa técnica e margem adequada, uma pequena progressão pode ser razoável. Se o movimento se deteriora ou a recuperação piora, manter ou reduzir também é decisão de treino.",
        ],
      },
    ],
    sources: [acsm2026],
  },
  {
    slug: "forca-hipertrofia-potencia",
    type: "article",
    title: "Força, hipertrofia e potência não são a mesma coisa",
    eyebrow: "OBJETIVO DEFINE O TREINO",
    description:
      "Entenda como o mesmo exercício pode ser programado de maneiras diferentes de acordo com o resultado que você quer priorizar.",
    readTime: "7 min",
    access: "PUBLIC",
    featured: true,
    tags: ["força", "hipertrofia", "potência"],
    updated: "2026-09-25",
    body: [
      {
        heading: "O exercício é só uma parte da prescrição",
        paragraphs: [
          "Agachar, empurrar ou puxar não define sozinho o objetivo. O resultado também depende de carga, volume, intenção de movimento, frequência, proximidade do esforço máximo e recuperação.",
        ],
      },
      {
        heading: "Se o foco é força máxima",
        paragraphs: [
          "A síntese do ACSM de 2026 indica vantagem de cargas mais altas para maximizar ganhos de força. Isso não significa que todo iniciante deva começar pesado; primeiro é preciso desenvolver execução, tolerância e uma base consistente.",
        ],
      },
      {
        heading: "Se o foco é hipertrofia",
        paragraphs: [
          "O volume semanal ganha importância. O ACSM destaca que volumes mais altos podem otimizar o crescimento muscular, usando como referência prática cerca de dez séries semanais por grupo muscular em determinados contextos. Isso é um ponto de programação, não um número obrigatório para todas as pessoas.",
        ],
      },
      {
        heading: "Se o foco é potência",
        paragraphs: [
          "Potência envolve produzir força rapidamente. O treino usa cargas apropriadas e intenção de acelerar a fase concêntrica. É uma qualidade que exige técnica e escolha de exercícios compatível com o nível do praticante.",
        ],
      },
      {
        heading: "Na vida real, objetivos podem coexistir",
        paragraphs: [
          "Um programa pode desenvolver várias capacidades ao mesmo tempo. A diferença é o que recebe prioridade na organização da semana e na progressão.",
        ],
      },
    ],
    sources: [acsm2026],
  },
  {
    slug: "treino-em-casa-funciona",
    type: "article",
    title: "Treino em casa funciona?",
    eyebrow: "HOME TRAINING",
    description:
      "Sim — desde que exista desafio suficiente, progressão e uma seleção de movimentos que cubra o corpo de forma inteligente.",
    readTime: "5 min",
    access: "PUBLIC",
    tags: ["casa", "peso corporal", "bandas"],
    updated: "2026-09-25",
    body: [
      {
        heading: "O músculo não sabe onde você está",
        paragraphs: [
          "Seu corpo responde ao estímulo, não ao endereço. A atualização do ACSM de 2026 destaca que treino com peso corporal, faixas elásticas e rotinas realizadas em casa podem melhorar força, massa muscular e função física.",
        ],
      },
      {
        heading: "O desafio é criar progressão",
        bullets: [
          "Aumente repetições ou séries.",
          "Reduza assistência.",
          "Use variações unilaterais.",
          "Aumente a amplitude ou o controle.",
          "Use bandas, halteres ou mochila quando apropriado.",
          "Escolha progressões mais exigentes quando a base estiver sólida.",
        ],
      },
      {
        heading: "Monte uma sessão completa",
        paragraphs: [
          "Uma sessão simples pode combinar agachamento, hinge, empurrar, puxar, core e um bloco curto de condicionamento. Se não houver equipamento para puxadas, uma faixa elástica ou ponto seguro de ancoragem amplia bastante as opções.",
        ],
      },
    ],
    sources: [acsm2026],
  },
  {
    slug: "atividade-fisica-alem-do-treino",
    type: "article",
    title: "Atividade física vai além do treino",
    eyebrow: "MOVIMENTO 360",
    description:
      "Caminhar, pedalar, deslocar-se, brincar e realizar tarefas ativas também fazem parte do quadro de saúde e condicionamento.",
    readTime: "5 min",
    access: "PUBLIC",
    tags: ["atividade física", "cardio", "saúde"],
    updated: "2026-09-25",
    body: [
      {
        heading: "Treino é importante, movimento também",
        paragraphs: [
          "A Organização Mundial da Saúde recomenda para adultos, de forma geral, 150–300 minutos semanais de atividade aeróbia moderada ou 75–150 minutos de atividade vigorosa, ou combinação equivalente, além de fortalecimento muscular em pelo menos dois dias por semana.",
        ],
      },
      {
        heading: "Não precisa acontecer tudo na academia",
        paragraphs: [
          "Deslocamentos a pé ou de bicicleta, esportes, lazer ativo e tarefas do cotidiano podem contribuir para o volume total de atividade física. Isso ajuda a construir uma rotina menos dependente de uma única sessão formal.",
        ],
      },
      {
        heading: "Aumente gradualmente",
        paragraphs: [
          "Quem está pouco ativo pode começar com blocos menores e aumentar a frequência e a duração com o tempo. Alguma atividade é melhor do que nenhuma.",
        ],
      },
    ],
    sources: [whoActivity],
  },
  {
    slug: "macronutrientes-sem-complicacao",
    type: "article",
    title: "Macronutrientes sem complicação",
    eyebrow: "NUTRIÇÃO",
    description:
      "Proteínas, carboidratos e gorduras têm funções diferentes. Entender o básico ajuda a montar refeições melhores sem transformar comida em matemática o dia inteiro.",
    readTime: "7 min",
    access: "PUBLIC",
    tags: ["nutrição", "proteína", "carboidrato", "gordura"],
    updated: "2026-09-25",
    body: [
      {
        heading: "Proteína: estrutura e reparo",
        paragraphs: [
          "Proteínas fornecem aminoácidos usados na manutenção e construção de tecidos. Para quem treina, distribuir fontes de proteína ao longo do dia costuma ser uma estratégia prática.",
        ],
      },
      {
        heading: "Carboidratos: combustível versátil",
        paragraphs: [
          "Carboidratos são uma fonte importante de energia e podem ser especialmente úteis em atividades de maior intensidade. Frutas, feijões, tubérculos, arroz, aveia e outros cereais fazem parte de diferentes contextos alimentares.",
        ],
      },
      {
        heading: "Gorduras: energia e funções essenciais",
        paragraphs: [
          "Gorduras participam de estruturas celulares, absorção de vitaminas e outras funções. A qualidade e o contexto da alimentação importam mais do que tratar um macronutriente isolado como vilão.",
        ],
      },
      {
        heading: "A refeição não precisa virar uma planilha",
        paragraphs: [
          "Para muitas pessoas, um padrão baseado em alimentos variados, com fontes de proteína, vegetais ou frutas, fontes de carboidrato e gorduras em quantidades adequadas é mais sustentável do que tentar otimizar cada refeição.",
        ],
      },
    ],
    sources: [guiaAlimentar, usdaFdc],
  },
  {
    slug: "como-montar-uma-refeicao-equilibrada",
    type: "article",
    title: "Como montar uma refeição equilibrada",
    eyebrow: "MYTRAINX KITCHEN",
    description:
      "Um método visual para organizar refeições completas sem precisar pesar cada ingrediente.",
    readTime: "6 min",
    access: "PUBLIC",
    tags: ["nutrição", "refeições", "planejamento"],
    updated: "2026-09-25",
    body: [
      {
        heading: "Comece pela estrutura, depois ajuste a quantidade",
        paragraphs: [
          "Uma refeição pode ser pensada em blocos: fonte de proteína, vegetais e/ou frutas, fonte de carboidrato e uma porção de gordura ou ingredientes que naturalmente a forneçam. As quantidades dependem do objetivo, apetite, rotina e contexto individual.",
        ],
      },
      {
        heading: "Pense em quatro perguntas",
        bullets: [
          "Onde está a proteína desta refeição?",
          "Há variedade de alimentos vegetais?",
          "Qual fonte de energia combina com meu dia e meu treino?",
          "Esta refeição é prática o suficiente para eu repetir?",
        ],
      },
      {
        heading: "Comida de verdade continua sendo uma excelente base",
        paragraphs: [
          "O Guia Alimentar brasileiro prioriza alimentos in natura ou minimamente processados e preparações culinárias como base da alimentação. Isso não exige perfeição: significa construir um padrão alimentar no qual esses alimentos ocupam papel central.",
        ],
      },
      {
        heading: "Use a Kitchen como sistema, não como dieta rígida",
        paragraphs: [
          "As receitas MyTrainX são blocos combináveis. Você pode trocar fontes de proteína, vegetais, grãos e temperos sem transformar cada variação em uma nova 'dieta'.",
        ],
      },
    ],
    sources: [guiaAlimentar],
  },

  {
    slug: "por-que-seu-peso-muda-de-um-dia-para-o-outro",
    type: "article",
    title: "Por que seu peso muda de um dia para o outro",
    eyebrow: "PROGRESS WITHOUT NOISE",
    description:
      "A balança mede massa corporal naquele momento — não gordura isoladamente. Água, glicogênio, conteúdo intestinal e rotina podem mover o número sem representar uma mudança real de composição corporal.",
    readTime: "7 min",
    access: "PUBLIC",
    featured: true,
    tags: ["progresso", "peso", "tendência"],
    updated: "2026-09-26",
    body: [
      {
        heading: "Um número não conta a história inteira",
        paragraphs: [
          "O peso corporal pode variar no curto prazo mesmo quando a quantidade de gordura corporal praticamente não mudou. Hidratação, sódio, carboidratos armazenados como glicogênio, conteúdo gastrointestinal, horário da medição e outras condições alteram a massa registrada pela balança.",
          "Por isso, interpretar uma leitura isolada como sucesso ou fracasso costuma gerar mais ruído do que informação.",
        ],
      },
      {
        heading: "Prefira tendências comparáveis",
        bullets: [
          "Use a mesma balança sempre que possível.",
          "Meça em condições semelhantes de horário, roupa e rotina.",
          "Observe médias ou tendências ao longo de vários dias quando você mede com frequência.",
          "Compare janelas equivalentes, não o maior e o menor número escolhidos ao acaso.",
          "Combine peso com treino, medidas corporais e outros indicadores relevantes ao seu objetivo.",
        ],
      },
      {
        heading: "Quando pesar menos não é necessariamente melhor",
        paragraphs: [
          "O MyTrainX não presume que toda pessoa deva perder peso. Uma pessoa pode estar tentando ganhar massa, manter peso, melhorar força, recuperar condicionamento ou simplesmente construir uma rotina ativa.",
          "O número ganha significado apenas quando é interpretado dentro do objetivo escolhido pelo próprio utilizador.",
        ],
      },
    ],
    sources: [dailyWeightVariability],
  },
  {
    slug: "como-se-pesar-de-forma-consistente",
    type: "article",
    title: "Como se pesar de forma consistente",
    eyebrow: "PROGRESS WITHOUT NOISE",
    description:
      "Um protocolo simples para reduzir ruído e tornar suas medições mais comparáveis ao longo das semanas.",
    readTime: "6 min",
    access: "PUBLIC",
    tags: ["progresso", "peso", "protocolo"],
    updated: "2026-09-26",
    body: [
      {
        heading: "A melhor medição é a que você consegue repetir",
        paragraphs: [
          "Escolha um protocolo prático e mantenha-o. Para muitas pessoas, isso significa a mesma balança, em horário semelhante e com quantidade parecida de roupa.",
          "O objetivo não é criar uma rotina rígida; é evitar que diferenças de contexto sejam confundidas com evolução corporal.",
        ],
      },
      {
        heading: "Checklist de consistência",
        bullets: [
          "Mesma balança e superfície estável.",
          "Horário semelhante quando possível.",
          "Condições semelhantes de roupa.",
          "Não compare uma leitura excepcional depois de grande refeição, viagem ou desidratação com uma rotina normal como se fossem equivalentes.",
          "Se medir diariamente aumentar ansiedade ou comportamento compulsivo, reduza a frequência ou deixe de usar a balança.",
        ],
      },
      {
        heading: "O MyTrainX usa tendência",
        paragraphs: [
          "Quando existem leituras suficientes, o painel de progresso pode comparar médias de janelas equivalentes em vez de reagir a cada ponto. Essa abordagem ajuda a separar sinal de variação diária.",
        ],
      },
    ],
    sources: [dailyWeightVariability],
  },
  {
    slug: "bia-balanca-inteligente-o-que-pode-e-nao-pode-dizer",
    type: "article",
    title: "BIA e balança inteligente: o que podem — e não podem — dizer",
    eyebrow: "BODY COMPOSITION",
    description:
      "Percentual de gordura e massa muscular exibidos por uma smart scale são estimativas. Entenda como usá-las sem transformar precisão aparente em certeza.",
    readTime: "9 min",
    access: "PUBLIC",
    featured: true,
    tags: ["progresso", "BIA", "massa muscular", "gordura corporal"],
    updated: "2026-09-26",
    body: [
      {
        heading: "A balança mede impedância; o restante é estimado",
        paragraphs: [
          "A bioimpedância elétrica envia uma pequena corrente e mede propriedades elétricas do corpo. Algoritmos combinam essa informação com dados como peso, altura, idade e outros fatores para estimar compartimentos corporais.",
          "Isso significa que números como percentual de gordura, massa magra e 'massa muscular' não são medições diretas do tecido.",
        ],
      },
      {
        heading: "A precisão individual pode ser limitada",
        paragraphs: [
          "Uma revisão sistemática publicada em 2026 comparou dispositivos BIA com um modelo corporal de quatro compartimentos e encontrou desempenho insuficiente para tratar muitos resultados individuais como equivalentes a um método de referência.",
          "A mensagem prática não é que a BIA seja inútil. É que um número com uma casa decimal pode parecer mais preciso do que realmente é.",
        ],
      },
      {
        heading: "Como usar melhor",
        bullets: [
          "Use o mesmo dispositivo ao acompanhar tendência.",
          "Tente medir em condições semelhantes de hidratação e horário.",
          "Guarde o método e o nome do dispositivo junto com o resultado.",
          "Não compare diretamente resultados de equipamentos diferentes como se fossem intercambiáveis.",
          "Não use uma estimativa isolada para tomar decisões clínicas.",
        ],
      },
      {
        heading: "E fotos com IA?",
        paragraphs: [
          "Aplicações que estimam composição corporal a partir de imagens estão evoluindo, mas validação metodológica e generalização entre populações variam. No MyTrainX, fotos servem primeiro para documentação visual privada.",
          "Qualquer análise visual por IA deve ser opcional e não será apresentada como uma medição precisa de gordura ou massa muscular.",
        ],
      },
    ],
    sources: [biaValidity2026, mobileBodyComposition2026],
  },
  {
    slug: "como-medir-cintura-de-forma-consistente",
    type: "article",
    title: "Como medir a cintura de forma consistente",
    eyebrow: "BODY MEASUREMENTS",
    description:
      "Uma medida simples pode ser útil — desde que o ponto anatômico e a técnica sejam repetidos da mesma forma.",
    readTime: "6 min",
    access: "PUBLIC",
    tags: ["progresso", "cintura", "medidas"],
    updated: "2026-09-26",
    body: [
      {
        heading: "Escolha um protocolo e mantenha-o",
        paragraphs: [
          "Protocolos diferentes podem usar pontos anatômicos diferentes. Para que a comparação ao longo do tempo faça sentido, não alterne entre métodos sem registrar essa mudança.",
        ],
      },
      {
        heading: "Referência da Organização Mundial da Saúde",
        paragraphs: [
          "O protocolo da OMS utiliza o ponto médio entre a última costela palpável e a parte superior da crista ilíaca. A fita deve ficar horizontal, ajustada sem comprimir a pele, e a leitura é feita ao final de uma expiração normal.",
        ],
      },
      {
        heading: "Checklist",
        bullets: [
          "Use uma fita não elástica.",
          "Mantenha a fita horizontal.",
          "Não aperte a pele.",
          "Respire normalmente e meça ao final de uma expiração comum.",
          "Anote o protocolo usado para repetir o mesmo ponto na próxima vez.",
        ],
      },
    ],
    sources: [whoWaist],
  },
  {
    slug: "fotos-de-evolucao-como-padronizar",
    type: "article",
    title: "Fotos de evolução: como padronizar",
    eyebrow: "PRIVATE PROGRESS PHOTOS",
    description:
      "Luz, distância, ângulo e postura podem mudar muito uma foto. Padronizar reduz ilusões e torna comparações mais honestas.",
    readTime: "6 min",
    access: "PUBLIC",
    tags: ["progresso", "fotos", "privacidade"],
    updated: "2026-09-26",
    body: [
      {
        heading: "Fotos são documentação visual, não exame corporal",
        paragraphs: [
          "Uma fotografia pode ajudar a observar mudanças visuais ao longo do tempo, mas não mede diretamente percentual de gordura, massa muscular, saúde metabólica ou qualquer diagnóstico.",
        ],
      },
      {
        heading: "Padronize o cenário",
        bullets: [
          "Use o mesmo local e uma distância semelhante da câmera.",
          "Repita frente, lado e costas quando quiser uma comparação completa.",
          "Mantenha iluminação parecida.",
          "Use roupa semelhante quando se sentir confortável.",
          "Evite contrair, posar ou mudar deliberadamente a postura entre as comparações.",
          "Compare intervalos úteis — não precisa fotografar todos os dias.",
        ],
      },
      {
        heading: "Privacidade no MyTrainX",
        paragraphs: [
          "Fotos de progresso devem permanecer privadas por padrão. O MyTrainX usa armazenamento privado e acesso temporário autenticado. O objetivo é que a pessoa controle quando e se uma foto poderá ser analisada por alguma funcionalidade de IA.",
        ],
      },
    ],
  },
  {
    slug: "progresso-nao-e-so-peso",
    type: "article",
    title: "Progresso não é só peso",
    eyebrow: "MYTRAINX PROGRESS",
    description:
      "Força, medidas, capacidade de treino, aderência, recuperação e até o modo como uma rotina cabe na sua vida podem revelar evolução que a balança não mostra.",
    readTime: "7 min",
    access: "PUBLIC",
    tags: ["progresso", "performance", "hábitos"],
    updated: "2026-09-26",
    body: [
      {
        heading: "Escolha métricas que combinem com o objetivo",
        paragraphs: [
          "Se o objetivo principal é força, melhorar repetições, carga e execução pode ser mais informativo do que uma alteração de peso. Se é aderência, completar a rotina por várias semanas pode ser o indicador central.",
        ],
      },
      {
        heading: "Um painel mais completo",
        bullets: [
          "Treinos planejados vs. concluídos.",
          "Evolução de carga, repetições e variações de exercícios.",
          "Peso corporal quando for relevante.",
          "Circunferências quando fizerem sentido.",
          "Estimativas de composição corporal com método registrado.",
          "Fotos privadas em intervalos consistentes.",
          "Energia, sono, stress e soreness no check-in semanal.",
        ],
      },
      {
        heading: "O valor está na combinação",
        paragraphs: [
          "Nenhuma métrica precisa dominar a experiência. Uma pessoa pode estar com o peso praticamente estável enquanto melhora força, cintura, execução, condicionamento e consistência. O Coach X deve interpretar o conjunto e explicar as limitações dos dados.",
        ],
      },
    ],
  },

  // EXERCISES
  {
    slug: "agachamento-livre",
    type: "exercise",
    title: "Agachamento livre",
    eyebrow: "EXERCISE ENCYCLOPEDIA",
    description:
      "Padrão fundamental de agachamento para desenvolver coordenação e força de membros inferiores com o peso do corpo.",
    readTime: "4 min",
    access: "PUBLIC",
    featured: true,
    tags: ["pernas", "agachar", "peso corporal"],
    updated: "2026-09-25",
    exercise: {
      movementPattern: "Agachar",
      difficulty: "Iniciante",
      equipment: ["Nenhum"],
      primaryMuscles: ["Quadríceps", "Glúteos"],
      secondaryMuscles: ["Adutores", "Panturrilhas", "Core"],
      setup: [
        "Fique em pé com os pés numa posição confortável e estável.",
        "Mantenha o tronco organizado e distribua o apoio por toda a planta dos pés.",
      ],
      execution: [
        "Inicie flexionando joelhos e quadris ao mesmo tempo.",
        "Desça até uma amplitude confortável mantendo os pés apoiados.",
        "Empurre o chão e volte à posição inicial com controle.",
      ],
      cues: ["Pés firmes no chão.", "Joelhos acompanham a direção dos pés.", "Desça com controle e suba com intenção."],
      mistakes: ["Levantar os calcanhares sem necessidade.", "Perder o controle da descida.", "Forçar uma amplitude que provoca dor."],
      regressions: ["Agachamento para banco/caixa", "Agachamento assistido segurando um apoio"],
      progressions: ["Goblet squat", "Agachamento com pausa", "Agachamento com carga externa"],
      safety: ["Use uma amplitude que consiga controlar.", "Dor aguda ou crescente não é um objetivo do exercício."],
    },
  },
  {
    slug: "goblet-squat",
    type: "exercise",
    title: "Goblet squat",
    eyebrow: "EXERCISE ENCYCLOPEDIA",
    description:
      "Agachamento com carga frontal próxima ao peito, útil para desenvolver força e aprender a controlar uma carga externa.",
    readTime: "4 min",
    access: "PUBLIC",
    tags: ["pernas", "agachar", "halter"],
    updated: "2026-09-25",
    exercise: {
      movementPattern: "Agachar",
      difficulty: "Iniciante–Intermediário",
      equipment: ["Halter ou kettlebell"],
      primaryMuscles: ["Quadríceps", "Glúteos"],
      secondaryMuscles: ["Adutores", "Core", "Parte superior das costas"],
      setup: ["Segure a carga junto ao peito.", "Adote uma base estável e mantenha o objeto próximo ao corpo."],
      execution: ["Desça flexionando joelhos e quadris.", "Mantenha o tronco firme.", "Empurre o chão para retornar ao topo."],
      cues: ["Carga perto do corpo.", "Pés inteiros no chão.", "Controle primeiro, carga depois."],
      mistakes: ["Afastar excessivamente a carga do corpo.", "Escolher uma carga que destrói a técnica.", "Perder estabilidade dos pés."],
      regressions: ["Agachamento livre", "Goblet squat para caixa"],
      progressions: ["Carga maior", "Pausa na parte inferior", "Front squat quando apropriado"],
      safety: ["Escolha uma carga que consiga posicionar e retirar com segurança."],
    },
  },
  {
    slug: "levantamento-romeno-com-halteres",
    type: "exercise",
    title: "Levantamento romeno com halteres",
    eyebrow: "EXERCISE ENCYCLOPEDIA",
    description:
      "Padrão de dobradiça de quadril que enfatiza cadeia posterior com controle de tronco e quadril.",
    readTime: "5 min",
    access: "PUBLIC",
    tags: ["posterior", "hinge", "halter"],
    updated: "2026-09-25",
    exercise: {
      movementPattern: "Hinge / dobradiça de quadril",
      difficulty: "Intermediário",
      equipment: ["Halteres"],
      primaryMuscles: ["Posteriores de coxa", "Glúteos"],
      secondaryMuscles: ["Eretores da coluna", "Adutores", "Antebraços"],
      setup: ["Fique em pé com halteres próximos às coxas.", "Mantenha joelhos levemente flexionados e coluna organizada."],
      execution: ["Empurre o quadril para trás.", "Desça os halteres próximos às pernas até a amplitude que consiga controlar.", "Estenda o quadril para voltar ao topo."],
      cues: ["Quadril vai para trás.", "Halteres ficam perto das pernas.", "Sinta tensão nos posteriores sem perder posição."],
      mistakes: ["Transformar o movimento em agachamento.", "Arredondar o tronco para buscar amplitude.", "Afastar os halteres do corpo."],
      regressions: ["Hinge com bastão", "Levantamento romeno sem carga"],
      progressions: ["Barra", "Unilateral", "Maior carga com técnica estável"],
      safety: ["A amplitude deve ser limitada pela sua capacidade de manter controle, não por tocar o chão."],
    },
  },
  {
    slug: "ponte-de-gluteos",
    type: "exercise",
    title: "Ponte de glúteos",
    eyebrow: "EXERCISE ENCYCLOPEDIA",
    description:
      "Extensão de quadril no solo para treinar glúteos com baixa exigência de equipamento.",
    readTime: "3 min",
    access: "PUBLIC",
    tags: ["glúteos", "casa", "peso corporal"],
    updated: "2026-09-25",
    exercise: {
      movementPattern: "Extensão de quadril",
      difficulty: "Iniciante",
      equipment: ["Nenhum"],
      primaryMuscles: ["Glúteos"],
      secondaryMuscles: ["Posteriores de coxa", "Core"],
      setup: ["Deite-se de costas com joelhos flexionados.", "Apoie os pés de forma confortável no chão."],
      execution: ["Pressione os pés no chão.", "Eleve o quadril até uma posição confortável.", "Retorne devagar sem perder controle."],
      cues: ["Costelas organizadas.", "Suba pelo quadril.", "Evite transformar o topo numa hiperextensão lombar."],
      mistakes: ["Arquear excessivamente a lombar.", "Empurrar apenas pelas pontas dos pés.", "Perder controle na descida."],
      regressions: ["Amplitude reduzida"],
      progressions: ["Pausa no topo", "Carga sobre o quadril", "Ponte unilateral"],
      safety: ["Apoie a carga apenas quando houver posição segura e estável."],
    },
  },
  {
    slug: "flexao-inclinada",
    type: "exercise",
    title: "Flexão inclinada",
    eyebrow: "EXERCISE ENCYCLOPEDIA",
    description:
      "Uma forma acessível de aprender a flexão, regulando a dificuldade pela altura do apoio.",
    readTime: "4 min",
    access: "PUBLIC",
    tags: ["peito", "empurrar", "iniciante"],
    updated: "2026-09-25",
    exercise: {
      movementPattern: "Empurrar horizontal",
      difficulty: "Iniciante",
      equipment: ["Apoio estável"],
      primaryMuscles: ["Peitoral", "Tríceps"],
      secondaryMuscles: ["Deltoide anterior", "Core"],
      setup: ["Coloque as mãos num apoio firme.", "Afaste os pés até formar uma linha corporal confortável."],
      execution: ["Leve o peito em direção ao apoio com controle.", "Mantenha o corpo organizado.", "Empurre o apoio e volte à posição inicial."],
      cues: ["Corpo como uma unidade.", "Mãos firmes.", "Desça apenas até onde mantém controle."],
      mistakes: ["Deixar o quadril cair.", "Usar apoio instável.", "Abrir os cotovelos de forma desconfortável."],
      regressions: ["Apoio mais alto"],
      progressions: ["Apoio mais baixo", "Flexão no solo"],
      safety: ["O apoio deve suportar o peso sem deslizar ou tombar."],
    },
  },
  {
    slug: "flexao-de-bracos",
    type: "exercise",
    title: "Flexão de braços",
    eyebrow: "EXERCISE ENCYCLOPEDIA",
    description:
      "Exercício de empurrar com peso corporal que integra peitoral, tríceps, ombros e estabilidade do tronco.",
    readTime: "4 min",
    access: "PUBLIC",
    tags: ["peito", "tríceps", "peso corporal"],
    updated: "2026-09-25",
    exercise: {
      movementPattern: "Empurrar horizontal",
      difficulty: "Intermediário",
      equipment: ["Nenhum"],
      primaryMuscles: ["Peitoral", "Tríceps"],
      secondaryMuscles: ["Deltoide anterior", "Core"],
      setup: ["Mãos firmes no chão numa largura confortável.", "Organize tronco e pernas numa posição estável."],
      execution: ["Desça o corpo como uma unidade.", "Aproxime o peito do chão dentro da amplitude controlada.", "Empurre o chão para retornar."],
      cues: ["Empurre o chão.", "Mantenha o tronco firme.", "Controle a descida."],
      mistakes: ["Perder a posição do quadril.", "Acelerar a descida sem controle.", "Insistir numa amplitude dolorosa."],
      regressions: ["Flexão inclinada"],
      progressions: ["Pausa", "Pés elevados", "Carga externa quando apropriado"],
      safety: ["Use uma regressão se punhos, ombros ou tronco não tolerarem a versão no chão."],
    },
  },
  {
    slug: "remada-unilateral-com-halter",
    type: "exercise",
    title: "Remada unilateral com halter",
    eyebrow: "EXERCISE ENCYCLOPEDIA",
    description:
      "Puxada horizontal unilateral para trabalhar costas e braço com possibilidade de apoio para maior estabilidade.",
    readTime: "4 min",
    access: "PUBLIC",
    tags: ["costas", "puxar", "halter"],
    updated: "2026-09-25",
    exercise: {
      movementPattern: "Puxar horizontal",
      difficulty: "Iniciante–Intermediário",
      equipment: ["Halter", "Banco ou apoio opcional"],
      primaryMuscles: ["Latíssimo do dorso", "Parte média das costas"],
      secondaryMuscles: ["Bíceps", "Deltoide posterior", "Antebraço"],
      setup: ["Use uma base estável.", "Apoie a mão livre quando necessário.", "Mantenha o tronco controlado."],
      execution: ["Puxe o halter em direção ao tronco.", "Evite girar o corpo para produzir impulso.", "Desça com controle até o braço estender confortavelmente."],
      cues: ["Cotovelo viaja para trás.", "O tronco fica estável.", "Controle a volta."],
      mistakes: ["Rodar demais o tronco.", "Encolher o ombro.", "Usar impulso para terminar a repetição."],
      regressions: ["Carga menor", "Remada com apoio de peito"],
      progressions: ["Carga maior", "Pausa no topo", "Remada sem apoio quando apropriado"],
      safety: ["Organize a base antes de levantar a carga."],
    },
  },
  {
    slug: "afundo-estatico",
    type: "exercise",
    title: "Afundo estático",
    eyebrow: "EXERCISE ENCYCLOPEDIA",
    description:
      "Exercício unilateral de membros inferiores para desenvolver força, coordenação e estabilidade.",
    readTime: "4 min",
    access: "PUBLIC",
    tags: ["pernas", "unilateral", "lunge"],
    updated: "2026-09-25",
    exercise: {
      movementPattern: "Lunge / avanço",
      difficulty: "Iniciante–Intermediário",
      equipment: ["Nenhum"],
      primaryMuscles: ["Quadríceps", "Glúteos"],
      secondaryMuscles: ["Adutores", "Panturrilhas", "Core"],
      setup: ["Posicione um pé à frente e outro atrás.", "Ajuste a distância até encontrar uma base estável."],
      execution: ["Desça verticalmente dentro da amplitude confortável.", "Mantenha o pé da frente apoiado.", "Empurre o chão para retornar."],
      cues: ["Base estável.", "Desça para baixo, não apenas para frente.", "Controle os dois lados."],
      mistakes: ["Base estreita demais.", "Perder equilíbrio por excesso de amplitude.", "Acelerar a descida."],
      regressions: ["Afundo com apoio das mãos", "Amplitude menor"],
      progressions: ["Halteres", "Split squat com pé traseiro elevado", "Pausa"],
      safety: ["Use apoio externo se equilíbrio limitar a execução antes da força das pernas."],
    },
  },
  {
    slug: "dead-bug",
    type: "exercise",
    title: "Dead bug",
    eyebrow: "EXERCISE ENCYCLOPEDIA",
    description:
      "Exercício de controle do tronco para aprender a movimentar braços e pernas mantendo a região central organizada.",
    readTime: "4 min",
    access: "PUBLIC",
    tags: ["core", "controle", "casa"],
    updated: "2026-09-25",
    exercise: {
      movementPattern: "Anti-extensão / controle do core",
      difficulty: "Iniciante",
      equipment: ["Nenhum"],
      primaryMuscles: ["Core"],
      secondaryMuscles: ["Flexores do quadril", "Estabilizadores do ombro"],
      setup: ["Deite-se de costas.", "Eleve braços e pernas numa posição que consiga sustentar sem desconforto."],
      execution: ["Estenda lentamente braço e perna opostos.", "Pare antes de perder o controle do tronco.", "Retorne e alterne os lados."],
      cues: ["Movimento lento.", "Expira enquanto alonga.", "Menos amplitude pode ser melhor."],
      mistakes: ["Buscar amplitude sacrificando o controle.", "Prender a respiração.", "Acelerar as trocas."],
      regressions: ["Mover apenas braços", "Mover apenas uma perna por vez com amplitude curta"],
      progressions: ["Maior alavanca", "Pausa", "Resistência externa leve"],
      safety: ["Reduza a amplitude se sentir desconforto lombar."],
    },
  },
  {
    slug: "prancha-frontal",
    type: "exercise",
    title: "Prancha frontal",
    eyebrow: "EXERCISE ENCYCLOPEDIA",
    description:
      "Exercício isométrico de estabilidade do tronco, com dificuldade facilmente ajustável por posição e duração.",
    readTime: "3 min",
    access: "PUBLIC",
    tags: ["core", "isometria", "peso corporal"],
    updated: "2026-09-25",
    exercise: {
      movementPattern: "Anti-extensão",
      difficulty: "Iniciante–Intermediário",
      equipment: ["Nenhum"],
      primaryMuscles: ["Core"],
      secondaryMuscles: ["Ombros", "Glúteos", "Quadríceps"],
      setup: ["Apoie antebraços e pés.", "Organize o corpo numa linha confortável."],
      execution: ["Mantenha tensão global sem prender a respiração.", "Finalize a série antes de perder claramente a posição."],
      cues: ["Empurre o chão.", "Respire.", "Qualidade antes do cronômetro."],
      mistakes: ["Deixar o quadril cair.", "Elevar o quadril excessivamente.", "Transformar a duração em competição."],
      regressions: ["Prancha com joelhos apoiados", "Prancha inclinada"],
      progressions: ["Maior duração controlada", "Alavanca mais difícil", "Variações anti-rotação"],
      safety: ["Interrompa se houver dor aguda ou desconforto crescente nos ombros ou lombar."],
    },
  },

  // RECIPES
  {
    slug: "overnight-oats-iogurte-fruta",
    type: "recipe",
    title: "Overnight oats com iogurte e fruta",
    eyebrow: "MYTRAINX KITCHEN",
    description:
      "Pequeno-almoço preparado na véspera, com aveia, iogurte, fruta e textura ajustável.",
    readTime: "3 min",
    access: "PUBLIC",
    featured: true,
    tags: ["café da manhã", "meal prep", "aveia"],
    updated: "2026-09-25",
    recipe: {
      servings: "1 porção",
      prepTime: "5 min + geladeira",
      cookTime: "0 min",
      profile: ["prático", "meal prep", "personalizável"],
      ingredients: [
        { item: "Aveia em flocos", amount: "40 g" },
        { item: "Iogurte natural", amount: "170 g" },
        { item: "Leite ou bebida de preferência", amount: "60–100 ml" },
        { item: "Banana ou outra fruta", amount: "1 porção" },
        { item: "Chia", amount: "1 colher de chá" },
        { item: "Canela", amount: "a gosto" },
      ],
      steps: [
        "Misture aveia, iogurte, parte do líquido e chia.",
        "Ajuste a textura com mais líquido, se necessário.",
        "Adicione a fruta e a canela.",
        "Cubra e deixe na geladeira durante a noite.",
      ],
      substitutions: ["Troque a fruta conforme a estação.", "Use iogurte sem lactose quando necessário.", "Adicione castanhas apenas se fizer sentido para sua refeição."],
      storage: ["Conserve refrigerado em recipiente fechado.", "Prefira consumir no dia seguinte para melhor textura."],
    },
    sources: [usdaFdc],
  },
  {
    slug: "omelete-legumes-ricota",
    type: "recipe",
    title: "Omelete de legumes e ricota",
    eyebrow: "MYTRAINX KITCHEN",
    description:
      "Uma refeição rápida baseada em ovos, vegetais e queijo fresco, pronta em poucos minutos.",
    readTime: "4 min",
    access: "PUBLIC",
    tags: ["ovos", "rápido", "proteína"],
    updated: "2026-09-25",
    recipe: {
      servings: "1 porção",
      prepTime: "6 min",
      cookTime: "8 min",
      profile: ["rápido", "panela única", "vegetais"],
      ingredients: [
        { item: "Ovos", amount: "2–3 unidades" },
        { item: "Tomate picado", amount: "1/2 unidade" },
        { item: "Espinafre ou couve", amount: "1 punhado" },
        { item: "Ricota", amount: "2 colheres de sopa" },
        { item: "Azeite", amount: "1 colher de chá" },
        { item: "Sal, pimenta e ervas", amount: "a gosto" },
      ],
      steps: [
        "Bata os ovos com temperos.",
        "Refogue rapidamente os vegetais numa frigideira.",
        "Adicione os ovos e cozinhe em fogo baixo a médio.",
        "Distribua a ricota, dobre ou finalize aberta e sirva.",
      ],
      substitutions: ["Use outros vegetais disponíveis.", "Troque ricota por queijo fresco compatível com sua preferência."],
      storage: ["Melhor consumida logo após o preparo.", "Se guardar, refrigere rapidamente e reaqueça completamente."],
    },
    sources: [usdaFdc],
  },
  {
    slug: "bowl-frango-arroz-vegetais",
    type: "recipe",
    title: "Bowl de frango, arroz e vegetais",
    eyebrow: "MYTRAINX KITCHEN",
    description:
      "Uma base simples de meal prep que pode mudar completamente com legumes, ervas e molhos diferentes.",
    readTime: "5 min",
    access: "PUBLIC",
    tags: ["frango", "arroz", "marmita"],
    updated: "2026-09-25",
    recipe: {
      servings: "2 porções",
      prepTime: "12 min",
      cookTime: "20 min",
      profile: ["meal prep", "refeição completa", "versátil"],
      ingredients: [
        { item: "Peito ou sobrecoxa de frango sem osso", amount: "300 g" },
        { item: "Arroz cozido", amount: "2 porções" },
        { item: "Cenoura", amount: "1 unidade pequena" },
        { item: "Abobrinha", amount: "1/2 unidade" },
        { item: "Brócolis", amount: "1 xícara" },
        { item: "Azeite", amount: "1 colher de sopa" },
        { item: "Limão, alho, páprica e ervas", amount: "a gosto" },
      ],
      steps: [
        "Tempere o frango e corte os vegetais em tamanhos semelhantes.",
        "Grelhe ou asse o frango até estar completamente cozido.",
        "Salteie ou asse os vegetais mantendo a textura que prefere.",
        "Monte cada bowl com arroz, vegetais e frango.",
        "Finalize com limão e ervas.",
      ],
      substitutions: ["Troque frango por tofu, ovos, peixe ou leguminosas conforme o contexto.", "Troque arroz por batata, quinoa, massa ou outro cereal."],
      storage: ["Divida em recipientes rasos e refrigere depois de esfriar de forma segura.", "Reaqueça completamente antes de consumir quando aplicável."],
    },
    sources: [usdaFdc],
  },
  {
    slug: "salada-morna-grao-de-bico-ovos",
    type: "recipe",
    title: "Salada morna de grão-de-bico e ovos",
    eyebrow: "MYTRAINX KITCHEN",
    description:
      "Leguminosas, ovos, vegetais e ervas numa refeição prática que funciona quente ou fria.",
    readTime: "5 min",
    access: "PUBLIC",
    tags: ["grão-de-bico", "ovos", "vegetariano"],
    updated: "2026-09-25",
    recipe: {
      servings: "2 porções",
      prepTime: "10 min",
      cookTime: "10 min",
      profile: ["vegetariano", "fibras", "meal prep"],
      ingredients: [
        { item: "Grão-de-bico cozido", amount: "2 xícaras" },
        { item: "Ovos cozidos", amount: "2–4 unidades" },
        { item: "Tomate-cereja", amount: "1 xícara" },
        { item: "Folhas verdes", amount: "2 punhados" },
        { item: "Cebola roxa", amount: "1/4 unidade" },
        { item: "Azeite e limão", amount: "a gosto" },
        { item: "Salsinha ou coentro", amount: "a gosto" },
      ],
      steps: [
        "Aqueça rapidamente o grão-de-bico numa frigideira com temperos.",
        "Misture tomate, folhas e cebola.",
        "Adicione o grão-de-bico morno.",
        "Finalize com ovos, limão, azeite e ervas.",
      ],
      substitutions: ["Use feijão branco ou lentilhas.", "Substitua os ovos por tofu grelhado se preferir uma versão sem ovos."],
      storage: ["Guarde o molho separado se preparar com antecedência.", "Conserve refrigerado."],
    },
    sources: [usdaFdc],
  },
];

export function getLibraryItem(slug: string) {
  return libraryLaunchItems.find((item) => item.slug === slug);
}

export function getLibraryItemsByType(type: LibraryContentType) {
  return libraryLaunchItems.filter((item) => item.type === type);
}
