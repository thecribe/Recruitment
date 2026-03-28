import ReferenceWrapper from "@/components/Reference/ReferenceWrapper";

import React, { Suspense } from "react";

const ReferencePage = async ({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) => {
  const { user_id } = await params;
  return (
    <div className="bg-white h-full rounded-md p-3 overflow-y-auto">
      <Suspense fallback={<p>Loading.....</p>}>
        <ReferenceWrapper userId={user_id} />
      </Suspense>
    </div>
  );
};

export default ReferencePage;
