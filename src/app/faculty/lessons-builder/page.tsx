"use client";
import { useState, useEffect } from "react";
import {
  FiChevronRight,
  FiSearch,
  FiChevronUp,
  FiChevronDown,
  FiEdit2,
  FiChevronLeft,
  FiChevronRight as FiChevronRightIcon,
} from "react-icons/fi";
import Link from "next/link";
import { useAcademicYears, AcademicYear } from "@/api/academicyear";
import { useCoursesByTermAndFaculty } from "@/api/course";
import { getTokenFromCookies, getTokenInfo } from "@/lib/auth";

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  created_at: string;
  updated_at: string;
}
interface SortConfig {
  key: keyof Course | null;
  direction: "asc" | "desc";
}

export default function DashboardPage() {

  const [userId, setUserId ] = useState("");
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("");

  useEffect(() => {
    const token = getTokenFromCookies();

    if (token) {
      const { id } = getTokenInfo(token);
      setUserId(String(id));
    }
  }, []);

  const { data: academicYear = [] } = useAcademicYears();
  useEffect(() => {
    if (academicYear.length > 0 && !selectedAcademicYear) {
      const activeYear = academicYear.find(
        (year: AcademicYear) => year.status === "active"
      );
      if (activeYear) {
        setSelectedAcademicYear(activeYear.term);
      }
    }
  }, [academicYear, selectedAcademicYear]);

  const { data: coursesList, isPending } = useCoursesByTermAndFaculty(
    selectedAcademicYear,
    Number(userId)
  );


  // Mock data for courses
  const mockCourses: Course[] = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      description: "Fundamentals of programming and algorithms",
      instructor: "Dr. Alice Johnson",
      created_at: "2023-01-15",
      updated_at: "2023-06-20",
    },

  ];

  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 50;

  // Search functionality
  useEffect(() => {
    const filtered = mockCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCourses(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm]);

  // Sort functionality
  const requestSort = (key: keyof Course) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedCourses = [...courses].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setCourses(sortedCourses);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  const formatDate = (dateString: string): string => {
    if (typeof window === "undefined") {
      // On the server, just return the raw YYYY-MM-DD string (matches DB)
      return dateString;
    }
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm text-gray-600">
        <a
          href="/"
          className="text-gray-500 hover:text-blue-800 hover:underline"
        >
          Dashboard
        </a>
        <FiChevronRight className="mx-2 text-gray-400" size={14} />
        <a
          href="/faculty/lessons-builder"
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          Lessons Builder
        </a>
      </div>

      {/* Search and Table Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative w-full md:w-1/4 md:ml-auto">
            <div className="relative">
            <select
              id="academicYear"
              name="academicYear"
              value={selectedAcademicYear}
              onChange={(e) => setSelectedAcademicYear(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg appearance-none bg-white"
            >
              <option value="">Select Academic Year</option>
              {academicYear.map((year: AcademicYear) => (
                <option key={year.term} value={year.term}>
                  {year.description}
                </option>
              ))}
            </select>

              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Updated Table Header */}
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("id")}
                >
                  <div className="flex items-center">
                    ID
                    {sortConfig.key === "id" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? (
                          <FiChevronUp size={16} />
                        ) : (
                          <FiChevronDown size={16} />
                        )}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("title")}
                >
                  <div className="flex items-center">
                    Title
                    {sortConfig.key === "title" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? (
                          <FiChevronUp size={16} />
                        ) : (
                          <FiChevronDown size={16} />
                        )}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[300px]"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[300px]"
                >
                  Instructor {/* New header for instructor */}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>

            {/* Updated Courses Table */}
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {course.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 max-w-xs">
                        {course.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {course.instructor} {/* New instructor field */}
                      </div>
                    </td>
                    <td className="px-6 py-4 flex items-center gap-2 justify-center">
                      <Link href={`lessons-builder/${course.id}/update`}>
                        <button className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-18 cursor-pointer">
                          <FiEdit2 size={16} />
                          Edit
                        </button>
                      </Link>
                      <Link href={`lessons-builder/${course.id}/create`}>
                        <button className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-23 cursor-pointer">
                          <FiEdit2 size={16} />
                          Create
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  {/* Updated to reflect the new column */}
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No courses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {courses.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, courses.length)} of {courses.length}{" "}
              courses
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg border ${
                  currentPage === 1
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <FiChevronLeft size={18} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 rounded-lg border ${
                      currentPage === number
                        ? "bg-blue-600 text-white border-blue-600"
                        : "text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {number}
                  </button>
                )
              )}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg border ${
                  currentPage === totalPages
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <FiChevronRightIcon size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
