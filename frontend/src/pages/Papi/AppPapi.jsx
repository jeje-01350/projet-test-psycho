import React, { useState, useEffect, useRef } from "react";
import { BuzzFeedQuiz } from "react-buzzfeed-quiz";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { papiQuestions } from "../../constants/index";
import "react-buzzfeed-quiz/lib/styles.css";

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;
`;

const AppPapiTest = () => {
    const [responses, setResponses] = useState([]);
    const [answersCount, setAnswersCount] = useState({
        Leadership: 0, Initiative: 0, Organisation: 0, Flexibilité: 0, Collaboration: 0, Créativité: 0, Routine: 0, Autonomie: 0
    });
    const navigate = useNavigate();
    const submitButtonRef = useRef(null);

    const quizQuestions = papiQuestions.map((question, index) => ({
        question: question.question,
        answers: question.answerOptions.map((answer) => ({
            answer: answer.answer,
            onAnswerSelection: () => handleAnswerSelection(answer.score, index),
        })),
    }));

    const handleAnswerSelection = (score, index) => {
        const updatedAnswersCount = { ...answersCount };
        updatedAnswersCount[score] += 1;
        setAnswersCount(updatedAnswersCount);

        console.log("Answer count after selection:", updatedAnswersCount);

        if (index === papiQuestions.length - 1) {
            if (submitButtonRef.current) {
                submitButtonRef.current.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    const calculateResults = () => {
        const totalQuestions = papiQuestions.length;

        const calculatePercentage = (count) => (count / totalQuestions) * 100;

        return {
            Leadership: calculatePercentage(answersCount.Leadership),
            Initiative: calculatePercentage(answersCount.Initiative),
            Organisation: calculatePercentage(answersCount.Organisation),
            Flexibilité: calculatePercentage(answersCount.Flexibilité),
            Collaboration: calculatePercentage(answersCount.Collaboration),
            Créativité: calculatePercentage(answersCount.Créativité),
            Routine: calculatePercentage(answersCount.Routine),
            Autonomie: calculatePercentage(answersCount.Autonomie),
        };
    };

    const submitResponse = async () => {
        const results = calculateResults();
        console.log("Sending results: ", results);
        const API_URL = import.meta.env.VITE_API_URL;
        try {
            const res = await fetch(`${API_URL}/papi/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    scores: results,
                }),
            });

            if (res.status !== 201) {
                console.log("Error in sending results");
            } else {
                const data = await res.json();
                console.log("Data received from backend:", data);

                navigate("/papi/results", { state: { summary: data.summary, results } });
            }
        } catch (error) {
            console.error("An error occurred while submitting the response:", error);
        }
    };

    return (
        <QuizContainer>
            <BuzzFeedQuiz
                title={"Test PAPI"}
                byline={false}
                description={"Répondez aux questions suivantes pour découvrir vos résultats du PAPI."}
                autoScroll={true}
                onAnswerSelection={handleAnswerSelection}
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

            <SubmitButton onClick={submitResponse} ref={submitButtonRef}>
                Envoyer
            </SubmitButton>
        </QuizContainer>
    );
};

export default AppPapiTest;
