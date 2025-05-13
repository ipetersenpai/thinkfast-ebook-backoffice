"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FiMenu, FiUser, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchUserDetails } from "@/redux/slice/user/userSlice";
import { logout } from "../redux/slice/auth/authSlice";

export function Navbar({ onSidebarToggle }: { onSidebarToggle: () => void }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { firstname, lastname, loading } = useSelector((state: RootState) => state.user);
  const fullName = `${firstname ?? ""} ${lastname ?? ""}`.trim();

  useEffect(() => {
    dispatch(fetchUserDetails({ id: undefined }));
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    Cookies.remove("xyz_token", { path: "/" });
    dispatch(logout());
    router.push("/");
  };

  return (
    <header className="flex justify-between items-center bg-white text-black px-6 py-2 z-10">
      <div className="flex items-center space-x-4">
        <button onClick={onSidebarToggle} className="text-2xl md:hidden">
          <FiMenu />
        </button>
        <div className="relative w-[150px] h-[50px]">
          <Image
            src="/assets/ebook_logo.webp"
            alt="Ebook Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="relative">
        <div className="flex flex-row items-center">
          <span className="hidden md:block text-black mr-2">
            {loading ? "" : fullName || ""}
          </span>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center space-x-2 text-black bg-slate-100 rounded-full p-2 hover:bg-slate-200 hover:cursor-pointer transition duration-300"
          >
            <FiUser className="text-xl" />
          </button>
        </div>

        {open && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg transition-all duration-300 opacity-100"
          >
            <button className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center space-x-2">
              <FiUser className="text-xl" />
              <span>Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center space-x-2 hover:cursor-pointer"
            >
              <FiLogOut className="text-xl" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
