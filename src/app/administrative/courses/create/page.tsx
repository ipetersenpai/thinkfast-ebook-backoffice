"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiChevronRight } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

import {
  useCreateCourse,
  CreateCourse,
  useFacultyList,
} from "@/api/course";

import { useAcademicYears, AcademicYear } from "@/api/academicyear";

export default function CreateCoursePage() {
  const [form, setForm] = useState<CreateCourse>({
    term: "",
    title: "",
    description: "",
    faculty_id: 0,
    faculty_full_name: "",
  });

  const { data: facultyList = [], isLoading: isFacultyLoading } = useFacultyList();
  const { data: academicYears = [], isLoading: isAcademicYearLoading } = useAcademicYears();

  const {
    mutate: createCourse,
    isPending,
  } = useCreateCourse();

  // 🟡 Set default term from active academic year
  useEffect(() => {
    if (academicYears.length && !form.term) {
      const activeYear = academicYears.find((year) => year.status === "active");
      if (activeYear) {
        setForm((prev) => ({
          ...prev,
          term: activeYear.term,
        }));
      }
    }
  }, [academicYears]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "faculty_id" ? Number(value) : value,
    }));

    if (name === "faculty_id") {
      const selected = facultyList.find((f) => f.user_id === Number(value));
      setForm((prev) => ({
        ...prev,
        faculty_full_name: selected?.full_name || "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCourse(form, {
      onSuccess: () => {
        toast.success("Course created successfully!");
        setForm({
          term: "",
          title: "",
          description: "",
          faculty_id: 0,
          faculty_full_name: "",
        });
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to create course");
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center flex-wrap text-sm text-gray-600 overflow-x-auto">
        <a href="/" className="hover:text-blue-800 hover:underline">
          Dashboard
        </a>
        <FiChevronRight className="mx-2 text-gray-400" size={14} />
        <a
          href="/administrative/courses"
          className="hover:text-blue-800 hover:underline"
        >
          Courses
        </a>
        <FiChevronRight className="mx-2 text-gray-400" size={14} />
        <span className="text-blue-600">Create Course</span>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <h2 className="text-xl font-semibold text-gray-700">Create Course</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Term (from academic years) */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Term
              </label>
              <select
                name="term"
                value={form.term}
                onChange={handleChange}
                required
                disabled={isAcademicYearLoading}
                className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              >
                <option value="" disabled>
                  {isAcademicYearLoading ? "Loading terms..." : "Select term"}
                </option>
                {academicYears.map((year: AcademicYear) => (
                  <option key={year.term} value={year.term}>
                    {year.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="e.g. English I"
                className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Course Description
            </label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              placeholder="e.g. A basic overview of grammar concepts"
              className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          {/* Faculty */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Assigned Faculty
            </label>
            <select
              name="faculty_id"
              value={form.faculty_id || ""}
              onChange={handleChange}
              required
              disabled={isFacultyLoading}
              className="block w-full md:w-[49%] px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            >
              <option value="" disabled>
                {isFacultyLoading ? "Loading faculty..." : "Select faculty"}
              </option>
              {facultyList.map((faculty) => (
                <option key={faculty.user_id} value={faculty.user_id}>
                  {faculty.full_name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
            >
              {isPending ? "Creating..." : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
