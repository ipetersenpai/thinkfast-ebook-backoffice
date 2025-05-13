"use client";

import { useState } from "react";
import { FiChevronRight, FiSearch } from "react-icons/fi";

interface Ebooks {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  coverImage: string;
}

export default function DashboardPage() {
  const mockEbooks: Ebooks[] = [
    {
      id: 1,
      title: "Filipino 1",
      description: "Grade 5 Topic about Filipino Language and Culture",
      created_at: "2023-01-15",
      updated_at: "2023-06-20",
      coverImage: "/ebooks/cover_page_1.jpg",
    },
    {
      id: 6,
      title: "Araling Panlipunan",
      description: "Grade 5 Topic about Basic Science Concepts",
      created_at: "2023-02-10",
      updated_at: "2023-07-15",
      coverImage: "/ebooks/cover_page_2.jpg",
    },
    {
      id: 3,
      title: "Math 1",
      description: "Grade 5 Topic about Basic Mathematics",
      created_at: "2023-03-05",
      updated_at: "2023-08-10",
      coverImage: "/ebooks/cover_page_3.webp",
    },
    {
      id: 2,
      title: "Nature Science 1",
      description: "Grade 4 Topic about Basic Science Concepts",
      created_at: "2023-02-10",
      updated_at: "2023-07-15",
      coverImage: "/ebooks/cover_page_4.png",
    },
    {
      id: 5,
      title: "Physical Science 1",
      description: "Grade 5 Topic about Basic Science Concepts",
      created_at: "2023-02-10",
      updated_at: "2023-07-15",
      coverImage: "/ebooks/cover_page_5.jpg",
    },
    {
      id: 4,
      title: "English 1",
      description: "Grade 5 Topic about English Grammar and Composition",
      created_at: "2023-04-20",
      updated_at: "2023-09-05",
      coverImage: "/ebooks/cover_page_6.jpg",
    },
    {
      id: 6,
      title: "Physical Education",
      description: "Grade 5 Topic about Basic Science Concepts",
      created_at: "2023-02-10",
      updated_at: "2023-07-15",
      coverImage: "/ebooks/cover_page_7.png",
    },
  ].map((ebook) => ({
    ...ebook,
    description: ebook.description.replace(
      /Grade \d+/,
      `Grade ${ebook.title.match(/\d+/)?.[0] || "N/A"}`
    ),
  }));

  const [searchQuery, setSearchQuery] = useState("");
  const [ebooks] = useState<Ebooks[]>(mockEbooks);

  const filteredEbooks = ebooks.filter((ebook) =>
    `${ebook.title} ${ebook.description}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
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
        <span className="text-blue-600">E-books</span>
      </div>

      {/* Content Container */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-6">
        {/* Title and Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-800">E-Book Library</h2>

          <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search e-books..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredEbooks.length > 0 ? (
            filteredEbooks.map((ebook) => (
              <div
                key={ebook.id}
                className="bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 hover:border-blue-300 overflow-hidden cursor-pointer"
              >
                <img
                  src={ebook.coverImage}
                  alt={ebook.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {ebook.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {ebook.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Updated: {ebook.updated_at}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No e-books found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
