import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "@mui/material/";
import { QuestionCard } from "../../components/index";
import { questions } from "../../constants/index";

const Home = () => {
    const navigate = useNavigate();

    const [responses, setResponses] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const submitResponse = async () => {
        const API_URL = import.meta.env.VITE_API_URL;
        try {
            const res = await fetch(`${API_URL}/answer/submit-response`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    answerArray: responses,
                }),
            });

            if (res.status !== 200) {
                console.log("Error in sending responses");
            } else {
                const data = await res.json();
                console.log("Data was sent to Backend");

                if (data.summary) {
                    console.log("Summary received from backend:", data.summary);
                    navigate("/career-prediction/results", {
                        state: { summary: data.summary },
                    });
                } else {
                    console.log("Summary not available in the response");
                }
            }
        } catch (error) {
            console.error("An error occurred while submitting the response:", error);
        }
    };

    const handleFormChange = (data) => {
        let newArray = responses.filter((response) => response.no !== data.no);
        setResponses([...newArray, data]);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            submitResponse();
        }
    };

    return (
        <div>
            <Container
                component="form"
                sx={{
                    minWidth: "100%",
                    mx: "0rem",
                    textAlign: "center",
                }}
            >
                <QuestionCard
                    key={questions[currentQuestion].no}
                    question={questions[currentQuestion].text}
                    no={questions[currentQuestion].no}
                    onRadioClick={handleFormChange}
                />

                {currentQuestion === questions.length - 1 && (
                    <Button
                        sx={{
                            width: "9rem",
                            fontSize: "1.2rem",
                            p: "0.8rem",
                            mb: "2rem",
                            letterSpacing: "0.2rem",
                        }}
                        variant="contained"
                        onClick={submitResponse}
                    >
                        Submit
                    </Button>
                )}
            </Container>
        </div>
    );
};

export default Home;
