import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { UserProvider } from '../../../context/userContext';
import AppPersonalityTest from '../AppPersonalityTest';
import { theme } from '../../../styles/theme';

// Mock du contexte utilisateur
jest.mock('../../../context/userContext', () => ({
  useUserContext: () => ({
    userId: '123',
    token: 'test-token',
    recordID: 'test-record',
    name: 'Test',
    firstname: 'User',
    email: 'test@example.com'
  }),
  UserProvider: ({ children }) => <div>{children}</div>
}));

// Mock de react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warn: jest.fn()
  },
  ToastContainer: () => null
}));

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserProvider>
          {component}
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('AppPersonalityTest', () => {
  beforeEach(() => {
    // Reset des mocks de fetch avant chaque test
    global.fetch = jest.fn();
  });

  it('affiche correctement le composant initial', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ exists: false })
      })
    );

    renderWithProviders(<AppPersonalityTest />);

    // Vérifie que la barre de progression est présente
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // Vérifie que le texte de la première question est affiché
    await waitFor(() => {
      expect(screen.getByText(/Question 1/)).toBeInTheDocument();
    });
  });

  it('permet de sélectionner une réponse', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ exists: false })
      })
    );

    renderWithProviders(<AppPersonalityTest />);

    // Attend que les réponses soient chargées
    await waitFor(() => {
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    // Sélectionne la première réponse
    const firstAnswer = screen.getAllByRole('button')[0];
    fireEvent.click(firstAnswer);

    // Vérifie que la réponse est sélectionnée (changement de style)
    expect(firstAnswer).toHaveStyle({ backgroundColor: '#919191' });
  });

  it('affiche un avertissement si on essaie de passer à la question suivante sans réponse', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ exists: false })
      })
    );

    renderWithProviders(<AppPersonalityTest />);

    // Attend que le bouton "Suivant" soit chargé
    await waitFor(() => {
      expect(screen.getByText('Suivant')).toBeInTheDocument();
    });

    // Clique sur "Suivant" sans sélectionner de réponse
    fireEvent.click(screen.getByText('Suivant'));

    // Vérifie que le message d'avertissement est affiché
    expect(require('react-toastify').toast.warn)
      .toHaveBeenCalledWith('Veuillez sélectionner une réponse avant de continuer.');
  });
}); 