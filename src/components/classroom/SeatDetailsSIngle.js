import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import SeatDetails from './seatDetails';
import { useNavigate } from 'react-router-dom';

const SingleSeatDetails = ({ seat }) => {
  const navigate = useNavigate()
  return (
    <div className="w-1/3 bg-white p-6 shadow-lg rounded-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Seat Details</h3>
      {seat.status === 'occupied' ? (
        <div className="flex flex-col items-start">
          <FaUserCircle className="text-6xl self-center text-gray-400 mb-4" />
          <p className="text-lg font-semibold text-gray-700"><strong>Seat No:</strong> {seat.seatNo}</p>
          <p className="text-lg font-semibold text-gray-700"><strong>Student Name:</strong> {seat.student}</p>
          <p className="text-lg font-semibold text-gray-700"><strong>Roll No:</strong> {seat.rollNo}</p>
        <button 
        onClick={()=>navigate(`/editStudent/${seat.rollNo}`)}
        className='bg-green-400 p-2 self-center mt-6 font-extrabold rounded-md'>Edit Student</button>
        </div>
        
      ) : (
        <div>
          <SeatDetails seat={seat} />
        </div>
      )}
    </div>
  );
};

export default SingleSeatDetails;
