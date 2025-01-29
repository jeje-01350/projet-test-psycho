import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/index";

import AppPersonalityTest from "./pages/Personality/AppPersonalityTest.jsx";
import ResultsPersonalityTest from "./pages/Personality/ResultsPersonalityTest.jsx";

import { Navbar } from "./components/index";

const App = () => {

  return (
    <div>
        <Navbar />
        <Routes>

            {/*  HOMEPAGE  */}
            <Route path="/" exact element={<Home />} />

            {/*  PAGES TEST PERSONALITE MBTI  */}
            <Route path="/mbti" exact element={<AppPersonalityTest />} />
            <Route path="/mbti/results" exact element={<ResultsPersonalityTest />} />
        </Routes>
    </div>
  );
};

export default App;
