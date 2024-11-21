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
import AllTests from "./pages/Home/allTest.jsx";

const App = () => {

  return (
    <div>
        <Navbar />
        <Routes>

            {/*  HOMEPAGE  */}
            <Route path="/" exact element={<Home />} />

            {/*  PAGE TOUT LES TESTS  */}
            <Route path="/tous-les-tests" exact element={<AllTests />} />

            {/*  PAGES ANCRE DE TEST SCHEIN  */}
            <Route path="/schein" exact element={<AppAncreSchein />} />
            <Route path="/schein/results" exact element={<ResultsAncreSchein />} />

            {/*  PAGES TEST PERSONALITE MBTI  */}
            <Route path="/mbti" exact element={<AppPersonalityTest />} />
            <Route path="/mbti/results" exact element={<ResultsPersonalityTest />} />
        </Routes>
    </div>
  );
};

export default App;
