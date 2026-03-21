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
    const currentLink = pathname.split("/")[3];
    setActiveLink(currentLink);
    setLoader(false);
  }, [pathname]);
  return (
    <div className={`border-t border-gray-300 mt-2 py-2 ${className}`}>
      <div className="w-full bg-white rounded-md  divide-x flex items-center justify-center">
        {!loader &&
          navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={`flex flex-col gap-2 w-fit justify-center items-center  text-xs font-semibold cursor-pointer py-1 px-5 hover:text-blue-600 transition-all duration-300 ${
                activeLink === item.menu.toLowerCase()
                  ? "text-blue-500 underline underline-offset-6"
                  : "text-gray-500"
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
