import React, {useRef, useState} from "react";
import { BuzzFeedQuiz } from "react-buzzfeed-quiz";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {mbtiQuestions} from "../../constants/index";
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

const AppMbtiTest = () => {
    const [responses, setResponses] = useState([]);
    const [answersCount, setAnswersCount] = useState({
        E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
    });
    const navigate = useNavigate();
    const submitButtonRef = useRef(null);

    const quizQuestions = mbtiQuestions.map((question, index) => ({
        question: question.question,
        answers: question.answerOptions.map((answer) => ({
            answer: answer.answer,
            onAnswerSelection: () => handleAnswerSelection(answer, index, question.question),
        })),
    }));

    const handleAnswerSelection = (answer, index, questionText) => {
        const updatedAnswersCount = { ...answersCount };
        updatedAnswersCount[answer.score] += 1;
        setAnswersCount(updatedAnswersCount);

        const updatedResponses = [...responses];
        updatedResponses[index] = { question: questionText, answer: answer.answer };
        setResponses(updatedResponses);

        if (index === mbtiQuestions.length - 1) {
            submitButtonRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const calculateResults = () => {
        const totalQuestions = mbtiQuestions.length;

        const calculatePercentage = (count) => (count / totalQuestions) * 100;

        return {
            E: calculatePercentage(answersCount.E),
            I: calculatePercentage(answersCount.I),
            S: calculatePercentage(answersCount.S),
            N: calculatePercentage(answersCount.N),
            T: calculatePercentage(answersCount.T),
            F: calculatePercentage(answersCount.F),
            J: calculatePercentage(answersCount.J),
            P: calculatePercentage(answersCount.P),
        };
    };

    const submitResponse = async () => {
        const results = calculateResults();

        const userAnswers = {};
        responses.forEach(({ question, answer }) => {
            userAnswers[question] = answer;
        });

        console.log("Sending results and userAnswers: ", results, userAnswers);

        const API_URL = import.meta.env.VITE_API_URL;
        try {
            const res = await fetch(`${API_URL}/mbti/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    scores: results,
                    userAnswers,
                }),
            });

            if (res.status !== 201) {
                console.log("Error in sending results");
            } else {
                const data = await res.json();
                console.log("Data received from backend:", data);

                navigate("/mbti/results", { state: { summary: data.summary, results } });
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

export default AppMbtiTest;
