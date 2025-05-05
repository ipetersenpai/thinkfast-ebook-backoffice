"use client";
import { useState, useEffect } from "react";
import {
  FiChevronRight,
  FiSearch,
  FiChevronUp,
  FiChevronDown,
  FiEdit2,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight as FiChevronRightIcon,
} from "react-icons/fi";

interface AcademicYear {
  id: number;
  term: string; // e.g., "2425"
  description: string; // e.g., "Academic Year 2024-2025"
  status: "Active" | "Inactive";
  created_at: string;
  updated_at: string;
}

interface SortConfig {
  key: keyof AcademicYear | null;
  direction: "asc" | "desc";
}

export default function AcademicYearPage() {
  const mockAcademicYears: AcademicYear[] = [
    {
      id: 1,
      term: "2425",
      description: "Academic Year 2024-2025",
      status: "Active",
      created_at: "2024-01-15",
      updated_at: "2024-06-20",
    },
    {
      id: 2,
      term: "2324",
      description: "Academic Year 2023-2024",
      status: "Inactive",
      created_at: "2023-01-10",
      updated_at: "2023-06-15",
    },
    {
      id: 3,
      term: "2223",
      description: "Academic Year 2022-2023",
      status: "Inactive",
      created_at: "2022-01-05",
      updated_at: "2022-06-10",
    },
  ];

  const [academicYears, setAcademicYears] = useState<AcademicYear[]>(mockAcademicYears);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const filtered = mockAcademicYears.filter(
      (ay) =>
        ay.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ay.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ay.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setAcademicYears(filtered);
    setCurrentPage(1);
  }, [searchTerm]);

  const requestSort = (key: keyof AcademicYear) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...academicYears].sort((a, b) => {
      if (a[key]! < b[key]!) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key]! > b[key]!) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setAcademicYears(sorted);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = academicYears.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(academicYears.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const formatDate = (dateString: string): string => {
    if (typeof window === "undefined") return dateString;
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-600">
        <a href="/administrative" className="text-gray-500 hover:text-blue-800 hover:underline">
          Dashboard
        </a>
        <FiChevronRight className="mx-2 text-gray-400" size={14} />
        <a href="/administrative/academic-year" className="text-blue-600 hover:text-blue-800 hover:underline">
          Academic Year Management
        </a>
      </div>

      {/* Search & Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search academic years..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            Add New Academic Year
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["id", "term", "description", "status", "created_at", "updated_at"].map((key) => (
                  <th
                    key={key}
                    onClick={() => requestSort(key as keyof AcademicYear)}
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
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((ay) => (
                  <tr key={ay.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500">{ay.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{ay.term}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{ay.description}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          ay.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {ay.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(ay.created_at)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(ay.updated_at)}</td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-4">
                        <FiEdit2 size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No academic years found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {academicYears.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, academicYears.length)} of {academicYears.length} academic years
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg border ${
                  currentPage === 1 ? "text-gray-400 border-gray-300 cursor-not-allowed" : "text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <FiChevronLeft size={18} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 rounded-lg border ${
                    currentPage === number ? "bg-blue-600 text-white border-blue-600" : "text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg border ${
                  currentPage === totalPages ? "text-gray-400 border-gray-300 cursor-not-allowed" : "text-gray-700 border-gray-300 hover:bg-gray-50"
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
