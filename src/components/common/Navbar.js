import React, { useState, useEffect } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { MdMenu, MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(''); // To store decoded user info
  const navigate = useNavigate();



  useEffect(()=>{
const user = localStorage.getItem('status') || 404

if(user){
  setUserInfo(user)
  setIsLoggedIn(true)
}

  },[])

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

 
  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false); // Close menu after navigation
  };


  function homeNavigate() {
    console.log(userInfo);
  
    switch(userInfo) {
      case '200':
        handleNavigate('/principalDashboard');
        break;
      case '201':
        handleNavigate('/teacherDashboard');
        break;
      case '202':
        handleNavigate('/studentDashboard');
        break;
      default:
        handleNavigate('/');
    }
  
  }
  

  const handleLogout = () => {
    // Perform logout actions
    localStorage.removeItem('status')
    setIsLoggedIn(false); // Update state

    navigate('/'); // Redirect to login page
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
            onClick={homeNavigate}
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
          {isLoggedIn && userInfo ? (
            <div className='flex items-center justify-center gap-3'>
            <button
            onClick={handleLogout}
            className=" bg-white flex text-green-700 px-4 py-2 rounded-full shadow hover:bg-green-800 hover:text-white transition duration-300"
          >
            <CiLogout className='font-extrabold' />
      
          </button>
       {userInfo === "200"? "Principal":userInfo==="201"?"Teacher":"Student"}

</div>


          ) : (
            <FaUserAlt className="text-white hover:text-green-300 transition duration-300" />
          )}
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
            onClick={homeNavigate}
            className="block hover:text-green-300 transition duration-300"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigate('/allStudents')}
            className="block hover:text-green-300 transition duration-300"
          >
            Students
          </button>
          <button
            onClick={() => handleNavigate('/allTeachers')}
            className="block hover:text-green-300 transition duration-300"
          >
            Teachers
          </button>
          <button
            onClick={() => handleNavigate('/classRoom')}
            className="block hover:text-green-300 transition duration-300"
          >
            ClassRooms
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
              onClick={() => handleNavigate('/')}
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
