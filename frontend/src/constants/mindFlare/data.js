let mindFlareQuestions = [
    {
        text: "J'aime essayer de nouvelles choses et expériences.",
        category: "Ouverture"
    },
    {
        text: "Je m'intéresse à l'apprentissage des différentes cultures et modes de vie.",
        category: "Ouverture"
    },
    {
        text: "J'aime explorer de nouvelles idées et perspectives.",
        category: "Ouverture"
    },
    {
        text: "Je suis attiré par l'art et la créativité.",
        category: "Ouverture"
    },
    {
        text: "J'aime discuter d'idées abstraites et de concepts théoriques.",
        category: "Ouverture"
    },
    {
        text: "J'aime lire sur des sujets divers et variés.",
        category: "Ouverture"
    },
    {
        text: "J'aime visiter les musées et les expositions d'art.",
        category: "Ouverture"
    },
    {
        text: "Je m'intéresse à la philosophie et aux idées abstraites.",
        category: "Ouverture"
    },
    {
        text: "J'aime expérimenter différentes formes d'expression artistique.",
        category: "Ouverture"
    },
    {
        text: "J'aime réfléchir à des façons alternatives de résoudre les problèmes.",
        category: "Ouverture"
    },
    {
        text: "J'aime remettre en question les normes et les règles établies.",
        category: "Ouverture"
    },
    {
        text: "Je m'intéresse à l'exploration du potentiel humain.",
        category: "Ouverture"
    },

    // Conscience
    {
        text: "Je suis une personne organisée et disciplinée.",
        category: "Conscience"
    },
    {
        text: "J'aime faire des plans et fixer des objectifs.",
        category: "Conscience"
    },
    {
        text: "Je suis ponctuel et je respecte mes engagements.",
        category: "Conscience"
    },
    {
        text: "Je me préoccupe de la qualité du travail que je fais.",
        category: "Conscience"
    },
    {
        text: "J'aime suivre les règles et les normes établies.",
        category: "Conscience"
    },
    {
        text: "J'aime avoir tout sous contrôle.",
        category: "Conscience"
    },
    {
        text: "Je me sens mal à l'aise quand les choses sont désorganisées ou non planifiées.",
        category: "Conscience"
    },
    {
        text: "J'aime faire des listes et tenir un registre de mes tâches.",
        category: "Conscience"
    },
    {
        text: "Je m'efforce toujours de faire de mon mieux.",
        category: "Conscience"
    },
    {
        text: "Cela me dérange quand les autres ne respectent pas leurs engagements.",
        category: "Conscience"
    },
    {
        text: "J'aime être responsable de mes actions et décisions.",
        category: "Conscience"
    },
    {
        text: "J'aime fixer des objectifs ambitieux et travailler dur pour les atteindre.",
        category: "Conscience"
    },

    // Extraversion
    {
        text: "Je me sens à l'aise dans des situations sociales et j'aime rencontrer de nouvelles personnes.",
        category: "Extraversion"
    },
    {
        text: "J'aime être au centre de l'attention.",
        category: "Extraversion"
    },
    {
        text: "J'aime parler en public et faire des présentations.",
        category: "Extraversion"
    },
    {
        text: "Je me sens énergisé et excité dans des situations sociales.",
        category: "Extraversion"
    },
    {
        text: "J'aime sortir avec des amis et avoir une vie sociale active.",
        category: "Extraversion"
    },
    {
        text: "J'aime travailler en équipe et collaborer avec les autres.",
        category: "Extraversion"
    },
    {
        text: "J'aime être le leader d'un groupe ou d'une équipe.",
        category: "Extraversion"
    },
    {
        text: "J'aime attirer l'attention avec mon style et mon apparence personnelle.",
        category: "Extraversion"
    },
    {
        text: "Je me sens à l'aise de parler avec des inconnus.",
        category: "Extraversion"
    },
    {
        text: "J'aime participer à des événements sociaux et à des activités de groupe.",
        category: "Extraversion"
    },
    {
        text: "J'aime être entouré de gens et de bruit.",
        category: "Extraversion"
    },
    {
        text: "Je m'ennuie ou je deviens agité quand je suis seul pendant longtemps.",
        category: "Extraversion"
    },

    // Amabilité
    {
        text: "Je me soucie des sentiments des autres.",
        category: "Amabilité"
    },
    {
        text: "J'aime aider les gens lorsqu'ils ont besoin de soutien émotionnel.",
        category: "Amabilité"
    },
    {
        text: "Je me sens mal à l'aise lorsque je vois d'autres personnes dans des situations difficiles.",
        category: "Amabilité"
    },
    {
        text: "Je me considère comme une personne compatissante et empathique.",
        category: "Amabilité"
    },
    {
        text: "J'aime travailler en équipe et collaborer avec les autres pour atteindre des objectifs.",
        category: "Amabilité"
    },
    {
        text: "Je n'aime pas confronter les autres et j'essaie d'éviter les conflits.",
        category: "Amabilité"
    },
    {
        text: "J'aime rendre service aux autres et prendre soin d'eux.",
        category: "Amabilité"
    },
    {
        text: "J'apprécie les interactions sociales et faire de nouveaux amis.",
        category: "Amabilité"
    },
    {
        text: "Je m'efforce de maintenir de bonnes relations avec les autres.",
        category: "Amabilité"
    },
    {
        text: "Je me soucie du bien-être des autres et j'essaie d'aider autant que possible.",
        category: "Amabilité"
    },
    {
        text: "J'aime donner des conseils et offrir du soutien aux autres.",
        category: "Amabilité"
    },
    {
        text: "J'aime passer du temps avec mes proches et prendre soin d'eux.",
        category: "Amabilité"
    },

    // Névrosisme
    {
        text: "Je me sens facilement stressé et préoccupé.",
        category: "Névrosisme"
    },
    {
        text: "Je me sens souvent débordé.",
        category: "Névrosisme"
    },
    {
        text: "Je me sens souvent triste ou déprimé.",
        category: "Névrosisme"
    },
    {
        text: "Je m'inquiète beaucoup des choses.",
        category: "Névrosisme"
    },
    {
        text: "Je me sens anxieux dans des situations nouvelles ou inconnues.",
        category: "Névrosisme"
    },
    {
        text: "J'ai tendance à m'inquiéter pour des choses que je ne peux pas contrôler.",
        category: "Névrosisme"
    },
    {
        text: "J'ai du mal à me détendre et à arrêter de penser aux problèmes.",
        category: "Névrosisme"
    },
    {
        text: "Je suis sujet à des changements d'humeur.",
        category: "Névrosisme"
    },
    {
        text: "Je m'inquiète beaucoup de ce que les autres pensent de moi.",
        category: "Névrosisme"
    },
    {
        text: "Je suis plus affecté par les critiques et les commentaires négatifs que par les positifs.",
        category: "Névrosisme"
    },
    {
        text: "Je me sens peu sûr de mes compétences et capacités.",
        category: "Névrosisme"
    },
    {
        text: "J'ai peur de faire des erreurs et d'échouer dans ce que je fais.",
        category: "Névrosisme"
    }
];

export default mindFlareQuestions