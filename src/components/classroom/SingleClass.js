import React, { useState } from 'react';
import SeatLayout from './SeatLayout';
import { RiSofaLine } from "react-icons/ri";
import TeachersTable from './TeachersTable';
import SingleSeatDetails from './SeatDetailsSIngle';

// Dummy data for a single class
const classData = {
  name: 'Classroom A',
  layout: [
    [{ status: 'occupied', student: 'John Doe', seatNo: '1A', rollNo: '001' }, { status: 'available', seatNo: '1B' }, { status: 'occupied', student: 'Jane Doe', seatNo: '1C', rollNo: '002' }],
    [{ status: 'available', seatNo: '2A' }, { status: 'occupied', student: 'Alice Smith', seatNo: '2B', rollNo: '003' }, { status: 'available', seatNo: '2C' }],
    [{ status: 'available', seatNo: '3A' }, { status: 'available', seatNo: '3B' }, { status: 'occupied', student: 'Bob Brown', seatNo: '3C', rollNo: '004' }],
    // More rows...
  ],
  timetable: [
    { day: 'Monday', subject: 'Math: 9 AM - 10 AM', teacher: 'Mr. Smith' },
    { day: 'Tuesday', subject: 'Science: 10 AM - 11 AM', teacher: 'Ms. Johnson' },
    // More timetable entries...
  ]
};

const SingleClassPage = () => {
  // State to track the selected seat
  const [selectedSeat, setSelectedSeat] = useState(null);

  // Calculate total seats, occupied seats, and available seats
  const totalSeats = classData.layout.length * classData.layout[0].length;
  const occupiedSeats = classData.layout.flat().filter(seat => seat.status === 'occupied').length;
  const availableSeats = totalSeats - occupiedSeats;

  // Assuming the first timetable entry is the current session
  const currentTeacher = classData.timetable[0]?.teacher || "No class scheduled";

  // Handle seat click
  const handleSeatClick = (seat) => {
    setSelectedSeat(seat);
  };

  return (
    <div className="w-full h-screen flex p-6 bg-gray-100">
      <div className="w-2/3 pr-6">
      <div className='flex items-center justify-between'>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{classData.name}</h2>
      <div className='flex gap-2 '>
      <h1 className="text-xl self-end  font-bold text-gray-800 mb-6">Mr Ramnujan</h1>

      </div>
      </div>
      
        {/* Seat Count */}
        <div className="bg-white items-center justify-around flex shadow-lg rounded-lg p-4 mb-6">
          <p className="text-gray-600">Current Teacher: {currentTeacher}</p>
          <p className="text-gray-600">Total Seats: {totalSeats}</p>
          <div className="flex items-center space-x-2">
            <RiSofaLine className="text-3xl text-green-500" />
            <p className="text-sm text-gray-600">Available {availableSeats}</p>
          </div>
          <div className="flex items-center space-x-2">
            <RiSofaLine className="text-3xl text-red-300" />
            <p className="text-sm text-gray-600">Occupied : {occupiedSeats}</p>
          </div>
        </div>
{/*Teacher Section for Class Today */}

        {/* Class Layout */}
        <SeatLayout layout={classData.layout} onSeatClick={handleSeatClick} />
      </div>

      {/* Dynamic Section */}
      {selectedSeat ? (
      
        <SingleSeatDetails seat={selectedSeat} />
      ) : (
        <TeachersTable />
      )}
    </div>
  );
};

export default SingleClassPage;
