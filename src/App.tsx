import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import PersonalFriendPage from './components/PersonalFriendPage';
import AskForHelpPage from './components/AskForHelpPage';
import TalkingPlatformPage from './components/TalkingPlatformPage';
import CreateAccountPage from './components/CreateAccountPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import UserSettingsPage from './components/UserSettingsPage'; // Import the UserSettings page

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/personal-friend" element={<PersonalFriendPage />} />
        <Route path="/help" element={<AskForHelpPage />} />
        <Route path="/talking-platform" element={<TalkingPlatformPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/user-settings" element={<UserSettingsPage />} /> {/* New route */}
      </Routes>
    </Router>
  );
};

export default App;
