import React, { useState, useEffect } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import { getStudentByRollNo } from '../../Apis/StudentApi'; // Adjust the import path if necessary

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StudentProfile = () => {
  const { rollNo } = useParams(); // Get rollNo from URL parameters
  const navigate = useNavigate();

  const [student, setStudent] = useState(null); // State for student data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const data = await getStudentByRollNo(rollNo); // Fetch student data from API
        setStudent(data); // Set student data to state
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError('Error fetching student data'); // Handle error
        setLoading(false); // Set loading to false on error
      }
    };

    fetchStudentData(); // Call function to fetch data
  }, [rollNo]); // Re-fetch data if rollNo changes

  if (loading) return <div>Loading...</div>; // Show loading message
  if (error) return <div>{error}</div>; // Show error message

  // Default values in case student data is incomplete
  const {
    studentName = 'N/A',
    rollNo: studentRollNo = 'N/A',
    studentClass = 'N/A',
    age = 'N/A',
    studentId = 'N/A',
    email = 'N/A',
    phone = 'N/A',
    address = 'N/A',
    dob = 'N/A',
    performance = {
      labels: [],
      datasets: []
    }
  } = student || {}; // Use empty object as default if student is null

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <FaUserCircle className="text-7xl text-gray-400" />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{studentName}</h2>
            <p className="text-xl text-gray-600">Roll No: {studentRollNo}</p>
            <p className="text-xl text-gray-600">Class: {studentClass}</p>
            <p className="text-xl text-gray-600">Age: {age}</p>
            <p className="text-xl text-gray-600">ID: {studentId}</p>
          </div>
        </div>
        <button 
          onClick={() => navigate(`/editStudent/${rollNo}`)}
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
            <p className="text-lg text-gray-600">{email}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">Phone:</p>
            <p className="text-lg text-gray-600">{phone}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">Address:</p>
            <p className="text-lg text-gray-600">{address}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">Date of Birth:</p>
            <p className="text-lg text-gray-600">{dob}</p>
          </div>
        </div>
      </div>

      <div className="bg-green-500 text-white p-6 rounded-lg mb-8">
        <h3 className="text-2xl font-semibold mb-4">Performance Overview</h3>
        <Line data={performance} />
      </div>
    </div>
  );
};

export default StudentProfile;
