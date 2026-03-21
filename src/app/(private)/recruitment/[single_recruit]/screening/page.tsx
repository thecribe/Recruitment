import LoadingState from "@/app/components/LoadingState";
import ScreeningWrapper from "@/app/components/Screening/ScreeningWrapper";
import { instance } from "@/utils/axiosConfig";

import React, { Suspense } from "react";

const ScreeningPage = async ({
  params,
}: {
  params: Promise<{ single_recruit: string }>;
}) => {
  const { single_recruit } = await params;

  // let completionrate;
  // try {
  //   const response = await instance.get(
  //     `/completion-rate/forms/${single_recruit}`,
  //   );
  //   completionrate = response.data;
  // } catch (error) {
  //   return <p>error</p>;
  // }

  return (
    <Suspense
      fallback={
        <LoadingState className="w-full flex justify-center items-center " />
      }
    >
      <ScreeningWrapper id={single_recruit} />
    </Suspense>
  );
};

export default ScreeningPage;
