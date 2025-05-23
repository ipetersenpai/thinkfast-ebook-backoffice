import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/config";
import { getTokenFromCookies } from "@/lib/auth";

// Interfaces
export interface Course {
    id: number;
    term: string;
    title: string;
    description: string;
    faculty_id: number;
    faculty_full_name: string;
    created_at: string;
    updated_at: string;
}

export interface CreateCourse {
    term: string;
    title: string;
    description: string;
    faculty_id: number;
    faculty_full_name: string;
}

export interface FacultyList {
    user_id: number;
    full_name: string;
}

// Create Course (POST)
const createCourseAPI = async (data: CreateCourse): Promise<Course> => {
    const token = getTokenFromCookies();
    if (!token) throw new Error("No authentication token found");

    try {
        const response = await axios.post<Course>(`${API_URL}/api/courses`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to create course");
    }
};

// Get Courses by Term (GET)
const getCoursesByTermAPI = async (term: string): Promise<Course[]> => {
    const token = getTokenFromCookies();
    if (!token) throw new Error("No authentication token found");

    try {
        const response = await axios.get<Course[]>(`${API_URL}/api/courses`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: { term },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to fetch courses");
    }
};


// Get Course by ID (GET)
const getCourseByIdAPI = async (id: number): Promise<Course> => {
    const token = getTokenFromCookies();
    if (!token) throw new Error("No authentication token found");

    try {
      const response = await axios.get<Course>(`${API_URL}/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },

      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch course by ID");
    }
  };

  // Update Course (PUT)
const updateCourseAPI = async (data: Course): Promise<Course> => {
    const token = getTokenFromCookies();
    if (!token) throw new Error("No authentication token found");

    try {
        const response = await axios.put<Course>(`${API_URL}/api/courses/${data.id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to update course");
    }
};


// Get Faculty List (GET)
const getFacultyListAPI = async (): Promise<FacultyList[]> => {
    const token = getTokenFromCookies();
    if (!token) throw new Error("No authentication token found");

    try {
        const response = await axios.get<FacultyList[]>(`${API_URL}/api/courses/teachers`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to fetch faculty list");
    }
};

// Get Courses by Term and Faculty ID
const getCoursesByTermAndFacultyAPI = async (
    term: string,
    faculty_id: number
  ): Promise<Course[]> => {
    const token = getTokenFromCookies();
    if (!token) throw new Error("No authentication token found");

    try {
      const response = await axios.get<Course[]>(
        `${API_URL}/api/courses/faculty/term=${term}/faculty_id=${faculty_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch courses by term and faculty"
      );
    }
  };

// useMutation for creating a course
export const useCreateCourse = () => {
    return useMutation({
        mutationFn: createCourseAPI,
    });
};

// useQuery for fetching courses by term and faculty_id
export const useCoursesByTermAndFaculty = (
    term: string,
    faculty_id: number
  ) => {
    return useQuery<Course[]>({
      queryKey: ["courses", "term", term, "faculty", faculty_id],
      queryFn: () => getCoursesByTermAndFacultyAPI(term, faculty_id),
      enabled: !!term && !!faculty_id,
    });
  };


// useQuery for fetching courses by term
export const useCoursesByTerm = (term: string) => {
    return useQuery<Course[]>({
        queryKey: ["courses", term],
        queryFn: () => getCoursesByTermAPI(term),
        enabled: !!term,
    });
};

export const useCourseById = (id: number) => {
    return useQuery<Course>({
      queryKey: ["course", id],
      queryFn: () => getCourseByIdAPI(id),
      enabled: !!id,
    });
  };

// useMutation for updating a course
export const useUpdateCourse = () => {
    return useMutation({
        mutationFn: updateCourseAPI,
    });
};


// useQuery for fetching faculty list
export const useFacultyList = () => {
    return useQuery<FacultyList[]>({
        queryKey: ["facultyList"],
        queryFn: getFacultyListAPI,
    });
};

