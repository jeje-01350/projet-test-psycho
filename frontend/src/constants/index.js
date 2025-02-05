import personalityTestQuestion from "./Personality/data.js";
import mbti_personalities from "./mbti";

export { mbti_personalities, personalityTestQuestion };

export const bigFiveQuestions = [
  {
    question: "Je me vois comme quelqu'un qui...",
    answers: [
      {
        content: "Est bavard, sociable et à l'aise avec les autres",
        type: "E",
        score: 5
      },
      {
        content: "Est plutôt réservé et préfère la solitude",
        type: "E",
        score: 1
      }
    ]
  },
  {
    question: "Face aux nouvelles expériences, je suis généralement...",
    answers: [
      {
        content: "Curieux et enthousiaste d'essayer de nouvelles choses",
        type: "O",
        score: 5
      },
      {
        content: "Prudent et préfère m'en tenir à ce que je connais",
        type: "O",
        score: 1
      }
    ]
  },
  {
    question: "Dans mon travail et mes engagements, je suis...",
    answers: [
      {
        content: "Organisé et méthodique, je planifie à l'avance",
        type: "C",
        score: 5
      },
      {
        content: "Flexible et spontané, je m'adapte au fur et à mesure",
        type: "C",
        score: 1
      }
    ]
  },
  {
    question: "Dans mes relations avec les autres, je suis plutôt...",
    answers: [
      {
        content: "Attentionné et sensible aux besoins des autres",
        type: "A",
        score: 5
      },
      {
        content: "Direct et franc, même si cela peut parfois blesser",
        type: "A",
        score: 1
      }
    ]
  },
  {
    question: "Face au stress, je...",
    answers: [
      {
        content: "Reste généralement calme et stable émotionnellement",
        type: "N",
        score: 1
      },
      {
        content: "Deviens facilement anxieux et inquiet",
        type: "N",
        score: 5
      }
    ]
  },
  {
    question: "En groupe, je préfère généralement...",
    answers: [
      {
        content: "Prendre la parole et diriger les discussions",
        type: "E",
        score: 5
      },
      {
        content: "Écouter et observer avant de m'exprimer",
        type: "E",
        score: 1
      }
    ]
  },
  {
    question: "Face aux idées et concepts abstraits, je suis...",
    answers: [
      {
        content: "Passionné et j'aime explorer différentes théories",
        type: "O",
        score: 5
      },
      {
        content: "Pragmatique et je préfère les faits concrets",
        type: "O",
        score: 1
      }
    ]
  },
  {
    question: "Dans la réalisation de mes objectifs...",
    answers: [
      {
        content: "Je suis persévérant et déterminé jusqu'au bout",
        type: "C",
        score: 5
      },
      {
        content: "Je peux parfois me laisser distraire ou abandonner",
        type: "C",
        score: 1
      }
    ]
  },
  {
    question: "En cas de conflit, je tends à...",
    answers: [
      {
        content: "Chercher le compromis et l'harmonie",
        type: "A",
        score: 5
      },
      {
        content: "Défendre fermement mon point de vue",
        type: "A",
        score: 1
      }
    ]
  },
  {
    question: "Face aux changements imprévus, je...",
    answers: [
      {
        content: "Garde mon calme et m'adapte facilement",
        type: "N",
        score: 1
      },
      {
        content: "Me sens souvent déstabilisé et stressé",
        type: "N",
        score: 5
      }
    ]
  }
];

export const resilienceQuestions = [
  {
    question: "Face à un changement inattendu, je m'adapte facilement",
    answers: [
      { content: "Oui, tout à fait", type: "AD", score: 3 },
      { content: "Neutre", type: "AD", score: 2 },
      { content: "Non, pas d'accord", type: "AD", score: 1 }
    ]
  },
  {
    question: "Je trouve généralement des solutions à mes problèmes",
    answers: [
      { content: "Oui, tout à fait", type: "PR", score: 3 },
      { content: "Neutre", type: "PR", score: 2 },
      { content: "Non, pas d'accord", type: "PR", score: 1 }
    ]
  },
  {
    question: "Je gère bien mes émotions en situation de stress",
    answers: [
      { content: "Oui, tout à fait", type: "EM", score: 3 },
      { content: "Neutre", type: "EM", score: 2 },
      { content: "Non, pas d'accord", type: "EM", score: 1 }
    ]
  },
  {
    question: "Je sais vers qui me tourner quand j'ai besoin d'aide",
    answers: [
      { content: "Oui, tout à fait", type: "SS", score: 3 },
      { content: "Neutre", type: "SS", score: 2 },
      { content: "Non, pas d'accord", type: "SS", score: 1 }
    ]
  },
  {
    question: "J'ai confiance en ma capacité à surmonter les difficultés",
    answers: [
      { content: "Oui, tout à fait", type: "SC", score: 3 },
      { content: "Neutre", type: "SC", score: 2 },
      { content: "Non, pas d'accord", type: "SC", score: 1 }
    ]
  },
  {
    question: "Je vois les changements comme des opportunités",
    answers: [
      { content: "Oui, tout à fait", type: "AD", score: 3 },
      { content: "Neutre", type: "AD", score: 2 },
      { content: "Non, pas d'accord", type: "AD", score: 1 }
    ]
  },
  {
    question: "Face à un obstacle, je persévère jusqu'à trouver une solution",
    answers: [
      { content: "Oui, tout à fait", type: "PR", score: 3 },
      { content: "Neutre", type: "PR", score: 2 },
      { content: "Non, pas d'accord", type: "PR", score: 1 }
    ]
  },
  {
    question: "Je reste calme même dans les situations difficiles",
    answers: [
      { content: "Oui, tout à fait", type: "EM", score: 3 },
      { content: "Neutre", type: "EM", score: 2 },
      { content: "Non, pas d'accord", type: "EM", score: 1 }
    ]
  },
  {
    question: "J'entretiens des relations positives avec mon entourage",
    answers: [
      { content: "Oui, tout à fait", type: "SS", score: 3 },
      { content: "Neutre", type: "SS", score: 2 },
      { content: "Non, pas d'accord", type: "SS", score: 1 }
    ]
  },
  {
    question: "Je crois en mes capacités à réussir",
    answers: [
      { content: "Oui, tout à fait", type: "SC", score: 3 },
      { content: "Neutre", type: "SC", score: 2 },
      { content: "Non, pas d'accord", type: "SC", score: 1 }
    ]
  }
];

export const emotionalIntelligenceQuestions = [
  {
    question: "Je suis capable d'identifier mes émotions au moment où je les ressens",
    answers: [
      { content: "Tout à fait d'accord", type: "SA", score: 3 },
      { content: "Plutôt d'accord", type: "SA", score: 2 },
      { content: "Pas vraiment d'accord", type: "SA", score: 1 }
    ]
  },
  {
    question: "Je peux gérer mes émotions négatives de manière constructive",
    answers: [
      { content: "Tout à fait d'accord", type: "EM", score: 3 },
      { content: "Plutôt d'accord", type: "EM", score: 2 },
      { content: "Pas vraiment d'accord", type: "EM", score: 1 }
    ]
  },
  {
    question: "Je perçois facilement les émotions des autres",
    answers: [
      { content: "Tout à fait d'accord", type: "SOA", score: 3 },
      { content: "Plutôt d'accord", type: "SOA", score: 2 },
      { content: "Pas vraiment d'accord", type: "SOA", score: 1 }
    ]
  },
  {
    question: "Je sais adapter ma communication en fonction de mon interlocuteur",
    answers: [
      { content: "Tout à fait d'accord", type: "RM", score: 3 },
      { content: "Plutôt d'accord", type: "RM", score: 2 },
      { content: "Pas vraiment d'accord", type: "RM", score: 1 }
    ]
  },
  {
    question: "Je prends en compte mes émotions dans mes prises de décision",
    answers: [
      { content: "Tout à fait d'accord", type: "DM", score: 3 },
      { content: "Plutôt d'accord", type: "DM", score: 2 },
      { content: "Pas vraiment d'accord", type: "DM", score: 1 }
    ]
  },
  {
    question: "Je comprends l'origine de mes réactions émotionnelles",
    answers: [
      { content: "Tout à fait d'accord", type: "SA", score: 3 },
      { content: "Plutôt d'accord", type: "SA", score: 2 },
      { content: "Pas vraiment d'accord", type: "SA", score: 1 }
    ]
  },
  {
    question: "Je reste calme sous pression",
    answers: [
      { content: "Tout à fait d'accord", type: "EM", score: 3 },
      { content: "Plutôt d'accord", type: "EM", score: 2 },
      { content: "Pas vraiment d'accord", type: "EM", score: 1 }
    ]
  },
  {
    question: "Je suis attentif au langage non-verbal des autres",
    answers: [
      { content: "Tout à fait d'accord", type: "SOA", score: 3 },
      { content: "Plutôt d'accord", type: "SOA", score: 2 },
      { content: "Pas vraiment d'accord", type: "SOA", score: 1 }
    ]
  },
  {
    question: "Je sais gérer les conflits de manière constructive",
    answers: [
      { content: "Tout à fait d'accord", type: "RM", score: 3 },
      { content: "Plutôt d'accord", type: "RM", score: 2 },
      { content: "Pas vraiment d'accord", type: "RM", score: 1 }
    ]
  },
  {
    question: "J'évalue les conséquences émotionnelles de mes décisions",
    answers: [
      { content: "Tout à fait d'accord", type: "DM", score: 3 },
      { content: "Plutôt d'accord", type: "DM", score: 2 },
      { content: "Pas vraiment d'accord", type: "DM", score: 1 }
    ]
  }
];

export const discQuestions = [
  {
    question: "Dans une situation professionnelle, je suis plutôt quelqu'un qui...",
    answers: [
      { content: "Prend rapidement les choses en main", type: "D", score: 3 },
      { content: "Communique avec enthousiasme", type: "I", score: 3 },
      { content: "Soutient et aide les autres", type: "S", score: 3 },
      { content: "Suit les procédures avec précision", type: "C", score: 3 }
    ]
  },
  {
    question: "Face à un défi, je préfère...",
    answers: [
      { content: "Aller droit au but et agir", type: "D", score: 3 },
      { content: "Impliquer les autres et partager les idées", type: "I", score: 3 },
      { content: "Prendre le temps de bien réfléchir", type: "S", score: 3 },
      { content: "Analyser tous les détails", type: "C", score: 3 }
    ]
  },
  {
    question: "Dans un projet d'équipe, je suis souvent celui/celle qui...",
    answers: [
      { content: "Fixe les objectifs et dirige", type: "D", score: 3 },
      { content: "Motive et encourage les autres", type: "I", score: 3 },
      { content: "Maintient l'harmonie dans l'équipe", type: "S", score: 3 },
      { content: "Vérifie la qualité et la précision", type: "C", score: 3 }
    ]
  },
  {
    question: "Quand je communique, j'ai tendance à être...",
    answers: [
      { content: "Direct et concis", type: "D", score: 3 },
      { content: "Expressif et enthousiaste", type: "I", score: 3 },
      { content: "Patient et attentif", type: "S", score: 3 },
      { content: "Précis et détaillé", type: "C", score: 3 }
    ]
  },
  {
    question: "Face au changement, je suis généralement...",
    answers: [
      { content: "Proactif et initiateur", type: "D", score: 3 },
      { content: "Optimiste et flexible", type: "I", score: 3 },
      { content: "Prudent et progressif", type: "S", score: 3 },
      { content: "Analytique et méthodique", type: "C", score: 3 }
    ]
  },
  {
    question: "Dans la prise de décision, je privilégie...",
    answers: [
      { content: "La rapidité et l'efficacité", type: "D", score: 3 },
      { content: "L'impact sur les personnes", type: "I", score: 3 },
      { content: "Le consensus et la stabilité", type: "S", score: 3 },
      { content: "La logique et la précision", type: "C", score: 3 }
    ]
  },
  {
    question: "Face au stress, j'ai tendance à...",
    answers: [
      { content: "Prendre le contrôle et agir", type: "D", score: 3 },
      { content: "Parler et extérioriser", type: "I", score: 3 },
      { content: "Rester calme et patient", type: "S", score: 3 },
      { content: "Me concentrer sur les faits", type: "C", score: 3 }
    ]
  },
  {
    question: "Dans mon environnement de travail, je préfère...",
    answers: [
      { content: "Avoir des défis et de l'autonomie", type: "D", score: 3 },
      { content: "Interagir et collaborer", type: "I", score: 3 },
      { content: "Avoir un cadre stable et prévisible", type: "S", score: 3 },
      { content: "Suivre des processus structurés", type: "C", score: 3 }
    ]
  },
  {
    question: "Face à un conflit, je tends à...",
    answers: [
      { content: "Affronter directement le problème", type: "D", score: 3 },
      { content: "Négocier et trouver un compromis", type: "I", score: 3 },
      { content: "Chercher l'harmonie et la paix", type: "S", score: 3 },
      { content: "Rester objectif et factuel", type: "C", score: 3 }
    ]
  },
  {
    question: "Dans un nouveau projet, je me concentre sur...",
    answers: [
      { content: "Les résultats et l'efficacité", type: "D", score: 3 },
      { content: "Les opportunités et la créativité", type: "I", score: 3 },
      { content: "La planification et la coordination", type: "S", score: 3 },
      { content: "La structure et l'organisation", type: "C", score: 3 }
    ]
  }
];
