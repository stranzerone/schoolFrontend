import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { getAllClassrooms } from '../../Apis/ClassRoomApi';

const ClassroomsPage = () => {
  const [classrooms, setClassrooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch classroom data when the component mounts
    const fetchClassrooms = async () => {
      try {
        const response = await getAllClassrooms();
        setClassrooms(response); // Adjust based on API response structure
      } catch (error) {
        console.error('Error fetching classrooms:', error);
      }
    };

    fetchClassrooms();
  }, []);

  const renderOpenDays = (openDays) => {
    const days = {
      mon: "Mon",
      tue: "Tue",
      wed: "Wed",
      thu: "Thu",
      fri: "Fri",
      sat: "Sat",
      sun: "Sun",
    };

    return Object.keys(openDays)
      .filter(day => openDays[day])
      .map(day => (
        <span
          key={day}
          className="px-2 py-1 rounded-full bg-green-500 text-white mx-1 text-sm"
        >
          {days[day]}
        </span>
      ));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Classrooms</h2>

      {/* Display Created Classrooms */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classrooms.length > 0 ? (
          classrooms.map((classroom, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between transform transition-transform hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div>
                  <h4 className="text-2xl font-bold text-gray-800">{classroom.className}</h4>
                  <p className="text-sm text-gray-500">
                    Class Teacher: <strong>{classroom.classTeacher}</strong>
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Active Time:</span> {classroom.startTime} - {classroom.endTime}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Total Students:</span> {classroom.totalSeats}
                </p>
                <div className="text-gray-600">
                  <span className="font-semibold">Active Days:</span>
                  <div className="flex mt-2">
                    {renderOpenDays(classroom.openDays)}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => navigate(`/singleClassPage/${classroom.className}`)}
                  className="flex items-center text-green-600 hover:text-green-800 transition duration-300"
                >
                  <FaEye className="text-2xl mr-2" /> View Class
                </button>

         { localStorage.getItem('status') ==='200'?  
             <button
                  onClick={() => navigate(`/editClass/${classroom.className}`)}
                  className="flex items-center text-green-600 hover:text-green-800 transition duration-300"
                >
                  <FaEdit className="text-2xl mr-2" /> Edit Class
                </button>
                :null}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No classrooms available.</p>
        )}
      </div>
    </div>
  );
};

export default ClassroomsPage;
