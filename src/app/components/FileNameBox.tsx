"use client";
import React, { useContext } from "react";
import { BiDownload, BiUpload } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { LuDelete } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import ModalWrapper, { ModalContent, ModalTrigger } from "./ModalWrapper";
import FormTitle from "./Forms/FormTitle";
import Image from "next/image";
import { FormContext } from "@/app/Context/FormContext";

const FileNameBox = ({ accessor, file }: { accessor: string; file: any }) => {
  const { eachfile, index } = file;

  const { defaultInput, handleFileUploadDelete } = useContext(FormContext);

  const handleDelete = async () => {
    const updateImageArray = JSON.parse(defaultInput[accessor]);
    const result = updateImageArray.filter((_: any, i: number) => i !== index);

    handleFileUploadDelete({ [accessor]: JSON.stringify([...result]) });
  };
  return (
    <div className="py-2 flex justify-center items-center  bg-blue-400/30  rounded-md px-2">
      <div className="table w-full table-fixed  ">
        <div className="table-row-group">
          <div className="table-row ">
            <div className="table-cell font-semibold text-xs align-middle w-[10%] ">
              <div className="w-full flex items-center  ">
                <p>{index + 1}</p>
              </div>
            </div>
            <div className="table-cell font-semibold text-xs w-[50%] ">
              <div className="flex flex-col justify-start">
                <p>File Name</p>
                <span className="text-gray-500/70 text-xs">
                  {eachfile?.name}
                </span>
              </div>
            </div>
            <div className="hidden lg:table-cell font-semibold text-xs ">
              <div className="flex flex-col justify-start">
                <p>Uploaded Date</p>
                <span className="text-gray-500/70 text-xs">filename</span>
              </div>
            </div>
            <div className="table-cell align-middle ">
              <div className="flex gap-5 text-lg">
                <ModalWrapper>
                  <ModalTrigger>
                    <BsEye className="cursor-pointer" />
                  </ModalTrigger>
                  <ModalContent
                    className="w-3/4 md:w-2/3 h-[90%]"
                    title={<FormTitle label="View Document" />}
                  >
                    {eachfile.name.endsWith(".pdf") ? (
                      <div className=" flex items-center justify-center relative rounded-md h-[90%] w-full">
                        <iframe
                          src={
                            (eachfile.img_url.includes("localhost:3000")
                              ? eachfile.img_url.replace(
                                  /^https?:\/\/localhost:3000/,
                                  "",
                                )
                              : eachfile.img_url) || "/globe.svg"
                          }
                          width="100%"
                          height="100%"
                          title="PDF Preview"
                        />
                      </div>
                    ) : (
                      <div className=" flex flex-col items-center justify-center relative rounded-md h-[90%]">
                        <Image
                          src={
                            (eachfile.img_url.includes("localhost:3000")
                              ? eachfile.img_url.replace(
                                  /^https?:\/\/localhost:3000/,
                                  "",
                                )
                              : eachfile.img_url) || "/globe.svg"
                          }
                          alt={eachfile.name}
                          width={1200}
                          height={600}
                          className="w-full h-full object-contain"
                          unoptimized
                        />
                        <div className="flex gap-2 items-center justify-center  bg-blue-500/50 px-3 py-2 rounded-md cursor-pointer hover:bg-blue-500/70 hover:scale-105 shadow-xs hover:shadow-black/30 active:shadow-black/10 active:scale-95 transition-all duration-300">
                          <BiDownload />{" "}
                          <button className="text-xs w-fit">
                            Download Image
                          </button>
                        </div>
                      </div>
                    )}
                  </ModalContent>
                </ModalWrapper>
                <ModalWrapper>
                  <ModalTrigger>
                    <MdClose className="cursor-pointer" />
                  </ModalTrigger>
                  <ModalContent
                    className="w-3/4 md:w-1/2"
                    title={<FormTitle label="Delete document" />}
                  >
                    <div className="flex flex-col gap-3 items-center justify-center">
                      <p className="text-sm">
                        Are you sure you want to delete this document?
                      </p>
                      <div
                        className="flex gap-2 items-center justify-center  bg-red-500/80 px-3 py-2 rounded-md cursor-pointer hover:bg-red-500/70 hover:scale-105 shadow-xs hover:shadow-black/30 active:shadow-black/10 active:scale-95 transition-all duration-300 w-fit"
                        onClick={handleDelete}
                      >
                        <button className="text-xs w-fit cursor-pointer">
                          Yes, delete
                        </button>
                      </div>
                    </div>
                  </ModalContent>
                </ModalWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileNameBox;
