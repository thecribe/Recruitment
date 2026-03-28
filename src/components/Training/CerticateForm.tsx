"use client";
import React, { useContext } from "react";
import ModalWrapper, { ModalContent, ModalTrigger } from "../ModalWrapper";
import { FaUpload } from "react-icons/fa";

import FormWrapper from "../Forms/FormWrapper";
import { UploadCertificateSchema } from "@/utils/ZodSchema";

import z from "zod";
import dayjs from "dayjs";
import FormProvider from "@/Context/FormContext";

const CerticateForm = ({
  type,
  submitFunction,
  defaultApplicantData,
}: {
  type?: string;
  submitFunction: (input: any, file_delete?: any) => void;
  defaultApplicantData?: any;
}) => {
  const UploadCertificate = [
    {
      type: "file",
      label: "Upload Certificate",
      accessor: "file",
    },
    {
      type: "date",
      label: "Certificate issue date",
      accessor: "issue_date",
    },
    {
      type: `conditional`,
      label: `Lifetime?`,
      accessor: "lifetime",
      options: ["Yes", "No"],
      subform: [
        {
          type: "date",
          optionType: ["No"],
          label: "Certificate expiry date",
          accessor: "expiry_date",
        },
      ],
    },
  ];
  const UploadOtherCertificate = [
    {
      type: "text",
      label: "Certificate Title",
      accessor: "name",
    },
    {
      type: "file",
      label: "Upload Certificate",
      accessor: "file",
    },
    {
      type: "date",
      label: "Certificate issue date",
      accessor: "issue_date",
    },
    {
      type: `conditional`,
      label: `Lifetime?`,
      accessor: "lifetime",
      options: ["Yes", "No"],
      subform: [
        {
          type: "date",
          optionType: ["No"],
          label: "Certificate expiry date",
          accessor: "expiry_date",
        },
      ],
    },
  ];
  const formInputHandler = (
    data: z.infer<typeof UploadCertificateSchema>,
    file_delete?: any,
  ) => {
    submitFunction(data, file_delete);
  };
  return (
    <ModalWrapper>
      <ModalTrigger>
        <button className="text-xs w-fit bg-green-500/50 px-3 py-2 rounded-md cursor-pointer hover:bg-green-500/70 hover:scale-105 shadow-sm hover:shadow-black/30 active:shadow-black/10 active:scale-95 transition-all duration-300 flex items-center gap-1">
          <FaUpload className="" />
          <p className="text-xs">Upload</p>
        </button>
      </ModalTrigger>
      <ModalContent
        className="h-fit max-h-[80%] w-[80%] lg:w-[40%] "
        title={<p className="font-semibold">Upload a Certificate</p>}
      >
        <div>
          <p className="text-sm text-gray-500">
            Please upload in any of the following formats - JPG, PNG or PDF.
          </p>
          <FormProvider
            typeSchema={UploadCertificateSchema}
            controlFunction={formInputHandler}
            defaultInput={{
              ...defaultApplicantData,
              issue_date: defaultApplicantData?.issue_date
                ? dayjs(defaultApplicantData.issue_date).format("YYYY-MM-DD")
                : "",
              expiry_date: defaultApplicantData?.expiry_date
                ? dayjs(defaultApplicantData.expiry_date).format("YYYY-MM-DD")
                : "",
            }}
          >
            <FormWrapper
              data={
                type === "other" ? UploadOtherCertificate : UploadCertificate
              }
              className="grid grid-cols-1 lg:grid-cols-2 gap-5"
            />
          </FormProvider>
        </div>
      </ModalContent>
    </ModalWrapper>
  );
};

export default CerticateForm;
