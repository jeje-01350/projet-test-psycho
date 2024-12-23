import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Container, Box, Paper, Divider, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Jauge from '../../images/jauge.png';
import GaugeChart from 'react-gauge-chart';

const GlobalStyle = styled('div')({
    backgroundColor: '#fdf6f1',
    minHeight: '100vh',
    width: '100%',
});

const StyledContainer = styled(Container)(({ theme }) => ({
    minHeight: '100vh',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
}));

const Title = styled(Typography)(({ theme }) => ({
    fontFamily: 'Kanit, sans-serif',
    fontWeight: 700,
    fontSize: '2rem',
    textAlign: 'center',
    color: '#000',
    marginBottom: theme.spacing(1),
}));

const Subtitle = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(6),
}));

const StyledCard = styled(Card)(({ theme }) => ({
    boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.2)',
    borderRadius: '16px',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-4px)',
    },
}));

const LeftCard = styled(StyledCard)(({ theme }) => ({
    backgroundColor: '#ffe5ae',
}));

const RightCard = styled(StyledCard)(({ theme }) => ({
    backgroundColor: '#ffcfb8',
}));

const InfoPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: '16px',
    backgroundColor: '#fff',
    border: '1px solid #000',
    marginTop: theme.spacing(4),
    textAlign: 'center',
}));

const ResultsPersonalityTest = () => {
    const location = useLocation();
    const { data } = location.state || {};

    return (
        <GlobalStyle>
            <StyledContainer maxWidth="lg">
                <Box>
                    <Title variant="h2">
                        Vos Résultats de Personnalité
                    </Title>
                    <Subtitle variant="h6">
                        Découvrez ce qui vous caractérise et comment cela peut vous guider.
                    </Subtitle>
                </Box>

                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <LeftCard>
                            <CardContent>
                                <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 600 }}>
                                    Couleur: {data?.results?.colors || 'N/A'}
                                </Typography>
                            </CardContent>
                        </LeftCard>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <RightCard>
                            <CardContent>
                                <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 600 }}>
                                    Lettre: {data?.results?.letters || 'N/A'}
                                </Typography>
                            </CardContent>
                        </RightCard>
                    </Grid>
                </Grid>

                <InfoPaper elevation={3}>
                    <Typography variant="h5" align="center" sx={{ fontWeight: 700, mb: 2 }}>
                        Votre Résumé Personnalisé
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    <Typography variant="p" style={{ marginBottom: '16px' }}>
                        Ce premier aperçu n’est qu’une étape. Lors de votre rendez-vous avec notre consultant,
                        vous bénéficierez d’un éclairage professionnel sur vos résultats.
                        Ensemble, nous explorerons comment aligner vos forces sur vos objectifs,
                        dessiner un plan d’action personnalisé, et transformer vos atouts en véritables
                        leviers pour atteindre vos ambitions.
                    </Typography>

                    <div style={{ width: '100%', height: '200px', backgroundColor: '#e0e0e0', marginBottom: '16px', marginTop: "30px"}}>
                        Vidéo à venir
                    </div>

                    <img src={Jauge} alt="Jauge" style={{ width: '100px', margin: '16px auto 0' }} />

                    <Typography variant="h6">
                        Votre profil correspond à {data.randomNumber}% de la population
                    </Typography>
                </InfoPaper>
            </StyledContainer>
        </GlobalStyle>
    );
};

export default ResultsPersonalityTest;
