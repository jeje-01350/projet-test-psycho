const DiscResult = require('../models/DiscResult');

const discController = {
  saveResults: async (req, res) => {
    try {
      const { scores, userAnswers, testDuration } = req.body;

      // Déterminer le style primaire et secondaire
      const styles = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      const primaryStyle = styles[0][0];
      const secondaryStyle = styles[1][0];

      const result = new DiscResult({
        scores,
        primaryStyle,
        secondaryStyle,
        userAnswers,
        testDuration
      });

      await result.save();

      // Générer les descriptions des résultats
      const resultDescriptions = generateResultDescriptions(scores, primaryStyle, secondaryStyle);

      res.status(201).json({
        success: true,
        data: {
          ...result.toObject(),
          descriptions: resultDescriptions
        }
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des résultats DISC:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la sauvegarde des résultats'
      });
    }
  },

  getAllResults: async (req, res) => {
    try {
      const results = await DiscResult.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        data: results
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des résultats DISC:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des résultats'
      });
    }
  }
};

function generateResultDescriptions(scores, primaryStyle, secondaryStyle) {
  const descriptions = {
    D: {
      high: "Vous êtes naturellement orienté vers l'action et les résultats. Vous aimez relever des défis et prendre des décisions rapides.",
      low: "Vous préférez une approche réfléchie et collaborative plutôt que directive."
    },
    I: {
      high: "Vous êtes sociable, expressif et optimiste. Vous excellez dans la communication et l'établissement de relations.",
      low: "Vous êtes plus réservé et préférez vous concentrer sur les faits plutôt que sur les interactions sociales."
    },
    S: {
      high: "Vous êtes patient, loyal et fiable. Vous appréciez la stabilité et travaillez bien en équipe.",
      low: "Vous vous adaptez facilement au changement et préférez un environnement dynamique."
    },
    C: {
      high: "Vous êtes analytique, précis et méthodique. Vous accordez une grande importance aux détails et à la qualité.",
      low: "Vous préférez une approche plus flexible et moins axée sur les détails."
    }
  };

  const profile = {
    general: `Votre profil DISC principal est ${primaryStyle} avec ${secondaryStyle} comme style secondaire.`,
    primary: descriptions[primaryStyle][scores[primaryStyle] > 50 ? 'high' : 'low'],
    secondary: descriptions[secondaryStyle][scores[secondaryStyle] > 50 ? 'high' : 'low'],
    advice: generateAdvice(primaryStyle, secondaryStyle)
  };

  return profile;
}

function generateAdvice(primaryStyle, secondaryStyle) {
  const adviceMap = {
    D: {
      I: "Essayez de prendre en compte les sentiments des autres tout en poursuivant vos objectifs.",
      S: "Prenez le temps d'écouter et de construire des relations stables.",
      C: "Équilibrez votre besoin d'action avec une analyse approfondie."
    },
    I: {
      D: "Structurez vos idées et concentrez-vous sur les résultats concrets.",
      S: "Maintenez votre enthousiasme tout en respectant le besoin de stabilité des autres.",
      C: "Appuyez vos idées sur des données et des faits."
    },
    S: {
      D: "Exprimez plus ouvertement vos opinions et prenez plus d'initiatives.",
      I: "Partagez davantage vos idées tout en maintenant votre approche méthodique.",
      C: "Faites confiance à votre intuition tout en maintenant votre rigueur."
    },
    C: {
      D: "Prenez des décisions plus rapides tout en maintenant votre précision.",
      I: "Communiquez plus ouvertement tout en gardant votre approche analytique.",
      S: "Soyez plus flexible face au changement tout en maintenant vos standards."
    }
  };

  return adviceMap[primaryStyle][secondaryStyle] || 
         "Continuez à développer votre conscience de soi et votre adaptabilité.";
}

module.exports = discController; 