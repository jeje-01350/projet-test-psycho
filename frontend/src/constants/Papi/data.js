let papiQuestions = [
    {
        no: 1,
        question: "Lorsque vous démarrez une nouvelle tâche, vous :",
        answerOptions: [
            { type: "A", answer: "Préférez savoir précisément ce qui doit être fait avant de commencer", score: "Organisation" },
            { type: "B", answer: "Vous lancez rapidement pour ajuster les détails en cours de route", score: "Initiative" },
        ],
    },
    {
        no: 2,
        question: "Dans une situation de conflit avec un collègue, vous :",
        answerOptions: [
            { type: "A", answer: "Cherchez rapidement une solution pour apaiser la situation", score: "Collaboration" },
            { type: "B", answer: "Préférez discuter en profondeur des raisons du conflit", score: "Flexibilité" },
        ],
    },
    {
        no: 3,
        question: "Lorsqu'un projet complexe vous est confié, vous :",
        answerOptions: [
            { type: "A", answer: "Structurez un plan détaillé avec des étapes claires", score: "Organisation" },
            { type: "B", answer: "Commencez à travailler immédiatement pour tester différentes approches", score: "Créativité" },
        ],
    },
    {
        no: 4,
        question: "Dans votre équipe de travail, vous préférez :",
        answerOptions: [
            { type: "A", answer: "Avoir un rôle clairement défini avec des responsabilités précises", score: "Organisation" },
            { type: "B", answer: "Avoir la liberté d'explorer plusieurs tâches différentes", score: "Autonomie" },
        ],
    },
    {
        no: 5,
        question: "Quand vous devez respecter une échéance, vous :",
        answerOptions: [
            { type: "A", answer: "Travaillez régulièrement pour terminer à temps", score: "Routine" },
            { type: "B", answer: "Accélérez votre travail à mesure que l'échéance approche", score: "Initiative" },
        ],
    },
    {
        no: 6,
        question: "Lorsque vous travaillez en équipe, vous :",
        answerOptions: [
            { type: "A", answer: "Préférez diriger et organiser les activités", score: "Leadership" },
            { type: "B", answer: "Préférez suivre les instructions et contribuer discrètement", score: "Collaboration" },
        ],
    },
    {
        no: 7,
        question: "Face à un nouveau problème à résoudre, vous :",
        answerOptions: [
            { type: "A", answer: "Vous concentrez sur des solutions pratiques", score: "Organisation" },
            { type: "B", answer: "Essayez de comprendre le problème dans son ensemble avant d'agir", score: "Flexibilité" },
        ],
    },
    {
        no: 8,
        question: "Lorsqu'on vous demande votre avis sur un projet, vous :",
        answerOptions: [
            { type: "A", answer: "Exprimez immédiatement ce que vous pensez", score: "Initiative" },
            { type: "B", answer: "Réfléchissez avant de donner une réponse mesurée", score: "Autonomie" },
        ],
    },
    {
        no: 9,
        question: "Pour être efficace dans votre travail, vous avez besoin :",
        answerOptions: [
            { type: "A", answer: "D'un cadre structuré et d'instructions claires", score: "Organisation" },
            { type: "B", answer: "De flexibilité et de liberté d'action", score: "Autonomie" },
        ],
    },
    {
        no: 10,
        question: "Lors de l'attribution d'une nouvelle tâche, vous :",
        answerOptions: [
            { type: "A", answer: "Aimez collaborer avec les autres pour l'accomplir", score: "Collaboration" },
            { type: "B", answer: "Préférez travailler seul à votre propre rythme", score: "Autonomie" },
        ],
    },
    {
        no: 11,
        question: "Lorsque vous planifiez vos journées de travail, vous :",
        answerOptions: [
            { type: "A", answer: "Préférez respecter un emploi du temps rigoureux", score: "Routine" },
            { type: "B", answer: "Aimez laisser de la place à des ajustements selon les circonstances", score: "Flexibilité" },
        ],
    },
    {
        no: 12,
        question: "Face à une tâche répétitive, vous :",
        answerOptions: [
            { type: "A", answer: "Appréciez la constance et la stabilité", score: "Routine" },
            { type: "B", answer: "Cherchez des moyens de varier ou d'améliorer la tâche", score: "Créativité" },
        ],
    },
    {
        no: 13,
        question: "Lorsque vous devez prendre une décision rapide, vous :",
        answerOptions: [
            { type: "A", answer: "Faites confiance à votre instinct", score: "Initiative" },
            { type: "B", answer: "Préférez analyser rapidement les données disponibles", score: "Autonomie" },
        ],
    },
    {
        no: 14,
        question: "Face à des retours critiques, vous :",
        answerOptions: [
            { type: "A", answer: "Ajustez immédiatement vos actions en fonction de ce retour", score: "Flexibilité" },
            { type: "B", answer: "Prenez du recul pour évaluer si ces critiques sont pertinentes", score: "Autonomie" },
        ],
    },
    {
        no: 15,
        question: "Lors d'une réunion d'équipe, vous êtes celui qui :",
        answerOptions: [
            { type: "A", answer: "Prend la parole pour donner des idées", score: "Leadership" },
            { type: "B", answer: "Écoute attentivement et donne des avis réfléchis", score: "Collaboration" },
        ],
    },
    {
        no: 16,
        question: "Lorsque vous devez résoudre un problème complexe, vous :",
        answerOptions: [
            { type: "A", answer: "Travaillez méthodiquement pour résoudre chaque aspect", score: "Organisation" },
            { type: "B", answer: "Cherchez une solution créative pour contourner le problème", score: "Créativité" },
        ],
    },
    {
        no: 17,
        question: "Dans une situation d'urgence, vous :",
        answerOptions: [
            { type: "A", answer: "Réagissez rapidement et de manière décisive", score: "Initiative" },
            { type: "B", answer: "Restez calme et prenez le temps d'évaluer la meilleure solution", score: "Flexibilité" },
        ],
    },
    {
        no: 18,
        question: "Lorsque vous terminez un projet, vous :",
        answerOptions: [
            { type: "A", answer: "Aimez recevoir des commentaires sur ce qui a bien fonctionné", score: "Collaboration" },
            { type: "B", answer: "Préférez analyser ce qui pourrait être amélioré", score: "Organisation" },
        ],
    },
    {
        no: 19,
        question: "Lorsque vous travaillez sur plusieurs projets simultanément, vous :",
        answerOptions: [
            { type: "A", answer: "Aimez planifier et hiérarchiser vos tâches", score: "Organisation" },
            { type: "B", answer: "Préférez passer d'une tâche à l'autre selon l'inspiration", score: "Flexibilité" },
        ],
    },
    {
        no: 20,
        question: "En cas de désaccord dans une équipe, vous :",
        answerOptions: [
            { type: "A", answer: "Essayez de comprendre le point de vue de chacun", score: "Collaboration" },
            { type: "B", answer: "Cherchez à trouver un compromis rapidement", score: "Initiative" },
        ],
    },
    {
        no: 21,
        question: "Dans une situation stressante, vous :",
        answerOptions: [
            { type: "A", answer: "Agissez avec calme et méthode", score: "Flexibilité" },
            { type: "B", answer: "Trouvez des solutions innovantes pour alléger la pression", score: "Créativité" },
        ],
    },
    {
        no: 22,
        question: "Lorsque vous présentez un projet, vous :",
        answerOptions: [
            { type: "A", answer: "Allez directement à l'essentiel", score: "Organisation" },
            { type: "B", answer: "Appréciez de donner des détails contextuels", score: "Créativité" },
        ],
    },
    {
        no: 23,
        question: "Dans une équipe, vous préférez :",
        answerOptions: [
            { type: "A", answer: "Suivre des processus établis", score: "Routine" },
            { type: "B", answer: "Proposer de nouveaux processus pour améliorer l'efficacité", score: "Créativité" },
        ],
    },
    {
        no: 24,
        question: "Lorsque vous recevez une nouvelle responsabilité, vous :",
        answerOptions: [
            { type: "A", answer: "Commencez immédiatement à travailler", score: "Initiative" },
            { type: "B", answer: "Prenez du temps pour analyser la tâche avant de commencer", score: "Autonomie" },
        ],
    },
    {
        no: 25,
        question: "Lors d'une situation où les priorités changent rapidement, vous :",
        answerOptions: [
            { type: "A", answer: "Réagissez rapidement et vous adaptez", score: "Flexibilité" },
            { type: "B", answer: "Prenez du temps pour ajuster vos priorités", score: "Organisation" },
        ],
    },
    {
        no: 26,
        question: "Lorsque vous travaillez sur un projet long terme, vous :",
        answerOptions: [
            { type: "A", answer: "Fixez des objectifs clairs à chaque étape", score: "Organisation" },
            { type: "B", answer: "Préférez travailler étape par étape sans trop planifier à l'avance", score: "Flexibilité" },
        ],
    },
    {
        no: 27,
        question: "Dans une nouvelle équipe, vous :",
        answerOptions: [
            { type: "A", answer: "Vous adaptez rapidement à vos nouveaux collègues", score: "Flexibilité" },
            { type: "B", answer: "Prenez le temps de connaître les autres avant de vous intégrer", score: "Collaboration" },
        ],
    },
    {
        no: 28,
        question: "Dans une situation de concurrence au travail, vous :",
        answerOptions: [
            { type: "A", answer: "Vous efforcez de surpasser les autres", score: "Leadership" },
            { type: "B", answer: "Préférez coopérer pour atteindre les objectifs", score: "Collaboration" },
        ],
    },
    {
        no: 29,
        question: "Lorsque vous recevez un feedback négatif, vous :",
        answerOptions: [
            { type: "A", answer: "Cherchez immédiatement des moyens de vous améliorer", score: "Initiative" },
            { type: "B", answer: "Prenez le temps de réfléchir à la critique avant d'agir", score: "Autonomie" },
        ],
    },
    {
        no: 30,
        question: "Lorsque vous travaillez avec de nouvelles technologies, vous :",
        answerOptions: [
            { type: "A", answer: "Vous sentez à l'aise pour apprendre par vous-même", score: "Autonomie" },
            { type: "B", answer: "Préférez suivre des formations formelles", score: "Routine" },
        ],
    },
    {
        no: 31,
        question: "Face à un projet qui déraille, vous :",
        answerOptions: [
            { type: "A", answer: "Prenez l'initiative pour remettre le projet sur les rails", score: "Leadership" },
            { type: "B", answer: "Attendez que des directives soient données", score: "Collaboration" },
        ],
    },
    {
        no: 32,
        question: "Lors de la gestion de plusieurs tâches simultanées, vous :",
        answerOptions: [
            { type: "A", answer: "Préférez gérer une tâche à la fois", score: "Organisation" },
            { type: "B", answer: "Multitâchez efficacement", score: "Flexibilité" },
        ],
    },
    {
        no: 33,
        question: "Lorsque vous apprenez de nouvelles compétences, vous :",
        answerOptions: [
            { type: "A", answer: "Apprenez en pratiquant immédiatement", score: "Initiative" },
            { type: "B", answer: "Préférez comprendre les concepts avant de pratiquer", score: "Autonomie" },
        ],
    },
    {
        no: 34,
        question: "Face à une nouvelle responsabilité, vous :",
        answerOptions: [
            { type: "A", answer: "Prenez l'initiative sans attendre d'instructions", score: "Initiative" },
            { type: "B", answer: "Attendez des directives claires avant d'agir", score: "Collaboration" },
        ],
    },
    {
        no: 35,
        question: "Lorsque vous collaborez avec d'autres, vous :",
        answerOptions: [
            { type: "A", answer: "Préférez un cadre formel et structuré", score: "Routine" },
            { type: "B", answer: "Aimez une collaboration plus flexible", score: "Flexibilité" },
        ],
    },
    {
        no: 36,
        question: "Face à une tâche difficile, vous :",
        answerOptions: [
            { type: "A", answer: "Travaillez de manière persistante pour surmonter les obstacles", score: "Organisation" },
            { type: "B", answer: "Cherchez une solution créative pour résoudre le problème", score: "Créativité" },
        ],
    },
    {
        no: 37,
        question: "Lorsque vous devez respecter des délais, vous :",
        answerOptions: [
            { type: "A", answer: "Travaillez régulièrement pour éviter la précipitation", score: "Routine" },
            { type: "B", answer: "Accélérez votre rythme à l'approche du délai", score: "Initiative" },
        ],
    },
    {
        no: 38,
        question: "Dans votre travail, vous appréciez :",
        answerOptions: [
            { type: "A", answer: "Des objectifs clairs et des attentes précises", score: "Organisation" },
            { type: "B", answer: "Des défis ouverts et la liberté de créer vos propres solutions", score: "Autonomie" },
        ],
    },
    {
        no: 39,
        question: "Dans une discussion de groupe, vous :",
        answerOptions: [
            { type: "A", answer: "Aimez exposer vos idées et suggestions", score: "Leadership" },
            { type: "B", answer: "Préférez écouter et analyser avant de parler", score: "Collaboration" },
        ],
    },
    {
        no: 40,
        question: "Face à une critique, vous :",
        answerOptions: [
            { type: "A", answer: "Acceptez immédiatement et cherchez à vous améliorer", score: "Initiative" },
            { type: "B", answer: "Prenez du recul pour évaluer si la critique est juste", score: "Autonomie" },
        ],
    },
    {
        no: 41,
        question: "En équipe, vous :",
        answerOptions: [
            { type: "A", answer: "Vous efforcez de guider et d'encadrer", score: "Leadership" },
            { type: "B", answer: "Préférez suivre et contribuer discrètement", score: "Collaboration" },
        ],
    },
    {
        no: 42,
        question: "Dans un environnement changeant, vous :",
        answerOptions: [
            { type: "A", answer: "Réagissez rapidement et vous adaptez", score: "Flexibilité" },
            { type: "B", answer: "Aimez analyser les changements avant d'agir", score: "Organisation" },
        ],
    },
    {
        no: 43,
        question: "Lorsque vous devez faire un choix entre plusieurs options, vous :",
        answerOptions: [
            { type: "A", answer: "Prenez rapidement une décision", score: "Initiative" },
            { type: "B", answer: "Analysez chaque option en détail avant de choisir", score: "Autonomie" },
        ],
    },
    {
        no: 44,
        question: "En cas de désaccord avec un collègue, vous :",
        answerOptions: [
            { type: "A", answer: "Cherchez à résoudre le conflit rapidement", score: "Initiative" },
            { type: "B", answer: "Aimez comprendre les raisons profondes du désaccord", score: "Collaboration" },
        ],
    },
    {
        no: 45,
        question: "Lorsque vous devez collaborer avec d'autres, vous :",
        answerOptions: [
            { type: "A", answer: "Aimez être le leader de la collaboration", score: "Leadership" },
            { type: "B", answer: "Aimez travailler en équipe avec une contribution égale", score: "Collaboration" },
        ],
    },
    {
        no: 46,
        question: "Dans votre environnement de travail idéal, vous :",
        answerOptions: [
            { type: "A", answer: "Préférez des règles et des attentes bien définies", score: "Routine" },
            { type: "B", answer: "Aimez avoir la liberté d'explorer et d'expérimenter", score: "Créativité" },
        ],
    },
    {
        no: 47,
        question: "Lorsque vous êtes confronté à une tâche complexe, vous :",
        answerOptions: [
            { type: "A", answer: "Décomposez la tâche en étapes plus simples", score: "Organisation" },
            { type: "B", answer: "Cherchez à comprendre le problème dans sa globalité avant de commencer", score: "Flexibilité" },
        ],
    },
    {
        no: 48,
        question: "Face à un imprévu dans un projet, vous :",
        answerOptions: [
            { type: "A", answer: "Vous adaptez rapidement pour continuer le projet", score: "Flexibilité" },
            { type: "B", answer: "Reconsidérez l'ensemble du projet pour ajuster", score: "Organisation" },
        ],
    },
    {
        no: 49,
        question: "Lorsque vous collaborez avec une nouvelle équipe, vous :",
        answerOptions: [
            { type: "A", answer: "Prenez rapidement un rôle actif dans l'équipe", score: "Leadership" },
            { type: "B", answer: "Prenez le temps de connaître le groupe avant de contribuer", score: "Collaboration" },
        ],
    },
    {
        no: 50,
        question: "Lorsque vous devez accomplir une tâche en équipe, vous :",
        answerOptions: [
            { type: "A", answer: "Préférez diriger la tâche", score: "Leadership" },
            { type: "B", answer: "Préférez exécuter les instructions données", score: "Collaboration" },
        ],
    },
];

export default papiQuestions;
