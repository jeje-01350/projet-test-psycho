import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { theme } from './styles/theme';
import AppRoutes from './routes/index';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navbar />
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
