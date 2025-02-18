import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Divider
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

const ResultRiasec = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result } = location.state || {};

  if (!result) {
    return (
      <Container>
        <Typography variant="h6">Résultats non disponibles</Typography>
        <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
      </Container>
    );
  }

  const {
    riasecScores,
    tipiScores,
    vocabularyScore,
    dominantTypes,
    personalityTraits,
    recommendations
  } = result;

  const riasecData = [
    { subject: 'Réaliste', score: riasecScores.R },
    { subject: 'Investigatif', score: riasecScores.I },
    { subject: 'Artistique', score: riasecScores.A },
    { subject: 'Social', score: riasecScores.S },
    { subject: 'Entreprenant', score: riasecScores.E },
    { subject: 'Conventionnel', score: riasecScores.C }
  ];

  const tipiData = [
    { trait: 'Extraversion', score: tipiScores.extraversion },
    { trait: 'Agréabilité', score: tipiScores.agreeableness },
    { trait: 'Conscience', score: tipiScores.conscientiousness },
    { trait: 'Stabilité émotionnelle', score: tipiScores.emotionalStability },
    { trait: 'Ouverture', score: tipiScores.openness }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Résultats de votre test RIASEC
      </Typography>

      <Grid container spacing={4}>
        {/* Profil RIASEC */}
        <Grid item xs={12} md={6}>
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

        {/* Profil TIPI */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Votre profil de personnalité (TIPI)
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tipiData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="trait" angle={-45} textAnchor="end" height={100} />
                  <YAxis domain={[1, 7]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Types dominants */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Vos types dominants
            </Typography>
            <Typography variant="body1" paragraph>
              Votre code RIASEC : {dominantTypes.join('-')}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" paragraph>
              Cette combinaison suggère une orientation vers des professions qui combinent :
            </Typography>
            <ul>
              {recommendations.map((rec, index) => (
                <Typography component="li" key={index} sx={{ mb: 1 }}>
                  {rec}
                </Typography>
              ))}
            </ul>
          </Paper>
        </Grid>

        {/* Traits de personnalité */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Traits de personnalité marquants
            </Typography>
            <ul>
              {personalityTraits.map((trait, index) => (
                <Typography component="li" key={index} sx={{ mb: 1 }}>
                  {trait}
                </Typography>
              ))}
            </ul>
          </Paper>
        </Grid>

        {/* Score de vocabulaire */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Score de vocabulaire
            </Typography>
            <Typography variant="body1">
              Vous avez correctement identifié {vocabularyScore.correct} mots sur {vocabularyScore.total}.
            </Typography>
            {vocabularyScore.invalidWords > 0 && (
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                Attention : vous avez sélectionné {vocabularyScore.invalidWords} mot(s) qui n'existe(nt) pas.
              </Typography>
            )}
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
        <Button
          variant="outlined"
          onClick={() => window.print()}
        >
          Imprimer les résultats
        </Button>
      </Box>
    </Container>
  );
};

export default ResultRiasec; 