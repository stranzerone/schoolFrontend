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

  if (loading) return <div className="text-center text-gray-600">Loading...</div>; // Show loading message
  if (error) return <div className="text-center text-red-500">{error}</div>; // Show error message

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
    <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-8 shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-6">
          <FaUserCircle className="text-7xl text-white" />
          <div>
            <h2 className="text-4xl font-bold text-white">{studentName}</h2>
            <p className="text-xl text-gray-100">Roll No: {studentRollNo}</p>
            <p className="text-xl text-gray-100">Class: {studentClass}</p>
            <p className="text-xl text-gray-100">Age: {age}</p>
            <p className="text-xl text-gray-100">ID: {studentId}</p>
          </div>
        </div>
        <button 
          onClick={() => navigate(`/editStudent/${rollNo}`)}
          className="bg-white text-green-500 px-5 py-3 rounded-md shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out flex items-center space-x-2">
          <FaEdit />
          <span>Edit Profile</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Personal Details</h3>
        <div className="grid grid-cols-2 gap-6 text-lg text-gray-700">
          <div>
            <p className="font-medium">Email:</p>
            <p className="text-gray-600">{email}</p>
          </div>
          <div>
            <p className="font-medium">Phone:</p>
            <p className="text-gray-600">{phone}</p>
          </div>
          <div>
            <p className="font-medium">Address:</p>
            <p className="text-gray-600">{address}</p>
          </div>
          <div>
            <p className="font-medium">Date of Birth:</p>
            <p className="text-gray-600">{dob}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Performance Overview</h3>
        <div className="p-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg">
          <Line data={performance} options={{
            plugins: {
              legend: {
                labels: {
                  color: 'white',
                  font: {
                    size: 14
                  }
                }
              },
              tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                titleColor: 'black',
                bodyColor: 'black',
                footerColor: 'black'
              }
            },
            scales: {
              x: {
                ticks: {
                  color: 'white'
                }
              },
              y: {
                ticks: {
                  color: 'white'
                }
              }
            }
          }} />
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
