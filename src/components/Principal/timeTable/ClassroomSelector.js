// src/components/ClassroomSelector.js

import React from 'react';

const ClassroomSelector = ({ classrooms, selectedClassroom, onSelectClassroom }) => {
  return (
    <div className="flex items-center space-x-4 mt-4 mb-6">
      {classrooms.map((classroom) => (
        <button
          key={classroom._id}
          onClick={() => onSelectClassroom(classroom)}
          className={`px-4 py-2 rounded-lg shadow-md ${selectedClassroom === classroom ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-slate-400`}
        >
          {classroom.className}
        </button>
      ))}
    </div>
  );
};

export default ClassroomSelector;
