import React, { useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Classrooms</h2>

      {/* Display Created Classrooms */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classrooms.length > 0 ? (
          classrooms.map((classroom, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
            >
              <div className="flex items-center mb-4">
               
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{classroom.className}</h4>
                </div>
              </div>

              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Active Time:</span> {classroom.startTime}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Total Students:</span> {classroom.totalSeats}
              </p>
              <p>Next Teacher: {classroom.nextTeacher}</p>

              <button
                onClick={() => navigate(`/singleClassPage/${classroom.className}`)}
                className="mt-2 gap-3 flex  text-green-600 hover:text-green-800 transition duration-300"
              >
                <FaEye className="text-2xl" /> View Class
              </button>
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
