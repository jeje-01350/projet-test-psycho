const ResultsPersonalityTest = require('../models/ResultsPersonalityTest');
const OpenAI = require('openai');

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const axios = require('axios');
const CallModjo = require('../models/CallModjo');

exports.saveHubspotTest = async (req, res) => {
    try {
        const { body } = req;

        if (!body) {
            return res.status(400).json({ error: 'Aucun corps de requête fourni.' });
        }

        const response = await axios.post('https://hooks.zapier.com/hooks/catch/11072818/2saof9s/', body, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        res.status(200).json({ message: 'Données envoyées avec succès à HubSpot.', data: response.data });
    } catch (error) {
        console.error('Erreur lors de l\'envoi à HubSpot:', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi à HubSpot.', details: error.message });
    };
}

exports.savePersonalityTestResult = async (req, res) => {
    try {
        const { score, userAnswers, hs_object_id } = req.body;

        if (!score || !userAnswers || !hs_object_id) {
            return res.status(400).json({ error: 'Veuillez fournir toutes les informations.' });
        }

        let modjoCallData;
        try {
            modjoCallData = await CallModjo.findOne({ hs_object_id });

            if (!modjoCallData) {
                throw new Error('Aucun appel trouvé avec cet hs_object_id.');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données Modjo:', error);
            return res.status(500).json({ error: 'Erreur lors de la récupération des données Modjo.', details: error.message });
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

        function cleanAndStructureHTML(text, analysisType) {
            const headerTitle = analysisType === "color"
                ? "Analyse de la couleur obtenue par le candidat"
                : "Analyse de la lettre obtenue par le candidat";

            text = text
                .replace(/#+\s/g, '')
                .replace(/\*\*/g, '')
                .replace(/\d+\.\s/g, '')
                .trim();

            const sections = text.split('\n\n');

            const headers = [
                headerTitle,
                "Contexte professionnel propice",
                analysisType === "color"
                    ? "Lien avec son profil de lettre"
                    : "Lien avec l'analyse de la couleur",
            ];

            let htmlContent = "";
            let addedSections = new Set();

            sections.forEach((section, index) => {
                if (!addedSections.has(section) && index < headers.length) {
                    htmlContent += `<h2>${headers[index]}</h2>\n`;
                    htmlContent += `<p>${section.trim()}</p>\n`;
                    addedSections.add(section);
                }
            });

            return htmlContent;
        }

        const promptPhaseIntegration = `
            Rédige un rapport détaillé basé sur l'analyse de la lettre obtenue par le candidat en respectant **strictement** la structure suivante. 
            
            Ne génère pas de numéros (1., 2., 3.), pas de gras (**), ni de symboles markdown (##). Écris uniquement un texte clair et bien segmenté, sans ajouter d'en-têtes ou titres supplémentaires. Respecte exactement la structure ci-dessous :
            
            Analyse de la lettre obtenue par le candidat :
               - Présente une analyse détaillée et précise de la lettre obtenue par le candidat.
            
            Contexte professionnel propice :
               - Décris les types d'environnements professionnels où ce profil de candidat peut s'épanouir, avec des exemples de rôles et situations adaptés.
            
            Lien avec l'analyse de la couleur :
               - Mentionne l'importance de coupler cette analyse avec l'analyse de la couleur pour obtenir une vision complète et équilibrée du profil du candidat.
            
            Conclusion :
               - Résume les points clés de l'analyse en quelques phrases pour offrir un aperçu clair du profil du candidat.
            
            Lettre : ${JSON.stringify(score.letters)}
            Description de la lettre : ${getLettersDescription(score.letters)}
            Transcription Modjo (pour compléter l'analyse) : ${modjoCallData}
        `;


        const responsePhaseIntegration = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: promptPhaseIntegration }]
        });

        const bilanLetter = responsePhaseIntegration.choices[0].message.content;

        const promptPhaseFinal = `
            Rédige un rapport détaillé basé sur l'analyse de la couleur obtenue par le candidat en respectant **strictement** la structure suivante :
            
            1. **Analyse de la couleur obtenue par le candidat** : 
               - Présente une analyse détaillée et précise de la couleur obtenue par le candidat. N'ajoute aucun titre supplémentaire ni éléments markdown comme ##. Utilise uniquement du texte clair.
            
            2. **Contexte professionnel propice** : 
               - Décris les types d'environnements professionnels où ce profil de candidat peut s'épanouir, avec des exemples concrets de postes adaptés.
            
            3. **Lien avec son profil de lettre** : 
               - Fais uniquement le lien entre les résultats de l'analyse et les éléments que le candidat aurait pu mentionner dans sa lettre (compétences, expériences, ambitions).
            
            4. **Conclusion** : 
               - Résume les points clés de l'analyse en quelques phrases. Aucune redondance n'est autorisée.
            
            N'inclut pas de numéros, pas de gras (**), pas de symboles markdown comme ##. Rédige un texte clair, divisé par des paragraphes simples.
            
            Couleur : ${JSON.stringify(score.color)}
            Description de la couleur : ${getColorsDescription(score.color)}
            Transcription Modjo (à titre d'information) : ${modjoCallData}
        `;


        const responsePhaseFinal = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: promptPhaseFinal }]
        });

        const bilanColor = responsePhaseFinal.choices[0].message.content;

        const newResult = new ResultsPersonalityTest({
            score,
            userAnswers,
            summary
        });

        await newResult.save();

        res.status(201).json({
            message: 'Résultat sauvegardé avec succès.',
            data: newResult,
            bilanLetter,
            htmlLetter : cleanAndStructureHTML(bilanLetter, 'letter'),
            bilanColor,
            htmlColor : cleanAndStructureHTML(bilanColor, 'color'),
            modjoCallData
        });
    } catch (err) {
        console.error("Error saving result:", err);
        res.status(500).json({ error: "Error saving result", details: err.message });
    }
};
