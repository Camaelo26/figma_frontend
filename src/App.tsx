import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import PersonalFriendPage from './components/PersonalFriendPage';
import GoalsTrackerPage from './components/GoalsTrackerPage';
import AskForHelpPage from './components/AskForHelpPage';
import CreateAccountPage from './components/CreateAccountPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/personal-friend" element={<PersonalFriendPage />} />
        <Route path="/help" element={<AskForHelpPage />} />
        <Route path="/goals-tracker" element={<GoalsTrackerPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </Router>
  );
};

export default App;
