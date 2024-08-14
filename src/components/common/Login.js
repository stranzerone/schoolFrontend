import React, { useState } from 'react';
import { loginStudent } from '../../Apis/StudentApi';
import { teacherLogin } from '../../Apis/TeacherApi';
import { principalLogin } from '../../Apis/TeacherApi';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const [userType, setUserType] = useState('teacher');
  const [rollNo, setRollNo] = useState(''); // For Student
  const [studentId, setStudentId] = useState(''); // For Student
  const [teacherId, setTeacherId] = useState(''); // For Teacher
  const [dateOfBirth, setDateOfBirth] = useState(''); // For Teacher
  const [username, setUsername] = useState(''); // For Principal
  const [password, setPassword] = useState(''); // For Principal
const navigate = useNavigate()
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      let response;

      if (userType === 'student') {
        response = await loginStudent({ rollNo, studentId });
      } else if (userType === 'teacher') {
        response = await teacherLogin({ teacherId, dateOfBirth });
      } else if (userType === 'principal') {
        response = await principalLogin({ username, password });
      }

      console.log(response)
      if (response && response.status === 200) {
        navigate('/principalDashboard')
      } 
      if (response && response.status === 201) {
        navigate('/teacherDashboard')
      } 
      if (response && response.status === 202) {
        navigate('/studentProfile/'+rollNo)
      } 
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            I am a:
          </label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
            <option value="principal">Principal</option>
          </select>
        </div>
        <form onSubmit={handleLogin}>
          {userType === 'student' && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Roll No (Username)
                </label>
                <input
                  type="text"
                  placeholder="Enter your roll number"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Student ID (Password)
                </label>
                <input
                  type="password"
                  placeholder="Enter your student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </>
          )}

          {userType === 'teacher' && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Teacher ID (Username)
                </label>
                <input
                  type="text"
                  placeholder="Enter your teacher ID"
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Date of Birth (Password)
                </label>
                <input
                  type="date"
                  placeholder="Enter your date of birth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </>
          )}

          {userType === 'principal' && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login as {userType.charAt(0).toUpperCase() + userType.slice(1)}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
