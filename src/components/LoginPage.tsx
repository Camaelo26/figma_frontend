import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Add any authentication logic here if needed
    navigate('/main'); // Navigate to the main page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">BE WITH</h1>
        <img 
          src="/logo.png" 
          alt="Group embracing" 
          className="mx-auto mb-4 h-64 w-64 object-cover" 
        />
        <p className="text-gray-600 text-lg">Never be alone</p>
      </div>

      {/* Input Fields and Button */}
      <div className="w-80">
        <input 
          type="text" 
          placeholder="Username" 
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-3xl focus:outline-none focus:border-teal-500" 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-3xl focus:outline-none focus:border-teal-500" 
        />
        <button 
          onClick={handleSignIn} // Navigate on click
          className="w-full py-3 bg-teal-600 text-white rounded-3xl text-3xl font-semibold hover:bg-teal-700 transition"
        >
          SIGN IN
        </button>

        {/* Additional Links */}
        <div className="flex justify-between mt-6 text-gray-500 text-sm">
          <a href="/create-account" className="hover:underline">CREATE ACCOUNT</a>
          <a href="/forgot-password" className="hover:underline">FORGOT PASSWORD?</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
