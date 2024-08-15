import React, { useState } from 'react';
import { FaUser, FaChalkboardTeacher, FaDollarSign, FaCalendarAlt, FaBirthdayCake, FaPlus, FaSchool } from 'react-icons/fa'; // Added FaSchool icon
import { createTeacher } from '../../Apis/TeacherApi'; // Adjust import path as needed

const AddTeacher = () => {
  // Teacher state
  const [teacherName, setTeacherName] = useState('');
  const [age, setAge] = useState('');
  const [subject, setSubject] = useState('');
  const [salary, setSalary] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  
  // Class state
  const [className, setClassName] = useState(''); // New state for class name

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await createTeacher({
       
        teacherName,
        age,
        subject,
        salary,
        dateOfBirth,
        className, // Include class information
         // Include class information
      });

      if (response.status === 201) {
        setTeacherName('');
        setAge('');
        setSubject('');
        setSalary('');
        setDateOfBirth('');
        setClassName(''); // Clear class name field

       window. alert(`Teacher added successfully TeacherID : ${response.data.teacherId} `)
      }
    } catch (error) {
      setError('Failed to add teacher. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Add New Teacher</h2>
      <form onSubmit={handleSubmit}>
        {/* Teacher ID */}
      

        {/* Teacher Name */}
        <div className="mb-4 flex items-center">
          <FaUser className="text-green-600 mr-3" />
          <input
            type="text"
            placeholder="Teacher Name"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {/* Age */}
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

        {/* Subject */}
        <div className="mb-4 flex items-center">
          <FaChalkboardTeacher className="text-green-600 mr-3" />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {/* Salary */}
        <div className="mb-4 flex items-center">
          <FaDollarSign className="text-green-600 mr-3" />
          <input
            type="number"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-6 flex items-center">
          <FaCalendarAlt className="text-green-600 mr-3" />
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {/* Class Name */}
     
        {/* Class Grade */}
    

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <button
          type="submit"
          className={`w-full bg-green-600 text-white py-2 rounded-md flex items-center justify-center hover:bg-green-700 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Adding...' : <><FaPlus className="mr-2" />Add Teacher</>}
        </button>
      </form>
    </div>
  );
};

export default AddTeacher;
