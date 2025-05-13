import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getTokenFromCookies, getUserIdFromToken } from '@/lib/auth';

interface UserData {
  id: string | number;
  role: string;
  email: string;
  username: string;
  firstname: string;
  middlename: string;
  lastname: string;
  status: string;
}

interface UserState extends Partial<UserData> {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UserState = {
  id: undefined,
  role: undefined,
  email: undefined,
  username: undefined,
  firstname: undefined,
  middlename: undefined,
  lastname: undefined,
  status: undefined,
  loading: false,
  error: null,
  success: false,
};

export const fetchUserDetails = createAsyncThunk<
  UserData,
  { id?: string },
  { rejectValue: string }
>('user/fetchUserDetails', async ({ id } = {}, { rejectWithValue }) => {
  try {
    const token = getTokenFromCookies();
    if (!token) throw new Error('No token found');

    const userId = id || getUserIdFromToken(token);
    if (!userId) throw new Error('Invalid user ID');

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/get-user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as UserData;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: () => initialState,
    resetUserState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.success = true;
        Object.assign(state, action.payload);
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch user details';
      });
  },
});

export const { clearUser, resetUserState } = userSlice.actions;
export default userSlice.reducer;
