"use client";
import LoadingState from "@/app/components/LoadingState";
import RegisterApplicant from "@/app/components/RegisterApplicant";
import { AuthContext } from "@/app/Context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

const page = () => {
  const router = useRouter();
  const { defaultdata, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);
  return !user ? (
    <div className="w-full h-screen flex gap-5 flex-col justify-center items-center ">
      <div className="w-[80%] md:w-[70%] lg:w-[40%] lg:h-fit rounded-xl bg-white p-8 shadow-sm flex flex-col gap-5 justify-between  ">
        <div>
          <div className="w-full p-2 flex justify-center items-center">
            <Image
              src="/ariselogo.png"
              alt="logo"
              width={150}
              height={150}
              className="w-1/4 h-full"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto px-5">
          <RegisterApplicant />
        </div>
      </div>
    </div>
  ) : (
    <div className="h-full w-full flex justify-center items-center">
      <LoadingState className="w-full flex justify-center items-center " />
    </div>
  );
};

export default page;
