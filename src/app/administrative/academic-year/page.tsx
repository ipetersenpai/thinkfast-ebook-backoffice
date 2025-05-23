"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
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
import { useAcademicYears, AcademicYear } from "@/api/academicyear";

interface SortConfig {
  key: keyof AcademicYear | null;
  direction: "asc" | "desc";
}

export default function AcademicYearPage() {
  const { data: academicYear = [] } = useAcademicYears();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const router = useRouter();

  const normalizedAcademicYears = useMemo(() => {
    return academicYear.map((ay) => ({
      ...ay,
      status: ay.status.toLowerCase() === "active" ? "active" : "inactive",
    }));
  }, [academicYear]);

  const filteredAcademicYears = useMemo(() => {
    return normalizedAcademicYears.filter((ay) =>
      [ay.term, ay.description, ay.status, ay.start_date, ay.end_date].some(
        (field) => field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [normalizedAcademicYears, searchTerm]);

  const sortedAcademicYears = useMemo(() => {
    if (!sortConfig.key) return filteredAcademicYears;
    const sorted = [...filteredAcademicYears].sort((a, b) => {
      if (sortConfig.key && a[sortConfig.key]! < b[sortConfig.key]!)
        return sortConfig.direction === "asc" ? -1 : 1;
      if (sortConfig.key && a[sortConfig.key]! > b[sortConfig.key]!)
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredAcademicYears, sortConfig]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedAcademicYears.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(sortedAcademicYears.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const requestSort = (key: keyof AcademicYear) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const formatDate = (dateString: string): string => {
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
          href="/administrative"
          className="text-gray-500 hover:text-blue-800 hover:underline"
        >
          Dashboard
        </a>
        <FiChevronRight className="mx-2 text-gray-400" size={14} />
        <a
          href="/administrative/academic-year"
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <a
            href="/administrative/academic-year/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors hover:cursor-pointer text-center"
          >
            Add New Academic Year
          </a>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "id",
                  "term",
                  "description",
                  "status",
                  "start_date",
                  "end_date",
                  "created_at",
                  "updated_at",
                ].map((key) => {
                  const alignment =
                    key === "status"
                      ? "text-center"
                      : [
                          "start_date",
                          "end_date",
                          "created_at",
                          "updated_at",
                        ].includes(key)
                      ? "text-right"
                      : "text-left";

                  const minWidthClass = key !== "status" ? "min-w-[120px]" : "";

                  return (
                    <th
                      key={key}
                      onClick={() => requestSort(key as keyof AcademicYear)}
                      className={`px-6 py-3 ${alignment} ${minWidthClass} text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer min-w-[150px]`}
                    >
                      <div
                        className={`flex items-center ${
                          alignment === "text-center"
                            ? "justify-center"
                            : alignment === "text-right"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
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
                  );
                })}
                <th className="px-6 py-3 text-right min-w-[120px] text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((ay) => (
                  <tr key={ay.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 text-left min-w-[120px]">
                      {ay.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 text-left min-w-[120px]">
                      {ay.term}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 text-left min-w-[120px]">
                      {ay.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          ay.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {ay.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 text-right min-w-[120px]">
                      {formatDate(ay.start_date)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 text-right min-w-[120px]">
                      {formatDate(ay.end_date)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 text-right min-w-[120px]">
                      {formatDate(ay.created_at)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 text-right min-w-[120px]">
                      {formatDate(ay.updated_at)}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium min-w-[120px]">
                      <button
                        onClick={() =>
                          router.push(
                            `/administrative/academic-year/${ay.id}/update`
                          )
                        }
                        className="text-blue-600 hover:text-blue-900 mr-4 cursor-pointer"
                      >
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
                  <td
                    colSpan={9}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No academic years found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {sortedAcademicYears.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, sortedAcademicYears.length)} of{" "}
              {sortedAcademicYears.length} academic years
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
