import React, { useState, useEffect } from 'react';
import { FaUser, FaIdCard, FaBirthdayCake, FaChalkboardTeacher, FaPlus } from 'react-icons/fa';
import { createStudent, getAllStudentsByClassName } from '../../Apis/StudentApi';
import { getAllClassrooms } from '../../Apis/ClassRoomApi';

const AddStudent = () => {
  const [studentName, setStudentName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [age, setAge] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [classrooms, setClassrooms] = useState([]);
  const [seatsAvailable, setSeatsAvailable] = useState(0);

  useEffect(() => {
    // Fetch all classrooms when the component mounts
    const fetchClassrooms = async () => {
      try {
        const classroomsData = await getAllClassrooms();
        setClassrooms(classroomsData);
      } catch (error) {
        console.error('Failed to fetch classrooms', error);
      }
    };

    fetchClassrooms();
  }, []);

  useEffect(() => {
    // Fetch the number of students in the selected class and generate the roll number
    const fetchStudents = async () => {
      if (studentClass) {
        try {
          const students = await getAllStudentsByClassName(studentClass);
          const totalStudents = students.length;
          const selectedClassroom = classrooms.find(classroom => classroom.className === studentClass);

          if (selectedClassroom) {
            const maxSeats = 40; // Assuming each class has 40 seats, adjust as needed
            const section = selectedClassroom.section;

            if (totalStudents < maxSeats) {
              const generatedRollNo = `${section}${totalStudents + 1}`;
              setRollNo(generatedRollNo);
              setSeatsAvailable(maxSeats - totalStudents);
            } else {
              setError('No seats available in the selected class');
              setSeatsAvailable(0);
            }
          } else {
            setError('Selected class not found');
          }
        } catch (error) {
          console.error('Failed to fetch students', error);
          setError('Failed to generate roll number');
        }
      }
    };

    fetchStudents();
  }, [studentClass, classrooms]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const studentData = {
        studentName,
        rollNo,
        age,
        studentClass,
      
      };

      const response = await createStudent(studentData);

      if (response.status === 201) {
        console.log(response.data.studentId)
        // Clear form fields
        setStudentName('');
        setAge('');
        setStudentClass('');
      
        alert(`Student added successfully! with studentID ${response.data.studentId} added` );
      }
    } catch (error) {
      setError('Failed to add student. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex items-center">
          <FaUser className="text-green-600 mr-3" />
          <input
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

    

        <div className="mb-4 flex items-center">
          <FaBirthdayCake className="text-green-600 mr-3" />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div className="mb-6 flex items-center">
          <FaChalkboardTeacher className="text-green-600 mr-3" />
          <select
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          >
            <option value="">Select Class</option>
            {classrooms.map((classroom) => (
              <option key={classroom.id} value={classroom.className}>
                {classroom.className}
              </option>
            ))}
          </select>
        </div>

        {seatsAvailable === 0 && <p className="text-red-500 mb-4 text-center">No seats available</p>}

        <div className="mb-4 flex items-center">
          <FaIdCard className="text-green-600 mr-3" />
          <input
            type="text"
            placeholder="Roll No"
            value={rollNo}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-100"
          />
        </div>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <button
          type="submit"
          className={`w-full bg-green-600 text-white py-2 rounded-md flex items-center justify-center hover:bg-green-700 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading || seatsAvailable === 0}
        >
          {loading ? 'Adding...' : <><FaPlus className="mr-2" />Add Student</>}
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
