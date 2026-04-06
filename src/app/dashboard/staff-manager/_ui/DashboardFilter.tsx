"use client";
import { AuthContext } from "@/Context/AuthContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useContext } from "react";

const DashboardFilter = () => {
  const { defaultdata } = useContext(AuthContext);
  const { department, job_type } = defaultdata;
  const [filterValue, setFilterValue] = React.useState<{
    department: string;
    job_type: string;
  }>({ department: "", job_type: "" });
  const router = useRouter();
  const pathname = usePathname(); // current path, e.g. "/products"
  const searchParams = useSearchParams(); // current ?params if any

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(
      "department",
      filterValue.department ? filterValue.department : "",
    );
    params.set("job_type", filterValue.job_type ? filterValue.job_type : "");
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className=" w-full rounded-md flex justify-end gap-3">
      <div className="flex justify-center items-center gap-2">
        <span className="text-sm font-semibold">Department:</span>
        <select
          value={filterValue.department}
          onChange={(e) =>
            setFilterValue((prev) => ({
              ...prev,
              department: e.target.value,
            }))
          }
          className=" border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          {department &&
            department?.map((eachDepartment: any, index: number) => (
              <option value={eachDepartment.slug} key={eachDepartment.id}>
                {eachDepartment.title}
              </option>
            ))}
        </select>
      </div>
      <div className="flex justify-center items-center gap-2">
        <span className="text-sm font-semibold">Job type:</span>
        <select
          value={filterValue.job_type}
          onChange={(e) =>
            setFilterValue((prev) => ({
              ...prev,
              job_type: e.target.value,
            }))
          }
          className=" border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {job_type?.map((eachType: any, index: number) => {
            return (
              <option key={index} value={eachType.slug}>
                {eachType.title}
              </option>
            );
          })}
        </select>
      </div>

      <button
        className="px-10 py-3.5 bg-blue-500 text-white rounded-md cursor-pointer hover:scale-105 shadow-sm hover:shadow-black/30 active:scale-95 active:shadow-black/10 transition-all duration-300 text-sm"
        onClick={handleFilter}
      >
        Apply
      </button>
    </div>
  );
};

export default DashboardFilter;
