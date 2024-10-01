import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

// Enregistrer manuellement les composants nécessaires pour le graphique Radar
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const ResultsContainer = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #f7f7f7;
  min-height: 100vh;
`;

const LeftContainer = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const RightContainer = styled.div`
  flex: 1;
  padding: 2rem;
`;

const SummaryText = styled.p`
  font-size: 1rem;
  line-height: 1.3;
  color: #4A4A4A;
  text-align: justify;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #2980b9;
  margin-bottom: 3rem;
`;

const ScoresContainer = styled.div`
  margin-bottom: 2rem;
  max-width: 300px;
`;

const GraphWrapper = styled.div`
  max-width: 400px;
`;

const MindFlareResults = () => {
    const location = useLocation();
    const { summary, scores } = location.state || {};

    if (!summary || !scores) {
        return <p>Aucun résultat trouvé.</p>;
    }

    const data = {
        labels: Object.keys(scores),
        datasets: [
            {
                label: "Scores",
                data: Object.values(scores),
                backgroundColor: "rgba(46, 204, 113, 0.2)",
                borderColor: "#16a085",
                borderWidth: 2,
            },
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: {
                    display: true,
                },
                suggestedMin: 0,
                suggestedMax: 10,
            },
        },
    };

    return (
        <ResultsContainer>
            {/* Left side: Scores and graph */}
            <LeftContainer>
                <Title>Résumé du Test de Personnalité MindFlare</Title>
                <SummaryText>{summary}</SummaryText>
            </LeftContainer>

            {/* Right side: Summary */}
            <RightContainer>
                <SectionTitle>Vos scores :</SectionTitle>
                <ScoresContainer>
                    {Object.entries(scores).map(([category, score]) => (
                        <p key={category}>
                            <strong>{category}:</strong> {score}
                        </p>
                    ))}
                </ScoresContainer>

                <GraphWrapper>
                    <Radar data={data} options={options} />
                </GraphWrapper>
            </RightContainer>
        </ResultsContainer>
    );
};
export default MindFlareResults;
