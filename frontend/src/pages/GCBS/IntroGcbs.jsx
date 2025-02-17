import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import userImage from '../../images/homepageImage.png';
import senseiStyle from '../../images/style-sensei.png';

const PageContainer = styled.div`
  background-color: #e3f2fd;
  min-height: calc(100vh - 70px);
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  margin-top: 0;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
  background-color: white;
  border: 1px solid #000;
  border-radius: 50px;
  width: 90%;
  margin: 30px auto;
`;

const LeftSection = styled.div`
  width: 90%;
`;

const StyledTitle = styled.h1`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 20px;

  @media (max-width: 779px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: #555;
`;

const StartButton = styled.button`
  background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const UserImage = styled.img`
  position: absolute;
  right: 50px;
  bottom: 110px;
  transform: rotate(15deg);
  max-width: 100%;
  height: 400px;
  display: none;

  @media (max-width: 779px) {
    display: none;
  }
`;

const SenseiImage = styled.img`
  position: absolute;
  right: 100px;
  top: 30px;
  width: 100px;
  height: auto;

  @media (max-width: 779px) {
    display: none;
  }
`;

const FooterBar = styled.div`
  background-color: black;
  height: 30px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  color: #2196f3;
  font-size: 1.5rem;
  margin: 20px 0 10px;
`;

const List = styled.ul`
  margin: 10px 0;
  padding-left: 20px;
`;

const ListItem = styled.li`
  margin: 5px 0;
`;

const IntroGcbs = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/gcbs/test');
  };

  return (
    <PageContainer>
      <Container>
        <LeftSection>
          <StyledTitle>Test de Style Cognitif et Décisionnel (GCBS)</StyledTitle>
          
          <Description>
            Ce test complet évalue vos préférences dans la prise de décision et votre style cognitif à travers plusieurs dimensions.
          </Description>

          <Section>
            <SectionTitle>Structure du Test</SectionTitle>
            <List>
              <ListItem>Partie I : Test principal GCBS (30 questions)</ListItem>
              <ListItem>Partie II : Enquête de personnalité TIPI (10 questions)</ListItem>
              <ListItem>Partie III : Checklist de vocabulaire (1 question avec 16 mots)</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Dimensions Évaluées</SectionTitle>
            <List>
              <ListItem>RA : Raisonnement Analytique</ListItem>
              <ListItem>LP : Logique Pratique</ListItem>
              <ListItem>MF : Mode de Fonctionnement</ListItem>
              <ListItem>V : Validation</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Durée et Instructions</SectionTitle>
            <Description>
              Durée moyenne : 15-20 minutes
              <br/><br/>
              Pour chaque question du test principal, vous devrez indiquer votre préférence entre deux options sur une échelle de 1 à 5.
              Pour l'enquête de personnalité, vous évaluerez des affirmations sur une échelle de 1 à 7.
              Pour la checklist de vocabulaire, cochez uniquement les mots dont vous êtes sûr(e) de connaître la définition.
              <br/><br/>
              Répondez de manière spontanée et honnête. Il n'y a pas de bonnes ou mauvaises réponses.
            </Description>
          </Section>

          <StartButton onClick={handleStartTest}>
            Commencer le test
          </StartButton>
        </LeftSection>
        <UserImage src={userImage} alt="Illustration" />
        <SenseiImage src={senseiStyle} alt="Illustration" />
      </Container>
      <FooterBar />
    </PageContainer>
  );
};

export default IntroGcbs; 