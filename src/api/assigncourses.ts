// src/api/assigncourses.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/config";
import { getTokenFromCookies } from "@/lib/auth";

export interface AssignCourses {
  faculty_full_name: string;
  description: string;
  title: string;
  id: number;
  term: string;
  enrolled_student_id: number;
  course_id: number;
  created_at: string;
  updated_at: string;
  course?: {
    id: number;
    title: string;
    description: string;
    faculty_id: number;
    faculty_full_name: string;
  };
}


// 📌 Create multiple assign courses
const createAssignCourses = async (
  assigncourses: Omit<
    AssignCourses,
    "id" | "created_at" | "updated_at" | "course"
  >[]
): Promise<AssignCourses[]> => {
  const token = getTokenFromCookies();
  if (!token) throw new Error("No authentication token found");

  try {
    const response = await axios.post<AssignCourses[]>(
      `${API_URL}/api/assign-course`,
      assigncourses,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to assign the course"
    );
  }
};

// 📌 Fetch assigned courses for one student
const fetchAssignedCoursesByStudent = async (
  studentId: number
): Promise<AssignCourses[]> => {
  const token = getTokenFromCookies();
  if (!token) throw new Error("No authentication token found");

  const response = await axios.get<AssignCourses[]>(
    `${API_URL}/api/assign-course/enrolled/${studentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
// Fetch unassigned courses of the selected student
const fetchUnassignedCourses = async (
  studentId: number,
  term?: string
): Promise<AssignCourses[]> => {
  const token = getTokenFromCookies();
  if (!token) throw new Error("No authentication token found");

  const response = await axios.get<AssignCourses[]>(
    `${API_URL}/api/assign-course`,
    {
      params: { student_id: studentId, ...(term && { term }) },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// 📌 Delete an assigned course by its ID
const deleteAssignCourseById = async (assignCourseId: number): Promise<void> => {
  const token = getTokenFromCookies();
  if (!token) throw new Error("No authentication token found");

  try {
    await axios.delete(`${API_URL}/api/assign-course/${assignCourseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to delete assigned course"
    );
  }
};





// 📌 React Query hook: Create Assign Courses
export const useCreateAssignCourses = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAssignCourses,
    onSuccess: () => {
      // Optional: invalidate queries if needed
      queryClient.invalidateQueries({ queryKey: ["assignedCourses"] });
    },
  });
};

// 📌 React Query hook: Fetch assigned courses for a student
export const useAssignedCoursesByStudent = (studentId: number) => {
  return useQuery({
    queryKey: ["assignedCourses", studentId],
    queryFn: () => fetchAssignedCoursesByStudent(studentId),
    enabled: !!studentId, // only run if studentId is valid
  });
};
// React Query Hook: Fetch unassigned courses of the selected student
export const useUnassignedCourses = (studentId: number, term?: string) => {
  return useQuery({
    queryKey: ["unassignedCourses", studentId, term],
    queryFn: () => fetchUnassignedCourses(studentId, term),
    enabled: !!studentId,
  });
};


// 📌 React Query hook: Delete assigned course
export const useDeleteAssignCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAssignCourseById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignedCourses"] });
    },
  });
};

