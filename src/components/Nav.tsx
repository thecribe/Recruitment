"use client";
import React from "react";
import Link from "next/link";
import { MENULIST, USER_ROLE } from "@/utils/data";
import { AuthContext } from "../Context/AuthContext";

const Nav = () => {
  const { user } = React.useContext(AuthContext);

  return (
    <div className="w-full flex-1 p-4 text-gray-700 ">
      <div className="flex flex-col gap-2">
        {MENULIST.title.map((item, index) => {
          return (
            item.access.includes(user?.role.slug.toLowerCase()) && (
              <Link
                key={index}
                href={item.link}
                className="flex items-center gap-3 px-5 py-4 hover:bg-indigo-50 hover:text-indigo-700 rounded-2xl font-medium cursor-pointer"
              >
                <span className="text-gray-600 font-bold">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Nav;
