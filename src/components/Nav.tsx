"use client";
import React from "react";
import Link from "next/link";
import { MENULIST, USER_ROLE } from "@/utils/data";
import { AuthContext } from "../Context/AuthContext";

const Nav = () => {
  const { user } = React.useContext(AuthContext);

  return (
    <div className="w-full mt-10 flex flex-col gap-2 px-2 ">
      <div className="flex flex-col gap-2">
        {MENULIST.title.map((item, index) => {
          return (
            item.access.includes(user?.role.slug.toLowerCase()) && (
              <Link
                key={index}
                href={item.link}
                className="w-full  rounded-md hover:bg-gray-500/10 cursor-pointer hover:shadow-sm hover:shadow-black/10 active:scale-95 active:shadow-black/10 transition-all duration-300"
              >
                <div className="flex items-center justify-center sm:justify-start gap-2  py-2">
                  <span className="text-gray-500 text-lg sm:text-base">
                    {item.icon}
                  </span>
                  <span className="text-gray-500 hidden sm:block text-xs ">
                    {item.name}
                  </span>
                </div>
              </Link>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Nav;
