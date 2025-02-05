import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import userImage from '../../images/homepageImage.png';
import senseiStyle from '../../images/style-sensei.png';

const PageContainer = styled.div`
  background-color: #fdf6f1;
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
  background: linear-gradient(135deg, #6B8E23 0%, #556B2F 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #556B2F 0%, #3B4B22 100%);
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

const IntroEmotionalIntelligence = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/emotional-intelligence/test');
  };

  return (
    <PageContainer>
      <Container>
        <LeftSection>
          <StyledTitle>Test d'Intelligence Émotionnelle</StyledTitle>
          <Description>
            Ce test évalue votre intelligence émotionnelle selon cinq dimensions clés :
            <br/><br/>
            • Conscience de soi (SA) : Capacité à identifier et comprendre vos propres émotions
            <br/>
            • Gestion des émotions (EM) : Capacité à gérer et réguler vos émotions
            <br/>
            • Conscience sociale (SOA) : Capacité à percevoir et comprendre les émotions des autres
            <br/>
            • Gestion des relations (RM) : Capacité à interagir efficacement avec les autres
            <br/>
            • Prise de décision (DM) : Capacité à intégrer les émotions dans la prise de décision
            <br/><br/>
            Durée moyenne : 10-15 minutes pour 10 questions. Répondez de manière spontanée et honnête.
            <br/><br/>
            À la fin du test, vous recevrez une analyse détaillée de votre profil d'intelligence émotionnelle.
          </Description>
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

export default IntroEmotionalIntelligence; 