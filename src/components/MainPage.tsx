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
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800 py-10">
      {/* Header Section with Username */}
      <div className="w-full flex justify-end px-8 mb-4">
        <div 
          className="flex items-center space-x-2 cursor-pointer text-gray-700 dark:text-gray-200" 
          onClick={() => navigate('/user-settings')}
        >
          <span className="font-semibold">{username}</span>
          <span className="text-2xl">👤</span> {/* User icon */}
        </div>
      </div>

      {/* Centered Logo Image */}
      <div className="mb-10">
        <img 
          src="/logo.png" 
          alt="Group embracing" 
          className="h-48 w-48 object-cover mx-auto"
        />
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col gap-6 w-80 mx-auto">
        <div className="flex items-center">
          <img src="/icon1.png" alt="Icon 1" className="w-10 h-10 mr-4" />
          <button 
            className="flex-grow p-6 bg-gray-200 dark:bg-gray-700 text-left text-lg rounded-3xl text-gray-700 dark:text-gray-200"
            onClick={() => navigate('/talking-platform')}
          >
            Talk with people like you
          </button>
        </div>
        
        <div className="flex items-center">
          <img src="/icon2.png" alt="Icon 2" className="w-10 h-10 mr-4" />
          <button 
            className="flex-grow p-6 bg-gray-200 dark:bg-gray-700 text-left text-lg rounded-3xl text-gray-700 dark:text-gray-200"
            onClick={() => navigate('/personal-friend')}
          >
            Personal friend
          </button>
        </div>
        
        <div className="flex items-center">
          <img src="/icon3.png" alt="Icon 3" className="w-10 h-10 mr-4" />
          <button 
            className="flex-grow p-6 bg-gray-200 dark:bg-gray-700 text-left text-lg rounded-3xl text-gray-700 dark:text-gray-200"
            onClick={() => navigate('/help')}
          >
            Ask for help
          </button>
        </div>
      </div>

      {/* Notifications Box */}
      {showNotifications && (
        <div className="absolute top-20 right-8 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg w-80 p-4 z-50">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Notifications</h2>
          <ul className="space-y-3">
            <li className="text-gray-600 dark:text-gray-300">New message from John</li>
            <li className="text-gray-600 dark:text-gray-300">Your friend liked your post</li>
            <li className="text-gray-600 dark:text-gray-300">Update available</li>
          </ul>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div className="flex justify-between w-full px-16 py-2 mt-auto bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
        <button onClick={() => navigate('/')} className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400 text-3xl">🏠</button> {/* Home button now navigates to login page */}
        <button onClick={toggleNotifications} className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400 text-3xl">🔔</button>
        <button onClick={toggleDarkMode} className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400 text-3xl">🌙</button>
      </div>
    </div>
  );
};

export default MainPage;
