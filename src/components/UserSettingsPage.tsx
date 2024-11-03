import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">User Settings</h1>
      <p className="text-gray-700">Here, you can change your account settings.</p>
    </div>
  );
};

export default SettingsPage;
