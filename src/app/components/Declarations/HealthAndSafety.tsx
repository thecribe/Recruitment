"use client";

import FormProvider from "@/app/Context/FormContext";
import { HealthAndSafetySchema } from "@/utils/ZodSchema";
import React, { useContext } from "react";

import FormWrapper from "../Forms/FormWrapper";

import AuditButton from "../AuditButton";
import { FormProfileContext } from "../Screening/FormDisplay";
import dayjs from "dayjs";
import { formAccessRole } from "@/utils/data";

const HealthAndSafetyData = [
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

const HealthAndSafety = () => {
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
        Each agency worker has a responsibility at the start of their first
        shift to become familiar with the Client&apos;s general policies
        including, without limitation, those relating to Crash Call Procedures,
        the Hot Spot Mechanism for alerting security staff that an individual is
        in trouble, Fire Policy, and the Violent Episode Policy.
      </p>

      <FormProvider
        typeSchema={HealthAndSafetySchema}
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
          data={HealthAndSafetyData}
          auditCheck={initialData?.audit_status || false}
          className={"flex flex-col gap-5 md:w-2/3"}
        />
      </FormProvider>
    </div>
  );
};

export default HealthAndSafety;
