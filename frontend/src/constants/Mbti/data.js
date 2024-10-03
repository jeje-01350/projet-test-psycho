let mbtiQuestions = [
    {
        no: 1,
        question: "Lors d'une fête, vous :",
        answerOptions: [
            {
                type: "A",
                answer: "Interagissez avec beaucoup, y compris des inconnus",
                score: "E",
            },
            {type: "B", answer: "Interagissez avec quelques personnes que vous connaissez", score: "I"},
        ],
    },
    {
        no: 2,
        question: "Êtes-vous plutôt :",
        answerOptions: [
            {type: "A", answer: "Réaliste plutôt que spéculatif", score: "S"},
            {type: "B", answer: "Spéculatif plutôt que réaliste", score: "N"},
        ],
    },
    {
        no: 3,
        question: "Est-ce pire de :",
        answerOptions: [
            {type: "A", answer: "Avoir la tête dans les nuages", score: "S"},
            {type: "B", answer: "Être dans une routine", score: "N"},
        ],
    },
    {
        no: 4,
        question: "Êtes-vous plus impressionné par :",
        answerOptions: [
            {type: "A", answer: "Les principes", score: "T"},
            {type: "B", answer: "Les émotions", score: "F"},
        ],
    },
    {
        no: 5,
        question: "Êtes-vous plus attiré par :",
        answerOptions: [
            {type: "A", answer: "Le convaincant", score: "T"},
            {type: "B", answer: "Le touchant", score: "F"},
        ],
    },
    {
        no: 6,
        question: "Préférez-vous travailler :",
        answerOptions: [
            {type: "A", answer: "Avec des délais", score: "J"},
            {type: "B", answer: "Quand bon vous semble", score: "P"},
        ],
    },
    {
        no: 7,
        question: "Avez-vous tendance à choisir :",
        answerOptions: [
            {type: "A", answer: "Plutôt soigneusement", score: "J"},
            {type: "B", answer: "Un peu impulsivement", score: "P"},
        ],
    },
    {
        no: 8,
        question: "Lors des fêtes, vous :",
        answerOptions: [
            {type: "A", answer: "Restez tard, avec de plus en plus d'énergie", score: "E"},
            {type: "B", answer: "Partez tôt avec moins d'énergie", score: "I"},
        ],
    },
    {
        no: 9,
        question: "Êtes-vous plus attiré par :",
        answerOptions: [
            {type: "A", answer: "Les gens sensés", score: "S"},
            {type: "B", answer: "Les gens imaginatifs", score: "N"},
        ],
    },
    {
        no: 10,
        question: "Êtes-vous plus intéressé par :",
        answerOptions: [
            {type: "A", answer: "Ce qui est réel", score: "S"},
            {type: "B", answer: "Ce qui est possible", score: "N"},
        ],
    },
    {
        no: 11,
        question: "Lorsque vous jugez les autres, êtes-vous plus influencé par :",
        answerOptions: [
            {type: "A", answer: "Les lois plutôt que les circonstances", score: "T"},
            {type: "B", answer: "Les circonstances plutôt que les lois", score: "F"},
        ],
    },
    {
        no: 12,
        question: "En approchant les autres, votre inclination est-elle de :",
        answerOptions: [
            {type: "A", answer: "Être objectif", score: "T"},
            {type: "B", answer: "Être personnel", score: "F"},
        ],
    },
    {
        no: 13,
        question: "Êtes-vous plutôt :",
        answerOptions: [
            {type: "A", answer: "Ponctuel", score: "J"},
            {type: "B", answer: "Détendu", score: "P"},
        ],
    },
    {
        no: 14,
        question: "Cela vous dérange-t-il plus d'avoir des choses :",
        answerOptions: [
            {type: "A", answer: "Inachevées", score: "J"},
            {type: "B", answer: "Terminées", score: "P"},
        ],
    },
    {
        no: 15,
        question: "Dans vos groupes sociaux, vous :",
        answerOptions: [
            {type: "A", answer: "Restez à jour sur les événements des autres", score: "E"},
            {type: "B", answer: "Prenez du retard sur les nouvelles", score: "I"},
        ],
    },
    {
        no: 16,
        question: "En faisant des choses ordinaires, êtes-vous plus susceptible de :",
        answerOptions: [
            {type: "A", answer: "Faire les choses de manière habituelle", score: "S"},
            {type: "B", answer: "Faire les choses à votre manière", score: "N"},
        ],
    },
    {
        no: 17,
        question: "Les écrivains devraient :",
        answerOptions: [
            {
                type: "A",
                answer: "Dire ce qu'ils pensent et penser ce qu'ils disent",
                score: "S",
            },
            {
                type: "B",
                answer: "Exprimer les choses plus par analogie",
                score: "N",
            },
        ],
    },
    {
        no: 18,
        question: "Qu'est-ce qui vous attire le plus :",
        answerOptions: [
            {type: "A", answer: "La cohérence de la pensée", score: "T"},
            {type: "B", answer: "Des relations humaines harmonieuses", score: "F"},
        ],
    },
    {
        no: 19,
        question: "Êtes-vous plus à l'aise pour prendre :",
        answerOptions: [
            {type: "A", answer: "Des jugements logiques", score: "T"},
            {type: "B", answer: "Des jugements de valeur", score: "F"},
        ],
    },
    {
        no: 20,
        question: "Voulez-vous que les choses soient :",
        answerOptions: [
            {type: "A", answer: "Réglées et décidées", score: "J"},
            {type: "B", answer: "Indécises et non réglées", score: "P"},
        ],
    },
    {
        no: 21,
        question: "Diriez-vous que vous êtes plus :",
        answerOptions: [
            {type: "A", answer: "Sérieux et déterminé", score: "J"},
            {type: "B", answer: "Facile à vivre", score: "P"},
        ],
    },
    {
        no: 22,
        question: "Lorsque vous téléphonez, vous :",
        answerOptions: [
            {
                type: "A",
                answer: "Doutez rarement que tout sera dit",
                score: "E",
            },
            {type: "B", answer: "Répétez ce que vous allez dire", score: "I"},
        ],
    },
    {
        no: 23,
        question: "Les faits :",
        answerOptions: [
            {type: "A", answer: "Parlent d'eux-mêmes", score: "S"},
            {type: "B", answer: "Illustrent des principes", score: "N"},
        ],
    },
    {
        no: 24,
        question: "Les visionnaires sont-ils :",
        answerOptions: [
            {type: "A", answer: "Un peu agaçants", score: "S"},
            {type: "B", answer: "Plutôt fascinants", score: "N"},
        ],
    },
    {
        no: 25,
        question: "Êtes-vous plus souvent :",
        answerOptions: [
            {type: "A", answer: "Une personne à la tête froide", score: "T"},
            {type: "B", answer: "Une personne chaleureuse", score: "F"},
        ],
    },
    {
        no: 26,
        question: "Est-il pire d'être :",
        answerOptions: [
            {type: "A", answer: "Injuste", score: "T"},
            {type: "B", answer: "Sans pitié", score: "F"},
        ],
    },
    {
        no: 27,
        question: "Faut-il généralement laisser les événements se dérouler :",
        answerOptions: [
            {type: "A", answer: "Par sélection et choix minutieux", score: "J"},
            {type: "B", answer: "De manière aléatoire et par hasard", score: "P"},
        ],
    },
    {
        no: 28,
        question: "Êtes-vous plus satisfait d'avoir :",
        answerOptions: [
            {type: "A", answer: "Acheté quelque chose", score: "J"},
            {type: "B", answer: "La possibilité d'acheter", score: "P"},
        ],
    },
    {
        no: 29,
        question: "En compagnie, vous :",
        answerOptions: [
            {type: "A", answer: "Initiez la conversation", score: "E"},
            {type: "B", answer: "Attendez d'être approché", score: "I"},
        ],
    },
    {
        no: 30,
        question: "Le bon sens est-il :",
        answerOptions: [
            {type: "A", answer: "Rarement discutable", score: "S"},
            {type: "B", answer: "Fréquemment discutable", score: "N"},
        ],
    },
    {
        no: 31,
        question: "Les enfants ne font souvent pas :",
        answerOptions: [
            {type: "A", answer: "Assez pour se rendre utiles", score: "S"},
            {type: "B", answer: "Assez pour exercer leur imagination", score: "N"},
        ],
    },
    {
        no: 32,
        question: "Lorsque vous prenez des décisions, êtes-vous plus à l'aise avec :",
        answerOptions: [
            {type: "A", answer: "Des normes", score: "T"},
            {type: "B", answer: "Des sentiments", score: "F"},
        ],
    },
    {
        no: 33,
        question: "Êtes-vous plutôt :",
        answerOptions: [
            {type: "A", answer: "Ferme plutôt que doux", score: "T"},
            {type: "B", answer: "Doux plutôt que ferme", score: "F"},
        ],
    },
    {
        no: 34,
        question: "Qu'est-ce qui est plus admirable :",
        answerOptions: [
            {
                type: "A",
                answer: "La capacité à organiser et être méthodique",
                score: "J",
            },
            {type: "B", answer: "La capacité à s'adapter et à improviser", score: "P"},
        ],
    },
    {
        no: 35,
        question: "Accordez-vous plus de valeur à :",
        answerOptions: [
            {type: "A", answer: "L'infini", score: "J"},
            {type: "B", answer: "L'ouverture d'esprit", score: "P"},
        ],
    },
    {
        no: 36,
        question: "Une interaction nouvelle et non routinière avec les autres vous :",
        answerOptions: [
            {type: "A", answer: "Stimule et vous énergise", score: "E"},
            {type: "B", answer: "Vous épuise", score: "I"},
        ],
    },
    {
        no: 37,
        question: "Êtes-vous plus fréquemment :",
        answerOptions: [
            {type: "A", answer: "Une personne pratique", score: "S"},
            {type: "B", answer: "Une personne imaginative", score: "N"},
        ],
    },
    {
        no: 38,
        question: "Êtes-vous plus susceptible de :",
        answerOptions: [
            {type: "A", answer: "Voir comment les autres sont utiles", score: "S"},
            {type: "B", answer: "Voir ce que les autres voient", score: "N"},
        ],
    },
    {
        no: 39,
        question: "Qu'est-ce qui est plus satisfaisant :",
        answerOptions: [
            {type: "A", answer: "Discuter d'un problème en profondeur", score: "T"},
            {type: "B", answer: "Parvenir à un accord sur un problème", score: "F"},
        ],
    },
    {
        no: 40,
        question: "Qu'est-ce qui vous gouverne davantage :",
        answerOptions: [
            {type: "A", answer: "Votre tête", score: "T"},
            {type: "B", answer: "Votre cœur", score: "F"},
        ],
    },
    {
        no: 41,
        question: "Êtes-vous plus à l'aise avec un travail qui est :",
        answerOptions: [
            {type: "A", answer: "Contracté", score: "J"},
            {type: "B", answer: "Fait de manière informelle", score: "P"},
        ],
    },
    {
        no: 42,
        question: "Avez-vous tendance à chercher :",
        answerOptions: [
            {type: "A", answer: "L'ordre", score: "J"},
            {type: "B", answer: "Ce qui se présente", score: "P"},
        ],
    },
    {
        no: 43,
        question: "Préférez-vous :",
        answerOptions: [
            {type: "A", answer: "Beaucoup d'amis avec un contact bref", score: "E"},
            {
                type: "B",
                answer: "Quelques amis avec des contacts plus longs",
                score: "I",
            },
        ],
    },
    {
        no: 44,
        question: "Fondez-vous davantage vos décisions sur :",
        answerOptions: [
            {type: "A", answer: "Les faits", score: "S"},
            {type: "B", answer: "Les principes", score: "N"},
        ],
    },
    {
        no: 45,
        question: "Êtes-vous plus intéressé par :",
        answerOptions: [
            {type: "A", answer: "La production et la distribution", score: "S"},
            {type: "B", answer: "La conception et la recherche", score: "N"},
        ],
    },
    {
        no: 46,
        question: "Quel compliment est plus flatteur :",
        answerOptions: [
            {type: "A", answer: "“C'est une personne très logique”", score: "T"},
            {type: "B", answer: "“C'est une personne très sentimentale”", score: "F"},
        ],
    },
    {
        no: 47,
        question: "Appréciez-vous plus en vous-même d'être :",
        answerOptions: [
            {type: "A", answer: "Inflexible", score: "T"},
            {type: "B", answer: "Dévoué", score: "F"},
        ],
    },
    {
        no: 48,
        question: "Préférez-vous plus souvent :",
        answerOptions: [
            {type: "A", answer: "Une déclaration finale et irrévocable", score: "J"},
            {type: "B", answer: "Une déclaration provisoire et préliminaire", score: "P"},
        ],
    },
    {
        no: 49,
        question: "Êtes-vous plus à l'aise :",
        answerOptions: [
            {type: "A", answer: "Après une décision", score: "J"},
            {type: "B", answer: "Avant une décision", score: "P"},
        ],
    },
    {
        no: 50,
        question: "Vous :",
        answerOptions: [
            {
                type: "A",
                answer: "Parlez facilement et longuement avec des inconnus",
                score: "E",
            },
            {type: "B", answer: "Avez peu à dire aux inconnus", score: "I"},
        ],
    },
    {
        no: 51,
        question: "Avez-vous plus tendance à faire confiance à votre :",
        answerOptions: [
            {type: "A", answer: "Expérience", score: "S"},
            {type: "B", answer: "Intuition", score: "N"},
        ],
    },
    {
        no: 52,
        question: "Vous sentez-vous :",
        answerOptions: [
            {type: "A", answer: "Plus pratique que ingénieux", score: "S"},
            {type: "B", answer: "Plus ingénieux que pratique", score: "N"},
        ],
    },
    {
        no: 53,
        question: "Quelle personne mérite plus un compliment :",
        answerOptions: [
            {type: "A", answer: "Une personne de raison claire", score: "T"},
            {type: "B", answer: "Une personne de forts sentiments", score: "F"},
        ],
    },
    {
        no: 54,
        question: "Êtes-vous plus enclin à être :",
        answerOptions: [
            {type: "A", answer: "Équitable", score: "T"},
            {type: "B", answer: "Sympathique", score: "F"},
        ],
    },
    {
        no: 55,
        question: "Est-il préférable principalement de :",
        answerOptions: [
            {type: "A", answer: "S'assurer que les choses sont organisées", score: "J"},
            {type: "B", answer: "Laisser les choses se faire", score: "P"},
        ],
    },
    {
        no: 56,
        question: "Dans les relations, la plupart des choses doivent-elles être :",
        answerOptions: [
            {type: "A", answer: "Renégociables", score: "J"},
            {type: "B", answer: "Aléatoires et circonstancielles", score: "P"},
        ],
    },
    {
        no: 57,
        question: "Lorsque le téléphone sonne, vous :",
        answerOptions: [
            {type: "A", answer: "Vous empressez de décrocher", score: "E"},
            {type: "B", answer: "Espérez que quelqu'un d'autre décroche", score: "I"},
        ],
    },
    {
        no: 58,
        question: "Vous estimez davantage en vous :",
        answerOptions: [
            {type: "A", answer: "Un sens aigu de la réalité", score: "S"},
            {type: "B", answer: "Une imagination vive", score: "N"},
        ],
    },
    {
        no: 59,
        question: "Êtes-vous plus attiré par :",
        answerOptions: [
            {type: "A", answer: "Les fondamentaux", score: "S"},
            {type: "B", answer: "Les nuances", score: "N"},
        ],
    },
    {
        no: 60,
        question: "Quelle semble être la plus grande erreur :",
        answerOptions: [
            {type: "A", answer: "Être trop passionné", score: "T"},
            {type: "B", answer: "Être trop objectif", score: "F"},
        ],
    },
    {
        no: 61,
        question: "Vous voyez-vous fondamentalement comme :",
        answerOptions: [
            {type: "A", answer: "Dur d'esprit", score: "T"},
            {type: "B", answer: "Douceur de cœur", score: "F"},
        ],
    },
    {
        no: 62,
        question: "Quelle situation vous plaît le plus :",
        answerOptions: [
            {type: "A", answer: "Structurée et planifiée", score: "J"},
            {type: "B", answer: "Non structurée et non planifiée", score: "P"},
        ],
    },
    {
        no: 63,
        question: "Êtes-vous une personne plus :",
        answerOptions: [
            {type: "A", answer: "Routinière que fantaisiste", score: "J"},
            {type: "B", answer: "Fantaisiste que routinière", score: "P"},
        ],
    },
    {
        no: 64,
        question: "Êtes-vous plus enclin à être :",
        answerOptions: [
            {type: "A", answer: "Facile à aborder", score: "E"},
            {type: "B", answer: "Plutôt réservé", score: "I"},
        ],
    },
    {
        no: 65,
        question: "Dans les écrits, préférez-vous :",
        answerOptions: [
            {type: "A", answer: "Le plus littéral", score: "S"},
            {type: "B", answer: "Le plus figuratif", score: "N"},
        ],
    },
    {
        no: 66,
        question: "Est-il plus difficile pour vous de :",
        answerOptions: [
            {type: "A", answer: "Vous identifier aux autres", score: "S"},
            {type: "B", answer: "Utiliser les autres", score: "N"},
        ],
    },
    {
        no: 67,
        question: "Que souhaitez-vous le plus pour vous-même :",
        answerOptions: [
            {type: "A", answer: "La clarté de la raison", score: "T"},
            {type: "B", answer: "La force de la compassion", score: "F"},
        ],
    },
    {
        no: 68,
        question: "Quel est le plus grand défaut :",
        answerOptions: [
            {type: "A", answer: "Être trop passionné", score: "T"},
            {type: "B", answer: "Être trop critique", score: "F"},
        ],
    },
    {
        no: 69,
        question: "Préférez-vous l'événement :",
        answerOptions: [
            {type: "A", answer: "Planifié", score: "J"},
            {type: "B", answer: "Non planifié", score: "P"},
        ],
    },
    {
        no: 70,
        question: "Avez-vous tendance à être plus :",
        answerOptions: [
            {type: "A", answer: "Délibéré que spontané", score: "J"},
            {type: "B", answer: "Spontané que délibéré", score: "P"},
        ],
    },
];

export default mbtiQuestions;
