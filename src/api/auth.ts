// src/api/auth.ts
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { API_URL } from "@/config";

// Type for the login input (username & password)
type LoginInput = {
  username: string;
  password: string;
};

// Type for the response from the API (token & user)
type LoginResponse = {
  token: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
};

const loginUser = async ({ username, password }: LoginInput): Promise<LoginResponse> => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    // Throw with the actual error message from backend
    throw new Error(data.error || "Login failed");
  }

  return data; // This will be of type LoginResponse
};


// The custom hook to use the login mutation
export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: loginUser, // The mutation function
    onSuccess: (data: { token: string; user: any; }) => {
      // Store token in cookies
      Cookies.set("xyz_token", data.token, {
        expires: 1,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "development",
        path: "/",
      });

      // Handle further logic after successful login (e.g., redirect)
      console.log("User logged in", data.user);
    },
    onError: (error: Error) => {
      console.error("Login failed:", error.message);
    },
  });
};
