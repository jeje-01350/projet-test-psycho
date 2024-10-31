import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/index";

import AppCareerPrediction from "./pages/Career-Prediction/AppCareerPrediction.jsx";
import ResultsCareerPrediction from "./pages/Career-Prediction/ResultsCareerPrediction.jsx";

import AppPersonalityTest from "./pages/Personality/AppPersonalityTest.jsx";
import ResultsPersonalityTest from "./pages/Personality/ResultsPersonalityTest.jsx";

import AppRiasec from "./pages/Riasec/AppRiasec.jsx";
import ResultsRiasec from "./pages/Riasec/ResultsRiasec.jsx";

import AppMindFlareTest from "./pages/MindFlare/AppMindFlareTest.jsx";
import MindFlareResults from "./pages/MindFlare/MindFlareResults.jsx";

import AppBigfive from "./pages/Bigfive/AppBigfive.jsx";
import ResultsBigFive from "./pages/Bigfive/ResultsBigfive.jsx";

import { Navbar } from "./components/index";
import AppDjangoPersonalityTest from "./pages/DjangoPersonalityTest/AppDjangoPersonalityTest.jsx";
import ResultsDjangoPersonalityTest from "./pages/DjangoPersonalityTest/ResultsDjangoPersonalityTest.jsx";
import AppMbti from "./pages/Mbti/AppMbti.jsx";
import ResultsMbti from "./pages/Mbti/ResultsMbti.jsx";
import AppPapi from "./pages/Papi/AppPapi.jsx";
import ResultsPapi from "./pages/Papi/ResultsPapi.jsx";
import AppAncreSchein from "./pages/AncreSchein/AppAncreSchein.jsx";
import ResultsAncreSchein from "./pages/AncreSchein/ResultsAncreSchein.jsx";
import ResultsKapable from "./pages/Kapable/ResultsKapable.jsx";
import AppKapable from "./pages/Kapable/AppKapable.jsx";
import Test from "./pages/Test.jsx";
import TestResults from "./pages/TestResults.jsx";

const App = () => {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />

        {/*<Route path="/career-prediction" exact element={<AppCareerPrediction />} />
        <Route path="/career-prediction/results" exact element={<ResultsCareerPrediction />} />*/}

        <Route path="/test-personalite" exact element={<AppPersonalityTest />} />
        <Route path="/test-personalite/results" exact element={<ResultsPersonalityTest />} />

        {/*<Route path="/riasec" exact element={<AppRiasec />} />
        <Route path="/riasec/results" exact element={<ResultsRiasec />} />

        <Route path="/mindflare" exact element={<AppMindFlareTest />} />
        <Route path="/mindflare/results" exact element={<MindFlareResults />} />

        <Route path="/bigfive" exact element={<AppBigfive />} />
        <Route path="/bigfive/results" exact element={<ResultsBigFive />} />

        <Route path="/django-test" exact element={<AppDjangoPersonalityTest />} />
        <Route path="/django-test/results" exact element={<ResultsDjangoPersonalityTest />} />

        <Route path="/mbti" exact element={<AppMbti />} />
        <Route path="/mbti/results" exact element={<ResultsMbti />} />

        <Route path="/papi" exact element={<AppPapi />} />
        <Route path="/papi/results" exact element={<ResultsPapi />} />

        <Route path="/schein" exact element={<AppAncreSchein />} />
        <Route path="/schein/results" exact element={<ResultsAncreSchein />} />

        <Route path="/kapable" exact element={<AppKapable />} />
        <Route path="/kapable/results" exact element={<ResultsKapable />} />*/}

      </Routes>
    </div>
  );
};

export default App;
