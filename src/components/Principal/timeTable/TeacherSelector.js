// src/components/TeacherSelector.js

import React from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';

const TeacherSelector = ({ teachers, selectedTeacher, selectedClassroom, onSelectTeacher }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Teachers <span className="text-sm">S2: Select Teacher</span></h2>
      <ul>
        {teachers.map((teacher) => (
          <li
            key={teacher._id}
            className={`p-2 mb-4 rounded-lg cursor-pointer flex items-center justify-between ${selectedClassroom ? (selectedTeacher === teacher ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-800') : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            onClick={() => selectedClassroom && onSelectTeacher(teacher)}
            title={!selectedClassroom ? 'Please select a classroom first' : ''}
          >
            <div className="flex items-center">
              <FaChalkboardTeacher className="text-green-500 mr-2" />
              <div>
                <p className="font-semibold">{teacher.teacherName}</p>
                <p className="text-sm text-gray-600">{teacher.subject}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherSelector;
