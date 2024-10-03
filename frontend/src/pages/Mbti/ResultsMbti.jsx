import React from "react";
import { Typography, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Enregistrer les composants pour le graphique en barres
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResultsMbti = () => {
    const location = useLocation();
    const { summary, results } = location.state || {};

    console.log(results, summary)

    // Définir les scores par défaut au cas où certaines valeurs ne sont pas présentes
    const defaultScores = {
        E: results.E || 0,
        I: results.I || 0,
        S: results.S || 0,
        N: results.N || 0,
        T: results.T || 0,
        F: results.F || 0,
        J: results.J || 0,
        P: results.P || 0,
    };

    // Préparer les données pour le graphique en barres
    const chartData = {
        labels: ['Extraversion (E)', 'Introversion (I)', 'Sensation (S)', 'Intuition (N)', 'Pensée (T)', 'Sentiment (F)', 'Jugement (J)', 'Perception (P)'],
        datasets: [
            {
                label: 'Scores MBTI (%)',
                data: [
                    defaultScores.E,
                    defaultScores.I,
                    defaultScores.S,
                    defaultScores.N,
                    defaultScores.T,
                    defaultScores.F,
                    defaultScores.J,
                    defaultScores.P
                ],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#36B2CC',
                    '#FF9966'
                ],
                borderColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#36B2CC',
                    '#FF9966'
                ],
                borderWidth: 1,
            },
        ],
    };

    // Options du graphique pour améliorer les visuels
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Cacher la légende
            },
            title: {
                display: true,
                text: 'Scores MBTI',
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
                Vos Scores MBTI :
            </Typography>

            {/* Graphique en barres pour les scores MBTI */}
            <Box sx={{ width: '100%', maxWidth: '800px' }}>
                <Bar data={chartData} options={chartOptions} />
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

export default ResultsMbti;
