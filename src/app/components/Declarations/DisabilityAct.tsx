"use client";
import FormProvider from "@/app/Context/FormContext";
import React, { useContext } from "react";
import FormWrapper from "../Forms/FormWrapper";
import { DisabilitySchema } from "@/utils/ZodSchema";

import AuditButton from "../AuditButton";
import { FormProfileContext } from "../Screening/FormDisplay";
import dayjs from "dayjs";
import { formAccessRole } from "@/utils/data";

const DisabilityData = [
  {
    type: "radio",
    label:
      "Do you consider yourself to be a person with a disability as described by the disability discrimination act 1995? i.e. do you consider yourself to be someone who has a physical or mental impairment which has a substantial and long term adverse effect on your ability to carry out normal day to day activities",
    accessor: "disability",
    options: ["Yes", "No"],
  },
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

const DisabilityAct = () => {
  const { initialData, auditStatusHandle, formInputHandle, user } =
    useContext(FormProfileContext);

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
        Applicants with disabilities will be invited for interview if the
        essential job criteria are met.
      </p>

      <FormProvider
        typeSchema={DisabilitySchema}
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
          data={DisabilityData}
          auditCheck={initialData?.audit_status || false}
          className={"flex flex-col gap-5"}
        />
      </FormProvider>
    </div>
  );
};

export default DisabilityAct;
