"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FiChevronRight } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

import {
  useUpdatedEnrolledStudent,
  useEnrolledStudentById,
} from "@/api/enrolledstudent";

import { useAcademicYears, AcademicYear } from "@/api/academicyear";

export default function UpdateEnrolledStudentPage() {
  const router = useRouter();
  const params = useParams();
  const studentId = params?.id ? Number(params.id) : null;

  useEffect(() => {
    if (!studentId) {
      toast.error("No student ID provided");
      router.push("/administrative/enrolled-students");
    }
  }, [studentId, router]);

  const [form, setForm] = useState({
    id: 0,
    term: "",
    firstname: "",
    middlename: "",
    lastname: "",
    session_id: 0,
    student_id: 0,
    student_session_id: 0,
    year_level: "",
    created_at: "",
    updated_at: "",
  });

  const { data: academicYears = [], isLoading: isAcademicYearLoading } =
    useAcademicYears();
  const { data: existingStudent, isLoading: isStudentLoading } =
    useEnrolledStudentById(studentId ?? 0);
  const { mutate: updateStudent, isPending: isUpdating } =
    useUpdatedEnrolledStudent();

  useEffect(() => {
    if (existingStudent) {
      setForm(existingStudent);
    }
  }, [existingStudent]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name.includes("_id") ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentId) {
      toast.error("Invalid student ID");
      return;
    }

    updateStudent(
      { ...form, updated_at: new Date().toISOString() },
      {
        onSuccess: () => {
          toast.success("Student enrollment updated successfully!");
          router.push("/administrative/enroll");
        },
        onError: (error: any) => {
          toast.error(error.message || "Failed to update enrollment");
        },
      }
    );
  };

  const isLoading = isAcademicYearLoading || isStudentLoading;

  return (
    <div className="space-y-6">
      <div className="flex items-center flex-wrap text-sm text-gray-600 overflow-x-auto">
        <a href="/" className="hover:text-blue-800 hover:underline">
          Dashboard
        </a>
        <FiChevronRight className="mx-2 text-gray-400" size={14} />
        <a
          href="/administrative/enroll"
          className="hover:text-blue-800 hover:underline"
        >
          Enroll Student Management
        </a>
        <FiChevronRight className="mx-2 text-gray-400" size={14} />
        <span className="text-blue-600">Update Student</span>
      </div>

      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <h2 className="text-xl font-semibold text-gray-700">
          Update Student Enrollment
        </h2>

        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Term
                </label>
                <select
                  name="term"
                  value={form.term}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select term
                  </option>
                  {academicYears.map((year: AcademicYear) => (
                    <option key={year.term} value={year.term}>
                      {year.description}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Year Level
                </label>
                <select
                  name="year_level"
                  value={form.year_level}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select year level
                  </option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={`Grade ${i + 1}`}>
                      Grade {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={form.firstname}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middlename"
                  value={form.middlename}
                  onChange={handleChange}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={form.lastname}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Student ID
                </label>
                <input
                  type="number"
                  name="student_id"
                  value={form.student_id}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Session ID
                </label>
                <input
                  type="number"
                  name="session_id"
                  value={form.session_id}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Student Session ID
                </label>
                <input
                  type="number"
                  name="student_session_id"
                  value={form.student_session_id}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isUpdating}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
              >
                {isUpdating ? "Updating..." : "Update Student Enrollment"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
