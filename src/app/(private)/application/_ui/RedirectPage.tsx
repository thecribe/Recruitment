"use client";
import LoadingState from "@/app/components/LoadingState";
import { AuthContext } from "@/app/Context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const RedirectPage = () => {
  const { user } = React.useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    router.push(`/application/${user.id}/screening?query=personal_info`);
  }, [user]);

  return (
    <LoadingState className="w-full h-full flex justify-center items-center " />
  );
};

export default RedirectPage;
