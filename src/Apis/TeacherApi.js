import axios from "axios";

const api = "https://schoolbackend-vktl.onrender.com/teachers";

// Get all teachers

export const teacherLogin = async ({teacherId,dateOfBirth}) => {
  try {
    const response = await axios.post(`${api}/teacherLogin`,{teacherId,dateOfBirth},{
      withCredentials:true
    });
  
    return response;
  } catch (error) {
    console.error("Error while Login:", error);
    throw error;
  }
};



export const principalLogin = async ({username,password}) => {
  try {
    const response = await axios.post(`${api}/principalLogin`,{username,password});
    return response;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};






export const getAllTeachers = async () => {
  try {
    const response = await axios.get(`${api}`,{
      withCredentials:true
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    throw error;
  }
};

// Get a single teacher by ID
export const getTeacherById = async (id) => {
  try {
    const response = await axios.get(`${api}/${id}`,{
      withCredentials:true
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching teacher with ID ${id}:`, error);
    throw error;
  }
};

// Create a new teacher
export const createTeacher = async (teacherData) => {
  try {
    console.log(teacherData,"data")
    const response = await axios.post(`${api}`, teacherData,{
      withCredentials:true
    });
    return response.status;
  } catch (error) {
    console.error("Error creating teacher:", error);
    throw error;
  }
};

// Update an existing teacher by ID
export const updateTeacher = async (id, teacherData) => {
  try {
    const response = await axios.put(`${api}/${id}`, teacherData,{
      withCredentials:true
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating teacher with ID ${id}:`, error);
    throw error;
  }
};

// Delete a teacher by ID
export const deleteTeacher = async (id) => {
  try {
    const response = await axios.delete(`${api}/${id},{
      withCredentials:true
    }`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting teacher with ID ${id},{
      withCredentials:true
    }`, error);
    throw error;
  }
};
