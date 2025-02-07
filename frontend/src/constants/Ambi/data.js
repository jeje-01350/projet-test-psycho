// Descriptions des dimensions
export const ambiDescriptions = {
  E: {
    title: "Extraversion",
    high: "Vous êtes une personne sociable, énergique et expressive. Vous recherchez activement les interactions sociales et vous vous sentez à l'aise en groupe. Vous aimez être au centre de l'attention et communiquez facilement vos émotions.",
    low: "Vous êtes plus réservé(e) et préférez les environnements calmes. Vous appréciez la solitude et les interactions en petit groupe. Vous réfléchissez avant de parler et êtes plus à l'aise dans l'observation que dans l'action."
  },
  A: {
    title: "Agréabilité",
    high: "Vous êtes une personne empathique, bienveillante et coopérative. Vous accordez une grande importance aux besoins des autres et cherchez l'harmonie dans vos relations. Vous pardonnez facilement et évitez les conflits.",
    low: "Vous êtes plus direct(e) et pragmatique dans vos relations. Vous n'hésitez pas à défendre vos opinions et pouvez parfois être perçu(e) comme plus critique ou compétitif(ve)."
  },
  C: {
    title: "Conscience",
    high: "Vous êtes une personne organisée, disciplinée et fiable. Vous planifiez soigneusement vos actions et accordez une grande importance aux détails. Vous êtes persévérant(e) et orienté(e) vers vos objectifs.",
    low: "Vous êtes plus spontané(e) et flexible dans votre approche. Vous préférez l'improvisation à la planification et pouvez parfois être perçu(e) comme plus décontracté(e) ou moins conventionnel(le)."
  },
  S: {
    title: "Stabilité Émotionnelle",
    high: "Vous gérez bien le stress et restez calme sous pression. Vous êtes généralement optimiste et confiant(e). Vos émotions sont stables et vous vous adaptez facilement aux changements.",
    low: "Vous êtes plus sensible aux variations émotionnelles et pouvez ressentir plus intensément le stress. Vous êtes plus vigilant(e) aux risques potentiels et pouvez parfois vous inquiéter plus facilement."
  },
  O: {
    title: "Ouverture à l'Expérience",
    high: "Vous êtes curieux(se) intellectuellement et ouvert(e) aux nouvelles idées. Vous appréciez l'art, la créativité et les expériences inhabituelles. Vous aimez explorer des concepts abstraits et théoriques.",
    low: "Vous préférez ce qui est concret et pratique. Vous appréciez la stabilité et les méthodes éprouvées. Vous êtes plus à l'aise avec les approches traditionnelles et pragmatiques."
  }
};

// Fonction pour créer la structure d'une question
const createQuestion = (id, text, dimension, isReversed = false) => ({
  id,
  question: text,
  dimension,
  isReversed
});

// Liste des questions du test
export const ambiQuestions = [
  // Extraversion
  createQuestion(3, "J'aime généralement passer mon temps libre en compagnie d'autres personnes.", "E", false),
  createQuestion(6, "Je rayonne de joie.", "E", false),
  createQuestion(20, "Je parle beaucoup.", "E", false),
  createQuestion(22, "Je suis généralement actif(ve) et plein(e) d'énergie.", "E", false),
  createQuestion(38, "J'adore être le centre de l'attention.", "E", false),
  createQuestion(44, "J'adore l'excitation.", "E", false),
  createQuestion(64, "J'apprécie souvent raconter des blagues ou me comporter de manière humoristique.", "E", false),
  createQuestion(73, "J'adore les grandes fêtes.", "E", false),
  createQuestion(78, "J'utilise mon charme pour attirer l'attention.", "E", false),
  createQuestion(88, "Je parle à beaucoup de personnes différentes lors des fêtes.", "E", false),
  createQuestion(99, "Je suis à l'aise dans les situations sociales.", "E", false),
  createQuestion(101, "Je me considère comme un bon leader.", "E", false),
  createQuestion(120, "J'aime me démarquer dans une foule.", "E", false),
  createQuestion(130, "Je réclame l'attention.", "E", false),
  createQuestion(133, "J'amuse mes amis.", "E", false),
  createQuestion(157, "Je suis l'âme de la fête.", "E", false),
  createQuestion(163, "J'ai une personnalité affirmée.", "E", false),
  createQuestion(164, "Je préfère m'impliquer pleinement plutôt que de rester en retrait.", "E", false),
  createQuestion(166, "Je mets les gens à l'aise.", "E", false),
  createQuestion(170, "J'adore discuter.", "E", false),
  createQuestion(179, "Je partage mes pensées intimes.", "E", false),
  
  createQuestion(21, "J'essaie d'éviter de parler en public.", "E", true),
  createQuestion(30, "Je suis très timide dans les situations sociales.", "E", true),
  createQuestion(31, "Je n'ai pas beaucoup d'énergie.", "E", true),
  createQuestion(102, "J'évite les foules.", "E", true),
  createQuestion(103, "Je ne suis pas doué(e) pour raconter des blagues.", "E", true),
  createQuestion(113, "Je ne ressens pas le besoin d'être proche des autres.", "E", true),
  createQuestion(135, "Je veux être laissé(e) seul(e).", "E", true),
  createQuestion(145, "J'attends que les autres prennent l'initiative.", "E", true),
  createQuestion(168, "Je garde mes sentiments pour moi, même lorsque je suis malheureux(se).", "E", true),
  createQuestion(171, "On a du mal à me connaître.", "E", true),
  createQuestion(176, "Je ne me mets pas en avant.", "E", true),

  // Agréabilité
  createQuestion(10, "Je prévois les besoins des autres.", "A", false),
  createQuestion(12, "J'éprouve de la sympathie pour les sans-abri.", "A", false),
  createQuestion(19, "Je ressens les émotions des autres.", "A", false),
  createQuestion(23, "Je suis patient(e) avec les personnes qui m'énervent.", "A", false),
  createQuestion(50, "J'essaie de pardonner et d'oublier.", "A", false),
  createQuestion(77, "J'éprouve de la sympathie pour ceux qui sont moins favorisés que moi.", "A", false),
  createQuestion(87, "Je ne peux pas imaginer mentir ou tricher.", "A", false),
  createQuestion(89, "Je n'aime pas avoir de l'autorité sur les autres.", "A", false),
  createQuestion(104, "Je n'emploie pas de langage grossier.", "A", false),
  createQuestion(111, "Je me soucie des autres.", "A", false),
  createQuestion(146, "Je n'ai jamais éprouvé de haine envers qui que ce soit.", "A", false),
  createQuestion(177, "Je suis un bon auditeur.", "A", false),

  createQuestion(8, "Je me méfie des gens.", "A", true),
  createQuestion(9, "Je dis aux autres ce qu'ils veulent entendre pour qu'ils fassent ce que je souhaite.", "A", true),
  createQuestion(11, "Je pense être supérieur(e) aux autres.", "A", true),
  createQuestion(34, "Je garde rancune.", "A", true),
  createQuestion(40, "J'insiste pour que les autres fassent les choses à ma manière.", "A", true),
  createQuestion(51, "Je suis peu préoccupé(e) par les autres.", "A", true),
  createQuestion(52, "J'agis par vengeance.", "A", true),
  createQuestion(65, "Je me fais des ennemis.", "A", true),
  createQuestion(97, "J'aimerais avoir plus de pouvoir que les autres.", "A", true),
  createQuestion(119, "J'ai agressé physiquement quelqu'un.", "A", true),
  createQuestion(172, "Je me venge de ceux qui m'insultent.", "A", true),
  createQuestion(181, "Je pense que la plupart des gens mentiraient pour réussir.", "A", true),

  // Conscience
  createQuestion(5, "Je suis toujours occupé(e).", "C", false),
  createQuestion(13, "Je garde les choses bien rangées.", "C", false),
  createQuestion(14, "Je suis une personne très disciplinée.", "C", false),
  createQuestion(25, "Je m'efforce énormément de réussir.", "C", false),
  createQuestion(41, "Je crois fermement en la réflexion approfondie.", "C", false),
  createQuestion(48, "Dès qu'une tâche me vient à l'esprit, je m'y mets immédiatement.", "C", false),
  createQuestion(112, "J'aime ranger et organiser.", "C", false),
  createQuestion(121, "Je veux que les choses se déroulent selon un plan établi.", "C", false),
  createQuestion(122, "Je veux que tout soit exactement comme il se doit.", "C", false),
  createQuestion(126, "Je suis capable de contrôler mes envies.", "C", false),
  createQuestion(137, "Je suis très exigeant(e) dans mon travail.", "C", false),
  createQuestion(141, "Je planifie ma vie de manière logique.", "C", false),
  createQuestion(144, "Je commence immédiatement à travailler.", "C", false),
  createQuestion(167, "Je suis toujours bien préparé(e).", "C", false),
  createQuestion(174, "Je vérifie les choses plus souvent qu'il ne le faudrait.", "C", false),
  createQuestion(124, "Je veux être le meilleur.", "C", false),

  createQuestion(15, "Je me lance dans les choses sans réfléchir.", "C", true),
  createQuestion(32, "Je ne pense pas que les lois me concernent.", "C", true),
  createQuestion(35, "J'aime agir sur un coup de tête.", "C", true),
  createQuestion(45, "Je préfère dépenser de l'argent que l'économiser.", "C", true),
  createQuestion(46, "J'aime agir de manière imprudente.", "C", true),
  createQuestion(70, "Je ne me préoccupe pas de bien m'habiller.", "C", true),
  createQuestion(82, "Je fais trop peu attention aux détails.", "C", true),
  createQuestion(90, "J'oublie souvent de remettre les choses à leur place.", "C", true),
  createQuestion(116, "J'éprouve des difficultés à organiser mes tâches et activités.", "C", true),
  createQuestion(151, "Je ne tiens pas mes promesses.", "C", true),
  createQuestion(152, "J'ai besoin d'un petit coup de pouce pour me lancer.", "C", true),
  createQuestion(165, "Je dépense plus d'argent que je ne le devrais.", "C", true),
  createQuestion(169, "Je dépense plus d'argent que je n'en ai.", "C", true),
  createQuestion(155, "Je n'aime pas dépenser d'argent.", "C", true),
  createQuestion(129, "Je m'ennuie souvent.", "C", true),

  // Stabilité Émotionnelle
  createQuestion(1, "Je m'inquiète rarement.", "S", false),
  createQuestion(47, "Je ne me suis jamais vraiment soucié(e) de ce que les autres pensent de moi.", "S", false),
  createQuestion(62, "Je m'irrite rarement.", "S", false),
  createQuestion(143, "Je pleure rarement devant des films tristes.", "S", false),
  createQuestion(173, "Je suis détendu(e) la plupart du temps.", "S", false),

  createQuestion(24, "Je m'irrite facilement.", "S", true),
  createQuestion(29, "Je m'inquiète de ce que les gens pensent de moi.", "S", true),
  createQuestion(33, "J'ai des sautes d'humeur fréquentes.", "S", true),
  createQuestion(57, "Je ressens un sentiment d'inutilité ou de désespoir.", "S", true),
  createQuestion(60, "J'éprouve simultanément de la joie et de l'irritabilité.", "S", true),
  createQuestion(63, "Quand j'étais enfant, j'avais envie de m'enfuir de chez moi.", "S", true),
  createQuestion(71, "Je m'inquiète souvent.", "S", true),
  createQuestion(72, "Je suis facilement intimidé(e).", "S", true),
  createQuestion(80, "Je me sens immédiatement triste en entendant parler d'un événement malheureux.", "S", true),
  createQuestion(95, "Je n'accorde pas d'importance à ce que pensent les autres.", "S", true),
  createQuestion(96, "Je ne sais pas vraiment où va ma vie.", "S", true),
  createQuestion(108, "Je prends souvent le temps d'analyser mes émotions.", "S", true),
  createQuestion(117, "Je ressens un sentiment d'inutilité ou de désespoir.", "S", true),
  createQuestion(123, "Je suis souvent de mauvaise humeur.", "S", true),
  createQuestion(134, "Je crains d'être embarrassé(e).", "S", true),
  createQuestion(136, "Je ne comprends pas toujours mes propres actions.", "S", true),
  createQuestion(147, "J'ai besoin d'être rassuré(e).", "S", true),
  createQuestion(148, "Je ressens les émotions de manière extrêmement intense.", "S", true),
  createQuestion(159, "Je me demande comment je suis devenu(e) tel(le) que je suis.", "S", true),
  createQuestion(160, "Je me sens souvent lésé(e) dans la vie.", "S", true),
  createQuestion(162, "Je panique facilement.", "S", true),
  createQuestion(175, "Je me fatigue trop pour accomplir quoi que ce soit.", "S", true),
  createQuestion(178, "Je crie ou hurle quand je suis en colère.", "S", true),
  createQuestion(180, "Je suis constamment sous pression.", "S", true),
  createQuestion(125, "Je me sens utilisé(e) par les autres.", "S", true),

  // Ouverture à l'Expérience
  createQuestion(27, "J'aime découvrir d'autres pays et cultures.", "O", false),
  createQuestion(28, "On me considère comme assez excentrique.", "O", false),
  createQuestion(43, "Je lis une grande variété de livres.", "O", false),
  createQuestion(58, "Je m'intéresse à la science.", "O", false),
  createQuestion(68, "J'ai un vocabulaire riche.", "O", false),
  createQuestion(69, "J'aime lire.", "O", false),
  createQuestion(75, "J'aspire à vivre des expériences artistiques exceptionnelles.", "O", false),
  createQuestion(92, "J'aime visiter de nouveaux endroits.", "O", false),
  createQuestion(94, "Je suis ouvert(e) aux nouvelles expériences.", "O", false),
  createQuestion(115, "Mon imagination va bien au-delà de celle de mes amis.", "O", false),
  createQuestion(132, "J'adorerais explorer des lieux insolites.", "O", false),
  createQuestion(142, "Je me laisse emporter par mes fantasmes.", "O", false),
  createQuestion(149, "Je passe beaucoup de temps à lire.", "O", false),
  createQuestion(156, "Je crois en une puissance universelle, voire en Dieu.", "O", false),
  createQuestion(158, "Je ne cherche pas à me conformer aux attentes de la société.", "O", false),
  createQuestion(154, "Je trouve de nouvelles façons de faire les choses.", "O", false),
  createQuestion(105, "Je suis capable de résoudre des problèmes de câblage électrique.", "O", false),
  createQuestion(106, "J'apprécie les jeux de stratégie.", "O", false),
  createQuestion(109, "Je me plonge profondément dans la musique.", "O", false),
  createQuestion(110, "J'aime résoudre des problèmes complexes.", "O", false),

  createQuestion(7, "Je n'aime pas la poésie.", "O", true),
  createQuestion(26, "Je n'aime pas l'art.", "O", true),
  createQuestion(42, "Je n'aime pas les changements.", "O", true),
  createQuestion(59, "Je pense que la plupart des questions n'ont qu'une seule bonne réponse.", "O", true),
  createQuestion(83, "Je n'aime pas visiter les musées.", "O", true),
  createQuestion(84, "Je n'éprouve pas d'envie particulière de faire quelque chose d'original.", "O", true),
  createQuestion(138, "J'ai du mal à imaginer des choses.", "O", true),
  createQuestion(139, "Les discussions théoriques ne m'intéressent pas.", "O", true),
  createQuestion(150, "Je ne cherche pas à me comprendre.", "O", true),
  createQuestion(161, "Je n'approfondis pas mes réflexions sur un sujet.", "O", true)
];

// Échelle de réponse
export const ambiScale = [
  { value: 1, label: "Tout à fait en désaccord" },
  { value: 2, label: "En désaccord" },
  { value: 3, label: "Plutôt en désaccord" },
  { value: 4, label: "Neutre" },
  { value: 5, label: "Plutôt d'accord" },
  { value: 6, label: "D'accord" },
  { value: 7, label: "Tout à fait d'accord" }
]; 