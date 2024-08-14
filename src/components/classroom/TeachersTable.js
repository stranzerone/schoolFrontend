// src/pages/ClassTimetablePage.js

import React from 'react';
import { Link } from 'react-router-dom';

// Dummy data for class timetable
const classData = {
  timetable: [
    { day: 'Monday', subject: 'Math: 9 AM - 10 AM', teacher: 'Mr. Smith' },
    { day: 'Tuesday', subject: 'Science: 10 AM - 11 AM', teacher: 'Ms. Johnson' },
    { day: 'Wednesday', subject: 'English: 11 AM - 12 PM', teacher: 'Mr. Smith' },
    { day: 'Thursday', subject: 'History: 1 PM - 2 PM', teacher: 'Ms. Johnson' },
    { day: 'Friday', subject: 'Art: 2 PM - 3 PM', teacher: 'Mr. Adams' }
  ]
};

const ClassTimetablePage = () => {
  return (
    <div className="w-auto h-screen p-6 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Class Timetable</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>

            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {classData.timetable.map((entry, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.subject}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassTimetablePage;
