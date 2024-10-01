const ResultsPersonalityTest = require('../models/ResultsPersonalityTest');
const OpenAI = require('openai');

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

exports.savePersonalityTestResult = async (req, res) => {
    try {
        const { color, letters, briggs } = req.body;

        if (!color || !letters || !briggs) {
            return res.status(400).json({ error: 'Veuillez fournir toutes les informations.' });
        }

        const prompt = `
        Donne moi une lettre de l'alphabet
        `;

        const response = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }]
        });

        const summary = response.choices[0].message.content;

        const newResult = new ResultsPersonalityTest({
            color,
            letters,
            briggs,
            summary
        });

        await newResult.save();

        res.status(201).json({ message: 'Résultat sauvegardé avec succès.', data: newResult });
    } catch (err) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la sauvegarde du résultat.' });
    }
};
