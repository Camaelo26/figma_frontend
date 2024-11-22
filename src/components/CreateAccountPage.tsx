import React, { useState } from 'react';


const CreateAccountPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(''); // Message for success or error feedback

  const handleCreateAccount = async () => {
    // Check if passwords match before making the API call
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage('Account created successfully. Please log in.');
      } else {
        setMessage(data.message || 'Failed to create account');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Create Account</h1>

      {/* Form Section */}
      <div className="w-96 bg-white p-8 rounded-lg shadow-lg">
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500" 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500" 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500" 
        />
        <input 
          type="password" 
          placeholder="Confirm Password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500" 
        />
        <button 
          onClick={handleCreateAccount} 
          className="w-full py-3 bg-teal-600 text-white rounded-lg text-lg font-semibold hover:bg-teal-700 transition"
        >
          Sign Up
        </button>
        
        {/* Display Success/Error Message */}
        {message && (
          <p className={`mt-4 text-center ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </div>

      {/* Link to Login Page */}
      <div className="mt-4">
        <p className="text-gray-600">
          Already have an account?{' '}
          <a href="/" className="text-teal-600 hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default CreateAccountPage;
