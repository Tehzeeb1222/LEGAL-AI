import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LawyerDashboard } from './pages/LawyerDashboard';
import { ClientWizard } from './pages/ClientWizard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ClientWizard />} />
        <Route path='/lawyer' element={<LawyerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
