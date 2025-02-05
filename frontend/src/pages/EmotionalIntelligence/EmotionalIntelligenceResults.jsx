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
    background: linear-gradient(135deg, #fdf6f1 0%, #fff5f5 100%);
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
  color: #6B8E23;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #6B8E23;
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
    width: ${props => (props.$score / 6) * 100}%;
    background: linear-gradient(135deg, #6B8E23 0%, #556B2F 100%);
    border-radius: 10px;
    transition: width 1s ease-out;
  }
`;

const ScoreLabel = styled.span`
  font-weight: bold;
  color: #6B8E23;
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
  background: linear-gradient(135deg, #6B8E23 0%, #556B2F 100%);
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

const dimensionDescriptions = {
  SA: {
    title: "Conscience de soi",
    description: "Votre capacité à identifier et comprendre vos propres émotions. Un score élevé indique une excellente conscience de vos états émotionnels et de leur impact sur votre comportement."
  },
  EM: {
    title: "Gestion des émotions",
    description: "Votre capacité à gérer et réguler vos émotions. Un score élevé montre que vous savez bien gérer vos émotions, même dans des situations stressantes."
  },
  SOA: {
    title: "Conscience sociale",
    description: "Votre capacité à percevoir et comprendre les émotions des autres. Un score élevé indique une grande empathie et une bonne lecture des situations sociales."
  },
  RM: {
    title: "Gestion des relations",
    description: "Votre capacité à interagir efficacement avec les autres. Un score élevé montre que vous savez bien gérer les relations interpersonnelles et communiquer efficacement."
  },
  DM: {
    title: "Prise de décision",
    description: "Votre capacité à intégrer les émotions dans la prise de décision. Un score élevé indique que vous prenez des décisions équilibrées en tenant compte des aspects émotionnels."
  }
};

const EmotionalIntelligenceResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scores, duration } = location.state || { scores: {}, duration: 0 };

  // Normaliser les scores sur une échelle de 0 à 100
  const normalizedScores = {
    SA: (scores.SA / 6) * 100,
    EM: (scores.EM / 6) * 100,
    SOA: (scores.SOA / 6) * 100,
    RM: (scores.RM / 6) * 100,
    DM: (scores.DM / 6) * 100
  };

  const chartData = {
    labels: ['Conscience de soi', 'Gestion des émotions', 'Conscience sociale', 'Gestion des relations', 'Prise de décision'],
    datasets: [
      {
        label: 'Vos scores',
        data: [
          normalizedScores.SA,
          normalizedScores.EM,
          normalizedScores.SOA,
          normalizedScores.RM,
          normalizedScores.DM
        ],
        backgroundColor: 'rgba(107, 142, 35, 0.2)',
        borderColor: '#6B8E23',
        borderWidth: 2,
        pointBackgroundColor: '#6B8E23',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#6B8E23'
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
        <Title>Vos résultats d'Intelligence Émotionnelle</Title>

        <ChartContainer>
          <Radar data={chartData} options={chartOptions} />
        </ChartContainer>

        <ResultsSection>
          {Object.entries(dimensionDescriptions).map(([key, { title, description }]) => (
            <div key={key}>
              <DimensionTitle>{title}</DimensionTitle>
              <ScoreIndicator>
                <ScoreLabel>{Math.round(normalizedScores[key])}%</ScoreLabel>
                <ScoreBar $score={scores[key]} />
              </ScoreIndicator>
              <DimensionDescription>{description}</DimensionDescription>
            </div>
          ))}
        </ResultsSection>

        <ReturnButton onClick={handleReturn}>
          Retourner à l'accueil
        </ReturnButton>
      </ResultsContainer>
    </>
  );
};

export default EmotionalIntelligenceResults; 