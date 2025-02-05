import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from '../pages/Home/Home';
import IntroBigFive from '../pages/BigFive/IntroBigFive';
import AppBigFiveTest from '../pages/BigFive/AppBigFiveTest';
import BigFiveResults from '../pages/BigFive/BigFiveResults';
import IntroPersonalityTest from '../pages/Personality/IntroPersonalityTest';
import AppPersonalityTest from '../pages/Personality/AppPersonalityTest';
import ResultsPersonalityTest from '../pages/Personality/ResultsPersonalityTest';
import IntroResilience from '../pages/Resilience/IntroResilience';
import AppResilienceTest from '../pages/Resilience/AppResilienceTest';
import ResilienceResults from '../pages/Resilience/ResilienceResults';
import IntroEmotionalIntelligence from '../pages/EmotionalIntelligence/IntroEmotionalIntelligence';
import AppEmotionalIntelligenceTest from '../pages/EmotionalIntelligence/AppEmotionalIntelligenceTest';
import EmotionalIntelligenceResults from '../pages/EmotionalIntelligence/EmotionalIntelligenceResults';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Page d'accueil */}
      <Route path="/" element={<Home />} />

      {/* Routes du test de personnalité */}
      <Route path="/personality" element={<IntroPersonalityTest />} />
      <Route path="/personality/test" element={<AppPersonalityTest />} />
      <Route path="/personality/results" element={<ResultsPersonalityTest />} />

      {/* Routes Big Five */}
      <Route path="/bigfive" element={<IntroBigFive />} />
      <Route path="/bigfive/test" element={<AppBigFiveTest />} />
      <Route path="/bigfive/results" element={<BigFiveResults />} />

      {/* Routes Resilience */}
      <Route path="/resilience" element={<IntroResilience />} />
      <Route path="/resilience/test" element={<AppResilienceTest />} />
      <Route path="/resilience/results" element={<ResilienceResults />} />

      {/* Routes Intelligence Émotionnelle */}
      <Route path="/emotional-intelligence" element={<IntroEmotionalIntelligence />} />
      <Route path="/emotional-intelligence/test" element={<AppEmotionalIntelligenceTest />} />
      <Route path="/emotional-intelligence/results" element={<EmotionalIntelligenceResults />} />
    </Routes>
  );
};

export default AppRoutes; 