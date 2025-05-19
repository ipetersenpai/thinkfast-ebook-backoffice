"use client";

import { useState } from "react";
import { FiPlus, FiX, FiChevronRight } from "react-icons/fi";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          href="/faculty/lessons-builder"
          className="text-gray-500 hover:text-blue-800 hover:underline"
        >
          Lessons Builder
        </a>
        <FiChevronRight className="mx-2 text-gray-400" size={14} />
        <span className="text-blue-600">Create</span>
      </div>

      {/* Blue bordered box */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-6">
        {/* Alert Info */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded text-sm text-blue-800">
          <strong>Note:</strong> Lessons must be constructed sequentially (e.g.,
          Lesson 1, Lesson 2, etc.). Reordering is not supported as there is no
          drag-and-drop functionality.
        </div>

        {/* Lesson Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            onClick={() => setIsModalOpen(true)}
            className="border-2 border-blue-500 border-dashed rounded-xl h-40 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition col-span-full"
          >
            <FiPlus size={32} className="text-blue-500" />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-start pt-10 px-4 md:px-0">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl shadow-xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 cursor-pointer"
            >
              <FiX size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Create New Lesson</h2>

            {/* Modal Content */}
            <p className="text-sm text-gray-600 mb-4">
              You can now add details for the new lesson.
            </p>

            <input
              type="text"
              placeholder="Lesson Title"
              className="w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            />

            {/* Topic Input */}
            <input
              type="text"
              placeholder="Topic"
              className="w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            />

            <textarea
              placeholder="Lesson Description / About"
              rows={6}
              className="w-full px-4 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 resize-none"
            ></textarea>

            <div className="flex justify-end">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition text-sm"
                onClick={() => {
                  // Submit logic here
                  setIsModalOpen(false);
                }}
              >
                Save Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
