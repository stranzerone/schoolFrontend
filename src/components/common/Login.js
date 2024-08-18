import React, { useState, useEffect } from 'react';
import { loginStudent } from '../../Apis/StudentApi';
import { teacherLogin } from '../../Apis/TeacherApi';
import { principalLogin } from '../../Apis/TeacherApi';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaCalendarAlt } from 'react-icons/fa'; // Icons for form fields
import { RingLoader } from 'react-spinners'; // Import a loader component
import Notification from './Notification';
const LoginPage = () => {
  const [userType, setUserType] = useState('teacher');
  const [rollNo, setRollNo] = useState(''); // For Student
  const [studentId, setStudentId] = useState(''); // For Student
  const [teacherId, setTeacherId] = useState(''); // For Teacher
  const [dateOfBirth, setDateOfBirth] = useState(''); // For Teacher
  const [username, setUsername] = useState(''); // For Principal
  const [password, setPassword] = useState(''); // For Principal
  const [loading, setLoading] = useState(false); // Add loading state
  const [timer, setTimer] = useState(50); // Timer state
  const [warning, setWarning] = useState(''); // Warning state for invalid credentials
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    let interval;
    if (loading && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setLoading(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [loading, timer]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true); // Show loader
    setWarning(''); // Clear any previous warnings
    setTimer(50); // Reset timer

    try {
      let response;

      if (userType === 'student') {
        response = await loginStudent({ rollNo, studentId });
      } else if (userType === 'teacher') {
        response = await teacherLogin({ teacherId, dateOfBirth });
      } else if (userType === 'principal') {
        response = await principalLogin({ username, password });
      }

      console.log(response);
      localStorage.setItem('status', response.status);
      localStorage.setItem('user', response.data.split(' ')[1]);
      
      if (response && response.status === 200) {
        navigate('/principalDashboard');
      } 
      if (response && response.status === 201) {
        navigate('/teacherDashboard');
      } 
      if (response && response.status === 202) {
        navigate('/studentDashboard');
      } 
      if (response && response.status === 210) {
        setNotification({ message: 'Invalid Credentials', type: 'error' });

      }
    } catch (error) {
      setNotification({ message: 'Something went wrong while login.', type: 'error' });
      console.error('Login error:', error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleGuestLogin = () => {
    setUserType('student');
    setRollNo('A1');
    setStudentId('137206');
    handleLogin({
      preventDefault: () => {}, // Prevent the default form submission behavior
    });
  };

  const handleCloseNotification = () => {
    setNotification({ message: '', type: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-6">
         {notification.message && (
        <Notification message={notification.message} type={notification.type} onClose={handleCloseNotification} />
      )}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="flex flex-col items-center">
            <RingLoader color="#fff" size={80} />
            <p className="text-white text-xl mt-4">Logging in... Please wait</p>
          </div>
        </div>
      )}
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-md w-full relative z-10">
        {warning && (
          <div className="text-red-600 text-center mb-4">{warning}</div>
        )}
        <div className="text-center text-gray-700 text-sm mb-4">
          {loading && `Time remaining: ${timer} seconds`}
        </div>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            I am a:
          </label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
          >
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
            <option value="principal">Principal</option>
          </select>
        </div>
        <form onSubmit={handleLogin}>
          {userType === 'student' && (
            <>
              <div className="mb-4 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Roll No (Username)
                </label>
                <input
                  type="text"
                  placeholder="Enter your roll number"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
                  required
                />
              
              </div>
              <div className="mb-4 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Student ID (Password)
                </label>
                <input
                  type="password"
                  placeholder="Enter your student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
                  required
                />
            
              </div>
            </>
          )}

          {userType === 'teacher' && (
            <>
              <div className="mb-4 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Teacher ID (Username)
                </label>
                <input
                  type="text"
                  placeholder="Enter your teacher ID"
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
                  required
                />
           
              </div>
              <div className="mb-4 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Date of Birth (Password)
                </label>
                <input
                  type="date"
                  placeholder="Enter your date of birth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
                  required
                />
            
              </div>
            </>
          )}

          {userType === 'principal' && (
            <>
              <div className="mb-4 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
                  required
                />
         
              </div>
              <div className="mb-4 relative">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
                  required
                />
            
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleGuestLogin}
          className="mt-4 w-full bg-green-600 text-white p-3 rounded-lg shadow-md hover:bg-green-700 transition duration-200"
        >
          Guest Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
