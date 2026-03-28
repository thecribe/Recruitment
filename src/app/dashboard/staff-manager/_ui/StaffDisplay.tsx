"use client";
import LoadingState from "@/components/LoadingState";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { instance } from "@/utils/axiosConfig";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiBook, BiPhone, BiSend } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const StaffDisplay = () => {
  const searchParams = useSearchParams();
  const [paginationSettings, setPaginationSettings] = useState<{
    currentPage: number;
    toShow: number;
  }>({ currentPage: 1, toShow: 10 });
  const department = searchParams.get("department");
  const job_type = searchParams.get("job_type");
  const [loadingState, setLoadingState] = useState({
    error: false,
    message: "",
    loading: false,
  });
  const [allUsers, setAllUsers] = useState<{
    data: {}[];
    count: number;
  } | null>(null);
  const route = useRouter();

  useEffect(() => {
    setLoadingState((prev) => ({ ...prev, loading: true }));

    const getData = async () => {
      const limit = paginationSettings.toShow;
      const offset =
        (paginationSettings.currentPage - 1) * paginationSettings.toShow;
      try {
        const response = await instance.get(
          `/users?limit=${limit}&offset=${offset}&department=${department ? department : ""}&job_type=${job_type ? job_type : ""}&type=staff`,
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

  const headerColumns = [
    { header: "Details", accessor: "details", className: "" },
    {
      header: "Email",
      accessor: "email",
      className: "hidden md:table-cell",
    },
    {
      header: "Address",
      accessor: "Address",
      className: "hidden lg:table-cell",
    },
    {
      header: "Phone Number",
      accessor: "phone_no",
      className: "hidden lg:table-cell",
    },
    { header: "Actions", accessor: "actions", className: "" },
  ];

  interface Contact {
    email: string;
    phone: string;
    address: string;
  }

  interface Applicant {
    id: number;
    name: string;
    role: string;
    status: "Active" | "Inactive"; // restrict to known statuses
    contact: Contact;
    recruitment_stage: string;
    progress: number; // e.g. 0–100
    days_in: number;
  }
  const renderRow = (eachRow: any) => {
    const profilepic = JSON.parse(eachRow.profileImage || "[]");
    console.log(eachRow);
    return (
      <tr
        key={eachRow.id}
        className="border-b border-gray-200 even:bg-slate-200/30 hover:bg-blue-200/40 transition-all duration-300 cursor-pointer "
      >
        <td
          className="flex items-center gap-2 p-4 group "
          onClick={() => route.push(`/dashboard/staff-manager/${eachRow.id}`)}
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
            <p className="text-xs text-gray-500">{eachRow.role.role}</p>
          </div>
        </td>
        <td className="hidden md:table-cell text-gray-800 text-xs px-4 py-2">
          <p className="flex items-center gap-2">
            <span>
              <MdEmail />
            </span>
            {eachRow.email}
          </p>
        </td>
        <td className="hidden lg:table-cell text-gray-800 text-xs px-4">
          <p className="flex items-center gap-2">
            <span>
              <CiLocationOn />
            </span>
            {eachRow.address}
          </p>
        </td>
        <td className="hidden lg:table-cell text-gray-800 text-xs px-4">
          <p className="flex items-center gap-2">
            <span>
              <BiPhone />
            </span>
            {eachRow.phone}
          </p>
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
  return (
    <div className="bg-white p-3 rounded-md h-full overflow-y-auto">
      {allUsers &&
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
              arrayLength={allUsers.count}
              toShow={paginationSettings.toShow}
              currentPageHandler={(currentPage) =>
                setPaginationSettings((prev) => ({ ...prev, currentPage }))
              }
            />
          </div>
        ))}
    </div>
  );
};

export default StaffDisplay;
