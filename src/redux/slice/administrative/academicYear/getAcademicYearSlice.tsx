// src/redux/slice/administrative/academicYear/getAcademicYearSlice.tsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getTokenFromCookies } from '@/lib/auth';

export interface AcademicYear {
  id: number;
  term: string;
  description: string;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

interface GetAcademicYearState {
  academicYear: AcademicYear[];
  loading: boolean;
  error: string | null;
}

const initialState: GetAcademicYearState = {
  academicYear: [],
  loading: false,
  error: null,
};

// ✅ Async thunk to fetch academic years
export const fetchAcademicYear = createAsyncThunk(
  'academicYear/fetchAcademicYear',
  async (_, { rejectWithValue }) => {
    try {
      const token = getTokenFromCookies();
      if (!token) return rejectWithValue('No authentication token found');

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/academic_year/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch academic year');
    }
  }
);

// ✅ Slice for academic year
const academicYearSlice = createSlice({
  name: 'academicYear',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcademicYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAcademicYear.fulfilled, (state, action) => {
        state.loading = false;
        state.academicYear = action.payload;
      })
      .addCase(fetchAcademicYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default academicYearSlice.reducer;
