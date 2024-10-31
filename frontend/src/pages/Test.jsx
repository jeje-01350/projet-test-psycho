import React, { useState } from "react";
import Quiz from "react-quiz-component";
import { useNavigate } from "react-router-dom";

const quizData = {
    quizTitle: "Quiz bidon",
    quizSynopsis: "Ceci est un quiz d'exemple.",
    questions: [
        {
            question: "Quelle est la couleur du ciel par temps clair ?",
            questionType: "text",
            answers: ["Rouge", "Vert", "Bleu", "Jaune"],
            correctAnswer: "3",
            point: "10",
            answerSelectionType: "single",
        },
        {
            question: "Combien de pattes ont les araignées ?",
            questionType: "text",
            answers: ["6", "8", "4", "10"],
            correctAnswer: "2",
            point: "10",
            answerSelectionType: "single",
        },
        {
            question: "Quelle est la capitale de la France ?",
            questionType: "text",
            answers: ["Madrid", "Berlin", "Paris", "Rome"],
            correctAnswer: "3", // Ignorer
            point: "10",
            answerSelectionType: "single",
        },
    ],
};

const customTexts = {
    startQuizBtn: "Commencer le quiz",
    resultPageHeaderText: "Vous avez terminé le quiz.",
    resultPagePoint: "Merci d'avoir participé.",
    question: "Question {questionNumber}/{totalQuestions}",
    nextQuestionBtn: "Suivant",
};

const QuizPage = () => {
    const [userAnswers, setUserAnswers] = useState([]);
    const navigate = useNavigate();

    const handleAnswerSelection = (questionIndex, selectedAnswerIndex) => {
        const selectedAnswer = quizData.questions[questionIndex]?.answers[selectedAnswerIndex - 1];

        if (selectedAnswer) {
            setUserAnswers((prevAnswers) => {
                const updatedAnswers = [...prevAnswers];
                updatedAnswers[questionIndex] = {
                    question: quizData.questions[questionIndex].question,
                    userAnswer: selectedAnswer,
                };
                console.log("Updated Answers:", updatedAnswers);
                return updatedAnswers;
            });
        } else {
            console.error("Selected answer is undefined for question:", questionIndex);
        }
    };

    const handleQuizCompletion = () => {
        console.log("Final user answers:", userAnswers);
        navigate("/test/results", { state: { userAnswers } });
    };

    const onQuestionSubmit = (obj) => {
        console.log("onQuestionSubmit obj:", obj);
        const questionIndex = quizData.questions.findIndex(
            (q) => q.question === obj.question.question
        );
        if (questionIndex !== -1) {
            handleAnswerSelection(questionIndex, obj.userAnswer);
        } else {
            console.error("Question not found in quizData:", obj.question);
        }
    };

    const containerStyle = {
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        maxWidth: "600px",
        width: "100%",
        margin: "20px auto",
        textAlign: "center",
    };

    const titleStyle = {
        textAlign: "center",
        color: "#333",
        fontSize: "2.5em",
        marginBottom: "20px",
    };

    const pageStyle = {
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#f4f4f4",
        margin: "0",
        padding: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    };

    return (
        <div style={pageStyle}>
            <div style={containerStyle}>
                <h1 style={titleStyle}>Bienvenue au quiz bidon !</h1>
                <Quiz
                    quiz={quizData}
                    shuffle={false}
                    customTexts={customTexts}
                    onQuestionSubmit={onQuestionSubmit}
                    onComplete={handleQuizCompletion}
                />
            </div>
        </div>
    );
};

export default QuizPage;
