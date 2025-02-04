import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { usePersonalityTest } from '../../hooks/usePersonalityTest';
import userImage from '../../images/homepageImage.png';
import senseiStyle from '../../images/style-sensei.png';

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

const StyledTitle = styled.h1`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 20px;

  @media (max-width: 779px) {
    font-size: 2rem;
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

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: #555;
`;

const ErrorText = styled.p`
  width: 85%;
  color: red;
  font-weight: bold;
  margin-bottom: 30px;
  font-size: 1.2rem;
`;

const StartButton = styled.button`
  background-color: #fabc1c;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:hover {
    background-color: ${props => !props.disabled && '#e6a71a'};
  }

  &:active {
    transform: ${props => !props.disabled && 'scale(0.95)'};
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

const IntroPersonalityTest = () => {
  const { errorMessage, isButtonDisabled, startTest } = usePersonalityTest();

  return (
    <PageContainer>
      <Container>
        <LeftSection>
          <StyledTitle>Test de personnalité</StyledTitle>
          <Description>
            Ce test a pour vocation de faire le point sur les éléments clés de votre personnalité, nous permettant d'adapter au plus près nos accompagnements.
            <br/><br/>
            Ce test utilise le principe de base du MBTI (Myers Briggs Type Indicator) qui fonctionne sur la base des 16 personnalités.
            <br/><br/>
            Consignes et durée de passation : Réaliser le test seul, au calme. Il n'y a pas de bonnes ou de mauvaises réponses. Répondre aux questions de la manière la plus spontanée possible. Durée moyenne : 10 minutes pour 16 questions.
            <br/><br/>
            Résultats : À la fin du test, une typologie de Briggs vous sera attribuée sous la forme de Lettre + Couleur.
          </Description>
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
          <StartButton 
            disabled={isButtonDisabled}
            onClick={startTest}
          >
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

export default IntroPersonalityTest; 