"use client";
import FormProvider from "@/Context/FormContext";
import { WorkingTimeSchema } from "@/utils/ZodSchema";
import React, { useContext } from "react";

import FormWrapper from "../Forms/FormWrapper";

import AuditButton from "../AuditButton";
import { FormProfileContext } from "../Screening/FormDisplay";
import dayjs from "dayjs";
import { formAccessRole } from "@/utils/data";

const WorkingTime = () => {
  const { initialData, auditStatusHandle, formInputHandle, user } =
    useContext(FormProfileContext);
  const WorkingTimeData = [
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
        For the purposes of the Working Time Regulations 1998 (as amended) I,
        consent to work more than an average of 48 hours per week, averaged over
        17 weeks. I understand that I may withdraw this consent by giving Arise
        Nursing not less than three months&apos; notice at any time.
      </p>

      <FormProvider
        typeSchema={WorkingTimeSchema}
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
          data={WorkingTimeData}
          auditCheck={initialData?.audit_status || false}
          className={"flex flex-col gap-5 md:w-2/3"}
        />
      </FormProvider>
    </div>
  );
};

export default WorkingTime;
