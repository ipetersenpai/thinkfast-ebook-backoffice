"use client";

import { useState } from "react";
import { FiChevronRight, FiSearch } from "react-icons/fi";


export default function DashboardPage() {



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

      {/* Content Container */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-6">


      </div>
    </div>
  );
}
