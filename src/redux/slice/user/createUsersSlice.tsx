import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getTokenFromCookies } from '@/lib/auth';

export interface CreateUserInput {
  firstname: string;
  lastname: string;
  middlename?: string;
  username: string;
  password: string;
  email: string;
  role: string;
  status: string;
}

interface CreateUserState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: CreateUserState = {
  loading: false,
  success: false,
  error: null,
};

// Async thunk to create a user
export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData: CreateUserInput, { rejectWithValue }) => {
    try {
      const token = getTokenFromCookies();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );


      return response.data; // new user data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create user');
    }
  }
);

const createUsersSlice = createSlice({
  name: 'createUser',
  initialState,
  reducers: {
    resetCreateUserState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCreateUserState } = createUsersSlice.actions;
export default createUsersSlice.reducer;
