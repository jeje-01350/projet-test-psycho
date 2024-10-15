let kapableQuestions = [
    {
        no: 1,
        question: "Comment est-ce que je gère mon stress ?",
        answerOptions: [
            {
                type: "A",
                answer: "Rencontrer un ami proche et discuter sans arrêt",
                score: "E",
                points: 2,
            },
            {
                type: "B",
                answer: "M'allonger dans un lit douillet et calmer mon esprit",
                score: "I",
                points: 5,
            },
        ],
    },
    {
        no: 2,
        question: "Quand je discute normalement, que se passe-t-il dans ma tête ?",
        answerOptions: [
            {
                type: "A",
                answer: "Je veux vite interrompre pour raconter mon histoire !!",
                score: "E",
                points: 2,
            },
            {
                type: "B",
                answer: "C’est fini ? Puis-je enfin parler ?",
                score: "I",
                points: 5,
            },
        ],
    },
    {
        no: 3,
        question: "Quelle situation m'agacerait le plus ?",
        answerOptions: [
            {
                type: "A",
                answer: "Je veux continuer à m’amuser, mais tout le monde veut rentrer",
                score: "E",
                points: 2,
            },
            {
                type: "B",
                answer: "Je suis fatigué et veux rentrer, mais mes amis insistent pour rester",
                score: "I",
                points: 5,
            },
        ],
    },
    {
        no: 4,
        question: "Comment j'exprime mon mécontentement ?",
        answerOptions: [
            {
                type: "A",
                answer: "Je donne des explications concrètes sur ce qui me dérange",
                score: "S",
                points: 2,
            },
            {
                type: "B",
                answer: "J’explique les raisons et les émotions que j’ai ressenties",
                score: "N",
                points: 5,
            },
        ],
    },
    {
        no: 5,
        question: "Qu'est-ce qui est plus difficile pour moi ?",
        answerOptions: [
            {
                type: "A",
                answer: "Je m’explique bien, mais j’ai du mal à conceptualiser en détail",
                score: "S",
                points: 2,
            },
            {
                type: "B",
                answer: "Je comprends bien dans ma tête, mais j’ai du mal à l’exprimer verbalement",
                score: "N",
                points: 5,
            },
        ],
    },
    {
        no: 6,
        question: "Un ami me demande : 'Tu as l'air contrarié, quelque chose ne va pas ?'",
        answerOptions: [
            {
                type: "A",
                answer: "Je parais contrarié ? Pourquoi ?",
                score: "S",
                points: 2,
            },
            {
                type: "B",
                answer: "Pourquoi il me demande ça ? Il pense que je veux me battre ?",
                score: "N",
                points: 5,
            },
        ],
    },
    {
        no: 7,
        question: "Pourquoi je ne partage pas mes préoccupations ?",
        answerOptions: [
            {
                type: "A",
                answer: "Parce que ça n'en vaut pas la peine ou je peux le résoudre seul",
                score: "T",
                points: 2,
            },
            {
                type: "B",
                answer: "Parce que je ne veux pas blesser les autres ou déclencher une dispute",
                score: "F",
                points: 5,
            },
        ],
    },
    {
        no: 8,
        question: "Dans une situation de conflit, que dit mon cœur ?",
        answerOptions: [
            {
                type: "A",
                answer: "Ne pourrais-tu pas d’abord comprendre la situation ?",
                score: "T",
                points: 2,
            },
            {
                type: "B",
                answer: "Ne pourrais-tu pas d’abord comprendre ce que je ressens ?",
                score: "F",
                points: 5,
            },
        ],
    },
    {
        no: 9,
        question: "Quand je vois un ami qui cache sa colère, je pense ?",
        answerOptions: [
            {
                type: "A",
                answer: "Ça ne me dérange pas vraiment, je laisse couler",
                score: "T",
                points: 2,
            },
            {
                type: "B",
                answer: "Je trouve cela triste et j’aimerais me fâcher à sa place",
                score: "F",
                points: 5,
            },
        ],
    },
    {
        no: 10,
        question: "Comment mes proches me perçoivent-ils ?",
        answerOptions: [
            {
                type: "A",
                answer: "Quelqu'un d'un peu rigide mais méticuleux",
                score: "J",
                points: 2,
            },
            {
                type: "B",
                answer: "Quelqu'un de libre d'esprit qui vit selon le principe 'you only live once'",
                score: "P",
                points: 5,
            },
        ],
    },
    {
        no: 11,
        question: "Quand je suis en colère ?",
        answerOptions: [
            {
                type: "A",
                answer: "Je fais d’abord ce que j’ai à faire, puis je m’énerve",
                score: "J",
                points: 2,
            },
            {
                type: "B",
                answer: "Je laisse tout de côté et m’énerve d’abord",
                score: "P",
                points: 5,
            },
        ],
    },
    {
        no: 12,
        question: "Aujourd’hui, je veux exprimer mes ressentiments accumulés !",
        answerOptions: [
            {
                type: "A",
                answer: "C’est ma décision et je n’en regretterai pas les conséquences",
                score: "J",
                points: 2,
            },
            {
                type: "B",
                answer: "Je sens que je vais regretter... peut-être que je devrais juste laisser tomber",
                score: "P",
                points: 5,
            },
        ],
    },
    {
        no: 13,
        question: "Si je vois mon partenaire de l'autre côté d'un passage piéton bondé, que fais-je ?",
        answerOptions: [
            {
                type: "A",
                answer: "Je lui crie dessus pour lui dire bonjour",
                score: "E",
                points: 2,
            },
            {
                type: "B",
                answer: "Je lui fais un petit signe de la main et j'attends le feu",
                score: "I",
                points: 5,
            },
        ],
    },
    {
        no: 14,
        question: "Que fais-je si je me retrouve dans un endroit où règne une atmosphère gênante ?",
        answerOptions: [
            {
                type: "A",
                answer: "Je réfléchis à comment détendre l'atmosphère",
                score: "E",
                points: 2,
            },
            {
                type: "B",
                answer: "Je ne pense qu'à sortir de là le plus vite possible",
                score: "I",
                points: 5,
            },
        ],
    },
    {
        no: 15,
        question: "Quand je rentre chez moi après avoir passé un moment amusant avec mon partenaire, qu'est-ce que je pense ?",
        answerOptions: [
            {
                type: "A",
                answer: "Je n’ai pas l'impression d’avoir assez profité, c'est dommage d'être déjà rentré",
                score: "E",
                points: 2,
            },
            {
                type: "B",
                answer: "C'était sympa de passer du temps avec mon partenaire, mais rien ne vaut la maison",
                score: "I",
                points: 5,
            },
        ],
    },
    {
        no: 16,
        question: "Que fais-je si mon partenaire me propose de signer un contrat de relation ?",
        answerOptions: [
            {
                type: "A",
                answer: "Je lui demande pourquoi il veut qu'on signe un tel contrat",
                score: "S",
                points: 2,
            },
            {
                type: "B",
                answer: "Je pense immédiatement à des scènes de séries et imagine des clauses appropriées",
                score: "N",
                points: 5,
            },
        ],
    },
    {
        no: 17,
        question: "Que penses-tu de l'idée d’exaucer le souhait de l'autre si l'une des clauses du contrat est enfreinte ?",
        answerOptions: [
            {
                type: "A",
                answer: "Je pense que ça pourrait être amusant de réaliser les souhaits de chacun",
                score: "S",
                points: 2,
            },
            {
                type: "B",
                answer: "Je commence déjà à imaginer ce qui se passerait si l’une des clauses était enfreinte",
                score: "N",
                points: 5,
            },
        ],
    },
    {
        no: 18,
        question: "En lisant le contrat de relation, sur quoi est-ce que je me concentre ?",
        answerOptions: [
            {
                type: "A",
                answer: "Je me concentre sur les détails concrets du contrat",
                score: "S",
                points: 2,
            },
            {
                type: "B",
                answer: "Je me concentre sur la signification des clauses du contrat",
                score: "N",
                points: 5,
            },
        ],
    },
    {
        no: 19,
        question: "Que fais-je si mon partenaire me propose de ne pas nous contacter quand l’un de nous est occupé ?",
        answerOptions: [
            {
                type: "A",
                answer: "J'accepte sans trop y penser et je suis d'accord",
                score: "T",
                points: 2,
            },
            {
                type: "B",
                answer: "Je comprends rationnellement, mais émotionnellement j'ai du mal à accepter",
                score: "F",
                points: 5,
            },
        ],
    },
    {
        no: 20,
        question: "Que fais-je si mon partenaire enfreint l'une des clauses du contrat de relation ?",
        answerOptions: [
            {
                type: "A",
                answer: "J'explique logiquement ce qui n'allait pas",
                score: "T",
                points: 2,
            },
            {
                type: "B",
                answer: "J'exprime mes sentiments blessés tout en en discutant",
                score: "F",
                points: 5,
            },
        ],
    },
    {
        no: 21,
        question: "Que fais-je si mon partenaire propose d’ajouter une clause 'Ne pas être émotionnel' au contrat ?",
        answerOptions: [
            {
                type: "A",
                answer: "Je suis d'accord sans hésiter et je dis qu'on peut l'ajouter",
                score: "T",
                points: 2,
            },
            {
                type: "B",
                answer: "Je dis que cette clause risque d’être difficile à respecter",
                score: "F",
                points: 5,
            },
        ],
    },
    {
        no: 22,
        question: "Quelle clause penses-tu qu'il serait bon d’ajouter au contrat de relation ?",
        answerOptions: [
            {
                type: "A",
                answer: "Ne pas créer de situations inattendues",
                score: "J",
                points: 2,
            },
            {
                type: "B",
                answer: "Ne pas être contraint par un emploi du temps strict",
                score: "P",
                points: 5,
            },
        ],
    },
    {
        no: 23,
        question: "Si mon partenaire me propose de nous voir alors que je rentre chez moi après une journée bien remplie, que fais-je ?",
        answerOptions: [
            {
                type: "A",
                answer: "Je dis que j'aurais aimé le voir mais qu'il aurait dû me prévenir à l’avance",
                score: "J",
                points: 2,
            },
            {
                type: "B",
                answer: "Je décide en fonction de mon état physique et mental",
                score: "P",
                points: 5,
            },
        ],
    },
    {
        no: 24,
        question: "Si je me rends compte 10 minutes avant la fin que je n'ai pas trié mes déchets, que fais-je ?",
        answerOptions: [
            {
                type: "A",
                answer: "Je me précipite pour sortir mes déchets et les trier",
                score: "J",
                points: 2,
            },
            {
                type: "B",
                answer: "Je me dis que je le ferai la prochaine fois et je fais autre chose",
                score: "P",
                points: 5,
            },
        ],
    },
];

export default kapableQuestions;
