import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Button, CircularProgress } from "@mui/material/";
import { QuestionCardBigfive } from "../../components/index";
import { bigfiveQuestions } from "../../constants/index.js";

const Bigfive = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [responses, setResponses] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [loading, setLoading] = useState(false);

    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("user_id");
    const token = searchParams.get("token");

    const domainToTraitMap = {
        N: "Névrosisme",
        E: "Extraversion",
        O: "Ouverture d'esprit",
        A: "Agréabilité",
        C: "Conscience",
    };

    const submitResponse = async () => {
        setLoading(true);
        const scores = calculateScores(responses);
        const userAnswers = buildUserAnswers(responses);
        const API_URL = import.meta.env.VITE_API_URL;

        try {
            const res = await fetch(`${API_URL}/bigfive/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    scores,
                    userAnswers,
                }),
            });

            if (res.status !== 201) {
                console.log("Erreur lors de l'envoi des réponses");
                setLoading(false);
            } else {
                const data = await res.json();
                if (data.summary) {
                    const secondApiBody = {
                        results: {
                            score: scores,
                            userAnswers,
                            summary: data.summary,
                            nomTest: "bigfive"
                        },
                    };

                    if (userId && token) {
                        secondApiBody.user_id = userId;
                        secondApiBody.token = token;
                    }

                    const secondRes = await fetch("https://formation.devstriker.com/psycho_tests/new_results", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(secondApiBody),
                    });

                    if (secondRes.status === 200) {
                        navigate("/bigfive/results", {
                            state: { summary: data.summary, scores },
                        });
                    } else {
                        console.error("Erreur lors de l'envoi des résultats à formation.devstriker.com");
                    }
                }
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors des appels API:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFormChange = (data) => {
        console.log("Données reçues de QuestionCard:", data);

        if (!data.domain || data.score === undefined) {
            console.error("Données de formulaire invalides: domaine ou score manquant", data);
            return;
        }

        let newArray = responses.filter((response) => response.no !== data.no);
        const updatedResponses = [...newArray, data];

        setResponses(updatedResponses);

        if (currentQuestion < bigfiveQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const calculateScores = (responses) => {
        const scores = {
            "Agréabilité": 0,
            "Conscience": 0,
            "Extraversion": 0,
            "Névrosisme": 0,
            "Ouverture d'esprit": 0,
        };

        const totalQuestionsPerDomain = {
            "Agréabilité": 0,
            "Conscience": 0,
            "Extraversion": 0,
            "Névrosisme": 0,
            "Ouverture d'esprit": 0,
        };

        responses.forEach(({ domain, score }) => {
            const trait = domainToTraitMap[domain];
            if (trait) {
                scores[trait] += score;
                totalQuestionsPerDomain[trait] += 1;
            }
        });

        Object.keys(scores).forEach(key => {
            if (totalQuestionsPerDomain[key] > 0) {
                scores[key] = Math.round((scores[key] / (totalQuestionsPerDomain[key] * 5)) * 100);
            }
        });

        return scores;
    };

    const buildUserAnswers = (responses) => {
        const userAnswers = {};
        responses.forEach(({ no, score }) => {
            const questionText = bigfiveQuestions.find((q) => q.id === no).text;
            userAnswers[questionText] = score;
        });
        return userAnswers;
    };

    return (
        <div>
            <Container component="form" sx={{ minWidth: "100%", textAlign: "center" }}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <QuestionCardBigfive
                            key={bigfiveQuestions[currentQuestion].id}
                            question={bigfiveQuestions[currentQuestion].text}
                            no={bigfiveQuestions[currentQuestion].id}
                            domain={bigfiveQuestions[currentQuestion].domain}
                            onRadioClick={handleFormChange}
                        />
                        {currentQuestion === bigfiveQuestions.length - 1 && (
                            <Button variant="contained" onClick={submitResponse}>
                                Soumettre
                            </Button>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
};

export default Bigfive;
