import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "@mui/material/";
import { QuestionCardBigfive } from "../../components/index"; // Réutilisation du composant pour la question
import { DjangoQuestions } from "../../constants/index.js"; // DjangoQuestions doit être importé

const AppDjangoPersonalityTest = () => {
    const navigate = useNavigate();
    const [responses, setResponses] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const submitResponse = async () => {
        const scores = calculateScores(); // Calcul des scores basé sur les réponses

        try {
            const res = await fetch("http://localhost:5000/django-test/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    scores,
                }),
            });

            if (res.status !== 201) {
                console.log("Erreur lors de l'envoi des réponses");
            } else {
                const data = await res.json();
                if (data.summary) {
                    navigate("/django-test/results", {
                        state: { summary: data.summary, scores },
                    });
                }
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de l'envoi des réponses:", error);
        }
    };

    const handleFormChange = (data) => {
        console.log("Données reçues de QuestionCard:", data);

        if (!data.domain || data.score === undefined) {
            console.error("Données de formulaire invalides: domaine ou score manquant", data);
            return;
        }

        let newArray = responses.filter((response) => response.no !== data.no);
        setResponses([...newArray, data]);

        if (currentQuestion < DjangoQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            submitResponse();  // Lorsque toutes les questions sont répondues
        }
    };

    const calculateScores = () => {
        const scores = {
            "Confiance": 0,
            "Acception": 0,
            "Responsabilité": 0,
            "Aventure": 0,
            "Altruisme": 0,
        };

        const totalQuestionsPerDomain = {
            "Confiance": 0,
            "Acception": 0,
            "Responsabilité": 0,
            "Aventure": 0,
            "Altruisme": 0,
        };

        responses.forEach(({ domain, score }) => {
            // Associer chaque domaine à une catégorie
            let trait;
            if (domain.startsWith("H")) {
                trait = "Confiance";
            } else if (domain.startsWith("A")) {
                trait = "Altruisme";
            } else if (domain.startsWith("Q")) {
                trait = "Responsabilité";
            } else if (domain.startsWith("T")) {
                trait = "Aventure";
            } else {
                trait = "Acception";
            }

            if (trait) {
                scores[trait] += score;
                totalQuestionsPerDomain[trait] += 1;
            }
        });

        Object.keys(scores).forEach(key => {
            if (totalQuestionsPerDomain[key] > 0) {
                scores[key] = Math.round((scores[key] / (totalQuestionsPerDomain[key] * 5)) * 100);
            }
        });

        return scores;
    };

    return (
        <div>
            <Container component="form" sx={{ minWidth: "100%", textAlign: "center" }}>
                <QuestionCardBigfive
                    key={DjangoQuestions[currentQuestion].code}
                    question={DjangoQuestions[currentQuestion].question}
                    no={DjangoQuestions[currentQuestion].code}
                    domain={DjangoQuestions[currentQuestion].code}  // Passer le code comme domaine
                    onRadioClick={handleFormChange}
                />
                {currentQuestion === DjangoQuestions.length - 1 && (
                    <Button variant="contained" onClick={submitResponse}>
                        Soumettre
                    </Button>
                )}
            </Container>
        </div>
    );
};

export default AppDjangoPersonalityTest;
