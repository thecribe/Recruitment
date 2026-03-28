"use client";
import { CurrentJobSchema } from "@/utils/ZodSchema";
import React, { useContext, useEffect, useState } from "react";
import z from "zod";
import FormTitle from "./FormTitle";
import AuditButton from "../AuditButton";
import { FormProfileContext } from "../Screening/FormDisplay";
import { AuthContext } from "@/Context/AuthContext";
import FormProvider from "@/Context/FormContext";
import FormWrapper from "./FormWrapper";
import { formAccessRole } from "@/utils/data";

interface DefaultValue {
  data: z.infer<typeof CurrentJobSchema>;
  auditStatus: boolean;
}
const CurrentJob = () => {
  const { initialData, auditStatusHandle, formInputHandle, user } =
    useContext(FormProfileContext);

  const CurrentJobFormData = [
    {
      type: "text",
      label: "Job Title",
      accessor: "job_title",
    },
    {
      type: "text",
      label: "Current Place of Work",
      accessor: "current_place_of_work",
    },
    {
      type: "text",
      label: "Current Pay p/h",
      accessor: "current_pay",
    },
    {
      type: "text",
      label: "Day/Night Shift",
      accessor: "shift",
    },
    {
      type: "textarea",
      label: "Duties",
      accessor: "duties",
      options: { row: 4, col: 10 },
    },
  ];

  useEffect(() => {});
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <FormTitle label="Current Job" />
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
        typeSchema={CurrentJobSchema}
        controlFunction={(data: any, deleteType?: "file_delete") =>
          formInputHandle(data, deleteType)
        }
        defaultInput={{ ...initialData }}
      >
        <FormWrapper
          data={CurrentJobFormData}
          auditCheck={initialData?.audit_status}
          className={"grid grid-cols-1 lg:grid-cols-2  gap-5"}
        />
      </FormProvider>
    </div>
  );
};

export default CurrentJob;
