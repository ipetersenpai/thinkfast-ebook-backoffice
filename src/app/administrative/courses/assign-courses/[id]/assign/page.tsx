"use client";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FiChevronRight, FiUser, FiTrash2 } from "react-icons/fi";
import { useEnrolledStudentById } from "@/api/enrolledstudent";
import { useAcademicYears, AcademicYear } from "@/api/academicyear";
import { toast } from "react-toastify";
import {
  useUnassignedCourses,
  useCreateAssignCourses,
  useAssignedCoursesByStudent,
  useDeleteAssignCourse,
} from "@/api/assigncourses";

export default function DashboardPage() {
  const params = useParams();
  const userId = params?.id as string;

  const queryClient = useQueryClient();

  const { data: academicYear = [] } = useAcademicYears();
  const { data: student, isLoading } = useEnrolledStudentById(Number(userId));
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("");

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseIds, setSelectedCourseIds] = useState<number[]>([]);

  const { data: unassignedCourses = [], isLoading: loadingUnassigned } =
    useUnassignedCourses(Number(userId), selectedAcademicYear);

  const handleCheckboxChange = (courseId: number) => {
    setSelectedCourseIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const fullName = student
    ? `${student.firstname} ${student.middlename} ${student.lastname}`
    : "";

  //handle submit for assign courses to student
  const { mutate: createAssignCourses, isPending: isAssigning } =
    useCreateAssignCourses();

  // fetch student courses that assign
  const { data: assignedCourses = [] } = useAssignedCoursesByStudent(
    Number(userId)
  );

  // Delete assigncourses to the student
  const { mutate: deleteAssignCourse, isPending: isDeleting } =
    useDeleteAssignCourse();

  // Handler for deleting an assigned course
  const handleDeleteCourse = (id: number) => {
    if (confirm("Are you sure you want to remove this course assignment?")) {
      deleteAssignCourse(id, {
        onSuccess: () => {
          toast.success("Course unassigned successfully");
          // Invalidate to trigger refetch
          queryClient.invalidateQueries({
            queryKey: ["assignedCourses", Number(userId)],
          });
        },
        onError: (err: any) => {
          toast.error(err.message || "Failed to unassign course");
        },
      });
    }
  };

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
          href="/administrative/courses/assign-courses"
          className="text-gray-500 hover:text-blue-800 hover:underline"
        >
          Assign Courses
        </a>
        <FiChevronRight className="mx-2 text-gray-400" size={14} />
        <span className="text-blue-600">Enrolled Student</span>
      </div>

      {/* Content Container */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Student Info */}
          <div className="flex items-center gap-4">
            {isLoading ? (
              <p className="text-gray-500">Loading student data...</p>
            ) : student ? (
              <>
                <div className="w-16 h-16 flex items-center justify-center bg-slate-100 text-gray-600 rounded-full border border-gray-300 shadow-sm">
                  <FiUser className="text-3xl" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                    {fullName}
                  </h2>
                  <p className="text-md text-gray-500">{student.year_level}</p>
                </div>
              </>
            ) : (
              <p className="text-red-500">Student not found.</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 md:flex-row">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              Assign Course
            </button>

            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer">
              Assign Blocked Courses
            </button>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="font-bold text-xl">Assigned Courses</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    NO
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    TITLE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DESCRIPTION
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    INSTRUCTOR NAME
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assignedCourses.length === 0 ? (
                  <tr>
                    <td
                      className="px-6 py-4 text-sm text-center text-gray-500"
                      colSpan={4}
                    >
                      No assigned courses found.
                    </td>
                  </tr>
                ) : (
                  assignedCourses.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.course?.title || "Untitled Course"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.course?.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.course?.faculty_full_name || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteCourse(item.id)}
                          disabled={isDeleting}
                          title="Delete assigned course"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-start pt-10 px-4 md:px-0">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Unassigned Courses
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedCourseIds([]);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {loadingUnassigned ? (
              <p className="text-gray-500">Loading courses...</p>
            ) : unassignedCourses.length === 0 ? (
              <p className="text-gray-500">No unassigned courses available.</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={
                          unassignedCourses.length > 0 &&
                          selectedCourseIds.length === unassignedCourses.length
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCourseIds(
                              unassignedCourses.map((c) => c.id)
                            );
                          } else {
                            setSelectedCourseIds([]);
                          }
                        }}
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Faculty
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {unassignedCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-center">
                        <input
                          type="checkbox"
                          checked={selectedCourseIds.includes(course.id)}
                          onChange={() => handleCheckboxChange(course.id)}
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {course.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {course.description}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {course.faculty_full_name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  if (selectedCourseIds.length === 0) {
                    toast.warn("Please select at least one course to assign.");
                    return;
                  }

                  const payload = selectedCourseIds.map((courseId) => {
                    const course = unassignedCourses.find(
                      (c) => c.id === courseId
                    );
                    return {
                      term: selectedAcademicYear,
                      enrolled_student_id: Number(userId),
                      course_id: courseId,
                      faculty_full_name: course?.faculty_full_name || "",
                      description: course?.description || "",
                      title: course?.title || "",
                    };
                  });

                  createAssignCourses(payload, {
                    onSuccess: () => {
                      toast.success("Courses successfully assigned!");
                      setSelectedCourseIds([]);
                      setIsModalOpen(false);
                    },
                    onError: () => {
                      toast.error(
                        "Failed to assign courses. Please try again."
                      );
                    },
                  });
                }}
                disabled={isAssigning}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
              >
                {isAssigning ? "Assigning..." : "Assign Selected Courses"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
