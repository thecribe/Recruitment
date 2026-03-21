import TrainingWrapper from "@/app/components/Training/TrainingWrapper";
import React, { Suspense } from "react";

const ScreeningPage = async ({
  params,
}: {
  params: Promise<{ single_recruit: string }>;
}) => {
  const { single_recruit } = await params;

  return (
    <Suspense fallback={<p>Loading.....</p>}>
      <TrainingWrapper applicantId={single_recruit} />
    </Suspense>
  );
};

export default ScreeningPage;
