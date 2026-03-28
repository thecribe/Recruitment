"use client";
import Image from "next/image";

import { BiEdit, BiPhone } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import ModalWrapper, { ModalContent, ModalTrigger } from "./ModalWrapper";
import FormTitle from "./Forms/FormTitle";
import ManageProfile from "./ManageProfile";
import { IoSettingsOutline } from "react-icons/io5";
import Navigation from "../app/dashboard/recruitment/[single_recruit]/_ui/Navigation";
import { instance } from "@/utils/axiosConfig";
import { useEffect, useMemo, useState } from "react";

const RecruitmentProfile = ({ id }: { id: string }) => {
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [completionRate, setCompletionRate] = useState<any | null>(null);

  // Safe profile image parsing
  const profilePic = useMemo(() => {
    if (!userProfile?.profileImage) return null;

    try {
      return JSON.parse(userProfile.profileImage);
    } catch {
      return null;
    }
  }, [userProfile]);

  // Calculate completion average
  const averageCompletionRate = useMemo(() => {
    if (!completionRate) return 0;

    const values = Object.values(completionRate);

    if (values.length === 0) return 0;

    const total: any = values.reduce(
      (sum: any, value) => sum + Number(value),
      0,
    );

    return total / values.length;
  }, [completionRate]);

  useEffect(() => {
    const getData = async () => {
      const [profileRes, completionRes] = await Promise.allSettled([
        instance.get(`/users/${id}`),
        instance.get(`/completion-rate/${id}`),
      ]);

      // Handle profile (must work)
      if (profileRes.status === "fulfilled") {
        setUserProfile(profileRes.value.data.user);
      }

      // Handle completion rate (optional)
      if (completionRes.status === "fulfilled") {
        setCompletionRate(completionRes.value.data);
      } else {
        setCompletionRate(null);
      }
    };

    getData();
  }, [id]);

  const imageUrl = (() => {
    const url = profilePic?.[0]?.img_url;

    if (!url) return "/globe.svg";

    if (url.includes("localhost")) {
      return url.replace(/^https?:\/\/localhost:3000/, "");
    }

    return url;
  })();
  return (
    userProfile && (
      <div className="rounded-md bg-white p-2">
        <div className=" flex flex-col md:flex-row gap-3 items-center ">
          <div className=" flex items-center justify-center relative bg-gray-400 rounded-md">
            <Image
              src={imageUrl}
              alt="User profile picture"
              width={150}
              height={100}
              className="w-32 object-cover"
            />
          </div>
          <div className="flex flex-col  gap-3 divide-y-2 divide-gray-300 flex-1 ">
            <div className="w-full p-3 flex flex-col xl:flex-row justify-between items-center md:items-start xl:items-end gap-3 xl:gap-10">
              <div className="flex flex-col justify-center items-center md:items-start gap-3 xl:gap-10">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  {userProfile.firstName + " " + userProfile.lastName}
                  <span className="xl:hidden">
                    <BiEdit className="text-blue-500 hover:text-blue-600 transition-all duration-300 cursor-pointer text-base" />
                  </span>
                </h3>
                <p className="text-xs font-semibold">
                  Job Role:{" "}
                  <span className="text-xs text-gray-500/70">
                    {userProfile.jobType.title}
                  </span>
                </p>
              </div>
              <div className="flex gap-3 flex-col md:flex-row w-full xl:w-1/2 items-center md:items-end ">
                <p className="text-xs font-semibold ">
                  Last Login:
                  <span className="text-xs text-gray-500/60 ml-4">
                    23-10-2025 12:14
                  </span>
                </p>
                <div className="w-full md:flex-1 bg-gray-500/40 rounded-lg">
                  <p
                    className={` text-center text-xs ${
                      Number(averageCompletionRate.toFixed(1)) === 0
                        ? "bg-transparent"
                        : Number(averageCompletionRate.toFixed(1)) < 50
                          ? "bg-red-500/60"
                          : Number(averageCompletionRate.toFixed(1)) >= 50 &&
                              Number(averageCompletionRate.toFixed(1)) < 80
                            ? "bg-yellow-500/60"
                            : "bg-green-500/60"
                    } rounded-full `}
                    style={{
                      width: `${Number(averageCompletionRate.toFixed(1))}%`,
                    }}
                  >
                    {Number(averageCompletionRate.toFixed(1)) || 0}%
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-10 cursor-pointer">
                <ModalWrapper>
                  <ModalTrigger>
                    <button className="bg-green-500 rounded-md px-4 py-2 hover:bg-green-600 transition-all duration-300 hidden xl:flex text-xs items-center gap-2 cursor-pointer">
                      <IoSettingsOutline /> <span>User Settings</span>
                    </button>
                  </ModalTrigger>
                  <ModalContent
                    className="w-[80%] h-[90%]"
                    title={<FormTitle label="Manage User" />}
                  >
                    <ManageProfile id={userProfile.id} />
                  </ModalContent>
                </ModalWrapper>
              </div>
            </div>
            <div className="px-4 py-2 flex flex-col md:flex-row items-center gap-3">
              <p className="flex items-center gap-2 text-gray-500 text-xs">
                <span>
                  <MdEmail className="text-blue-300 font-bold" />
                </span>
                {userProfile.email}
              </p>
              <p className="flex items-center gap-2 text-gray-500 text-xs">
                <span>
                  <BiPhone className="text-blue-300 font-bold" />
                </span>
                {userProfile.phone}
              </p>
              <p className="flex items-center gap-2 text-gray-500 text-xs">
                <span>
                  <CiLocationOn className="text-blue-300 font-bold" />
                </span>
                {userProfile.address}
              </p>
            </div>
          </div>
        </div>
        <Navigation
          navLinks={[
            {
              menu: "Screening",
              link: `/dashboard/recruitment/${userProfile.id}/screening?query=personal_info`,
            },
            {
              menu: "Reference",
              link: `/dashboard/recruitment/${userProfile.id}/reference`,
            },
            {
              menu: "Training",
              link: `/dashboard/recruitment/${userProfile.id}/training`,
            },
          ]}
        />
      </div>
    )
  );
};

export default RecruitmentProfile;
