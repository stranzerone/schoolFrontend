import React, { useState, useEffect } from 'react';
import { FaChalkboard, FaChair, FaClock, FaUserTie } from 'react-icons/fa';
import { createClassroom } from '../../Apis/ClassRoomApi';
import { getAllTeachers } from '../../Apis/TeacherApi'; // Import your getAllTeachers function

const ClassroomCreation = () => {
  const [className, setClassName] = useState('');
  const [totalSeats, setTotalSeats] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [section, setSection] = useState('');
  const [openDays, setOpenDays] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  });
  const [classTeacher, setClassTeacher] = useState('');
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Fetch teachers when component mounts
    const fetchTeachers = async () => {
      try {
        const teachersData = await getAllTeachers();
        console.log(teachersData)
        setTeachers(teachersData);
      } catch (error) {
        console.error('Failed to fetch teachers', error);
      }
    };

    fetchTeachers();
  }, []);

  const handleDayChange = (day) => {
    setOpenDays((prevDays) => ({
      ...prevDays,
      [day]: !prevDays[day],
    }));
  };

  const handleSectionChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (/^[A-Z]{0,2}$/.test(value)) {
      setSection(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newClassroom = {
      className,
      totalSeats,
      startTime,
      endTime,
      section,
      openDays,
      classTeacher, // Include classTeacher in the request
    };

    try {
      await createClassroom(newClassroom);
      alert('Classroom created successfully!');
      // Optionally, reset the form or redirect the user
      setClassName('');
      setTotalSeats('');
      setStartTime('');
      setEndTime('');
      setSection('');
      setClassTeacher('');
      setOpenDays({
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
      });
    } catch (error) {
      alert('Failed to create classroom. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-green-600 flex items-center">
          <FaChalkboard className="mr-2" /> Create Classroom
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Class Name
              </label>
              <div className="flex items-center bg-gray-200 p-2 rounded">
                <FaChalkboard className="text-gray-500 mr-2" />
                <input
                  type="text"
                  className="bg-gray-200 text-gray-700 border-none focus:outline-none w-full"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Total Seats
              </label>
              <div className="flex items-center bg-gray-200 p-2 rounded">
                <FaChair className="text-gray-500 mr-2" />
                <input
                  type="number"
                  className="bg-gray-200 text-gray-700 border-none focus:outline-none w-full"
                  value={totalSeats}
                  onChange={(e) => setTotalSeats(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Start Time
              </label>
              <div className="flex items-center bg-gray-200 p-2 rounded">
                <FaClock className="text-gray-500 mr-2" />
                <input
                  type="time"
                  className="bg-gray-200 text-gray-700 border-none focus:outline-none w-full"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                End Time
              </label>
              <div className="flex items-center bg-gray-200 p-2 rounded">
                <FaClock className="text-gray-500 mr-2" />
                <input
                  type="time"
                  className="bg-gray-200 text-gray-700 border-none focus:outline-none w-full"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Section
              </label>
              <input
                type="text"
                className="bg-gray-200 text-gray-700 border-none focus:outline-none p-2 rounded w-full"
                value={section}
                onChange={handleSectionChange}
                placeholder="Enter up to 2 letters (A-Z)"
                maxLength={2}
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Class Teacher
              </label>
              <div className="flex items-center bg-gray-200 p-2 rounded">
                <FaUserTie className="text-gray-500 mr-2" />
                <select
                  value={classTeacher}
                  onChange={(e) => setClassTeacher(e.target.value)}
                  className="bg-gray-200 text-gray-700 border-none focus:outline-none w-full"
                  required
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.name}>
                      {teacher.teacherName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Open Days
            </label>
            <div className="flex items-center flex-wrap">
              {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => (
                <label key={day} className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    className="form-checkbox text-green-600"
                    checked={openDays[day]}
                    onChange={() => handleDayChange(day)}
                  />
                  <span className="ml-2 text-gray-700 capitalize">
                    {day.toUpperCase()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-full shadow-lg hover:bg-green-700 transition duration-300"
          >
            Create Classroom
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClassroomCreation;
