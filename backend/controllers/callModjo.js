const CallModjo = require('../models/CallModjo');

exports.saveModjoCall = async (req, res) => {
    try {
        const { hs_object_id, call_note, call_note_visio } = req.body;

        if (!hs_object_id) {
            return res.status(400).json({ error: 'Veuillez fournir hs_object_id' });
        }

        let existingCall = await CallModjo.findOne({ hs_object_id });

        if (existingCall) {
            if (call_note) {
                if (!existingCall.call_note || existingCall.call_note === '') {
                    existingCall.call_note = call_note;
                } else {
                    existingCall.call_note = call_note;
                }
            }

            if (call_note_visio) {
                if (!existingCall.call_note_visio || existingCall.call_note_visio === '') {
                    existingCall.call_note_visio = call_note_visio;
                } else {
                    existingCall.call_note_visio = call_note_visio;
                }
            }

            await existingCall.save();
            return res.status(200).json({ message: 'Appel mis à jour avec succès.', data: existingCall });
        } else {
            const newCall = new CallModjo({
                hs_object_id,
                call_note,
                call_note_visio
            });

            await newCall.save();
            return res.status(201).json({ message: 'Nouvel appel enregistré avec succès.', data: newCall });
        }
    } catch (error) {
        console.error('Erreur lors de la sauvegarde de l\'appel:', error);
        res.status(500).json({ error: 'Erreur lors de la sauvegarde de l\'appel.', details: error.message });
    }
};
