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
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';
import { Radar, Bar } from 'react-chartjs-2';
import { gcbsDescriptions } from '../../constants/GCBS/data';
import senseiStyle from '../../images/style-sensei.png';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    font-family: "Nunito", sans-serif;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }
`;

const ResultsContainer = styled.div`
  max-width: 1200px;
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

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const ChartTitle = styled.h3`
  color: #2196f3;
  text-align: center;
  margin-bottom: 1rem;
`;

const ResultsSection = styled.div`
  margin-top: 3rem;
`;

const DimensionTitle = styled.h3`
  color: #2196f3;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #2196f3;
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
    background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
    border-radius: 10px;
    transition: width 1s ease-out;
  }
`;

const ScoreLabel = styled.span`
  font-weight: bold;
  color: #2196f3;
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
  background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
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

const TestInfo = styled.div`
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: ${props => props.$icon};
    font-size: 1.2rem;
  }
`;

const PersonalitySection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #e0e0e0;
`;

const PersonalityTitle = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const GcbsResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { gcbsScores, tipiScores, testDuration } = location.state || {};

  if (!gcbsScores || !tipiScores) {
    navigate('/gcbs');
    return null;
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const gcbsChartData = {
    labels: [
      'Raisonnement Analytique',
      'Logique Pratique',
      'Mode de Fonctionnement',
      'Validation'
    ],
    datasets: [
      {
        label: 'Style Cognitif',
        data: [
          gcbsScores.RA,
          gcbsScores.LP,
          gcbsScores.MF,
          gcbsScores.V
        ],
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        borderColor: '#2196f3',
        borderWidth: 2,
        pointBackgroundColor: '#2196f3',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#2196f3'
      }
    ]
  };

  const tipiChartData = {
    labels: ['Extraversion', 'Agréabilité', 'Conscience', 'Stabilité', 'Ouverture'],
    datasets: [
      {
        label: 'Traits de Personnalité',
        data: [
          tipiScores.E,
          tipiScores.A,
          tipiScores.C,
          tipiScores.S,
          tipiScores.O
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(54, 162, 235, 0.5)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 206, 86)',
          'rgb(153, 102, 255)',
          'rgb(54, 162, 235)'
        ],
        borderWidth: 1
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

  const barChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100
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
        <Title>Résultats du Test GCBS</Title>
        
        <TestInfo>
          <InfoItem $icon="'⏱️'">
            Durée du test : {formatTime(testDuration)}
          </InfoItem>
        </TestInfo>

        <ChartsContainer>
          <ChartContainer>
            <ChartTitle>Style Cognitif et Décisionnel</ChartTitle>
            <Radar data={gcbsChartData} options={chartOptions} />
          </ChartContainer>

          <ChartContainer>
            <ChartTitle>Profil de Personnalité TIPI</ChartTitle>
            <Bar data={tipiChartData} options={barChartOptions} />
          </ChartContainer>
        </ChartsContainer>

        <ResultsSection>
          {Object.entries(gcbsDescriptions).map(([key, { title, high, low }]) => (
            <div key={key}>
              <DimensionTitle>{title}</DimensionTitle>
              <ScoreIndicator>
                <ScoreLabel>{gcbsScores[key]}%</ScoreLabel>
                <ScoreBar $score={gcbsScores[key]} />
              </ScoreIndicator>
              <DimensionDescription>
                {gcbsScores[key] >= 50 ? high : low}
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

export default GcbsResults; 