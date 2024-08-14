// src/components/Timetable.js

import React, { useState, useEffect } from 'react';
import { AiOutlineMinus } from 'react-icons/ai';
import { getScheduleByClassroomTeacherTime } from '../../../Apis/TeacherScheduleApi';

const Timetable = ({ selectedClassroom, selectedTeacher, timetable, getClassroomTimeBlocks, handleAssignTeacherToTimeBlock, handleRemoveTeacherFromTimeBlock }) => {
  const [fetchedSchedule, setFetchedSchedule] = useState({});

  useEffect(() => {
    const fetchSchedule = async () => {
      if (selectedClassroom && selectedTeacher) {
        try {
          const updatedSchedule = {};
          const timeBlocks = getClassroomTimeBlocks();
          
          for (const timeBlock of timeBlocks) {
            const scheduleData = await getScheduleByClassroomTeacherTime(
              selectedClassroom.className,
              selectedTeacher.teacherName,
              timeBlock.split(' - ')[0]
            );
            if (scheduleData) {
              updatedSchedule[timeBlock] = scheduleData;
            }
          }
          
          setFetchedSchedule(updatedSchedule);
        } catch (error) {
          console.error('Failed to fetch schedule:', error);
        }
      }
    };

    fetchSchedule();
  }, [selectedClassroom, selectedTeacher, getClassroomTimeBlocks]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {selectedClassroom ? `${selectedClassroom.className} Timetable` : 'Select a Classroom'}
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {getClassroomTimeBlocks().map((timeBlock, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border border-gray-200 cursor-pointer flex justify-between items-center ${fetchedSchedule[timeBlock] ? 'bg-green-100' : 'bg-gray-50'}`}
            onClick={() => fetchedSchedule[timeBlock] ? handleRemoveTeacherFromTimeBlock(timeBlock) : handleAssignTeacherToTimeBlock(timeBlock)}
          >
            <span>{timeBlock}</span>
            <span>{fetchedSchedule[timeBlock] ? `${fetchedSchedule[timeBlock].teacherName} (${fetchedSchedule[timeBlock].subject})` : 'Empty'}</span>
            {fetchedSchedule[timeBlock] && (
              <button className="bg-red-500 text-white p-1 rounded-full hover:bg-red-700">
                <AiOutlineMinus />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
