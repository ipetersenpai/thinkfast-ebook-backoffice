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
    {
      id: 2,
      title: "Advanced Mathematics",
      description: "Calculus and linear algebra for engineers",
      instructor: "Prof. Bob Smith",
      created_at: "2023-02-10",
      updated_at: "2023-05-15",
    },
    {
      id: 3,
      title: "Data Structures",
      description:
        "Learn about common data structures and their implementations",
      instructor: "Dr. Carol Lee",
      created_at: "2023-03-05",
      updated_at: "2023-07-10",
    },
    {
      id: 4,
      title: "Web Development",
      description: "Building modern web applications",
      instructor: "Prof. David Brown",
      created_at: "2023-04-20",
      updated_at: "2023-08-25",
    },
    {
      id: 5,
      title: "Machine Learning",
      description: "Introduction to AI and ML concepts",
      instructor: "Dr. Emily Davis",
      created_at: "2023-05-12",
      updated_at: "2023-09-18",
    },
    {
      id: 6,
      title: "Database Systems",
      description: "Relational databases and SQL",
      instructor: "Prof. Frank Wilson",
      created_at: "2023-06-01",
      updated_at: "2023-10-05",
    },
    {
      id: 7,
      title: "Computer Networks",
      description: "Basics of networking and communication protocols",
      instructor: "Dr. Grace Martinez",
      created_at: "2023-06-15",
      updated_at: "2023-10-20",
    },
    {
      id: 8,
      title: "Operating Systems",
      description: "Processes, memory management, and system calls",
      instructor: "Prof. Henry Clark",
      created_at: "2023-07-05",
      updated_at: "2023-11-10",
    },
    {
      id: 9,
      title: "Mobile App Development",
      description: "Building apps for Android and iOS",
      instructor: "Dr. Irene Lewis",
      created_at: "2023-07-25",
      updated_at: "2023-11-28",
    },
    {
      id: 10,
      title: "Cybersecurity Fundamentals",
      description: "Principles of information security",
      instructor: "Prof. Jack White",
      created_at: "2023-08-10",
      updated_at: "2023-12-05",
    },
    {
      id: 11,
      title: "Cloud Computing",
      description: "Introduction to cloud services and architectures",
      instructor: "Dr. Karen Hall",
      created_at: "2023-08-25",
      updated_at: "2023-12-20",
    },
    {
      id: 12,
      title: "Artificial Intelligence",
      description: "Advanced AI topics and applications",
      instructor: "Prof. Larry Young",
      created_at: "2023-09-10",
      updated_at: "2024-01-05",
    },
    {
      id: 13,
      title: "Software Engineering",
      description: "Software development lifecycle and methodologies",
      instructor: "Dr. Maria King",
      created_at: "2023-09-25",
      updated_at: "2024-01-20",
    },
    {
      id: 14,
      title: "Embedded Systems",
      description: "Programming microcontrollers and embedded devices",
      instructor: "Prof. Nathan Scott",
      created_at: "2023-10-10",
      updated_at: "2024-02-05",
    },
    {
      id: 15,
      title: "Game Development",
      description: "Designing and building video games",
      instructor: "Dr. Olivia Adams",
      created_at: "2023-10-25",
      updated_at: "2024-02-20",
    },
    {
      id: 16,
      title: "Natural Language Processing",
      description: "Processing and understanding human language",
      instructor: "Prof. Peter Baker",
      created_at: "2023-11-10",
      updated_at: "2024-03-05",
    },
    {
      id: 17,
      title: "Computer Graphics",
      description: "Rendering and visual computing techniques",
      instructor: "Dr. Quinn Carter",
      created_at: "2023-11-25",
      updated_at: "2024-03-20",
    },
    {
      id: 18,
      title: "Quantum Computing",
      description: "Introduction to quantum algorithms",
      instructor: "Prof. Rachel Evans",
      created_at: "2023-12-10",
      updated_at: "2024-04-05",
    },
    {
      id: 19,
      title: "Big Data Analytics",
      description: "Techniques for analyzing large datasets",
      instructor: "Dr. Samuel Foster",
      created_at: "2023-12-25",
      updated_at: "2024-04-20",
    },
    {
      id: 20,
      title: "DevOps Practices",
      description: "Continuous integration and delivery pipelines",
      instructor: "Prof. Tina Green",
      created_at: "2024-01-10",
      updated_at: "2024-05-05",
    },
  ];

  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

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

  const [selectedAcademicYear, setSelectedAcademicYear] = useState("");

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
          href="/administrative"
          className="text-gray-500 hover:text-blue-800 hover:underline"
        >
          Dashboard
        </a>
        <FiChevronRight className="mx-2 text-gray-400" size={14} />
        <a
          href="/administrative/courses"
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          Courses
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

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            Add New Course
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
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("created_at")}
                >
                  <div className="flex items-center">
                    Created
                    {sortConfig.key === "created_at" && (
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
                  onClick={() => requestSort("updated_at")}
                >
                  <div className="flex items-center">
                    Updated
                    {sortConfig.key === "updated_at" && (
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
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(course.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(course.updated_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
