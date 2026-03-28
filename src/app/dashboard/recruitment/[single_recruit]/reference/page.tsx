import ReferenceWrapper from "@/components/Reference/ReferenceWrapper";

import React, { Suspense } from "react";

const ReferencePage = async ({
  params,
}: {
  params: Promise<{ single_recruit: string }>;
}) => {
  const { single_recruit } = await params;
  return (
    <div className="bg-white h-full rounded-md p-3 overflow-y-auto">
      <Suspense fallback={<p>Loading.....</p>}>
        <ReferenceWrapper userId={single_recruit} />
      </Suspense>
    </div>
  );
};

export default ReferencePage;
