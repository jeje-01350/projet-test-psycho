import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { mindFlareQuestions } from "../../constants/index";
import styled from "styled-components";
import {CircularProgress} from "@mui/material";

const QuizContainer = styled.div`
  padding: 2rem;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #007bff;
  margin-bottom: 1.5rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Label = styled.label`
  text-align: left;
  width: 100%;
  font-size: 1rem;
  color: #555;
  display: block;
  margin-bottom: 0.5rem;
`;

const QuestionContainer = styled.div`
  margin-bottom: 2rem;
  transition: all 0.3s ease-in-out;
`;

const QuestionText = styled.p`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const RangeInput = styled.input`
  width: 80%;
  margin-top: 1rem;
  appearance: none;
  height: 8px;
  background: #007bff;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  &::-webkit-slider-thumb {
    appearance: none;
    width: 25px;
    height: 25px;
    background-color: #fff;
    border: 2px solid #007bff;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const ProgressContainer = styled.div`
  margin-top: 1rem;
  background: #e0e0e0;
  border-radius: 10px;
  height: 10px;
  width: 80%;
  margin: 0 auto;
`;

const ProgressBar = styled.div`
  height: 100%;
  border-radius: 10px;
  background-color: #007bff;
  width: ${(props) => props.progress}%;
  transition: width 0.3s ease-in-out;
`;

const SubmitButton = styled.button`
  margin-top: 2rem;
  padding: 1rem 2rem;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Loader = styled.div`
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #007bff;
`;

const AppMindFlareTest = () => {
    const [userDetails, setUserDetails] = useState({ name: "", age: "" });
    const [scores, setScores] = useState({
        Ouverture: [],
        Conscience: [],
        Extraversion: [],
        Amabilité: [],
        Névrosisme: [],
    });
    const [userAnswers, setUserAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(5);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("user_id");
    const token = searchParams.get("token");

    useEffect(() => {
        if (submitted) {
            submitTest();
        }
    }, [submitted]);

    const handleAnswer = () => {
        const currentQuestion = mindFlareQuestions[currentQuestionIndex];
        const { category, text } = currentQuestion;

        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [text]: currentAnswer,
        }));

        setScores((prevScores) => ({
            ...prevScores,
            [category]: [...prevScores[category], currentAnswer],
        }));

        if (currentQuestionIndex === mindFlareQuestions.length - 1) {
            setSubmitted(true);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const calculateAverageScores = () => {
        const averageScores = {};
        for (const category in scores) {
            const total = scores[category].reduce((sum, value) => sum + value, 0);
            averageScores[category] = total / scores[category].length;
        }
        return averageScores;
    };

    const submitTest = () => {
        if (loading) return;
        setLoading(true);

        const finalScores = calculateAverageScores();
        const API_URL = import.meta.env.VITE_API_URL;

        fetch(`${API_URL}/mindflare/save`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_name: userDetails.name,
                user_age: userDetails.age,
                scores: finalScores,
                userAnswers,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.summary) {
                    const summary = data.summary; // Stocker le summary

                    const secondApiBody = {
                        results: {
                            score: finalScores,
                            userAnswers,
                            summary: summary,  // Utiliser le summary récupéré ici
                            nomTest: "mindflare",
                        },
                    };

                    // Ajouter user_id et token si présents
                    if (userId && token) {
                        secondApiBody.user_id = userId;
                        secondApiBody.token = token;
                    }

                    return fetch("https://formation.devstriker.com/psycho_tests/new_results", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(secondApiBody),
                    }).then((secondResponse) => {
                        if (secondResponse.ok) {
                            // Utiliser le summary stocké pour la navigation
                            navigate("/mindflare/results", {
                                state: { summary: summary, scores: finalScores }, // Passer le summary ici
                            });
                        } else {
                            throw new Error("Error in the second API call.");
                        }
                    });
                } else {
                    throw new Error("No summary returned from the first API call.");
                }
            })
            .catch((error) => {
                console.error("Erreur lors de la soumission:", error);
            })
            .finally(() => {
                setLoading(false);
            });

    };

    const progressPercentage = ((currentQuestionIndex + 1) / mindFlareQuestions.length) * 100;

    return (
        <QuizContainer>
            <Title>Test de personnalité MindFlare</Title>
            <Label htmlFor="name">Votre nom</Label>
            <InputField
                type="text"
                id="name"
                placeholder="Votre nom"
                value={userDetails.name}
                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
            />
            <Label htmlFor="age">Votre âge</Label>
            <InputField
                type="number"
                id="age"
                placeholder="Votre âge"
                value={userDetails.age}
                onChange={(e) => setUserDetails({ ...userDetails, age: e.target.value })}
            />
            {!loading && currentQuestionIndex < mindFlareQuestions.length && (
                <QuestionContainer>
                    <QuestionText>{mindFlareQuestions[currentQuestionIndex].text}</QuestionText>
                    <RangeInput
                        type="range"
                        min="1"
                        max="10"
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(Number(e.target.value))}
                    />
                    <p>Je m'identifie à {currentAnswer} sur 10</p>
                    <ProgressContainer>
                        <ProgressBar progress={progressPercentage} />
                    </ProgressContainer>
                    <SubmitButton onClick={handleAnswer} disabled={loading}>
                        {currentQuestionIndex === mindFlareQuestions.length - 1 ? "Valider" : "Suivant"}
                    </SubmitButton>
                </QuestionContainer>
            )}
            {loading && <CircularProgress />}
        </QuizContainer>
    );
};

export default AppMindFlareTest;
