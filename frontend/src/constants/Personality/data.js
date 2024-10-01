let personalityTestQuestion = [
  // question #1
  {
    question: 'Je suis orienté vers les tâches pour atteindre certains objectifs.',
    answers: [
      {
        type: 'J,Brown,D',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'J,Brown,D,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #2
  {
    question: 'Je m\'ennuie facilement lorsque je discute de concepts abstraits.',
    answers: [
      {
        type: 'N,Green,C',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'N,Green,C,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #3
  {
    question: 'J\'aime essayer les choses par moi-même.',
    answers: [
      {
        type: 'S,Red,A',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'S,Red,A,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #4
  {
    question: 'J\'aime savoir où je vais avant de quitter la maison.',
    answers: [
      {
        type: 'J,Brown,D',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'J,Brown,D,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #5
  {
    question: 'Je crois qu\'il y a une explication logique à tout.',
    answers: [
      {
        type: 'T,Brown,C',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'T,Brown,C,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #6
  {
    question: 'J\'ai tendance à garder mon cercle social restreint.',
    answers: [
      {
        type: 'I,Green,C',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'I,Green,C,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #7
  {
    question: 'J\'aime partager mes idées avec les autres.',
    answers: [
      {
        type: 'E,Blue,B',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'E,Blue,B,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #8
  {
    question: 'J\'aime utiliser les réseaux sociaux.',
    answers: [
      {
        type: 'E,Blue,B',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'E,Blue,B,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #9
  {
    question: 'Je me préoccupe toujours des autres lorsque je prends des décisions.',
    answers: [
      {
        type: 'F,Blue,B',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'F,Blue,B,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #10
  {
    question: 'J\'aime essayer de nouvelles choses.',
    answers: [
      {
        type: 'P,Red,A',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'P,Red,A,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #11
  {
    question: 'Je peux facilement m\'adapter à un changement de décision.',
    answers: [
      {
        type: 'P,Red,A',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'P,Red,A,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #12
  {
    question: 'Je résous les problèmes en travaillant sur les faits jusqu\'à ce que je comprenne le problème.',
    answers: [
      {
        type: 'S,Brown,C',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'S,Brown,C,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #13
  {
    question: 'Je me fie à la logique plutôt qu\'à l\'intuition lorsque je prends une décision.',
    answers: [
      {
        type: 'T,Green,C',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'T,Green,C,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #14
  {
    question: 'Je prends des décisions avec mon cœur.',
    answers: [
      {
        type: 'F,Blue,B',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'F,Blue,B,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #15
  {
    question: 'J\'apprends mieux en voyant des instructions étape par étape.',
    answers: [
      {
        type: 'S,Brown,D',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'S,Brown,D,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #16
  {
    question: 'Il m\'arrive parfois de passer à une autre tâche avant d\'avoir terminé celle en cours.',
    answers: [
      {
        type: 'P,Red,A',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'P,Red,A,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #17
  {
    question: 'Je préfère une vie flexible et spontanée.',
    answers: [
      {
        type: 'P,Red,A',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'P,Red,A,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #18
  {
    question: 'J\'aime garder mes options ouvertes lors de la prise de décisions.',
    answers: [
      {
        type: 'P,Green,D',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'P,Green,D,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #19
  {
    question: 'Je me sens à l\'aise dans les foules.',
    answers: [
      {
        type: 'E,Blue,B',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'E,Blue,B,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #20
  {
    question: 'J\'aime partager mes sentiments avec les autres.',
    answers: [
      {
        type: 'E,Blue,B',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'E,Blue,B,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #21
  {
    question: 'Je préfère travailler tout de suite plutôt que de passer du temps à faire un plan.',
    answers: [
      {
        type: 'S,Brown,A',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'S,Brown,A,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #22
  {
    question: 'Je connais mes priorités.',
    answers: [
      {
        type: 'S,Brown,A',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'S,Brown,A,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #23
  {
    question: 'J\'ai tendance à travailler seul.',
    answers: [
      {
        type: 'I,Green,D',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'I,Green,D,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #24
  {
    question: 'Je n\'aime pas aller à des soirées.',
    answers: [
      {
        type: 'I,Green,C',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'I,Green,C,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #25
  {
    question: 'Je suis en harmonie avec mes émotions et je les laisse me guider dans la vie.',
    answers: [
      {
        type: 'F,Blue,B',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'F,Blue,B,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #26
  {
    question: 'Je me fie plus à mon intuition et à mon expérience qu\'aux faits.',
    answers: [
      {
        type: 'N,Red,A',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'N,Red,A,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #27
  {
    question: 'J\'aime réfléchir aux choses.',
    answers: [
      {
        type: 'T,Green,D',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'T,Green,D,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #28
  {
    question: 'Je suis un apprenant visuel.',
    answers: [
      {
        type: 'S,Red,A',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'S,Red,A,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #29
  {
    question: 'Je réfléchis soigneusement avant de prendre des décisions.',
    answers: [
      {
        type: 'J,Brown,D',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'J,Brown,D,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #30
  {
    question: 'Je me sens mal à l\'aise si mes actions perturbent l\'harmonie dans mon cercle social.',
    answers: [
      {
        type: 'F,Blue,B',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'F,Blue,B,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #31
  {
    question: 'Je mets mes opinions personnelles de côté pour rechercher l\'équité et la justice.',
    answers: [
      {
        type: 'T,Brown,C',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'T,Brown,C,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #32
  {
    question: 'J\'ai tendance à m\'asseoir au fond ou dans un coin de la pièce.',
    answers: [
      {
        type: 'I,Green,C',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'I,Green,C,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #33
  {
    question: 'J\'aime être au centre de l\'attention.',
    answers: [
      {
        type: 'E,Red,B',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'E,Red,B,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #34
  {
    question: 'Je résous les problèmes en passant rapidement d\'une idée à l\'autre.',
    answers: [
      {
        type: 'N,Green,C',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'N,Green,C,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #35
  {
    question: 'J\'aime terminer mon travail avant de jouer.',
    answers: [
      {
        type: 'J,Red,D',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'J,Red,D,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #36
  {
    question: 'Je ne laisse pas les autres influencer mes pensées ou mes actions.',
    answers: [
      {
        type: 'T,Red,A',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'T,Red,A,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #37
  {
    question: 'J\'utilise mon sens de l\'odorat pour m\'aider à me souvenir des souvenirs.',
    answers: [
      {
        type: 'N,Blue,D',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'N,Blue,D,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #38
  {
    question: 'Je prends des décisions en fonction de mes émotions.',
    answers: [
      {
        type: 'F,Blue,B',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'F,Blue,B,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #39
  {
    question: 'J\'ai besoin de temps seul pour me ressourcer.',
    answers: [
      {
        type: 'I,Green,C',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'I,Green,C,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  },
  // question #40
  {
    question: 'J\'aime garder ma chambre organisée et propre.',
    answers: [
      {
        type: 'J,Brown,D',
        content: 'OUI! C\'EST MOI!'
      },
      {
        type: ' ',
        content: 'JE N\'EN AI AUCUNE IDÉE!'
      },
      {
        type: 'J,Brown,D,No',
        content: 'NON, CE NE PEUT PAS ÊTRE MOI!'
      }
    ]
  }
]

export default personalityTestQuestion;
