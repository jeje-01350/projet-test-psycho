let personalityTestQuestion = [
  {
    question: 'Je suis motivé(e) à accomplir des tâches pour atteindre mes objectifs personnels et professionnels.',
    answers: [
      {
        type: 'J,Marron,D',
        content: 'Cela me correspond.'
      },
      {
        type: ' ',
        content: 'Je ne sais pas.'
      },
      {
        type: 'J,Marron,D,No',
        content: 'Cela ne me correspond pas.'
      }
    ]
  },
  {
    question: 'Je préfère les sujets simples aux discussions sur des concepts complexes.',
    answers: [
      {
        type: 'N,Vert,C,No',
        content: 'Cela me correspond.'
      },
      {
        type: ' ',
        content: 'Je ne sais pas.'
      },
      {
        type: 'N,Vert,C',
        content: 'Cela ne me correspond pas.'
      }
    ]
  },
  {
    question: 'Je préfère travailler seul(e) plutôt qu\'en équipe.',
    answers: [
      {
        type: 'S,Rouge,A',
        content: 'Cela me correspond.'
      },
      {
        type: ' ',
        content: 'Je ne sais pas.'
      },
      {
        type: 'S,Rouge,A,No',
        content: 'Cela ne me correspond pas.'
      }
    ]
  },
  {
    question: 'J\'aime planifier mes activités à l\'avance plutôt que d\'agir spontanément.',
    answers: [
      {
        type: 'J,Marron,D',
        content: 'Cela me correspond.'
      },
      {
        type: ' ',
        content: 'Je ne sais pas.'
      },
      {
        type: 'J,Marron,D,No',
        content: 'Cela ne me correspond pas.'
      }
    ]
  },
  {
    question: 'Je crois que la plupart des choses peuvent être expliquées de manière rationnelle et logique.',
    answers: [
      {
        type: 'T,Marron,C',
        content: 'Cela me correspond.'
      },
      {
        type: ' ',
        content: 'Je ne sais pas.'
      },
      {
        type: 'T,Marron,C,No',
        content: 'Cela ne me correspond pas.'
      }
    ]
  },
  {
    question: 'Je préfère avoir un cercle restreint d\'amis proches plutôt que de nombreuses connaissances.',
    answers: [
      {
        type: 'I,Vert,C',
        content: 'Cela me correspond.'
      },
      {
        type: ' ',
        content: 'Je ne sais pas.'
      },
      {
        type: 'I,Vert,C,No',
        content: 'Cela ne me correspond pas.'
      }
    ]
  },
  {
    question: 'Je suis à l\'aise pour partager mes idées et opinions avec les autres.',
    answers: [
      {
        type: 'E,Bleu,B',
        content: 'Cela me correspond.'
      },
      {
        type: ' ',
        content: 'Je ne sais pas.'
      },
      {
        type: 'E,Bleu,B,No',
        content: 'Cela ne me correspond pas.'
      }
    ]
  },
  {
    question: 'J\'utilise fréquemment les réseaux sociaux pour communiquer et interagir avec les autres.',
    answers: [
      {
        type: 'E,Bleu,B',
        content: 'Cela me correspond.'
      },
      {
        type: ' ',
        content: 'Je ne sais pas.'
      },
      {
        type: 'E,Bleu,B,No',
        content: 'Cela ne me correspond pas.'
      }
    ]
  },
  {
    question: 'Je tiens compte des sentiments et des besoins des autres dans mes prises de décision.',
    answers: [
      {
        type: 'F,Bleu,B',
        content: 'Cela me correspond.'
      },
      {
        type: ' ',
        content: 'Je ne sais pas.'
      },
      {
        type: 'F,Bleu,B,No',
        content: 'Cela ne me correspond pas.'
      }
    ]
  },
  {
    question: 'Je suis ouvert(e) à de nouvelles expériences et j\'aime essayer de nouvelles activités.',
    answers: [
      {
        type: 'P,Rouge,A',
        content: 'Cela me correspond.'
      },
      {
        type: ' ',
        content: 'Je ne sais pas.'
      },
      {
        type: 'P,Rouge,A,No',
        content: 'Cela ne me correspond pas.'
      }
    ]
  },

//     2ème evaluation pour le test
    {
      question: "Je suis intéressé à l'idée d'explorer de nouvelles perspectives professionnelles.",
      type: "Vocation, Sens professionnel, Trouver sa voie, Explorer",
      answers: [
        {
          score: 0,
          content: "Non, je préfère rester dans ma zone de confort.",
        },
        {
          score: 1,
          content: "Je n'ai pas encore décidé si cela m'intéresse.",
        },
        {
          score: 2,
          content: "Oui, je suis très enthousiaste à l'idée d'explorer de nouvelles options.",
        },
      ],
    },
    {
      question: "J'ai une idée claire de mes capacités et compétences professionnelles, et de mes aspirations.",
      type: "Me situer, Savoir où j'en suis",
      answers: [
        {
          score: 0,
          content: "Non, j'ai du mal à me situer professionnellement.",
        },
        {
          score: 1,
          content: "Je commence à mieux comprendre mes compétences et aspirations.",
        },
        {
          score: 2,
          content: "Oui, j'ai une vision claire de mes capacités et de mes objectifs.",
        },
      ],
    },
    {
      question: "Je parviens à maintenir une harmonie satisfaisante entre mon travail et ma vie personnelle.",
      type: "Équilibre vie professionnelle et vie personnelle",
      answers: [
        {
          score: 0,
          content: "Non, ma vie professionnelle empiète souvent sur ma vie personnelle.",
        },
        {
          score: 1,
          content: "C'est parfois le cas, mais pas toujours.",
        },
        {
          score: 2,
          content: "Oui, je réussis à équilibrer efficacement travail et vie personnelle.",
        },
      ],
    },
    {
      question: "Je suis à la recherche d'une évolution de carrière ou d'une évolution professionnelle.",
      type: "Évoluer professionnellement",
      answers: [
        {
          score: 0,
          content: "Non, je préfère rester dans ma position actuelle.",
        },
        {
          score: 1,
          content: "Je commence à envisager des possibilités d'évolution.",
        },
        {
          score: 2,
          content: "Oui, je suis activement en recherche d'opportunités d'évolution.",
        },
      ],
    },
    {
      question: "Je me sens confiant(e) quant à la stabilité de ma situation professionnelle actuelle.",
      type: "Sécuriser, stabiliser et anticiper",
      answers: [
        {
          score: 0,
          content: "Non, je suis inquiet(e) pour ma stabilité professionnelle.",
        },
        {
          score: 1,
          content: "Ma situation est relativement stable mais pourrait être améliorée.",
        },
        {
          score: 2,
          content: "Oui, je me sens pleinement confiant(e) et stable.",
        },
      ],
    },
    {
      question: "J'ai des idées ou projets professionnels que j'aimerais concrétiser dans un avenir proche.",
      type: "Viabiliser, Valider un projet",
      answers: [
        {
          score: 0,
          content: "Non, je n'ai pas encore de projets concrets.",
        },
        {
          score: 1,
          content: "Je réfléchis à quelques idées mais rien de concret pour l'instant.",
        },
        {
          score: 2,
          content: "Oui, j'ai des projets clairs que je souhaite réaliser prochainement.",
        },
      ],
    },
];

export default personalityTestQuestion;
