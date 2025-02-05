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
  color: #e74c3c;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #e74c3c;
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
    width: ${props => props.value}%;
    background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
    border-radius: 10px;
    transition: width 1s ease-out;
  }
`;

const ScoreLabel = styled.span`
  font-weight: bold;
  color: #e74c3c;
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
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
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
  D: {
    title: "Dominance",
    description: "Votre façon de gérer les problèmes et les défis. Un score élevé indique une personne directe, décisive et orientée vers l'action."
  },
  I: {
    title: "Influence",
    description: "Votre façon d'interagir avec les autres. Un score élevé indique une personne sociable, communicative et enthousiaste."
  },
  S: {
    title: "Stabilité",
    description: "Votre rythme et votre cohérence. Un score élevé indique une personne patiente, loyale et excellente en écoute active."
  },
  C: {
    title: "Conformité",
    description: "Votre réaction aux règles et procédures. Un score élevé indique une personne précise, analytique et soucieuse des détails."
  }
};

const DiscResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, testDuration } = location.state || {};

  if (!results) {
    navigate('/');
    return null;
  }

  const { scores, descriptions } = results;

  const chartData = {
    labels: ['Dominance', 'Influence', 'Stabilité', 'Conformité'],
    datasets: [
      {
        label: 'Votre profil DISC',
        data: [scores.D, scores.I, scores.S, scores.C],
        backgroundColor: 'rgba(231, 76, 60, 0.2)',
        borderColor: '#e74c3c',
        borderWidth: 2,
        pointBackgroundColor: '#e74c3c',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#e74c3c'
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <GlobalStyle />
      <ResultsContainer>
        <SenseiImage src={senseiStyle} alt="Sensei" />
        <Title>Vos résultats DISC</Title>

        <ChartContainer>
          <Radar data={chartData} options={chartOptions} />
        </ChartContainer>

        <ResultsSection>
          <DimensionDescription>
            {descriptions.general}
          </DimensionDescription>

          {Object.entries(dimensionDescriptions).map(([key, { title, description }]) => (
            <div key={key}>
              <DimensionTitle>{title}</DimensionTitle>
              <ScoreIndicator>
                <ScoreLabel>{scores[key]}%</ScoreLabel>
                <ScoreBar value={scores[key]} />
              </ScoreIndicator>
              <DimensionDescription>{description}</DimensionDescription>
            </div>
          ))}

          <DimensionTitle>Style Principal</DimensionTitle>
          <DimensionDescription>{descriptions.primary}</DimensionDescription>

          <DimensionTitle>Style Secondaire</DimensionTitle>
          <DimensionDescription>{descriptions.secondary}</DimensionDescription>

          <DimensionTitle>Conseils de Développement</DimensionTitle>
          <DimensionDescription>{descriptions.advice}</DimensionDescription>
        </ResultsSection>

        <ReturnButton onClick={() => navigate('/')}>
          Retourner à l'accueil
        </ReturnButton>
      </ResultsContainer>
    </>
  );
};

export default DiscResults; 