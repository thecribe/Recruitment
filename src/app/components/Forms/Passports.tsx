"use client";
import { PassportSchema } from "@/utils/ZodSchema";
import { useContext } from "react";

import FormProvider from "@/app/Context/FormContext";
import FormWrapper from "./FormWrapper";
import FormTitle from "./FormTitle";
import AuditButton from "../AuditButton";
import { FormProfileContext } from "../Screening/FormDisplay";
import { formAccessRole } from "@/utils/data";

const Passports = () => {
  const { initialData, auditStatusHandle, formInputHandle, user } =
    useContext(FormProfileContext);
  const PassportFormData = [
    {
      type: "file",
      label: "Upload 2x Passport Size Photos",
      accessor: "passport",
    },
    {
      type: "file",
      label: "Upload Proof of National Insurance Number",
      accessor: "proof_of_insurance",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center">
        <FormTitle label="Passport & NI Number" />
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
        typeSchema={PassportSchema}
        controlFunction={(data: any, deleteType?: "file_delete") =>
          formInputHandle(data, deleteType)
        }
        defaultInput={{ ...initialData }}
      >
        <FormWrapper
          data={PassportFormData}
          auditCheck={initialData?.audit_status}
          className={"flex flex-col gap-5"}
        />
      </FormProvider>
    </>
  );
};

export default Passports;
