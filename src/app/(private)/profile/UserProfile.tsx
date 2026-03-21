"use client";
import ManageProfile from "@/app/components/ManageProfile";
import { AuthContext } from "@/app/Context/AuthContext";
import React, { useContext } from "react";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    user.id && (
      <div className=" h-full p-5">
        <div className="bg-white p-5 rounded-md h-full">
          <ManageProfile id={user.id} />
        </div>
      </div>
    )
  );
};

export default UserProfile;
