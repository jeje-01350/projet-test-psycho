/**
 * @typedef {Object} Question
 * @property {string} question - Le texte de la question
 * @property {string} type - Le type de question ('choice' ou 'scale')
 * @property {Array<string>} [answers] - Les réponses possibles (pour les questions de type 'choice')
 * @property {Object} [impacts] - Les impacts sur les scores de personnalité
 */

/**
 * @typedef {Object} UserResponse
 * @property {string} question - La question posée
 * @property {string|number} answer - La réponse donnée
 * @property {number} questionIndex - L'index de la question
 */

/**
 * @typedef {Object} MotivationScores
 * @property {number} [key] - Score pour chaque type de motivation
 */

/**
 * @typedef {Object} AnswersCount
 * @property {Object} Colors - Compteurs pour les couleurs
 * @property {Object} Letters - Compteurs pour les lettres
 */

export {}; 