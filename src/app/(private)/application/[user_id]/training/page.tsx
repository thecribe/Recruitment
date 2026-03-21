import TrainingWrapper from "@/app/components/Training/TrainingWrapper";
import React, { Suspense } from "react";

const ScreeningPage = async ({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) => {
  const { user_id } = await params;

  return (
    <Suspense fallback={<p>Loading.....</p>}>
      <TrainingWrapper applicantId={user_id} />
    </Suspense>
  );
};

export default ScreeningPage;
