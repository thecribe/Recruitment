import ReferenceWrapper from "@/components/Reference/ReferenceWrapper";

import React, { Suspense } from "react";

const ReferencePage = async ({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) => {
  const { user_id } = await params;
  return (
    <div className="w-full h-full flex justify-center items-center p-8 overflow-y-auto">
      <div className="bg-white h-full  p-6 overflow-y-auto w-full rounded-3xl shadow-sm border border-gray-100">
        <Suspense fallback={<p>Loading.....</p>}>
          <ReferenceWrapper userId={user_id} />
        </Suspense>
      </div>
    </div>
  );
};

export default ReferencePage;
