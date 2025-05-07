import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { getTokenFromCookies } from '@/lib/auth';

interface UpdateUserState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

interface UserUpdatePayload {
  id: string | number;
  firstname: string;
  lastname: string;
  middlename?: string;
  username: string;
  email: string;
  password?: string;
  role: string;
  status: string;
}

const initialState: UpdateUserState = {
  loading: false,
  success: false,
  error: null,
};

export const updateUser = createAsyncThunk<
  unknown,
  UserUpdatePayload,
  { rejectValue: string }
>('user/updateUser', async (userData, { rejectWithValue }) => {
  try {
    const token = getTokenFromCookies();
    const response = await axios.put(
      `http://127.0.0.1:3500/api/users/update/${userData.id}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const updateUserSlice = createSlice({
  name: 'updateUser',
  initialState,
  reducers: {
    resetUpdateState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update user';
      });
  },
});

export const { resetUpdateState } = updateUserSlice.actions;
export default updateUserSlice.reducer;
