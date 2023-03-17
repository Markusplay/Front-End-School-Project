import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Course } from '../type';

import axiosInstance from '/Front-End-School-Project/src/pages/api/instance';

export const fetchCourses = createAsyncThunk<Course[]>(
  'courses/getCourses',

  async () => {
    try {
      const { data } = await axiosInstance.get<{ courses: Course[] }>(
        'core/preview-courses',
      );
      return data.courses;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data.message);
      } else {
        throw err;
      }
    }
  },
);
