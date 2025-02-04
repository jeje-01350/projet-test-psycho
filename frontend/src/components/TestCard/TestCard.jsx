import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardWrapper = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 300px;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: ${props => props.color || '#fabc1c'};
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => `${props.color}15` || '#fabc1c15'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  color: #888;
  font-size: 0.9rem;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const Button = styled.button`
  background: ${props => props.color || '#fabc1c'};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.3s ease;
  width: 100%;

  &:hover {
    opacity: 0.9;
  }
`;

const TestCard = ({
  title,
  description,
  duration,
  questionCount,
  icon: Icon,
  accentColor,
  onStart
}) => {
  return (
    <CardWrapper color={accentColor}>
      <div>
        <IconWrapper color={accentColor}>
          <Icon size={30} color={accentColor} />
        </IconWrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </div>
      
      <div>
        <MetaInfo>
          <span>⏱️ {duration}</span>
          <span>📝 {questionCount} questions</span>
        </MetaInfo>
        <Button 
          color={accentColor}
          onClick={onStart}
        >
          Commencer le test
        </Button>
      </div>
    </CardWrapper>
  );
};

TestCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  questionCount: PropTypes.number.isRequired,
  icon: PropTypes.elementType.isRequired,
  accentColor: PropTypes.string,
  onStart: PropTypes.func.isRequired
};

export default TestCard; 