import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  // Handle navigation to the main page
  const handleSignIn = () => {
    navigate('/main');
  };

  // Redirects to the respective login page URLs
  const handleSocialRedirect = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'Google':
        url = 'https://accounts.google.com/signin';
        break;
      case 'Facebook':
        url = 'https://www.facebook.com/login';
        break;
      case 'Twitter':
        url = 'https://twitter.com/login';
        break;
      default:
        break;
    }
    window.open(url, '_blank'); // Opens the URL in a new tab
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-gray-800 mb-2">BE WITH</h1>
        <p className="text-teal-600 text-lg font-semibold">Your Companion in Mental Well-being</p>
        <img 
          src="/logo.png" 
          alt="Group embracing" 
          className="mx-auto mb-4 h-64 w-64 object-cover" 
        />
        <p className="text-gray-600 text-lg">Never be alone. We’re here to listen and support.</p>
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
          onClick={handleSignIn}
          className="w-full py-3 bg-teal-600 text-white rounded-3xl text-3xl font-semibold hover:bg-teal-700 transition"
        >
          SIGN IN
        </button>

        {/* Social Login Options */}
        <div className="my-6 space-y-3">
          <button 
            onClick={() => handleSocialRedirect('Google')}
            className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-full hover:bg-gray-100 transition shadow-md"
          >
            <img src="/google.png" alt="Google" className="h-6 w-6 mr-3" />
            <span className="font-semibold text-gray-600">Sign in with Google</span>
          </button>
          <button 
            onClick={() => handleSocialRedirect('Facebook')}
            className="flex items-center justify-center w-full py-2 px-4 border border-blue-600 rounded-full hover:bg-blue-100 transition shadow-md"
          >
            <img src="/facebook.png" alt="Facebook" className="h-6 w-6 mr-3" />
            <span className="font-semibold text-blue-600">Sign in with Facebook</span>
          </button>
          <button 
            onClick={() => handleSocialRedirect('Twitter')}
            className="flex items-center justify-center w-full py-2 px-4 border border-blue-400 rounded-full hover:bg-blue-50 transition shadow-md"
          >
            <img src="/twitter.png" alt="Twitter" className="h-6 w-6 mr-3" />
            <span className="font-semibold text-blue-400">Sign in with Twitter</span>
          </button>
        </div>

        {/* Additional Links */}
        <div className="flex justify-between mt-6 text-gray-500 text-sm">
          <a href="/create-account" className="hover:underline">CREATE ACCOUNT</a>
          <a href="/forgot-password" className="hover:underline">FORGOT PASSWORD?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
