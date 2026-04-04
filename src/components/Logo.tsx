"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const Logo = () => {
  const { defaultdata } = useContext(AuthContext);

  let site_logo;

  const siteData = JSON.parse(defaultdata?.site_data?.site_logo || "[]");

  if (siteData.length > 0) {
    site_logo = siteData[0];
  } else {
    site_logo = "/ariselogo.png";
  }

  return (
    defaultdata.site_data && (
      <div className="p-6 border-b border-gray-300 ">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
            <Image
              src={site_logo.img_url || site_logo}
              alt={site_logo.name || "Arise logo"}
              fill={true}
              className="absolute object-cover rounded-xl"
              unoptimized
            />
          </div>
          <div>
            <h1 className="font-semibold text-xl text-gray-800">
              Arise Nursing
            </h1>
            <p className="text-xs text-gray-500">Application Portal</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Logo;
