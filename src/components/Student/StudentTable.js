import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllStudents, deleteStudent } from '../../Apis/StudentApi';

const StudentTable = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students data when the component mounts
    const fetchStudents = async () => {
      try {
        const response = await getAllStudents();
        setStudents(response); // Adjust based on API response structure
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  // Handle delete student with confirmation
  const handleDelete = async (rollNo) => {
    const confirmed = window.confirm('Are you sure you want to delete this student?');
    if (confirmed) {
      try {
        await deleteStudent(rollNo);
        // Remove the deleted student from the state
        setStudents(students.filter(student => student.rollNo !== rollNo));
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-4 uppercase text-sm text-left">Name</th>
              <th className="py-3 px-4 uppercase text-sm text-left">Roll No</th>
              <th className="py-3 px-4 uppercase text-sm text-left">Age</th>
              <th className="py-3 px-4 uppercase text-sm text-left">Class</th>
              {["200","201"].includes(localStorage.getItem('status')) ? <th className="py-3 px-4 uppercase text-sm text-left">Actions</th> : null}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.rollNo} className="border-b">
                <td className="py-3 px-4 text-gray-800">{student.studentName}</td>
                <td className="py-3 px-4 text-gray-800">{student.rollNo}</td>
                <td className="py-3 px-4 text-gray-800">{student.age}</td>
                <td className="py-3 px-4 text-gray-800">{student.studentClass}</td>
                {["200","201"].includes(localStorage.getItem('status'))   ?  (
                  <td className="py-3 px-4">
                    <button
                      onClick={() => navigate(`/studentProfile/${student.rollNo}`)}
                      className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(student.rollNo)}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
