import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Container, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const ResultsPersonalityTest = () => {
    const location = useLocation();
    const { data } = location.state || {};

    const StyledCard = styled(Card)(({ theme }) => ({
        boxShadow: theme.shadows[3],
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    }));

    console.log(data)
    const getColorsDescription = (color) => {
        switch (color) {
            case 'Blue':
                return `Vous êtes un Relateur. Vous aimez discuter, vivre des romances et passer du temps avec les autres.
                Vous êtes une personne empathique qui a tendance à placer les besoins des autres au-dessus des siens.
                Vos forces sont votre sympathie, votre ouverture et votre conscience de vos propres émotions.
                Vos faiblesses sont votre subjectivité, votre souplesse et votre susceptibilité à être manipulé.`;
            case 'Red':
                return `Vous êtes un Aventurier. Vous aimez l'action, l'excitation et le drame.
                Vous acceptez facilement le changement et êtes spontané.
                Vos forces sont votre ténacité, votre audace et votre adaptabilité.
                Vos faiblesses sont votre insouciance et votre manque de concentration.`;
            case 'Green':
                return `Vous êtes un Planificateur. Vous aimez rêver, planifier et innover.
                Vous avez tendance à passer beaucoup de temps à penser.
                Vos forces sont votre vision, votre objectivité et votre attention aux détails.
                Vos faiblesses sont votre difficulté à vous immerger dans le moment présent.`;
            case 'Brown':
                return `Vous êtes un Constructeur. Vous aimez diriger, créer et travailler dur.
                Vous êtes une personne traditionnelle avec du respect pour l'autorité.
                Vos forces sont votre diligence, votre franchise et votre pragmatisme.
                Vos faiblesses sont votre manque de tact, de patience et de facilité avec les abstractions.`;
            default:
                return 'Description non disponible.';
        }
    };

    const getBriggsDescription = (briggs) => {
        switch (briggs) {
            case 'ISTJ':
                return `Vous êtes de type ISTJ, également connu sous le nom de L'Inspecteur.
                Vous avez tendance à être pratique et logique avant tout.
                Vous devriez envisager un travail dans la comptabilité ou l'ingénierie.`;
            case 'ISFJ':
                return `Vous êtes de type ISFJ, également connu sous le nom de Le Protecteur.
                Vous avez tendance à être sympathique et organisé avant tout.
                Vous devriez envisager un travail dans la garde d'enfants ou la tenue de livres.`;
            case 'INFJ':
                return `Vous êtes de type INFJ, également connu sous le nom de Le Conseiller.
                Vous avez tendance à être sensible et créatif avant tout.
                Vous devriez envisager un travail dans l'éducation ou les arts.`;
            case 'INTJ':
                return `Vous êtes de type INTJ, également connu sous le nom de Le Maître Stratège.
                Vous avez tendance à être décisif et perspicace avant tout.
                Vous devriez envisager un travail dans l'architecture ou l'ingénierie.`;
            case 'ISTP':
                return `Vous êtes de type ISTP, également connu sous le nom de L'Opérateur.
                Vous avez tendance à être analytique et pratique avant tout.
                Vous devriez envisager un travail dans la technologie de l'informatique ou l'agriculture.`;
            case 'ISFP':
                return `Vous êtes de type ISFP, également connu sous le nom de Le Compositeur.
                Vous avez tendance à être loyal et adaptable avant tout.
                Vous devriez envisager un travail dans l'enseignement ou le nursing.`;
            case 'INFP':
                return `Vous êtes de type INFP, également connu sous le nom de Le Guérisseur.
                Vous avez tendance à être empathique et curieux avant tout.
                Vous devriez envisager un travail dans l'écriture ou le design graphique.`;
            case 'INTP':
                return `Vous êtes de type INTP, également connu sous le nom de L'Architecte.
                Vous avez tendance à être curieux et analytique avant tout.
                Vous devriez envisager un travail dans l'architecture ou la construction.`;
            case 'ESTP':
                return `Vous êtes de type ESTP, également connu sous le nom de Le Promoteur.
                Vous avez tendance à être énergique et réaliste avant tout.
                Vous devriez envisager un travail dans la vente ou la foresterie.`;
            case 'ESFP':
                return `Vous êtes de type ESFP, également connu sous le nom de Le Performeur.
                Vous avez tendance à être attentionné et ingénieux avant tout.
                Vous devriez envisager un travail dans l'hôtellerie ou les soins de santé.`;
            case 'ENFP':
                return `Vous êtes de type ENFP, également connu sous le nom de Le Champion.
                Vous avez tendance à être imaginatif et perspicace avant tout.
                Vous devriez envisager un travail dans la thérapie ou le théâtre.`;
            case 'ENTP':
                return `Vous êtes de type ENTP, également connu sous le nom de L'Inventeur.
                Vous avez tendance à être enthousiaste et théorique avant tout.
                Vous devriez envisager un travail dans les affaires ou les sports.`;
            case 'ESTJ':
                return `Vous êtes de type ESTJ, également connu sous le nom de Le Superviseur.
                Vous avez tendance à être logique et assertif avant tout.
                Vous devriez envisager un travail dans le leadership ou le droit.`;
            case 'ESFJ':
                return `Vous êtes de type ESFJ, également connu sous le nom de Le Fournisseur.
                Vous avez tendance à être sociable et attentionné avant tout.
                Vous devriez envisager un travail dans la garde d'enfants ou les soins de santé.`;
            case 'ENFJ':
                return `Vous êtes de type ENFJ, également connu sous le nom de Le Professeur.
                Vous avez tendance à être passionné et imaginatif avant tout.
                Vous devriez envisager un travail dans l'enseignement ou les arts.`;
            case 'ENTJ':
                return `Vous êtes de type ENTJ, également connu sous le nom de Le Commandant.
                Vous avez tendance à être organisé et logique avant tout.
                Vous devriez envisager un travail dans le droit ou l'ingénierie.`;
            default:
                return 'Description non disponible.';
        }
    };

    const getLettersDescription = (letter) => {
        switch (letter) {
            case 'A':
                return `Vous avez une personnalité de type A. Vous aimez tout contrôler.
                Vos forces sont votre ténacité, votre confiance et votre pragmatisme.
                Vos faiblesses sont votre manque d'empathie, de discipline et d'attention aux détails.`;
            case 'B':
                return `Vous avez une personnalité de type B. Vous aimez être entouré de gens.
                Vos forces sont votre empathie, votre enthousiasme et votre spontanéité.
                Vos faiblesses sont votre manque de patience, d'attention et de confiance.`;
            case 'C':
                return `Vous avez une personnalité de type C. Vous aimez réfléchir avant d'agir.
                Vos forces sont votre rationalité, votre objectivité et votre originalité.
                Vos faiblesses sont votre manque de spontanéité, de pragmatisme et d'empathie.`;
            case 'D':
                return `Vous avez une personnalité de type D. Vous aimez vous sentir en sécurité dans la vie.
                Vos forces sont votre organisation, votre compassion et votre patience.
                Vos faiblesses sont votre manque d'ambition, d'adaptabilité et d'affirmation.`;
            default:
                return 'Description non disponible.';
        }
    };

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Typography variant="h4" gutterBottom align="center">
                    Résultats du test de personnalité
                </Typography>
            </Box>

            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={4}>
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h5" gutterBottom align="center" color="primary">
                                Colors: {data.results.colors}
                            </Typography>
                        </CardContent>
                    </StyledCard>
                </Grid>

                {/* Carte pour Briggs */}
                <Grid item xs={12} md={4}>
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h5" gutterBottom align="center" color="secondary">
                                Briggs: {data.results.briggs}
                            </Typography>
                        </CardContent>
                    </StyledCard>
                </Grid>

                {/* Carte pour Letters */}
                <Grid item xs={12} md={4}>
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h5" gutterBottom align="center" color="textSecondary">
                                Letters: {data.results.letters}
                            </Typography>
                        </CardContent>
                    </StyledCard>
                </Grid>
            </Grid>

            <Box my={4}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h6" align="center">
                        Résumé
                    </Typography>
                    <Typography variant="body1" align="center">
                        {data.summary}
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default ResultsPersonalityTest;
