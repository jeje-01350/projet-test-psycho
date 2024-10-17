import React, { useState } from "react";
import { BuzzFeedQuiz } from "react-buzzfeed-quiz";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { personalityTestQuestion } from "../../constants/index";
import "react-buzzfeed-quiz/lib/styles.css";

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

const AppPersonalityTest = () => {
    const [responses, setResponses] = useState([]);
    const [answersCount, setAnswersCount] = useState({
        Colors: { Green: 10, Brown: 10, Blue: 10, Red: 10 },
        Letters: { A: 10, B: 10, C: 10, D: 10 },
        Briggs: { E: 5, I: 5, S: 5, N: 5, T: 5, F: 5, J: 5, P: 5 },
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("user_id");
    const token = searchParams.get("token");

    const quizQuestions = personalityTestQuestion.map((question, index) => ({
        question: question.question,
        answers: question.answers.map((answer) => ({
            answer: answer.content,
            onAnswerSelection: () =>
                handleAnswerSelection(answer.content, index),
        })),
    }));

    const handleAnswerSelection = (answer, questionIndex) => {
        const answer_array = answer.split(",");
        let briggsAnswer = answer_array[0];
        let colorsAnswer = answer_array[1];
        let lettersAnswer = answer_array[2];

        const updatedAnswersCount = { ...answersCount };

        if (answer_array.length === 3) {
            updatedAnswersCount["Briggs"][briggsAnswer] += 1;
            updatedAnswersCount["Colors"][colorsAnswer] += 1;
            updatedAnswersCount["Letters"][lettersAnswer] += 1;
        } else if (answer_array.length === 4) {
            updatedAnswersCount["Briggs"][briggsAnswer] -= 1;
            updatedAnswersCount["Colors"][colorsAnswer] -= 1;
            updatedAnswersCount["Letters"][lettersAnswer] -= 1;
        }

        setAnswersCount(updatedAnswersCount);

        const updatedResponses = [
            ...responses.filter((response) => response.questionIndex !== questionIndex),
            { questionIndex, answer },
        ];
        setResponses(updatedResponses);
    };

    const calculateResults = () => {
        const calculateBriggs = () => {
            const briggsAnswer = answersCount["Briggs"];
            let briggsType = "";

            briggsType += briggsAnswer.E >= briggsAnswer.I ? "E" : "I";
            briggsType += briggsAnswer.S >= briggsAnswer.N ? "S" : "N";
            briggsType += briggsAnswer.T >= briggsAnswer.F ? "T" : "F";
            briggsType += briggsAnswer.J >= briggsAnswer.P ? "J" : "P";

            return briggsType;
        };

        const calculateColors = () => {
            const colorsAnswer = answersCount["Colors"];
            const maxAnswerCountColors = Math.max(...Object.values(colorsAnswer));
            return Object.keys(colorsAnswer).find(
                (key) => colorsAnswer[key] === maxAnswerCountColors
            );
        };

        const calculateLetters = () => {
            const lettersAnswer = answersCount["Letters"];
            const maxAnswerCountLetters = Math.max(...Object.values(lettersAnswer));
            return Object.keys(lettersAnswer).find(
                (key) => lettersAnswer[key] === maxAnswerCountLetters
            );
        };

        return {
            briggs: calculateBriggs(),
            colors: calculateColors(),
            letters: calculateLetters(),
        };
    };

    const buildUserAnswers = () => {
        const userAnswers = {};
        responses.forEach(({ questionIndex, answer }) => {
            const questionText = personalityTestQuestion[questionIndex].question;
            userAnswers[questionText] = answer;
        });
        return userAnswers;
    };

    const submitResponse = async () => {
        setLoading(true);
        const results = calculateResults();
        const userAnswers = buildUserAnswers();
        console.log("Sending results: ", results);
        const API_URL = import.meta.env.VITE_API_URL;

        try {
            const res = await fetch(`${API_URL}/personality-test/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    color: results.colors,
                    letters: results.letters,
                    briggs: results.briggs,
                    userAnswers,
                }),
            });

            if (res.status !== 201) {
                console.log("Error in sending results");
                setLoading(false);
            } else {
                const data = await res.json();
                const summary = data.data.summary;
                console.log("Data received from backend:", data);

                const secondApiBody = {
                    results: {
                        color: results.colors,
                        letters: results.letters,
                        briggs: results.briggs,
                        userAnswers,
                        summary: summary,
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
                    navigate("/test-personalite/results", { state: { data: data.data } });
                } else {
                    console.error("Error in sending results to the second API");
                }
            }
        } catch (error) {
            console.error("An error occurred while submitting the response:", error);
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
                        title={"Test de personalité"}
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

                    <SubmitButton onClick={submitResponse}>
                        Submit
                    </SubmitButton>
                </>
            )}
        </QuizContainer>
    );
};

export default AppPersonalityTest;
