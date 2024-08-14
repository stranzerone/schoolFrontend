// src/pages/CreateClassroomPage.js

import React, { useState, useEffect } from 'react';
import ClassroomSelector from '../components/ClassroomSelector';
import TeacherSelector from '../components/TeacherSelector';
import Timetable from '../components/Timetable';
import TeacherSchedule from '../components/TeacherSchedule';
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

  const handleRemoveTeacherFromTimeBlock = async (timeBlock) => {
    const updatedTimetable = { ...timetable };
    delete updatedTimetable[timeBlock];
    setTimetable(updatedTimetable);

    try {
      await deleteTimetable(timetable[timeBlock].slotId);
      alert('Teacher removed from the time block successfully!');
      await refreshTeacherSchedule(selectedTeacher.teacherId); // Refresh schedule after removing teacher
    } catch (error) {
      alert('Failed to update timetable');
    }
  };

  const getClassroomTimeBlocks = () => [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '01:00 PM - 02:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
  ];

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Create Classroom Page</h1>

      <ClassroomSelector
        classrooms={classrooms}
        selectedClassroom={selectedClassroom}
        onSelectClassroom={handleSelectClassroom}
      />

      <div className="grid grid-cols-2 gap-6">
        <TeacherSelector
          teachers={teachers}
          selectedTeacher={selectedTeacher}
          selectedClassroom={selectedClassroom}
          onSelectTeacher={handleSelectTeacher}
        />

        <Timetable
          selectedClassroom={selectedClassroom}
          timetable={timetable}
          getClassroomTimeBlocks={getClassroomTimeBlocks}
          handleAssignTeacherToTimeBlock={handleAssignTeacherToTimeBlock}
          handleRemoveTeacherFromTimeBlock={handleRemoveTeacherFromTimeBlock}
        />
      </div>

      <div className="mt-8">
        <TeacherSchedule
          selectedTeacher={selectedTeacher}
          teacherSchedule={teacherSchedule}
        />
      </div>
    </div>
  );
};

export default CreateClassroomPage;
