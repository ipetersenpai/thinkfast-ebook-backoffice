// src/api/user.ts
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTokenFromCookies, getUserIdFromToken } from "@/lib/auth";

export interface UserData {
  id: string | number;
  role: string;
  email: string;
  username: string;
  firstname: string;
  middlename: string;
  lastname: string;
  status: string;
}

export interface User {
  id: number;
  student_id: number;
  year_level: number;
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

export interface UpdateUser {
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

// ✅ Fetch single user
export async function fetchUserDetails(id?: string): Promise<UserData> {
  const token = getTokenFromCookies();
  if (!token) throw new Error("No token found");

  const userId = id || getUserIdFromToken(token);
  if (!userId) throw new Error("Invalid user ID");

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/get-user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data as UserData;
}

// ✅ Fetch all users
export async function fetchUsers(): Promise<User[]> {
  const token = getTokenFromCookies();
  if (!token) throw new Error("No authentication token found");

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

// ✅ Create a user
export async function createUser(userData: CreateUserInput): Promise<User> {
  const token = getTokenFromCookies();
  if (!token) throw new Error("No authentication token found");

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
    userData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

// ✅ Update a user
export async function updateUser(userData: UpdateUser): Promise<User> {
  const token = getTokenFromCookies();
  if (!token) throw new Error("No authentication token found");

  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/update/${userData.id}`,
    userData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

// ⛳ React Query hooks

// 🔁 useQuery: Single user
export const useUserDetails = (id?: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserDetails(id),
    enabled: !!id, // prevent auto-fetch if id is undefined
  });
};

// 🔁 useQuery: All users
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

// 🔁 useMutation: Create user
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); // Refresh users list
    },
  });
};

// 🔁 useMutation: Update user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); // Refresh users list
    },
  });
};
