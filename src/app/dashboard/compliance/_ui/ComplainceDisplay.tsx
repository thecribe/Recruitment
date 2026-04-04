"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

// Import icons from react-icons
import { FaSearch, FaDownload, FaFilter, FaUserCheck } from "react-icons/fa";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

import { formNav } from "@/components/Screening/ScreeningWrapper";

// Demo data
const demoComplianceData = [
  {
    id: 1,
    name: "Adebayo Olawale",
    personal_info: 98,
    address_details: 100,
    passport_photo: 85,
    resume: 100,
    contact: 95,
    emergency_contact: 100,
    current_job: 92,
    previous_job: 88,
    educational_qualification: 100,
    right_to_work: 100,
    professional_memberships: 75,
    bank_payment_details: 100,
    immunisations: 90,
    driving_details: 65,
    health_declarations: 100,
    disability_discrimination_act: 100,
    confidentiality: 100,
    consent_for_the_use_of_staff_photographic_images: 100,
    personal_declarations: 95,
    working_time_regulations_declarations: 100,
    other_declarations: 80,
    health_and_safety: 100,
    rehabilitation_of_offenders_act_1974: 100,
  },
  {
    id: 2,
    name: "Fatima Adeola",
    personal_info: 100,
    address_details: 100,
    passport_photo: 100,
    resume: 100,
    contact: 100,
    emergency_contact: 100,
    current_job: 100,
    previous_job: 100,
    educational_qualification: 100,
    right_to_work: 100,
    professional_memberships: 95,
    bank_payment_details: 100,
    immunisations: 100,
    driving_details: 100,
    health_declarations: 100,
    disability_discrimination_act: 100,
    confidentiality: 100,
    consent_for_the_use_of_staff_photographic_images: 100,
    personal_declarations: 100,
    working_time_regulations_declarations: 100,
    other_declarations: 100,
    health_and_safety: 100,
    rehabilitation_of_offenders_act_1974: 100,
  },
];

const getStatusColor = (percentage: number) => {
  if (percentage === 100)
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (percentage >= 90) return "bg-amber-100 text-amber-700 border-amber-200";
  return "bg-red-100 text-red-700 border-red-200";
};

const getProgressColor = (percentage: number) => {
  if (percentage === 100) return "bg-emerald-500";
  if (percentage >= 90) return "bg-amber-500";
  return "bg-red-500";
};

const ComplianceDisplay = () => {
  const searchParams = useSearchParams();
  const department = searchParams.get("department") || "All Departments";

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = demoComplianceData.filter((staff) =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 flex items-center gap-3">
            <FaUserCheck className="w-8 h-8 text-blue-600" />
            Staff Compliance Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            {department} • {filteredData.length} staff members
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-72 text-sm"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition">
            <FaFilter className="w-4 h-4" />
            Filter
          </button>

          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition font-medium">
            <FaDownload className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-emerald-600 text-sm font-medium">
              Fully Compliant
            </div>
            <div className="text-4xl font-semibold mt-2">68%</div>
            <div className="text-xs text-gray-500 mt-1">12 out of 18 staff</div>
          </div>
          <FaCheckCircle className="text-5xl text-emerald-500" />
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-amber-600 text-sm font-medium">
              Needs Attention
            </div>
            <div className="text-4xl font-semibold mt-2">24%</div>
            <div className="text-xs text-gray-500 mt-1">4 staff members</div>
          </div>
          <FaExclamationTriangle className="text-5xl text-amber-500" />
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-red-600 text-sm font-medium">
              Critical Gaps
            </div>
            <div className="text-4xl font-semibold mt-2">8%</div>
            <div className="text-xs text-gray-500 mt-1">2 staff members</div>
          </div>
          <FaTimesCircle className="text-5xl text-red-500" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1400px] text-sm">
            <thead className="sticky top-0 z-20 bg-white border-b border-gray-200">
              <tr>
                <th className="sticky left-0 z-30 bg-white px-8 py-5 text-left font-semibold text-gray-700 border-r border-gray-200 w-72">
                  Staff Name
                </th>
                {formNav.map((nav, idx) => (
                  <th
                    key={idx}
                    colSpan={nav.menu.length}
                    className="px-4 py-5 text-center font-semibold text-gray-700 border-b border-gray-200"
                  >
                    {nav.title}
                  </th>
                ))}
              </tr>

              <tr className="bg-gray-50">
                <th className="sticky left-0 z-30 bg-gray-50 px-8 py-3 border-r border-gray-200"></th>
                {formNav.flatMap((nav) =>
                  nav.menu.map((menu, idx) => (
                    <th
                      key={idx}
                      className="px-6 py-3 text-xs font-medium text-gray-500 text-center border-b border-gray-200"
                    >
                      {menu.title}
                    </th>
                  )),
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredData.map((staff) => (
                <tr
                  key={staff.id}
                  className="hover:bg-gray-50 transition group"
                >
                  <td className="sticky left-0 z-10 bg-white px-8 py-5 border-r border-gray-200 font-medium text-gray-900 group-hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {staff.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div>{staff.name}</div>
                        <div className="text-xs text-gray-500">
                          Staff ID • #{1000 + staff.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {Object.entries(staff)
                    .filter(([key]) => key !== "id" && key !== "name")
                    .map(([_, value], idx) => {
                      const percent = typeof value === "number" ? value : 0;
                      return (
                        <td
                          key={idx}
                          className="px-6 py-5 text-center border-x border-gray-100"
                        >
                          <div className="flex flex-col items-center gap-1.5">
                            <div
                              className={`px-3.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(percent)}`}
                            >
                              {percent}%
                            </div>
                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${getProgressColor(percent)}`}
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </div>
                        </td>
                      );
                    })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400">
        Last updated: Today at{" "}
        {new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
};

export default ComplianceDisplay;
