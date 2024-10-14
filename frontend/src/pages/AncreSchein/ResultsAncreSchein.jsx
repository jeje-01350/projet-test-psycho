import React from "react";
import { Typography, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Enregistrer les composants pour le graphique en barres
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResultsBigFive = () => {
    const location = useLocation();
    const { summary, scores } = location.state || {};

    // Générer dynamiquement des couleurs pour chaque domaine
    const generateColors = (count) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            const hue = (i * 360 / count) % 360;  // Répartir les couleurs sur le spectre
            colors.push(`hsl(${hue}, 70%, 50%)`); // Utiliser des couleurs HSL pour une bonne répartition
        }
        return colors;
    };

    const labels = Object.keys(scores);
    const values = Object.values(scores);

    const backgroundColors = generateColors(labels.length);
    const borderColors = backgroundColors.map(color => color);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Scores de personnalité (%)',
                data: values,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Scores du test ancre de Schein',
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

            <Box sx={{ width: '100%', maxWidth: '800px' }}>
                <Bar data={data} options={options} />
            </Box>

            <Typography variant="h6" sx={{ mt: 4 }}>
                Résumé :
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, textAlign: "center", maxWidth: '800px' }}>
                {summary}
            </Typography>
        </Box>
    );
};

export default ResultsBigFive;
