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
    id: 'personality',
    title: 'Test de Personnalité MBTI',
    description: 'Découvrez votre type de personnalité selon le modèle Myers-Briggs (MBTI) et obtenez des insights précieux sur vos préférences naturelles.',
    duration: '10-15 minutes',
    questionCount: 16,
    icon: TestIcons.personality,
    accentColor: '#4298B4',
    path: '/personality'
  },
  // Préparé pour d'autres tests
  /*
  {
    id: 'emotional-intelligence',
    title: 'Intelligence Émotionnelle',
    description: 'Évaluez votre capacité à comprendre et gérer vos émotions ainsi que celles des autres.',
    duration: '20 minutes',
    questionCount: 20,
    icon: TestIcons.emotional,
    accentColor: '#33A474',
    path: '/emotional-intelligence/intro'
  },
  */
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
