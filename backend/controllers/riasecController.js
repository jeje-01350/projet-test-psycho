const ResultsRiasec = require("../models/ResultsRiasec");
const OpenAI = require('openai');

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

exports.sauvegarderResultat = async (req, res) => {
    try {
        const { resultatPrincipal, resultatSecondaire } = req.body;

        if (!resultatPrincipal) {
            return res.status(400).json({ error: "Résultat requis." });
        }

        const prompt = `
            Donne moi un joueur de pétanque
        `;

        const response = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }]
        });

        const summary = response.choices[0].message.content;

        const nouveauResultat = new ResultsRiasec({
            resultatPrincipal,
            resultatSecondaire,
            summary
        });

        await nouveauResultat.save();

        res.status(201).json({ message: "Résultat sauvegardé avec succès.", summary });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la sauvegarde du résultat." });
    }
};
