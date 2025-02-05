import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { hexacoDescriptions } from '../../constants/Hexaco/data';
import senseiStyle from '../../images/style-sensei.png';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, #f0e6ff 0%, #fff0ff 100%);
    font-family: "Nunito", sans-serif;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }
`;

const ResultsContainer = styled.div`
  max-width: 1000px;
  margin: 50px auto;
  padding: 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-family: "Kanit", sans-serif;
`;

const ChartContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const ResultsSection = styled.div`
  margin-top: 3rem;
`;

const DimensionTitle = styled.h3`
  color: #9b59b6;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #9b59b6;
  padding-bottom: 0.5rem;
`;

const DimensionDescription = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ScoreIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ScoreBar = styled.div`
  flex-grow: 1;
  height: 20px;
  background: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.$score}%;
    background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
    border-radius: 10px;
    transition: width 1s ease-out;
  }
`;

const ScoreLabel = styled.span`
  font-weight: bold;
  color: #9b59b6;
  width: 50px;
  text-align: right;
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

const ReturnButton = styled.button`
  background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const TestDuration = styled.div`
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const HexacoResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scores, testDuration } = location.state || {};

  if (!scores) {
    navigate('/hexaco');
    return null;
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const chartData = {
    labels: [
      'Honnêteté-Humilité',
      'Émotionnalité',
      'eXtraversion',
      'Agréabilité',
      'Conscience',
      'Ouverture'
    ],
    datasets: [
      {
        label: 'Vos scores',
        data: [
          scores.H,
          scores.E,
          scores.X,
          scores.A,
          scores.C,
          scores.O
        ],
        backgroundColor: 'rgba(155, 89, 182, 0.2)',
        borderColor: '#9b59b6',
        borderWidth: 2,
        pointBackgroundColor: '#9b59b6',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#9b59b6'
      }
    ]
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          backdropColor: 'transparent'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  const handleReturn = () => {
    navigate('/');
  };

  return (
    <>
      <GlobalStyle />
      <ResultsContainer>
        <SenseiImage src={senseiStyle} alt="Sensei" />
        <Title>Vos résultats HEXACO</Title>
        
        <TestDuration>
          Durée du test : {formatTime(testDuration)}
        </TestDuration>

        <ChartContainer>
          <Radar data={chartData} options={chartOptions} />
        </ChartContainer>

        <ResultsSection>
          {Object.entries(hexacoDescriptions).map(([key, { title, high, low }]) => (
            <div key={key}>
              <DimensionTitle>{title}</DimensionTitle>
              <ScoreIndicator>
                <ScoreLabel>{scores[key]}%</ScoreLabel>
                <ScoreBar $score={scores[key]} />
              </ScoreIndicator>
              <DimensionDescription>
                {scores[key] >= 50 ? high : low}
              </DimensionDescription>
            </div>
          ))}
        </ResultsSection>

        <div style={{ textAlign: 'center' }}>
          <ReturnButton onClick={handleReturn}>
            Retour à l'accueil
          </ReturnButton>
        </div>
      </ResultsContainer>
    </>
  );
};

export default HexacoResults; 