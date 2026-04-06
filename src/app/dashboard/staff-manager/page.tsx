import React, { Suspense } from "react";
import DashboardFilter from "./_ui/DashboardFilter";
import StaffDisplay from "./_ui/StaffDisplay";

const page = () => {
  return (
    <div className="p-8 h-full gap-8 flex flex-col overflow-y-auto">
      <div className="w-full p-6 bg-white rounded-3xl">
        <Suspense fallback={<p>Loading.....</p>}>
          <DashboardFilter />
        </Suspense>
      </div>
      <div className="p-6 bg-white rounded-3xl w-full flex-1">
        <Suspense fallback={<p>Loading.....</p>}>
          <StaffDisplay />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
