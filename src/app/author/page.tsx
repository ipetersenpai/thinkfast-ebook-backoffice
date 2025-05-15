"use client";
import {
  FiUsers,
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
          {/* Total Male Students Card */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 h-full">
            <div className="flex justify-between items-start h-full">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <span className="text-blue-600 text-sm font-medium">
                    Total Male Students
                  </span>
                  <p className="text-4xl font-bold mt-2 text-gray-800">30</p>
                </div>
                <div className="mt-6 flex items-center text-sm">
                  <span className="flex items-center text-gray-600">
                    Total enrolled students this Academic Year
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 backdrop-blur-sm text-blue-600">
                <FiUsers size={28} />
              </div>
            </div>
          </div>

          {/* Total Female Students Card */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 h-full">
            <div className="flex justify-between items-start h-full">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <span className="text-pink-600 text-sm font-medium">
                    Total Female Students
                  </span>
                  <p className="text-4xl font-bold mt-2 text-gray-800">25</p>
                </div>
                <div className="mt-6 flex items-center text-sm">
                  <span className="flex items-center text-gray-600">
                    Total enrolled students this Academic Year
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-pink-50 backdrop-blur-sm text-pink-600">
                <FiUsers size={28} />
              </div>
            </div>
          </div>

          <div className="p-6 h-full hidden lg:block"></div>
          <div className="p-6 h-full hidden lg:block"></div>
          <div className="p-6 h-full hidden lg:block"></div>
          <div className="p-6 h-full hidden lg:block"></div>
          <div className="p-6 h-full hidden lg:block"></div>
          <div className="p-6 h-full hidden lg:block"></div>
          <div className="p-6 h-full hidden lg:block"></div>
          <div className="p-6 h-full hidden lg:block"></div>
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
