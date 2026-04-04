"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navigation = ({
  navLinks,
  className,
}: {
  className?: string;
  navLinks: { menu: string; link: string }[];
}) => {
  const [activeLink, setActiveLink] = useState("screening");
  const [loader, setLoader] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    setLoader(true);
    const currentLink = pathname.split("/")[4];
    setActiveLink(currentLink);
    setLoader(false);
  }, [pathname]);
  console.log(activeLink, pathname);
  // border-t border-gray-300 mt-2 py-2
  return (
    <div className={`${className}`}>
      <div className="inline-flex bg-white rounded-2xl shadow-sm border border-gray-100 p-1">
        {!loader &&
          navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={`px-8 py-3 rounded-xl font-medium  transition-all duration-300 ${
                activeLink === item.menu.toLowerCase()
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveLink(item.menu.toLowerCase())}
            >
              {item.menu}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Navigation;
