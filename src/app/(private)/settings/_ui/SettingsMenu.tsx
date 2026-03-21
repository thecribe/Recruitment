"use client";
import FormTitle from "@/app/components/Forms/FormTitle";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const SettingsMenu = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const router = useRouter();

  useEffect(() => {
    if (!page) {
      router.push(`/settings?page=general-settings`);
    }
  }, [page]);
  const menu = [
    { title: "Site Details", slug: "general-settings" },
    { title: "Department", slug: "department" },
    { title: "Job Type", slug: "job-type" },
    { title: "Visa Type", slug: "visa-type" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <FormTitle label="Generel Settings" />
      <div className="flex divide-x-2 divide-gray-200 ">
        {menu.map((eachMenu, index) => (
          <p
            key={eachMenu.slug}
            className={`text-xs ${
              page === eachMenu.slug && "underline underline-offset-4 "
            } text-blue-800 cursor-pointer transition-all duration-300 hover:underline underline-offset-4 hover:text-blue-900 px-3 py-1`}
            onClick={() => router.push(`/settings?page=${eachMenu.slug}`)}
          >
            {eachMenu.title}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SettingsMenu;
