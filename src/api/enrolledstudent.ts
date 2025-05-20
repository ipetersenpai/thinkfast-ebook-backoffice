//src/api/enrolledstudent.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/config";
import { getTokenFromCookies } from "@/lib/auth";

export interface Students {
    id: number;
    term: string;
    firstname: string;
    middlename: string;
    lastname: string;
    session_id: number;
    student_id: number;
    student_session_id: number;
    year_level: string;
    created_at: string;
    updated_at: string;
}

// Create multiple students
const createEnrolledStudents = async (
    students: Omit<Students, "id" | "created_at" | "updated_at">[]
): Promise<Students[]> => {
    const token = getTokenFromCookies();
    if (!token) throw new Error("No authentication token found");

    try {
        const response = await axios.post<Students[]>(
            `${API_URL}/api/enroll-student`,
            students,
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
            error.response?.data?.message || "Failed to create students"
        );
    }
};

// Fetch students by term
const getEnrolledStudentByTerm = async (term: string): Promise<Students[]> => {
    const token = getTokenFromCookies();
    if (!token) throw new Error("No authentication token found");

    try {
        const response = await axios.get<Students[]>(
            `${API_URL}/api/enroll-student/term/${term}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch students"
        );
    }
};


// Fetch student by ID
const getEnrolledStudentById = async (id: number): Promise<Students> => {
    const token = getTokenFromCookies();
    if (!token) throw new Error("No authentication token found");

    try {
        const response = await axios.get<Students>(
            `${API_URL}/api/enroll-student/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch student"
        );
    }
};

// Update student information
const updateEnrolledStudent = async (data: Students): Promise<Students> => {
    const token = getTokenFromCookies();
    if (!token) throw new Error("No authentication token found");

    try {
        const response = await axios.put<Students>(
            `${API_URL}/api/enroll-student/${data.id}`,
            data,
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
            error.response?.data?.message || "Failed to update student"
        );
    }
};

// Delete student by ID
const deleteEnrolledStudentById = async (id: number): Promise<void> => {
    const token = getTokenFromCookies();
    if (!token) throw new Error("No authentication token found");

    try {
        await axios.delete(`${API_URL}/api/enroll-student/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to delete student"
        );
    }
};

// React Query hook: Create students
export const useCreateEnrolledStudents = () => {
    return useMutation({
        mutationFn: createEnrolledStudents,
    });
};

// React Query hook: Fetch student by ID
export const useEnrolledStudentById = (id: number) => {
    return useQuery<Students>({
        queryKey: ["enrolled-student", id],
        queryFn: () => getEnrolledStudentById(id),
        enabled: !!id,
    });
};

// React Query hook: Fetch students by term
export const useEnrolledStudentByTerm = (term: string) => {
    return useQuery<Students[]>({
        queryKey: ["courses", term],
        queryFn: () => getEnrolledStudentByTerm(term),
        enabled: !!term,
    });
};

// React Query hook: Update student
export const useUpdatedEnrolledStudent = () => {
    return useMutation({
        mutationFn: updateEnrolledStudent,
    });
};

// React Query hook: Delete student by ID
export const useDeleteEnrolledStudent = () => {
    return useMutation({
        mutationFn: deleteEnrolledStudentById,
    });
};
