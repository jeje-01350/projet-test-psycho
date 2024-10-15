import React from "react";
import { Typography, Box, Paper, Divider } from "@mui/material";
import { useLocation } from "react-router-dom";

const personalityDescriptions = {
    "INTJ": "Architecte : Innovateurs stratégiques, motivés et dotés d'une vision à long terme, souvent indépendants et mystérieux.",
    "INTP": "Logicien : Penseurs inventifs et curieux, ils apprécient la réflexion profonde et la résolution de problèmes complexes.",
    "ENTJ": "Commandant : Leaders audacieux et imaginatifs, ils sont souvent des personnes très stratégiques et déterminées.",
    "ENTP": "Débatteur : Penseurs intelligents et vifs, ils aiment les débats intellectuels et sont stimulés par les idées innovantes.",
    "INFJ": "Avocat : Visionnaires créatifs avec une forte conviction, ils cherchent à rendre le monde meilleur et à aider les autres.",
    "INFP": "Médiateur : Idéalistes empathiques et généreux, ils sont animés par des valeurs profondes et une recherche de l'harmonie.",
    "ENFJ": "Protagoniste : Leaders charismatiques et inspirants, ils se soucient profondément des autres et souhaitent les guider.",
    "ENFP": "Inspirateur : Personnes enthousiastes, créatives et sociables, elles aiment explorer les idées et motiver les autres.",
    "ISTJ": "Logisticien : Individus responsables et dévoués, ils apprécient l'ordre et sont rigoureux dans leur travail.",
    "ISFJ": "Défenseur : Protecteurs attentionnés, loyaux et altruistes, ils placent souvent les besoins des autres avant les leurs.",
    "ESTJ": "Directeur : Organisateurs pratiques et fiables, ils aiment structurer les choses et s'assurer que tout fonctionne bien.",
    "ESFJ": "Consul : Personnes attentionnées et sociables, elles aiment interagir avec les autres et les aider.",
    "ISTP": "Virtuose : Brillants artisans, ils aiment explorer avec leurs mains et résoudre des problèmes mécaniques.",
    "ISFP": "Aventurier : Artistes flexibles et charmants, ils aiment vivre le moment présent et expérimenter de nouvelles choses.",
    "ESTP": "Entrepreneur : Esprits vifs et audacieux, ils aiment vivre des expériences nouvelles et relever des défis.",
    "ESFP": "Artiste : Personnes enjouées et sociables, elles aiment divertir les autres et sont motivées par l'énergie du groupe."
};

const ResultsKapable = () => {
    const location = useLocation();
    const { summary, scores } = location.state || {};

    console.log(summary, scores)

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
            {/* Personality Type Display */}
            <Paper elevation={3} sx={{ padding: "2rem", textAlign: "center", maxWidth: "800px", width: "100%", mb: 3 }}>
                <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                    Votre Type de Personnalité : {scores}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
                    {personalityDescriptions[scores] || "Description non disponible pour ce type de personnalité."}
                </Typography>
            </Paper>

            {/* Affichage du résumé en dessous du graphique */}
            <Paper elevation={2} sx={{ padding: "1.5rem", textAlign: "center", maxWidth: "800px", width: "100%" }}>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Résumé :
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    {summary || "Résumé non disponible."}
                </Typography>
            </Paper>
        </Box>
    );
};

export default ResultsKapable;
