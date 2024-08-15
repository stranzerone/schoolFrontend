import React, { useEffect, useState } from 'react';
import { getClassTimeTable } from '../../Apis/TeacherScheduleApi';
const SingleClassTimetablePage = ({ className }) => {
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const timetableData = await getClassTimeTable(className);
        setTimetable(timetableData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTimetable();
  }, [className]);

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Class Timetable</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="px-4 py-2 text-left">Time</th>
            <th className="px-4 py-2 text-left">Subject</th>
            <th className="px-4 py-2 text-left">Teacher</th>
          </tr>
        </thead>
        <tbody>
          {timetable.length > 0 ? (
            timetable.map((entry, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="px-4 py-2">{entry.startTime}</td>
                <td className="px-4 py-2">{entry.subject}</td>
                <td className="px-4 py-2">{entry.teacherName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-4 py-2 text-center text-gray-600">No Timetable Data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SingleClassTimetablePage;
