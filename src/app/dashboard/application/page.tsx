import LoadingState from "@/components/LoadingState";

import React, { Suspense } from "react";
import RedirectPage from "./_ui/RedirectPage";

const page = () => {
  return (
    <div className="w-full h-full overflow-y-auto">
      <Suspense
        fallback={
          <LoadingState className="w-full flex justify-center items-center " />
        }
      >
        <RedirectPage />
      </Suspense>
    </div>
  );
};

export default page;
