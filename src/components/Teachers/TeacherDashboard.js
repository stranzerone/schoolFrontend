import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-green-800 text-center mb-8">
        Teacher Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* View Students Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-blue-600">View Students</h2>
            <div className="text-blue-600 text-3xl">🎓</div>
          </div>
          <p className="text-gray-600 mb-4">
            View the list of students in your classroom, edit their details, or remove them.
          </p>
          <button 
            onClick={() => navigate("/allStudents")} 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Go to Students
          </button>
        </div>

        {/* Edit Student Details Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-green-600">Edit Student Details</h2>
            <div className="text-green-600 text-3xl">✏️</div>
          </div>
          <p className="text-gray-600 mb-4">
            Update student information and manage their records.
          </p>
          <button 
            onClick={() => navigate("/allStudents")} 
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Edit Details
          </button>
        </div>

        {/* Create Timetable Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-purple-600">Create Timetable</h2>
            <div className="text-purple-600 text-3xl">📅</div>
          </div>
          <p className="text-gray-600 mb-4">
            Create and manage the timetable for your classroom.
          </p>
          <button 
            onClick={() => navigate("/classTimeTable")} 
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
          >
            Create Timetable
          </button>
        </div>

    
      </div>
    </div>
  );
};

export default TeacherDashboard;
