"use client";
import FormTitle from "@/components/Forms/FormTitle";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const SettingsMenu = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const router = useRouter();

  useEffect(() => {
    if (!page) {
      router.push(`/dashboard/settings?page=general-settings`);
    }
  }, [page]);
  const menu = [
    { title: "Site Details", slug: "general-settings" },
    { title: "Department", slug: "department" },
    { title: "Job Type", slug: "job-type" },
    { title: "Visa Type", slug: "visa-type" },
  ];

  return (
    <div className="flex border-b border-gray-300">
      {menu.map((eachMenu, index) => (
        <p
          key={eachMenu.slug}
          className={`font-medium px-8 py-4 border-b-4 cursor-pointer ${
            page === eachMenu.slug
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() =>
            router.push(`/dashboard/settings?page=${eachMenu.slug}`)
          }
        >
          {eachMenu.title}
        </p>
      ))}
    </div>
  );
};

export default SettingsMenu;
