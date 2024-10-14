let ancreScheinQuestions = [
    {
        id: 1,
        text: "Mon rêve est d’être tellement bon·ne dans ce que je fais que mes conseils d’expert seront recherchés en permanence.",
        domain: "TECH"
    },
    {
        id: 2,
        text: "Je suis pleinement satisfait·e dans mon travail quand j’ai réussi à intégrer et à gérer les efforts des autres.",
        domain: "MG"
    },
    {
        id: 3,
        text: "Je rêve d’avoir une carrière qui me donne la liberté de faire mon travail à ma façon et selon mon propre programme.",
        domain: "AUT"
    },
    {
        id: 4,
        text: "J’attache plus d’importance à la sécurité et à la stabilité qu’à la liberté et l’autonomie.",
        domain: "SEC"
    },
    {
        id: 5,
        text: "Je suis toujours à l’affût d’idées qui me permettraient de démarrer ma propre entreprise.",
        domain: "CRE"
    },
    {
        id: 6,
        text: "J’estimerai avoir réussi ma carrière seulement si j’ai le sentiment de contribuer réellement au bien-être de la société.",
        domain: "CAU"
    },
    {
        id: 7,
        text: "Je rêve d’une carrière dans laquelle je puisse résoudre ou venir à bout de situations particulièrement difficiles.",
        domain: "DEF"
    },
    {
        id: 8,
        text: "Je préférerais quitter mon entreprise plutôt que d’être placé·e sur un poste qui compromet ma capacité à poursuivre mes intérêts personnels et familiaux.",
        domain: "VIE"
    },
    {
        id: 9,
        text: "Je rêve d’avoir une carrière internationale qui me permette de voyager et de travailler avec des personnes de diverses cultures.",
        domain: "INTER"
    },
    {
        id: 10,
        text: "J’estimerai avoir réussi ma carrière seulement si je peux développer mes capacités techniques ou fonctionnelles à un très haut niveau de compétence.",
        domain: "TECH"
    },
    {
        id: 11,
        text: "Je rêve d’être responsable d’une organisation complexe et de prendre des décisions qui touchent nombre de personnes.",
        domain: "MG"
    },
    {
        id: 12,
        text: "Je suis pleinement satisfait·e dans mon travail quand je suis complètement libre de définir mes propres tâches, programmes et procédures.",
        domain: "AUT"
    },
    {
        id: 13,
        text: "Je préférerais quitter définitivement mon entreprise plutôt que d’accepter une mission qui compromettrait ma sécurité dans cette entreprise.",
        domain: "SEC"
    },
    {
        id: 14,
        text: "Monter ma propre affaire est plus important pour moi que d’atteindre un haut niveau de management dans l’organisation d’autrui.",
        domain: "CRE"
    },
    {
        id: 15,
        text: "Je rêve d’une carrière dans laquelle je puisse résoudre ou venir à bout de situations particulièrement difficiles.",
        domain: "DEF"
    },
    {
        id: 16,
        text: "Je préférerais quitter mon entreprise plutôt que d’être placé·e sur un poste qui compromet ma capacité à poursuivre mes intérêts personnels et familiaux.",
        domain: "VIE"
    },
    {
        id: 17,
        text: "Je rêve d’une carrière qui me permette d’intégrer mes besoins personnels, familiaux et professionnels.",
        domain: "VIE"
    },
    {
        id: 18,
        text: "Travailler à l’étranger m’attire.",
        domain: "INTER"
    },
    {
        id: 19,
        text: "Devenir directeur de la fonction correspondant à mon domaine d’expertise m’attire plus que d’atteindre un poste de direction générale.",
        domain: "TECH"
    },
    {
        id: 20,
        text: "J’estimerai avoir réussir dans ma carrière seulement si je deviens directeur général d’une organisation.",
        domain: "MG"
    },
    {
        id: 21,
        text: "J’estimerai avoir réussi dans ma carrière seulement si j’atteins une autonomie et une liberté totale.",
        domain: "AUT"
    },
    {
        id: 22,
        text: "Je recherche des emplois dans des organisations qui me procureront un sentiment de sécurité et de stabilité.",
        domain: "SEC"
    },
    {
        id: 23,
        text: "Je suis pleinement satisfait·e dans ma carrière quand j’ai pu construire quelque chose qui est entièrement le fruit de mes idées et efforts.",
        domain: "CRE"
    },
    {
        id: 24,
        text: "Utiliser mes compétences pour que le monde devienne un endroit plus agréable pour vivre et travailler est plus important pour moi que d’atteindre une position managériale élevée.",
        domain: "CAU"
    },
    {
        id: 25,
        text: "J’ai été pleinement satisfait·e dans ma carrière quand j’ai résolu des problèmes apparemment insolubles ou quand je suis venu·e à bout de situations apparemment impossibles.",
        domain: "DEF"
    },
    {
        id: 26,
        text: "J’estimerai avoir réussi dans la vie seulement si j’ai pu trouver un équilibre entre mes besoins personnels, ceux liés à ma famille et ma carrière.",
        domain: "VIE"
    },
    {
        id: 27,
        text: "J’estimerai avoir réussi dans ma carrière seulement si je parviens à travailler dans un environnement international.",
        domain: "INTER"
    },
    {
        id: 28,
        text: "Je préférerais quitter mon entreprise plutôt que d’accepter une mission qui me ferait sortir de mon champ d’expertise.",
        domain: "TECH"
    },
    {
        id: 29,
        text: "Atteindre un poste de direction générale m’attire plus que de devenir directeur de la fonction correspondant à mon domaine d’expertise.",
        domain: "MG"
    },
    {
        id: 30,
        text: "L’opportunité de faire mon travail à ma façon, libre de règles et de contraintes, est plus importante pour moi que la sécurité.",
        domain: "AUT"
    },
    {
        id: 31,
        text: "Je suis pleinement satisfait·e dans mon travail quand j’éprouve le sentiment d’une sécurité totale sur le plan financier et sur celui de l’emploi.",
        domain: "SEC"
    },
    {
        id: 32,
        text: "J’estimerai avoir réussi ma carrière seulement si j’arrive à créer ou à élaborer quelque chose qui est ma propre idée ou mon propre produit.",
        domain: "CRE"
    },
    {
        id: 33,
        text: "Je rêve d’avoir une carrière qui apporte une réelle contribution à l’humanité et à la société.",
        domain: "CAU"
    },
    {
        id: 34,
        text: "Je recherche des opportunités de travail qui défient fortement mes capacités à résoudre des problèmes et/ou mon goût de la compétition.",
        domain: "DEF"
    },
    {
        id: 35,
        text: "Équilibrer les exigences de la vie personnelle et professionnelle est plus important pour moi que d’atteindre une position managériale élevée.",
        domain: "VIE"
    },
    {
        id: 36,
        text: "Je préférerais quitter mon entreprise plutôt que d’accepter une mission qui n’impliquerait pas la possibilité d’une mobilité internationale.",
        domain: "INTER"
    },
    {
        id: 37,
        text: "Je suis pleinement satisfait·e de mon travail quand j’ai été capable d’utiliser les compétences et talents rattachés à ma spécialisation.",
        domain: "TECH"
    },
    {
        id: 38,
        text: "Je préférerais quitter mon entreprise plutôt que d’accepter un travail qui m’empêcherait d’atteindre une position de management général.",
        domain: "MG"
    },
    {
        id: 39,
        text: "Je préférerais quitter mon entreprise plutôt que d’accepter un travail qui réduirait mon autonomie et ma liberté.",
        domain: "AUT"
    },
    {
        id: 40,
        text: "Je rêve d’avoir une carrière qui me permette d’éprouver un sentiment de sécurité et de stabilité.",
        domain: "SEC"
    },
    {
        id: 41,
        text: "Je rêve de démarrer et de développer ma propre affaire.",
        domain: "CRE"
    },
    {
        id: 42,
        text: "Je préférerais quitter mon entreprise plutôt que d’accepter une mission qui amoindrirait mes capacités d’être au service des autres.",
        domain: "CAU"
    },
    {
        id: 43,
        text: "Travailler sur des problèmes quasiment insolubles est plus important pour moi que d’atteindre une position managériale élevée.",
        domain: "DEF"
    },
    {
        id: 44,
        text: "J’ai toujours cherché des opportunités de travail qui minimisent les interférences avec les préoccupations personnelles ou familiales.",
        domain: "VIE"
    },
    {
        id: 45,
        text: "Je rêve d’avoir une carrière qui me permette d’avoir des responsabilités internationales.",
        domain: "INTER"
    }
];

export default ancreScheinQuestions;
