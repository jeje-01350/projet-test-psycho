let personalityTestQuestion = [
  {
    question: 'Je suis motivé(e) à accomplir des tâches pour atteindre mes objectifs personnels et professionnels.',
    answers: [
      {
        type: 'J,Brown,D',
        content: 'Cela me correspond.'
      },
      {
        type: ' ',
        content: 'Je ne sais pas.'
      },
      {
        type: 'J,Brown,D,No',
        content: 'Cela ne me correspond pas.'
      }
    ]
  },
  {
    question: 'Je préfère les sujets simples aux discussions sur des concepts complexes.',
    answers: [
      {
        type: 'N,Green,C,No',
        content: 'Cela me correspond.'
      },
      {
        type: ' ',
        content: 'Je ne sais pas.'
      },
      {
        type: 'N,Green,C',
        content: 'Cela ne me correspond pas.'
      }
    ]
  },
  {
    question: 'Je préfère travailler seul(e) plutôt qu\'en équipe.',
    answers: [
      {
        type: 'S,Red,A',
        content: 'Cela me correspond.'
      },
      {
        type: ' ',
        content: 'Je ne sais pas.'
      },
      {
        type: 'S,Red,A,No',
        content: 'Cela ne me correspond pas.'
      }
    ]
  },
  {
    question: 'J\'aime planifier mes activités à l\'avance plutôt que d\'agir spontanément.',
    answers: [
      {
        type: 'J,Brown,D',
        content: 'Cela me correspond.'
      },
      {
        type: ' ',
        content: 'Je ne sais pas.'
      },
      {
        type: 'J,Brown,D,No',
        content: 'Cela ne me correspond pas.'
      }
    ]
  },
  {
    question: 'Je crois que la plupart des choses peuvent être expliquées de manière rationnelle et logique.',
    answers: [
      {
        type: 'T,Brown,C',
        content: 'Cela me correspond.'
      },
      {
        type: ' ',
        content: 'Je ne sais pas.'
      },
      {
        type: 'T,Brown,C,No',
        content: 'Cela ne me correspond pas.'
      }
    ]
  },
  {
    question: 'Je préfère avoir un cercle restreint d\'amis proches plutôt que de nombreuses connaissances.',
    answers: [
      {
        type: 'I,Green,C',
        content: 'Cela me correspond.'
      },
      {
        type: ' ',
        content: 'Je ne sais pas.'
      },
      {
        type: 'I,Green,C,No',
        content: 'Cela ne me correspond pas.'
      }
    ]
  },
  {
    question: 'Je suis à l\'aise pour partager mes idées et opinions avec les autres.',
    answers: [
      {
        type: 'E,Blue,B',
        content: 'Cela me correspond.'
      },
      {
        type: ' ',
        content: 'Je ne sais pas.'
      },
      {
        type: 'E,Blue,B,No',
        content: 'Cela ne me correspond pas.'
      }
    ]
  },
  {
    question: 'J\'utilise fréquemment les réseaux sociaux pour communiquer et interagir avec les autres.',
    answers: [
      {
        type: 'E,Blue,B',
        content: 'Cela me correspond.'
      },
      {
        type: ' ',
        content: 'Je ne sais pas.'
      },
      {
        type: 'E,Blue,B,No',
        content: 'Cela ne me correspond pas.'
      }
    ]
  },
  {
    question: 'Je tiens compte des sentiments et des besoins des autres dans mes prises de décision.',
    answers: [
      {
        type: 'F,Blue,B',
        content: 'Cela me correspond.'
      },
      {
        type: ' ',
        content: 'Je ne sais pas.'
      },
      {
        type: 'F,Blue,B,No',
        content: 'Cela ne me correspond pas.'
      }
    ]
  },
  {
    question: 'Je suis ouvert(e) à de nouvelles expériences et j\'aime essayer de nouvelles activités.',
    answers: [
      {
        type: 'P,Red,A',
        content: 'Cela me correspond.'
      },
      {
        type: ' ',
        content: 'Je ne sais pas.'
      },
      {
        type: 'P,Red,A,No',
        content: 'Cela ne me correspond pas.'
      }
    ]
  },

//     2ème evaluation pour le test
  {
    question: 'Je suis stimulé(e) par l\'idée d\'explorer de nouvelles perspectives professionnelles.',
    type: 'Vocation / Sens professionnel / Trouver sa voie / Explorer',
    answers: [
      {
        score: 0,
        content: 'Pas du tout d\'accord.',
      },
      {
        score: 1,
        content: 'Neutre.'
      },
      {
        score: 2,
        content: 'Tout à fait d\'accord.'
      }
    ]
  },
  {
    question: 'Je consacre du temps à réfléchir sur mes compétences et mes aspirations professionnelles.',
    type: 'Me situer / Savoir où j\'en suis',
    answers: [
      {
        score: 0,
        content: 'Pas du tout d\'accord.',
      },
      {
        score: 1,
        content: 'Neutre.'
      },
      {
        score: 2,
        content: 'Tout à fait d\'accord.'
      }
    ]
  },
  {
    question: 'Je parviens à maintenir une harmonie satisfaisante entre mon travail et ma vie personnelle.',
    type: 'Équilibre vie professionnelle et vie personnelle',
    answers: [
      {
        score: 0,
        content: 'Pas du tout d\'accord.',
      },
      {
        score: 1,
        content: 'Neutre.'
      },
      {
        score: 2,
        content: 'Tout à fait d\'accord.'
      }
    ]
  },
  {
    question: 'J\'accueille positivement les opportunités qui me permettent de développer de nouvelles compétences au travail.',
    type: 'Évoluer professionnellement',
    answers: [
      {
        score: 0,
        content: 'Pas du tout d\'accord.',
      },
      {
        score: 1,
        content: 'Neutre.'
      },
      {
        score: 2,
        content: 'Tout à fait d\'accord.'
      }
    ]
  },
  {
    question: 'Je me sens confiant(e) quant à la stabilité de ma situation professionnelle actuelle.',
    type: 'Sécuriser, stabiliser, anticiper',
    answers: [
      {
        score: 0,
        content: 'Pas du tout d\'accord.',
      },
      {
        score: 1,
        content: 'Neutre.'
      },
      {
        score: 2,
        content: 'Tout à fait d\'accord.'
      }
    ]
  },
  {
    question: 'J\'ai des idées ou projets professionnels que j\'aimerais concrétiser dans un avenir proche.',
    type: 'Viabiliser / Valider un projet',
    answers: [
      {
        score: 0,
        content: 'Pas du tout d\'accord.',
      },
      {
        score: 1,
        content: 'Neutre.'
      },
      {
        score: 2,
        content: 'Tout à fait d\'accord.'
      }
    ]
  },
];

export default personalityTestQuestion;
