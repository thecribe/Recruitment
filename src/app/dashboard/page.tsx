import DepartmentCard from "@/components/DepartmentCard";
import StaffCountChart from "@/components/StaffCountChart";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="flex flex-col xl:flex-row gap-3 w-full">
        <div className=" w-full xl:w-1/2 rounded-md">
          <DepartmentCard />
        </div>
        <div className=" w-full xl:w-1/2 rounded-md">
          <DepartmentCard />
        </div>
      </div>
      <div className=" w-full">
        <StaffCountChart />
      </div>
    </div>
  );
};

export default page;
