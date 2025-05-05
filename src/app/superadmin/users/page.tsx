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

interface User {
  id: number;
  firstname: string;
  lastname: string;
  middlename?: string;
  username: string;
  password: string;
  email: string;
  role: string;
  status: "Active" | "Deactivated";
  created_at: string;
  updated_at: string;
}

interface SortConfig {
  key: keyof User | null;
  direction: "asc" | "desc";
}

export default function UserManagementPage() {
const mockUsers: User[] = [
    {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        middlename: "A.",
        username: "johndoe",
        password: "password123",
        email: "johndoe@example.com",
        role: "Teacher",
        status: "Active",
        created_at: "2023-01-01",
        updated_at: "2023-06-01",
    },
    {
        id: 2,
        firstname: "Jane",
        lastname: "Smith",
        username: "janesmith",
        password: "password456",
        email: "janesmith@example.com",
        role: "Teacher",
        status: "Deactivated",
        created_at: "2023-02-01",
        updated_at: "2023-07-01",
    },
    {
        id: 3,
        firstname: "Jane",
        lastname: "Smith",
        username: "janesmith",
        password: "password456",
        email: "janesmith@example.com",
        role: "Principal",
        status: "Deactivated",
        created_at: "2023-02-01",
        updated_at: "2023-07-01",
    },
    {
        id: 4,
        firstname: "Alice",
        lastname: "Johnson",
        username: "alicejohnson",
        password: "password789",
        email: "alicejohnson@example.com",
        role: "Superadmin",
        status: "Active",
        created_at: "2023-03-01",
        updated_at: "2023-08-01",
    },
    {
        id: 5,
        firstname: "Bob",
        lastname: "Brown",
        username: "bobbrown",
        password: "password101",
        email: "bobbrown@example.com",
        role: "Registrar",
        status: "Active",
        created_at: "2023-04-01",
        updated_at: "2023-09-01",
    },
    {
        id: 6,
        firstname: "Charlie",
        lastname: "Davis",
        username: "charliedavis",
        password: "password202",
        email: "charliedavis@example.com",
        role: "Superadmin",
        status: "Deactivated",
        created_at: "2023-05-01",
        updated_at: "2023-10-01",
    },
    {
        id: 7,
        firstname: "Diana",
        lastname: "Evans",
        username: "dianaevans",
        password: "password303",
        email: "dianaevans@example.com",
        role: "Registrar",
        status: "Active",
        created_at: "2023-06-01",
        updated_at: "2023-11-01",
    },
];

  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const filtered = mockUsers.filter(
      (user) =>
        user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm]);

  const requestSort = (key: keyof User) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...users].sort((a, b) => {
      if (a[key]! < b[key]!) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key]! > b[key]!) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setUsers(sorted);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-600">
        <a
          href="/superadmin"
          className="text-gray-500 hover:text-blue-800 hover:underline"
        >
          Dashboard
        </a>
        <FiChevronRight className="mx-2 text-gray-400" size={14} />
        <a
          href="/superadmin/users"
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          User Management
        </a>
      </div>

      {/* Search & Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            Add New User
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "id",
                  "firstname",
                  "lastname",
                  "middlename",
                  "username",
                  "password",
                  "email",
                  "role",
                  "status",
                  "created_at",
                  "updated_at",
                ].map((key) => (
                  <th
                    key={key}
                    onClick={() => requestSort(key as keyof User)}
                    className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer ${
                      key === "role" || key === "status"
                        ? "text-center"
                        : "text-left"
                    } ${
                      key === "created_at" || key === "updated_at"
                        ? "min-w-[170px]"
                        : ""
                    } ${key === "status" ? "min-w-[150px]" : ""}`}
                  >
                    <div
                      className={`flex items-center ${
                        key === "role" || key === "status"
                          ? "justify-center"
                          : ""
                      }`}
                    >
                      {key.replace("_", " ").toUpperCase()}
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
              {currentItems.length > 0 ? (
                currentItems.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {user.firstname}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.lastname}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.middlename || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.password}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 text-center">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <span
                        className={`px-2 inline-flex text-xsleading-5 font-semibold rounded-full ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(user.created_at)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(user.updated_at)}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
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
                  <td
                    colSpan={12}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {users.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, users.length)} of {users.length} users
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
