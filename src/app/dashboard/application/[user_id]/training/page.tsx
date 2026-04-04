import TrainingWrapper from "@/components/Training/TrainingWrapper";
import React, { Suspense } from "react";

const TrainingPage = async ({
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

export default TrainingPage;
