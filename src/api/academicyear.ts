import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export interface AcademicYear extends AcademicYearData {
  id: number;
  created_at: string;
  updated_at: string;
}

// Create a new academic year
const createAcademicYearAPI = async (data: AcademicYearData) => {
  const token = getTokenFromCookies();
  if (!token) throw new Error("No authentication token found");

  const response = await axios.post(`${API_URL}/api/academic_year/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const useCreateAcademicYear = () => {
  return useMutation({
    mutationFn: createAcademicYearAPI,
  });
};

// Fetch all academic years
const fetchAcademicYears = async (): Promise<AcademicYear[]> => {
  const token = getTokenFromCookies();
  if (!token) throw new Error("No authentication token found");

  const response = await fetch(`${API_URL}/api/academic_year/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch academic years");
  return response.json();
};

// Fetch an academic year by ID
const fetchAcademicYearById = async (id: number): Promise<AcademicYear> => {
  const token = getTokenFromCookies();
  if (!token) throw new Error("No authentication token found");

  const response = await axios.get(`${API_URL}/api/academic_year/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Update an academic year by ID
const updateAcademicYearAPI = async ({ id, ...data }: AcademicYear): Promise<AcademicYear> => {
  const token = getTokenFromCookies();
  if (!token) throw new Error("No authentication token found");

  const response = await axios.put(`${API_URL}/api/academic_year/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

// Delete an academic year by ID
const deleteAcademicYearAPI = async (id: number) => {
  const token = getTokenFromCookies();
  if (!token) throw new Error("No authentication token found");

  const response = await axios.delete(`${API_URL}/api/academic_year/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const useAcademicYears = () => {
  return useQuery({
    queryKey: ["academicYears"],
    queryFn: fetchAcademicYears,
  });
};

export const useAcademicYearById = (id: number) => {
  return useQuery({
    queryKey: ["academicYear", id],
    queryFn: () => fetchAcademicYearById(id),
    enabled: !!id,
  });
};

export const useUpdateAcademicYear = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAcademicYearAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academicYears"] });
    },
  });
};

export const useDeleteAcademicYear = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAcademicYearAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academicYears"] });
    },
  });
};
