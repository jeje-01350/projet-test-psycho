import React from 'react';
import { useNavigate } from 'react-router-dom';
import userImage from '../../images/user.png';

const Home = () => {
    const navigate = useNavigate();

    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f5f7fb',
        padding: '50px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        width: '90%',
        margin: '30px auto',
    };

    const leftSectionStyle = {
        width: '50%',
    };

    const rightSectionStyle = {
        width: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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

    const imageStyle = {
        maxWidth: '100%',
        height: 'auto',
    };

    const servicesContainerStyle = {
        position: 'relative',
        width: '100vw',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        backgroundColor: 'white',
        padding: '80px 0',
    };

    const servicesContentStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
    };

    const servicesTitleStyle = {
        textAlign: 'center',
        fontSize: '2.8rem',
        marginBottom: '50px',
        color: '#333',
        fontWeight: 'bold',
    };

    const highlightedTextStyle = {
        color: '#1e88e5', // Même couleur que le bouton
    };

    const servicesGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px',
    };

    const serviceCardStyle = {
        backgroundColor: '#f9f9f9',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    };

    const serviceCardHoverStyle = {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    };

    const serviceIconStyle = {
        fontSize: '3.5rem',
        marginBottom: '20px',
        color: '#1e88e5',
    };

    const serviceTitleStyle = {
        fontSize: '1.8rem',
        marginBottom: '15px',
        color: '#333',
    };

    const serviceDescriptionStyle = {
        fontSize: '1rem',
        color: '#555',
        lineHeight: '1.5',
    };

    return (
        <div>
            {/* Première section : Test */}
            <div style={containerStyle}>
                <div style={leftSectionStyle}>
                    <h1 style={titleStyle}>Choisissez votre test</h1>
                    <p style={descriptionStyle}>
                        Découvrez quel test correspond à votre profil et commencez dès maintenant votre parcours d'exploration personnelle.
                    </p>
                    <button
                        style={buttonStyle}
                        onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                        onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                        onMouseDown={(e) => e.target.style.transform = buttonActiveStyle.transform}
                        onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                        onClick={() => navigate('/test-personalite')}
                    >
                        Test de personnalité
                    </button>
                </div>
                <div style={rightSectionStyle}>
                    <img
                        src={userImage}
                        alt="Illustration"
                        style={imageStyle}
                    />
                </div>
            </div>

            {/* Deuxième section : Services */}
            <div style={servicesContainerStyle}>
                <div style={servicesContentStyle}>
                    <h2 style={servicesTitleStyle}>
                        Nos <span style={highlightedTextStyle}>Services</span> Sensei
                    </h2>
                    <div style={servicesGridStyle}>
                        {["Formation", "Coaching", "Analyse de profil", "Outils psychométriques"].map((service, index) => (
                            <div
                                key={index}
                                style={serviceCardStyle}
                                onMouseOver={(e) => Object.assign(e.currentTarget.style, serviceCardHoverStyle)}
                                onMouseOut={(e) => Object.assign(e.currentTarget.style, serviceCardStyle)}
                            >
                                <div style={serviceIconStyle}>🎯</div>
                                <h3 style={serviceTitleStyle}>{service}</h3>
                                <p style={serviceDescriptionStyle}>
                                    Découvrez nos solutions personnalisées pour {service.toLowerCase()}.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
