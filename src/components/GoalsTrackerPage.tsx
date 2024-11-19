import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Goal {
  _id: string;
  title: string;
  completed: boolean;
  createdAt?: string;
}

const GoalsTrackerPage: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const navigate = useNavigate();

  const toggleMenu = () => setShowMenu((prev) => !prev);

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    localStorage.setItem('darkMode', newDarkModeState.toString());
    document.documentElement.classList.toggle('dark', newDarkModeState);
  };

  // Fetch goals from the server
  const fetchGoals = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/goals', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (!response.ok) throw new Error('Failed to fetch goals');
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new goal
  const addGoal = async () => {
    if (!newGoal.trim()) {
      alert('Goal title cannot be empty');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/goals/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title: newGoal }),
      });
      if (!response.ok) throw new Error('Failed to add goal');
      const data = await response.json();
      setGoals(data.goals);
      setNewGoal('');
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  useEffect(() => {
    fetchGoals();
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between p-4 bg-white shadow-md dark:bg-gray-900 relative">
        {/* Dropdown Menu */}
        <button onClick={toggleMenu} title="Menu" className="text-2xl">
          ☰
        </button>
        {showMenu && (
          <div className="absolute top-12 left-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg w-48 p-2 z-50">
            <button
              onClick={() => {
                navigate('/personal-friend');
                setShowMenu(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Personal Friend
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

      {/* Main Content */}
      <div className="flex-grow p-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Goals Tracker</h2>
        <div className="mb-6">
          <input
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Add a new goal"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md mb-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          />
          <button
            onClick={addGoal}
            className="w-full py-2 bg-green-500 dark:bg-green-700 text-white rounded-md hover:bg-green-600 dark:hover:bg-green-800 transition"
          >
            Add Goal
          </button>
        </div>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <ul className="space-y-4">
            {goals.map((goal) => (
              <li
                key={goal._id}
                className="flex justify-between items-center p-4 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800"
              >
                <span className={`text-lg ${goal.completed ? 'line-through' : ''}`}>
                  {goal.title}
                </span>
                {!goal.completed && (
                  <button
                    onClick={() => console.log('Mark goal complete')} // Replace with completeGoal function
                    className="py-2 px-4 bg-green-500 dark:bg-green-700 text-white rounded-md hover:bg-green-600 dark:hover:bg-green-800 transition"
                  >
                    Complete
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="flex justify-between items-center w-full px-8 py-4 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
        <button onClick={() => navigate('/main')} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl">
          🏠
        </button>
        <button onClick={toggleDarkMode} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl">
          {isDarkMode ? '🌙' : '☀️'}
        </button>
      </div>
    </div>
  );
};

export default GoalsTrackerPage;
