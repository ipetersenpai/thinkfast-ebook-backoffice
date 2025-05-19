"use client";

import { useState } from "react";
import { FiChevronRight, FiChevronLeft, FiX } from "react-icons/fi";

const sampleCourses = [
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

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filteredCourses = sampleCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredCourses.length / perPage);
  const paginatedCourses = filteredCourses.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-600">
        <a
          href="/"
          className="text-gray-500 hover:text-blue-800 hover:underline"
        >
          Dashboard
        </a>
        <FiChevronRight className="mx-2 text-gray-400" size={14} />
        <a
          href="/"
          className="text-gray-500 hover:text-blue-800 hover:underline"
        >
          Blocked Courses
        </a>
        <FiChevronRight className="mx-2 text-gray-400" size={14} />
        <span className="text-blue-600">Create</span>
      </div>

      {/* Main Content */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter Block Name"
            className="w-full md:w-87 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <a
            href="/superadmin/users/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Create block
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                >
                  <div className="flex items-center">ID</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                >
                  <div className="flex items-center">Title</div>
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
                  Instructor
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                >
                  <div className="flex items-center">Created</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                >
                  <div className="flex items-center">Updated</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
          </table>
          </div>



        <div className="mt-12">
            <p>
              <strong>Total Number of Courses: </strong> 0
            </p>

        <div className="flex gap-2 mt-2">
            <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
            Add Course to Block
            </button>

            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer">
            Cancel
            </button>
        </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-start pt-10 px-4 md:px-0">
          <div className="bg-white w-full max-w-6xl rounded-lg shadow-lg p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Select Courses</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-red-600 text-xl cursor-pointer"
              >
                <FiX size={24} />
              </button>
            </div>

            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-[500px] mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="overflow-x-auto max-h-[400px]">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold">
                      <input type="checkbox" />
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">ID</th>
                    <th className="px-4 py-2 text-left font-semibold">Title</th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Description
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Instructor
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedCourses.map((course) => (
                    <tr key={course.id}>
                      <td className="px-4 py-2">
                        <input type="checkbox" />
                      </td>
                      <td className="px-4 py-2">{course.id}</td>
                      <td className="px-4 py-2">{course.title}</td>
                      <td className="px-4 py-2">{course.description}</td>
                      <td className="px-4 py-2">{course.instructor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredCourses.length > 0 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-500">
                  Showing {(page - 1) * perPage + 1} to{" "}
                  {Math.min(page * perPage, filteredCourses.length)} of{" "}
                  {filteredCourses.length} courses
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className={`px-3 py-1 rounded-lg border ${
                      page === 1
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
                        onClick={() => setPage(number)}
                        className={`px-3 py-1 rounded-lg border ${
                          page === number
                            ? "bg-blue-600 text-white border-blue-600"
                            : "text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {number}
                      </button>
                    )
                  )}
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className={`px-3 py-1 rounded-lg border ${
                      page === totalPages
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
      )}
    </div>
  );
}
