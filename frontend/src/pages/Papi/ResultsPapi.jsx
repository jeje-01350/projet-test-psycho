import React from "react";
import { Typography, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResultsPapi = () => {
    const location = useLocation();
    const { summary, results } = location.state || {};

    console.log(results, summary);

    const defaultScores = {
        Leadership: results?.Leadership || 0,
        Initiative: results?.Initiative || 0,
        Organisation: results?.Organisation || 0,
        Flexibilité: results?.Flexibilité || 0,
        Collaboration: results?.Collaboration || 0,
        Créativité: results?.Créativité || 0,
        Routine: results?.Routine || 0,
        Autonomie: results?.Autonomie || 0,
    };

    const chartData = {
        labels: [
            'Leadership',
            'Initiative',
            'Organisation',
            'Flexibilité',
            'Collaboration',
            'Créativité',
            'Routine',
            'Autonomie'
        ],
        datasets: [
            {
                label: 'Scores PAPI (%)',
                data: [
                    defaultScores.Leadership,
                    defaultScores.Initiative,
                    defaultScores.Organisation,
                    defaultScores.Flexibilité,
                    defaultScores.Collaboration,
                    defaultScores.Créativité,
                    defaultScores.Routine,
                    defaultScores.Autonomie
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

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Scores PAPI',
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
                Vos Scores PAPI :
            </Typography>

            <Box sx={{ width: '100%', maxWidth: '800px' }}>
                <Bar data={chartData} options={chartOptions} />
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

export default ResultsPapi;
