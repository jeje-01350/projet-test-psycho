const CallModjo = require('../models/CallModjo');
const { getHsObjectIdData } = require('../controllers/personalityTestController');
const ResultsPersonalityTest = require('../models/ResultsPersonalityTest');
const OpenAI = require('openai');
const {saveHubspotTest} = require("./personalityTestController");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

exports.saveModjoCall = async (req, res) => {

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

    try {
        const { hs_object_id, call_note, call_note_visio } = req.body;

        if (!hs_object_id) {
            return res.status(400).json({ error: 'Veuillez fournir hs_object_id' });
        }

        let bilanLetterV2 = null;
        let bilanColorV2 = null;

        let existingCall = await CallModjo.findOne({ hs_object_id });

        if (existingCall) {
            if (call_note) {
                existingCall.call_note = call_note;
            }

            if (call_note_visio) {
                existingCall.call_note_visio = call_note_visio;

                const result = await ResultsPersonalityTest.findOne({ hs_object_id });
                if (!result) {
                    return res.status(404).json({ error: 'Aucun résultat trouvé pour cet hs_object_id' });
                }

                const { color, letter } = result;

                const promptBilanLetter = `
                Objectif : Renforcer l’envie du candidat en liant les résultats de la lettre avec l’analyse de la couleur pour donner une vision globale de son potentiel et des actions possibles.
    
                Vous êtes une IA générant un rapport psychométrique personnalisé basé sur le test MBTI. Ce rapport est destiné à un candidat dans le cadre d’un processus commercial. Il vise à valoriser ses résultats de lettre en les liant subtilement à son analyse de couleur, tout en renforçant son intérêt pour un bilan de compétences. Respectez strictement les consignes suivantes :  
                
                1. **Page de Titre :**  
                   - Titre principal : "Analyse de votre profil - Résultat Lettre".  
                   - Sous-titre : "Comprenez votre potentiel et projetez-vous dans l’avenir".  
                   - N’incluez aucun autre contenu sur cette page.
                
                2. **Introduction :**  
                   - Présentez la lettre comme un complément essentiel à l’analyse de la couleur.  
                   - Exemple :  
                     *"Ce rapport explore votre résultat de lettre, un élément clé pour comprendre votre manière d’interagir avec les environnements professionnels. Associée à votre analyse couleur, elle permet d’obtenir une vision globale et équilibrée de votre profil."*
                
                3. **Analyse de la Lettre :**  
                   - Présentez la lettre obtenue et deux adjectifs clés issus de sa description.  
                     Exemple : "Votre lettre, A, reflète une personnalité confiante et pragmatique."  
                   - **Forces principales :** Détaillez 2-3 forces clés issues de la description.  
                     Exemple : *"Vous êtes reconnu(e) pour votre aptitude à [force 1], et votre capacité à [force 2] est un véritable atout dans des environnements exigeants."*  
                   - **Faiblesses potentielles :** Mentionnez 1-2 faiblesses de manière constructive, en proposant l’accompagnement comme une solution.  
                
                4. **Contexte Professionnel Propice :**  
                   - Décrivez des environnements où ce profil peut exceller, en lien avec la lettre.  
                   - Donnez des exemples concrets de rôles professionnels.  
                     Exemple : *"Ce profil est souvent valorisé dans des rôles comme [rôle 1] ou [rôle 2], qui nécessitent [compétence clé]."*  
                
                5. **Lien avec l’Analyse de la Couleur :**  
                   - Expliquez comment la lettre et la couleur se complètent pour offrir une vision globale.  
                     Exemple :  
                     *"Associée à votre couleur (${color}), votre lettre (${letter}) met en lumière une combinaison unique de qualités qui vous positionne idéalement pour des opportunités professionnelles alignées avec vos ambitions."*
                
                6. **Synthèse et Appel à l’Action :**  
                   - Résumez les points clés et concluez avec un appel à l’action engageant :  
                     Exemple :  
                     *"Ce rapport met en avant vos atouts et ouvre des perspectives passionnantes. Un bilan de compétences approfondi vous permettrait d’aligner vos qualités sur des objectifs professionnels concrets et réalisables."*  
                   - Ajoutez un disclaimer neutre :  
                     *"Ces résultats constituent une base pour une réflexion approfondie et peuvent être utilisés dans un cadre personnalisé."*
                
                **Variables à intégrer :**
                - Lettre : ${JSON.stringify(letter)}  
                - Description de la lettre : ${getLettersDescription(letter)}  
                - Description de la couleur : ${getColorsDescription(color)}  
                - Transcriptions (informations à utiliser subtilement) : ${call_note_visio} et ${existingCall.call_note}
                
                **Instructions supplémentaires :**
                - Rédigez des paragraphes fluides et engageants.  
                - Excluez toute mention explicite des transcriptions ou d’intelligence artificielle.
            `;

                const promptBilanColor = `
                Objectif : Susciter l’intérêt du candidat en valorisant subtilement ses forces tout en le projetant dans un contexte professionnel motivant.
    
                Vous êtes une IA générant un rapport psychométrique personnalisé basé sur le test MBTI. Ce rapport est destiné à un candidat dans le cadre d’un processus commercial. Il vise à valoriser ses résultats de couleur et à renforcer son intérêt pour un accompagnement professionnel (bilan de compétences). Respectez strictement les consignes suivantes :  
                
                1. **Page de Titre :**  
                   - Titre principal : "Analyse de votre profil - Résultat Couleur".  
                   - Sous-titre : "Découvrez vos atouts et pistes professionnelles".  
                   - N’incluez aucun autre contenu sur cette page.
                
                2. **Introduction :**  
                   - Expliquez brièvement l’objectif du rapport sans jugement ni superlatifs.  
                   - Exemple :  
                     *"Ce rapport présente une analyse de votre profil à travers la couleur obtenue lors du test. Il met en lumière vos forces et propose des pistes pour explorer votre potentiel dans un contexte professionnel adapté."*
                
                3. **Analyse de la Couleur :**  
                   - Présentez la couleur obtenue et deux adjectifs clés issus de sa description.  
                     Exemple : "Votre couleur, bleu, reflète une personnalité empathique et ouverte."  
                   - **Forces principales :** Mettez en avant 2-3 forces clés liées à cette couleur.  
                     Exemple : *"Vous excellez dans [force 1] et votre aptitude à [force 2] est particulièrement précieuse dans des environnements exigeants."*  
                   - **Faiblesses potentielles :** Mentionnez 1-2 faiblesses potentielles de manière constructive, tout en les positionnant comme des opportunités d’amélioration grâce à un accompagnement.  
                     Exemple : *"Ces aspects pourraient être des axes à développer pour renforcer votre impact professionnel."*
                
                4. **Contexte Professionnel Propice :**  
                   - Décrivez des environnements où ce profil peut exceller, en lien avec les résultats.  
                   - Donnez des exemples concrets de rôles professionnels.  
                     Exemple : *"Vous pourriez vous épanouir dans des rôles nécessitant [compétence clé], comme [rôle 1] ou [rôle 2]."*
                
                5. **Synthèse et Appel à l’Action :**  
                   - Résumez les points clés et concluez avec un appel à l’action engageant :  
                     Exemple :  
                     *"Votre profil met en avant un potentiel riche et prometteur. Un bilan de compétences approfondi vous permettrait de transformer ces qualités en opportunités concrètes pour atteindre vos objectifs professionnels."*  
                   - Ajoutez un disclaimer neutre :  
                     *"Ces résultats peuvent être utilisés pour une analyse approfondie dans un cadre personnalisé."*
                
                **Variables à intégrer :**
                - Couleur : ${JSON.stringify(color)}  
                - Description de la couleur : ${getColorsDescription(color)}  
                - Transcriptions (informations à utiliser subtilement) : ${call_note_visio} et ${existingCall.call_note}
                
                **Instructions supplémentaires :**
                - Rédigez des paragraphes fluides et engageants.  
                - Excluez toute mention explicite des transcriptions ou d’intelligence artificielle.
            `;

                const responseBilanLetter = await client.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: promptBilanLetter }],
                });

                const responseBilanColor = await client.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: promptBilanColor }],
                });

                bilanLetterV2 = responseBilanLetter.choices[0].message.content;
                bilanColorV2 = responseBilanColor.choices[0].message.content;

                existingCall.bilanLetterV2 = bilanLetterV2;
                existingCall.bilanColorV2 = bilanColorV2;
            }

            await existingCall.save();
            return res.status(200).json({
                message: 'Appel mis à jour avec succès.',
                data: {
                    ...existingCall.toObject(),
                    bilanLetterV2,
                    bilanColorV2,
                }
            });
        } else {
            if (!call_note_visio) {
                return res.status(400).json({ error: 'call_note_visio est requis pour créer un nouvel appel.' });
            }

            const result = await ResultsPersonalityTest.findOne({ hs_object_id });
            if (!result) {
                return res.status(404).json({ error: 'Aucun résultat trouvé pour cet hs_object_id' });
            }

            const { color, letter } = result;

            const promptBilanColor = `
                Objectif : Susciter l’intérêt du candidat en valorisant subtilement ses forces tout en le projetant dans un contexte professionnel motivant.
    
                Vous êtes une IA générant un rapport psychométrique personnalisé basé sur le test MBTI. Ce rapport est destiné à un candidat dans le cadre d’un processus commercial. Il vise à valoriser ses résultats de couleur et à renforcer son intérêt pour un accompagnement professionnel (bilan de compétences). Respectez strictement les consignes suivantes :  
                
                1. **Page de Titre :**  
                   - Titre principal : "Analyse de votre profil - Résultat Couleur".  
                   - Sous-titre : "Découvrez vos atouts et pistes professionnelles".  
                   - N’incluez aucun autre contenu sur cette page.
                
                2. **Introduction :**  
                   - Expliquez brièvement l’objectif du rapport sans jugement ni superlatifs.  
                   - Exemple :  
                     *"Ce rapport présente une analyse de votre profil à travers la couleur obtenue lors du test. Il met en lumière vos forces et propose des pistes pour explorer votre potentiel dans un contexte professionnel adapté."*
                
                3. **Analyse de la Couleur :**  
                   - Présentez la couleur obtenue et deux adjectifs clés issus de sa description.  
                     Exemple : "Votre couleur, bleu, reflète une personnalité empathique et ouverte."  
                   - **Forces principales :** Mettez en avant 2-3 forces clés liées à cette couleur.  
                     Exemple : *"Vous excellez dans [force 1] et votre aptitude à [force 2] est particulièrement précieuse dans des environnements exigeants."*  
                   - **Faiblesses potentielles :** Mentionnez 1-2 faiblesses potentielles de manière constructive, tout en les positionnant comme des opportunités d’amélioration grâce à un accompagnement.  
                     Exemple : *"Ces aspects pourraient être des axes à développer pour renforcer votre impact professionnel."*
                
                4. **Contexte Professionnel Propice :**  
                   - Décrivez des environnements où ce profil peut exceller, en lien avec les résultats.  
                   - Donnez des exemples concrets de rôles professionnels.  
                     Exemple : *"Vous pourriez vous épanouir dans des rôles nécessitant [compétence clé], comme [rôle 1] ou [rôle 2]."*
                
                5. **Synthèse et Appel à l’Action :**  
                   - Résumez les points clés et concluez avec un appel à l’action engageant :  
                     Exemple :  
                     *"Votre profil met en avant un potentiel riche et prometteur. Un bilan de compétences approfondi vous permettrait de transformer ces qualités en opportunités concrètes pour atteindre vos objectifs professionnels."*  
                   - Ajoutez un disclaimer neutre :  
                     *"Ces résultats peuvent être utilisés pour une analyse approfondie dans un cadre personnalisé."*
                
                **Variables à intégrer :**
                - Couleur : ${JSON.stringify(color)}  
                - Description de la couleur : ${getColorsDescription(color)}  
                - Transcriptions (informations à utiliser subtilement) : ${call_note_visio} et ${existingCall.call_note}
                
                **Instructions supplémentaires :**
                - Rédigez des paragraphes fluides et engageants.  
                - Excluez toute mention explicite des transcriptions ou d’intelligence artificielle.
            `;

            const responseBilanColor = await client.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: promptBilanColor }],
            });
            bilanColorV2 = responseBilanColor.choices[0].message.content;

            const promptBilanLetter = `
                Objectif : Renforcer l’envie du candidat en liant les résultats de la lettre avec l’analyse de la couleur pour donner une vision globale de son potentiel et des actions possibles.
    
                Vous êtes une IA générant un rapport psychométrique personnalisé basé sur le test MBTI. Ce rapport est destiné à un candidat dans le cadre d’un processus commercial. Il vise à valoriser ses résultats de lettre en les liant subtilement à son analyse de couleur, tout en renforçant son intérêt pour un bilan de compétences. Respectez strictement les consignes suivantes :  
                
                1. **Page de Titre :**  
                   - Titre principal : "Analyse de votre profil - Résultat Lettre".  
                   - Sous-titre : "Comprenez votre potentiel et projetez-vous dans l’avenir".  
                   - N’incluez aucun autre contenu sur cette page.
                
                2. **Introduction :**  
                   - Présentez la lettre comme un complément essentiel à l’analyse de la couleur.  
                   - Exemple :  
                     *"Ce rapport explore votre résultat de lettre, un élément clé pour comprendre votre manière d’interagir avec les environnements professionnels. Associée à votre analyse couleur, elle permet d’obtenir une vision globale et équilibrée de votre profil."*
                
                3. **Analyse de la Lettre :**  
                   - Présentez la lettre obtenue et deux adjectifs clés issus de sa description.  
                     Exemple : "Votre lettre, A, reflète une personnalité confiante et pragmatique."  
                   - **Forces principales :** Détaillez 2-3 forces clés issues de la description.  
                     Exemple : *"Vous êtes reconnu(e) pour votre aptitude à [force 1], et votre capacité à [force 2] est un véritable atout dans des environnements exigeants."*  
                   - **Faiblesses potentielles :** Mentionnez 1-2 faiblesses de manière constructive, en proposant l’accompagnement comme une solution.  
                
                4. **Contexte Professionnel Propice :**  
                   - Décrivez des environnements où ce profil peut exceller, en lien avec la lettre.  
                   - Donnez des exemples concrets de rôles professionnels.  
                     Exemple : *"Ce profil est souvent valorisé dans des rôles comme [rôle 1] ou [rôle 2], qui nécessitent [compétence clé]."*  
                
                5. **Lien avec l’Analyse de la Couleur :**  
                   - Expliquez comment la lettre et la couleur se complètent pour offrir une vision globale, en se servant de l'analyse ${bilanColorV2} 
                     Exemple :  
                     *"Associée à votre couleur (${color}), votre lettre (${letter}) met en lumière une combinaison unique de qualités qui vous positionne idéalement pour des opportunités professionnelles alignées avec vos ambitions."*
                
                6. **Synthèse et Appel à l’Action :**  
                   - Résumez les points clés et concluez avec un appel à l’action engageant :  
                     Exemple :  
                     *"Ce rapport met en avant vos atouts et ouvre des perspectives passionnantes. Un bilan de compétences approfondi vous permettrait d’aligner vos qualités sur des objectifs professionnels concrets et réalisables."*  
                   - Ajoutez un disclaimer neutre :  
                     *"Ces résultats constituent une base pour une réflexion approfondie et peuvent être utilisés dans un cadre personnalisé."*
                
                **Variables à intégrer :**
                - Lettre : ${JSON.stringify(letter)}  
                - Description de la lettre : ${getLettersDescription(letter)}
                - Description de la couleur : ${getColorsDescription(color)}
                - Transcriptions (informations à utiliser subtilement) : ${call_note_visio} et ${existingCall.call_note}
                
                **Instructions supplémentaires :**
                - Rédigez des paragraphes fluides et engageants.  
                - Excluez toute mention explicite des transcriptions ou d’intelligence artificielle.
            `;

            const responseBilanLetter = await client.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: promptBilanLetter }],
            });

            bilanLetterV2 = responseBilanLetter.choices[0].message.content;
            const newCall = new CallModjo({
                hs_object_id,
                call_note,
                call_note_visio,
                bilanLetterV2,
                bilanColorV2,
            });

            await newCall.save();

            // Sending data to HubSpot endpoint
            await saveHubspotTest({ body: { hs_object_id, rapport_couleur_situatio : bilanColorV2, rapport_lettre_situatio : bilanLetterV2 } });

            return res.status(201).json({
                message: 'Nouvel appel enregistré avec succès.',
                data: newCall
            });
        }
    } catch (error) {
        console.error('Erreur lors de la sauvegarde de l\'appel:', error);
        res.status(500).json({ error: 'Erreur lors de la sauvegarde de l\'appel.', details: error.message });
    }
};

