"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FiChevronRight } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

import {
  useAcademicYearById,
  useUpdateAcademicYear,
} from "@/api/academicyear";

export default function UpdateAcademicYearPage() {
  const router = useRouter();
  const params = useParams();
  const yearId = params?.id ? Number(params.id) : null;

  const [form, setForm] = useState({
    term: "",
    description: "",
    status: "inactive",
    start_date: "",
    end_date: "",
  });

  const { data: existingYear, isLoading } = useAcademicYearById(yearId ?? 0);
  const { mutate: updateAcademicYear, isPending } = useUpdateAcademicYear();

  useEffect(() => {
    if (!yearId) {
      toast.error("No academic year ID provided");
      router.push("/administrative/academic-year");
    }
  }, [yearId, router]);

  useEffect(() => {
    if (existingYear) {
      setForm({
        ...existingYear,
        start_date: existingYear.start_date?.split("T")[0] || "",
        end_date: existingYear.end_date?.split("T")[0] || "",
      });
    }
  }, [existingYear]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!yearId) {
      toast.error("Invalid academic year ID");
      return;
    }

    updateAcademicYear(
      {
        ...form,
        id: yearId,
        created_at: "",
        updated_at: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          toast.success("Academic year updated successfully!");
          router.push("/administrative/academic-year");
        },
        onError: (error: any) => {
          toast.error(error.message || "Failed to update academic year");
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center flex-wrap text-sm text-gray-600 overflow-x-auto">
        <a href="/" className="hover:text-blue-800 hover:underline">
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
        <span className="text-blue-600">Update Academic Year</span>
      </div>

      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <h2 className="text-xl font-semibold text-gray-700">
          Update Academic Year
        </h2>

        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Term
                </label>
                <input
                  type="text"
                  name="term"
                  value={form.term}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                />
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
                  className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
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
                className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              />
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
                  className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
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
                  className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isPending}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
              >
                {isPending ? "Updating..." : "Update Academic Year"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
