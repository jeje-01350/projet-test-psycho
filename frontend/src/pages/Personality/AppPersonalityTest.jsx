import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import { LinearProgress, Button, Box } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { personalityTestQuestion as originalQuestions } from "../../constants/index";
import { useUserContext } from "../../context/userContext.jsx";
import styleSensei from '../../images/style-sensei.png';
import loaderSensei from '../../images/loader-sensei.png';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, #fdf6f1 0%, #fff5f5 100%);
    font-family: "Nunito", sans-serif;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }
`;

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  margin: 70px auto 50px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.6s ease-out;
  transition: transform 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
  }
`;

const QuestionText = styled.div`
  font-size: 24px !important;
  font-family: "Kanit", sans-serif !important;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
  color: #2d3436;
  position: relative;
  animation: ${fadeIn} 0.4s ease-out;
  line-height: 1.4;
  padding: 0 1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #ffa7a7, #ff8f8f);
    border-radius: 3px;
  }
`;

const SenseiImage = styled.img`
  position: absolute;
  right: -100px;
  bottom: -50px;
  width: 100px;
  height: auto;

  @media (max-width: 750px) {
    display: none;
  }
`;

const AnswersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 30px;
  animation: ${fadeIn} 0.6s ease-out;
`;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 1rem !important;
  font-size: 16px !important;
  font-family: "Nunito", sans-serif !important;
  text-transform: none !important;
  border-radius: 15px !important;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
  border: 2px solid #e9ecef !important;
  color: #2d3436 !important;
  transition: all 0.3s ease !important;
  position: relative;
  overflow: hidden;

  &:hover {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%) !important;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const SelectedButton = styled(StyledButton)`
  background: linear-gradient(135deg, #ffa7a7 0%, #ff8f8f 100%) !important;
  color: white !important;
  border: none !important;
  animation: ${pulse} 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(135deg, #ff8f8f 0%, #ff7676 100%) !important;
  }
`;

const ProgressContainer = styled(Box)`
  width: 100%;
  margin-bottom: 2rem;
  padding: 0 1rem;
`;

const StyledLinearProgress = styled(LinearProgress)`
  height: 10px !important;
  border-radius: 5px !important;
  background-color: #e9ecef !important;

  .MuiLinearProgress-bar {
    background: linear-gradient(90deg, #ffa7a7, #ff8f8f) !important;
    border-radius: 5px;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  width: 100%;
  gap: 1rem;
`;

const PreviousButton = styled(Button)`
  background: linear-gradient(135deg, #a8a8a8 0%, #808080 100%) !important;
  color: white !important;
  text-transform: none !important;
  border-radius: 12px !important;
  padding: 0.8rem 1.5rem !important;
  transition: all 0.3s ease !important;

  &:hover {
    background: linear-gradient(135deg, #808080 0%, #666666 100%) !important;
    transform: translateX(-2px);
  }
`;

const NextButton = styled(Button)`
  background: linear-gradient(135deg, #ffa7a7 0%, #ff8f8f 100%) !important;
  color: white !important;
  text-transform: none !important;
  border-radius: 12px !important;
  padding: 0.8rem 1.5rem !important;
  transition: all 0.3s ease !important;

  &:hover {
    background: linear-gradient(135deg, #ff8f8f 0%, #ff7676 100%) !important;
    transform: translateX(2px);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

const shadowBounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) scale(1);
    opacity: 0.5;
  }
  40% {
    transform: translateX(-50%) scale(1.3);
    opacity: 0.3;
  }
  60% {
    transform: translateX(-50%) scale(1.1);
    opacity: 0.4;
  }
`;

const BouncingLoader = styled.div`
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;

  img {
    width: 100%;
    height: 100%;
    animation: ${bounce} 2s infinite;
    position: relative;
    z-index: 2;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    width: 60%;
    height: 15px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    transform: translateX(-50%);
    animation: ${shadowBounce} 2s infinite;
    z-index: 1;
  }
`;

const ProgressText = styled.div`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-top: 8px;
  font-weight: 500;
`;

const ProgressIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 10px;
`;

const ProgressDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$active ? 'linear-gradient(135deg, #ffa7a7, #ff8f8f)' : '#e9ecef'};
  transition: all 0.3s ease;
  transform: ${props => props.$active ? 'scale(1.2)' : 'scale(1)'};
`;

const AnswerButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 2px solid ${props => props.$active ? '#ff8f8f' : '#e0e0e0'};
  border-radius: 10px;
  background: ${props => props.$active 
    ? 'linear-gradient(135deg, #ffa7a7 0%, #ff8f8f 100%)'
    : 'white'};
  color: ${props => props.$active ? 'white' : '#666'};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Nunito", sans-serif;

  &:hover {
    background: ${props => props.$active 
      ? 'linear-gradient(135deg, #ff8f8f 0%, #ff7676 100%)'
      : '#f8f9fa'};
    border-color: ${props => props.$active ? '#ff7676' : '#ced4da'};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const FeedbackBubble = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: white;
  padding: 15px 25px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.3s ease-out;
  z-index: 1000;
  font-size: 14px;
  color: #2d3436;
  max-width: 300px;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -8px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid white;
  }
`;

const TimerContainer = styled.div`
  position: absolute;
  top: -40px;
  right: 0;
  background: linear-gradient(135deg, #ffa7a7 0%, #ff8f8f 100%);
  padding: 8px 16px;
  border-radius: 12px;
  color: white;
  font-family: "Nunito", sans-serif;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;

  &::before {
    content: '⏱️';
    font-size: 14px;
  }
`;

const StyledRangeInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  margin: 20px 0;
  border-radius: 5px;
  background: linear-gradient(90deg, #ffa7a7, #ff8f8f);
  outline: none;
  opacity: 0.9;
  transition: all 0.3s ease;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ff8f8f;
    cursor: pointer;
    transition: transform 0.3s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ff8f8f;
    cursor: pointer;
    border: none;
    transition: transform 0.3s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  &::-webkit-slider-thumb:hover,
  &::-moz-range-thumb:hover {
    transform: scale(1.2);
  }
`;

const RangeValueDisplay = styled.div`
  margin-top: 10px;
  font-size: 18px;
  font-family: "Nunito", sans-serif;
  font-weight: bold;
  color: #ff8f8f;
  text-align: center;
  animation: ${pulse} 0.3s ease-in-out;
`;

const ProgressStep = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.$active ? '#fabc1c' : '#e0e0e0'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$active ? 'white' : '#666'};
  font-weight: bold;
  transition: all 0.3s ease;
`;

const ProgressLine = styled.div`
  flex: 1;
  height: 3px;
  background-color: ${props => props.$active ? '#fabc1c' : '#e0e0e0'};
  transition: all 0.3s ease;
`;

/**
 * @typedef {import('../../types/personality').Question} Question
 * @typedef {import('../../types/personality').UserResponse} UserResponse
 * @typedef {import('../../types/personality').MotivationScores} MotivationScores
 * @typedef {import('../../types/personality').AnswersCount} AnswersCount
 */

/**
 * Composant principal du test de personnalité.
 * Gère l'affichage et la logique du questionnaire de personnalité,
 * incluant la progression, les réponses de l'utilisateur et la soumission des résultats.
 * 
 * @component
 * @example
 * return (
 *   <AppPersonalityTest />
 * )
 */
const AppPersonalityTest = () => {
    /** @type {[UserResponse[], Function]} */
    const [responses, setResponses] = useState([]);
    
    /** @type {[number, Function]} */
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    
    /** @type {[number|null, Function]} */
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    
    /** @type {[number, Function]} */
    const [timer, setTimer] = useState(0);
    
    /** @type {[AnswersCount, Function]} */
    const [answersCount, setAnswersCount] = useState({
        Colors: { Vert: 10, Marron: 10, Bleu: 10, Rouge: 10 },
        Letters: { A: 10, B: 10, C: 10, D: 10 }
    });
    
    /** @type {[MotivationScores, Function]} */
    const [motivationScores, setMotivationScores] = useState({});
    
    /** @type {[boolean, Function]} */
    const [loading, setLoading] = useState(false);
    
    /** @type {[Question[], Function]} */
    const [questions, setQuestions] = useState([]);
    
    /** @type {[number, Function]} */
    const [changeImpact, setChangeImpact] = useState(5);
    
    /** @type {[number, Function]} */
    const [randomNumber, setRandomNumber] = useState(0);

    const { userId, token, projectTaskId, recordID, name, firstname, email } = useUserContext();
    const navigate = useNavigate();
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    useEffect(() => {
        if (!recordID || !email || !name || !firstname) {
            navigate('/');
        } else {
            checkHsObjectId(recordID);
        }
        const shuffledQuestions = [...originalQuestions].sort(() => Math.random() - 0.5);
        setQuestions([...shuffledQuestions, {
            question: "Sur une échelle de 1 à 10, où en est votre envi de faire bouger les choses ?",
            type: "scale",
        }]);

        setRandomNumber(Math.floor(Math.random() * (7 - 4 + 1)) + 4);

        // Démarrer le timer
        const interval = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const checkHsObjectId = async (hsObjectId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/personality-test/checkHsObjectId/${hsObjectId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.exists) {
                navigate('/');
            }
        } catch (err) {
            console.error('Erreur lors de la vérification de hs_object_id:', err);
        }
    };

    const totalQuestions = questions.length;
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    /**
     * Met à jour le compteur de réponses pour un type donné
     * @param {string} answerType - Le type de réponse à mettre à jour
     * @param {number} increment - La valeur d'incrémentation
     */
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
    };

    /**
     * Met à jour les scores de motivation
     * @param {Question} question - La question actuelle
     * @param {number} score - Le score à ajouter
     */
    const updateMotivationScores = (question, score) => {
        const updatedScores = { ...motivationScores };
        if (question.type) {
            if (!updatedScores[question.type]) {
                updatedScores[question.type] = 0;
            }
            updatedScores[question.type] += score;
        }
        setMotivationScores(updatedScores);
    };

    /**
     * Calcule les résultats finaux du test
     * @returns {Object} Les résultats calculés
     */
    const calculateResults = () => {
        const dominantColor = Object.entries(answersCount.Colors).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
        const dominantLetter = Object.entries(answersCount.Letters).reduce((a, b) => (b[1] > a[1] ? b : a))[0];

        const motivationalItems = Object.entries(motivationScores)
            .filter(([_, score]) => score === Math.max(...Object.values(motivationScores)))
            .map(([key]) => key)
            .join(" / ");

        return {
            colors: dominantColor,
            letters: dominantLetter,
            motivationalItems,
        };
    };

    /**
     * Construit l'objet des réponses de l'utilisateur
     * @returns {UserResponse[]} Les réponses formatées
     */
    const buildUserAnswers = () => {
        return responses.map((response) => ({
            question: questions[response.questionIndex]?.question || "",
            answer: response.answerContent,
        }));
    };

    const handleAnswerProcessing = (question, selectedAnswer) => {
        if (question.type) {
            updateMotivationScores(question, selectedAnswer.score);
        } else {
            const existingResponse = responses.find((res) => res.questionIndex === currentQuestionIndex);
            if (existingResponse) {
                updateAnswerCount(existingResponse.answerType, -1);
            }
            updateAnswerCount(selectedAnswer.type, 1);
        }
    };

    const submitResponse = async () => {
        console.log(`Temps total du test en secondes : ${formatTime(timer)}`);

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
                    userAnswers,
                    hs_object_id: recordID,
                    name,
                    email,
                    firstname
                }),
            });

            if (res.status === 201) {
                const data = await res.json();
                const rapportCouleur = data.bilanColor;
                const rapportLettre = data.bilanLetter;
                const pdfColorBase64 = data.pdfColor;
                const pdfLetterBase64 = data.pdfLetter;

                const secondApiBody = {
                    results: {
                        score: {
                            color: results.colors,
                            letters: results.letters,
                        },
                        userAnswers,
                        codeTest: "mbti",
                        nomTest: "Test de personalité",
                        rapportCouleur,
                        rapportLettre,
                        changeImpact,
                        pdfColorBase64,
                        pdfLetterBase64,
                        user_hubspot: {
                            hubspot_id: recordID,
                            hubspot_name: name,
                            hubspot_firstname: firstname,
                            hubspot_mail: email,
                        }
                    },
                };

                if (userId && token) {
                    secondApiBody.user_id = userId;
                    secondApiBody.token = token;
                }

                if (projectTaskId) {
                    secondApiBody.project_task_id = projectTaskId;
                }

                const secondRes = await fetch("https://app.sensei-france.fr/psycho_tests/new_results", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(secondApiBody),
                });

                if (secondRes.status === 200) {

                    const hubspotPayload = {
                        couleur_situatio: results.colors,
                        rapport_couleur_situatio: rapportCouleur,
                        lettre_situatio: results.letters,
                        rapport_lettre_situatio: rapportLettre,
                        email : email,
                        hs_object_id : recordID,
                        item_de_motivation: results.motivationalItems,
                        changeImpact: changeImpact,
                    };

                    await fetch(`${import.meta.env.VITE_API_URL}/personality-test/hubspot`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(hubspotPayload),
                    });

                    toast.success("Résultats enregistrés avec succès !");
                    navigate("/mbti/results", { state: { data: { userAnswers, results, randomNumber } } });
                } else {
                    toast.error(`Erreur lors de l'envoi des résultats au deuxième serveur : ${secondRes.status} - ${secondRes.statusText}`);
                }
            } else {
                toast.error(`Erreur lors de l'envoi des résultats au premier serveur : ${res.status} - ${res.statusText}`);
            }
        } catch (error) {
            toast.error(`Une erreur s'est produite lors de la soumission : ${error.message}`);
            console.error("An error occurred while submitting the response:", error);
        } finally {
            setLoading(false);
        }
    };

    const showFeedbackMessage = (message) => {
        setFeedbackMessage(message);
        setShowFeedback(true);
        setTimeout(() => setShowFeedback(false), 3000);
    };

    const handleAnswerSelection = (index) => {
        setSelectedAnswerIndex(index);
    };

    const handleNextQuestion = () => {
        if (selectedAnswerIndex === null && currentQuestionIndex < totalQuestions - 1) {
            toast.warn("Veuillez sélectionner une réponse avant de continuer.");
            return;
        }

        if (currentQuestionIndex === totalQuestions - 1) {
            submitResponse();
        } else {
            const question = questions[currentQuestionIndex];
            const selectedAnswer = question.answers[selectedAnswerIndex];

            handleAnswerProcessing(question, selectedAnswer);

            const updatedResponses = [
                ...responses.filter((response) => response.questionIndex !== currentQuestionIndex),
                { questionIndex: currentQuestionIndex, answerContent: selectedAnswer.content, answerType: selectedAnswer.type || null },
            ];
            setResponses(updatedResponses);

            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswerIndex(null);
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
        <>
            <GlobalStyle />
            <QuizContainer>
                <ToastContainer />
                {!loading && (
                    <>
                        <TimerContainer>
                            {formatTime(timer)}
                        </TimerContainer>
                        <ProgressContainer>
                            <StyledLinearProgress
                                variant="determinate"
                                value={(currentQuestionIndex / questions.length) * 100}
                            />
                            <ProgressText>
                                Question {currentQuestionIndex + 1} sur {questions.length}
                            </ProgressText>
                            <ProgressIndicator>
                                {[0, 1, 2, 3, 4].map((index) => (
                                    <ProgressDot
                                        key={index}
                                        $active={index === currentQuestionIndex % 5}
                                    />
                                ))}
                            </ProgressIndicator>
                        </ProgressContainer>
                    </>
                )}
                {loading ? (
                    <BouncingLoader>
                        <img src={loaderSensei} alt="Loader Sensei" />
                    </BouncingLoader>
                ) : (
                    currentQuestionIndex === totalQuestions - 1 ? (
                        <div>
                            <QuestionText>
                                Sur une échelle de 1 à 10, où en est votre envie de faire bouger les choses ?
                            </QuestionText>
                            <StyledRangeInput
                                type="range"
                                min="0"
                                max="10"
                                value={changeImpact}
                                onChange={(e) => setChangeImpact(Number(e.target.value))}
                            />
                            <RangeValueDisplay>{changeImpact}</RangeValueDisplay>
                            <NextButton variant="contained" onClick={submitResponse}>
                                Soumettre
                            </NextButton>
                        </div>
                    ) : (
                        <>
                            <QuestionText>
                                {`Question ${currentQuestionIndex + 1} / ${totalQuestions}: ${
                                    questions[currentQuestionIndex]?.question
                                }`}
                                <SenseiImage src={styleSensei} alt="" />
                            </QuestionText>
                            <AnswersContainer>
                                {questions[currentQuestionIndex]?.answers.map((answer, index) => (
                                    <AnswerButton
                                        key={index}
                                        onClick={() => handleAnswerSelection(index)}
                                        $active={selectedAnswerIndex === index}
                                    >
                                        {answer.content}
                                    </AnswerButton>
                                ))}
                            </AnswersContainer>
                            <NavigationButtons>
                                <PreviousButton
                                    variant="contained"
                                    onClick={handlePreviousQuestion}
                                    disabled={currentQuestionIndex === 0}
                                >
                                    Précédent
                                </PreviousButton>
                                <NextButton variant="contained" onClick={handleNextQuestion}>
                                    Suivant
                                </NextButton>
                            </NavigationButtons>
                        </>
                    )
                )}
                {showFeedback && (
                    <FeedbackBubble>
                        {feedbackMessage}
                    </FeedbackBubble>
                )}
            </QuizContainer>
        </>
    );
};

export default AppPersonalityTest;
