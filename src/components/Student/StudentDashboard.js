import React from 'react';
import { FaChalkboard, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Student Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* My Classroom Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-blue-600">My Classroom</h2>
            <FaChalkboard className="text-blue-600 text-3xl" />
          </div>
          <p className="text-gray-600 mb-4">
            View and manage your classroom activities, assignments, and interactions.
          </p>
          <button
            onClick={() => navigate("/myClassroom")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            View Classroom
          </button>
        </div>

        {/* My Timetable Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-blue-600">Check Timetable</h2>
            <FaCalendarAlt className="text-blue-600 text-3xl" />
          </div>
          <p className="text-gray-600 mb-4">
            Check your class schedule, upcoming classes, and manage your time.
          </p>
          <button
            onClick={() => navigate("/classTimeTable")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            View Timetable
          </button>
        </div>

        {/* My Profile Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-blue-600">My Profile</h2>
            <FaUser className="text-blue-600 text-3xl" />
          </div>
          <p className="text-gray-600 mb-4">
            View and update your personal information, contact details, and profile settings.
          </p>
          <button
            onClick={() => navigate("/studentProfile/"+localStorage.getItem('user'))}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
