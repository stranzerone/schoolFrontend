import React, { useState } from 'react';
import { FaUser, FaIdCard, FaBirthdayCake, FaChalkboardTeacher, FaPlus } from 'react-icons/fa';
import { createStudent } from '../../Apis/StudentApi';
const AddStudent = () => {
  const [studentName, setStudentName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [age, setAge] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
const [studentId,setStudentId] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const studentData = {
        studentName,
        rollNo,
        age,
        studentClass,
        studentId
      };

      const response = await createStudent(studentData);
      
      if (response === 201) {
        // Clear form fields
        setStudentName('');
        setRollNo('');
        setAge('');
        setStudentClass('');
        alert('Student added successfully!');
      }
    } catch (error) {
      setError('Failed to add student. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex items-center">
          <FaUser className="text-green-600 mr-3" />
          <input
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <FaIdCard className="text-green-600 mr-3" />
          <input
            type="text"
            placeholder="Roll No"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <FaIdCard className="text-green-600 mr-3" />
          <input
            type="text"
            placeholder="Student Id"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <FaBirthdayCake className="text-green-600 mr-3" />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div className="mb-6 flex items-center">
          <FaChalkboardTeacher className="text-green-600 mr-3" />
          <input
            type="text"
            placeholder="Class"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <button
          type="submit"
          className={`w-full bg-green-600 text-white py-2 rounded-md flex items-center justify-center hover:bg-green-700 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Adding...' : <><FaPlus className="mr-2" />Add Student</>}
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
