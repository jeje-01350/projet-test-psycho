import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Button, CircularProgress } from "@mui/material/";
import { QuestionCardBigfive } from "../../components/index";
import { DjangoQuestions } from "../../constants/index.js";

const AppDjangoPersonalityTest = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [responses, setResponses] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [loading, setLoading] = useState(false);

    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("user_id");
    const token = searchParams.get("token");

    const submitResponse = async () => {
        setLoading(true);
        const scores = calculateScores();
        const userAnswers = buildUserAnswers();
        const API_URL = import.meta.env.VITE_API_URL;

        try {
            const res = await fetch(`${API_URL}/django-test/save`, {
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
                            nomTest: "django personality test",
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
                        navigate("/django-test/results", {
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
        setResponses([...newArray, data]);

        if (currentQuestion < DjangoQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const calculateScores = () => {
        const scores = {
            "Confiance": 0,
            "Acceptation": 0,
            "Responsabilité": 0,
            "Aventure": 0,
            "Altruisme": 0,
        };

        const totalQuestionsPerDomain = {
            "Confiance": 0,
            "Acceptation": 0,
            "Responsabilité": 0,
            "Aventure": 0,
            "Altruisme": 0,
        };

        responses.forEach(({ domain, score }) => {
            let trait;
            if (domain.startsWith("H")) {
                trait = "Confiance";
            } else if (domain.startsWith("A")) {
                trait = "Altruisme";
            } else if (domain.startsWith("Q")) {
                trait = "Responsabilité";
            } else if (domain.startsWith("T")) {
                trait = "Aventure";
            } else {
                trait = "Acceptation";
            }

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

    const buildUserAnswers = () => {
        const userAnswers = {};
        responses.forEach(({ no, score }) => {
            const questionText = DjangoQuestions.find((q) => q.code === no).question;
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
                            key={DjangoQuestions[currentQuestion].code}
                            question={DjangoQuestions[currentQuestion].question}
                            no={DjangoQuestions[currentQuestion].code}
                            domain={DjangoQuestions[currentQuestion].code}
                            onRadioClick={handleFormChange}
                        />
                        {currentQuestion === DjangoQuestions.length - 1 && (
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

export default AppDjangoPersonalityTest;
