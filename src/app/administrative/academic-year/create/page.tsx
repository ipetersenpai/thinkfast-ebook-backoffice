"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  createAcademicYear,
  resetCreateState,
} from "@/redux/slice/administrative/academicYear/createAcademicYearSlice";
import { toast } from "react-toastify";
import { FiChevronRight } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

export default function CreateAcademicYearPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector(
    (state: RootState) => state.createAcademicYear
  );

  const [form, setForm] = useState({
    term: "",
    description: "",
    status: "active",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    if (success) {
      toast.success("Academic year created successfully!");
      dispatch(resetCreateState());
      setForm({
        term: "",
        description: "",
        status: "active",
        start_date: "",
        end_date: "",
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
    dispatch(createAcademicYear(form));
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
        <h2 className="text-xl font-semibold text-gray-700">Create Academic Year</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Term</label>
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
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer"
            >
              {loading ? "Creating..." : "Create Academic Year"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
