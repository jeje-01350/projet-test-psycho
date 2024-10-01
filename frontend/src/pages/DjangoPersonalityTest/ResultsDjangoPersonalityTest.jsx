import React from "react";
import { Typography, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Enregistrer les composants pour le graphique en barres
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResultsDjangoPersonalityTest = () => {
    const location = useLocation();
    const { summary, scores } = location.state || {}; // Récupérer les scores et le résumé depuis la navigation

    // Préparer les données pour le graphique en barres
    const data = {
        labels: Object.keys(scores),  // Les labels des traits de personnalité (par ex : "Confiance", "Agréabilité", etc.)
        datasets: [
            {
                label: 'Scores de personnalité (%)',
                data: Object.values(scores),  // Les scores correspondants
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                ],
                borderColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Options du graphique pour améliorer les visuels
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Cacher la légende
            },
            title: {
                display: true,
                text: 'Scores de personnalité Django Test',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Score (%)',
                },
            },
        },
    };

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
            <Typography variant="h5" sx={{ fontSize: "2rem", mb: 3 }}>
                Vos Scores de Personnalité :
            </Typography>

            {/* Graphique en barres pour les scores de personnalité */}
            <Box sx={{ width: '100%', maxWidth: '800px' }}>
                <Bar data={data} options={options} />
            </Box>

            {/* Affichage du résumé en dessous du graphique */}
            <Typography variant="h6" sx={{ mt: 4 }}>
                Résumé :
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, textAlign: "center", maxWidth: '800px' }}>
                {summary}
            </Typography>
        </Box>
    );
};

export default ResultsDjangoPersonalityTest;
