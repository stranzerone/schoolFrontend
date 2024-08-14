import React, { useState, useEffect } from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { AiOutlineMinus } from 'react-icons/ai';
import { getAllTeachers } from '../../Apis/TeacherApi';
import { getAllClassrooms } from '../../Apis/ClassRoomApi';
import { createTimetable, deleteTimetable, getTimetableById } from '../../Apis/TeacherScheduleApi.js';

const CreateClassroomPage = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [timetable, setTimetable] = useState({});
  const [teacherSchedule, setTeacherSchedule] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classroomsData = await getAllClassrooms();
        setClassrooms(classroomsData);
        const teachersData = await getAllTeachers();
        setTeachers(teachersData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const refreshTeacherSchedule = async (teacherId) => {
    try {
      const teacherScheduleData = await getTimetableById(teacherId);
      setTeacherSchedule(Array.isArray(teacherScheduleData) ? teacherScheduleData : []);
      console.log(teacherSchedule)
    } catch (error) {
      console.error('Failed to fetch teacher schedule:', error);
    }
  };

  const handleSelectClassroom = (classroom) => {
    setSelectedClassroom(classroom);
    setTimetable({});
    setSelectedTeacher(null);
    setTeacherSchedule([]);
  };

  const handleSelectTeacher = async (teacher) => {
    if (!selectedClassroom) {
      alert('Please select a classroom first.');
      return;
    }

    setSelectedTeacher(teacher);
    await refreshTeacherSchedule(teacher.teacherId); // Refresh schedule when a new teacher is selected
  };

  const handleAssignTeacherToTimeBlock = async (timeBlock) => {
    if (!selectedClassroom) {
      alert('Please select a classroom first.');
      return;
    }
    if (selectedTeacher) {
      const updatedTimetable = {
        ...timetable,
        [timeBlock]: selectedTeacher,
      };
      setTimetable(updatedTimetable);

      try {
        await createTimetable({
          classroom: selectedClassroom.className,
          teacherId: selectedTeacher.teacherId,
          startTime: timeBlock.split(' - ')[0],
          endTime: timeBlock.split(' - ')[1],
          subject: selectedTeacher.subject,
        });
        alert('Timetable updated successfully!');
        await refreshTeacherSchedule(selectedTeacher.teacherId); // Refresh schedule after adding teacher
      } catch (error) {
        alert('Failed to update timetable');
      }
    } else {
      alert('Please select a teacher first.');
    }
  };

  const getDefaultTimeBlocks = () => {
    const timeBlocks = [];
    let currentHour = 8; // Start time: 8:00 AM
    const endHour = 15; // End time: 3:00 PM
  
    while (currentHour < endHour) {
      const nextHour = currentHour + 1;
      timeBlocks.push(
        `${currentHour.toString().padStart(2, '0')}:00 - ${nextHour.toString().padStart(2, '0')}:00`
      );
      currentHour = nextHour;
    }
  
    return timeBlocks;
  };
  

  const handleRemoveTeacherFromTimeBlock = async (timeBlock) => {
    console.log(timetable[timeBlock],"timeblock")
    const updatedTimetable = { ...timetable };
    delete updatedTimetable[timeBlock];
    setTimetable(updatedTimetable);

    try {
      await deleteTimetable(timetable[timeBlock].slotId);
      console.log(timetable[timeBlock],"TimeBLock")
      alert('Teacher removed from the time block successfully!');
      await refreshTeacherSchedule(selectedTeacher.teacherId); // Refresh schedule after removing teacher
    } catch (error) {
      alert('Failed to update timetable');
    }
  };

  const getClassroomTimeBlocks = () => {
    if (!selectedClassroom) return getDefaultTimeBlocks();
    const timeBlocks = [];
    const [startH, startM] = selectedClassroom.startTime.split(':').map(Number);
    const [endH, endM] = selectedClassroom.endTime.split(':').map(Number);

    let currentHour = startH;
    while (currentHour < endH || (currentHour === endH && endM > 0)) {
      const nextHour = currentHour + 1;
      timeBlocks.push(`${currentHour.toString().padStart(2, '0')}:00 - ${nextHour.toString().padStart(2, '0')}:00`);
      currentHour = nextHour;
    }

    return timeBlocks;
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Create Timetable</h1>

      <div className="flex">
        <div className="w-2/3">
          <ol>
            <li>Step 1: Select Classroom</li>
            <li>Step 2: Select Teacher to Add</li>
            <li>Step 3: Click on Time to Add to Slot</li>
          </ol>
        </div>
      </div>

      {/* Top: Classrooms */}
      <div className="flex items-center space-x-4 mt-4 mb-6">
        {classrooms.map((classroom) => (
          <button
            key={classroom._id}
            onClick={() => handleSelectClassroom(classroom)}
            className={`px-4 py-2 rounded-lg shadow-md ${selectedClassroom === classroom ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-slate-400`}
          >
            {classroom.className}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Side: Teachers */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Teachers <span className="text-sm">S2: Select Teacher</span></h2>
          <ul>
            {teachers.map((teacher) => (
              <li
                key={teacher._id}
                className={`p-2 mb-4 rounded-lg cursor-pointer flex items-center justify-between ${selectedClassroom ? (selectedTeacher === teacher ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-800') : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                onClick={() => selectedClassroom && handleSelectTeacher(teacher)}
                title={!selectedClassroom ? 'Please select a classroom first' : ''}
              >
                <div className="flex items-center">
                  <FaChalkboardTeacher className="text-green-500 mr-2" />
                  <div>
                    <p className="font-semibold">{teacher.teacherName}</p>
                    <p className="text-sm text-gray-600">{teacher.subject}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Middle: Classroom Timetable */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {selectedClassroom ? `${selectedClassroom.className} Timetable` : 'Select a Classroom'}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {getClassroomTimeBlocks().map((timeBlock, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border border-gray-200 cursor-pointer flex justify-between items-center ${timetable[timeBlock] ? 'bg-green-100' : 'bg-gray-50'}`}
                onClick={() => timetable[timeBlock] ? handleRemoveTeacherFromTimeBlock(timeBlock) : handleAssignTeacherToTimeBlock(timeBlock)}
              >
                <span>{timeBlock}</span>
                <span>{timetable[timeBlock] ? `${timetable[timeBlock].teacherName} (${timetable[timeBlock].subject})` : 'Empty'}</span>
                {timetable[timeBlock] && (
                  <button className="bg-red-500 text-white p-1 rounded-full hover:bg-red-700">
                    <AiOutlineMinus />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Teacher's Schedule */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{selectedTeacher ? `${selectedTeacher.teacherName}'s Schedule` : 'Select a Teacher'}</h2>
          <div className="grid grid-cols-1 gap-4">
            {teacherSchedule.length > 0 ? (
              teacherSchedule.map((slot, index) => (
                <div key={index} className="p-4 rounded-lg bg-blue-100">
                  <p className="font-semibold">{slot.subject}</p>
                  <p className="text-sm text-gray-600">{slot.startTime} - {slot.endTime}</p>
                  <p className="text-sm text-gray-600">Classroom: {slot.className}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No schedule available for this teacher.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClassroomPage;
