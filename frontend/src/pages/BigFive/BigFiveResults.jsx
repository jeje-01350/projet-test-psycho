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
    width: ${props => (props.$score / 10) * 100}%;
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
  O: {
    title: "Ouverture à l'expérience",
    description: "Reflète votre curiosité intellectuelle, votre créativité et votre attrait pour les nouvelles expériences. Un score élevé indique une personne imaginative et ouverte aux nouvelles idées, tandis qu'un score bas suggère une préférence pour la routine et le concret."
  },
  C: {
    title: "Conscience",
    description: "Mesure votre niveau d'organisation, de fiabilité et de responsabilité. Un score élevé indique une personne méthodique et disciplinée, tandis qu'un score bas suggère une approche plus flexible et spontanée."
  },
  E: {
    title: "Extraversion",
    description: "Évalue votre niveau d'énergie sociale et votre besoin d'interactions. Un score élevé indique une personne sociable et énergique, tandis qu'un score bas suggère une préférence pour la solitude et la réflexion."
  },
  A: {
    title: "Agréabilité",
    description: "Reflète votre tendance à la compassion et à la coopération. Un score élevé indique une personne altruiste et empathique, tandis qu'un score bas suggère une approche plus directe et franche."
  },
  N: {
    title: "Névrosisme",
    description: "Mesure votre stabilité émotionnelle et votre résilience face au stress. Un score bas indique une personne calme et stable émotionnellement, tandis qu'un score élevé suggère une sensibilité accrue aux émotions négatives."
  }
};

const BigFiveResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scores, duration } = location.state || { scores: {}, duration: 0 };

  // Normaliser les scores sur une échelle de 0 à 100
  const normalizedScores = {
    O: (scores.O / 10) * 100,
    C: (scores.C / 10) * 100,
    E: (scores.E / 10) * 100,
    A: (scores.A / 10) * 100,
    N: (scores.N / 10) * 100
  };

  const chartData = {
    labels: ['Ouverture', 'Conscience', 'Extraversion', 'Agréabilité', 'Névrosisme'],
    datasets: [
      {
        label: 'Vos scores',
        data: [
          normalizedScores.O,
          normalizedScores.C,
          normalizedScores.E,
          normalizedScores.A,
          normalizedScores.N
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
        <Title>Vos résultats Big Five</Title>

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

export default BigFiveResults; 