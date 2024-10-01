import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "@mui/material/";
import { QuestionCardBigfive } from "../../components/index";
import { bigfiveQuestions } from "../../constants/index.js";

const Bigfive = () => {
    const navigate = useNavigate();
    const [responses, setResponses] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    // Mapping des domaines aux traits de personnalité traduits en français
    const domainToTraitMap = {
        N: "Névrosisme",
        E: "Extraversion",
        O: "Ouverture d'esprit",
        A: "Agréabilité",
        C: "Conscience",
    };

    const submitResponse = async () => {
        const scores = calculateScores();
        const API_URL = import.meta.env.VITE_API_URL;
        try {
            const res = await fetch(`${API_URL}/bigfive/save`, {
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
                    navigate("/bigfive/results", {
                        state: { summary: data.summary, scores },
                    });
                }
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de l'envoi des réponses:", error);
        }
    };

    const handleFormChange = (data) => {
        console.log("Données reçues de QuestionCard:", data);  // Vérifier les données reçues

        if (!data.domain || data.score === undefined) {
            console.error("Données de formulaire invalides: domaine ou score manquant", data);
            return;
        }

        let newArray = responses.filter((response) => response.no !== data.no);
        setResponses([...newArray, data]);

        if (currentQuestion < bigfiveQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            submitResponse();  // Lorsque toutes les questions sont répondues
        }
    };

    const calculateScores = () => {
        const scores = {
            "Agréabilité": 0,
            "Conscience": 0,
            "Extraversion": 0,
            "Névrosisme": 0,
            "Ouverture d'esprit": 0,
        };

        const totalQuestionsPerDomain = {
            "Agréabilité": 0,
            "Conscience": 0,
            "Extraversion": 0,
            "Névrosisme": 0,
            "Ouverture d'esprit": 0,
        };

        // Ajouter les scores pour chaque domaine en français
        responses.forEach(({ domain, score }) => {
            const trait = domainToTraitMap[domain]; // Correspondance entre le domaine et le trait traduit
            if (trait) {
                scores[trait] += score;
                totalQuestionsPerDomain[trait] += 1; // Compter combien de questions sont liées à chaque trait
            }
        });

        // Normaliser les scores en pourcentage (sur la base de 5 points maximum par question)
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
                    key={bigfiveQuestions[currentQuestion].id}
                    question={bigfiveQuestions[currentQuestion].text}
                    no={bigfiveQuestions[currentQuestion].id}
                    domain={bigfiveQuestions[currentQuestion].domain}  // Passer le domaine
                    onRadioClick={handleFormChange}
                />
                {currentQuestion === bigfiveQuestions.length - 1 && (
                    <Button variant="contained" onClick={submitResponse}>
                        Soumettre
                    </Button>
                )}
            </Container>
        </div>
    );
};

export default Bigfive;
