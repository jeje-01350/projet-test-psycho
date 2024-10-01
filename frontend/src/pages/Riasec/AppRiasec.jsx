import React, { useState } from "react";
import { BuzzFeedQuiz } from "react-buzzfeed-quiz";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { riasecQuestions } from "../../constants/index"; // Assurez-vous que vos questions RIASEC sont correctement importées
import "react-buzzfeed-quiz/lib/styles.css";

// Styled components for the layout
const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const SubmitButton = styled.button`
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;
`;

const AppRiasecTest = () => {
    const [personnalitePoints, setPersonnalitePoints] = useState({
        Realiste: 0,
        Investigatif: 0,
        Artistique: 0,
        Social: 0,
        Entrepreneur: 0,
        Conventionnel: 0,
    });

    const navigate = useNavigate();

    // Fonction pour gérer la sélection des réponses
    const handleAnswerSelection = (value, personnalite_id) => {
        const personnaliteMap = {
            1: "Realiste",
            2: "Investigatif",
            3: "Artistique",
            4: "Social",
            5: "Entrepreneur",
            6: "Conventionnel",
        };

        const personnaliteName = personnaliteMap[personnalite_id];

        // Mise à jour des points pour la personnalité sélectionnée
        setPersonnalitePoints((prevPoints) => ({
            ...prevPoints,
            [personnaliteName]: prevPoints[personnaliteName] + parseInt(value),
        }));
    };

    const quizQuestions = riasecQuestions.map((question, index) => ({
        question: question.intitule,
        answers: [
            {
                answer: "Pas d'accord",
                value: -1,
                personnalite_id: question.personnalite_id,
            },
            {
                answer: "Neutre",
                value: 0,
                personnalite_id: question.personnalite_id,
            },
            {
                answer: "Tout à fait d'accord",
                value: 1,
                personnalite_id: question.personnalite_id,
            },
        ].map((answer, answerIndex) => ({
            answer: answer.answer,
            onAnswerSelection: () =>
                handleAnswerSelection(answer.value, answer.personnalite_id), // Passe la valeur pour le calcul des points
        })),
    }));

    // Calcul de la personnalité dominante
    const calculateDominantPersonalities = () => {
        // Convert the object into an array of [key, value] pairs, sort it by value, and get the two highest ones
        const sortedPersonalities = Object.entries(personnalitePoints).sort(([, a], [, b]) => b - a);

        const dominantPersonnalite = sortedPersonalities[0][0]; // Principale
        const secondaryPersonnalite = sortedPersonalities[1][0]; // Secondaire

        return { dominantPersonnalite, secondaryPersonnalite };
    };

    const submitResponse = () => {
        const { dominantPersonnalite, secondaryPersonnalite } = calculateDominantPersonalities();

        // Envoi des données au backend
        fetch("http://localhost:5000/riasec/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                resultatPrincipal: dominantPersonnalite,
                resultatSecondaire: secondaryPersonnalite,
            }),
        })
            .then((res) => {
                if (res.status === 201) {
                    return res.json();  // Récupérer les données JSON de la réponse
                } else {
                    throw new Error("Erreur lors de l'envoi des résultats");
                }
            })
            .then((data) => {
                navigate("/riasec/results", {
                    state: {
                        resultatFinal: dominantPersonnalite,
                        resultatSecondaire: secondaryPersonnalite,
                        summary: data.summary  // Utiliser le summary renvoyé par le backend
                    },
                });
            })
            .catch((error) => console.error("Error submitting data:", error));
    };



    return (
        <QuizContainer>
            <BuzzFeedQuiz
                title={"Test de personnalité RIASEC"}
                byline={false}
                description={"Répondez aux questions pour découvrir votre profil RIASEC."}
                autoScroll={true}
                questions={quizQuestions}
                results={[
                    {
                        title: "Result 1",
                        description: "Description for result 1",
                        resultID: 0,
                    },
                    {
                        title: "Result 2",
                        description: "Description for result 2",
                        resultID: 1,
                    },
                    {
                        title: "Result 3",
                        description: "Description for result 3",
                        resultID: 2,
                    },
                ]}
                copyShareButton
                facebookShareButton
                twitterShareButton
            />

            <SubmitButton onClick={submitResponse}>
                Valider
            </SubmitButton>
        </QuizContainer>
    );
};

export default AppRiasecTest;
