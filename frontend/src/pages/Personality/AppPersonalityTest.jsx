import React, { useState, useEffect } from "react";
import Quiz from "react-quiz-component";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { personalityTestQuestion } from "../../constants/index";

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
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const userIdFromURL = searchParams.get("user_id");
        const tokenFromURL = searchParams.get("token");

        if (userIdFromURL && tokenFromURL) {
            setUserId(userIdFromURL);
            setToken(tokenFromURL);
            localStorage.setItem("user_id", userIdFromURL);
            localStorage.setItem("token", tokenFromURL);

            // Remove user_id and token from the URL
            searchParams.delete("user_id");
            searchParams.delete("token");
            navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
        } else {
            // If not in the URL, load from localStorage
            setUserId(localStorage.getItem("user_id"));
            setToken(localStorage.getItem("token"));
        }
    }, [location.search, navigate]);

    const quizData = {
        quizTitle: "Test de personnalité",
        quizSynopsis: "Répondez aux questions suivantes pour découvrir vos résultats.",
        questions: personalityTestQuestion.map((question) => ({
            question: question.question.replace(/\s*\(.*marks\)/i, ""), // Supprime "(10 marks)" de chaque question
            questionType: "text",
            answers: question.answers.map((answer) => answer.content),
            correctAnswer: "1",
            point: "10",
            answerSelectionType: "single",
        })),
    };

    useEffect(() => {
        const removeMarksText = () => {
            const questionHeaders = document.querySelectorAll(".react-quiz-container h3");
            questionHeaders.forEach((header) => {
                header.innerHTML = header.innerHTML.replace(/\s*\(\d+\s*marks\)/i, "");
            });
        };

        removeMarksText();

    }, []);

    const handleAnswerSelection = (questionIndex, selectedAnswerType) => {
        if (selectedAnswerType.trim() === "") return;

        const typeArray = selectedAnswerType.split(",");
        const [briggsType, colorType, letterType, noFlag] = typeArray;
        const updatedAnswersCount = { ...answersCount };

        if (noFlag === "No") {
            updatedAnswersCount["Briggs"][briggsType] -= 1;
            updatedAnswersCount["Colors"][colorType] -= 1;
            updatedAnswersCount["Letters"][letterType] -= 1;
        } else {
            updatedAnswersCount["Briggs"][briggsType] += 1;
            updatedAnswersCount["Colors"][colorType] += 1;
            updatedAnswersCount["Letters"][letterType] += 1;
        }

        setAnswersCount(updatedAnswersCount);

        const updatedResponses = [
            ...responses.filter((response) => response.questionIndex !== questionIndex),
            { questionIndex, answer: selectedAnswerType },
        ];
        setResponses(updatedResponses);
    };

    const buildUserAnswers = () => {
        const userAnswers = {};
        responses.forEach(({ questionIndex, answer }) => {
            const questionText = personalityTestQuestion[questionIndex].question;
            userAnswers[questionText] = answer;
        });
        return userAnswers;
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

    const submitResponse = async () => {
        setLoading(true);
        const results = calculateResults();
        const userAnswers = buildUserAnswers();

        console.log("Final Results:", results);
        console.log("User Answers:", userAnswers);

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

            if (res.status === 201) {
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
                    const responseData = await secondRes.json();
                    navigate("/test-personalite/results", { state: { data: { userAnswers, results, summary } } });
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
            const selectedAnswerType = personalityTestQuestion[questionIndex].answers.find(
                (answer) => answer.content === selectedAnswerContent
            )?.type;

            if (selectedAnswerType) {
                handleAnswerSelection(questionIndex, selectedAnswerType);
            } else {
                console.error("Selected answer type is undefined in onQuestionSubmit for question index:", questionIndex);
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
                    onQuestionSubmit={onQuestionSubmit} // Enregistre chaque réponse
                    onComplete={submitResponse} // Exécute submitResponse à la fin
                />
            )}
        </QuizContainer>
    );
};

export default AppPersonalityTest;
