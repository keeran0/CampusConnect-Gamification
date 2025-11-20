import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/common/Navigation';
import Dashboard from './pages/Dashboard';
import Rewards from './pages/Rewards';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-50">
        <Navigation />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;