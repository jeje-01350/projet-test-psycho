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
