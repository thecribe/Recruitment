"use client";
import FormTitle from "@/app/components/Forms/FormTitle";
import React, { createContext, useEffect, useState } from "react";
import AddInfo from "./AddInfo";
import Divider from "@/app/components/Divider";
import Table from "@/app/components/Table";
import Pagination from "@/app/components/Pagination";
import ModalWrapper, {
  ModalContent,
  ModalTrigger,
} from "@/app/components/ModalWrapper";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import LoadingState from "@/app/components/LoadingState";
import Notification from "@/app/components/Notification";
import { instance } from "@/utils/axiosConfig";

export const DepartmentContext = createContext<any | undefined>(undefined);
const TypeHolder = ({ type }: { type: string }) => {
  const [paginationSettings, setPaginationSettings] = useState<{
    currentPage: number;
    toShow: number;
  }>({ currentPage: 1, toShow: 10 });
  const [initialData, setInitialData] = useState<{
    data: {}[] | null;
    count: number | null;
  }>({ data: [], count: null });
  const [loader, setLoader] = useState<boolean>(true);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const columnHeader = [
    {
      header: "S/N",
      accessor: "s_n",
      className: "",
    },
    {
      header: "Title",
      accessor: "title",
      className: "",
    },
    {
      header: "Slug",
      accessor: "slug",
      className: "",
    },
    {
      header: "Actions",
      accessor: "actions",
      className: "",
    },
  ];

  const deleteHandler = async (id: any) => {
    setLoader(true);
    try {
      const response = await instance.delete(`/${type}?id=${id.id}`);
      setLoader(false);
      setNotification({ message: response.data.message, type: "success" });
    } catch (error: any) {
      setLoader(false);
      setNotification({ message: error.response.data.message, type: "error" });
    }
  };
  const rendeRow = (eachRow: any, index?: number) => {
    return (
      <tr key={eachRow.id} className="text-xs even:bg-gray-100">
        <td className="p-3">{index !== undefined ? index + 1 : ""}</td>
        <td className="p-3">{eachRow.title}</td>
        <td className="p-3">{eachRow.slug}</td>
        <td>
          <div className="flex w-full justify-center items-center gap-3">
            <ModalWrapper>
              <ModalTrigger>
                <FaEdit className="cursor-pointer text-blue-500 text-base" />
              </ModalTrigger>
              <ModalContent
                className="w-80% md:w-[50%]"
                title={
                  <FormTitle
                    label={`Edit ${
                      type === "department"
                        ? "Department"
                        : type === "job-type"
                          ? "Job Type"
                          : "Visa Type"
                    }`}
                  />
                }
              >
                <AddInfo type="edit" defaultdata={eachRow} displaytype={type} />
                {loader && (
                  <LoadingState className="w-1/4 flex justify-center items-center " />
                )}
              </ModalContent>
            </ModalWrapper>
            <ModalWrapper>
              <ModalTrigger>
                <FaDeleteLeft className="cursor-pointer text-red-500 text-base" />
              </ModalTrigger>
              <ModalContent
                className="w-80% md:w-[30%]"
                title={
                  <FormTitle
                    label={`Delete ${
                      type === "department"
                        ? "Departments"
                        : type === "job-type"
                          ? "Job Type"
                          : "Visa Type"
                    }`}
                  />
                }
              >
                <div className="flex items-center justify-center flex-col gap-5">
                  <p className="text-xs ">Are you sure you want to delete</p>

                  {loader ? (
                    <LoadingState className="w-1/4 flex justify-center items-center " />
                  ) : (
                    <button
                      onClick={() => deleteHandler(eachRow)}
                      className="text-xs bg-red-500 text-white px-3 py-1 rounded-sm cursor-pointer active:scale-95 active:shadow-black/10 shadow-sm hover:shadow-black/30 hover:scale-105 transition-all duration-300"
                    >
                      Yes, delete
                    </button>
                  )}
                </div>
              </ModalContent>
            </ModalWrapper>
          </div>
        </td>
      </tr>
    );
  };

  useEffect(() => {
    const getData = async () => {
      let response: any;
      response = await instance.get(
        `/${type}?limit=${paginationSettings.toShow}&offset=${(paginationSettings.currentPage - 1) * paginationSettings.toShow}`,
      );
      // response = await getDepartment(
      //   paginationSettings.toShow,
      //   (paginationSettings.currentPage - 1) * paginationSettings.toShow,
      //   type,
      // );
      if (response && response.data) {
        setInitialData((prev) => ({
          ...prev,
          data: [...response.data.data],
          count: response.data.count,
        }));
      }
      setLoader(false);
    };

    getData();
  }, [type, loader, paginationSettings.currentPage]);

  return (
    <DepartmentContext.Provider
      value={{ setLoader, loader, setNotification, viewType: type }}
    >
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="h-full flex flex-col gap-3 overflow-y-auto">
        <FormTitle
          label={`Manage ${
            type === "department"
              ? "Departments"
              : type === "job-type"
                ? "Job Type"
                : "Visa Type"
          }`}
        />
        <Divider />

        <div className="flex-1 flex gap-5 mt-5 overflow-y-auto">
          <div className="w-1/3">
            <FormTitle
              label={`Add New ${
                type === "department"
                  ? "Departments"
                  : type === "job-type"
                    ? "Job Type"
                    : "Visa Type"
              }`}
            />
            <AddInfo key={Math.random() * 10} displaytype={type} />
          </div>
          {!loader ? (
            (initialData?.data ?? []).length > 0 ? (
              <div className="w-2/3 h-full  px-3 overflow-y-auto ">
                <Table
                  columns={columnHeader}
                  renderRow={rendeRow}
                  data={initialData?.data}
                />
                <Pagination
                  arrayLength={initialData.count}
                  toShow={paginationSettings.toShow}
                  currentPageHandler={(currentPage) =>
                    setPaginationSettings((prev) => ({ ...prev, currentPage }))
                  }
                />
              </div>
            ) : (
              <p className="text-center text-xs w-full">{`Please add a ${
                type === "department"
                  ? "departments"
                  : type === "job-type"
                    ? "job Type"
                    : "visa Type"
              } to view list`}</p>
            )
          ) : (
            <LoadingState className="w-full flex justify-center items-center " />
          )}
        </div>
      </div>
    </DepartmentContext.Provider>
  );
};

export default TypeHolder;
