import React, { useState } from "react";
import { BuzzFeedQuiz } from "react-buzzfeed-quiz";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { riasecQuestions } from "../../constants/index";
import "react-buzzfeed-quiz/lib/styles.css";
import {CircularProgress} from "@mui/material";

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const SubmitButton = styled.button`
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;
`;

const AppRiasecTest = () => {
    const [personnalitePoints, setPersonnalitePoints] = useState({
        Realiste: 0,
        Investigatif: 0,
        Artistique: 0,
        Social: 0,
        Entrepreneur: 0,
        Conventionnel: 0,
    });
    const [userAnswers, setUserAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("user_id");
    const token = searchParams.get("token");

    const handleAnswerSelection = (value, personnalite_id, questionText, answerText) => {
        const personnaliteMap = {
            1: "Realiste",
            2: "Investigatif",
            3: "Artistique",
            4: "Social",
            5: "Entrepreneur",
            6: "Conventionnel",
        };

        const personnaliteName = personnaliteMap[personnalite_id];

        setPersonnalitePoints((prevPoints) => ({
            ...prevPoints,
            [personnaliteName]: prevPoints[personnaliteName] + parseInt(value),
        }));

        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionText]: answerText,
        }));
    };

    const quizQuestions = riasecQuestions.map((question) => ({
        question: question.intitule,
        answers: [
            {
                answer: "Pas d'accord",
                value: -1,
                personnalite_id: question.personnalite_id,
            },
            {
                answer: "Neutre",
                value: 0,
                personnalite_id: question.personnalite_id,
            },
            {
                answer: "Tout à fait d'accord",
                value: 1,
                personnalite_id: question.personnalite_id,
            },
        ].map((answer) => ({
            answer: answer.answer,
            onAnswerSelection: () =>
                handleAnswerSelection(answer.value, answer.personnalite_id, question.intitule, answer.answer),
        })),
    }));

    const calculateDominantPersonalities = () => {
        const sortedPersonalities = Object.entries(personnalitePoints).sort(([, a], [, b]) => b - a);

        const dominantPersonnalite = sortedPersonalities[0][0];
        const secondaryPersonnalite = sortedPersonalities[1][0];

        return { dominantPersonnalite, secondaryPersonnalite };
    };

    const submitResponse = async () => {
        setLoading(true);
        const { dominantPersonnalite, secondaryPersonnalite } = calculateDominantPersonalities();
        const API_URL = import.meta.env.VITE_API_URL;

        try {
            const res = await fetch(`${API_URL}/riasec/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    resultatPrincipal: dominantPersonnalite,
                    resultatSecondaire: secondaryPersonnalite,
                    userAnswers,
                }),
            });

            if (res.status === 201) {
                const data = await res.json();

                const secondApiBody = {
                    results: {
                        resultatPrincipal: dominantPersonnalite,
                        resultatSecondaire: secondaryPersonnalite,
                        userAnswers,
                        summary: data.summary,
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
                    navigate("/riasec/results", {
                        state: {
                            resultatFinal: dominantPersonnalite,
                            resultatSecondaire: secondaryPersonnalite,
                            summary: data.summary,
                        },
                    });
                } else {
                    console.error("Erreur lors de l'envoi des résultats à formation.devstriker.com");
                }
            }
        } catch (error) {
            console.error("Erreur lors des appels API:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <QuizContainer>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <BuzzFeedQuiz
                        title={"Test de personnalité RIASEC"}
                        byline={false}
                        description={"Répondez aux questions pour découvrir votre profil RIASEC."}
                        autoScroll={true}
                        questions={quizQuestions}
                        results={[
                            {
                                title: "Result 1",
                                description: "Description for result 1",
                                resultID: 0,
                            },
                            {
                                title: "Result 2",
                                description: "Description for result 2",
                                resultID: 1,
                            },
                            {
                                title: "Result 3",
                                description: "Description for result 3",
                                resultID: 2,
                            },
                        ]}
                        copyShareButton
                        facebookShareButton
                        twitterShareButton
                    />

                    <SubmitButton onClick={submitResponse}>Valider</SubmitButton>
                </>
            )}
        </QuizContainer>
    );
};

export default AppRiasecTest;
