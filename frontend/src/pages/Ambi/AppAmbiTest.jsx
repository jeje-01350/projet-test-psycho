import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { LinearProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ambiQuestions, ambiScale } from '../../constants/Ambi/data';
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
    background: linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%);
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
  max-width: 800px;
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
    background: linear-gradient(90deg, #4caf50, #388e3c);
    border-radius: 3px;
  }
`;

const ScaleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 30px;
  animation: ${fadeIn} 0.6s ease-out;
`;

const ScaleButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 2px solid ${props => props.$active ? '#4caf50' : '#e0e0e0'};
  border-radius: 10px;
  background: ${props => props.$active 
    ? 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)'
    : 'white'};
  color: ${props => props.$active ? 'white' : '#666'};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Nunito", sans-serif;

  &:hover {
    background: ${props => props.$active 
      ? 'linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)'
      : '#f8f9fa'};
    border-color: ${props => props.$active ? '#388e3c' : '#ced4da'};
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
  background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
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
    background: linear-gradient(135deg, #388e3c 0%, #2e7d32 100%);
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
    background: linear-gradient(90deg, #4caf50, #388e3c) !important;
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
  background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
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

const AppAmbiTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(ambiQuestions.length).fill(null));
  const [testStartTime] = useState(Date.now());
  const [questionStartTimes, setQuestionStartTimes] = useState([Date.now()]);
  const [randomQuestionOrder] = useState(() => {
    const indices = Array.from({ length: ambiQuestions.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  });

  const progress = ((currentQuestion + 1) / ambiQuestions.length) * 100;

  useEffect(() => {
    setQuestionStartTimes(prev => [...prev, Date.now()]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestion]);

  const handleAnswerSelect = (value) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[randomQuestionOrder[currentQuestion]] = value;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = (answers, dimension) => {
    const dimensionAnswers = answers.filter(a => a.dimension === dimension);
    const totalScore = dimensionAnswers.reduce((acc, curr) => {
      const score = curr.isReversed ? 8 - curr.answer : curr.answer;
      return acc + score;
    }, 0);
    const maxScore = dimensionAnswers.length * 7;
    return Math.round((totalScore / maxScore) * 100);
  };

  const submitResults = async (scores, userAnswers, testDuration, averageResponseTime) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/ambi/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scores,
          userAnswers,
          testDuration,
          averageResponseTime
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
    const currentQuestionIndex = randomQuestionOrder[currentQuestion];
    const currentQuestionData = ambiQuestions[currentQuestionIndex];
    
    const currentAnswer = {
      question: currentQuestionData.question,
      answer: selectedAnswers[currentQuestionIndex],
      dimension: currentQuestionData.dimension,
      isReversed: currentQuestionData.isReversed
    };

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = currentAnswer;
    setAnswers(newAnswers);

    if (currentQuestion + 1 < ambiQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const dimensions = ['E', 'A', 'C', 'S', 'O'];
      const scores = {};
      dimensions.forEach(dim => {
        scores[dim] = calculateScore(newAnswers, dim);
      });

      try {
        const testDuration = Math.round((Date.now() - testStartTime) / 1000);
        const responseTimes = questionStartTimes.slice(1).map((time, index) => {
          const prevTime = questionStartTimes[index];
          return time - prevTime;
        });
        const averageResponseTime = Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length);

        await submitResults(scores, newAnswers, testDuration, averageResponseTime);
        navigate('/ambi/results', { 
          state: { 
            scores,
            testDuration,
            averageResponseTime
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
            Question {currentQuestion + 1} sur {ambiQuestions.length}
          </ProgressText>
        </ProgressContainer>

        <QuestionText>
          {ambiQuestions[randomQuestionOrder[currentQuestion]].question}
        </QuestionText>

        <ScaleContainer>
          {ambiScale.map((scale) => (
            <ScaleButton
              key={scale.value}
              $active={selectedAnswers[randomQuestionOrder[currentQuestion]] === scale.value}
              onClick={() => handleAnswerSelect(scale.value)}
            >
              {scale.label}
            </ScaleButton>
          ))}
        </ScaleContainer>

        <NavigationButtons>
          <PreviousButton
            disabled={currentQuestion === 0}
            onClick={handlePrevious}
          >
            Précédent
          </PreviousButton>
          <NextButton
            disabled={selectedAnswers[randomQuestionOrder[currentQuestion]] === null}
            onClick={handleNext}
          >
            {currentQuestion + 1 === ambiQuestions.length ? 'Terminer' : 'Suivant'}
          </NextButton>
        </NavigationButtons>

        <SenseiImage src={styleSensei} alt="Style Sensei" />
      </QuizContainer>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default AppAmbiTest; 