"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { FiChevronRight } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

import {
  useCreateAcademicYear,
  AcademicYearData,
} from "@/api/academicyear";

export default function CreateAcademicYearPage() {
  const [form, setForm] = useState<AcademicYearData>({
    term: "",
    description: "",
    status: "active",
    start_date: "",
    end_date: "",
  });

  const {
    mutate,
    isPending,
    reset,
  } = useCreateAcademicYear();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: () => {
        toast.success("Academic year created successfully!");
        setForm({
          term: "",
          description: "",
          status: "active",
          start_date: "",
          end_date: "",
        });
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to create academic year");
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center flex-wrap text-sm text-gray-600 overflow-x-auto">
        <a href="/superadmin" className="hover:text-blue-800 hover:underline">
          Dashboard
        </a>
        <FiChevronRight className="mx-2 text-gray-400" size={14} />
        <a
          href="/administrative/academic-year"
          className="hover:text-blue-800 hover:underline"
        >
          Academic Year Management
        </a>
        <FiChevronRight className="mx-2 text-gray-400" size={14} />
        <span className="text-blue-600">Create Academic Year</span>
      </div>

      {/* Form Container */}
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <h2 className="text-xl font-semibold text-gray-700">
          Create Academic Year
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Term
              </label>
              <input
                type="number"
                name="term"
                value={form.term}
                onChange={handleChange}
                required
                className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g. 2425"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g. Academic Year 2022-2023"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
                required
                className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
                required
                className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
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
              className="block w-full md:w-[49%] px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer disabled:opacity-50"
            >
              {isPending ? "Creating..." : "Create Academic Year"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
