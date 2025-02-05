import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { LinearProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { discQuestions } from '../../constants/index';
import styleSensei from '../../images/style-sensei.png';

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, #fdf6f1 0%, #fff5f5 100%);
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }
`;

const PageContainer = styled.div`
  min-height: calc(100vh - 70px);
  padding: 2rem;
  margin-top: 0;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const QuestionNumber = styled.div`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const Timer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 1.1rem;
  margin-top: 0.5rem;
`;

const QuestionText = styled.h2`
  color: #333;
  text-align: center;
  margin: 2rem 0;
  font-size: 1.5rem;
`;

const AnswerButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 10px;
  background: ${props => props.selected ? '#e74c3c' : '#f8f9fa'};
  color: ${props => props.selected ? 'white' : '#333'};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;

  &:hover {
    background: ${props => props.selected ? '#c0392b' : '#e9ecef'};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const NavButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: #e74c3c;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: #c0392b;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const SenseiImage = styled.img`
  position: absolute;
  right: -50px;
  top: -50px;
  width: 100px;
  height: auto;
  transform: rotate(15deg);

  @media (max-width: 768px) {
    display: none;
  }
`;

const AppDiscTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [startTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleAnswer = (answer) => {
    setAnswers({
      ...answers,
      [currentQuestion]: answer
    });
  };

  const handleNext = () => {
    if (currentQuestion < discQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScores = () => {
    const scores = {
      D: 0,
      I: 0,
      S: 0,
      C: 0
    };

    Object.values(answers).forEach(answer => {
      scores[answer.type] += answer.score;
    });

    // Normaliser les scores sur 100
    const maxScore = 30; // Score maximum possible pour chaque dimension
    Object.keys(scores).forEach(key => {
      scores[key] = Math.round((scores[key] / maxScore) * 100);
    });

    return scores;
  };

  const handleSubmit = async () => {
    const testDuration = Math.floor((Date.now() - startTime) / 1000);
    const scores = calculateScores();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/disc/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scores,
          userAnswers: Object.entries(answers).map(([questionIndex, answer]) => ({
            question: discQuestions[questionIndex].question,
            answer: answer.content
          })),
          testDuration
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde des résultats');
      }

      const data = await response.json();
      navigate('/disc/results', { 
        state: { 
          results: data.data,
          testDuration 
        }
      });
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Une erreur est survenue lors de la sauvegarde des résultats');
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progress = (currentQuestion + 1) / discQuestions.length;
  const currentQuestionData = discQuestions[currentQuestion];

  return (
    <PageContainer>
      <Container>
        <SenseiImage src={styleSensei} alt="Sensei" />
        <Header>
          <QuestionNumber>
            Question {currentQuestion + 1} sur {discQuestions.length}
          </QuestionNumber>
          <Timer>
            <span role="img" aria-label="timer">⏱️</span>
            Temps écoulé: {formatTime(elapsedTime)}
          </Timer>
        </Header>
        
        <LinearProgress 
          variant="determinate" 
          value={progress * 100} 
          sx={{
            marginBottom: '2rem',
            backgroundColor: '#ffebee',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#e74c3c'
            }
          }}
        />

        <QuestionText>
          {currentQuestionData.question}
        </QuestionText>

        {currentQuestionData.answers.map((answer, index) => (
          <AnswerButton
            key={index}
            selected={answers[currentQuestion]?.content === answer.content}
            onClick={() => handleAnswer(answer)}
          >
            {answer.content}
          </AnswerButton>
        ))}

        <NavigationButtons>
          <NavButton
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Précédent
          </NavButton>

          {currentQuestion === discQuestions.length - 1 ? (
            <NavButton
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== discQuestions.length}
            >
              Terminer
            </NavButton>
          ) : (
            <NavButton
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
            >
              Suivant
            </NavButton>
          )}
        </NavigationButtons>
      </Container>
      <ToastContainer position="bottom-right" />
    </PageContainer>
  );
};

export default AppDiscTest; 