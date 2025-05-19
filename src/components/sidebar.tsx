"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiMenu,
  FiX,
  FiHome,
  FiTrendingUp,
  FiBookOpen,
  FiGrid,
  FiBook,
  FiUserPlus,
  FiClipboard,
  FiCalendar,
  FiLayers,
  FiList,
  FiClock,
  FiCheckSquare,
  FiHelpCircle,
} from "react-icons/fi";
import { IoLibrarySharp } from "react-icons/io5";
import { TbFileStack } from "react-icons/tb";
import { MdOutlineAssessment } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { getTokenFromCookies, getTokenInfo } from "@/lib/auth";

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState("");

  // Get role from token on mount
  useEffect(() => {
    const token = getTokenFromCookies();
    if (token) {
      const { role } = getTokenInfo(token);
    }
  }, []);

  const [menuItems, setMenuItems] = useState<typeof superadmin_menuItems>([]);

  useEffect(() => {
    const token = getTokenFromCookies();
    if (token) {
      const { role } = getTokenInfo(token);

      if (role === "superadmin") {
        setMenuItems(superadmin_menuItems);
      } else if (role === "principal") {
        setMenuItems(principal_menuItems);
      } else if (role === "registrar") {
        setMenuItems(registrar_menuItems);
      } else if (role === "teacher") {
        setMenuItems(faculty_menuItems);
      } else if (role === "author") {
        setMenuItems(author_menuItems);
      } else {
        setMenuItems([]); // Unknown role or no access
      }
    }
  }, []);

  // superadmin menu items
  // Userrole is "superadmin"
  const superadmin_menuItems = [
    {
      href: "/superadmin",
      label: "Dashboard",
      icon: <FiHome className="flex-shrink-0" />,
    },
    {
      href: "/superadmin/users",
      label: "Users",
      icon: <FiTrendingUp className="flex-shrink-0" />,
    },
    {
      href: "/superadmin/enrolled-students",
      label: "Enrolled Students",
      icon: <HiOutlineDocumentReport className="flex-shrink-0" />,
    },
    {
      href: "/author/lessons-builder",
      label: "Lessons Builder",
      icon: <FiBookOpen className="flex-shrink-0" />,
    },

    // A.Y. Management section
    { section: "A.Y. Management" },
    {
      href: "/administrative/academic-year",
      label: "A.Y Configuration",
      icon: <FiCalendar className="flex-shrink-0" />,
    },

    { section: "E-book Management" },
    {
      href: "/superadmin/ebooks",
      label: "E-Books",
      icon: <MdOutlineAssessment className="flex-shrink-0" />,
    },
    {
      href: "/superadmin/create-ebooks",
      label: "Create E-Books",
      icon: <AiOutlineFileSearch className="flex-shrink-0" />,
    },
  ];

  // administrative menu items
  // Userrole is "registrar"
  const registrar_menuItems = [
    {
      href: "/administrative",
      label: "Dashboard",
      icon: <FiGrid className="flex-shrink-0" />,
    },
    {
      href: "/administrative/enroll",
      label: "Enroll Student",
      icon: <FiUserPlus className="flex-shrink-0" />,
    },
    {
      href: "/administrative/scores",
      label: "Score Management",
      icon: <FiClipboard className="flex-shrink-0" />,
    },

    { section: "Courses Management" },
    {
      href: "/administrative/courses",
      label: "Courses",
      icon: <FiBook className="flex-shrink-0" />,
    },
    {
      href: "/administrative/block-courses",
      label: "Blocked Courses",
      icon: <TbFileStack className="flex-shrink-0" />,
    },
    {
      href: "/administrative/courses/assign-courses",
      label: "Assign Courses",
      icon: <IoLibrarySharp className="flex-shrink-0" />,
    },

    // A.Y. Management section
    { section: "A.Y. Management" },
    {
      href: "/administrative/academic-year",
      label: "A.Y Configuration",
      icon: <FiCalendar className="flex-shrink-0" />,
    },
  ];


  // administrative menu items
  // Userrole is "principal"
  const principal_menuItems = [
    {
      href: "/administrative",
      label: "Dashboard",
      icon: <FiGrid className="flex-shrink-0" />,
    },
    {
      href: "/administrative/enroll",
      label: "Enroll Student",
      icon: <FiUserPlus className="flex-shrink-0" />,
    },
    {
      href: "/administrative/scores",
      label: "Score Management",
      icon: <FiClipboard className="flex-shrink-0" />,
    },

    { section: "Courses Management" },
    {
      href: "/administrative/courses",
      label: "Courses",
      icon: <FiBook className="flex-shrink-0" />,
    },
    {
      href: "/administrative/block-courses",
      label: "Blocked Courses",
      icon: <TbFileStack className="flex-shrink-0" />,
    },
    {
      href: "/administrative/courses/assign-courses",
      label: "Assign Courses",
      icon: <IoLibrarySharp className="flex-shrink-0" />,
    },

    // A.Y. Management section
    { section: "A.Y. Management" },
    {
      href: "/administrative/academic-year",
      label: "A.Y Configuration",
      icon: <FiCalendar className="flex-shrink-0" />,
    },

    // Evaluation Management section
    { section: "Evaluation Management" },
    {
      href: "/administrative/evaluation/session",
      label: "Evaluation Session",
      icon: <FiClock className="flex-shrink-0" />,
    },
    {
      href: "/administrative/evaluation/masterlist",
      label: "Evaluation Masterlist",
      icon: <FiLayers className="flex-shrink-0" />,
    },
    {
      href: "/administrative/evaluation/pending",
      label: "Pending Evaluation",
      icon: <FiList className="flex-shrink-0" />,
    },
    {
      href: "/administrative/evaluation/result",
      label: "Evaluation Result",
      icon: <FiCheckSquare className="flex-shrink-0" />,
    },
    {
      href: "/administrative/evaluation/questions",
      label: "Evaluation Questions",
      icon: <FiHelpCircle className="flex-shrink-0" />,
    },
  ];

  // faculty menu items
  // Userrole is "teacher"
  const faculty_menuItems = [
    {
      href: "/faculty",
      label: "Dashboard",
      icon: <FiHome className="flex-shrink-0" />,
    },
    {
      href: "/faculty/lesson-management",
      label: "Lessons Management",
      icon: <FiBookOpen className="flex-shrink-0" />,
    },
    {
      href: "/faculty/course-progress",
      label: "Course Progress",
      icon: <FiTrendingUp className="flex-shrink-0" />,
    },
    {
      href: "/faculty/scores",
      label: "Score History",
      icon: <HiOutlineDocumentReport className="flex-shrink-0" />,
    },

    {
      href: "/faculty/lessons-builder",
      label: "Lessons Builder",
      icon: <FiBookOpen className="flex-shrink-0" />,
    },
    { section: "Assessment Tool" },
    {
      href: "/faculty/create-assessment",
      label: "Assessment",
      icon: <MdOutlineAssessment className="flex-shrink-0" />,
    },
    {
      href: "/faculty/create-performance-task",
      label: "Performance Task",
      icon: <AiOutlineFileSearch className="flex-shrink-0" />,
    },
    {
      href: "/faculty/create-quarter-exam",
      label: "Quarter Exam",
      icon: <AiOutlineFileSearch className="flex-shrink-0" />,
    },
  ];

  useEffect(() => {
    const bestMatch =
      menuItems
        .filter(
          (item) =>
            item.href &&
            (pathname === item.href || pathname.startsWith(item.href + "/"))
        )
        .sort((a, b) => (b.href?.length || 0) - (a.href?.length || 0))[0]
        ?.href || "";
    setActiveHref(bestMatch);
  }, [pathname, menuItems]);

  return (
    <aside
      className={`bg-gradient-to-b from-gray-800 to-gray-900 text-white h-screen fixed md:relative transition-all duration-300 ease-in-out pb-20
        ${collapsed ? "w-20" : "w-64"}
        ${isOpen ? "absolute left-0 top-0 z-50" : "hidden"} md:block`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          } p-4 pb-2`}
        >
          {!collapsed && <h2 className="text-xl font-bold text-white">MENU</h2>}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors hidden md:block"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <FiMenu size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors md:hidden"
              aria-label="Close sidebar"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto pt-2 custom-scrollbar">
          <ul>
            {menuItems.map((item, index) => {
              if (item.section) {
                return !collapsed ? (
                  <li key={`section-${index}`} className="mt-4 mb-2 px-2">
                    <span className="text-xs uppercase text-gray-400 tracking-wide">
                      {item.section}
                    </span>
                  </li>
                ) : null;
              }

              const isActive = activeHref === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href!}
                    className={`flex items-center ${
                      collapsed ? "justify-center" : "space-x-3"
                    } p-3 rounded-lg transition-all
                      ${
                        isActive
                          ? "bg-blue-600/20 text-blue-400 border-l-4 border-blue-400"
                          : "hover:bg-gray-700/50 hover:text-gray-200"
                      }
                    `}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {!collapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
