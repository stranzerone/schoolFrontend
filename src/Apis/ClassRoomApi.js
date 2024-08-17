import axios from 'axios';
const BACKEND= process.env.REACT_APP_BACKEND

const api = BACKEND+'/classroom'; // Adjust the API base URL as needed

// Create a new classroom
export const createClassroom = async (classroomData) => {
  try {
    console.log(classroomData)
    const response = await axios.post(api, classroomData,{
      withCredentials:true
    });
    return response.data;
  } catch (error) {
    console.error('Error creating classroom:', error);
    throw error;
  }
};

// Get all classrooms
export const getAllClassrooms = async () => {
  try {
    const response = await axios.get(api,{
      withCredentials:true
    });
    console.log(response.data)

    return response.data;
  } catch (error) {
    console.error('Error fetching classrooms:', error);
    throw error;
  }
};

// Get a single classroom by ID
export const getClassroomById = async (id) => {
  try {
    const response = await axios.get(`${api}/${id}`,{
      withCredentials:true
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(`Error fetching classroom with ID ${id}:`, error);
    throw error;
  }
};

// Update a classroom by ID
export const updateClassroom = async (id, classroomData) => {
  try {
    const response = await axios.put(`${api}/${id}`, classroomData,{
      withCredentials:true
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating classroom with ID ${id}:`, error);
    throw error;
  }
};

// Delete a classroom by ID
export const deleteClassroom = async (id) => {
  try {
    const response = await axios.delete(`${api}/${id}`,{
      withCredentials:true
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting classroom with ID ${id}:`, error);
    throw error;
  }
};
