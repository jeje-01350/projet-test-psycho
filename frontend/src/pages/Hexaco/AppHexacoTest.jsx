import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { LinearProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { hexacoQuestions } from '../../constants/Hexaco/data';
import styleSensei from '../../images/style-sensei.png';

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

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, #f0e6ff 0%, #fff0ff 100%);
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
    background: linear-gradient(90deg, #9b59b6, #8e44ad);
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
  border: 2px solid ${props => props.$active ? '#9b59b6' : '#e0e0e0'};
  border-radius: 10px;
  background: ${props => props.$active 
    ? 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)'
    : 'white'};
  color: ${props => props.$active ? 'white' : '#666'};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Nunito", sans-serif;

  &:hover {
    background: ${props => props.$active 
      ? 'linear-gradient(135deg, #8e44ad 0%, #7d3c98 100%)'
      : '#f8f9fa'};
    border-color: ${props => props.$active ? '#8e44ad' : '#ced4da'};
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
  background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
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
    background: linear-gradient(135deg, #8e44ad 0%, #7d3c98 100%);
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
    background: linear-gradient(90deg, #9b59b6, #8e44ad) !important;
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

const TimerContainer = styled.div`
  position: absolute;
  top: -40px;
  right: 0;
  background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
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

const AppHexacoTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(hexacoQuestions.length).fill(''));
  const [testStartTime] = useState(Date.now());

  const progress = ((currentQuestion + 1) / hexacoQuestions.length) * 100;

  const handleAnswerSelect = (answer) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = JSON.stringify(answer);
    setSelectedAnswers(newSelectedAnswers);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitResults = async (scores, userAnswers, testDuration) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/hexaco/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scores,
          userAnswers,
          testDuration
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde des résultats');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des résultats:', error);
      throw error;
    }
  };

  const handleNext = async () => {
    const answer = JSON.parse(selectedAnswers[currentQuestion]);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      question: hexacoQuestions[currentQuestion].question,
      answer: answer.content,
      type: answer.type,
      score: answer.score
    };
    
    setAnswers(newAnswers);

    if (currentQuestion + 1 < hexacoQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const scores = {
        H: 0, E: 0, X: 0, A: 0, C: 0, O: 0
      };

      newAnswers.forEach(answer => {
        scores[answer.type] += answer.score;
      });

      Object.keys(scores).forEach(key => {
        const maxScore = 10;
        scores[key] = Math.round((scores[key] / maxScore) * 100);
      });

      try {
        const testDuration = Math.round((Date.now() - testStartTime) / 1000);
        await submitResults(scores, newAnswers, testDuration);
        navigate('/hexaco/results', { 
          state: { 
            scores,
            testDuration
          }
        });
      } catch (error) {
        toast.error('Erreur lors de la soumission des résultats. Veuillez réessayer.');
      }
    }
  };

  const formatTime = (ms) => {
    const seconds = Math.floor((Date.now() - ms) / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <GlobalStyle />
      <QuizContainer>
        <TimerContainer>
          {formatTime(testStartTime)}
        </TimerContainer>

        <ProgressContainer>
          <StyledLinearProgress variant="determinate" value={progress} />
          <ProgressText>
            Question {currentQuestion + 1} sur {hexacoQuestions.length}
          </ProgressText>
        </ProgressContainer>

        <QuestionText>
          {hexacoQuestions[currentQuestion].question}
        </QuestionText>

        <AnswersContainer>
          {hexacoQuestions[currentQuestion].answers.map((answer, index) => (
            <AnswerButton
              key={index}
              $active={selectedAnswers[currentQuestion] === JSON.stringify(answer)}
              onClick={() => handleAnswerSelect(answer)}
            >
              {answer.content}
            </AnswerButton>
          ))}
        </AnswersContainer>

        <NavigationButtons>
          <PreviousButton
            disabled={currentQuestion === 0}
            onClick={handlePrevious}
          >
            Précédent
          </PreviousButton>
          <NextButton
            disabled={!selectedAnswers[currentQuestion]}
            onClick={handleNext}
          >
            {currentQuestion + 1 === hexacoQuestions.length ? 'Terminer' : 'Suivant'}
          </NextButton>
        </NavigationButtons>

        <SenseiImage src={styleSensei} alt="Style Sensei" />
      </QuizContainer>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default AppHexacoTest; 