const MindFlareResult = require("../models/ResultsMindFlare");
const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

exports.saveResult = async (req, res) => {
    try {
        const { user_name, user_age, scores, userAnswers } = req.body;

        if (!user_name || !user_age || !scores || !userAnswers) {
            return res.status(400).json({ error: "Informations manquantes." });
        }

        const prompt = `
            Rôle : Vous êtes un analyste spécialisé dans les tests de personnalité.
        
            Contexte : L'utilisateur ${user_name}, âgé de ${user_age}, a réalisé le test de personnalité MindFlare. Ce test évalue différents traits de personnalité sur une échelle de 1 à 10, où 1 représente le score le plus faible et 10 le score le plus élevé. Voici les scores obtenus par l'utilisateur :
        
            ${Object.entries(scores).map(([trait, score]) => `${trait} : ${score}/10`).join("\n")}
        
            Exemple d'interprétation : 
            - Un score de 8 ou plus indique un point fort.
            - Un score de 4 ou moins signale un axe de développement potentiel.
        
            Tâche : En tant qu'analyste, analysez ces scores et fournissez un résumé structuré en mettant en évidence :
            - Les principaux points forts de la personnalité de l'utilisateur.
            - Les traits de caractère moins développés ou à améliorer.
            - Des suggestions concrètes pour renforcer les traits les moins marqués.
        
            Ton : Professionnel, bienveillant et orienté vers l'amélioration personnelle.
        `;


        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }]
        });

        const summary = response.choices[0].message.content;

        const newResult = new MindFlareResult({
            user_name,
            user_age,
            scores,
            summary,
            userAnswers
        });

        await newResult.save();

        res.status(201).json({ message: "Résultat sauvegardé avec succès.", summary });
    } catch (err) {
        console.error("Error saving result:", err);
        res.status(500).json({ error: "Error saving result", details: err.message });
    }
};
