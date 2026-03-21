"use client";
import React from "react";
import ScreeningWrapper from "../Screening/ScreeningWrapper";

import { AuthContext } from "@/app/Context/AuthContext";

const Profile = ({ id }: { id?: string }) => {
  const { user } = React.useContext(AuthContext);
  return (
    <div className="h-full flex-1 overflow-y-auto w-full">
      <ScreeningWrapper
        id={id ? id : user.id}
        // completionRate={{ ...completionrate.completionRates }}
      />
    </div>
  );
};

export default Profile;
