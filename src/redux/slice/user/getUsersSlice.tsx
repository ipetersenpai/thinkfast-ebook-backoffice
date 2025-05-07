import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getTokenFromCookies } from '@/lib/auth';

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    middlename: string;
    username: string;
    email: string;
    role: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface GetUsersState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: GetUsersState = {
    users: [],
    loading: false,
    error: null,
};

// Async thunk to fetch users with Authorization header
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const token = getTokenFromCookies();
        if (!token) {
            return rejectWithValue('No authentication token found');
        }

        const response = await axios.get('http://127.0.0.1:3500/api/users', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data; // returns full user data array
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
});

const getUsersSlice = createSlice({
    name: 'getUsers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default getUsersSlice.reducer;
