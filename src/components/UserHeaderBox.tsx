"use client";
import { AuthContext } from "@/Context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { MdArrowOutward } from "react-icons/md";
import { Dropdown, DropdownContent, DropdownTrigger } from "./Dropdown";

const UserHeaderBox = () => {
  const { user, logout } = React.useContext(AuthContext);
  const router = useRouter();
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<"bottom" | "top">("bottom");
  const [align, setAlign] = useState<"right" | "left">("right");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate best position on open (prevents overflow)
  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const dropdownHeight = dropdownRef.current?.offsetHeight || 120; // approx height
    const dropdownWidth = 240; // your dropdown width

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    const spaceRight = window.innerWidth - rect.right;
    const spaceLeft = rect.left;

    // Vertical: open upwards if not enough space below
    const newPosition =
      spaceBelow < dropdownHeight && spaceAbove > spaceBelow ? "top" : "bottom";

    // Horizontal: flip to left if not enough space on the right
    const newAlign =
      spaceRight < dropdownWidth && spaceLeft > spaceRight ? "left" : "right";

    setPosition(newPosition);
    setAlign(newAlign);
  };

  const toggleDropdown = () => {
    if (!isOpen) {
      calculatePosition(); // calculate before opening
    }
    setIsOpen(!isOpen);
  };

  const logoutHandler = async () => {
    try {
      await logout();
      router.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
    setIsOpen(false);
  };

  return (
    <Dropdown>
      {/* Trigger Button */}
      <DropdownTrigger>
        <div className="flex items-center gap-3 cursor-pointer py-4 px-3 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-all">
          <Image
            src="/file.svg"
            alt="User profile"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
          <div className="flex flex-col min-w-0">
            <h3 className="font-semibold text-sm text-gray-800 truncate">
              {user?.name}
            </h3>
            <span className="text-xs text-gray-500 truncate">
              {user?.role?.role}
            </span>
          </div>
          <span
            className={`text-gray-400 text-xl transition-transform ${isOpen ? "rotate-180" : ""}`}
          >
            <MdArrowOutward />
          </span>
        </div>
      </DropdownTrigger>

      {/* Smart Dropdown */}

      <DropdownContent>
        <div
          onClick={() => {
            router.push("/dashboard/profile");
            setIsOpen(false);
          }}
          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 mx-1 rounded-xl cursor-pointer transition-colors"
        >
          <CiSettings className="text-xl text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            User Settings
          </span>
        </div>

        <div
          onClick={logoutHandler}
          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 mx-1 rounded-xl cursor-pointer transition-colors text-red-600 hover:text-red-700"
        >
          <BiLogOut className="text-xl" />
          <span className="text-sm font-medium">Logout</span>
        </div>
      </DropdownContent>
    </Dropdown>
  );
};

export default UserHeaderBox;
