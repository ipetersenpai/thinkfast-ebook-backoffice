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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUsers } from "@/redux/slice/user/getUsersSlice";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  middlename?: string;
  username: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface SortConfig {
  key: keyof User | null;
  direction: "asc" | "desc";
}

export default function UserManagementPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.getUsers
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Inside your component:
  const router = useRouter();

  useEffect(() => {
    const filtered = users.filter(
      (user: {
        firstname: string;
        lastname: string;
        username: string;
        email: string;
        role: string;
        status: string;
      }) =>
        user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);

  const requestSort = (key: keyof User) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredUsers].sort((a, b) => {
      if (a[key]! < b[key]!) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key]! > b[key]!) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    setFilteredUsers(sorted);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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
          <a
            href="/superadmin/users/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors hover:cursor-pointer text-center"
          >
            Add New User
          </a>
        </div>

        {/* Table */}
        <div className="overflow-x-auto relative">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "id",
                  "firstname",
                  "lastname",
                  "middlename",
                  "username",
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
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 text-center">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <span
                        className={`px-2 inline-flex text-xsleading-5 font-semibold rounded-full ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
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
                      <button
                        onClick={() =>
                          router.push(`/superadmin/users/${user.id}/update`)
                        }
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
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
