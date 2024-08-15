import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import SingleClassPage from './components/classroom/SingleClass';
import ClassroomsPage from './components/common/classroomPage';
import Navbar from './components/common/Navbar';
import AddTeacher from './components/Principal/AddTeacher';
import PrinciplaFront from './components/Principal/PrinciplaFront';
import AddStudent from './components/Student/AddStudent';
import EditStudentDetails from './components/Student/EditStudent';
import StudentProfile from './components/Student/StudentProfile';
import StudentTable from './components/Student/StudentTable';
import TeacherTable from './components/Teachers/TeacherTable';
import ClassTimetablePage from './components/Principal/createTimeTable';
import ClassroomCreation from './components/Principal/addClassRoom';
import ClassTimetableDisplay from './components/classroom/ClassTimeTable';
import TeacherDashboardPage from './components/Teachers/TeacherDashboard';
import LoginPage from './components/common/Login';
import StudentDashboard from './components/Student/StudentDashboard';
import EditClassPage from './components/classroom/EditClass';

function App() {
  const location = useLocation();
  
  // Define routes where Navbar should not be shown
  const noNavbarRoutes = ['/'];

  return (
    <div className='bg-green-50 app'>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path='/principalDashboard' element={<PrinciplaFront />} />
        <Route path='/allStudents' element={<StudentTable />} />
        <Route path='/allTeachers' element={<TeacherTable />} />
        <Route path='/addTeacher' element={<AddTeacher />} />
        <Route path='/addStudent' element={<AddStudent />} />
        <Route path='/studentProfile/:rollNo' element={<StudentProfile />} />
        <Route path='/createTimeTable' element={<ClassTimetablePage />} />
        <Route path='/classRoom' element={<ClassroomsPage />} />
        <Route path='/singleClassPage/:className' element={<SingleClassPage />} />
        <Route path='/editStudent/:rollNo' element={<EditStudentDetails />} />
        <Route path='/createClassRoom' element={<ClassroomCreation />} />
        <Route path='/classTimeTable' element={<ClassTimetableDisplay />} />
        <Route path='/teacherDashboard' element={<TeacherDashboardPage />} />
        <Route path='/' element={<LoginPage />} />
        <Route path='/studentDashboard' element={<StudentDashboard />} />
        <Route path='/editClass/:className' element={<EditClassPage />} />

      </Routes>
    </div>
  );
}

export default App;
