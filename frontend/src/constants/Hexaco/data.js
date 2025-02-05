export const hexacoQuestions = [
  {
    question: "Dans mes relations avec les autres...",
    answers: [
      {
        content: "Je suis toujours honnête, même si cela peut me désavantager",
        type: "H",
        score: 5
      },
      {
        content: "Je peux parfois adapter la vérité selon la situation",
        type: "H",
        score: 1
      }
    ]
  },
  {
    question: "Face à une situation stressante...",
    answers: [
      {
        content: "Je ressens facilement de l'anxiété et de l'inquiétude",
        type: "E",
        score: 5
      },
      {
        content: "Je reste généralement calme et serein",
        type: "E",
        score: 1
      }
    ]
  },
  {
    question: "En groupe...",
    answers: [
      {
        content: "J'aime être au centre de l'attention et animer les discussions",
        type: "X",
        score: 5
      },
      {
        content: "Je préfère observer et écouter les autres",
        type: "X",
        score: 1
      }
    ]
  },
  {
    question: "Quand quelqu'un me contrarie...",
    answers: [
      {
        content: "Je pardonne facilement et cherche à comprendre son point de vue",
        type: "A",
        score: 5
      },
      {
        content: "J'ai tendance à garder rancune et à m'en souvenir longtemps",
        type: "A",
        score: 1
      }
    ]
  },
  {
    question: "Dans mon travail...",
    answers: [
      {
        content: "Je suis très organisé et méticuleux dans mes tâches",
        type: "C",
        score: 5
      },
      {
        content: "Je préfère être flexible et m'adapter au fur et à mesure",
        type: "C",
        score: 1
      }
    ]
  },
  {
    question: "Face aux nouvelles idées...",
    answers: [
      {
        content: "Je suis curieux et j'aime explorer des concepts inhabituels",
        type: "O",
        score: 5
      },
      {
        content: "Je préfère m'en tenir aux méthodes éprouvées",
        type: "O",
        score: 1
      }
    ]
  },
  {
    question: "Dans mes interactions sociales...",
    answers: [
      {
        content: "Je reste modeste et évite de me mettre en avant",
        type: "H",
        score: 5
      },
      {
        content: "J'aime montrer mes réussites et mes qualités",
        type: "H",
        score: 1
      }
    ]
  },
  {
    question: "Face à une situation émotionnelle...",
    answers: [
      {
        content: "Je suis très sensible aux émotions des autres",
        type: "E",
        score: 5
      },
      {
        content: "Je reste détaché et objectif",
        type: "E",
        score: 1
      }
    ]
  },
  {
    question: "Dans les conversations...",
    answers: [
      {
        content: "Je suis énergique et expressif",
        type: "X",
        score: 5
      },
      {
        content: "Je suis calme et posé",
        type: "X",
        score: 1
      }
    ]
  },
  {
    question: "En cas de désaccord...",
    answers: [
      {
        content: "Je cherche toujours le compromis et l'harmonie",
        type: "A",
        score: 5
      },
      {
        content: "Je défends fermement ma position",
        type: "A",
        score: 1
      }
    ]
  }
];

export const hexacoDescriptions = {
  H: {
    title: "Honnêteté-Humilité",
    high: "Vous avez tendance à être sincère, juste et humble dans vos relations avec les autres. Vous évitez de manipuler les autres pour votre gain personnel et n'êtes pas particulièrement intéressé par le luxe ou le statut social.",
    low: "Vous pouvez parfois être tenté de contourner les règles pour votre avantage personnel et vous accordez de l'importance au statut social et aux biens matériels."
  },
  E: {
    title: "Émotionnalité",
    high: "Vous êtes sensible émotionnellement, empathique et attaché aux autres. Vous ressentez facilement l'anxiété face au stress et recherchez le soutien émotionnel.",
    low: "Vous êtes généralement détaché émotionnellement, moins anxieux et plus indépendant dans la gestion de vos émotions."
  },
  X: {
    title: "Extraversion",
    high: "Vous êtes sociable, énergique et à l'aise en groupe. Vous recherchez les interactions sociales et l'animation.",
    low: "Vous êtes plus réservé, calme et préférez les activités solitaires ou en petit groupe."
  },
  A: {
    title: "Agréabilité",
    high: "Vous êtes patient, tolérant et facile à vivre. Vous cherchez à maintenir l'harmonie et pardonnez facilement.",
    low: "Vous êtes plus critique, direct et pouvez être moins conciliant dans vos relations avec les autres."
  },
  C: {
    title: "Conscience",
    high: "Vous êtes organisé, discipliné et minutieux dans vos tâches. Vous planifiez à l'avance et êtes fiable.",
    low: "Vous êtes plus spontané, flexible et parfois moins structuré dans votre approche du travail."
  },
  O: {
    title: "Ouverture à l'expérience",
    high: "Vous êtes curieux, créatif et ouvert aux nouvelles idées. Vous appréciez l'art, la culture et les expériences inhabituelles.",
    low: "Vous préférez la familiarité, les méthodes éprouvées et êtes plus conventionnel dans vos goûts."
  }
}; 