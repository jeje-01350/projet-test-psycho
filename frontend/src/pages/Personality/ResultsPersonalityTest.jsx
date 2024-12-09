import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Container, Box, Paper, Divider, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const StyledContainer = styled(Container)(({ theme }) => ({
    minHeight: '100vh',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
}));

const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: '2rem',
    textAlign: 'center',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
}));

const Subtitle = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(6),
}));

const StyledCard = styled(Card)(({ theme }) => ({
    boxShadow: theme.shadows[4],
    borderRadius: '16px',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[6],
    },
}));

const InfoPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: '16px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    marginTop: theme.spacing(8),
}));

const ResultsPersonalityTest = () => {
    const location = useLocation();
    const { data } = location.state || {};

    return (
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
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 600 }}>
                                Colors: {data?.results?.colors || 'N/A'}
                            </Typography>
                        </CardContent>
                    </StyledCard>
                </Grid>

                <Grid item xs={12} md={4}>
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 600 }}>
                                Briggs: {data?.results?.briggs || 'N/A'}
                            </Typography>
                        </CardContent>
                    </StyledCard>
                </Grid>

                <Grid item xs={12} md={4}>
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 600 }}>
                                Letters: {data?.results?.letters || 'N/A'}
                            </Typography>
                        </CardContent>
                    </StyledCard>
                </Grid>
            </Grid>

            <InfoPaper elevation={3}>
                <Typography variant="h5" align="center" sx={{ fontWeight: 700, mb: 2 }}>
                    Votre Résumé Personnalisé
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Typography variant="body1" align="center" sx={{ mb: 4, lineHeight: 1.6 }}>
                    {data?.summary || 'Aucun résumé disponible.'}
                </Typography>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                    <MailOutlineIcon color="primary" />
                    <Typography variant="body2" align="center" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                        Plus d’informations vous seront envoyées par e-mail. Surveillez votre boîte de réception !
                    </Typography>
                </Stack>
            </InfoPaper>
        </StyledContainer>
    );
};

export default ResultsPersonalityTest;
