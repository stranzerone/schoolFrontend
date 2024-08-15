import React from 'react';
import { FaChalkboardTeacher, FaUserGraduate, FaSchool, FaRegCalendarAlt, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SeatsPieChart from '../Charts/SeatsPieChart';
import StudentGrowthChart from '../Charts/StudentGrowthChart';

const PrincipalDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Principal Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Teachers Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-green-600">Teachers</h2>
            <FaChalkboardTeacher className="text-green-600 text-3xl" />
          </div>
          <p className="text-gray-600 mb-4">
            Manage all teachers, add new ones, and update their information.
          </p>
          <button onClick={() => navigate("/addTeacher")} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
            Add Teachers
          </button>
        </div>

        {/* Students Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-green-600">Students</h2>
            <FaUserGraduate className="text-green-600 text-3xl" />
          </div>
          <p className="text-gray-600 mb-4">
            Access all student records, enroll new students, and manage their data.
          </p>
          <button onClick={() => navigate("/addStudent")} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
            Add Students
          </button>
        </div>

        {/* Classrooms Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-green-600">Classrooms</h2>
            <FaSchool className="text-green-600 text-3xl" />
          </div>
          <p className="text-gray-600 mb-4">
            Organize classrooms, assign teachers, and manage schedules.
          </p>
          <button onClick={() => navigate("/createClassRoom")} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
            Create Classrooms
          </button>
        </div>

        {/* Create Timetable Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-green-600">Create Timetable</h2>
            <FaRegCalendarAlt className="text-green-600 text-3xl" />
          </div>
          <p className="text-gray-600 mb-4">
            Design and organize class timetables, assign subjects, and manage schedules.
          </p>
          <button onClick={() => navigate("/createTimetable")} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
            Create Timetable
          </button>
        </div>

        {/* View Timetables Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-green-600">View Timetables</h2>
            <FaCalendarAlt className="text-green-600 text-3xl" />
          </div>
          <p className="text-gray-600 mb-4">
            View and manage all class timetables in one place.
          </p>
          <button onClick={() => navigate("/classTimeTable")} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
            View Timetables
          </button>
        </div>
      </div>

      <div className="mt-8">
        <SeatsPieChart />
        <StudentGrowthChart />
      </div>
    </div>
  );
};

export default PrincipalDashboard;
