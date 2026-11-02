"use strict";
/* Catálogo único para página principal e Central de Ajuda.
   Produtos de marca são sugestões para orçamento e não estoque confirmado. */
window.EspacoCatalog = Object.freeze({
 products: Object.freeze([...[
 {id:"piscina-fibra",name:"Piscinas de fibra",category:"Piscinas",description:"Consulte modelos, tamanhos e opções para seu espaço.",icon:"i-pool",art:["#ddfbf8","#a2e7ef","#05869a"]},
 {id:"piscina-projeto",name:"Piscinas de vinil e alvenaria",category:"Piscinas",description:"Converse sobre alternativas para seu projeto.",icon:"i-wave",art:["#d9f1ff","#b8d5f8","#4977b5"]},
 {id:"cloro",name:"Cloro e sanitizantes",category:"Tratamento",description:"Opções de tratamento para manter a água cuidada.",icon:"i-droplet",art:["#e1f9ef","#b3eed8","#159781"]},
 {id:"algicida",name:"Algicidas e clarificantes",category:"Tratamento",description:"Produtos para a rotina de tratamento da piscina.",icon:"i-sparkle",art:["#f0e9fe","#dad2fd","#8765bc"]},
 {id:"filtros",name:"Filtros para piscina",category:"Equipamentos",description:"Equipamentos de filtragem para consultar conforme a necessidade.",icon:"i-filter",art:["#e5f3ff","#bedcf9","#4686bf"]},
 {id:"bombas",name:"Bombas de circulação",category:"Equipamentos",description:"Consulte alternativas de circulação e motobombas.",icon:"i-pump",art:["#e2f5fa","#a9dfea","#177b9d"]},
 {id:"aquecedores",name:"Aquecimento de piscinas",category:"Aquecimento",description:"Opções de aquecimento e conforto para sua área de lazer.",icon:"i-sun",art:["#fff3d8","#ffe1a1","#d28d26"]},
 {id:"capas",name:"Capas e proteção",category:"Acessórios",description:"Converse sobre soluções de cobertura e proteção.",icon:"i-wave",art:["#dff5f4","#b6e2dd","#169c91"]},
 {id:"limpeza",name:"Aspiradores e kits de limpeza",category:"Acessórios",description:"Itens práticos para cuidados e limpeza regulares.",icon:"i-tool",art:["#fff0e4","#ffd5bd","#ca7954"]},
 {id:"led",name:"Iluminação LED",category:"Iluminação",description:"Destaque a beleza da sua piscina com iluminação.",icon:"i-light",art:["#e9e8ff","#c6c8fc","#6e6fcb"]},
 {id:"spa",name:"Spas e banheiras",category:"Bem-estar",description:"Explore possibilidades de descanso e bem-estar.",icon:"i-spa",art:["#fdece9","#ffc9c2","#c36e7e"]},
 {id:"pecas",name:"Peças e reposição",category:"Equipamentos",description:"Peças e componentes: informe o modelo ao consultar.",icon:"i-tool",art:["#e8f3f5","#c5e0e7","#47869a"]}
],...[
  {
    "id": "hth-algicida-choque",
    "brand": "HTH",
    "name": "HTH Algicida Choque",
    "category": "Tratamento",
    "description": "Combate algas quando identificada infestação.",
    "icon": "i-droplet",
    "art": [
      "#e5f8fb",
      "#b6e6e9",
      "#047d99"
    ],
    "supportOnly": true,
    "url": "https://hth.com.br/produtos/solucao-agua-verde-algicida-choque"
  },
  {
    "id": "genco-algicida-choque",
    "brand": "Genco",
    "name": "GENCO Algicida de Choque",
    "category": "Tratamento",
    "description": "Indicado pelo fabricante para piscinas com algas.",
    "icon": "i-droplet",
    "art": [
      "#e5f8fb",
      "#b6e6e9",
      "#047d99"
    ],
    "supportOnly": true,
    "url": "https://www.genco.com.br/algicida-de-choque/"
  },
  {
    "id": "montreal-algicida-choque",
    "brand": "Montreal",
    "name": "Montreal Algicida Choque",
    "category": "Tratamento",
    "description": "Tratamento de infestação por algas.",
    "icon": "i-droplet",
    "art": [
      "#e5f8fb",
      "#b6e6e9",
      "#047d99"
    ],
    "supportOnly": true,
    "url": "https://www.montrealpiscinas.com.br/categoria-produtos/auxiliares/"
  },
  {
    "id": "fluidra-algicida-liquido",
    "brand": "Fluidra",
    "name": "Fluidra Algicida Líquido",
    "category": "Tratamento",
    "description": "Linha com usos de choque ou manutenção conforme rótulo.",
    "icon": "i-droplet",
    "art": [
      "#e5f8fb",
      "#b6e6e9",
      "#047d99"
    ],
    "supportOnly": true,
    "url": "https://fluidra.com.br/produtos/algicida-liquido/"
  },
  {
    "id": "hth-agua-turva",
    "brand": "HTH",
    "name": "HTH Solução Água Turva",
    "category": "Tratamento",
    "description": "Clarificante e floculante para turbidez após avaliação da água.",
    "icon": "i-droplet",
    "art": [
      "#e5f8fb",
      "#b6e6e9",
      "#047d99"
    ],
    "supportOnly": true,
    "url": "https://hth.com.br/produtos/solucao-agua-turva/"
  },
  {
    "id": "genco-genfloc",
    "brand": "Genco",
    "name": "GENCO GENFLOC Clarificante",
    "category": "Tratamento",
    "description": "Agrega partículas suspensas para facilitar filtração ou decantação.",
    "icon": "i-droplet",
    "art": [
      "#e5f8fb",
      "#b6e6e9",
      "#047d99"
    ],
    "supportOnly": true,
    "url": "https://www.genco.com.br/genfloc/"
  },
  {
    "id": "montreal-ultra-floc",
    "brand": "Montreal",
    "name": "Montreal Ultra Floc",
    "category": "Tratamento",
    "description": "Auxilia clarificação e filtração de partículas suspensas.",
    "icon": "i-droplet",
    "art": [
      "#e5f8fb",
      "#b6e6e9",
      "#047d99"
    ],
    "supportOnly": true,
    "url": "https://www.montrealpiscinas.com.br/produto/montreal-ultra-floc/"
  },
  {
    "id": "fluidra-clarificante",
    "brand": "Fluidra",
    "name": "Fluidra Clarificante Líquido",
    "category": "Tratamento",
    "description": "Aglomera partículas e auxilia a filtração.",
    "icon": "i-droplet",
    "art": [
      "#e5f8fb",
      "#b6e6e9",
      "#047d99"
    ],
    "supportOnly": true,
    "url": "https://fluidra.com.br/produtos/clarificante-liquido/"
  },
  {
    "id": "montreal-redutor-ph",
    "brand": "Montreal",
    "name": "Montreal Redutor de pH e Alcalinidade",
    "category": "Tratamento",
    "description": "Correção após medição de pH e alcalinidade elevados.",
    "icon": "i-droplet",
    "art": [
      "#e5f8fb",
      "#b6e6e9",
      "#047d99"
    ],
    "supportOnly": true,
    "url": "https://www.montrealpiscinas.com.br/tratamentos/"
  },
  {
    "id": "hth-redutor-ph",
    "brand": "HTH",
    "name": "HTH Redutor de Alcalinidade e pH Extra Forte",
    "category": "Tratamento",
    "description": "Ajuste de parâmetros elevados confirmado por teste.",
    "icon": "i-droplet",
    "art": [
      "#e5f8fb",
      "#b6e6e9",
      "#047d99"
    ],
    "supportOnly": true,
    "url": "https://hth.com.br/produtos/"
  },
  {
    "id": "fluidra-redutor-ph",
    "brand": "Fluidra",
    "name": "Fluidra Redutor de pH e Alcalinidade Líquido",
    "category": "Tratamento",
    "description": "Ajuste controlado de parâmetros elevados.",
    "icon": "i-droplet",
    "art": [
      "#e5f8fb",
      "#b6e6e9",
      "#047d99"
    ],
    "supportOnly": true,
    "url": "https://fluidra.com.br/produtos/redutor-de-ph-e-alcalinidade-liquido/"
  },
  {
    "id": "montreal-barrilha",
    "brand": "Montreal",
    "name": "Montreal Barrilha pH+",
    "category": "Tratamento",
    "description": "Elevação de pH abaixo da faixa indicada, após teste.",
    "icon": "i-droplet",
    "art": [
      "#e5f8fb",
      "#b6e6e9",
      "#047d99"
    ],
    "supportOnly": true,
    "url": "https://www.montrealpiscinas.com.br/tratamentos/"
  },
  {
    "id": "hth-elevador-ph",
    "brand": "HTH",
    "name": "HTH Elevador de pH Pó",
    "category": "Tratamento",
    "description": "Eleva o pH conforme medição e instruções do rótulo.",
    "icon": "i-droplet",
    "art": [
      "#e5f8fb",
      "#b6e6e9",
      "#047d99"
    ],
    "supportOnly": true,
    "url": "https://hth.com.br/produtos/"
  },
  {
    "id": "fluidra-elevador-ph",
    "brand": "Fluidra",
    "name": "Fluidra Elevador de pH Granulado",
    "category": "Tratamento",
    "description": "Correção de pH baixo mediante medição.",
    "icon": "i-droplet",
    "art": [
      "#e5f8fb",
      "#b6e6e9",
      "#047d99"
    ],
    "supportOnly": true,
    "url": "https://fluidra.com.br/produtos/elevador-de-ph-granulado/"
  },
  {
    "id": "montreal-metais",
    "brand": "Montreal",
    "name": "Montreal Eliminador de Metais 4 em 1",
    "category": "Tratamento",
    "description": "Tratamento de metais e manchas quando a causa for confirmada.",
    "icon": "i-droplet",
    "art": [
      "#e5f8fb",
      "#b6e6e9",
      "#047d99"
    ],
    "supportOnly": true,
    "url": "https://www.montrealpiscinas.com.br/produto/montreal-eliminador-de-metais-4-em-1/"
  },
  {
    "id": "genco-genquest",
    "brand": "Genco",
    "name": "GENCO GENQUEST Removedor de Metais",
    "category": "Tratamento",
    "description": "Para coloração e manchas de metais, respeitando restrições de cloro.",
    "icon": "i-droplet",
    "art": [
      "#e5f8fb",
      "#b6e6e9",
      "#047d99"
    ],
    "supportOnly": true,
    "url": "https://www.genco.com.br/genquest/"
  },
  {
    "id": "fluidra-metais",
    "brand": "Fluidra",
    "name": "Fluidra Eliminador de Metais",
    "category": "Tratamento",
    "description": "Inibidor de manchas e colorações relacionadas a metais.",
    "icon": "i-droplet",
    "art": [
      "#e5f8fb",
      "#b6e6e9",
      "#047d99"
    ],
    "supportOnly": true,
    "url": "https://fluidra.com.br/produtos/eliminador-de-metais/"
  },
  {
    "id": "montreal-limpa-borda",
    "brand": "Montreal",
    "name": "Montreal Limpa Borda",
    "category": "Tratamento",
    "description": "Limpeza de sujeiras impregnadas nas bordas da piscina.",
    "icon": "i-droplet",
    "art": [
      "#e5f8fb",
      "#b6e6e9",
      "#047d99"
    ],
    "supportOnly": true,
    "url": "https://www.montrealpiscinas.com.br/categoria-produtos/auxiliares/"
  },
  {
    "id": "genco-limpa-borda",
    "brand": "Genco",
    "name": "GENCO Limpa-Bordas",
    "category": "Tratamento",
    "description": "Produto de limpeza física para bordas sujas.",
    "icon": "i-droplet",
    "art": [
      "#e5f8fb",
      "#b6e6e9",
      "#047d99"
    ],
    "supportOnly": true,
    "url": "https://www.genco.com.br/linha-de-produtos/"
  },
  {
    "id": "hth-limpa-borda",
    "brand": "HTH",
    "name": "HTH Limpa Bordas",
    "category": "Tratamento",
    "description": "Detergente para marcas de sujeira nas bordas.",
    "icon": "i-droplet",
    "art": [
      "#e5f8fb",
      "#b6e6e9",
      "#047d99"
    ],
    "supportOnly": true,
    "url": "https://hth.com.br/produtos/limpa-bordas"
  },
  {
    "id": "fluidra-limpa-borda",
    "brand": "Fluidra",
    "name": "Fluidra Limpa Bordas",
    "category": "Tratamento",
    "description": "Detergente de baixa espuma para sujeiras das bordas.",
    "icon": "i-droplet",
    "art": [
      "#e5f8fb",
      "#b6e6e9",
      "#047d99"
    ],
    "supportOnly": true,
    "url": "https://fluidra.com.br/produtos/limpa-bordas/"
  },
  {
    "id": "hth-fita-teste",
    "brand": "HTH",
    "name": "HTH Fita Teste",
    "category": "Tratamento",
    "description": "Verifica pH, alcalinidade, cloro livre e estabilizante.",
    "icon": "i-droplet",
    "art": [
      "#e5f8fb",
      "#b6e6e9",
      "#047d99"
    ],
    "supportOnly": true,
    "url": "https://hth.com.br/produtos/fita-teste"
  }
]]),
 problems: Object.freeze([
  {
    "id": "verde",
    "type": "agua",
    "label": "Água verde",
    "title": "Sua piscina ficou verde?",
    "eyebrow": "Algas ou alteração de cor",
    "imageType": "green",
    "photo": "./assets/problemas/agua-verde.webp",
    "alt": "Piscina com água esverdeada por proliferação de algas; imagem ilustrativa gerada por IA.",
    "symptoms": "A água ganha um tom esverdeado, e paredes podem ficar escorregadias.",
    "explanation": "Algas são uma causa comum, mas metais dissolvidos também podem alterar a cor. Observe se a água está turva e confira os parâmetros antes de tratar.",
    "check": "Meça pH e cloro livre; escove superfícies e confirme com a loja se há algas.",
    "tips": "A sequência e o intervalo entre algicida e cloro dependem da marca. Nunca aplique os dois simultaneamente sem verificar o rótulo.",
    "products": [
      "hth-algicida-choque",
      "genco-algicida-choque",
      "montreal-algicida-choque",
      "fluidra-algicida-liquido"
    ]
  },
  {
    "id": "turva",
    "type": "agua",
    "label": "Água turva",
    "title": "A água está turva ou leitosa?",
    "eyebrow": "Aspecto esbranquiçado",
    "imageType": "cloudy",
    "photo": "./assets/problemas/agua-turva.webp",
    "alt": "Piscina com água esbranquiçada e turva; imagem ilustrativa gerada por IA.",
    "symptoms": "A água perde a transparência e fica difícil enxergar claramente o fundo.",
    "explanation": "Partículas finas, desequilíbrio químico, resíduos orgânicos ou filtração inadequada são possibilidades. Clarificantes não substituem a desinfecção.",
    "check": "Verifique pH, cloro, filtro, bomba e tempo de filtração antes de solicitar o produto.",
    "tips": "Após floculação ou decantação, pode ser necessário aspirar os resíduos. Siga a embalagem e as condições do filtro.",
    "products": [
      "hth-agua-turva",
      "genco-genfloc",
      "montreal-ultra-floc",
      "fluidra-clarificante"
    ]
  },
  {
    "id": "ph-alto",
    "type": "equilibrio",
    "label": "pH alto",
    "title": "O teste mostrou pH elevado?",
    "eyebrow": "Só aparece na medição",
    "imageType": "highph",
    "photo": "./assets/problemas/ph-alto.webp",
    "alt": "Kit medidor mostrando pH alto à beira de piscina aparentemente limpa; imagem ilustrativa gerada por IA.",
    "symptoms": "O pH pode estar alto mesmo com água visualmente limpa; algumas piscinas ficam turvas ou apresentam incrustações.",
    "explanation": "A leitura elevada em um teste confiável é o critério para considerar corretivos de pH, levando em conta a alcalinidade total.",
    "check": "Confirme o valor do pH e da alcalinidade. Evite reduzir o pH apenas pela aparência da água.",
    "tips": "Redutores podem ser corrosivos. Use proteção adequada e siga rigorosamente a dosagem do fabricante.",
    "products": [
      "montreal-redutor-ph",
      "hth-redutor-ph",
      "fluidra-redutor-ph"
    ]
  },
  {
    "id": "ph-baixo",
    "type": "equilibrio",
    "label": "pH baixo",
    "title": "O teste mostrou pH baixo?",
    "eyebrow": "Só aparece na medição",
    "imageType": "lowph",
    "photo": "./assets/problemas/ph-baixo.webp",
    "alt": "Kit medidor mostrando pH baixo à beira da piscina; imagem ilustrativa gerada por IA.",
    "symptoms": "O pH abaixo da faixa recomendada pode favorecer desconforto e corrosão, mesmo com aparência normal.",
    "explanation": "Medir pH e alcalinidade evita elevar um parâmetro desnecessariamente e piorar o equilíbrio.",
    "check": "Faça a medição e compare com a faixa indicada pelo fabricante do tratamento escolhido.",
    "tips": "O aumento de pH deve ser feito gradualmente conforme o volume e a tabela do produto.",
    "products": [
      "montreal-barrilha",
      "hth-elevador-ph",
      "fluidra-elevador-ph"
    ]
  },
  {
    "id": "metais",
    "type": "manchas",
    "label": "Manchas ou ferrugem",
    "title": "Apareceram manchas ou tom marrom?",
    "eyebrow": "Possíveis metais na água",
    "imageType": "brown",
    "photo": "./assets/problemas/manchas-ferrugem.webp",
    "alt": "Manchas amarronzadas de aspecto ferruginoso no revestimento da piscina; imagem ilustrativa gerada por IA.",
    "symptoms": "Tons castanhos, amarelados ou manchas coloridas no revestimento podem aparecer após tratamento.",
    "explanation": "Ferro, cobre ou manganês são possibilidades, mas poeira e material orgânico também podem alterar a água.",
    "check": "Verifique o abastecimento, o revestimento, o cloro e a hipótese de metais antes de escolher o removedor.",
    "tips": "ATENÇÃO: o GENQUEST tem restrição específica de cloro livre e de oxidação de choque. Consulte a ficha oficial.",
    "products": [
      "montreal-metais",
      "genco-genquest",
      "fluidra-metais"
    ]
  },
  {
    "id": "bordas",
    "type": "limpeza",
    "label": "Bordas sujas",
    "title": "Bordas com marcas de gordura?",
    "eyebrow": "Sujeira na linha d'água",
    "imageType": "grease",
    "photo": "./assets/problemas/bordas-sujas.webp",
    "alt": "Acúmulo de sujeira escura na linha d'água das bordas da piscina; imagem ilustrativa gerada por IA.",
    "symptoms": "Forma-se uma linha de sujeira escura ou oleosa na área em contato com a água.",
    "explanation": "Protetor solar, óleos e resíduos aderidos podem causar a sujeira. Produtos específicos ajudam a limpar sem agredir o revestimento.",
    "check": "Identifique o tipo de revestimento e siga o modo de limpeza indicado pelo fabricante.",
    "tips": "Prefira esponja apropriada; não use ácidos ou abrasivos sem orientação técnica.",
    "products": [
      "hth-limpa-borda",
      "genco-limpa-borda",
      "montreal-limpa-borda",
      "fluidra-limpa-borda"
    ]
  }
])
});
