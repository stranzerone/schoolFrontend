import React, { useState } from 'react';
import { loginStudent } from '../../Apis/StudentApi';
import { teacherLogin } from '../../Apis/TeacherApi';
import { principalLogin } from '../../Apis/TeacherApi';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaCalendarAlt } from 'react-icons/fa'; // Icons for form fields
import { RingLoader } from 'react-spinners'; // Import a loader component

const LoginPage = () => {
  const [userType, setUserType] = useState('teacher');
  const [rollNo, setRollNo] = useState(''); // For Student
  const [studentId, setStudentId] = useState(''); // For Student
  const [teacherId, setTeacherId] = useState(''); // For Teacher
  const [dateOfBirth, setDateOfBirth] = useState(''); // For Teacher
  const [username, setUsername] = useState(''); // For Principal
  const [password, setPassword] = useState(''); // For Principal
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true); // Show loader

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
        navigate('/studentProfile/' + rollNo);
      } 
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-md w-full relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
            <RingLoader color="#3498db" size={60} />
          </div>
        ) : null}
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
                <div className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                  <FaUser />
                </div>
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
                <div className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                  <FaLock />
                </div>
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
                <div className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                  <FaUser />
                </div>
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
                <div className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                  <FaCalendarAlt />
                </div>
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
                <div className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                  <FaUser />
                </div>
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
                <div className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                  <FaLock />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Logging in...' : `Login as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
