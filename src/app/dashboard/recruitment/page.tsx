import LoadingState from "@/components/LoadingState";
import RecruitmentDisplay from "@/components/RecruitmentDisplay";
import RecruitmentFilter from "@/components/RecruitmentFilter";
import React, { Suspense } from "react";

const Recruitment = async () => {
  return (
    <div className="h-full flex flex-col gap-3 p-8">
      <div className="bg-white p-6 rounded-3xl">
        <Suspense
          fallback={
            <LoadingState className="w-full flex justify-center items-center " />
          }
        >
          <RecruitmentFilter />
        </Suspense>
      </div>
      <div className="bg-white p-6 rounded-3xl flex-1">
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
