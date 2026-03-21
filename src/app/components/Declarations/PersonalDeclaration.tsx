"use client";
import FormProvider from "@/app/Context/FormContext";

import React, { useContext } from "react";
import z from "zod";
import FormWrapper from "../Forms/FormWrapper";
import { PersonalDeclarationSchema } from "@/utils/ZodSchema";
import AuditButton from "../AuditButton";
import { FormProfileContext } from "../Screening/FormDisplay";
import dayjs from "dayjs";
import { formAccessRole } from "@/utils/data";

const PersonalDeclaration = () => {
  const { initialData, auditStatusHandle, formInputHandle, user } =
    useContext(FormProfileContext);
  const PersonalDeclarationData = [
    {
      type: "file",
      label: "Signature",
      accessor: "signature",
    },
    {
      type: "date",
      label: "Date",
      accessor: "date",
    },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end w-full items-center">
        {formAccessRole.includes(user.role.slug) && (
          <AuditButton
            buttonState={initialData?.audit_status}
            onClickFunction={() =>
              auditStatusHandle({ audit_status: initialData?.audit_status })
            }
          />
        )}
      </div>
      <p className="text-sm text-black">
        I hereby confirm that the information provided on my application is
        correct and true to the best of my knowledge and that I have not
        withheld any information that should be considered when offering me
        work.
      </p>
      <p className="text-sm text-black">
        I understand that providing false or inaccurate information may result
        in the termination of any placement. I agree that I will make best
        endeavours to make myself aware of the Health & Safety procedures for
        each client I am assigned to. <br />I confirm that I have read and
        understood the Terms of Engagement and the terms of the declaration and
        agree to be bound by them.
      </p>

      <FormProvider
        typeSchema={PersonalDeclarationSchema}
        controlFunction={(data: any, deleteType?: "file_delete") =>
          formInputHandle(data, deleteType)
        }
        defaultInput={{
          ...initialData,
          date: initialData?.date
            ? dayjs(initialData?.date).format("YYYY-MM-DD")
            : "",
        }}
      >
        <FormWrapper
          data={PersonalDeclarationData}
          auditCheck={initialData?.audit_status || false}
          className={"flex flex-col gap-5 md:w-2/3"}
        />
      </FormProvider>
    </div>
  );
};

export default PersonalDeclaration;
