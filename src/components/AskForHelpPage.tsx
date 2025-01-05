import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AskForHelpPage: React.FC = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between p-4 bg-white shadow-md dark:bg-gray-900 relative">
        <button onClick={toggleMenu}>
          <span className="text-2xl">☰</span> {/* Menu icon */}
        </button>
        <h1 className="text-xl font-semibold dark:text-white">Ask for Help</h1>
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
              Goal tracker
            </button>
            <button
              onClick={() => {
                navigate('/personal-friend');
                setShowMenu(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Talk with a Friend
            </button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
        {/* Immediate Help Section */}
        <div className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Immediate Assistance</h2>
          <p>If you need immediate help, please contact one of the following resources:</p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>
              <strong>Texas Tech Crisis Helpline:</strong> 806.742.5555 (Available 24/7)
            </li>
            <li>
              <strong>National Suicide Prevention Lifeline:</strong> 1.800.273.8255
            </li>
            <li>
              <strong>Emergency Services:</strong> Dial 911
            </li>
          </ul>
        </div>

        {/* On-Campus Resources */}
        <div className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">On-Campus Resources</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Student Counseling Center:</strong> 806.742.3674
              <br />
              <span className="text-sm">Provides individual and group counseling services.</span>
            </li>
            <li>
              <strong>Student Health Services:</strong> 806.743.2848
              <br />
              <span className="text-sm">Offers medical and behavioral health services.</span>
            </li>
            <li>
              <strong>Risk Intervention & Safety Education (RISE):</strong> 806.742.2110
              <br />
              <span className="text-sm">Provides education on wellness and safety topics.</span>
            </li>
          </ul>
        </div>

        {/* Additional Resources with Links */}
        <div className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Additional Resources</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <a
                href="https://www.depts.ttu.edu/studenthealth/AlcoholandDrugResources/"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Alcohol and Drug Resources
              </a>
            </li>
            <li>
              <a
                href="https://www.depts.ttu.edu/studenthealth/MentalHealthResourceslist/index.php"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mental Health Resources
              </a>
            </li>
            <li>
              <a
                href="https://www.depts.ttu.edu/rise/"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Risk Intervention & Safety Education (RISE)
              </a>
            </li>
            <li>
              <a
                href="https://www.depts.ttu.edu/rise/TAO.php"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Therapy Assistance Online (TAO)
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="flex justify-between w-full px-8 py-4 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
        <button onClick={() => navigate('/main')} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-3xl">🏠</button>
        <button onClick={toggleDarkMode} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-3xl">🌙</button>
      </div>
    </div>
  );
};

export default AskForHelpPage;
