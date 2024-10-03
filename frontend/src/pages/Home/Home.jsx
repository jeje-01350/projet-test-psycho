import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const containerStyle = {
        textAlign: 'center',
        marginTop: '50px',
    };

    const titleStyle = {
        color: '#333',
        fontSize: '2.5rem',
        marginBottom: '30px',
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap',
    };


    const buttonStyle = {
        backgroundColor: '#1e88e5',
        color: 'white',
        border: 'none',
        padding: '15px 30px',
        fontSize: '1.2rem',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle = {
        backgroundColor: '#1565c0',
    };

    const buttonActiveStyle = {
        transform: 'scale(0.95)',
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Choisissez votre test</h1>
            <div style={buttonContainerStyle}>
                <button
                    style={buttonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    onMouseDown={(e) => e.target.style.transform = buttonActiveStyle.transform}
                    onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                    onClick={() => navigate('/career-prediction')}
                >
                    Career Prediction
                </button>

                <button
                    style={buttonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    onMouseDown={(e) => e.target.style.transform = buttonActiveStyle.transform}
                    onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                    onClick={() => navigate('/test-personalite')}
                >
                    Test de personalité
                </button>

                <button
                    style={buttonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    onMouseDown={(e) => e.target.style.transform = buttonActiveStyle.transform}
                    onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                    onClick={() => navigate('/riasec')}
                >
                    Test de Riasec
                </button>

                <button
                    style={buttonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    onMouseDown={(e) => e.target.style.transform = buttonActiveStyle.transform}
                    onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                    onClick={() => navigate('/mindflare')}
                >
                    Test de MindFlare
                </button>

                <button
                    style={buttonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    onMouseDown={(e) => e.target.style.transform = buttonActiveStyle.transform}
                    onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                    onClick={() => navigate('/bigfive')}
                >
                    BigFive
                </button>

                <button
                    style={buttonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    onMouseDown={(e) => e.target.style.transform = buttonActiveStyle.transform}
                    onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                    onClick={() => navigate('/django-test')}
                >
                    Django test de personalité
                </button>

                <button
                    style={buttonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    onMouseDown={(e) => e.target.style.transform = buttonActiveStyle.transform}
                    onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                    onClick={() => navigate('/mbti')}
                >
                    MBTI test de personalité
                </button>
            </div>
        </div>
    );
};

export default Home;
