"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navigation = ({ navLinks }: { navLinks: any[] }) => {
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
        {navLinks.map((tab, index) => (
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

export default Navigation;
