import React from 'react';
import { useNavigate } from 'react-router-dom';

const AllTests = () => {
    const navigate = useNavigate();

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '50px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const titleStyle = {
        fontSize: '2.8rem',
        marginBottom: '30px',
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold',
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        width: '100%',
    };

    const buttonStyle = {
        backgroundColor: '#1e88e5',
        color: 'white',
        border: 'none',
        padding: '15px 20px',
        fontSize: '1.2rem',
        borderRadius: '10px',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'transform 0.3s ease, background-color 0.3s ease',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    };

    const buttonHoverStyle = {
        backgroundColor: '#1565c0',
    };

    const buttonActiveStyle = {
        transform: 'scale(0.95)',
    };

    const testButtons = [
        { label: 'Test MBTI', route: '/mbti' },
        { label: 'Test Ancre de Schein', route: '/schein' },
        // Ajoutez d'autres tests ici si nécessaire
    ];

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Tous nos Tests</h1>
            <div style={gridStyle}>
                {testButtons.map((test, index) => (
                    <button
                        key={index}
                        style={buttonStyle}
                        onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                        onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                        onMouseDown={(e) => e.target.style.transform = buttonActiveStyle.transform}
                        onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                        onClick={() => navigate(test.route)}
                    >
                        {test.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllTests;
