"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { FaSearch, FaUser } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import { instance } from "@/utils/axiosConfig";
import Notification from "./Notification";
import { useRouter } from "next/navigation";

const DashboardHeader = () => {
  const { user, logout } = React.useContext(AuthContext);
  const [searchInput, setSearchInput] = useState<string>("");
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      await logout();
      router.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
      setNotification({
        message: "Error logging out. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="bg-white py-2 px-7 flex justify-between items-center w-full">
      {notification && (
        <Notification
          message={notification?.message}
          type={notification?.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className=" w-3/5 md:w-3/5 lg:w-2/5 xl:w-1/5 flex gap-4 items-center border-2 text-sm border-gray-400/60 rounded-full p-2 ">
        <FaSearch className="text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search..."
          className=" outline-none text-gray-500 w-full"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
        />
      </div>
      <div className="w-fit group flex justify-center gap-2 items-center cursor-pointer relative">
        <div className="hidden text-xs absolute w-50 z-50 right-0 top-full bg-white shadow-md group-hover:flex flex-col gap-2 transition-all duration-300 p-2 text-gray-500">
          <p
            className="flex  items-center gap-2 px-2 py-2 hover:bg-gray-400/50 transition-all duration-300"
            onClick={() => router.push("/profile")}
          >
            <CiSettings className="text-xl" /> User Settings
          </p>
          <p
            className="flex  items-center gap-2 px-2 py-2 hover:bg-gray-400/50 transition-all duration-300 "
            onClick={logoutHandler}
          >
            <BiLogOut className="text-xl" /> Logout
          </p>
        </div>
        <Image
          src="/file.svg"
          alt="user profile"
          width={14}
          height={12}
          className=" w-10 rounded-full object-cover"
        />
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-sm ">{user?.name}</h3>
          <span className="text-xs text-gray-400">{user?.role?.role}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
