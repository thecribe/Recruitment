"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Table from "./Table";
import Image from "next/image";
import Pagination from "./Pagination";
import { IoSettings } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiBook, BiPhone, BiSend } from "react-icons/bi";
import { FaDeleteLeft } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import LoadingState from "./LoadingState";
import { instance } from "@/utils/axiosConfig";

const RecruitmentDisplay = () => {
  const searchParams = useSearchParams();
  const [paginationSettings, setPaginationSettings] = useState<{
    currentPage: number;
    toShow: number;
  }>({ currentPage: 1, toShow: 10 });

  const department = searchParams.get("department");
  const job_type = searchParams.get("job_type");
  const [allUsers, setAllUsers] = useState<{
    data: {}[];
    count: number;
  } | null>(null);
  const [loadingState, setLoadingState] = useState({
    error: false,
    message: "",
    loading: false,
  });

  const route = useRouter();

  const headerColumns = [
    { header: "Details", accessor: "details", className: "" },
    {
      header: "Contact",
      accessor: "contact",
      className: "hidden md:table-cell",
    },
    {
      header: "Recruitment",
      accessor: "recruitment",
      className: "hidden lg:table-cell",
    },
    {
      header: "Progress",
      accessor: "progress",
      className: "hidden lg:table-cell",
    },
    { header: "Actions", accessor: "actions", className: "" },
  ];

  const renderRow = (eachRow: any) => {
    const profilepic = JSON.parse(eachRow.profileImage || "[]");

    return (
      <tr
        key={eachRow.id}
        className="border-b border-gray-200 even:bg-slate-200/30 hover:bg-blue-200/40 transition-all duration-300 cursor-pointer "
      >
        <td
          className="flex items-center gap-2 p-4 group "
          onClick={() =>
            route.push(
              `/dashboard/recruitment/${eachRow.id}?query=personal_info`,
            )
          }
        >
          <Image
            src={
              (profilepic[0]?.img_url.includes("localhost:3000")
                ? profilepic[0]?.img_url.replace(
                    /^https?:\/\/localhost:3000/,
                    "",
                  )
                : profilepic[0]?.img_url) || "/globe.svg"
            }
            alt=""
            width={40}
            height={40}
            className=" w-10 h-10 rounded-full object-cover"
            unoptimized
          />
          <div className="flex flex-col justify-center ">
            <h3 className="text-xs font-bold text-gray-800 group-hover:underline underline-offset-2">
              {eachRow.firstName + " " + eachRow.lastName}
            </h3>
            <p className="text-xs text-gray-500">{eachRow.jobType.title}</p>
          </div>
        </td>
        <td className="hidden md:table-cell text-gray-800 text-xs px-4 py-2">
          <div className="flex flex-col gap-1">
            <p className="flex items-center gap-2">
              <span>
                <MdEmail />
              </span>
              {eachRow.email}
            </p>
            <p className="flex items-center gap-2">
              <span>
                <BiPhone />
              </span>
              {eachRow.phone}
            </p>
            <p className="flex items-center gap-2">
              <span>
                <CiLocationOn />
              </span>
              {eachRow.address}
            </p>
          </div>
        </td>
        <td className="hidden lg:table-cell text-gray-800 text-xs px-4">
          {eachRow.department.title}
        </td>
        <td className="hidden lg:table-cell text-gray-800 text-xs px-4">
          <div className="w-full bg-gray-400/30 rounded-full">
            <p
              className={` text-center ${
                Number(eachRow.profileProgress || 0) === 0
                  ? "bg-transparent"
                  : +eachRow.profileProgress || 0 < 50
                    ? "bg-red-500/60"
                    : eachRow.profileProgress ||
                        (0 >= 50 && eachRow.profileProgress) ||
                        0 < 80
                      ? "       bg-yellow-500/60"
                      : "bg-green-500/60"
              } rounded-full `}
              style={{ width: eachRow.profileProgress || 0 + "%" }}
            >
              {eachRow.profileProgress || 0}%
            </p>
          </div>
        </td>

        <td className="px-4">
          <div className=" group relative flex items-center justify-center gap-2 cursor-pointer ">
            <button className=" w-7 h-7 flex justify-center items-center rounded-full cursor-pointer">
              <IoSettings className="text-xl text-gray-600" />
            </button>

            <div className="hidden group-hover:flex flex-col z-5 absolute w-50 right-[50%] top-1/2 -translate-x-3  bg-white rounded-sm shadow-lg shadow-black/10 border border-gray-200 ">
              <p className="text-xs text-gray-500 p-2 hover:bg-gray-500/50 w-full hover:text-white transition-all duration-300 py-2 px-4 flex items-center gap-2">
                <span className="">
                  <FaUser />
                </span>
                View Profile
              </p>
              <p className="text-xs text-gray-500 p-2 hover:bg-gray-500/50 w-full hover:text-white transition-all duration-300 py-2 px-4 flex items-center gap-2">
                <span className="">
                  <MdEmail />
                </span>
                Send Email
              </p>
              <p className="text-xs text-gray-500 p-2 hover:bg-gray-500/50 w-full hover:text-white transition-all duration-300 py-2 px-4 flex items-center gap-2">
                <span className="">
                  <BiSend />
                </span>
                Send/Resend Invitation
              </p>
              <p className="text-xs text-gray-500 p-2 hover:bg-gray-500/50 w-full hover:text-white transition-all duration-300 py-2 px-4 flex items-center gap-2">
                <span className="">
                  <BiBook />
                </span>
                Notes
              </p>
              <p className="text-xs text-gray-500 p-2 hover:bg-gray-500/50 w-full hover:text-white transition-all duration-300 py-2 px-4 flex items-center gap-2">
                <span className="">
                  <FaDeleteLeft />
                </span>
                Reject Applicant
              </p>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  useEffect(() => {
    setLoadingState((prev) => ({ ...prev, loading: true }));

    const getData = async () => {
      const limit = paginationSettings.toShow;
      const offset =
        (paginationSettings.currentPage - 1) * paginationSettings.toShow;
      try {
        const response = await instance.get(
          `/users?limit=${limit}&offset=${offset}&department=${department ? department : ""}&job_type=${job_type ? job_type : ""}&type=recruitment`,
        );

        setAllUsers({
          data: [...response.data.data],
          count: response.data.count,
        });
      } catch (error: any) {
        console.log(error.response.data);
      }
    };

    setLoadingState((prev) => ({ ...prev, loading: false }));

    getData();
  }, [department, job_type]);

  return (
    allUsers &&
    (loadingState.loading ? (
      <LoadingState className="w-full flex justify-center items-center " />
    ) : (
      <div className="w-full h-full flex flex-col gap-5">
        <Table
          columns={headerColumns}
          data={allUsers.data}
          renderRow={renderRow}
        />
        <Pagination
          arrayLength={allUsers?.count}
          toShow={paginationSettings.toShow}
          currentPageHandler={(currentPage) =>
            setPaginationSettings((prev) => ({ ...prev, currentPage }))
          }
        />
      </div>
    ))
  );
};

export default RecruitmentDisplay;
