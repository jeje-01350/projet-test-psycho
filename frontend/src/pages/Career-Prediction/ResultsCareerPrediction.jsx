import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { ResultBar } from "../../components/index";
import { useLocation } from "react-router-dom";

const ResultsCareerPrediction = () => {
    const [scores, setScores] = useState([]);
    const [mbtiPersonality, setMbtiPersonality] = useState("");

    const location = useLocation();
    const { summary } = location.state || {}; // Récupérer le summary ou initialiser à un objet vide

    const fetchResults = async () => {
        const response = await fetch(
            "http://localhost:5000/answer/get-personality",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status !== 200) {
            console.log("Something wrong");
        } else {
            const res = await response.json();
            const { data, personalityType } = res;
            console.log(data);
            console.log(personalityType);
            setScores(data);
            setMbtiPersonality(personalityType);
        }
    };

    useEffect(() => {
        // Appeler fetchResults uniquement si les scores ne sont pas disponibles
        if (scores.length === 0) {
            fetchResults();
        }
    }, [scores]);

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    width: "1000px",
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ fontSize: "2.1rem", fontWeight: "400", mt: "3rem", mb: "2rem" }}
                    onClick={() => console.log(summary)} // Log the summary
                >
                    Your Personality Score is:
                </Typography>

                {scores.map((score) => {
                    return (
                        <ResultBar
                            key={`${score.trait}-${score.percentage}`}
                            percentage={score.percentage}
                            trait={score.trait}
                        />
                    );
                })}

                <Typography
                    variant="h5"
                    sx={{ fontSize: "2.1rem", fontWeight: "400", mt: "3rem", mb: "2rem" }}
                >
                    Your MBTI Personality Type is: {mbtiPersonality}
                </Typography>

                {/* Displaying summary if available */}
                {summary ? (
                    <Typography
                        variant="h5"
                        sx={{ fontSize: "1.5rem", fontWeight: "400", mt: "3rem", mb: "2rem" }}
                    >
                        Summary: {summary}
                    </Typography>
                ) : (
                    <Typography
                        variant="h5"
                        sx={{ fontSize: "1.5rem", fontWeight: "400", mt: "3rem", mb: "2rem" }}
                    >
                        No summary available.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default ResultsCareerPrediction;
