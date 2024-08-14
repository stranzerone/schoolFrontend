import React, { useState, useEffect } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { MdMenu, MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getCookie } from './cookieUtils';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('token'); // Check if the token cookie exists
    setIsLoggedIn(!!token); // Set logged-in status based on token presence
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Perform logout actions, e.g., delete the cookie and redirect
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsLoggedIn(false); // Update state
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-green-600 text-white shadow-lg w-full z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold tracking-wider hover:text-green-300 transition duration-300"
          >
            School System
          </button>
        </div>
        <div className="hidden md:flex space-x-6">
          <button
            onClick={() => navigate('/')}
            className="hover:text-green-300 transition duration-300"
          >
            Home
          </button>
          <button
            onClick={() => navigate('/allStudents')}
            className="hover:text-green-300 transition duration-300"
          >
            Students
          </button>
          <button
            onClick={() => navigate('/allTeachers')}
            className="hover:text-green-300 transition duration-300"
          >
            Teachers
          </button>
          <button
            onClick={() => navigate('/classRoom')}
            className="hover:text-green-300 transition duration-300"
          >
            ClassRooms
          </button>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <FaUserAlt className="text-white hover:text-green-300 transition duration-300" />
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <MdClose className="text-3xl text-white hover:text-green-300 transition duration-300" />
            ) : (
              <MdMenu className="text-3xl text-white hover:text-green-300 transition duration-300" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-green-600 text-white space-y-4 p-4 transition duration-500">
          <button
            onClick={() => navigate('/about')}
            className="block hover:text-green-300 transition duration-300"
          >
            About Us
          </button>
          <button
            onClick={() => navigate('/admissions')}
            className="block hover:text-green-300 transition duration-300"
          >
            Admissions
          </button>
          <button
            onClick={() => navigate('/academics')}
            className="block hover:text-green-300 transition duration-300"
          >
            Academics
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="block hover:text-green-300 transition duration-300"
          >
            Contact
          </button>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="block bg-white text-green-700 px-4 py-2 rounded-full shadow hover:bg-green-800 hover:text-white transition duration-300"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="block bg-white text-green-700 px-4 py-2 rounded-full shadow hover:bg-green-800 hover:text-white transition duration-300"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
