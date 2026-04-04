"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { FaSearch, FaUser } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import { instance } from "@/utils/axiosConfig";
import Notification from "./Notification";
import { useRouter } from "next/navigation";
import { set } from "zod";

const DashboardHeader = () => {
  const { user, logout } = React.useContext(AuthContext);

  const [searchInput, setSearchInput] = useState<string>("");
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  return (
    <header className="w-full bg-white border-b border-gray-300 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
      {notification && (
        <Notification
          message={notification?.message}
          type={notification?.type}
          onClose={() => setNotification(null)}
        />
      )}
      {["applicant", "staff"].includes(user?.role.slug) && (
        <ApplicantDashboardHeader />
      )}

      {!["applicant", "staff"].includes(user?.role.slug) && (
        <div className="w-full flex justify-end">
          <div className="relative flex justify-center items-center">
            <input
              type="text"
              id="search"
              placeholder="Search forms or fields..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
              className="bg-gray-100 border border-gray-200 rounded-2xl pl-10 py-3 w-80 focus:outline-none focus:border-indigo-400"
            />
            <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;

const ApplicantDashboardHeader = () => {
  const { user, logout } = React.useContext(AuthContext);
  const [completionRate, setCompletionRate] = useState<any | null>(null);

  // Calculate completion average
  const averageCompletionRate = useMemo(() => {
    if (!completionRate) return 0;

    const values = Object.values(completionRate);

    if (values.length === 0) return 0;

    const total: any = values.reduce(
      (sum: any, value) => sum + Number(value),
      0,
    );

    return total / values.length;
  }, [completionRate]);

  useEffect(() => {
    const getData = async () => {
      try {
        const completionRate = await instance.get(
          `/completion-rate/${user?.id}`,
        );

        setCompletionRate(completionRate.data);
      } catch (error: any) {
        console.log(error.response.data);
        setCompletionRate(null);
      }
    };
    getData();
  }, [user]);
  return (
    <>
      <div className="flex items-center gap-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Application Progress
        </h2>
        <span
          className={`px-4 py-1.5  ${averageCompletionRate >= 80 ? "text-emerald-700 bg-emerald-100" : "text-orange-700 bg-orange-100"} text-sm font-medium rounded-full`}
        >
          {averageCompletionRate.toFixed(1)}% Complete
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 rounded-2xl hover:bg-gray-50">
          <i className="fas fa-print"></i>
          <span>Print Page</span>
        </button>
      </div>
    </>
  );
};
