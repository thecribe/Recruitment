import LoadingState from "@/app/components/LoadingState";
import ScreeningWrapper from "@/app/components/Screening/ScreeningWrapper";

import React, { Suspense } from "react";

const ScreeningPage = async ({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) => {
  const { user_id } = await params;

  // let completionrate;
  // try {
  //   const response = await instance.get(
  //     `/completion-rate/forms/${user_id}`,
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
      <ScreeningWrapper id={user_id} />
    </Suspense>
  );
};

export default ScreeningPage;
