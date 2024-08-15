import React, { useEffect, useState } from 'react';
import { RiSofaLine } from "react-icons/ri";
import { getClassroomById } from '../../Apis/ClassRoomApi';
import { getAllStudentsByClassName } from '../../Apis/StudentApi';
import { useParams } from 'react-router-dom';
import SingleClassTimetablePage from './SIngleClassTImeTable';
import { BiChalkboard } from "react-icons/bi";

const SingleClassPage = () => {
  const { className } = useParams();
  const [classData, setClassData] = useState(null);
  const [students, setStudents] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState(new Map());
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    const fetchData = async () => { 
      try {
        const classData = await getClassroomById(className);
        setClassData(classData);

        // Fetch students for this class
        const studentsData = await getAllStudentsByClassName(className);
        setStudents(studentsData);

        // Determine occupied seats based on rollNo and store student names
        const occupiedSeatsMap = new Map(studentsData.map(student => {
          const match = student.rollNo.match(/\d+/);
          const seatNumber = match ? parseInt(match[0], 10) : null;
          return seatNumber !== null ? [seatNumber, student.studentName] : null;
        }).filter(entry => entry !== null));

        setOccupiedSeats(occupiedSeatsMap);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [className]);

  const handleSeatClick = (seatNumber) => {
    const studentName = occupiedSeats.get(seatNumber);
    setSelectedSeat({ seatNumber, studentName });
  };

  const handleCloseDetail = () => {
    setSelectedSeat(null);
  };

  const totalSeats = classData?.totalSeats || 0;
  const occupiedSeatsCount = occupiedSeats.size;
  const availableSeats = totalSeats - occupiedSeatsCount;

  if(classData){
  return (
    <div className="w-full h-screen flex p-6 bg-gray-100">
      <div className="w-full pr-6">
        <div className='flex items-center justify-between'>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Class Room: {classData?.className || "Not FOUND"}
          </h2>
          <h2>Class Teacher: {  classData.classTeacher}</h2>
        </div>
        
        {/* Seat Count */}
        <div className="bg-white items-center justify-around flex shadow-lg rounded-lg p-4 mb-6">
          <p className="text-gray-600">Total Seats: {totalSeats}</p>
          <div className="flex items-center space-x-2">
            <RiSofaLine className="text-3xl text-green-500" />
            <p className="text-sm text-gray-600">Available: {availableSeats}</p>
          </div>
          <div className="flex items-center space-x-2">
            <RiSofaLine className="text-3xl text-red-300" />
            <p className="text-sm text-gray-600">Occupied: {occupiedSeatsCount}</p>
          </div>
          <div>
            Active Time : {classData.startTime} to {classData.endTime}
          </div>
        </div>
      
        {/* Display Seat Layout */}
        <div className='flex p-8'>
          <div className="bg-white p-4 shadow-lg rounded-lg w-2/3">
            <p className="text-lg font-semibold mb-2">Classroom Layout:</p>
            <div className='flex items-center justify-center p-4 bg-red-200 rounded-lg'>
              <BiChalkboard className='text-2xl text-center'/>
              Screen
            </div>

            <div className="flex flex-wrap">
              {Array.from({ length: totalSeats }, (_, index) => {
                const seatNumber = index + 1;
                const studentName = occupiedSeats.get(seatNumber);

                return (
                  <div
                    key={className + seatNumber}
                    className={`w-12 h-12 flex items-center justify-center border rounded-md mr-2 mb-2 cursor-pointer`}
                    title={studentName || "Available" && classData.section+seatNumber}
                    onClick={() => handleSeatClick(seatNumber)}
                  >
                    <RiSofaLine
                      className={`text-3xl ${studentName ? 'text-green-500' : 'text-red-300'}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className='w-1/3'>
            <SingleClassTimetablePage className={className} />
          </div>
        </div>
      </div>

      {/* Conditionally render SingleSeatDetail */}

    </div>
  );
}
};


export default SingleClassPage;
