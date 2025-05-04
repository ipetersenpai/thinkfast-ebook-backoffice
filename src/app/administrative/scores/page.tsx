"use client";
import { useState, useEffect } from "react";
import {
  FiChevronRight,
  FiSearch,
  FiChevronUp,
  FiChevronDown,
  FiChevronLeft,
  FiEye,
  FiChevronRight as FiChevronRightIcon,
} from "react-icons/fi";
import { RiFileExcel2Fill } from "react-icons/ri";

interface StudentScore {
  student_id: number;
  fullname: string;
  year_level: string;
}

interface SortConfig {
  key: keyof StudentScore | null;
  direction: "asc" | "desc";
}

export default function StudentScoresPage() {
  const mockStudentScores: StudentScore[] = [
    {
      student_id: 1,
      fullname: "John Doe",
      year_level: "Grade 1",
    },
    {
      student_id: 2,
      fullname: "Jane Smith",
      year_level: "Grade 5",
    },
    {
      student_id: 3,
      fullname: "Michael Johnson",
      year_level: "Grade 8",
    },
    {
      student_id: 4,
      fullname: "Juan Dela Cruz",
      year_level: "Grade 3",
    },
    {
      student_id: 5,
      fullname: "Maria Santos",
      year_level: "Grade 6",
    },
    {
      student_id: 6,
      fullname: "Jose Rizal",
      year_level: "Grade 4",
    },
    {
      student_id: 7,
      fullname: "Andres Bonifacio",
      year_level: "Grade 7",
    },
    {
      student_id: 8,
      fullname: "Emilio Aguinaldo",
      year_level: "Grade 2",
    },
    {
      student_id: 9,
      fullname: "Gabriela Silang",
      year_level: "Grade 5",
    },
    {
      student_id: 10,
      fullname: "Apolinario Mabini",
      year_level: "Grade 8",
    },
    {
      student_id: 11,
      fullname: "Melchora Aquino",
      year_level: "Grade 6",
    },
    {
      student_id: 12,
      fullname: "Lapu-Lapu",
      year_level: "Grade 1",
    },
    {
      student_id: 13,
      fullname: "Antonio Luna",
      year_level: "Grade 7",
    },
  ];


  const [students, setStudents] = useState<StudentScore[]>(mockStudentScores);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("2024-2025");

  const itemsPerPage = 10;

  useEffect(() => {
    const filtered = mockStudentScores.filter(
      (student) =>
        student.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.year_level.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setStudents(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedAcademicYear]);

  const requestSort = (key: keyof StudentScore) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...students].sort((a, b) => {
      if (a[key]! < b[key]!) return direction === "asc" ? -1 : 1;
      if (a[key]! > b[key]!) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setStudents(sorted);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = students.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(students.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
        <span className="text-blue-600">Student Scores Management</span>
      </div>

      {/* Search & Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 hover:cursor-pointer">
            <RiFileExcel2Fill size={18} />
            Export Excel
          </button>

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
                <option value="2024-2025">Academic Year 2024-2025</option>
                <option value="2023-2024">Academic Year 2023-2024</option>
                <option value="2022-2023">Academic Year 2022-2023</option>
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["student_id", "fullname", "year_level"].map((key) => (
                  <th
                    key={key}
                    onClick={() => requestSort(key as keyof StudentScore)}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    <div className="flex items-center">
                      {key.replace("_", " ").toUpperCase()}
                      {sortConfig.key === key && (
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
              {currentItems.length > 0 ? (
                currentItems.map((student) => (
                  <tr key={student.student_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {student.student_id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {student.fullname}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {student.year_level}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        <FiEye size={16} />
                        View Score
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {students.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, students.length)} of {students.length}{" "}
              students
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
