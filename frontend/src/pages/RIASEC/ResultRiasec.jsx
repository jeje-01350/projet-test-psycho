import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Divider,
  LinearProgress
} from '@mui/material';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const TestInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(156, 39, 176, 0.1);
  border-radius: 8px;
  color: #9c27b0;
  font-weight: 500;

  &::before {
    content: ${props => props.$icon};
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;

const ResultRiasec = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, duration } = location.state || {};

  if (!result) {
    return (
      <Container>
        <Typography variant="h6">Résultats non disponibles</Typography>
        <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
      </Container>
    );
  }

  const { scores, userAnswers } = result;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const riasecData = [
    { subject: 'Réaliste', score: scores.R },
    { subject: 'Investigatif', score: scores.I },
    { subject: 'Artistique', score: scores.A },
    { subject: 'Social', score: scores.S },
    { subject: 'Entreprenant', score: scores.E },
    { subject: 'Conventionnel', score: scores.C }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Résultats de votre test RIASEC
      </Typography>

      <TestInfo>
        <InfoItem $icon="'⏱️'">
          Durée du test : {formatTime(duration)}
        </InfoItem>
      </TestInfo>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Votre profil RIASEC
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={riasecData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 40]} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Scores détaillés
            </Typography>
            {Object.entries(scores).map(([dimension, score]) => (
              <Box key={dimension} sx={{ mb: 2 }}>
                <Typography variant="subtitle1">
                  {getDimensionName(dimension)}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(score / 40) * 100}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#e1bee7',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#9c27b0',
                      borderRadius: 5,
                    },
                  }}
                />
                <Typography variant="body2" color="textSecondary">
                  Score : {score}/40
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mr: 2 }}
        >
          Retour à l'accueil
        </Button>
      </Box>
    </Container>
  );
};

const getDimensionName = (dimension) => {
  const dimensions = {
    R: 'Réaliste',
    I: 'Investigatif',
    A: 'Artistique',
    S: 'Social',
    E: 'Entreprenant',
    C: 'Conventionnel'
  };
  return dimensions[dimension] || dimension;
};

export default ResultRiasec; 