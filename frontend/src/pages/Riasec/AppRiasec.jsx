import React, { useState } from "react";
import { BuzzFeedQuiz } from "react-buzzfeed-quiz";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { riasecQuestions } from "../../constants/index";
import "react-buzzfeed-quiz/lib/styles.css";

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
                handleAnswerSelection(answer.value, answer.personnalite_id),
        })),
    }));


    const calculateDominantPersonalities = () => {
        const sortedPersonalities = Object.entries(personnalitePoints).sort(([, a], [, b]) => b - a);

        const dominantPersonnalite = sortedPersonalities[0][0];
        const secondaryPersonnalite = sortedPersonalities[1][0];

        return { dominantPersonnalite, secondaryPersonnalite };
    };

    const submitResponse = () => {
        const { dominantPersonnalite, secondaryPersonnalite } = calculateDominantPersonalities();
        const API_URL = import.meta.env.VITE_API_URL;
        fetch(`${API_URL}/riasec/save`, {
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
                    return res.json();
                } else {
                    throw new Error("Erreur lors de l'envoi des résultats");
                }
            })
            .then((data) => {
                navigate("/riasec/results", {
                    state: {
                        resultatFinal: dominantPersonnalite,
                        resultatSecondaire: secondaryPersonnalite,
                        summary: data.summary
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
