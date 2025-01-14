import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import userImage from '../../images/homepageImage.png';
import senseiStyle from '../../images/style-sensei.png';
import { useUserContext } from "../../context/userContext.jsx";

const SenseiImage = styled.img`
  position: absolute;
  right: 100px;
  top: 30px;
  width: 100px;
  height: auto;

  @media (max-width: 779px) {
    display: none;
  }
`;

const StyledTitle = styled.h1`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 20px;

  @media (max-width: 779px) {
    font-size: 2rem;
  }
`;

const UserImage = styled.img`
  position: absolute;
  right: 50px;
  bottom: 110px;
  transform: rotate(15deg);
  max-width: 100%;
  height: 400px;

  @media (max-width: 779px) {
    display: none;
  }
`;

const Home = () => {
    const navigate = useNavigate();
    const { recordID, email, name, firstname } = useUserContext();

    const [errorMessage, setErrorMessage] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        if (!recordID || !email || !name || !firstname) {
            setErrorMessage("Vous n'avez pas toutes les informations requises pour commencer le test, veuillez vous rapprocher de votre consultant");
            setIsButtonDisabled(true);
        } else {
            const checkHsObjectId = async (hsObjectId) => {
                try {
                    const res = await fetch(`${import.meta.env.VITE_API_URL}/personality-test/checkHsObjectId/${hsObjectId}`);
                    const data = await res.json();
                    return data.exists;
                } catch (err) {
                    console.error('Erreur lors de la vérification de hs_object_id:', err);
                    return null; // Indique une erreur
                }
            };

            checkHsObjectId(recordID).then(exists => {
                if (exists === true) {
                    setErrorMessage("Impossible de faire le test deux fois pour le même utilsateur");
                    setIsButtonDisabled(true);
                } else if (exists === false) {
                    setErrorMessage("");
                    setIsButtonDisabled(false);
                } else {
                    setErrorMessage("Une erreur est survenue lors de la vérification des informations. Veuillez réessayer.");
                    setIsButtonDisabled(true);
                }
            });
        }
    }, [recordID, email, name, firstname]);


    const pageStyle = {
        backgroundColor: '#fdf6f1',
        minHeight: '90vh',
        padding: '0',
        margin: '0',
        display: 'flex',
        flexDirection: 'column',
    };

    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '50px',
        backgroundColor:'white',
        border: '1px solid #000',
        borderRadius: '50px',
        width: '90%',
        margin: '30px auto',
    };

    const leftSectionStyle = {
        width: '90%',
    };

    const descriptionStyle = {
        fontSize: '1.2rem',
        marginBottom: '30px',
        color: '#555',
    };

    const buttonStyle = {
        backgroundColor: '#fabc1c',
        color: 'white',
        border: 'none',
        padding: '15px 30px',
        fontSize: '1.2rem',
        borderRadius: '5px',
        cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
        opacity: isButtonDisabled ? 0.5 : 1,
    };

    const buttonHoverStyle = {
        backgroundColor: '#e6a71a',
    };

    const buttonActiveStyle = {
        transform: 'scale(0.95)',
    };

    const footerBarStyle = {
        backgroundColor: 'black',
        height: '30px',
        width: '100%',
        position: 'fixed',
        bottom: '0',
        left: '0',
    };

    const handleClick = () => {
        if (isButtonDisabled) {
            return;
        } else {
            navigate('/mbti');
        }
    };

    return (
        <div style={pageStyle}>
            <div style={containerStyle}>
                <div style={leftSectionStyle}>
                    <StyledTitle>Test de personnalité</StyledTitle>
                    <p style={descriptionStyle}>
                        Ce test a pour vocation de faire le point sur les éléments clés de votre personnalité, nous permettant d'adapter au plus près nos accompagnements.
                        <br/><br/>
                        Ce test utilise le principe de base du MBTI (Myers Briggs Type Indicator) qui fonctionne sur la base des 16 personnalités.
                        <br/><br/>
                        Consignes et durée de passation : Réaliser le test seul, au calme. Il n'y a pas de bonnes ou de mauvaises réponses. Répondre aux questions de la manière la plus spontanée possible. Durée moyenne : 10 minutes pour 16 questions.
                        <br/><br/>
                        Résultats : À la fin du test, une typologie de Briggs vous sera attribuée sous la forme de Lettre + Couleur.
                    </p>
                    {errorMessage && (<p style={{ width: '85%', color: 'red', fontWeight: 'bold', marginBottom: '30px', fontSize: '1.2rem' }}>{errorMessage}</p>)}
                    <button
                        style={buttonStyle}
                        onMouseOver={(e) => {
                            if (!isButtonDisabled) {
                                e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
                            }
                        }}
                        onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                        onMouseDown={(e) => {
                            if (!isButtonDisabled) {
                                e.target.style.transform = buttonActiveStyle.transform;
                            }
                        }}
                        onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                        onClick={handleClick}
                        disabled={isButtonDisabled}
                    >
                        Commencer le test
                    </button>
                </div>
                <UserImage src={userImage} alt="Illustration" />
                <SenseiImage src={senseiStyle} alt="Illustration" />
            </div>

            <div style={footerBarStyle}></div>
        </div>
    );
};

export default Home;
