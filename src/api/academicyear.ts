// src/api/academicyear.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/config";
import { getTokenFromCookies } from "@/lib/auth";

export interface AcademicYearData {
  term: string;
  description: string;
  status: string;
  start_date: string;
  end_date: string;
}

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

// 🔁 API call function
const createAcademicYearAPI = async (data: AcademicYearData) => {
  const token = getTokenFromCookies();
  if (!token) throw new Error("No authentication token found");

  try {
    const response = await axios.post(`${API_URL}/api/academic_year/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create academic year");
  }
};

// ✅ React Query mutation hook
export const useCreateAcademicYear = () => {
  return useMutation({
    mutationFn: createAcademicYearAPI,
  });
};

const fetchAcademicYears = async (): Promise<AcademicYear[]> => {
  const token = getTokenFromCookies();
  if (!token) throw new Error("No authentication token found");

  const response = await fetch(`${API_URL}/api/academic_year/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch academic years");
  }
  return response.json();
};

export const useAcademicYears = () => {
  return useQuery({
    queryKey: ["academicYears"],
    queryFn: fetchAcademicYears,
  });
};
