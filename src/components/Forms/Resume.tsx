"use client";
import { ResumeSchema } from "@/utils/ZodSchema";
import React, { useContext } from "react";
import z from "zod";
import FormProvider from "@/Context/FormContext";
import FormWrapper from "./FormWrapper";

import FormTitle from "./FormTitle";
import AuditButton from "../AuditButton";
import { FormProfileContext } from "../Screening/FormDisplay";
import { formAccessRole } from "@/utils/data";

const Resume = () => {
  const { initialData, auditStatusHandle, formInputHandle, defaultdata, user } =
    useContext(FormProfileContext);
  const ResumeFormData = [
    {
      type: "file",
      label: "Upload your latest CV",
      accessor: "resume",
    },
    {
      type: "file",
      label: "Upload your Date of Birth Certificate",
      accessor: "date_of_birth_certificate",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center">
        <FormTitle label="Upload Resume and Birth Certificate" />
        {formAccessRole.includes(user.role.slug) && (
          <AuditButton
            buttonState={initialData?.audit_status}
            onClickFunction={() =>
              auditStatusHandle({ audit_status: initialData?.audit_status })
            }
          />
        )}
      </div>
      <FormProvider
        typeSchema={ResumeSchema}
        controlFunction={(data: any, deleteType?: "file_delete") =>
          formInputHandle(data, deleteType)
        }
        defaultInput={{ ...initialData }}
      >
        <FormWrapper
          data={ResumeFormData}
          auditCheck={initialData?.audit_status}
          className={"flex flex-col gap-5"}
        />
      </FormProvider>
    </>
  );
};

export default Resume;
