"use client";
import {
  FiUsers,
  FiBookOpen,
  FiClipboard,
  FiCheckCircle,
  FiTrendingUp,
  FiChevronRight,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight as FiChevronRightIcon,
} from "react-icons/fi";
import { useState } from "react";

export default function DashboardPage() {
  // Mock data for dashboard
  const data = {
    totalStudents: 1200,
    totalCourses: 35,
    studentsNotEvaluated: 150,
    evaluationsDone: 1050,
    studentsChange: 12.5,
    coursesChange: 3.2,
  };

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Calendar functions
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <div
          key={`day-${day}`}
          onClick={() => setSelectedDate(date)}
          className={`h-8 flex items-center justify-center rounded-full cursor-pointer
            ${isSelected ? "bg-blue-600 text-white" : ""}
            ${isToday && !isSelected ? "border border-blue-600" : ""}
            hover:bg-blue-100 transition-colors`}
        >
          {day}
        </div>
      );
    }

    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <FiChevronLeft size={20} />
          </button>
          <h3 className="font-semibold text-gray-800">
            {monthNames[month]} {year}
          </h3>
          <button
            onClick={nextMonth}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <FiChevronRightIcon size={20} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    );
  };

  // Upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      date: "2023-06-15",
      title: "Midterm Exams",
      color: "bg-red-100 text-red-800",
    },
    {
      id: 2,
      date: "2023-06-20",
      title: "Faculty Meeting",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 3,
      date: "2023-06-25",
      title: "Final Project Submission",
      color: "bg-green-100 text-green-800",
    },
    {
      id: 4,
      date: "2023-06-30",
      title: "Semester Ends",
      color: "bg-purple-100 text-purple-800",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm text-gray-600">
        <FiChevronRight className="mx-2 text-gray-400" size={14} />
        <a
          href="/administrative"
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          Dashboard
        </a>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - Dashboard Cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Total Students Enrolled Card */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 h-full">
            <div className="flex justify-between items-start h-full">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <span className="text-blue-600 text-sm font-medium">
                    Total Students
                  </span>
                  <p className="text-4xl font-bold mt-2 text-gray-800">
                    {data.totalStudents.toLocaleString()}
                  </p>
                </div>
                <div className="mt-6 flex items-center text-sm">
                  <span
                    className={`flex items-center ${
                      data.studentsChange >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <FiTrendingUp className="mr-1" />
                    {Math.abs(data.studentsChange)}%
                  </span>
                  <span className="text-blue-500 ml-2">vs last month</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 backdrop-blur-sm text-blue-600">
                <FiUsers size={28} />
              </div>
            </div>
          </div>

          {/* Total Courses Card */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 h-full">
            <div className="flex justify-between items-start h-full">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <span className="text-green-600 text-sm font-medium">
                    Total Courses
                  </span>
                  <p className="text-4xl font-bold mt-2 text-gray-800">
                    {data.totalCourses.toLocaleString()}
                  </p>
                </div>
                <div className="mt-6 flex items-center text-sm">
                  <span
                    className={`flex items-center ${
                      data.coursesChange >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <FiTrendingUp className="mr-1" />
                    {Math.abs(data.coursesChange)}%
                  </span>
                  <span className="text-green-500 ml-2">vs last month</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-green-50 backdrop-blur-sm text-green-600">
                <FiBookOpen size={28} />
              </div>
            </div>
          </div>

          {/* Students Not Evaluated Card */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 h-full">
            <div className="flex justify-between items-start h-full">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <span className="text-yellow-600 text-sm font-medium">
                    Pending Evaluations
                  </span>
                  <p className="text-4xl font-bold mt-2 text-gray-800">
                    {data.studentsNotEvaluated.toLocaleString()}
                  </p>
                </div>
                <div className="mt-6">
                  <span className="inline-block bg-yellow-200/80 text-yellow-800 text-xs px-3 py-1 rounded-full font-medium">
                    Action required
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-yellow-50 backdrop-blur-sm text-yellow-600">
                <FiClipboard size={28} />
              </div>
            </div>
          </div>

          {/* Done Evaluation Card */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 h-full">
            <div className="flex justify-between items-start h-full">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <span className="text-purple-600 text-sm font-medium">
                    Completed Evaluations
                  </span>
                  <p className="text-4xl font-bold mt-2 text-gray-800">
                    {data.evaluationsDone.toLocaleString()}
                  </p>
                </div>
                <div className="mt-6">
                  <div className="w-full bg-white/50 rounded-full h-2.5">
                    <div
                      className="bg-purple-600 h-2.5 rounded-full"
                      style={{
                        width: `${
                          (data.evaluationsDone / data.totalStudents) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-purple-600 mt-2">
                    {Math.round(
                      (data.evaluationsDone / data.totalStudents) * 100
                    )}
                    % completion rate
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-lg backdrop-blur-sm bg-purple-50 text-purple-600">
                <FiCheckCircle size={28} />
              </div>
            </div>
          </div>

            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 h-full">
            <div className="flex justify-between items-start h-full">
              <div className="flex flex-col justify-between h-full">
              <div>
                <span className="text-red-600 text-sm font-medium">
                Approved Evaluations
                </span>
                <p className="text-4xl font-bold mt-2 text-gray-800">
                {data.evaluationsDone.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                This Academic Session
                </p>
              </div>
              <div className="mt-6">
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div
                  className="bg-red-500 h-2.5 rounded-full"
                  style={{
                  width: `${
                    (data.evaluationsDone / data.totalStudents) * 100
                  }%`,
                  }}
                ></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-red-600 font-medium">
                  {Math.round(
                  (data.evaluationsDone / data.totalStudents) * 100
                  )}
                  % approved
                </p>
                <p className="text-xs text-gray-500">
                  {data.totalStudents - data.evaluationsDone} remaining
                </p>
                </div>
              </div>
              </div>
              <div className="p-3 rounded-lg bg-red-50 text-red-600">
              <FiCheckCircle size={28} />
              </div>
            </div>
            </div>
        </div>

        {/* Right Side - Academic Calendar */}
        <div className="lg:w-80 xl:w-96 space-y-6">
          {/* Calendar */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <FiCalendar className="mr-2 text-blue-600" />
                Academic Calendar
              </h3>
            </div>
            {renderCalendar()}
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800">Upcoming Events</h3>
            </div>
            <div className="p-4 space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start">
                  <div
                    className={`text-xs font-medium px-2 py-1 rounded-full ${event.color}`}
                  >
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
