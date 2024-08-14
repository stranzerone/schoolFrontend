import React, { useState } from 'react';
import { FaUser, FaIdCard, FaChalkboard, FaBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const EditStudentDetails = () => {
  // Dummy data
  const initialStudentData = {
    name: 'John Doe',
    rollNo: '001',
    class: '10th Grade',
    section: 'A',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Cityville',
  };

  // State to hold the form data
  const [studentData, setStudentData] = useState(initialStudentData);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the logic to save the updated details
    console.log('Updated Student Data:', studentData);
  };

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
              value={studentData.name}
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
              value={studentData.class}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">
              <FaBuilding className="inline-block mr-2 text-green-700" /> Section
            </label>
            <input
              type="text"
              name="section"
              value={studentData.section}
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
              value={studentData.phone}
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
