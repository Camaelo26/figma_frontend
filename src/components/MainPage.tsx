import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [logoAnimation, setLogoAnimation] = useState<any | null>(null);
  const [goalTrackerAnimation, setGoalTrackerAnimation] = useState<any | null>(null);
  const [personalFriendAnimation, setPersonalFriendAnimation] = useState<any | null>(null);
  const [helpAnimation, setHelpAnimation] = useState<any | null>(null);

  // Fetch animations from the public folder
  useEffect(() => {
    const fetchAnimations = async () => {
      try {
        const logoData = await fetch(`${process.env.PUBLIC_URL}/logo_main_login.json`).then(res => res.json());
        const goalTrackerData = await fetch(`${process.env.PUBLIC_URL}/Goal_tracker.json`).then(res => res.json());
        const personalFriendData = await fetch(`${process.env.PUBLIC_URL}/personal_friend.json`).then(res => res.json());
        const helpData = await fetch(`${process.env.PUBLIC_URL}/Help.json`).then(res => res.json());
        
        setLogoAnimation(logoData);
        setGoalTrackerAnimation(goalTrackerData);
        setPersonalFriendAnimation(personalFriendData);
        setHelpAnimation(helpData);
      } catch (error) {
        console.error("Error fetching animations:", error);
      }
    };

    fetchAnimations();
  }, []);

  // Fetch user profile data on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      if (!userId) {
        navigate('/login');
      }
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            console.error('Unauthorized access - redirecting to login');
            navigate('/');
          } else {
            console.warn('Failed to fetch profile - using fallback');
          }
          return;
        }

        const data = await response.json();
        setUsername(data.username || 'Guest');
        if (data.username) localStorage.setItem('username', data.username);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setUsername('Guest');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const darkModePreference = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkModePreference);
    document.documentElement.classList.toggle('dark', darkModePreference);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    localStorage.setItem('darkMode', newDarkModeState.toString());
    document.documentElement.classList.toggle('dark', newDarkModeState);
  };

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
      </nav>

      {/* Main Content Section */}
      <div className="flex-grow flex flex-col items-center p-10 space-y-10 relative">
        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleDarkMode}
          className="absolute top-6 right-6 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400 text-3xl"
          title="Toggle Dark Mode"
        >
          🌙
        </button>

        {/* Header */}
        <header className="flex justify-between items-center w-full max-w-4xl mb-8">
          <div className="text-3xl font-bold text-gray-700 dark:text-gray-200">Welcome to your mental health app</div>
          <div className="flex items-center space-x-4 text-gray-700 dark:text-gray-200">
            <span className="text-lg">
              Hello, {isLoading ? "Loading..." : username || "Guest"}
            </span>
            <span className="text-2xl">👤</span>
          </div>
        </header>

        {/* Centered Logo with Lottie */}
        <div className="text-center">
          {logoAnimation ? (
            <Lottie animationData={logoAnimation} loop autoplay style={{ width: 300, height: 300 }} />
          ) : (
            <p>Loading logo...</p>
          )}
          <p className="text-gray-600 dark:text-gray-400">Your Companion in Mental Well-being</p>
        </div>

        {/* Main Action Buttons */}
        <section className="w-full max-w-4xl grid grid-cols-3 gap-6">
          <div className="flex flex-col items-center p-6 bg-gray-200 dark:bg-gray-700 rounded-xl hover:shadow-lg transition">
            {goalTrackerAnimation ? (
              <Lottie animationData={goalTrackerAnimation} loop autoplay style={{ width: 80, height: 80 }} />
            ) : (
              <p>Loading...</p>
            )}
            <button 
              className="text-lg font-semibold text-gray-700 dark:text-gray-200"
              onClick={() => navigate('/goals-tracker')}
              title="Set and track your goals"
            >
              Goals Tracker
            </button>
          </div>

          <div className="flex flex-col items-center p-6 bg-gray-200 dark:bg-gray-700 rounded-xl hover:shadow-lg transition">
            {personalFriendAnimation ? (
              <Lottie animationData={personalFriendAnimation} loop autoplay style={{ width: 80, height: 80 }} />
            ) : (
              <p>Loading...</p>
            )}
            <button 
              className="text-lg font-semibold text-gray-700 dark:text-gray-200"
              onClick={() => navigate('/personal-friend')}
              title="Find a personal friend to confide in"
            >
              Personal Friend
            </button>
          </div>

          <div className="flex flex-col items-center p-6 bg-gray-200 dark:bg-gray-700 rounded-xl hover:shadow-lg transition">
            {helpAnimation ? (
              <Lottie animationData={helpAnimation} loop autoplay style={{ width: 80, height: 80 }} />
            ) : (
              <p>Loading...</p>
            )}
            <button 
              className="text-lg font-semibold text-gray-700 dark:text-gray-200"
              onClick={() => navigate('/help')}
              title="Reach out for help and support"
            >
              Ask for Help
            </button>
          </div>
        </section>
      </div>

      {/* Notifications */}
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
