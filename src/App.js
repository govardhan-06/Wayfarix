import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TravelPlanner from './TravelPlanner';
import TravelQuestionnaire from './TravelQuestionnaire';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TravelPlanner />} />
        <Route path="/questionnaire" element={<TravelQuestionnaire />} />
      </Routes>
    </Router>
  );
};

export default App;
