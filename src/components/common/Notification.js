import React from 'react';

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg text-white 
        ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} z-50`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white font-bold">X</button>
      </div>
    </div>
  );
};

export default Notification;
