import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from "../../context/userContext.jsx";
import userImage from '../../images/user.png';

const Home = () => {
    const navigate = useNavigate();
    const { test } = useUserContext();

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '50px 20px',
    };

    const heroSectionStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '80px',
        gap: '40px',
        '@media (max-width: 768px)': {
            flexDirection: 'column',
            textAlign: 'center',
        },
    };

    const leftSectionStyle = {
        flex: '1',
    };

    const titleStyle = {
        fontSize: '3.5rem',
        marginBottom: '20px',
        color: '#333',
        fontWeight: 'bold',
        animation: 'fadeInUp 0.8s ease-out',
    };

    const highlightedTextStyle = {
        color: '#1e88e5',
        position: 'relative',
        display: 'inline-block',
    };

    const descriptionStyle = {
        fontSize: '1.2rem',
        color: '#666',
        lineHeight: '1.6',
        marginBottom: '30px',
        animation: 'fadeInUp 1s ease-out',
    };

    const rightSectionStyle = {
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        animation: 'float 6s ease-in-out infinite',
    };

    const imageStyle = {
        maxWidth: '100%',
        height: 'auto',
        animation: 'float 6s ease-in-out infinite',
    };

    const testsContainerStyle = {
        marginTop: '40px',
    };

    const testsSectionTitleStyle = {
        fontSize: '2.5rem',
        textAlign: 'center',
        marginBottom: '40px',
        color: '#333',
        animation: 'fadeInUp 1.2s ease-out',
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        width: '100%',
    };

    const cardStyle = {
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        border: '1px solid #eee',
        position: 'relative',
        overflow: 'hidden',
        animation: 'fadeInUp 1.4s ease-out',
    };

    const cardHoverStyle = {
        transform: 'translateY(-10px)',
        boxShadow: '0 12px 30px rgba(30, 136, 229, 0.2)',
    };

    const iconContainerStyle = {
        fontSize: '3.5rem',
        marginBottom: '20px',
        padding: '20px',
        borderRadius: '50%',
        backgroundColor: 'rgba(30, 136, 229, 0.1)',
        transition: 'all 0.3s ease',
    };

    const cardTitleStyle = {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '15px',
        textAlign: 'center',
    };

    const cardDescriptionStyle = {
        fontSize: '1.1rem',
        color: '#666',
        textAlign: 'center',
        marginBottom: '25px',
        lineHeight: '1.6',
    };

    const buttonStyle = {
        backgroundColor: '#1e88e5',
        color: 'white',
        border: 'none',
        padding: '15px 30px',
        fontSize: '1.1rem',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        width: '100%',
        maxWidth: '220px',
        position: 'relative',
        overflow: 'hidden',
    };

    const testCards = [
        {
            label: 'Test MBTI',
            route: '/mbti',
            key: 'mbti',
            icon: '🎯',
            description: 'Découvrez votre type de personnalité MBTI et comprenez mieux vos préférences naturelles.',
        },
        {
            label: 'Test Ancre de Schein',
            route: '/schein',
            key: 'schein',
            icon: '⚓',
            description: 'Identifiez vos ancres de carrière et vos motivations professionnelles profondes.',
        },
    ];

    const availableTests = test ? test.split(',') : [];
    const filteredTests = availableTests.length > 0
        ? testCards.filter((test) => availableTests.includes(test.key))
        : testCards;

    return (
        <div>
            <style>
                {`
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    @keyframes float {
                        0%, 100% {
                            transform: translateY(0);
                        }
                        50% {
                            transform: translateY(-20px);
                        }
                    }
                    @keyframes pulse {
                        0% {
                            transform: scale(1);
                        }
                        50% {
                            transform: scale(1.05);
                        }
                        100% {
                            transform: scale(1);
                        }
                    }
                `}
            </style>
            <div style={containerStyle}>
                <div style={heroSectionStyle}>
                    <div style={leftSectionStyle}>
                        <h1 style={titleStyle}>
                            Découvrez Votre <span style={highlightedTextStyle}>Véritable Potentiel</span>
                        </h1>
                        <p style={descriptionStyle}>
                            Explorez nos tests psychométriques professionnels pour mieux vous comprendre 
                            et prendre des décisions éclairées pour votre avenir.
                        </p>
                    </div>
                    <div style={rightSectionStyle}>
                        <img src={userImage} alt="Illustration" style={imageStyle} />
                    </div>
                </div>

                <div style={testsContainerStyle}>
                    <h2 style={testsSectionTitleStyle}>
                        Nos Tests <span style={highlightedTextStyle}>Personnalisés</span>
                    </h2>
                    <div style={gridStyle}>
                        {filteredTests.map((test, index) => (
                            <div
                                key={index}
                                style={cardStyle}
                                onMouseOver={(e) => {
                                    Object.assign(e.currentTarget.style, {...cardStyle, ...cardHoverStyle});
                                    e.currentTarget.querySelector('.icon-container').style.transform = 'scale(1.1) rotate(5deg)';
                                }}
                                onMouseOut={(e) => {
                                    Object.assign(e.currentTarget.style, cardStyle);
                                    e.currentTarget.querySelector('.icon-container').style.transform = 'scale(1) rotate(0deg)';
                                }}
                                onClick={() => navigate(test.route)}
                            >
                                <div className="icon-container" style={{...iconContainerStyle, transition: 'transform 0.3s ease'}}>
                                    {test.icon}
                                </div>
                                <h3 style={cardTitleStyle}>{test.label}</h3>
                                <p style={cardDescriptionStyle}>{test.description}</p>
                                <button 
                                    style={buttonStyle}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.backgroundColor = '#1565c0';
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.backgroundColor = '#1e88e5';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    Commencer le Test
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
