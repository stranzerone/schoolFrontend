import React from 'react';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StudentProfile = ({rollNo="1234"}) => {

  const navigate = useNavigate()
  // Dummy data for student
  const student = {
    name: 'John Doe',
    rollNo: '001',
    class: '10th Grade',
    section: 'A',
    performance: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Math',
          data: [85, 88, 90, 92, 91, 93],
          borderColor: '#4CAF50',
          fill: false,
        },
        {
          label: 'Science',
          data: [75, 78, 80, 82, 81, 83],
          borderColor: '#2196F3',
          fill: false,
        },
      ],
    },
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <FaUserCircle className="text-7xl text-gray-400" />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{student.name}</h2>
            <p className="text-xl text-gray-600">Roll No: {student.rollNo}</p>
            <p className="text-xl text-gray-600">Class: {student.class}</p>
            <p className="text-xl text-gray-600">Section: {student.section}</p>
          </div>
        </div>
        <button 
        onClick={()=>navigate(`/editStudent/${rollNo}`)}
        className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm flex items-center space-x-2">
          <FaEdit />
          <span>Edit Profile</span>
        </button>
      </div>

     

      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Personal Details</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-lg font-medium text-gray-700">Email:</p>
            <p className="text-lg text-gray-600">john.doe@example.com</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">Phone:</p>
            <p className="text-lg text-gray-600">+123 456 7890</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">Address:</p>
            <p className="text-lg text-gray-600">123 Main St, Springfield</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">Date of Birth:</p>
            <p className="text-lg text-gray-600">January 1, 2000</p>
          </div>
        </div>
      </div>
      <div className="bg-green-500 text-white p-6 rounded-lg mb-8">
        <h3 className="text-2xl font-semibold mb-4">Performance Overview</h3>
        <Line data={student.performance} />
      </div>
    </div>
  );
};

export default StudentProfile;
