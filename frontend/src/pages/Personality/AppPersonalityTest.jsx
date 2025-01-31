import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { LinearProgress, Button, Box } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { personalityTestQuestion as originalQuestions } from "../../constants/index";
import { useUserContext } from "../../context/userContext.jsx";
import styleSensei from '../../images/style-sensei.png';
import loaderSensei from '../../images/loader-sensei.png';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #fdf6f1;
    font-family: "Nunito", sans-serif;
    margin: 0;
    padding: 0;
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
  margin: 100px auto auto;
  border-radius: 12px;
`;

const QuestionText = styled.div`
  font-size: 22px !important;
  font-family: "Kanit", sans-serif !important;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
  position: relative;
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
  margin-top: 50px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 0.8rem;
  font-size: 15px !important;
  font-family: "Nunito", sans-serif !important;
  text-transform: none !important;
  border-radius: 12px !important;
  background-color: #ffffff !important;
  border: 1px solid #000 !important;
  color: #000 !important;

  &:hover {
    background-color: #919191 !important;
    color: #000 !important;
  }
`;

const SelectedButton = styled(StyledButton)`
  background-color: #919191 !important;
  color: #000 !important;
`;

const ProgressContainer = styled(Box)`
  width: 100%;
  margin-bottom: 1.5rem;
`;

const StyledRangeInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  margin-top: 20px;
  border-radius: 5px;
  background: linear-gradient(90deg, #ffa7a7, #ff8f8f);
  outline: none;
  opacity: 0.9;
  transition: background 0.3s;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ff8f8f;
    cursor: pointer;
    transition: background 0.3s;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ff8f8f;
    cursor: pointer;
  }
`;

const RangeValueDisplay = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-family: "Nunito", sans-serif;
  font-weight: bold;
  color: #ff8f8f;
  text-align: center;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  width: 100%;
`;

const PreviousButton = styled(Button)`
  background-color: #808080 !important;
  color: #fff !important;
  text-transform: none !important;
  border-radius: 12px !important;
  &:hover {
    background-color: #6c6c6c;
  }
`;

const NextButton = styled(Button)`
  background-color: #ffa7a7 !important;
  color: #fff !important;
  text-transform: none !important;
  border-radius: 12px !important;
  &:hover {
    background-color: #ff8f8f;
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
        // Afficher le temps total dans une alerte
        alert(`Temps total du test : ${formatTime(timer)}`);
        console.log(`Temps total du test en secondes : ${timer}`);

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
                        <ProgressContainer>
                            <LinearProgress variant="determinate" value={progress} />
                        </ProgressContainer>
                        <div style={{ 
                            position: 'fixed', 
                            top: '20px', 
                            right: '20px', 
                            backgroundColor: '#ffa7a7',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            color: 'white',
                            fontFamily: '"Nunito", sans-serif',
                            fontWeight: 'bold',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            Timer: {formatTime(timer)}
                        </div>
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
            </QuizContainer>
        </>
    );
};

export default AppPersonalityTest;
