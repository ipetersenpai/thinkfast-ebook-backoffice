"use client";
import { useState, useEffect } from "react";
import {
  FiChevronRight,
  FiSearch,
  FiChevronLeft,
  FiEye,
  FiTrash2,
  FiChevronUp,
  FiChevronDown,
  FiEdit2,
} from "react-icons/fi";

interface Course {
  id: number;
  block_name: string; // Renamed from description to block_name
  created_at: string;
  updated_at: string;
}

interface SortConfig {
  key: keyof Course | null;
  direction: "asc" | "desc";
}

export default function StudentScoresPage() {
  const mockCourses: Course[] = [
    {
      id: 101,
      block_name: "Grade 6 - Subjects", // Updated key
      created_at: "2024-01-10",
      updated_at: "2024-05-01",
    },
    {
      id: 102,
      block_name: "Grade 4 - Subjects", // Updated key
      created_at: "2024-02-12",
      updated_at: "2024-04-28",
    },
    {
      id: 103,
      block_name: "Grade 5 - Subjects", // Updated key
      created_at: "2024-03-15",
      updated_at: "2024-05-10",
    },
    {
      id: 104,
      block_name: "Grade 7 - Subjects", // Updated key
      created_at: "2024-01-20",
      updated_at: "2024-05-05",
    },
    {
      id: 105,
      block_name: "Grade 8 - Subjects", // Updated key
      created_at: "2024-02-18",
      updated_at: "2024-05-12",
    },
    {
      id: 106,
      block_name: "Grade 9 - Subjects", // Updated key
      created_at: "2024-03-22",
      updated_at: "2024-05-15",
    },
    {
      id: 107,
      block_name: "Grade 10 - Subjects", // Updated key
      created_at: "2024-04-01",
      updated_at: "2024-05-20",
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

  useEffect(() => {
    const filtered = mockCourses.filter((course) =>
      course.block_name.toLowerCase().includes(searchTerm.toLowerCase()) // Updated key
    );
    setCourses(filtered);
    setCurrentPage(1);
  }, [searchTerm]);

  const requestSort = (key: keyof Course) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...courses].sort((a, b) => {
      if (a[key]! < b[key]!) return direction === "asc" ? -1 : 1;
      if (a[key]! > b[key]!) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setCourses(sorted);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const headers: { key: keyof Course; label: string }[] = [
    { key: "id", label: "ID" },
    { key: "block_name", label: "Block Name" }, // Updated label and key
    { key: "created_at", label: "Created At" },
    { key: "updated_at", label: "Updated At" },
  ];

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
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-600">
        <a
          href="/dashboard"
          className="text-gray-500 hover:text-blue-800 hover:underline"
        >
          Dashboard
        </a>
        <FiChevronRight className="mx-2 text-gray-400" size={14} />
        <span className="text-blue-600">Blocked Courses</span>
      </div>

      {/* Search & Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search block courses..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <a
            href="/administrative/block-courses/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 hover:cursor-pointer"
          >
            Add Block Courses
          </a>
        </div>

        {/* Courses Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header.key}
                    onClick={() => requestSort(header.key)}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    <div className="flex items-center">
                      {header.label}
                      {sortConfig.key === header.key && (
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
                ))}

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {course.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {course.block_name} {/* Updated key */}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(course.created_at)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(course.updated_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-4">
                      <button className="text-yellow-600 hover:text-yellow-900 mr-4">
                        <FiEdit2 size={18} />
                      </button>
                      <a
                        href={`/administrative/courses/${course.id}`}
                        className="text-blue-600 hover:text-blue-900"
                        title="View"
                      >
                        <FiEye size={18} />
                      </a>
                      <button
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
