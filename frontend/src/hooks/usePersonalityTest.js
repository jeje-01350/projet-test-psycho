import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';

const API_URL = import.meta.env.VITE_API_URL;

export const usePersonalityTest = () => {
  const navigate = useNavigate();
  const { recordID, email, name, firstname } = useUserContext();
  
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [testState, setTestState] = useState({
    currentQuestion: 0,
    answers: [],
    isComplete: false,
  });

  useEffect(() => {
    const validateUserInfo = async () => {
      if (!recordID || !email || !name || !firstname) {
        setErrorMessage("Vous n'avez pas toutes les informations requises pour commencer le test, veuillez vous rapprocher de votre consultant");
        setIsButtonDisabled(true);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/personality-test/checkHsObjectId/${recordID}`);
        const data = await res.json();
        
        if (data.exists === true) {
          setErrorMessage("Impossible de faire le test deux fois pour le même utilisateur");
          setIsButtonDisabled(true);
        } else if (data.exists === false) {
          setErrorMessage("");
          setIsButtonDisabled(false);
        } else {
          setErrorMessage("Une erreur est survenue lors de la vérification des informations. Veuillez réessayer.");
          setIsButtonDisabled(true);
        }
      } catch (err) {
        console.error('Erreur lors de la vérification de hs_object_id:', err);
        setErrorMessage("Une erreur est survenue lors de la vérification des informations. Veuillez réessayer.");
        setIsButtonDisabled(true);
      }
    };

    validateUserInfo();
  }, [recordID, email, name, firstname]);

  const startTest = () => {
    if (!isButtonDisabled) {
      navigate('/personality/test');
    }
  };

  const submitAnswer = (answer) => {
    setTestState(prev => ({
      ...prev,
      answers: [...prev.answers, answer],
      currentQuestion: prev.currentQuestion + 1,
    }));
  };

  const submitTest = async () => {
    try {
      const response = await fetch(`${API_URL}/personality-test/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recordID,
          email,
          name,
          firstname,
          answers: testState.answers,
        }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setTestState(prev => ({ ...prev, isComplete: true }));
        navigate('/personality/results', { state: { results: data } });
      } else {
        setErrorMessage("Une erreur est survenue lors de la soumission du test.");
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du test:', error);
      setErrorMessage("Une erreur est survenue lors de la soumission du test.");
    }
  };

  return {
    errorMessage,
    isButtonDisabled,
    testState,
    startTest,
    submitAnswer,
    submitTest,
  };
};