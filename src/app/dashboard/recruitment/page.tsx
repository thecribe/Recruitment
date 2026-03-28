import LoadingState from "@/components/LoadingState";
import RecruitmentDisplay from "@/components/RecruitmentDisplay";
import RecruitmentFilter from "@/components/RecruitmentFilter";
import React, { Suspense } from "react";

const Recruitment = async () => {
  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="bg-white p-3 rounded-md">
        <Suspense
          fallback={
            <LoadingState className="w-full flex justify-center items-center " />
          }
        >
          <RecruitmentFilter />
        </Suspense>
      </div>
      <div className="bg-white p-3 rounded-md flex-1">
        <Suspense
          fallback={
            <LoadingState className="w-full flex justify-center items-center " />
          }
        >
          <RecruitmentDisplay />
        </Suspense>
      </div>
      <div></div>
    </div>
  );
};

export default Recruitment;
