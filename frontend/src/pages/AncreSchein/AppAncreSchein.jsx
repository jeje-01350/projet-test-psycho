import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Button, CircularProgress } from "@mui/material/";
import { QuestionCardBigfive } from "../../components/index";
import { ancreScheinQuestions } from "../../constants/index.js";
import {useUserContext} from "../../context/userContext.jsx";

const AncreSchein = () => {
    const navigate = useNavigate();
    const [responses, setResponses] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [loading, setLoading] = useState(false);
    const { userId, token, projectTaskId } = useUserContext();

    const domainToTraitMap = {
        TECH: "ancre technique",
        MG: "ancre managériale",
        AUT: "ancre autonomie",
        SEC: "ancre sécurité/stabilité",
        CRE: "ancre créativité",
        CAU: "ancre dévouement à une cause",
        DEF: "ancre défi pur",
        VIE: "ancre qualité de vie",
        INTER: "ancre internationale",
    };

    const submitResponse = async () => {
        setLoading(true);
        const scores = calculateScores();
        const userAnswers = buildUserAnswers();
        const API_URL = import.meta.env.VITE_API_URL;

        try {
            const res = await fetch(`${API_URL}/schein/save`, {
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
                            nomTest: "ancre de schein"
                        },
                    };

                    if (userId && token) {
                        secondApiBody.user_id = userId;
                        secondApiBody.token = token;
                    }

                    if (projectTaskId) {
                        secondApiBody.project_task_id = projectTaskId;
                    }

                    const secondRes = await fetch("https://formation.devstriker.com/psycho_tests/new_results", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(secondApiBody),
                    });

                    if (secondRes.status === 200) {
                        navigate("/schein/results", {
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
        if (!data.domain || data.score === undefined) {
            console.error("Données de formulaire invalides: domaine ou score manquant", data);
            return;
        }

        let newArray = responses.filter((response) => response.no !== data.no);
        setResponses([...newArray, data]);

        if (currentQuestion < ancreScheinQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const calculateScores = () => {
        const scores = {
            "ancre technique": 0,
            "ancre managériale": 0,
            "ancre autonomie": 0,
            "ancre sécurité/stabilité": 0,
            "ancre créativité": 0,
            "ancre dévouement à une cause": 0,
            "ancre défi pur": 0,
            "ancre qualité de vie": 0,
            "ancre internationale": 0,
        };

        const totalQuestionsPerDomain = {
            "ancre technique": 0,
            "ancre managériale": 0,
            "ancre autonomie": 0,
            "ancre sécurité/stabilité": 0,
            "ancre créativité": 0,
            "ancre dévouement à une cause": 0,
            "ancre défi pur": 0,
            "ancre qualité de vie": 0,
            "ancre internationale": 0,
        };

        responses.forEach(({ domain, score }) => {
            const trait = domainToTraitMap[domain];
            if (trait) {
                scores[trait] += score;
                totalQuestionsPerDomain[trait] += 1;
            }
        });

        Object.keys(scores).forEach((key) => {
            if (totalQuestionsPerDomain[key] > 0) {
                scores[key] = Math.round((scores[key] / (totalQuestionsPerDomain[key] * 5)) * 100);
            }
        });

        return scores;
    };

    const buildUserAnswers = () => {
        const userAnswers = {};
        responses.forEach(({ no, score }) => {
            const questionText = ancreScheinQuestions.find((q) => q.id === no).text;
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
                            key={ancreScheinQuestions[currentQuestion].id}
                            question={ancreScheinQuestions[currentQuestion].text}
                            no={ancreScheinQuestions[currentQuestion].id}
                            domain={ancreScheinQuestions[currentQuestion].domain}
                            onRadioClick={handleFormChange}
                        />
                        {currentQuestion === ancreScheinQuestions.length - 1 && (
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

export default AncreSchein;
