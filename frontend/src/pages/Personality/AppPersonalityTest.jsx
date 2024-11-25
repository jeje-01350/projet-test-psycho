import React, { useState, useEffect } from "react";
import Quiz from "react-quiz-component";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { personalityTestQuestion } from "../../constants/index";
import {useUserContext} from "../../context/userContext.jsx";

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
    const { userId, token } = useUserContext();
    const navigate = useNavigate();

    const quizData = {
        quizTitle: "Test de personnalité",
        quizSynopsis: "Répondez aux questions suivantes pour découvrir vos résultats.",
        questions: personalityTestQuestion.map((question) => ({
            question: question.question,
            questionType: "text",
            answers: question.answers.map((answer) => answer.content),
            correctAnswer: "1",
            answerSelectionType: "single",
            point: 1
        })),
    };

    const handleAnswerSelection = (questionIndex, selectedAnswerType, answerContent) => {
        const updatedResponses = [
            ...responses.filter((response) => response.questionIndex !== questionIndex),
            { questionIndex, answerContent },
        ];
        setResponses(updatedResponses);

        if (selectedAnswerType.trim() === "") return;

        const typeArray = selectedAnswerType.split(",");
        const [briggsType, colorType, letterType, noFlag] = typeArray;
        const updatedAnswersCount = { ...answersCount };

        if (noFlag === "No") {
            if (briggsType) updatedAnswersCount["Briggs"][briggsType] -= 1;
            if (colorType) updatedAnswersCount["Colors"][colorType] -= 1;
            if (letterType) updatedAnswersCount["Letters"][letterType] -= 1;
        } else {
            if (briggsType) updatedAnswersCount["Briggs"][briggsType] += 1;
            if (colorType) updatedAnswersCount["Colors"][colorType] += 1;
            if (letterType) updatedAnswersCount["Letters"][letterType] += 1;
        }

        setAnswersCount(updatedAnswersCount);
    };

    const buildUserAnswers = () => {
        const userAnswers = {};
        personalityTestQuestion.forEach((question, index) => {
            const response = responses.find((res) => res.questionIndex === index);
            userAnswers[question.question] = response ? response.answerContent : "Non répondu";
        });
        return userAnswers;
    };

    const calculateMotivationalItems = () => {
        const motivationScores = {};

        responses.forEach(({ questionIndex, score }) => {
            const question = personalityTestQuestion[questionIndex];

            if (question.type) {
                if (motivationScores[question.type]) {
                    motivationScores[question.type] += score;
                } else {
                    motivationScores[question.type] = score;
                }
            }
        });

        const maxScore = Math.max(...Object.values(motivationScores));
        return Object.keys(motivationScores).filter(
            (item) => motivationScores[item] === maxScore
        );
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

        const motivationalItems = calculateMotivationalItems();

        return {
            briggs: calculateBriggs(),
            colors: calculateColors(),
            letters: calculateLetters(),
            motivationalItems,
        };
    };

    const submitResponse = async () => {
        setLoading(true);
        const results = calculateResults();
        const userAnswers = buildUserAnswers();

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/personality-test/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    score: {
                        color: results.colors,
                        letters: results.letters,
                        briggs: results.briggs,
                    },
                    motivationalItems: results.motivationalItems,
                    userAnswers,
                }),
            });

            if (res.status === 201) {
                const data = await res.json();
                const summary = data.data.summary;

                const secondApiBody = {
                    results: {
                        score: {
                            color: results.colors,
                            letters: results.letters,
                            briggs: results.briggs,
                        },
                        motivationalItems: results.motivationalItems,
                        userAnswers,
                        summary,
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
                    navigate("/mbti/results", { state: { data: { userAnswers, results, summary } } });
                } else {
                    console.error("Error in sending results to the second API");
                }
            } else {
                console.log("Error in sending results to the first API");
            }
        } catch (error) {
            console.error("An error occurred while submitting the response:", error);
        } finally {
            setLoading(false);
        }
    };


    const onQuestionSubmit = (obj) => {
        const questionIndex = personalityTestQuestion.findIndex(
            (q) => q.question === obj.question.question
        );

        if (questionIndex !== -1) {
            const selectedAnswerContent = obj.question.answers[obj.userAnswer - 1];
            const question = personalityTestQuestion[questionIndex];

            if (question.answers[0].type) {
                // Première partie : réponses avec type
                const selectedAnswerType = question.answers.find(
                    (answer) => answer.content === selectedAnswerContent
                )?.type;

                if (selectedAnswerType) {
                    handleAnswerSelection(questionIndex, selectedAnswerType, selectedAnswerContent);
                } else {
                    console.error(`Selected answer type is undefined for question: ${questionIndex}`);
                }
            } else if (question.answers[0].score !== undefined) {
                // Deuxième partie : réponses avec score
                const score = question.answers.find(
                    (answer) => answer.content === selectedAnswerContent
                )?.score;

                if (score !== undefined) {
                    setResponses((prevResponses) => [
                        ...prevResponses.filter((res) => res.questionIndex !== questionIndex),
                        { questionIndex, answerContent: selectedAnswerContent, score },
                    ]);
                } else {
                    console.error(`Score is undefined for question: ${questionIndex}`);
                }
            } else {
                console.error(`Question type is not recognized for question: ${questionIndex}`);
            }
        } else {
            console.error("Question not found in personalityTestQuestion:", obj.question);
        }
    };


    return (
        <QuizContainer>
            {loading ? (
                <CircularProgress />
            ) : (
                <Quiz
                    quiz={quizData}
                    shuffle={false}
                    showInstantFeedback={false}
                    disableScore={true}
                    customTexts={{
                        startQuizBtn: "Commencer le quiz",
                        resultPageHeaderText: "",
                        resultPagePoint: "",
                        question: "Question {questionNumber}/{totalQuestions}",
                        nextQuestionBtn: "Suivant",
                    }}
                    onQuestionSubmit={onQuestionSubmit}
                    onComplete={submitResponse}
                />
            )}
        </QuizContainer>
    );
};

export default AppPersonalityTest;
