"use client";
import LoadingState from "@/components/LoadingState";
import { AuthContext } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const RedirectPage = () => {
  const { user } = React.useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    router.push(
      `/dashboard/application/${user.id}/screening?query=personal_info`,
    );
  }, [user]);

  return (
    <LoadingState className="w-full h-full flex justify-center items-center " />
  );
};

export default RedirectPage;
