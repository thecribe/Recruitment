import React, { Suspense } from "react";
import SettingsMenu from "./_ui/SettingsMenu";
import SettingsDisplay from "./_ui/SettingsDisplay";
import TypeHolder from "./_ui/TypeHolder";

const GeneralSettings = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const page: any = (await searchParams).page;

  return (
    <div className="p-3 flex flex-col gap-3 w-full h-full">
      <div className="p-3 bg-white rounded-md">
        <SettingsMenu />
      </div>
      {page && (
        <div className="flex-1 p-3 bg-white rounded-md overflow-auto">
          <Suspense fallback={<p>Loading...</p>}>
            {page === "general-settings" ? (
              <SettingsDisplay />
            ) : (
              <TypeHolder key={page} type={page} />
            )}
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default GeneralSettings;
