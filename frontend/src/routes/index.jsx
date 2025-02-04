import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from '../pages/Home/Home';
import IntroPersonalityTest from '../pages/Personality/IntroPersonalityTest';
import AppPersonalityTest from '../pages/Personality/AppPersonalityTest';
import ResultPersonalityTest from '../pages/Personality/ResultsPersonalityTest';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Page d'accueil */}
      <Route path="/" element={<Home />} />

      {/* Routes du test de personnalité */}
      <Route path="/personality" element={<IntroPersonalityTest />} />
      <Route path="/personality/test" element={<AppPersonalityTest />} />
      <Route path="/personality/results" element={<ResultPersonalityTest />} />
    </Routes>
  );
};

export default AppRoutes; 