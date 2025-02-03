const ResultsPersonalityTest = require('../models/ResultsPersonalityTest');
const OpenAI = require('openai');
const axios = require('axios');
const CallModjo = require('../models/CallModjo');
const {launch} = require("puppeteer");
const fs = require("fs");
const path = require('path');
const personalityDescriptionService = require('../services/personalityDescriptionService');

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

exports.saveHubspotTest = async (req, res) => {
    try {
        const { body } = req;

        console.log('body recu');
        if (!body) {
            return res.status(400).json({ error: 'Aucun corps de requête fourni.' });
        }

        const response = await axios.post('https://hooks.zapier.com/hooks/catch/11072818/2saof9s/', body, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((data) => {
            res.status(200).json({status : 'success'})
        })
        .catch((error) => {
            console.error('Erreur lors de l\'envoi à HubSpot:', error);
            res.status(500).json({ error: 'Erreur lors de l\'envoi à HubSpot.', details: error.message });
        })



    } catch (error) {
        console.error('Erreur lors de l\'envoi à HubSpot:', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi à HubSpot.', details: error.message });
    }
}

async function generatePDF(templatePath, replacements, pdfName) {
    const browser = await launch();
    const page = await browser.newPage();

    let template = fs.readFileSync(templatePath, 'utf8');
    for (const key in replacements) {
        template = template.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]);
    }

    await page.setContent(template, { waitUntil: 'networkidle0' });

    const pdfPath = path.join(__dirname, '../pdf', pdfName);
    await page.pdf({ path: pdfPath, format: 'A4' });

    await browser.close();
    return pdfPath;
}

exports.savePersonalityTestResult = async (req, res) => {
    try {
        const { score, userAnswers, hs_object_id, name, firstname, email } = req.body;

        if (!score || !userAnswers || !hs_object_id) {
            return res.status(400).json({ error: 'Veuillez fournir toutes les informations.' });
        }

        let modjoCallData;
        try {
            modjoCallData = await CallModjo.findOne({ hs_object_id });
        } catch (error) {
            console.error('Erreur lors de la récupération des données Modjo:', error);
            return res.status(500).json({ error: 'Erreur lors de la récupération des données Modjo.', details: error.message });
        }

        const promptPhaseFinal = `
            Objectif : Susciter l'intérêt du candidat en valorisant subtilement ses forces tout en le projetant dans un contexte professionnel motivant.

            Vous êtes une IA générant un rapport psychométrique personnalisé basé sur le test MBTI. Ce rapport est destiné à un candidat dans le cadre d'un processus commercial. Il vise à valoriser ses résultats de couleur et à renforcer son intérêt pour un accompagnement professionnel (bilan de compétences). Respectez strictement les consignes suivantes :  
            
            1. **Page de Titre :**  
               - Titre principal : "Analyse de votre profil - Résultat Couleur".  
               - Sous-titre : "Découvrez vos atouts et pistes professionnelles".  
               - N'incluez aucun autre contenu sur cette page.
            
            2. **Introduction :**  
               - Expliquez brièvement l'objectif du rapport sans jugement ni superlatifs.  
               - Exemple :  
                 *"Ce rapport présente une analyse de votre profil à travers la couleur obtenue lors du test. Il met en lumière vos forces et propose des pistes pour explorer votre potentiel dans un contexte professionnel adapté."*
            
            3. **Analyse de la Couleur :**  
               - Présentez la couleur obtenue et deux adjectifs clés issus de sa description.  
                 Exemple : "Votre couleur, bleu, reflète une personnalité empathique et ouverte."  
               - **Forces principales :** Mettez en avant 2-3 forces clés liées à cette couleur.  
                 Exemple : *"Vous excellez dans [force 1] et votre aptitude à [force 2] est particulièrement précieuse dans des environnements exigeants."*  
               - **Faiblesses potentielles :** Mentionnez 1-2 faiblesses potentielles de manière constructive, tout en les positionnant comme des opportunités d'amélioration grâce à un accompagnement.  
                 Exemple : *"Ces aspects pourraient être des axes à développer pour renforcer votre impact professionnel."*
            
            4. **Contexte Professionnel Propice :**  
               - Décrivez des environnements où ce profil peut exceller, en lien avec les résultats.  
               - Donnez des exemples concrets de rôles professionnels.  
                 Exemple : *"Vous pourriez vous épanouir dans des rôles nécessitant [compétence clé], comme [rôle 1] ou [rôle 2]."*
            
            5. **Synthèse et Appel à l'Action :**  
               - Résumez les points clés et concluez avec un appel à l'action engageant.  
               - Ajoutez un disclaimer neutre.
            
            **Variables à intégrer :**
            - Couleur : ${JSON.stringify(score.color)}  
            - Description de la couleur : ${personalityDescriptionService.getPromptData(score, 'color')}  
            - Transcriptions (informations à utiliser subtilement) : ${modjoCallData}
        `;

        const responsePhaseFinal = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: promptPhaseFinal }],
        });

        const bilanColor = responsePhaseFinal.choices[0].message.content;

        const promptPhaseIntegration = `
            Objectif : Renforcer l'envie du candidat en liant les résultats de la lettre avec l'analyse de la couleur pour donner une vision globale de son potentiel et des actions possibles.

            Vous êtes une IA générant un rapport psychométrique personnalisé basé sur le test MBTI. Ce rapport est destiné à un candidat dans le cadre d'un processus commercial. Il vise à valoriser ses résultats de lettre en les liant subtilement à son analyse de couleur, tout en renforçant son intérêt pour un bilan de compétences. Respectez strictement les consignes suivantes :  
            
            1. **Page de Titre :**  
               - Titre principal : "Analyse de votre profil - Résultat Lettre".  
               - Sous-titre : "Comprenez votre potentiel et projetez-vous dans l'avenir".  
               - N'incluez aucun autre contenu sur cette page.
            
            2. **Introduction :**  
               - Présentez la lettre comme un complément essentiel à l'analyse de la couleur.  
               - Exemple :  
                 *"Ce rapport explore votre résultat de lettre, un élément clé pour comprendre votre manière d'interagir avec les environnements professionnels. Associée à votre analyse couleur, elle permet d'obtenir une vision globale et équilibrée de votre profil."*
            
            3. **Analyse de la Lettre :**  
               - Présentez la lettre obtenue et deux adjectifs clés issus de sa description.  
                 Exemple : "Votre lettre, A, reflète une personnalité confiante et pragmatique."  
               - **Forces principales :** Détaillez 2-3 forces clés issues de la description.  
                 Exemple : *"Vous êtes reconnu(e) pour votre aptitude à [force 1], et votre capacité à [force 2] est un véritable atout dans des environnements exigeants."*  
               - **Faiblesses potentielles :** Mentionnez 1-2 faiblesses de manière constructive, en proposant l'accompagnement comme une solution.  
            
            4. **Contexte Professionnel Propice :**  
               - Décrivez des environnements où ce profil peut exceller, en lien avec la lettre.  
               - Donnez des exemples concrets de rôles professionnels.  
                 Exemple : *"Ce profil est souvent valorisé dans des rôles comme [rôle 1] ou [rôle 2], qui nécessitent [compétence clé]."*  
            
            5. **Lien avec l'Analyse de la Couleur :**  
               - Expliquez comment la lettre et la couleur se complètent pour offrir une vision globale.  
            
            6. **Synthèse et Appel à l'Action :**  
               - Résumez les points clés et concluez avec un appel à l'action engageant.  
               - Ajoutez un disclaimer neutre.
            
            **Variables à intégrer :**
            - Lettre : ${JSON.stringify(score.letters)}  
            - Description de la lettre : ${personalityDescriptionService.getPromptData(score, 'letter')}  
            - Description de la couleur : ${personalityDescriptionService.getPromptData(score, 'color')}  
            - Transcriptions (informations à utiliser subtilement) : ${modjoCallData}
        `;

        const responsePhaseIntegration = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: promptPhaseIntegration }],
        });

        const bilanLetter = responsePhaseIntegration.choices[0].message.content;

        const bilanLetterHTML = personalityDescriptionService.formatHTMLReport(bilanLetter, 'letter', firstname, name);
        const bilanColorHTML = personalityDescriptionService.formatHTMLReport(bilanColor, 'color', firstname, name);

        const templatePath = path.join(__dirname, '../pdf/pdfTemplate.html');

        const pdfLetterPath = await generatePDF(templatePath, {
            color: score.color,
            text_rapport: bilanLetterHTML,
            title: "pdf analyse de la lettre du candidat",
        }, 'rapport_letter.pdf');

        const pdfColorPath = await generatePDF(templatePath, {
            color: score.color,
            text_rapport: bilanColorHTML,
            title: "pdf analyse de la couleur du candidat",
        }, 'rapport_color.pdf');

        const newResult = new ResultsPersonalityTest({
            hs_object_id,
            letter: score.letters,
            email,
            color: score.color
        });

        await newResult.save();

        res.status(201).json({
            message: 'Résultat sauvegardé avec succès.',
            data: newResult,
            bilanLetter,
            bilanColor,
            pdfColor: fs.readFileSync(pdfColorPath, { encoding: 'base64' }),
            pdfLetter: fs.readFileSync(pdfLetterPath, { encoding: 'base64' }),
            modjoCallData
        });
    } catch (err) {
        console.error("Error saving result:", err);
        res.status(500).json({ error: "Error saving result", details: err.message });
    }
};

exports.checkHsObjectId = async (req, res) => {
    try {
        const { hs_object_id } = req.params;

        if (!hs_object_id) {
            return res.status(400).json({ error: 'hs_object_id manquant.' });
        }

        const recordID = parseInt(hs_object_id, 10);
        if (isNaN(recordID)) {
            return res.status(400).json({ error: 'hs_object_id doit être un entier.' });
        }

        const result = await ResultsPersonalityTest.findOne({ hs_object_id: recordID });

        return res.status(200).json({
            exists: result ? true : false,
            data: result || null,
            message: result ? undefined : 'hs_object_id non trouvé.'
        });

    } catch (err) {
        console.error("Error checking hs_object_id:", err);
        return res.status(500).json({ 
            error: "Erreur lors de la vérification du hs_object_id", 
            details: err.message 
        });
    }
};
