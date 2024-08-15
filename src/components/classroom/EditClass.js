// src/pages/EditClassPage.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClassroomById, updateClassroom } from '../../Apis/ClassRoomApi';

const EditClassPage = () => {
  const { className } = useParams();
  const [classroom, setClassroom] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const response = await getClassroomById(className); // Fetch classroom by className
        setClassroom(response);
      } catch (error) {
        console.error('Error fetching classroom:', error);
      }
    };

    fetchClassroom();
  }, [className]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClassroom({
      ...classroom,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await updateClassroom(className, classroom); // Update classroom data
      navigate('/classrooms'); // Redirect to classrooms page
    } catch (error) {
      console.error('Error updating classroom:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Classroom</h2>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Class Name</label>
          <input
            type="text"
            name="className"
            value={classroom.className || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Total Seats</label>
          <input
            type="number"
            name="totalSeats"
            value={classroom.totalSeats || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Class Teacher</label>
          <input
            type="text"
            name="classTeacherName"
            value={classroom.classTeacher || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Start Time</label>
          <input
            type="time"
            name="startTime"
            value={classroom.startTime || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">End Time</label>
          <input
            type="time"
            name="endTime"
            value={classroom.endTime || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition duration-300"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditClassPage;
