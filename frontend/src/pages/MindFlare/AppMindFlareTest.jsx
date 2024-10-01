import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mindFlareQuestions } from "../../constants/index";
import styled from "styled-components";

// Styled components
const QuizContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

const QuestionContainer = styled.div`
  margin-bottom: 2rem;
`;

const QuestionText = styled.p`
  font-size: 1.5rem;
  color: #333;
`;

const RangeInput = styled.input`
  width: 80%;
  margin-top: 1rem;
`;

const SubmitButton = styled.button`
  margin-top: 2rem;
  padding: 1rem 2rem;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
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
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(5); // Default value in the middle (5)
    const navigate = useNavigate();

    const handleAnswer = () => {
        const currentQuestion = mindFlareQuestions[currentQuestionIndex];
        const { category } = currentQuestion;

        setScores((prevScores) => ({
            ...prevScores,
            [category]: [...prevScores[category], currentAnswer],
        }));

        // Pass to the next question
        setCurrentAnswer(5); // Reset the slider to 5 for the next question
        if (currentQuestionIndex < mindFlareQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            submitTest(); // If it's the last question, submit the test
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
        const finalScores = calculateAverageScores();
        fetch("http://localhost:5000/mindflare/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_name: userDetails.name,
                user_age: userDetails.age,
                scores: finalScores,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.summary) {
                    navigate("/mindflare/results", {
                        state: { summary: data.summary, scores: finalScores },
                    });
                }
            });
    };

    return (
        <QuizContainer>
            <h1>Test de personnalité MindFlare</h1>
            <input
                type="text"
                placeholder="Votre nom"
                value={userDetails.name}
                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
            />
            <input
                type="number"
                placeholder="Votre âge"
                value={userDetails.age}
                onChange={(e) => setUserDetails({ ...userDetails, age: e.target.value })}
            />
            {currentQuestionIndex < mindFlareQuestions.length && (
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
                    <SubmitButton onClick={handleAnswer}>
                        {currentQuestionIndex === mindFlareQuestions.length - 1 ? "Terminer" : "Suivant"}
                    </SubmitButton>
                </QuestionContainer>
            )}
        </QuizContainer>
    );
};

export default AppMindFlareTest;
