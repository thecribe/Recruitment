import React, { Suspense } from "react";
import ComplainceFIlter from "./_ui/ComplainceFIlter";
import ComplainceDisplay from "./_ui/ComplainceDisplay";

const page = () => {
  return (
    <div className="w-full h-full p-3 flex flex-col gap-3">
      <div className="bg-white p-3 rounded-md">
        <Suspense fallback={<p>Loading.....</p>}>
          <ComplainceFIlter />
        </Suspense>
      </div>
      <div className="flex-1 w-full bg-white p-3 rounded-md">
        <Suspense fallback={<p>Loading.....</p>}>
          <ComplainceDisplay />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
