"use client";

import { FiChevronRight, FiUser } from "react-icons/fi";

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
          href="/administrative/scores"
          className="text-gray-500 hover:text-blue-800 hover:underline"
        >
          Score
        </a>
        <FiChevronRight className="mx-2 text-gray-400" size={14} />
        <span className="text-blue-600">Student Score</span>
      </div>

      {/* Content Container */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-8">
        {/* Student Header */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 flex items-center justify-center bg-slate-100 text-black-600 rounded-full border border-gray-300">
            <FiUser className="text-2xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">John Doe</h2>
            <p className="text-sm text-gray-500">Grade 1 - Section A</p>
          </div>
        </div>

        {/* Score History */}
        <div className="space-y-10">']'
          {/* Subject: Math */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Mathematics
            </h3>
            <div className="space-y-2">
              {[
                { title: "Quiz 1: Algebra Basics", score: "12/15" },
                { title: "Quiz 2: Geometry Fundamentals", score: "18/20" },
                { title: "Quiz 3: Fractions & Decimals", score: "22/25" },
                { title: "Quiz 4: Word Problems", score: "10/10" },
              ].map((quiz, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-200"
                >
                  <span className="text-sm font-medium text-gray-800">
                    {quiz.title}
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    {quiz.score}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Subject: Science */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Science
            </h3>
            <div className="space-y-2">
              {[
                { title: "Quiz 1: Solar System", score: "14/20" },
                { title: "Quiz 2: States of Matter", score: "16/20" },
                { title: "Quiz 3: Human Body Systems", score: "24/30" },
                { title: "Quiz 4: Ecosystems", score: "18/20" },
              ].map((quiz, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-200"
                >
                  <span className="text-sm font-medium text-gray-800">
                    {quiz.title}
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    {quiz.score}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Subject: English */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              English
            </h3>
            <div className="space-y-2">
              {[
                { title: "Quiz 1: Parts of Speech", score: "19/20" },
                { title: "Quiz 2: Reading Comprehension", score: "22/25" },
                { title: "Quiz 3: Vocabulary Usage", score: "15/15" },
                { title: "Quiz 4: Writing Skills", score: "25/30" },
              ].map((quiz, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-200"
                >
                  <span className="text-sm font-medium text-gray-800">
                    {quiz.title}
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    {quiz.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
