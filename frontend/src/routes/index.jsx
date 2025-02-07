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
import IntroDisc from '../pages/DISC/IntroDisc';
import AppDiscTest from '../pages/DISC/AppDiscTest';
import DiscResults from '../pages/DISC/DiscResults';
import IntroHexaco from '../pages/Hexaco/IntroHexaco';
import AppHexacoTest from '../pages/Hexaco/AppHexacoTest';
import HexacoResults from '../pages/Hexaco/HexacoResults';
import IntroAmbi from '../pages/Ambi/IntroAmbi';
import AppAmbiTest from '../pages/Ambi/AppAmbiTest';
import AmbiResults from '../pages/Ambi/AmbiResults';

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

      {/* Routes pour le test DISC */}
      <Route path="/disc" element={<IntroDisc />} />
      <Route path="/disc/test" element={<AppDiscTest />} />
      <Route path="/disc/results" element={<DiscResults />} />

      {/* Routes pour le test HEXACO */}
      <Route path="/hexaco" element={<IntroHexaco />} />
      <Route path="/hexaco/test" element={<AppHexacoTest />} />
      <Route path="/hexaco/results" element={<HexacoResults />} />

      {/* Routes pour le test AMBI */}
      <Route path="/ambi" element={<IntroAmbi />} />
      <Route path="/ambi/test" element={<AppAmbiTest />} />
      <Route path="/ambi/results" element={<AmbiResults />} />
    </Routes>
  );
};

export default AppRoutes; 