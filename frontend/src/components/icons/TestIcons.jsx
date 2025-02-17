import React from 'react';
import PropTypes from 'prop-types';

export const PersonalityIcon = ({ color = '#4298B4', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z"
      fill={color}
    />
  </svg>
);

export const EmotionalIcon = ({ color = '#33A474', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM7 9.5C7 8.67 7.67 8 8.5 8C9.33 8 10 8.67 10 9.5C10 10.33 9.33 11 8.5 11C7.67 11 7 10.33 7 9.5ZM14.77 17.3C14.13 17.7 13.4 17.88 12.65 17.88C11.9 17.88 11.17 17.7 10.53 17.3C9.89 16.9 9.38 16.36 9.05 15.68L10.36 14.97C10.57 15.39 10.88 15.73 11.26 15.97C11.64 16.21 12.12 16.34 12.65 16.34C13.18 16.34 13.66 16.21 14.04 15.97C14.42 15.73 14.73 15.39 14.94 14.97L16.25 15.68C15.92 16.36 15.41 16.9 14.77 17.3ZM15.5 11C14.67 11 14 10.33 14 9.5C14 8.67 14.67 8 15.5 8C16.33 8 17 8.67 17 9.5C17 10.33 16.33 11 15.5 11Z"
      fill={color}
    />
  </svg>
);

export const CognitiveIcon = ({ color = '#2196f3', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 7C13.1 7 14 7.9 14 9C14 10.1 13.1 11 12 11C10.9 11 10 10.1 10 9C10 7.9 10.9 7 12 7ZM17 17H7V15C7 13.34 10.33 12 12 12C13.67 12 17 13.34 17 15V17ZM6 13L4 9L8 11L6 13ZM20 9L18 13L16 11L20 9Z"
      fill={color}
    />
  </svg>
);

PersonalityIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number
};

EmotionalIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number
};

CognitiveIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number
};

export const TestIcons = {
  personality: PersonalityIcon,
  emotional: EmotionalIcon,
  cognitive: CognitiveIcon
}; 