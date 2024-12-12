import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CircularProgress, LinearProgress, Button, Box } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { personalityTestQuestion as originalQuestions } from "../../constants/index";
import { useUserContext } from "../../context/userContext.jsx";

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  margin: auto;
`;

const QuestionText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const AnswersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const ProgressContainer = styled(Box)`
  width: 100%;
  margin-bottom: 1.5rem;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 8px;
`;

const SelectedButton = styled(StyledButton)`
  background-color: #e0e0e0 !important;
  color: #000 !important;
`;

const AppPersonalityTest = () => {
    const [responses, setResponses] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [answersCount, setAnswersCount] = useState({
        Colors: { Vert: 10, Marron: 10, Bleu: 10, Rouge: 10 },
        Letters: { A: 10, B: 10, C: 10, D: 10 }
    });
    const [motivationScores, setMotivationScores] = useState({});
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const { userId, token, projectTaskId } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        const shuffledQuestions = [...originalQuestions].sort(() => Math.random() - 0.5);
        setQuestions(shuffledQuestions);
    }, []);

    const totalQuestions = questions.length;
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    const updateAnswerCount = (answerType, increment) => {
        if (!answerType) return;
        const updatedAnswersCount = { ...answersCount };
        const types = answerType.split(",");
        const hasNoFlag = types.includes("No");

        types.forEach((type) => {
            const typeKey = type.trim();
            if (typeKey !== "No") {
                if (hasNoFlag) {
                    if (updatedAnswersCount.Colors[typeKey] !== undefined) {
                        updatedAnswersCount.Colors[typeKey] -= increment;
                    }
                    if (updatedAnswersCount.Letters[typeKey] !== undefined) {
                        updatedAnswersCount.Letters[typeKey] -= increment;
                    }
                } else {
                    if (updatedAnswersCount.Colors[typeKey] !== undefined) {
                        updatedAnswersCount.Colors[typeKey] += increment;
                    }
                    if (updatedAnswersCount.Letters[typeKey] !== undefined) {
                        updatedAnswersCount.Letters[typeKey] += increment;
                    }
                }
            }
        });

        setAnswersCount(updatedAnswersCount);
        console.log("Updated Counts: ", updatedAnswersCount);
    };

    const updateMotivationScores = (question, score) => {
        const updatedScores = { ...motivationScores };
        if (question.type) {
            if (!updatedScores[question.type]) {
                updatedScores[question.type] = 0;
            }
            updatedScores[question.type] += score;
        }
        setMotivationScores(updatedScores);
        console.log("Updated Motivation Scores: ", updatedScores);
    };

    const calculateResults = () => {
        const dominantColor = Object.entries(answersCount.Colors).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
        const dominantLetter = Object.entries(answersCount.Letters).reduce((a, b) => (b[1] > a[1] ? b : a))[0];

        console.log("Dominant Color: ", dominantColor);
        console.log("Dominant Letter: ", dominantLetter);

        return {
            colors: dominantColor,
            letters: dominantLetter,
            motivationalItems: Object.entries(motivationScores)
                .filter(([_, score]) => score === Math.max(...Object.values(motivationScores)))
                .map(([key]) => key),
        };
    };

    const buildUserAnswers = () => {
        return responses.map((response) => ({
            question: questions[response.questionIndex]?.question || "",
            answer: response.answerContent,
        }));
    };

    const handleAnswerProcessing = (question, selectedAnswer) => {
        if (question.type) {
            // Motivation question
            updateMotivationScores(question, selectedAnswer.score);
        } else {
            // Regular scoring question
            const existingResponse = responses.find((res) => res.questionIndex === currentQuestionIndex);
            if (existingResponse) {
                updateAnswerCount(existingResponse.answerType, -1);
            }
            updateAnswerCount(selectedAnswer.type, 1);
        }
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
                        },
                        userAnswers,
                        summary,
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
                    toast.success("Résultats enregistrés avec succès !");
                    navigate("/mbti/results", { state: { data: { userAnswers, results, summary } } });
                } else {
                    toast.error("Erreur lors de l'envoi des résultats au deuxième serveur.");
                }
            } else {
                toast.error("Erreur lors de l'envoi des résultats au premier serveur.");
            }
        } catch (error) {
            toast.error("Une erreur s'est produite lors de la soumission.");
            console.error("An error occurred while submitting the response:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerSelection = (index) => {
        setSelectedAnswerIndex(index);
        console.log(
            `Answer selected for question ${currentQuestionIndex + 1}:`,
            questions[currentQuestionIndex].answers[index].content
        );
    };

    const handleNextQuestion = () => {
        if (selectedAnswerIndex === null) {
            toast.warn("Veuillez sélectionner une réponse avant de continuer.");
            return;
        }

        const question = questions[currentQuestionIndex];
        const selectedAnswer = question.answers[selectedAnswerIndex];

        handleAnswerProcessing(question, selectedAnswer);

        const updatedResponses = [
            ...responses.filter((response) => response.questionIndex !== currentQuestionIndex),
            { questionIndex: currentQuestionIndex, answerContent: selectedAnswer.content, answerType: selectedAnswer.type || null },
        ];
        setResponses(updatedResponses);
        console.log(`Responses updated:`, updatedResponses);

        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswerIndex(null);
        } else {
            submitResponse();
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            const previousResponse = responses.find((res) => res.questionIndex === currentQuestionIndex - 1);
            setSelectedAnswerIndex(
                previousResponse
                    ? questions[currentQuestionIndex - 1].answers.findIndex(
                        (ans) => ans.content === previousResponse.answerContent
                    )
                    : null
            );
        }
    };

    return (
        <QuizContainer>
            <ToastContainer />
            <ProgressContainer>
                <LinearProgress variant="determinate" value={progress} />
            </ProgressContainer>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <QuestionText>
                        {`Question ${currentQuestionIndex + 1} / ${totalQuestions}: ${
                            questions[currentQuestionIndex]?.question
                        }`}
                    </QuestionText>
                    <AnswersContainer>
                        {questions[currentQuestionIndex]?.answers.map((answer, index) => (
                            index === selectedAnswerIndex ? (
                                <SelectedButton
                                    key={index}
                                    onClick={() => handleAnswerSelection(index)}
                                >
                                    {answer.content}
                                </SelectedButton>
                            ) : (
                                <StyledButton
                                    key={index}
                                    variant="outlined"
                                    onClick={() => handleAnswerSelection(index)}
                                >
                                    {answer.content}
                                </StyledButton>
                            )
                        ))}
                    </AnswersContainer>
                    <NavigationButtons>
                        <Button
                            variant="contained"
                            onClick={handlePreviousQuestion}
                            disabled={currentQuestionIndex === 0}
                        >
                            Précédent
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleNextQuestion}
                        >
                            Suivant
                        </Button>
                    </NavigationButtons>
                </>
            )}
        </QuizContainer>
    );
};

export default AppPersonalityTest;
