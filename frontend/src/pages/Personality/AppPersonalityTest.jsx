import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CircularProgress, LinearProgress, Button, Box } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { personalityTestQuestion } from "../../constants/index";
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
        Letters: { A: 10, B: 10, C: 10, D: 10 },
        Briggs: { E: 10, I: 10, S: 10, N: 10, T: 10, F: 10, J: 10, P: 10 },
    });
    const [loading, setLoading] = useState(false);
    const { userId, token, projectTaskId } = useUserContext();
    const navigate = useNavigate();

    const totalQuestions = personalityTestQuestion.length;
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    const updateAnswerCount = (answerType, increment) => {
        const updatedAnswersCount = { ...answersCount };
        const types = answerType.split(",");

        types.forEach((type) => {
            const typeKey = type.trim();

            if (typeKey === "No") {
                // Handle the `No` flag explicitly by subtracting points
                types.forEach((subType) => {
                    const subKey = subType.trim();
                    if (updatedAnswersCount.Colors[subKey] !== undefined) {
                        updatedAnswersCount.Colors[subKey] -= increment;
                    }
                    if (updatedAnswersCount.Letters[subKey] !== undefined) {
                        updatedAnswersCount.Letters[subKey] -= increment;
                    }
                    if (updatedAnswersCount.Briggs[subKey] !== undefined) {
                        updatedAnswersCount.Briggs[subKey] -= increment;
                    }
                });
            } else {
                // Otherwise, add points normally
                if (updatedAnswersCount.Colors[typeKey] !== undefined) {
                    updatedAnswersCount.Colors[typeKey] += increment;
                }
                if (updatedAnswersCount.Letters[typeKey] !== undefined) {
                    updatedAnswersCount.Letters[typeKey] += increment;
                }
                if (updatedAnswersCount.Briggs[typeKey] !== undefined) {
                    updatedAnswersCount.Briggs[typeKey] += increment;
                }
            }
        });

        setAnswersCount(updatedAnswersCount);
        console.log("Updated Counts: ", updatedAnswersCount);
    };

    const handleAnswerSelection = (index) => {
        setSelectedAnswerIndex(index);
        console.log(`Answer selected for question ${currentQuestionIndex + 1}:`, personalityTestQuestion[currentQuestionIndex].answers[index].content);
    };

    const handleNextQuestion = () => {
        if (selectedAnswerIndex === null) {
            toast.warn("Veuillez sélectionner une réponse avant de continuer.");
            return;
        }

        const question = personalityTestQuestion[currentQuestionIndex];
        const selectedAnswer = question.answers[selectedAnswerIndex];

        const existingResponse = responses.find((res) => res.questionIndex === currentQuestionIndex);
        if (existingResponse) {
            updateAnswerCount(existingResponse.answerType, -1);
        }

        updateAnswerCount(selectedAnswer.type, 1);

        const updatedResponses = [
            ...responses.filter((response) => response.questionIndex !== currentQuestionIndex),
            { questionIndex: currentQuestionIndex, answerContent: selectedAnswer.content, answerType: selectedAnswer.type },
        ];
        setResponses(updatedResponses);
        console.log(`Responses updated:`, updatedResponses);

        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswerIndex(null);
        } else {
            submitResponse(updatedResponses);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            const previousResponse = responses.find((res) => res.questionIndex === currentQuestionIndex - 1);
            setSelectedAnswerIndex(
                previousResponse ?
                    personalityTestQuestion[currentQuestionIndex - 1].answers.findIndex(
                        (ans) => ans.content === previousResponse.answerContent
                    ) :
                    null
            );
        }
    };

    const submitResponse = async (answers) => {
        setLoading(true);
        console.log("Submitting final answers:", answers);
        console.log("Final Briggs counts:", answersCount.Briggs);
        console.log("Final Colors counts:", answersCount.Colors);
        console.log("Final Letters counts:", answersCount.Letters);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/personality-test/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ answers }),
            });

            if (res.status === 201) {
                toast.success("Test soumis avec succès!");
                navigate("/mbti/results");
            } else {
                toast.error("Erreur lors de la soumission du test.");
            }
        } catch (error) {
            toast.error("Une erreur est survenue.");
        } finally {
            setLoading(false);
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
                        {`Question ${currentQuestionIndex + 1} / ${totalQuestions}: ${personalityTestQuestion[currentQuestionIndex].question}`}
                    </QuestionText>
                    <AnswersContainer>
                        {personalityTestQuestion[currentQuestionIndex].answers.map((answer, index) => (
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