import React, { useRef, useState } from "react";
import { BuzzFeedQuiz } from "react-buzzfeed-quiz";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { kapableQuestions } from "../../constants/index";
import "react-buzzfeed-quiz/lib/styles.css";

// Styled components for the layout
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

const AppKapableTest = () => {
    const [answersCount, setAnswersCount] = useState({
        E: 0,
        I: 0,
        S: 0,
        N: 0,
        T: 0,
        F: 0,
        J: 0,
        P: 0,
    });
    const navigate = useNavigate();
    const submitButtonRef = useRef(null);

    const quizQuestions = kapableQuestions.map((question, index) => ({
        question: question.question,
        answers: question.answerOptions.map((answer) => ({
            answer: answer.answer,
            onAnswerSelection: () => handleAnswerSelection(answer.score, answer.points, index),
        })),
    }));

    const handleAnswerSelection = (score, points, index) => {
        const updatedAnswersCount = { ...answersCount };
        updatedAnswersCount[score] += points;
        setAnswersCount(updatedAnswersCount);

        // Log for each selected answer
        console.log(`Question ${index + 1}: Letter ${score}, Points: ${points}`);
        console.log("Current total points:", updatedAnswersCount);

        if (index === kapableQuestions.length - 1) {
            submitButtonRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const calculateResults = () => {
        const results = {
            E: answersCount.E,
            I: answersCount.I,
            S: answersCount.S,
            N: answersCount.N,
            T: answersCount.T,
            F: answersCount.F,
            J: answersCount.J,
            P: answersCount.P,
        };

        // Determine which letters win by comparing E vs I, S vs N, T vs F, J vs P
        const finalResults = {
            EI: results.E > results.I ? "E" : "I",
            SN: results.S > results.N ? "S" : "N",
            TF: results.T > results.F ? "T" : "F",
            JP: results.J > results.P ? "J" : "P",
        };

        const personalityType = finalResults.EI + finalResults.SN + finalResults.TF + finalResults.JP;
        console.log("Final personality type:", personalityType);
        return personalityType;
    };

    const submitResponse = async () => {
        const scores = calculateResults();
        console.log("Sending results: ", scores);

        const API_URL = import.meta.env.VITE_API_URL;
        try {
            const res = await fetch(`${API_URL}/kapable/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    scores,
                }),
            });

            if (res.status !== 201) {
                console.log("Error in sending results");
            } else {
                const data = await res.json();
                console.log("Data received from backend:", data);

                navigate("/kapable/results", { state: { summary: data.summary, scores } });
            }
        } catch (error) {
            console.error("An error occurred while submitting the response:", error);
        }
    };

    return (
        <QuizContainer>
            <BuzzFeedQuiz
                title={"Test MBTI"}
                byline={false}
                description={"Répondez aux questions suivantes pour découvrir vos résultats."}
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

export default AppKapableTest;
