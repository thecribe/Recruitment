"use client";
import React, { useContext, useState } from "react";
import TrainingModal from "../Modals/TrainingModal";
import { FaEye } from "react-icons/fa";
import Image from "next/image";
import { formToFormData, getFileExtension } from "@/utils/extrafucntions";
import ModalWrapper, { ModalContent, ModalTrigger } from "../ModalWrapper";
import CerticateForm from "./CerticateForm";
import { CertificateContext } from "./TrainingWrapper";

import dayjs from "dayjs";
import LoadingState from "../LoadingState";
import { FiDelete } from "react-icons/fi";
import { instance } from "@/utils/axiosConfig";

const CertificateBox = ({
  mandatoryCertificateData,
  type,
  defaultApplicantData,
}: {
  data?: any;
  type?: string;
  mandatoryCertificateData?: any;
  defaultApplicantData?: any;
}) => {
  const { applicantId, setReloader, setNotification } =
    useContext(CertificateContext);
  const [loadingState, setLoadingState] = useState(false);

  const formSubmissionHandler = async (input: any, fileDelete?: any) => {
    setLoadingState(true);

    try {
      let response;

      if (fileDelete === "file_delete") {
        const responseData = await instance.patch(
          `/training/certificate/${defaultApplicantData.id}`,
          input,
        );
        response = responseData.data;
        setNotification({
          message: "file deleted",
          type: "success",
        });
        setReloader((prev: boolean) => !prev);
        setLoadingState(false);
        return;
      }

      if (defaultApplicantData) {
        const formData = formToFormData({
          name: mandatoryCertificateData ? mandatoryCertificateData.name : null,
          certificate_id: defaultApplicantData.id,
          ...input,
        });
        const responseData = await instance.put(
          `/training/certificate/${applicantId}`,
          formData,
        );
        response = responseData.data;
      } else {
        const formData = formToFormData({
          name: mandatoryCertificateData ? mandatoryCertificateData.name : null,
          mandatory_certificateId: mandatoryCertificateData
            ? mandatoryCertificateData.id
            : null,
          ...input,
        });

        const responseData = await instance.post(
          `/training/certificate/${applicantId}`,
          formData,
        );
        response = responseData.data;
      }
      setNotification({
        message: response.message,
        type: "success",
      });
      setReloader((prev: boolean) => !prev);
      setLoadingState(false);
    } catch (error: any) {
      setNotification({
        message: error.response.data.message,
        type: "error",
      });
      setLoadingState(false);
    }
  };

  const deleteCertificateHandler = async () => {
    setLoadingState(true);
    try {
      // const response = await deleteCertificate(defaultApplicantData.id);
      const response = await instance.delete(
        `/training/certificate/${defaultApplicantData.id}`,
      );
      setNotification({
        message: response.data.message,
        type: "success",
      });
      setReloader((prev: boolean) => !prev);
      setLoadingState(false);
    } catch (error: any) {
      setNotification({
        message: error.response.data.message,
        type: "error",
      });
      setLoadingState(false);
    }
  };

  const imagePath = defaultApplicantData
    ? defaultApplicantData.file
      ? JSON.parse(defaultApplicantData.file)[
          JSON.parse(defaultApplicantData.file).length - 1
        ]
      : ""
    : null;

  return (
    <div className="p-4 rounded-md shadow-md shadow-black/20 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm text-gray-600 font-semibold">
          {defaultApplicantData
            ? defaultApplicantData?.name
            : mandatoryCertificateData?.name}
        </h3>
        {loadingState ? (
          <LoadingState className="w-full flex justify-center items-center" />
        ) : (
          <CerticateForm
            type={type}
            submitFunction={formSubmissionHandler}
            defaultApplicantData={defaultApplicantData}
          />
        )}
      </div>

      <div className="flex text-xs justify-between">
        <p>Date of Issue:</p>
        <span>
          {defaultApplicantData?.issue_date
            ? dayjs(defaultApplicantData.issue_date).format("YYYY-MM-DD")
            : ""}
        </span>
      </div>

      <div className="flex text-xs justify-between">
        <p>Expiry Date:</p>
        <span>
          {defaultApplicantData?.expiry_date
            ? dayjs(defaultApplicantData.expiry_date).format("YYYY-MM-DD")
            : defaultApplicantData?.lifetime === "Yes"
              ? "Lifetime"
              : ""}
        </span>
      </div>
      <div className="flex  gap-2 items-center ">
        <DocumentViewer filepath={imagePath} />
        {type === "other" && (
          <button
            className="flex items-center gap-1 bg-red-300 w-fit px-3 py-1 rounded-sm cursor-pointer"
            onClick={deleteCertificateHandler}
          >
            <FiDelete className="" />
            <p className="text-xs">Delete</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default CertificateBox;

const DocumentViewer = ({ filepath }: { filepath: any }) => {
  const ext = filepath ? getFileExtension(filepath.img_url) : null;

  return (
    <ModalWrapper>
      <ModalTrigger>
        <button className="flex items-center gap-1 bg-gray-300 w-fit px-3 py-1 rounded-sm cursor-pointer">
          <FaEye className="" />
          <p className="text-xs">View</p>
        </button>
      </ModalTrigger>
      <ModalContent className="h-[80%] w-[80%] ">
        {filepath ? (
          ext === "pdf" ? (
            <div className=" flex items-center justify-center relative rounded-md h-[90%] w-full">
              <iframe
                src={
                  (filepath.img_url.includes("localhost:3000")
                    ? filepath.img_url.replace(/^https?:\/\/localhost:3000/, "")
                    : filepath.img_url) || "/globe.svg"
                }
                width="100%"
                height="100%"
                title="PDF Preview"
              />
            </div>
          ) : (
            <div className="w-full h-[90%]">
              <Image
                src={
                  filepath.img_url.includes("localhost:3000")
                    ? filepath.img_url.replace(/^https?:\/\/localhost:3000/, "")
                    : filepath.img_url
                }
                alt={filepath.name}
                width={1200}
                height={1000}
                className="w-full h-full object-contain "
                unoptimized
              />
            </div>
          )
        ) : (
          <p>no image</p>
        )}
      </ModalContent>
    </ModalWrapper>
  );
};
