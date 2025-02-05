import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { LinearProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { emotionalIntelligenceQuestions } from "../../constants/index";
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
    background: linear-gradient(90deg, #6B8E23, #556B2F);
    border-radius: 3px;
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

const AnswerButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 2px solid ${props => props.$active ? '#6B8E23' : '#e0e0e0'};
  border-radius: 10px;
  background: ${props => props.$active 
    ? 'linear-gradient(135deg, #6B8E23 0%, #556B2F 100%)'
    : 'white'};
  color: ${props => props.$active ? 'white' : '#666'};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Nunito", sans-serif;

  &:hover {
    background: ${props => props.$active 
      ? 'linear-gradient(135deg, #556B2F 0%, #3B4B22 100%)'
      : '#f8f9fa'};
    border-color: ${props => props.$active ? '#3B4B22' : '#ced4da'};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  width: 100%;
  gap: 1rem;
`;

const PreviousButton = styled.button`
  background: linear-gradient(135deg, #a8a8a8 0%, #808080 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => props.disabled ? 0.5 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};

  &:hover {
    background: linear-gradient(135deg, #808080 0%, #666666 100%);
    transform: translateX(-2px);
  }
`;

const NextButton = styled.button`
  background: linear-gradient(135deg, #6B8E23 0%, #556B2F 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #556B2F 0%, #3B4B22 100%);
    transform: translateX(2px);
  }
`;

const ProgressContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  padding: 0 1rem;
`;

const StyledLinearProgress = styled(LinearProgress)`
  height: 10px !important;
  border-radius: 5px !important;
  background-color: #e9ecef !important;

  .MuiLinearProgress-bar {
    background: linear-gradient(90deg, #6B8E23, #556B2F) !important;
    border-radius: 5px;
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
  background: ${props => props.$active ? 'linear-gradient(135deg, #6B8E23, #556B2F)' : '#e9ecef'};
  transition: all 0.3s ease;
  transform: ${props => props.$active ? 'scale(1.2)' : 'scale(1)'};
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

const TimerContainer = styled.div`
  position: absolute;
  top: -40px;
  right: 0;
  background: linear-gradient(135deg, #6B8E23 0%, #556B2F 100%);
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

const BouncingLoader = styled.div`
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;

  img {
    width: 100%;
    height: 100%;
    animation: ${pulse} 2s infinite;
  }
`;

const AppEmotionalIntelligenceTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [responses, setResponses] = useState([]);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState({
    SA: 0,  // Self Awareness
    EM: 0,  // Emotion Management
    SOA: 0, // Social Awareness
    RM: 0,  // Relationship Management
    DM: 0   // Decision Making
  });

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleAnswerSelection = (index) => {
    setSelectedAnswerIndex(index);
  };

  const updateScores = (questionIndex, answerIndex) => {
    const question = emotionalIntelligenceQuestions[questionIndex];
    const answer = question.answers[answerIndex];
    const dimension = answer.type;
    const score = answer.score;

    setScores(prev => ({
      ...prev,
      [dimension]: prev[dimension] + score
    }));
  };

  const handleNextQuestion = async () => {
    if (selectedAnswerIndex === null) {
      toast.warn("Veuillez sélectionner une réponse avant de continuer.");
      return;
    }

    const updatedResponses = [
      ...responses,
      {
        question: emotionalIntelligenceQuestions[currentQuestion].question,
        answer: emotionalIntelligenceQuestions[currentQuestion].answers[selectedAnswerIndex].content
      }
    ];

    updateScores(currentQuestion, selectedAnswerIndex);
    setResponses(updatedResponses);

    if (currentQuestion === emotionalIntelligenceQuestions.length - 1) {
      try {
        await submitResults(updatedResponses);
      } catch (error) {
        console.error('Erreur lors de la soumission:', error);
        toast.error("Une erreur est survenue. Veuillez réessayer.");
      }
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswerIndex(null);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswerIndex(null);
    }
  };

  const submitResults = async (finalResponses) => {
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/emotional-intelligence/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scores,
          userAnswers: finalResponses,
          testDuration: timer
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Stocker les résultats dans sessionStorage comme backup
      sessionStorage.setItem('emotionalIntelligenceResults', JSON.stringify({
        scores,
        responses: finalResponses,
        duration: timer
      }));

      // Navigation directe sans setTimeout
      navigate('/emotional-intelligence/results', { 
        state: { 
          scores,
          responses: finalResponses,
          duration: timer
        },
        replace: true
      });
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      toast.error("Une erreur est survenue lors de la communication avec le serveur.");
    } finally {
      setLoading(false);
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
                value={(currentQuestion / emotionalIntelligenceQuestions.length) * 100}
              />
              <ProgressText>
                Question {currentQuestion + 1} sur {emotionalIntelligenceQuestions.length}
              </ProgressText>
              <ProgressIndicator>
                {[0, 1, 2, 3, 4].map((index) => (
                  <ProgressDot
                    key={index}
                    $active={index === currentQuestion % 5}
                  />
                ))}
              </ProgressIndicator>
            </ProgressContainer>
          </>
        )}

        {loading ? (
          <BouncingLoader>
            <img src={loaderSensei} alt="Chargement..." />
          </BouncingLoader>
        ) : (
          <>
            <QuestionText>
              {emotionalIntelligenceQuestions[currentQuestion].question}
              <SenseiImage src={styleSensei} alt="" />
            </QuestionText>

            <AnswersContainer>
              {emotionalIntelligenceQuestions[currentQuestion].answers.map((answer, index) => (
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
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
                Précédent
              </PreviousButton>
              <NextButton onClick={handleNextQuestion}>
                {currentQuestion === emotionalIntelligenceQuestions.length - 1 ? 'Terminer' : 'Suivant'}
              </NextButton>
            </NavigationButtons>
          </>
        )}
      </QuizContainer>
    </>
  );
};

export default AppEmotionalIntelligenceTest; 