import React, { useEffect, useState } from 'react';
import { getAllTeachers, deleteTeacher } from '../../Apis/TeacherApi';

const TeacherTable = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Fetch teachers data when the component mounts
    const fetchTeachers = async () => {
      try {
        const response = await getAllTeachers();
        setTeachers(response); // Adjust based on API response structure
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  // Handle delete teacher with confirmation
  const handleDelete = async (teacherId) => {
    const confirmed = window.confirm('Are you sure you want to delete this teacher?');
    if (confirmed) {
      try {
        await deleteTeacher(teacherId);
        // Remove the deleted teacher from the state
        setTeachers(teachers.filter(teacher => teacher.teacherId !== teacherId));
      } catch (error) {
        console.error('Error deleting teacher:', error);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md my-4 rounded-lg overflow-hidden">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="py-3 px-6 text-left text-sm font-medium">Name</th>
            <th className="py-3 px-6 text-left text-sm font-medium">Age</th>
            <th className="py-3 px-6 text-left text-sm font-medium">Subject</th>
            <th className="py-3 px-6 text-left text-sm font-medium">Salary</th>
            <th className="py-3 px-6 text-left text-sm font-medium">Class No</th>
            <th className="py-3 px-6 text-left text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {teachers.map((teacher, index) => (
            <tr key={index} className="border-b">
              <td className="py-3 px-6 text-sm">{teacher.teacherName}</td>
              <td className="py-3 px-6 text-sm">{teacher.age}</td>
              <td className="py-3 px-6 text-sm">{teacher.subject}</td>
              <td className="py-3 px-6 text-sm">{teacher.salary}</td>
              <td className="py-3 px-6 text-sm">{teacher.className}</td>
              <td className="py-3 px-6 text-sm">
                <button
                  onClick={() => handleDelete(teacher.teacherId)}
                  className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300 ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherTable;
