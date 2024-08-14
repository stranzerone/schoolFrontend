// apis/timetableApi.js

import axios from 'axios';

// Base URL for the API
const BASE_URL = 'https://schoolbackend-vktl.onrender.com/teacherSchedule'; // Adjust the URL as needed

// Create a new timetable entry
export const createTimetable = async (timetableData) => {
  try {
    const response = await axios.post(BASE_URL, timetableData);
    return response.data;
  } catch (error) {
    console.error('Error creating timetable:', error);
    throw error;
  }
};



// Get all timetable entries
export const getAllTimetables = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching timetables:', error);
    throw error;
  }
};

export const getClassTimeTable = async (classroom) => {
  try {
    const response = await axios.get(BASE_URL+"/classTimeTable/"+classroom);
    return response.data;
  } catch (error) {
    console.error('Error fetching timetables:', error);
    throw error;
  }
};

// Get a timetable entry by ID
export const getTimetableById = async (id) => {
  try {
    console.log(id,"sahil")
    const response = await axios.get(`${BASE_URL}/${id}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(`Error fetching timetable with ID ${id}:`, error);
    throw error;
  }
};

// Update a timetable entry by ID
export const updateTimetable = async (id, timetableData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, timetableData);
    return response.data;
  } catch (error) {
    console.error(`Error updating timetable with ID ${id}:`, error);
    throw error;
  }
};
// src/Apis/TeacherScheduleApi.js



export const getScheduleByClassroomTeacherTime = async (className, teacherName, startTime) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        className,
        teacherName,
        startTime,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching schedule:', error);
    throw error;
  }
};


// Delete a timetable entry by ID
export const deleteTimetable = async (id) => {
  try {
    console.log(id,"id for deletion")
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting timetable with ID ${id}:`, error);
    throw error;
  }
};
