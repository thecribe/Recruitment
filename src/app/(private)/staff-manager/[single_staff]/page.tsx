import SinglePageWrapper from "@/app/components/StaffProfile/SinglePageWrapper";
import React, { Suspense } from "react";

const page = async ({
  params,
}: {
  params: Promise<{ single_staff: string }>;
}) => {
  // ✅ Await the params (this satisfies the new rule)
  const { single_staff } = await params;
  return (
    <div className="w-full h-full overflow-y-auto">
      <Suspense fallback={<p>Loading.....</p>}>
        <SinglePageWrapper id={single_staff} />
      </Suspense>
    </div>
  );
};

export default page;
