const CallModjo = require('../models/CallModjo');

exports.saveModjoCall = async (req, res) => {
    try {
        const { hs_object_id, call_note, call_note_visio } = req.body;

        if (!hs_object_id ) {
            return res.status(400).json({ error: 'Veuillez fournir hs_object_id' });
        }

        const newCall = new CallModjo({
            hs_object_id,
            call_note,
            call_note_visio
        });

        await newCall.save();

        res.status(201).json({ message: 'Appel enregistré avec succès.', data: newCall });
    } catch (error) {
        console.error('Erreur lors de la sauvegarde de l\'appel:', error);
        res.status(500).json({ error: 'Erreur lors de la sauvegarde de l\'appel.', details: error.message });
    }
};
