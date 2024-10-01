import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const personnaliteDescriptions = {
    Realiste: "Besoin d'être impliqué physiquement dans ce qu'il fait.",
    Investigatif: "Habité par une soif de connaissances et de savoir.",
    Artistique: "Souhaite exprimer ses émotions ou pensées à travers des formes d'art.",
    Social: "Attiré par les activités favorisant le contact avec les autres, particulièrement dans le but de les aider.",
    Entrepreneur: "Aime avoir des responsabilités, surmonter des défis dans l'espoir de se hisser au sommet.",
    Conventionnel: "Désire respecter les normes, consignes et règles.",
};

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  background-color: #f4f4f9;
  padding: 2rem;
`;

const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1200px; /* Ajustez cette largeur en fonction de vos besoins */
  margin-top: 2rem;
`;

const Title = styled.h1`
font-size: 3rem;
color: #007bff;
margin-bottom: 1rem;
`;

const PersonalityTitle = styled.h2`
font-size: 2.5rem;
color: #333;
`;

const PersonalityDescription = styled.p `
font-size: 1.2rem;
color: #666;
margin-top: 1rem;
`;


const Card = styled.div`
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 2rem;
  width: 45%; /* Pour ajuster la taille des cartes, la largeur prend environ la moitié */
  text-align: center;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;


const ResultsRiasec = () => {
    const location = useLocation();
    const { resultatFinal, resultatSecondaire, summary } = location.state || {};

    if (!resultatFinal || !resultatSecondaire) {
        return <div>Aucun résultat trouvé. Veuillez faire le test.</div>;
    }

    return (
        <ResultsContainer>
            <Title>Résultats</Title>
            Summary : {summary}
            <CardsWrapper>
                <Card>
                    <PersonalityTitle>Personnalité Principale : {resultatFinal}</PersonalityTitle>
                    <PersonalityDescription>
                        {personnaliteDescriptions[resultatFinal]}
                    </PersonalityDescription>
                </Card>

                <Card>
                    <PersonalityTitle>Personnalité Secondaire : {resultatSecondaire}</PersonalityTitle>
                    <PersonalityDescription>
                        {personnaliteDescriptions[resultatSecondaire]}
                    </PersonalityDescription>
                </Card>
            </CardsWrapper>
        </ResultsContainer>
    );

};


export default ResultsRiasec;
