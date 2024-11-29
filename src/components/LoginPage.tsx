import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react'; // Import Lottie for web animations

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [animationData, setAnimationData] = useState<any | null>(null);

  // Load the Lottie JSON animation from the public folder
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/logo_login.json`)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error('Error loading Lottie animation:', error));
  }, []);

  const handleSignIn = async () => {
    setErrorMessage(null);
    console.log('Attempting to log in...'); 
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      console.log('Response:', response);
  
      const data = await response.json();
      console.log('Response data:', data);
  
      if (response.ok && data.token) {
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('token', data.token);
        navigate('/main'); // Redirect to main page
      } else {
        console.error('Error in response:', data.message);
        setErrorMessage(data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };
  
  

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
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-gray-800 mb-2">BE WITH</h1>
        {/* Use Lottie animation */}
        <div className="mx-auto mb-4">
          {animationData ? (
            <Lottie
              animationData={animationData}
              loop
              autoplay
              style={{ width: 310, height: 310 }} // Adjust the size of the logo here
            />
          ) : (
            <p>Loading animation...</p>
          )}
        </div>
        <p className="text-teal-600 text-lg font-semibold">Your Companion in Mental Well-being</p>
        <p className="text-gray-600 text-lg">Never be alone. We’re here to listen and support.</p>
      </div>

      {/* Input Fields and Button */}
      <div className="w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-3xl focus:outline-none focus:border-teal-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-3xl focus:outline-none focus:border-teal-500"
        />
        <button
          onClick={handleSignIn}
          className="w-full py-3 bg-teal-600 text-white rounded-3xl text-3xl font-semibold hover:bg-teal-700 transition"
        >
          SIGN IN
        </button>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
        )}

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
