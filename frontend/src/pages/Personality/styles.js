import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { Button, Box } from '@mui/material';

/**
 * Styles globaux pour le test de personnalité
 * @component
 */
export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #fdf6f1;
    font-family: "Nunito", sans-serif;
    margin: 0;
    padding: 0;
  }
`;

/**
 * Conteneur principal du quiz
 * @component
 */
export const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  margin: 100px auto auto;
  border-radius: 12px;
`;

/**
 * Composant pour le texte de la question
 * @component
 */
export const QuestionText = styled.div`
  font-size: 22px !important;
  font-family: "Kanit", sans-serif !important;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
  position: relative;
`;

/**
 * Image du Sensei avec positionnement absolu
 * @component
 */
export const SenseiImage = styled.img`
  position: absolute;
  right: -100px;
  bottom: -50px;
  width: 100px;
  height: auto;

  @media (max-width: 750px) {
    display: none;
  }
`;

/**
 * Conteneur pour les réponses
 * @component
 */
export const AnswersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 50px;
`;

/**
 * Bouton de base stylisé
 * @component
 */
export const StyledButton = styled(Button)`
  width: 100%;
  padding: 0.8rem;
  font-size: 15px !important;
  font-family: "Nunito", sans-serif !important;
  text-transform: none !important;
  border-radius: 12px !important;
  background-color: #ffffff !important;
  border: 1px solid #000 !important;
  color: #000 !important;

  &:hover {
    background-color: #919191 !important;
    color: #000 !important;
  }
`;

/**
 * Bouton sélectionné
 * @component
 */
export const SelectedButton = styled(StyledButton)`
  background-color: #919191 !important;
  color: #000 !important;
`;

/**
 * Conteneur de la barre de progression
 * @component
 */
export const ProgressContainer = styled(Box)`
  width: 100%;
  margin-bottom: 1.5rem;
`;

/**
 * Animation de rebond pour le loader
 */
export const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

/**
 * Animation de l'ombre pour le loader
 */
export const shadowBounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) scale(1);
    opacity: 0.5;
  }
  40% {
    transform: translateX(-50%) scale(1.3);
    opacity: 0.3;
  }
  60% {
    transform: translateX(-50%) scale(1.1);
    opacity: 0.4;
  }
`;

/**
 * Composant de chargement avec animation
 * @component
 */
export const BouncingLoader = styled.div`
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;

  img {
    width: 100%;
    height: 100%;
    animation: ${bounce} 2s infinite;
    position: relative;
    z-index: 2;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    width: 60%;
    height: 15px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    transform: translateX(-50%);
    animation: ${shadowBounce} 2s infinite;
    z-index: 1;
  }
`; 