"use client";

import FormProvider from "@/Context/FormContext";
import React, { useContext } from "react";

import FormWrapper from "../Forms/FormWrapper";
import { RehabilitationSchema } from "@/utils/ZodSchema";
import AuditButton from "../AuditButton";
import { FormProfileContext } from "../Screening/FormDisplay";
import { formAccessRole } from "@/utils/data";

const Rehabilitation = () => {
  const { initialData, auditStatusHandle, formInputHandle, user } =
    useContext(FormProfileContext);

  const RehabilitationData = [
    {
      type: "radio",
      label: "Do you have any convictions, cautions or bindovers?",
      accessor: "conviction",
      options: ["Yes", "No"],
    },
    {
      type: "radio",
      label: "Have you ever had disciplinary action taken against you?",
      accessor: "disciplinary_action",
      options: ["Yes", "No"],
    },
    {
      type: "radio",
      label:
        "Are you at present the subject of criminal charges or disciplinary action?",
      accessor: "criminal_charges",
      options: ["Yes", "No"],
    },
    {
      type: "radio",
      label:
        "Do you consent to Arise Nursing requesting a police check and any appropriate references on your behalf?",
      accessor: "consent",
      options: ["Yes", "No"],
    },
    {
      type: "radio",
      label: "Have you been police checked in the last three years?",
      accessor: "police_check",
      options: ["Yes", "No"],
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
        Because of the nature of the work for which you are applying, Section
        4(2), and further Orders made by the Secretary of State under the
        provision of this section of the Rehabilitation of Offenders Act (1974)
        (Exceptions) Order 1975 apply. Applicants are therefore required to give
        information about convictions which for other purposes are “spent” under
        the provisions of the Act. Any information given will be completely
        confidential and will be considered only in relation for positions to
        which the order applies.
      </p>

      <FormProvider
        typeSchema={RehabilitationSchema}
        controlFunction={(data: any, deleteType?: "file_delete") =>
          formInputHandle(data, deleteType)
        }
        defaultInput={{
          ...initialData,
        }}
      >
        <FormWrapper
          data={RehabilitationData}
          auditCheck={initialData?.audit_status || false}
          className={"flex flex-col gap-5 md:w-2/3"}
        />
      </FormProvider>
    </div>
  );
};

export default Rehabilitation;
