import React, { useState } from 'react';
import { FaUser, FaIdBadge, FaPlus } from 'react-icons/fa';

const SeatDetails = ({ seat }) => {
  const [studentName, setStudentName] = useState('');
  const [rollNo, setRollNo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Seat No: {seat.seatNo}</h2>
      
      <form onSubmit={handleSubmit}>
        <p className="mb-4 text-gray-600">Add a new student for Seat No: {seat.seatNo}</p>

        <div className="mb-4 flex items-center">
          <FaUser className="text-gray-500 mr-2" />
       
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter student name"
              required
            />
          
        </div>

        <div className="mb-4 flex items-center">
          <FaIdBadge className="text-gray-500 mr-2" />
           
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter roll number"
              required
            />
         
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white flex items-center justify-center px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition duration-200 ease-in-out"
        >
          <FaPlus className="mr-2" />
          Add Student
        </button>
      </form>
    </div>
  );
};

export default SeatDetails;
