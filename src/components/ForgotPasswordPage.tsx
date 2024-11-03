import React, { useState } from 'react';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = () => {
    // Placeholder for password reset logic, e.g., API call
    setMessage(`A password reset link has been sent to ${email}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Forgot Password</h1>
      
      {/* Form Section */}
      <div className="w-96 bg-white p-8 rounded-lg shadow-lg">
        <p className="text-gray-600 mb-6">
          Enter your email address and we’ll send you a link to reset your password.
        </p>
        
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500" 
        />
        
        <button 
          onClick={handleResetPassword} 
          className="w-full py-3 bg-teal-600 text-white rounded-lg text-lg font-semibold hover:bg-teal-700 transition"
        >
          Send Reset Link
        </button>

        {/* Success Message */}
        {message && (
          <div className="mt-4 text-green-600 text-center">
            {message}
          </div>
        )}
      </div>

      {/* Link to Login Page */}
      <div className="mt-4">
        <p className="text-gray-600">
          Remember your password?{' '}
          <a href="/" className="text-teal-600 hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
