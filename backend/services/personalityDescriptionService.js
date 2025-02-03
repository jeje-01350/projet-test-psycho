const descriptions = require('../config/descriptions.json');

class PersonalityDescriptionService {
    getLetterDescription(letter) {
        const letterData = descriptions.letters[letter];
        if (!letterData) return 'Description non disponible.';

        return `Vous avez une ${letterData.title}. ${letterData.description}
        Vos forces sont votre ${letterData.forces.join(', ')}.
        Vos faiblesses peuvent être ${letterData.faiblesses.join(', ')}.`;
    }

    getColorDescription(color) {
        const colorData = descriptions.colors[color];
        if (!colorData) return 'Description non disponible.';

        return `Vous êtes un ${colorData.title}. ${colorData.description}
        Vos forces sont votre ${colorData.forces.join(', ')}.
        Vos faiblesses peuvent être ${colorData.faiblesses.join(', ')}.`;
    }

    formatHTMLReport(text, analysisType, firstname, name) {
        const headerTitle = analysisType === "color"
            ? `<h1>Analyse de votre profil - Résultat Couleur<br>${firstname} ${name}</h1>`
            : `<h1>Analyse de votre profil - Résultat Lettre<br>${firstname} ${name}</h1>`;

        const subTitle = analysisType === "color"
            ? `<h2>Découvrez vos atouts et pistes professionnelles</h2>`
            : `<h2>Comprenez votre potentiel et projetez-vous dans l'avenir</h2>`;

        // Nettoyer le texte des balises markdown
        text = text
            .replace(/# Analyse de votre profil - Résultat (Couleur|Lettre)/g, '')
            .replace(/## (Découvrez vos atouts et pistes professionnelles|Comprenez votre potentiel et projetez-vous dans l'avenir)/g, '')
            .replace(/\*\*/g, '')
            .replace(/\d+\.\s/g, '')
            .trim();

        const sections = text.split('\n\n');

        let htmlContent = `${headerTitle}${subTitle}`;
        sections.forEach((section) => {
            htmlContent += `<p>${section.trim()}</p>`;
        });

        return htmlContent;
    }

    getPromptData(score, type) {
        const data = {
            color: this.getColorDescription(score.color),
            letter: this.getLetterDescription(score.letters)
        };

        return type === 'color' ? data.color : data.letter;
    }
}

module.exports = new PersonalityDescriptionService(); 