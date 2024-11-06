import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const username = "username123"; // Replace with dynamic username if available

  // State for dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // State for notifications box

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const darkModePreference = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkModePreference);
    document.documentElement.classList.toggle('dark', darkModePreference);
  }, []);

  // Toggle dark mode and apply class to <html> element
  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    localStorage.setItem('darkMode', newDarkModeState.toString());
    document.documentElement.classList.toggle('dark', newDarkModeState);
  };

  // Toggle notifications box
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800">
      {/* Left Sidebar Navigation */}
      <nav className="flex flex-col items-center bg-white dark:bg-gray-900 w-20 p-4 space-y-8 border-r border-gray-300 dark:border-gray-700">
        <button 
          onClick={() => navigate('/')} 
          className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400 text-3xl"
          title="Home"
        >
          🏠
        </button>
        <button 
          onClick={toggleNotifications} 
          className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400 text-3xl"
          title="Notifications"
        >
          🔔
        </button>
        <button 
          onClick={() => navigate('/user-settings')}
          className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400 text-3xl"
          title="User Settings"
        >
          👤
        </button>
      </nav>

      {/* Main Content Section */}
      <div className="flex-grow flex flex-col items-center p-10 space-y-10 relative">
        {/* Dark Mode Toggle in Top-Right Corner */}
        <button 
          onClick={toggleDarkMode}
          className="absolute top-6 right-6 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400 text-3xl"
          title="Toggle Dark Mode"
        >
          🌙
        </button>

        {/* Header with Purpose */}
        <header className="flex justify-between items-center w-full max-w-4xl mb-8">
          <div className="text-3xl font-bold text-gray-700 dark:text-gray-200">Welcome to your mental health app</div>
          <div className="flex items-center space-x-4 text-gray-700 dark:text-gray-200">
            <span className="text-lg">Hello, {username}</span>
            <span className="text-2xl">👤</span> {/* User icon */}
          </div>
        </header>

        {/* Centered Logo with Description */}
        <div className="text-center">
          <img 
            src="/logo.png" 
            alt="Group embracing" 
            className="h-64 w-64 object-cover mx-auto mb-4"
          />
          <p className="text-gray-600 dark:text-gray-400">Your Companion in Mental Well-being</p>
        </div>

        {/* Main Action Buttons Section */}
        <section className="w-full max-w-4xl grid grid-cols-3 gap-6">
          <div className="flex flex-col items-center p-6 bg-gray-200 dark:bg-gray-700 rounded-xl hover:shadow-lg transition">
            <img src="/icon1.png" alt="Icon 1" className="w-12 h-12 mb-2" />
            <button 
              className="text-lg font-semibold text-gray-700 dark:text-gray-200"
              onClick={() => navigate('/talking-platform')}
              title="Connect and talk with people who understand"
            >
              Talk with people like you
            </button>
          </div>

          <div className="flex flex-col items-center p-6 bg-gray-200 dark:bg-gray-700 rounded-xl hover:shadow-lg transition">
            <img src="/icon2.png" alt="Icon 2" className="w-12 h-12 mb-2" />
            <button 
              className="text-lg font-semibold text-gray-700 dark:text-gray-200"
              onClick={() => navigate('/personal-friend')}
              title="Find a personal friend to confide in"
            >
              Personal friend
            </button>
          </div>

          <div className="flex flex-col items-center p-6 bg-gray-200 dark:bg-gray-700 rounded-xl hover:shadow-lg transition">
            <img src="/icon3.png" alt="Icon 3" className="w-12 h-12 mb-2" />
            <button 
              className="text-lg font-semibold text-gray-700 dark:text-gray-200"
              onClick={() => navigate('/help')}
              title="Reach out for help and support"
            >
              Ask for help
            </button>
          </div>
        </section>
      </div>

      {/* Notifications Box */}
      {showNotifications && (
        <div className="absolute top-20 left-24 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg w-96 p-6 z-50">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Notifications</h2>
          <ul className="space-y-3">
            <li className="text-gray-600 dark:text-gray-300">New message from John</li>
            <li className="text-gray-600 dark:text-gray-300">Your friend liked your post</li>
            <li className="text-gray-600 dark:text-gray-300">Update available</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MainPage;
