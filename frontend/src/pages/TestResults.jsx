import React from "react";
import { useLocation } from "react-router-dom";

const ResultsPage = () => {
    const location = useLocation();
    const { userAnswers } = location.state || {};

    return (
        <div>
            <h1>Résultats du quiz</h1>
            {userAnswers ? (
                <div>
                    {userAnswers.map((answer, index) => (
                        <div key={index}>
                            <h3>Question: {answer.question}</h3>
                            <p>Votre réponse: {answer.userAnswer}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Aucune réponse trouvée.</p>
            )}
        </div>
    );
};

export default ResultsPage;
