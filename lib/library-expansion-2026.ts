import type { LibraryItem, LibrarySource } from "@/lib/library-launch";

const acsm2026: LibrarySource = { label: "ACSM — Resistance Training Guidelines Update, 2026", url: "https://acsm.org/resistance-training-guidelines-update-2026/" };
const whoActivity: LibrarySource = { label: "WHO — Physical Activity", url: "https://www.who.int/europe/news-room/fact-sheets/item/physical-activity" };
const cdcSleep: LibrarySource = { label: "CDC — About Sleep", url: "https://www.cdc.gov/sleep/about/" };
const nhlbiSleep: LibrarySource = { label: "NHLBI — How Much Sleep Is Enough?", url: "https://www.nhlbi.nih.gov/health/sleep/how-much-sleep" };
const guiaAlimentar: LibrarySource = { label: "Ministério da Saúde — Guia Alimentar para a População Brasileira", url: "https://www.gov.br/saude/pt-br/assuntos/saude-brasil/publicacoes-para-promocao-a-saude/guia_alimentar_populacao_brasileira_2ed.pdf/view" };
const anvisaRotulo: LibrarySource = { label: "Anvisa — Rotulagem nutricional", url: "https://www.gov.br/anvisa/pt-br/assuntos/alimentos/rotulagem/rotulagem-nutricional" };

const sources = {
  acsm: acsm2026,
  who: whoActivity,
  cdc: cdcSleep,
  nhlbi: nhlbiSleep,
  guia: guiaAlimentar,
  anvisa: anvisaRotulo,
} as const;

export const libraryExpansion2026: LibraryItem[] = [
  {
    slug: "rir-rpe-sem-misterio",
    type: "article" as const,
    title: "RIR e RPE sem mistério",
    eyebrow: "AUTORREGULAÇÃO",
    description: "Como usar repetições em reserva e percepção de esforço para ajustar o treino sem transformar cada série num teste máximo.",
    readTime: "7 min",
    access: "PUBLIC" as const,
    tags: ["RIR","RPE","autorregulação","força"],
    updated: "2026-09-26",
    body: [
  {
    "heading": "Duas linguagens para a mesma pergunta",
    "paragraphs": [
      "RIR (repetitions in reserve) descreve quantas repetições você acredita que ainda conseguiria fazer com boa técnica ao terminar uma série. RPE descreve o esforço percebido numa escala. As duas ferramentas ajudam a comunicar intensidade sem depender apenas da carga externa."
    ],
    "bullets": [
      "3 RIR: você provavelmente conseguiria mais três repetições.",
      "2 RIR: ainda existe margem clara, mas a série já exige atenção.",
      "1 RIR: muito perto do limite técnico.",
      "0 RIR: nenhuma repetição adicional seria esperada com a mesma execução."
    ]
  },
  {
    "heading": "Por que isso é útil",
    "paragraphs": [
      "A mesma carga pode parecer diferente dependendo de sono, stress, experiência, exercício e momento da sessão. RIR/RPE permite adaptar o esforço mantendo o objetivo do treino."
    ],
    "bullets": [
      "Use uma faixa, não uma obsessão por precisão.",
      "Compare exercícios semelhantes ao longo das semanas.",
      "Registre quando a percepção foge muito do habitual."
    ]
  },
  {
    "heading": "Para quem está começando",
    "paragraphs": [
      "No início, estimar RIR é uma habilidade imperfeita. Por isso o MyTrainX prefere faixas simples e conservadoras. Em muitas séries de base, terminar com algumas repetições em reserva é suficiente para aprender o movimento e acumular trabalho."
    ]
  },
  {
    "heading": "A regra MyTrainX",
    "paragraphs": [
      "RIR não é um exame. É uma linguagem de decisão. Se a técnica degrada antes do esforço planejado, a série terminou para aquele objetivo."
    ]
  }
],
    sources: [sources.acsm],
  },
  {
    slug: "aquecimento-eficiente-sem-perder-tempo",
    type: "article" as const,
    title: "Aquecimento eficiente sem perder tempo",
    eyebrow: "ANTES DO TREINO",
    description: "Um aquecimento útil prepara para a sessão que vem a seguir; não precisa virar um segundo treino.",
    readTime: "6 min",
    access: "PUBLIC" as const,
    tags: ["aquecimento","treino","performance"],
    updated: "2026-09-26",
    body: [
  {
    "heading": "O objetivo do aquecimento",
    "paragraphs": [
      "Aquecimento deve aumentar gradualmente a prontidão para o treino e permitir ensaiar os movimentos que serão usados. A forma mais prática é combinar alguns minutos de atividade leve com séries progressivas dos primeiros exercícios."
    ]
  },
  {
    "heading": "Do geral ao específico",
    "paragraphs": [
      "Comece com movimento confortável e depois aproxime-se do padrão e da carga do treino. Quanto mais exigente tecnicamente for o primeiro exercício, mais valor existe em séries preparatórias específicas."
    ],
    "bullets": [
      "Movimento geral leve por alguns minutos.",
      "Mobilidade apenas onde existe necessidade para a sessão.",
      "Séries de aproximação com cargas progressivas.",
      "Primeira série de trabalho só quando o movimento estiver estável."
    ]
  },
  {
    "heading": "O que evitar",
    "paragraphs": [
      "Aquecimentos muito longos podem consumir tempo e energia sem melhorar a sessão. Também não existe obrigação de realizar uma sequência universal de alongamentos antes de todo treino."
    ]
  },
  {
    "heading": "Versão de 5 minutos",
    "paragraphs": [
      "Em dias corridos, use uma entrada curta: movimento geral, uma preparação articular simples e duas ou três séries de aproximação do primeiro exercício. Depois, deixe o próprio treino completar a preparação."
    ]
  }
],
    sources: [sources.acsm],
  },
  {
    slug: "quanto-descansar-entre-series",
    type: "article" as const,
    title: "Quanto descansar entre séries?",
    eyebrow: "PROGRAMAÇÃO",
    description: "Descanso suficiente melhora a qualidade das séries. O intervalo ideal depende do exercício, objetivo e dificuldade.",
    readTime: "6 min",
    access: "PUBLIC" as const,
    tags: ["descanso","séries","força","hipertrofia"],
    updated: "2026-09-26",
    body: [
  {
    "heading": "Não existe um cronómetro universal",
    "paragraphs": [
      "Intervalos curtos e longos mudam a experiência da sessão. Exercícios pesados e multiarticulares normalmente pedem mais recuperação do que movimentos simples ou acessórios."
    ]
  },
  {
    "heading": "Use performance como sinal",
    "paragraphs": [
      "Se o objetivo é manter repetições, carga e técnica, o próximo set deve começar quando você consegue executar o trabalho planejado com qualidade. Descansar pouco demais pode transformar limitação cardiovascular em limitação de força."
    ],
    "bullets": [
      "Séries pesadas: permita recuperação suficiente para repetir o esforço.",
      "Acessórios: intervalos menores podem funcionar bem.",
      "Circuitos: o descanso pode ser parte deliberada do estímulo."
    ]
  },
  {
    "heading": "Mais curto não significa mais eficiente",
    "paragraphs": [
      "Uma sessão rápida pode usar supersets ou organização inteligente, mas cortar descanso indiscriminadamente pode reduzir a qualidade do trabalho principal."
    ]
  },
  {
    "heading": "Como registrar",
    "paragraphs": [
      "No MyTrainX, o intervalo deve ser tratado como parte do programa. Se você precisa consistentemente de muito mais tempo que o planejado, isso é informação útil para ajustar a sessão."
    ]
  }
],
    sources: [sources.acsm],
  },
  {
    slug: "treinar-ate-a-falha-e-obrigatorio",
    type: "article" as const,
    title: "Treinar até a falha é obrigatório?",
    eyebrow: "MITOS DE TREINO",
    description: "A atualização ACSM 2026 ajuda a colocar a falha muscular no lugar certo: uma ferramenta opcional, não um requisito universal.",
    readTime: "6 min",
    access: "PUBLIC" as const,
    tags: ["falha muscular","hipertrofia","força"],
    updated: "2026-09-26",
    body: [
  {
    "heading": "Falha não é sinónimo de resultado",
    "paragraphs": [
      "A posição do ACSM de 2026 conclui que treinar até a falha momentânea não mostrou benefício consistente obrigatório para o adulto saudável médio. É possível progredir mantendo margem em muitas séries."
    ]
  },
  {
    "heading": "Quando a proximidade do limite importa",
    "paragraphs": [
      "Uma série extremamente fácil pode não fornecer estímulo suficiente para certos objetivos. Isso é diferente de dizer que todas as séries precisam terminar no limite absoluto."
    ],
    "bullets": [
      "Compostos pesados: preservar técnica e margem costuma ser útil.",
      "Máquinas e acessórios: aproximações maiores do limite podem ser mais simples de gerir.",
      "Iniciantes: aprender movimentos e consistência vem antes de procurar falha."
    ]
  },
  {
    "heading": "O custo também conta",
    "paragraphs": [
      "Quanto mais difícil a série, maior pode ser a fadiga imediata. O programa precisa equilibrar estímulo, recuperação e capacidade de repetir o treino."
    ]
  },
  {
    "heading": "Regra prática",
    "paragraphs": [
      "Use esforço suficiente para tornar a série relevante, mas trate a falha como escolha contextual. Não como prova de coragem."
    ]
  }
],
    sources: [sources.acsm],
  },
  {
    slug: "full-body-ou-divisao-de-treino",
    type: "article" as const,
    title: "Full body ou divisão de treino?",
    eyebrow: "ESCOLHA DO PROGRAMA",
    description: "A melhor divisão é a que distribui trabalho suficiente pela semana e cabe de verdade na sua rotina.",
    readTime: "7 min",
    access: "PUBLIC" as const,
    tags: ["full body","split","frequência","programação"],
    updated: "2026-09-26",
    body: [
  {
    "heading": "A divisão é logística",
    "paragraphs": [
      "Full body, upper/lower e divisões por grupos musculares são maneiras diferentes de organizar trabalho. O nome da divisão não produz resultado sozinho."
    ]
  },
  {
    "heading": "Quando full body funciona muito bem",
    "paragraphs": [
      "Para quem treina duas ou três vezes por semana, full body permite repetir padrões e distribuir trabalho dos grandes grupos musculares sem depender de muitos dias."
    ]
  },
  {
    "heading": "Quando dividir mais faz sentido",
    "paragraphs": [
      "À medida que volume, experiência ou preferência aumentam, dividir sessões pode tornar cada treino mais curto ou permitir mais trabalho específico."
    ],
    "bullets": [
      "Escolha frequência que você consegue cumprir.",
      "Distribua volume para manter qualidade.",
      "Evite depender de uma única sessão semanal gigantesca para um grupo importante.",
      "Mude a divisão quando a rotina pedir, não por moda."
    ]
  },
  {
    "heading": "MyTrainX decide pelo contexto",
    "paragraphs": [
      "Disponibilidade, equipamento, preferência, objetivo e recuperação importam mais do que defender uma divisão como universalmente superior."
    ]
  }
],
    sources: [sources.acsm],
  },
  {
    slug: "treino-em-casa-kit-minimo-2026",
    type: "article" as const,
    title: "Treino em casa: o kit mínimo que realmente ajuda",
    eyebrow: "HOME TRAINING",
    description: "Você não precisa montar uma academia doméstica. Poucos recursos ampliam muito as opções de progressão.",
    readTime: "6 min",
    access: "PUBLIC" as const,
    tags: ["casa","equipamento","força","iniciante"],
    updated: "2026-09-26",
    body: [
  {
    "heading": "Bodyweight já é um ponto de partida",
    "paragraphs": [
      "A ACSM 2026 reconhece treino com peso corporal, elásticos e opções domésticas como meios válidos para melhorar força e função. Equipamento é uma forma de ampliar progressões, não uma condição para começar."
    ]
  },
  {
    "heading": "Kit mínimo",
    "paragraphs": [
      "Se houver orçamento e espaço, alguns itens cobrem grande parte do treino doméstico."
    ],
    "bullets": [
      "Um par de halteres ajustáveis ou duas cargas diferentes.",
      "Faixa elástica longa e miniband.",
      "Banco ou apoio realmente estável.",
      "Colchonete apenas se tornar exercícios no chão mais confortáveis."
    ]
  },
  {
    "heading": "Compre progressão, não decoração",
    "paragraphs": [
      "Antes de adicionar aparelhos, pergunte se o novo item resolve um problema: falta de carga, dificuldade para puxar, necessidade de variar amplitude ou conveniência."
    ]
  },
  {
    "heading": "Sem equipamento?",
    "paragraphs": [
      "Manipule amplitude, tempo, unilateralidade, apoio e repetições. Quando essas opções deixam de ser práticas, carga externa passa a ser especialmente útil."
    ]
  }
],
    sources: [sources.acsm],
  },
  {
    slug: "sono-e-treino-o-que-importa",
    type: "article" as const,
    title: "Sono e treino: o que realmente importa",
    eyebrow: "RECOVERY",
    description: "Uma noite ruim não cancela o programa. O padrão de sono, a qualidade e o impacto durante o dia importam mais do que dramatizar um número isolado.",
    readTime: "7 min",
    access: "PUBLIC" as const,
    tags: ["sono","recovery","fadiga","hábitos"],
    updated: "2026-09-26",
    body: [
  {
    "heading": "Uma referência útil",
    "paragraphs": [
      "Para adultos, CDC e NHLBI usam pelo menos 7 horas por noite como referência geral, com faixas que variam por idade e necessidade individual. Qualidade e regularidade também fazem parte do sono saudável."
    ]
  },
  {
    "heading": "Observe semanas, não só ontem",
    "paragraphs": [
      "Uma única noite curta pode acontecer por trabalho, viagem ou rotina. O que merece mais atenção é a combinação persistente de pouco sono, sonolência diurna, dificuldade para dormir e piora de funcionamento."
    ]
  },
  {
    "heading": "Como ajustar o treino",
    "paragraphs": [
      "Em vez de cancelar automaticamente, comece pelo aquecimento e reavalie. Em alguns dias, manter os movimentos e reduzir volume ou carga é suficiente."
    ],
    "bullets": [
      "Evite transformar o treino em teste máximo quando a prontidão está claramente pior.",
      "Mantenha técnica como critério.",
      "Se o problema de sono persiste, procure avaliação apropriada."
    ]
  },
  {
    "heading": "O papel do check-in",
    "paragraphs": [
      "O Weekly Check-in existe para mostrar tendências entre sono, energia, stress e aderência. Ele não diagnostica causas."
    ]
  }
],
    sources: [sources.cdc, sources.nhlbi],
  },
  {
    slug: "dor-muscular-nao-mede-qualidade-do-treino",
    type: "article" as const,
    title: "Dor muscular não mede a qualidade do treino",
    eyebrow: "RECOVERY",
    description: "DOMS pode acontecer depois de estímulos novos, mas mais dor não significa automaticamente mais resultado.",
    readTime: "6 min",
    access: "PUBLIC" as const,
    tags: ["DOMS","dor muscular","recuperação"],
    updated: "2026-09-26",
    body: [
  {
    "heading": "Por que aparece",
    "paragraphs": [
      "Dor muscular tardia é comum quando o treino muda, o volume aumenta ou você retorna depois de uma pausa. Ela é uma resposta possível ao estímulo, não um placar."
    ]
  },
  {
    "heading": "Sem dor também pode haver progresso",
    "paragraphs": [
      "Com adaptação, a mesma sessão pode causar menos soreness mesmo continuando útil. Perseguir dor como objetivo tende a incentivar mudanças desnecessárias."
    ]
  },
  {
    "heading": "O que fazer",
    "paragraphs": [
      "Se a soreness é leve e o movimento está normal, muitas pessoas toleram atividade habitual. Ajustes podem ser feitos quando amplitude, técnica ou esforço ficam claramente prejudicados."
    ]
  },
  {
    "heading": "Quando não chamar de DOMS",
    "paragraphs": [
      "Dor aguda, trauma, inchaço importante, perda de função ou sintomas progressivos não devem ser normalizados como simples dor pós-treino."
    ]
  }
],
    sources: [sources.acsm],
  },
  {
    slug: "deload-quando-reduzir-o-treino",
    type: "article" as const,
    title: "Deload: quando reduzir o treino",
    eyebrow: "RECOVERY",
    description: "Reduzir temporariamente volume ou intensidade pode ser útil, mas não existe obrigação de fazer deload em calendário fixo.",
    readTime: "7 min",
    access: "PUBLIC" as const,
    tags: ["deload","fadiga","recuperação","programação"],
    updated: "2026-09-26",
    body: [
  {
    "heading": "Deload é uma ferramenta",
    "paragraphs": [
      "Deload é uma redução temporária da exigência. Pode significar menos séries, cargas menores, menor proximidade do limite ou uma combinação."
    ]
  },
  {
    "heading": "Não precisa acontecer a cada quatro semanas",
    "paragraphs": [
      "A necessidade depende do programa, experiência, carga total e contexto de vida. Calendários podem ajudar na organização, mas não devem substituir observação."
    ]
  },
  {
    "heading": "Sinais contextuais",
    "paragraphs": [
      "Nenhum sinal isolado prova excesso de treino. O que importa é um padrão: performance pior em várias sessões, recuperação mais lenta, sono claramente pior, stress elevado e aderência caindo."
    ]
  },
  {
    "heading": "Faça o menor ajuste útil",
    "paragraphs": [
      "Antes de desmontar o programa inteiro, reduza uma variável e observe novamente. Muitas vezes manter exercícios e baixar volume por alguns dias preserva ritmo e informação."
    ]
  }
],
    sources: [sources.acsm],
  },
  {
    slug: "como-ler-rotulo-nutricional-brasil",
    type: "article" as const,
    title: "Como ler um rótulo nutricional no Brasil",
    eyebrow: "NUTRIÇÃO PRÁTICA",
    description: "Use lista de ingredientes, porção, informação por 100 g/100 ml e a lupa frontal para comparar produtos com mais contexto.",
    readTime: "8 min",
    access: "PUBLIC" as const,
    tags: ["rótulos","Anvisa","nutrição","compras"],
    updated: "2026-09-26",
    body: [
  {
    "heading": "Comece pela pergunta certa",
    "paragraphs": [
      "Rótulo não serve para classificar um alimento como moralmente bom ou ruim. Ele serve para entender composição e comparar opções dentro do contexto da alimentação."
    ]
  },
  {
    "heading": "A lupa frontal",
    "paragraphs": [
      "A rotulagem brasileira destaca na frente da embalagem quando há alto teor de açúcares adicionados, gordura saturada ou sódio segundo os critérios regulatórios. É um atalho de informação, não a única coisa a observar."
    ]
  },
  {
    "heading": "Compare por 100 g ou 100 ml",
    "paragraphs": [
      "A regra brasileira tornou obrigatória a declaração por 100 g ou 100 ml, o que facilita comparar produtos mesmo quando as porções sugeridas são diferentes."
    ],
    "bullets": [
      "Veja a lista de ingredientes.",
      "Observe açúcares adicionados, gordura saturada e sódio quando forem relevantes para a escolha.",
      "Use a coluna por 100 g/100 ml para comparação.",
      "Considere o papel real do alimento na refeição."
    ]
  },
  {
    "heading": "Volte para o padrão alimentar",
    "paragraphs": [
      "O Guia Alimentar brasileiro prioriza alimentos in natura ou minimamente processados como base. Produtos embalados podem existir na rotina sem precisar substituir essa estrutura."
    ]
  }
],
    sources: [sources.anvisa, sources.guia],
  },
  {
    slug: "meal-prep-sem-comer-a-mesma-coisa",
    type: "article" as const,
    title: "Meal prep sem comer a mesma coisa a semana inteira",
    eyebrow: "MYTRAINX KITCHEN",
    description: "Prepare componentes, não sete caixas idênticas: uma estratégia mais flexível para reduzir decisões e manter variedade.",
    readTime: "7 min",
    access: "PUBLIC" as const,
    tags: ["meal prep","cozinha","organização","hábitos"],
    updated: "2026-09-26",
    body: [
  {
    "heading": "Pense em componentes",
    "paragraphs": [
      "Meal prep não precisa significar cozinhar uma refeição única para todos os dias. Preparar bases permite combinar sabores e porções conforme a semana."
    ]
  },
  {
    "heading": "O sistema 2 + 2 + 3",
    "paragraphs": [
      "Uma estrutura simples é preparar duas fontes principais de proteína, duas bases de carboidratos e três grupos de vegetais ou acompanhamentos."
    ],
    "bullets": [
      "Exemplo de proteína: frango e lentilha.",
      "Base: arroz e batata.",
      "Vegetais: brócolis, cenoura e salada fresca.",
      "Complementos: fruta, iogurte, ervas, molhos simples."
    ]
  },
  {
    "heading": "Monte só quando precisar",
    "paragraphs": [
      "Guardar componentes separadamente melhora flexibilidade. No almoço você cria um bowl; no jantar, wrap ou prato quente usando parte dos mesmos ingredientes."
    ]
  },
  {
    "heading": "Segurança e conservação",
    "paragraphs": [
      "Respeite refrigeração, validade dos ingredientes e sinais de deterioração. Quando houver dúvida sobre tempo seguro de armazenamento de uma preparação específica, prefira orientação oficial ou do fabricante."
    ]
  }
],
    sources: [sources.guia],
  },
  {
    slug: "antes-e-depois-do-treino-sem-regras-magicas",
    type: "article" as const,
    title: "Antes e depois do treino sem regras mágicas",
    eyebrow: "NUTRIÇÃO & TREINO",
    description: "A refeição ao redor do treino deve ajudar desempenho, conforto e rotina — sem transformar minutos no relógio em uma janela mágica.",
    readTime: "7 min",
    access: "PUBLIC" as const,
    tags: ["pré-treino","pós-treino","alimentação","performance"],
    updated: "2026-09-26",
    body: [
  {
    "heading": "Comece pelo dia inteiro",
    "paragraphs": [
      "O efeito de uma refeição pré ou pós-treino acontece dentro do padrão alimentar do dia. Regularidade e adequação global importam mais do que perseguir um horário perfeito."
    ]
  },
  {
    "heading": "Antes do treino",
    "paragraphs": [
      "Quanto mais perto da sessão, mais importante é tolerância digestiva. Refeições maiores normalmente precisam de mais tempo; opções menores e familiares podem funcionar quando o intervalo é curto."
    ],
    "bullets": [
      "Evite testar alimentos desconhecidos antes de uma sessão importante.",
      "Priorize conforto gastrointestinal.",
      "Use água e refeições habituais como base."
    ]
  },
  {
    "heading": "Depois do treino",
    "paragraphs": [
      "A refeição seguinte pode combinar uma fonte de proteína, alimentos fontes de carboidrato, vegetais/frutas e líquidos conforme fome, rotina e objetivo geral."
    ]
  },
  {
    "heading": "Não existe urgência artificial",
    "paragraphs": [
      "Para a maioria das rotinas recreativas, não é necessário tratar poucos minutos depois da última série como uma emergência nutricional. Planeje uma refeição adequada que consiga repetir."
    ]
  }
],
    sources: [sources.guia],
  }
];
