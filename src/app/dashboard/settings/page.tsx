import React, { Suspense } from "react";
import SettingsMenu from "./_ui/SettingsMenu";
import SettingsDisplay from "./_ui/SettingsDisplay";
import TypeHolder from "./_ui/TypeHolder";
import FormTitle from "@/components/Forms/FormTitle";

const GeneralSettings = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const page: any = (await searchParams).page;

  return (
    <div className="p-8 flex flex-col gap-8 w-full h-full">
      <div className="bg-white p-6 rounded-3xl">
        <FormTitle className="mb-0" label="General Settings" />
      </div>
      <div className="">
        <SettingsMenu />
      </div>
      {page && (
        <div className="flex-1 p-6 bg-white rounded-3xl overflow-auto">
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
