import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import userImage from '../../images/homepageImage.png';
import senseiStyle from '../../images/style-sensei.png';

const PageContainer = styled.div`
  background-color: #f3e5f5;
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
  position: relative;

  @media (max-width: 1024px) {
    padding: 30px;
    width: 95%;
  }

  @media (max-width: 768px) {
    padding: 25px;
    border-radius: 30px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    border-radius: 20px;
    margin: 15px auto;
  }
`;

const LeftSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const StyledTitle = styled.h1`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    font-size: 2.2rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 15px;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: #555;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 25px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 20px;
  }
`;

const StartButton = styled.button`
  background: linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: auto;
  display: inline-block;

  @media (max-width: 768px) {
    padding: 12px 25px;
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 1rem;
    width: 100%;
  }

  &:hover {
    background: linear-gradient(135deg, #7b1fa2 0%, #6a1b9a 100%);
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
  max-width: 300px;
  height: auto;

  @media (max-width: 1200px) {
    max-width: 250px;
    right: 30px;
    bottom: 90px;
  }

  @media (max-width: 1024px) {
    max-width: 200px;
    right: 20px;
    bottom: 70px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const SenseiImage = styled.img`
  position: absolute;
  right: 100px;
  top: 30px;
  width: 100px;
  height: auto;

  @media (max-width: 1024px) {
    width: 80px;
    right: 70px;
  }

  @media (max-width: 768px) {
    width: 60px;
    right: 20px;
    top: 20px;
  }

  @media (max-width: 480px) {
    width: 50px;
    right: 10px;
    top: 10px;
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

const IntroRiasec = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/riasec/test');
  };

  return (
    <PageContainer>
      <Container>
        <LeftSection>
          <StyledTitle>Test d'Intérêts Professionnels RIASEC</StyledTitle>
          <Description>
            Le test RIASEC évalue vos intérêts professionnels à travers six dimensions fondamentales :
            <br/><br/>
            • Réaliste (R) : Activités pratiques et techniques
            <br/>
            • Investigatif (I) : Recherche et analyse scientifique
            <br/>
            • Artistique (A) : Créativité et expression artistique
            <br/>
            • Social (S) : Relations humaines et aide aux autres
            <br/>
            • Entreprenant (E) : Leadership et gestion
            <br/>
            • Conventionnel (C) : Organisation et précision
            <br/><br/>
            Structure du test :
            <br/>
            • 48 questions (8 questions par dimension)
            <br/>
            • Échelle de réponse : 1 (N'aime pas) à 5 (Aime beaucoup)
            <br/><br/>
            Durée moyenne : 10-15 minutes
            <br/><br/>
            Conseils :
            <br/>
            • Répondez de manière spontanée et honnête
            <br/>
            • Il n'y a pas de bonnes ou mauvaises réponses
            <br/>
            • Basez-vous sur vos préférences réelles plutôt que sur vos compétences
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

export default IntroRiasec; 