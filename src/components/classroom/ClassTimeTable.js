import React, { useState, useEffect } from 'react';
import { getAllClassrooms } from '../../Apis/ClassRoomApi'; // Update path as needed
import { getClassTimeTable } from '../../Apis/TeacherScheduleApi';
import { useNavigate } from 'react-router-dom';

const ClassTimetableDisplay = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [timetable, setTimetable] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const classroomsData = await getAllClassrooms();
        setClassrooms(classroomsData);
      } catch (error) {
        console.error('Failed to fetch classrooms:', error);
      }
    };

    fetchClassrooms();
  }, []);

  const handleClassSelection = async (classroom) => {
    setSelectedClassroom(classroom);
    try {
      const timetableData = await getClassTimeTable(classroom.className); // Fetch timetable by className
      setTimetable(timetableData);
    } catch (error) {
      console.error('Failed to fetch timetable:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Class Timetable</h1>

      {/* Class Selection */}
      <div className="flex space-x-4 mb-6">
        <p>Select Class</p>
        {classrooms.map((classroom) => (
          <button
            key={classroom.id}
            onClick={() => handleClassSelection(classroom)}
            className={`px-4 py-2 rounded-lg shadow-md ${selectedClassroom?.id === classroom.id ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-slate-400 transition`}
          >
            {classroom.className}
          </button>
        ))}
      </div>

      {/* Timetable Display */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {selectedClassroom ? `Timetable for ${selectedClassroom.className}` : 'Select a Class to View Timetable'}
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {timetable.length === 0 ? (
            <p className="text-gray-600">No timetable data available.</p>
          ) : (
            timetable.map((timeBlock) => (
              <div key={timeBlock.slotId} className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-700">
                  {timeBlock.startTime} - {timeBlock.endTime}
                </h3>
                <p className="text-gray-600">{timeBlock.subject}</p>
                <p className="text-gray-600">{timeBlock.teacherName || 'Unknown Teacher'}</p>
              </div>
            ))
          )}
        </div>
{localStorage.getItem('status' ==='200')?
        <button 
          className={`bg-green-300 px-4 py-2 rounded-lg shadow-md hover:bg-slate-400 transition mt-4`}
          onClick={() => navigate("/createTimetable")}
        >
          Edit
        </button>:null}
      </div>
    </div>
  );
};

export default ClassTimetableDisplay;
