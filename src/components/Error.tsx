"use client";
import { useRouter } from "next/navigation";
import { FcCancel } from "react-icons/fc";
import React from "react";
import Image from "next/image";

const Error = ({
  error,
  reloadButton,
}: {
  error: string;
  reloadButton?: boolean;
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-full ">
      <div className=" flex flex-col w-full justify-between items-center gap-5">
        <div className="w-[80%] md:w-[70%] lg:w-[40%] lg:h-fit rounded-xl p-8  flex flex-col gap-5 justify-center items-center bg-white">
          <div className="w-full p-2 flex justify-center items-center">
            <Image
              src="/ariselogo.png"
              alt="logo"
              width={150}
              height={150}
              className="w-1/4 h-full"
            />
          </div>
          <h2 className="text-5xl">
            <FcCancel />
          </h2>
          <h2 className="text-gray-600 tracking-wider">{error}</h2>
        </div>
        {reloadButton && (
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-sm text-white px-3 py-2 rounded-md w-fit hover:bg-blue-600 hover:scale-102 transition-all duration-300 cursor-pointer active:scale-90"
          >
            Try Again
          </button>
        )}
        <button
          className="text-white cursor-pointer hover:underline underline-offset-2"
          onClick={() => router.push("/")}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default Error;
