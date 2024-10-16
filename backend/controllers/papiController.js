const ResultsPapi = require("../models/ResultsPapi");
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

        const prompt = `Voici les scores d'un utilisateur pour les traits de la personnalité Big Five : ${JSON.stringify(scores)}. 
        Donne-moi un résumé général pour cette personne.`;

        const response = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });

        const summary = response.choices[0].message.content;

        const nouveauResultat = new ResultsPapi({
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
