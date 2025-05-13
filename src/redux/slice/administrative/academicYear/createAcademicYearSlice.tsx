// src/redux/slice/administrative/academicYear/createAcademicYearSlice.tsx
// src/redux/slice/administrative/academicYear/createAcademicYearSlice.tsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getTokenFromCookies } from '@/lib/auth';

interface CreateAcademicYearPayload {
  term: string;
  description: string;
  status: string;
  start_date: string;
  end_date: string;
}

interface CreateAcademicYearState {
  success: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: CreateAcademicYearState = {
  success: false,
  loading: false,
  error: null,
};

// ✅ Async thunk to create academic year
export const createAcademicYear = createAsyncThunk(
  'academicYear/createAcademicYear',
  async (data: CreateAcademicYearPayload, { rejectWithValue }) => {
    try {
      const token = getTokenFromCookies();
      if (!token) return rejectWithValue('No authentication token found');

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/academic_year/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create academic year');
    }
  }
);

// ✅ Slice for creating academic year
const createAcademicYearSlice = createSlice({
  name: 'createAcademicYear',
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.success = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAcademicYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAcademicYear.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createAcademicYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCreateState } = createAcademicYearSlice.actions;
export default createAcademicYearSlice.reducer;


