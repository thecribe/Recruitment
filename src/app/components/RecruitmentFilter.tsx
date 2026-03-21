"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useContext } from "react";
import ModalWrapper, { ModalContent, ModalTrigger } from "./ModalWrapper";
import SignUpForm from "./SignUpForm";
import FormTitle from "./Forms/FormTitle";
import ManageCertificate from "./Training/ManageCertificate";
import { AuthContext } from "../Context/AuthContext";

const RecruitmentFilter = ({}) => {
  const { defaultdata } = useContext(AuthContext);
  const { department, job_type } = defaultdata;
  const [filterValue, setFilterValue] = React.useState<{
    department: string;
    job_type: string;
  }>({ department: "", job_type: "" });
  const router = useRouter();
  const pathname = usePathname(); // current path, e.g. "/products"
  const searchParams = useSearchParams(); // current ?params if any

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(
      "department",
      filterValue.department ? filterValue.department : "",
    );
    params.set("job_type", filterValue.job_type ? filterValue.job_type : "");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className=" w-full justify-between flex flex-col gap-3 xl:flex-row xl:items-center">
      <div className="flex  gap-2 border-b-2 pb-2 xl:pb-0 border-gray-300 xl:border-none ">
        <ModalWrapper>
          <ModalTrigger>
            <button className="px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:scale-105 shadow-sm hover:shadow-black/30 active:scale-95 active:shadow-black/10 transition-all duration-300 text-xs">
              Add new candidate
            </button>
          </ModalTrigger>
          <ModalContent
            className="w-[90%] md:w-[60%]"
            title={<FormTitle label="Add New Applicant" />}
          >
            <SignUpForm />
          </ModalContent>
        </ModalWrapper>
        <ManageCertificate />
      </div>
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-center gap-5">
        <div className="flex justify-center items-center gap-2">
          <span className="text-xs font-semibold">Department:</span>
          <select
            value={filterValue.department}
            onChange={(e) =>
              setFilterValue((prev) => ({
                ...prev,
                department: e.target.value,
              }))
            }
            className=" p-2 border border-gray-300 rounded-md text-xs"
          >
            <option value="all">All</option>
            {department &&
              department.map((eachDepartment: any, index: number) => (
                <option value={eachDepartment.slug} key={eachDepartment.id}>
                  {eachDepartment.title}
                </option>
              ))}
          </select>
        </div>
        <div className="flex justify-center items-center gap-2">
          <span className="text-xs font-semibold">Job Type:</span>
          <select
            value={filterValue.job_type}
            onChange={(e) =>
              setFilterValue((prev) => ({
                ...prev,
                job_type: e.target.value,
              }))
            }
            className=" p-2 border border-gray-300 rounded-md text-xs"
          >
            <option value="all">All</option>
            {job_type.map((eachType: any, index: number) => {
              return (
                <option key={index} value={eachType.slug}>
                  {eachType.title}
                </option>
              );
            })}
          </select>
        </div>

        <button
          className="px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:scale-105 shadow-sm hover:shadow-black/30 active:scale-95 active:shadow-black/10 transition-all duration-300 text-sm"
          onClick={handleFilter}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default RecruitmentFilter;
