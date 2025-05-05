"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FiMenu, FiUser, FiLogOut } from "react-icons/fi";

export function Navbar({ onSidebarToggle }: { onSidebarToggle: () => void }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            Juan dela Cruz
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
            <button className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center space-x-2">
              <FiLogOut className="text-xl" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
