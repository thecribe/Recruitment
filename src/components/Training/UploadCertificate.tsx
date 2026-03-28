"use client";
import React, { useContext, useState } from "react";
import ModalWrapper, { ModalContent, ModalTrigger } from "../ModalWrapper";
import FormTitle from "../Forms/FormTitle";

import { UploadCertificateSchema } from "@/utils/ZodSchema";
import FormWrapper from "../Forms/FormWrapper";
import z from "zod";
import { formToFormData } from "@/utils/extrafucntions";
import { CertificateContext } from "./TrainingWrapper";
import FormProvider from "@/Context/FormContext";
import LoadingState from "../LoadingState";
import { instance } from "@/utils/axiosConfig";

const UploadCertificate = () => {
  const { applicantId, setReloader, setNotification } =
    useContext(CertificateContext);
  const [loadingState, setLoadingState] = useState(false);
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

  const formInputHandler = async (
    data: z.infer<typeof UploadCertificateSchema>,
  ) => {
    setLoadingState(true);

    try {
      let response;
      const formData = formToFormData(data);
      const responseData = await instance.post(
        `/training/certificate/${applicantId}`,
        formData,
      );
      response = responseData.data;

      setNotification({
        message: response.message,
        type: "success",
      });
      setReloader((prev: boolean) => !prev);
    } catch (error: any) {
      setNotification({
        message: error.response.data.message,
        type: "error",
      });
      setLoadingState(false);
    }
  };

  return (
    <ModalWrapper>
      <ModalTrigger>
        <button className="text-xs w-fit bg-green-500/50 px-3 py-2 rounded-md cursor-pointer hover:bg-green-500/70 hover:scale-101 shadow-sm hover:shadow-black/30 active:shadow-black/10 active:scale-98 transition-all duration-300 flex items-center gap-1">
          <p className="text-xs">Upload certificate</p>
        </button>
      </ModalTrigger>
      <ModalContent
        className="w-[80%] lg:w-[60%]"
        title={<FormTitle label="Upload Certificate" />}
      >
        <div>
          {loadingState && (
            <LoadingState className="w-full flex justify-center items-center" />
          )}
          <p className="text-sm text-gray-500">
            Please upload in any of the following formats - JPG, PNG or PDF.
          </p>
          <FormProvider
            typeSchema={UploadCertificateSchema}
            controlFunction={formInputHandler}
          >
            <FormWrapper
              data={UploadOtherCertificate}
              auditCheck={loadingState}
              className="grid grid-cols-1 lg:grid-cols-2 gap-5"
            />
          </FormProvider>
        </div>
      </ModalContent>
    </ModalWrapper>
  );
};

export default UploadCertificate;
