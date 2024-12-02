import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalFriendPage: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{ from: string; text: string }[]>([]); // Stores chat messages
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const darkModePreference = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkModePreference);
    document.documentElement.classList.toggle('dark', darkModePreference);
  }, []);

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    localStorage.setItem('darkMode', newDarkModeState.toString());
    document.documentElement.classList.toggle('dark', newDarkModeState);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Send message to the chatbot API
  const handleSend = async () => {
    if (message.trim() === '') return; // Prevent sending empty messages

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username'); // Retrieve username from localStorage
    if (!username) {
      console.error("Username is missing");
      alert("Username is missing. Please log in again.");
      navigate('/');
      return;
    }
    if (!token) {
      alert('You need to log in first.');
      navigate('/');
      return;
    }

    if (!username) {
      console.error("User name is missing");
      alert("User name is missing. Please log in again.");
      navigate('/');
      return;
    }

    // Add user message to chat history
    setChatMessages((prev) => [...prev, { from: 'user', text: message }]);
    setMessage(''); // Clear input field

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ username, message }),
      });      
      const data = await response.json();

      if (response.ok && data.response) {
        // Add chatbot response to chat history
        setChatMessages((prev) => [...prev, { from: 'bot', text: data.response }]);
      } else {
        console.error('Error in chatbot response:', data.message);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between p-4 bg-white shadow-md dark:bg-gray-900 relative">
        <button onClick={toggleMenu}>
          <span className="text-2xl">☰</span> {/* Menu icon */}
        </button>
        <h1 className="text-xl font-semibold dark:text-white">Personal Friend</h1>
        <div className="flex items-center space-x-4">

          <button>
            <span className="text-2xl dark:text-white">👤</span> {/* Profile icon */}
          </button>
        </div>

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="absolute top-12 left-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg w-48 p-2 z-50">
            <button
              onClick={() => {
                navigate('/goals-tracker');
                setShowMenu(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Goals Tracker
            </button>
            <button
              onClick={() => {
                navigate('/help');
                setShowMenu(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Ask for Help
            </button>
          </div>
        )}
      </div>

      {/* Chat Section */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
        {chatMessages.map((chat, index) => (
          <div
            key={index}
            className={`flex ${chat.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`${
                chat.from === 'user' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              } p-3 rounded-lg max-w-xs`}
            >
              {chat.text}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input Field */}
      <div className="flex items-center p-4 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
        <input
          type="text"
          placeholder="How do you feel today my friend?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow px-4 py-2 mr-4 bg-gray-200 dark:bg-gray-700 rounded-full outline-none text-gray-800 dark:text-gray-200"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold"
        >
          SEND
        </button>
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
      <div className="flex justify-between w-full px-8 py-4 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
        <button onClick={() => navigate('/main')} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl">🏠</button>
        <button onClick={toggleDarkMode} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl">🌙</button>
        <button onClick={toggleNotifications} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl">🔔</button>
      </div>
    </div>
  );
};

export default PersonalFriendPage;
