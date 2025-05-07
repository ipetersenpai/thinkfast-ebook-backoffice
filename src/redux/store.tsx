// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/auth/authSlice';
import userReducer from './slice/user/userSlice';
import updateUserReducer from './slice/user/updateUserSlice';
import getUsersReducer from './slice/user/getUsersSlice';
import createUsersReducer from './slice/user/createUsersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    getUsers: getUsersReducer,
    createUsers: createUsersReducer,
    updateUser: updateUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
