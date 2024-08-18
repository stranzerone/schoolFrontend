import React from 'react';
import { FaLock } from 'react-icons/fa';

const NotAuthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-400">
      <div className="bg-white shadow-lg rounded-lg p-10 text-center max-w-lg">
        <FaLock className="text-red-500 text-6xl mb-4 mx-auto" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-lg text-gray-600 mb-4">
          You do not have permission to view this page.
        </p>
        <button
          onClick={() => window.history.back()}
          className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 ease-in-out"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotAuthorized;
