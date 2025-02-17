import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TestCard from '../../components/TestCard/TestCard';
import { TestIcons } from '../../components/icons/TestIcons';

const PageContainer = styled.div`
  min-height: calc(100vh - 70px);
  background: linear-gradient(135deg, #f5f7fa 0%, #f8f9fb 100%);
  padding: 2rem;
  margin-top: 0;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 4rem;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
`;

const TestsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const availableTests = [
  {
    id: 'ambi',
    title: 'Test de Personnalité AMBI',
    description: 'Évaluez votre personnalité selon cinq dimensions fondamentales : Extraversion, Agréabilité, Conscience, Stabilité Émotionnelle et Ouverture à l\'expérience.',
    duration: '30-40 minutes',
    questionCount: 181,
    icon: TestIcons.personality,
    accentColor: '#4caf50',
    path: '/ambi'
  },
  {
    id: 'gcbs',
    title: 'Test de Style Cognitif et Décisionnel (GCBS)',
    description: 'Évaluez vos préférences dans la prise de décision et votre style cognitif à travers quatre dimensions : Raisonnement Analytique, Logique Pratique, Mode de Fonctionnement et Validation.',
    duration: '15-20 minutes',
    questionCount: 41,
    icon: TestIcons.cognitive,
    accentColor: '#2196f3',
    path: '/gcbs'
  }
];

const Home = () => {
  const navigate = useNavigate();

  const handleStartTest = (testPath) => {
    navigate(testPath);
  };

  return (
    <PageContainer>
      <Header>
        <Title>Bibliothèque de Tests Psychométriques</Title>
        <Subtitle>
          Explorez notre collection de tests psychométriques validés scientifiquement 
          pour mieux vous comprendre et développer votre potentiel.
        </Subtitle>
      </Header>

      <TestsGrid>
        {availableTests.map(test => (
          <TestCard
            key={test.id}
            title={test.title}
            description={test.description}
            duration={test.duration}
            questionCount={test.questionCount}
            icon={test.icon}
            accentColor={test.accentColor}
            onStart={() => handleStartTest(test.path)}
          />
        ))}
      </TestsGrid>
    </PageContainer>
  );
};

export default Home;
