"use client";
import { useState, useEffect } from "react";
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
import { useEnrolledStudentByTerm } from "@/api/enrolledstudent";

interface SortConfig {
  key: keyof EnrolledStudent | null;
  direction: "asc" | "desc";
}

interface EnrolledStudent {
  id: number;
  student_id: number;
  fullname: string;
  year_level: string;
  date_enrolled: string;
}

export default function EnrolledStudentPage() {
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "id",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 50;
  const router = useRouter();

  const { data: academicYear = [] } = useAcademicYears();
  const { data: fetchedStudents = [], isLoading } =
    useEnrolledStudentByTerm(selectedAcademicYear);

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

  const mappedStudents: EnrolledStudent[] = Array.isArray(fetchedStudents)
    ? fetchedStudents.map((student: any) => ({
        id: student.id, // use DB id here
        student_id: student.student_id ?? 0,
        fullname: `${student.firstname ?? ""} ${student.middlename ?? ""} ${
          student.lastname ?? ""
        }`.trim(),
        year_level: student.year_level ?? "N/A",
        date_enrolled: student.created_at ?? "",
      }))
    : [];

  const filteredStudents = mappedStudents.filter(
    (student) =>
      student.student_id
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      student.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.year_level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const key = sortConfig.key;
    if (a[key]! < b[key]!) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[key]! > b[key]!) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedStudents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedStudents.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const requestSort = (key: keyof EnrolledStudent) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const formatDate = (dateString: string): string => {
    if (typeof window === "undefined") return dateString;
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-gray-600">
        <a
          href="/"
          className="text-gray-500 hover:text-blue-800 hover:underline"
        >
          Dashboard
        </a>
        <FiChevronRight className="mx-2 text-gray-400" size={14} />
        <a
          href="/administrative/enrolled-students"
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          Enroll Student Management
        </a>
      </div>

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

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            Add Student
          </button>

          <div className="relative w-full md:w-1/4 md:ml-auto">
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
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  { key: "id", label: "ID" },
                  { key: "student_id", label: "BRIDGETTE STUDENT ID" },
                  { key: "fullname", label: "FULLNAME" },
                  { key: "year_level", label: "YEAR LEVEL" },
                  { key: "date_enrolled", label: "DATE ENROLLED" },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    onClick={() => requestSort(key as keyof EnrolledStudent)}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    <div className="flex items-center">
                      {label}
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
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    Loading students...
                  </td>
                </tr>
              ) : currentItems.length > 0 ? (
                currentItems.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {student.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {student.student_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {student.fullname}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {student.year_level}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(student.date_enrolled)}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                    <button
                        onClick={() =>
                          router.push(`/administrative/enroll/${student.id}/update`)
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
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {sortedStudents.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, sortedStudents.length)} of{" "}
              {sortedStudents.length} students
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
