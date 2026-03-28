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
      <div className="w-full p-2 flex justify-start">
        <Image
          src={site_logo.img_url || site_logo}
          alt={site_logo.name || "Arise logo"}
          width={150}
          height={56}
          className="w-28 h-full"
          unoptimized
        />
      </div>
    )
  );
};

export default Logo;
