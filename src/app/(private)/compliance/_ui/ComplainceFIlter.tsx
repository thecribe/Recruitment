"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const ComplainceFIlter = () => {
  const [filterValue, setFilterValue] = React.useState<{
    department: string;
  }>({ department: "" });
  const router = useRouter();
  const pathname = usePathname(); // current path, e.g. "/products"
  const searchParams = useSearchParams(); // current ?params if any

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(
      "department",
      filterValue.department ? filterValue.department : ""
    );

    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className=" w-full justify-between flex flex-col gap-3 xl:flex-row xl:items-center">
      <div className="border-b-2 pb-2 xl:pb-0 border-gray-300 xl:border-none "></div>
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-center gap-5">
        <div className="flex justify-center items-center gap-2">
          <span className="text-xs font-semibold">Department:</span>
          <select
            value={filterValue.department}
            onChange={(e) =>
              setFilterValue((prev) => ({
                ...prev,
                department: e.target.value,
              }))
            }
            className=" p-2 border border-gray-300 rounded-md text-xs"
          >
            <option value="all">All</option>
            <option value="Dorm">Dorm</option>
            <option value="agency">Nursing Agency</option>
          </select>
        </div>

        <button
          className="px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:scale-105 shadow-sm hover:shadow-black/30 active:scale-95 active:shadow-black/10 transition-all duration-300 text-xs"
          onClick={handleFilter}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default ComplainceFIlter;
