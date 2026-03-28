import React, { Suspense } from "react";
import DashboardFilter from "./_ui/DashboardFilter";
import StaffDisplay from "./_ui/StaffDisplay";

const page = () => {
  return (
    <div className="p-3 w-full h-full gap-3 flex flex-col overflow-y-auto">
      <div className="w-full">
        <Suspense fallback={<p>Loading.....</p>}>
          <DashboardFilter />
        </Suspense>
      </div>
      <div className="w-full flex-1">
        <Suspense fallback={<p>Loading.....</p>}>
          <StaffDisplay />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
