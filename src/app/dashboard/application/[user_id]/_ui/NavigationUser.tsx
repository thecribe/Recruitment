"use client";
import { AuthContext } from "@/Context/AuthContext";
import React, { useEffect, useState } from "react";
import Navigation from "../../../recruitment/[single_recruit]/_ui/Navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavigationUser = () => {
  const { user } = React.useContext(AuthContext);
  const [navSelector, setNavSelector] = useState<string>("screening");
  const [activeLink, setActiveLink] = useState("screening");
  const [loader, setLoader] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    setLoader(true);
    const currentLink = pathname.split("/")[4];
    setActiveLink(currentLink);
    setLoader(false);
  }, [pathname]);
  return (
    <>
      <div className="flex border-b border-gray-300">
        {[
          {
            menu: "Screening",
            link: `/dashboard/application/${user.id}/screening?query=personal_info`,
          },
          {
            menu: "Reference",
            link: `/dashboard/application/${user.id}/reference`,
          },
          {
            menu: "Training",
            link: `/dashboard/application/${user.id}/training`,
          },
        ].map((tab, index) => (
          <Link
            key={index}
            href={tab.link}
            className={`px-8 py-4 border-b-4 ${
              activeLink === tab.menu.toLowerCase()
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            } font-medium`}
            onClick={() => setActiveLink(tab.menu.toLowerCase())}
          >
            {tab.menu.charAt(0).toUpperCase() + tab.menu.slice(1)}
          </Link>
        ))}
      </div>
    </>
  );
};

export default NavigationUser;
