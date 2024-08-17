import React, { useState, useEffect } from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { AiOutlineMinus, AiOutlineDelete } from 'react-icons/ai'; 
import { getAllTeachers } from '../../Apis/TeacherApi';
import { getAllClassrooms } from '../../Apis/ClassRoomApi';
import { createTimetable, deleteTimetable, getTimetableById } from '../../Apis/TeacherScheduleApi.js';
import Notification from '../common/Notification.js';

const CreateClassroomPage = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [timetable, setTimetable] = useState({});
  const [teacherSchedule, setTeacherSchedule] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });

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
      setNotification({ message: 'Please select a classroom first.', type: 'error' });
      return;
    }

    setSelectedTeacher(teacher);
    await refreshTeacherSchedule(teacher.teacherId);
  };

  const handleAssignTeacherToTimeBlock = async (timeBlock) => {
    if (!selectedClassroom) {
      setNotification({ message: 'Please select a classroom first.', type: 'error' });
      return;
    }
    if (selectedTeacher) {
      const updatedTimetable = {
        ...timetable,
        [timeBlock]: selectedTeacher,
      };
      setTimetable(updatedTimetable);

      try {
        const response = await createTimetable({
          classroom: selectedClassroom.className,
          teacherId: selectedTeacher.teacherId,
          startTime: timeBlock.split('-')[0],
          endTime: timeBlock.split('-')[1],
          subject: selectedTeacher.subject,
          teacherName: selectedTeacher.teacherName,
        });

        if (response.status === 200) {
          setNotification({ message: 'Timetable updated successfully!', type: 'success' });
        }
        setNotification({ message: 'It seems the teacher is quite busy in a lecture.', type: 'error' });

        await refreshTeacherSchedule(selectedTeacher.teacherId);
      } catch (error) {
        setNotification({ message: 'Error while connecting server.', type: 'error' });
      }
    } else {
      setNotification({ message: 'Please select a teacher first.', type: 'error' });
    }
  };

  const handleRemoveTeacherFromTimeBlock = async (timeBlock) => {
    const updatedTimetable = { ...timetable };
    delete updatedTimetable[timeBlock];
    setTimetable(updatedTimetable);

    try {
      await deleteTimetable(timetable[timeBlock].slotId);
      await refreshTeacherSchedule(selectedTeacher.teacherId);
      setNotification({ message: 'Teacher removed from the time block.', type: 'success' });
    } catch (error) {
      setNotification({ message: 'Failed to remove the teacher from the time block.', type: 'error' });
    }
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      await deleteTimetable(slotId);
      setTeacherSchedule(teacherSchedule.filter(slot => slot.slotId !== slotId));
      setNotification({ message: 'Slot deleted successfully!', type: 'success' });
    } catch (error) {
      setNotification({ message: 'Failed to delete slot.', type: 'error' });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ message: '', type: '' });
  };

  const getDefaultTimeBlocks = () => {
    const timeBlocks = [];
    let currentHour = 8;
    const endHour = 15;

    while (currentHour < endHour) {
      const nextHour = currentHour + 1;
      timeBlocks.push(
        `${currentHour.toString().padStart(2, '0')}:00 - ${nextHour.toString().padStart(2, '0')}:00`
      );
      currentHour = nextHour;
    }

    return timeBlocks;
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
    <div className="container mx-auto p-4 md:p-6 bg-gray-100">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center md:text-left">Create Timetable</h1>
      {notification.message && (
        <Notification message={notification.message} type={notification.type} onClose={handleCloseNotification} />
      )}
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 mb-4 md:mb-0">
          <ol className="list-decimal pl-4">
            <li>Step 1: Select Classroom</li>
            <li>Step 2: Select Teacher to Add</li>
            <li>Step 3: Click on Time to Add to Slot</li>
          </ol>
        </div>
      </div>

      {/* Top: Classrooms */}
      <div className="flex flex-wrap items-center space-x-2 md:space-x-4 mt-4 mb-4 md:mb-6">
        {classrooms.map((classroom) => (
          <button
            key={classroom._id}
            onClick={() => handleSelectClassroom(classroom)}
            className={`px-3 py-2 md:px-4 md:py-2 rounded-lg shadow-md ${selectedClassroom === classroom ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-slate-400`}
          >
            {classroom.className}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Left Side: Teachers */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Teachers <span className="text-sm">S2: Select Teacher</span></h2>
          <ul>
            {teachers.map((teacher) => (
              <li
                key={teacher._id}
                className={`p-2 mb-2 md:mb-4 rounded-lg cursor-pointer flex items-center justify-between ${selectedClassroom ? (selectedTeacher === teacher ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-800') : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
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
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
            {selectedClassroom ? `${selectedClassroom.className} Timetable` : 'Select a Classroom'}
          </h2>
          <div className="grid grid-cols-1 gap-2 md:gap-4">
            {getClassroomTimeBlocks().map((timeBlock, index) => (
              <div
                key={index}
                className={`p-3 md:p-4 rounded-lg border border-gray-200 cursor-pointer flex justify-between items-center ${timetable[timeBlock] ? 'bg-green-100' : 'bg-gray-50'}`}
                onClick={() => timetable[timeBlock] ? handleRemoveTeacherFromTimeBlock(timeBlock) : handleAssignTeacherToTimeBlock(timeBlock)}
              >
                <span>{timeBlock}</span>
                <span>{timetable[timeBlock] ? `${timetable[timeBlock].teacherName} (${timetable[timeBlock].subject})` : 'Empty'}</span>
                {timetable[timeBlock] && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTeacherFromTimeBlock(timeBlock);
                    }}
                    className="text-red-500 hover:text-red-700"
                    title="Remove Teacher"
                  >
                    <AiOutlineMinus />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Teacher Schedule */}
        {selectedTeacher && (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
              {selectedTeacher.teacherName} Schedule
            </h2>
            
            <div className="space-y-2 md:space-y-4">
              {teacherSchedule.map((slot, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 md:p-4 rounded-lg border border-gray-200 bg-gray-50"
                >
                  <span>
                    {slot.startTime} - {slot.endTime} <br />
                    {slot.classroom} ({slot.subject})
                  </span>
                  <button
                    onClick={() => handleDeleteSlot(slot.slotId)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Slot"
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateClassroomPage;
