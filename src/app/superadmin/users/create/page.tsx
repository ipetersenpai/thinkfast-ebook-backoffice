"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  createUser,
  resetCreateUserState,
} from "@/redux/slice/user/createUsersSlice";
import { toast } from "react-toastify";
import { FiChevronRight } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

export default function CreateUserPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector(
    (state: RootState) => state.createUsers
  );

  const [form, setForm] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    role: "",
    status: "active",
  });

  useEffect(() => {
    if (success) {
      toast.success("User created successfully!");
      dispatch(resetCreateUserState());
      setForm({
        firstname: "",
        middlename: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        role: "",
        status: "active",
      });
    }

    if (error) {
      toast.error(error);
    }
  }, [success, error, dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createUser(form));
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center flex-wrap flex-row text-sm text-gray-600 overflow-x-auto">
        <a
          href="/superadmin"
          className="text-gray-500 hover:text-blue-800 hover:underline whitespace-nowrap"
        >
          Dashboard
        </a>
        <FiChevronRight
          className="mx-2 text-gray-400 flex-shrink-0"
          size={14}
        />
        <a
          href="/superadmin/users"
          className="text-gray-600 hover:text-blue-800 hover:underline whitespace-nowrap"
        >
          User Management
        </a>
        <FiChevronRight
          className="mx-2 text-gray-400 flex-shrink-0"
          size={14}
        />
        <a
          href="/superadmin/users/create"
          className="text-blue-600 hover:text-blue-800 hover:underline whitespace-nowrap"
        >
          Add New User
        </a>
      </div>

      {/* Form Container */}
      <div className="bg-white p-6 rounded-lg shadow space-y-6 w-full max-w-full">
        <h2 className="text-xl font-semibold text-gray-700">Create New User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
            First Name
              </label>
              <input
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
            type="text"
            required
            className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
            Middle Name
              </label>
              <input
            type="text"
            name="middlename"
            value={form.middlename}
            onChange={handleChange}
            required
            className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="M."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
            Last Name
              </label>
              <input
            type="text"
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            required
            className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Doe"
              />
            </div>
          </div>

          {/* Username and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
            Username
              </label>
              <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="johndoe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
            Email
              </label>
              <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Role and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
            Role
              </label>
              <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
            <option value="">Select Role</option>
            <option value="superadmin">Super Admin</option>
            <option value="principal">Principal</option>
            <option value="registrar">Registrar</option>
            <option value="teacher">Teacher</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
            Status
              </label>
              <select
            name="status"
            value={form.status}
            onChange={handleChange}
            required
            className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="block w-full md:w-[50%] px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter a secure password"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors hover:cursor-pointer"
            >
              {loading ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
