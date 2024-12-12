import React from 'react';
import { useNavigate } from 'react-router-dom';
import userImage from '../../images/homepageImage.png';
import senseiStyle from '../../images/style-sensei.png';

const Home = () => {
    const navigate = useNavigate();

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

    const rightSectionStyle = {
        position: 'absolute',
        transform:'rotate(15deg)',
        right: "50px",
        bottom: "110px"
    };

    const ImageSensei = {
        position: 'absolute',
        transform:'rotate(15deg)',
        right:'100px',
        top: "30px"
    };

    const titleStyle = {
        color: '#333',
        fontSize: '2.5rem',
        marginBottom: '20px',
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
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
    };

    const buttonHoverStyle = {
        backgroundColor: '#e6a71a',
    };

    const buttonActiveStyle = {
        transform: 'scale(0.95)',
    };

    const imageStyle = {
        maxWidth: '100%',
        height: '400px',
    };

    const footerBarStyle = {
        backgroundColor: 'black',
        height: '30px',
        width: '100%',
        position: 'fixed',
        bottom: '0',
        left: '0',
    };

    return (
        <div style={pageStyle}>
            <div style={containerStyle}>
                <div style={leftSectionStyle}>
                    <h1 style={titleStyle}>Test de personnalité</h1>
                    <p style={descriptionStyle}>
                        Ce test a pour vocation de faire le point sur les éléments clés de votre personnalité, nous permettant d'adapter au plus près nos accompagnements.
                        <br/><br/>
                        Ce test utilise le principe de base du MBTI (Myers Briggs Type Indicator) qui fonctionne sur la base des 16 personnalités.
                        <br/><br/>
                        Consignes et durée de passation : Réaliser le test seul, au calme. Il n'y a pas de bonnes ou de mauvaises réponses. Répondre aux questions de la manière la plus spontanée possible. Durée moyenne : 10 minutes pour 16 questions.
                        <br/><br/>
                        Résultats : À la fin du test, une typologie de Briggs vous sera attribuée sous la forme de Lettre + Couleur.
                    </p>
                    <button
                        style={buttonStyle}
                        onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                        onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                        onMouseDown={(e) => e.target.style.transform = buttonActiveStyle.transform}
                        onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                        onClick={() => navigate('/mbti')}
                    >
                        Commencer le test
                    </button>
                </div>
                <div style={rightSectionStyle}>
                    <img
                        src={userImage}
                        alt="Illustration"
                        style={imageStyle}
                    />
                </div>
                <div style={ImageSensei}>
                    <img
                        src={senseiStyle}
                        alt="Illustration"
                    />
                </div>
            </div>

            <div style={footerBarStyle}></div>
        </div>
    );
};

export default Home;