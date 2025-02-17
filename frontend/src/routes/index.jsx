import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from '../pages/Home/Home';
import IntroAmbi from '../pages/Ambi/IntroAmbi';
import AppAmbiTest from '../pages/Ambi/AppAmbiTest';
import AmbiResults from '../pages/Ambi/AmbiResults';
import IntroGcbs from '../pages/GCBS/IntroGcbs';
import AppGcbsTest from '../pages/GCBS/AppGcbsTest';
import GcbsResults from '../pages/GCBS/GcbsResults';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Page d'accueil */}
      <Route path="/" element={<Home />} />

      {/* Routes pour le test AMBI */}
      <Route path="/ambi" element={<IntroAmbi />} />
      <Route path="/ambi/test" element={<AppAmbiTest />} />
      <Route path="/ambi/results" element={<AmbiResults />} />

      {/* Routes pour le test GCBS */}
      <Route path="/gcbs" element={<IntroGcbs />} />
      <Route path="/gcbs/test" element={<AppGcbsTest />} />
      <Route path="/gcbs/results" element={<GcbsResults />} />
    </Routes>
  );
};

export default AppRoutes; 