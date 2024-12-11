const ResultsPersonalityTest = require('../models/ResultsPersonalityTest');
const OpenAI = require('openai');

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

exports.savePersonalityTestResult = async (req, res) => {
    try {
        const { score, userAnswers } = req.body;

        if (!score || !userAnswers) {
            return res.status(400).json({ error: 'Veuillez fournir toutes les informations.' });
        }

        const getLettersDescription = (letter) => {
            switch (letter) {
                case 'A':
                    return `Vous avez une personnalité de type A. Vous semblez prédisposé à avoir les capacité de gestion et de contrôle.
        Vos forces sont votre ténacité, votre confiance et votre pragmatisme.
        Vos faiblesses peuvent être l'écoute, un manque de discipline et d'attention aux détails.`;
                case 'B':
                    return `Vous avez une personnalité de type B. Vous aimez être entouré de gens.
        Vos forces sont votre empathie, votre enthousiasme et votre spontanéité.
        Vos faiblesses peuvent être manque de patience, d'attention et de confiance.`;
                case 'C':
                    return `Vous avez une personnalité de type C. Vous aimez réfléchir avant d'agir.
        Vos forces sont votre rationalité, votre objectivité et votre originalité.
        Vos faiblesses peuvent être manque de spontanéité, de pragmatisme et d'empathie.`;
                case 'D':
                    return `Vous avez une personnalité de type D. Vous aimez vous sentir en sécurité dans la vie.
        Vos forces sont votre organisation, votre compassion et votre patience.
        Vos faiblesses potentielles sont un manque d'ambition, d'adaptabilité et d'affirmation.`;
                default:
                    return 'Description non disponible.';
            }
        };

        const getColorsDescription = (color) => {
            switch (color) {
                case 'Bleu':
                    return `Vous êtes un Relateur. Vous aimez discuter, les relations humaines et passer du temps avec les autres.
        Vous êtes une personne empathique qui a tendance à placer les besoins des autres au-dessus des siens.
        Vos forces sont votre sympathie, votre ouverture et votre conscience de vos propres émotions.
        Vos faiblesses peuvent votre subjectivité, votre souplesse et votre susceptibilité à être manipulé.`;
                case 'Rouge':
                    return `Vous êtes un Aventurier. Vous aimez l'action, l'excitation et le drame.
        Vous acceptez facilement le changement et êtes spontané.
        Vos forces sont votre ténacité, votre audace et votre adaptabilité.
        Vos faiblesses peuvent être votre insouciance et votre manque de concentration.`;
                case 'Vert':
                    return `Vous êtes un Planificateur. Vous aimez rêver, planifier et innover.
        Vous avez tendance à passer beaucoup de temps à penser.
        Vos forces sont votre vision, votre objectivité et votre attention aux détails.
        Vos faiblesses peuvent être une difficulté à vous immerger dans le moment présent.`;
                case 'Marron':
                    return `Vous êtes un Constructeur. Vous aimez diriger, créer et travailler dur.
        Vous êtes une personne traditionnelle avec du respect pour l'autorité.
        Vos forces sont votre diligence, votre franchise et votre pragmatisme.
        Vos faiblesses peuvent être un manque de tact, de patience et de facilité avec les abstractions.`;
                default:
                    return 'Description non disponible.';
            }
        };

        const promptPhaseCommercial = `
            Nous sommes dans un contexte de process commercial, le test sert à lui donner envie de découvrir la signification de chaque résultat
            À partir des résultats du MBTI test, modèles de couleurs et modeles des lettres, veuillez rédiger un rapport structuré selon les points suivants :
                - Présentez brièvement le MBTI test, modèles de couleurs et modeles des lettres, en expliquant son objectif et ce qu'il mesure. (evite les superlatif, les jugements)
                - Intégrez les variables de résultats spécifiques, en les présentant de manière claire et concise.
                - Structure l'annonce des résultats en 2 partie : 1 annonce de la couleur avec deux adjectif qui lui corresponde a partir de cette description ${getColorsDescription(score.color)} et 2 annonce de la lettre avec deux adjectif qui lui corresponde a partir de cette description ${getLettersDescription(score.letters)}
                - Concluez avec une synthèse finale et des encouragements pour l'avenir. (evite les superlatif, les jugements)
                - N'interprete pas le resultat du test anonce uniquement le libelle sans expliquer a quoi celui ci correspond
                - Résultats du Test :
                    couleur :  ${JSON.stringify(score.color)}
                    briggs :  ${JSON.stringify(score.briggs)}
                    lettre :  ${JSON.stringify(score.letters)}
                - Instructions supplémentaires :
                - Adoptez un style accessible au grand public.
                - Utilisez un ton neutre et professionnel.
                - L'utilisateur du test sera appeler le candidat
                - Présentez les informations sous forme de paragraphes et de puces pour faciliter la lecture.
                - N'incluez aucune information personnelle sur l'utilisateur autre que les résultats fournis.
                - Évitez toute mention ou indication que le rapport est généré par une intelligence artificielle.
                - Si pertinent, incluez des descriptions de tableaux ou de graphiques illustrant les scores
                - rajouter en conclusion un disclaimer du style, ces résultats peuvent être utilisés dans le cadre d'une analyse plus approfondie en fonction du contexte professionnel et personnel du candidat par un professionnel.
            `;

        const responsePhaseCommercial = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: promptPhaseCommercial }]
        });

        const summary = responsePhaseCommercial.choices[0].message.content;

        const promptPhaseIntegration = `
            Rédiges un rapport détaillé basé sur l'analyse de la lettre obtenue par le candidat. 
            Explique dans quel contexte professionnel ce type de personne peut se sentir à l'aise. 
            Mentionne le fait que pour completer cette analyse il est important la coupler avec l'analyse de la couleur.
            lettre :  ${JSON.stringify(score.letters)}
            description de la lettre : ${getLettersDescription(score.letters)}
            `;

        const responsePhaseIntegration = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: promptPhaseIntegration }]
        });

        const promptIntegration = responsePhaseIntegration.choices[0].message.content;

        const promptPhaseFinal = `
            Rédiges un rapport détaillé basé sur l'analyse de la couleur obtenue par le candidat. 
            Explique dans quel contexte professionnel ce type de personne peut se sentir à l'aise. 
            Fait le lien également avec son profil de lettre.
            Couleur :  ${JSON.stringify(score.color)}
            description de la couleur : ${getColorsDescription(score.color)}
            `;

        const responsePhaseFinal = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: promptPhaseFinal }]
        });

        const promptFinal = responsePhaseFinal.choices[0].message.content;

        const newResult = new ResultsPersonalityTest({
            score,
            userAnswers,
            summary
        });

        await newResult.save();

        res.status(201).json({ message: 'Résultat sauvegardé avec succès.', data: newResult, promptIntegration, promptFinal });
    } catch (err) {
        console.error("Error saving result:", err);
        res.status(500).json({ error: "Error saving result", details: err.message });
    }
};
