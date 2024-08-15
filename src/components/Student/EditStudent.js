import React, { useState, useEffect } from 'react';
import { FaUser, FaIdCard, FaChalkboard, FaBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudentByRollNo, updateStudent } from '../../Apis/StudentApi'; // Adjust the import path if necessary

const EditStudentDetails = () => {
  const { rollNo } = useParams(); // Get rollNo from URL parameters
  const navigate = useNavigate();
  
  const [studentData, setStudentData] = useState({
    name: '',
    rollNo: '',
    class: '',
    age: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student data when the component mounts
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const data = await getStudentByRollNo(rollNo); // Fetch student data from API
        setStudentData(data); // Set student data to state
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError('Error fetching student data'); // Handle error
        setLoading(false); // Set loading to false on error
      }
    };

    fetchStudentData(); // Call function to fetch data
  }, [rollNo]); // Re-fetch data if rollNo changes

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudent(rollNo, studentData); // Update student data through API
      navigate(`/studentProfile/${rollNo}`); // Redirect to student profile page after update
    } catch (err) {
      setError('Error updating student data'); // Handle error
    }
  };

  if (loading) return <div>Loading...</div>; // Show loading message
  if (error) return <div>{error}</div>; // Show error message

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Edit Student Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">
              <FaUser className="inline-block mr-2 text-green-700" /> Name
            </label>
            <input
              type="text"
              name="name"
              value={studentData.studentName}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">
              <FaIdCard className="inline-block mr-2 text-green-700" /> Roll No
            </label>
            <input
              type="text"
              name="rollNo"
              value={studentData.rollNo}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
              required
              readOnly
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">
              <FaChalkboard className="inline-block mr-2 text-green-700" /> Class
            </label>
            <input
              type="text"
              name="class"
              value={studentData.studentClass}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">
              <FaBuilding className="inline-block mr-2 text-green-700" /> Age
            </label>
            <input
              type="text"
              name="age"
              value={studentData.age}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">
              <FaEnvelope className="inline-block mr-2 text-green-700" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={studentData.email}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">
              <FaPhone className="inline-block mr-2 text-green-700" /> Phone
            </label>
            <input
              type="text"
              name="phone"
              value={studentData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            <FaMapMarkerAlt className="inline-block mr-2 text-green-700" /> Address
          </label>
          <input
            type="text"
            name="address"
            value={studentData.address}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>

        <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-700">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditStudentDetails;
