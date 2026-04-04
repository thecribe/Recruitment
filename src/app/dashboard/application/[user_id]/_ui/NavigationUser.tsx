"use client";
import { AuthContext } from "@/Context/AuthContext";
import React from "react";
import Navigation from "../../../recruitment/[single_recruit]/_ui/Navigation";

const NavigationUser = () => {
  const { user } = React.useContext(AuthContext);
  return (
    <Navigation
      navLinks={[
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
      ]}
      className="flex justify-center mb-8"
    />
  );
};

export default NavigationUser;
