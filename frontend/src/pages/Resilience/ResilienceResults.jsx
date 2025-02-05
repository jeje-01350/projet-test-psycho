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
  color: #ff8f8f;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #ff8f8f;
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
    background: linear-gradient(135deg, #ffa7a7 0%, #ff8f8f 100%);
    border-radius: 10px;
    transition: width 1s ease-out;
  }
`;

const ScoreLabel = styled.span`
  font-weight: bold;
  color: #ff8f8f;
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
  background: linear-gradient(135deg, #ffa7a7 0%, #ff8f8f 100%);
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
  AD: {
    title: "Adaptabilité",
    description: "Votre capacité à vous adapter aux changements et à faire face à de nouvelles situations. Un score élevé indique une grande flexibilité et une bonne capacité d'adaptation."
  },
  PR: {
    title: "Résolution de problèmes",
    description: "Votre approche face aux défis et votre capacité à trouver des solutions. Un score élevé montre une bonne aptitude à résoudre les problèmes de manière efficace."
  },
  EM: {
    title: "Gestion émotionnelle",
    description: "Votre capacité à gérer le stress et les émotions difficiles. Un score élevé indique une bonne maîtrise émotionnelle et une gestion efficace du stress."
  },
  SS: {
    title: "Support social",
    description: "Votre aptitude à mobiliser et utiliser le soutien social disponible. Un score élevé montre une bonne capacité à maintenir et utiliser un réseau de soutien."
  },
  SC: {
    title: "Confiance en soi",
    description: "Votre niveau de confiance en vos capacités. Un score élevé indique une forte confiance en soi et une bonne estime personnelle."
  }
};

const ResilienceResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scores, duration } = location.state || { scores: {}, duration: 0 };

  // Normaliser les scores sur une échelle de 0 à 100
  const normalizedScores = {
    AD: (scores.AD / 6) * 100,
    PR: (scores.PR / 6) * 100,
    EM: (scores.EM / 6) * 100,
    SS: (scores.SS / 6) * 100,
    SC: (scores.SC / 6) * 100
  };

  const chartData = {
    labels: ['Adaptabilité', 'Résolution de problèmes', 'Gestion émotionnelle', 'Support social', 'Confiance en soi'],
    datasets: [
      {
        label: 'Vos scores',
        data: [
          normalizedScores.AD,
          normalizedScores.PR,
          normalizedScores.EM,
          normalizedScores.SS,
          normalizedScores.SC
        ],
        backgroundColor: 'rgba(255, 143, 143, 0.2)',
        borderColor: '#ff8f8f',
        borderWidth: 2,
        pointBackgroundColor: '#ff8f8f',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#ff8f8f'
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
        <Title>Vos résultats de résilience</Title>

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

export default ResilienceResults; 