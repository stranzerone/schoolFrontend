import axios from "axios";

const BACKEND= process.env.REACT_APP_BACKEND
const api = BACKEND+"/student";

// Get all students

export const loginStudent = async ({rollNo,studentId}) => {
  try {
    const response = await axios.post(`${api}/studentLogin`,{rollNo,studentId},{
   withCredentials:true
    });
    return response;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};


export const getAllStudents = async () => {
  try {
    const response = await axios.get(`${api}/students`,{
      withCredentials:true
       });
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};


export const getAllStudentsByClassName = async (className) => {
  try {
    const response = await axios.get(`${api}/studentsByClassName/${className}`,{
      withCredentials:true
       });
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

// Get a single student by roll number
export const getStudentByRollNo = async (rollNo) => {
  try {
    const response = await axios.get(`${api}/students/${rollNo}`,{
      withCredentials:true
       });
    return response.data;
  } catch (error) {
    console.error(`Error fetching student with rollNo ${rollNo}:`, error);
    throw error;
  }
};

// Create a new student
export const createStudent = async (studentData) => {
  try {
    console.log(studentData)
    const response = await axios.post(`${api}/students`, studentData,{
      withCredentials:true
       });
    return response;
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

// Update an existing student by roll number
export const updateStudent = async (rollNo, studentData) => {
  try {
    const response = await axios.put(`${api}/students/${rollNo}`, studentData,{
      withCredentials:true
       });
    return response.data;
  } catch (error) {
    console.error(`Error updating student with rollNo ${rollNo}:`, error);
    throw error;
  }
};

// Delete a student by roll number
export const deleteStudent = async (rollNo) => {
  try {
    const response = await axios.delete(`${api}/students/${rollNo}`,{
      withCredentials:true
       });
    return response.data;
  } catch (error) {
    console.error(`Error deleting student with rollNo ${rollNo}:`, error);
    throw error;
  }
};
