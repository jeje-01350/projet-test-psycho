const CallModjo = require('../models/CallModjo');

exports.saveModjoCall = async (req, res) => {
    try {
        const { hs_object_id, call_note } = req.body;

        if (!hs_object_id || !call_note) {
            return res.status(400).json({ error: 'Veuillez fournir hs_object_id et call_note.' });
        }

        const newCall = new CallModjo({
            hs_object_id,
            call_note
        });

        await newCall.save();

        res.status(201).json({ message: 'Appel enregistré avec succès.', data: newCall });
    } catch (error) {
        console.error('Erreur lors de la sauvegarde de l\'appel:', error);
        res.status(500).json({ error: 'Erreur lors de la sauvegarde de l\'appel.', details: error.message });
    }
};
