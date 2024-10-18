const ResultsBigfive = require("../models/ResultsBigfive");
const OpenAI = require('openai');

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

exports.sauvegarderResultat = async (req, res) => {
    try {
        const { scores, userAnswers } = req.body;

        if (!scores || !userAnswers) {
            return res.status(400).json({ error: "Scores and userAnswers are required." });
        }

        const prompt = `
            À partir des résultats du Big Five Personality Test, veuillez rédiger un rapport structuré selon les points suivants :
             - Introduction
             - Présentez brièvement le Big Five Personality Test, en expliquant son objectif et ce qu'il mesure.
             - Résumé des Résultats
             - Résumez les points clés des résultats de l'utilisateur.
             - Intégrez les variables de résultats spécifiques, en les présentant de manière claire et concise.
             - Si disponible, incluez les scores, les pourcentages ou les niveaux atteints par l'utilisateur pour chaque dimension ou catégorie du test.
             - Interprétation des Scores
             - Fournissez une explication détaillée de ce que signifient les scores obtenus.
             - Comparez-les aux normes ou moyennes de la population générale, si disponibles.
             - Expliquez comment ces résultats peuvent influencer le comportement ou les performances de l'utilisateur dans un contexte professionnel ou personnel.
             - Conseils Pratiques pour le Développement Personnel
             - Offrez des recommandations pour le développement personnel basées sur les résultats.
             - Proposez des actions concrètes que l'utilisateur peut entreprendre pour renforcer ses compétences ou gérer ses points faibles.
             - Conclusion
             - Concluez avec une synthèse finale et des encouragements pour l'avenir.
             - Résultats du Test :
            ${JSON.stringify(scores)}
             - Instructions supplémentaires :
             - Adoptez un style accessible au grand public.
             - Utilisez un ton neutre et professionnel.
             - Présentez les informations sous forme de paragraphes et de puces pour faciliter la lecture.
             - N'incluez aucune information personnelle sur l'utilisateur autre que les résultats fournis.
             - Évitez toute mention ou indication que le rapport est généré par une intelligence artificielle.
             - Si pertinent, incluez des descriptions de tableaux ou de graphiques illustrant les scores
        `;

        const response = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });

        const summary = response.choices[0].message.content;

        const nouveauResultat = new ResultsBigfive({
            scores,
            summary,
            userAnswers
        });

        await nouveauResultat.save();
        res.status(201).json({ message: "Result saved successfully", summary, scores });
    } catch (err) {
        console.error("Error saving result:", err);
        res.status(500).json({ error: "Error saving result", details: err.message });
    }
};
