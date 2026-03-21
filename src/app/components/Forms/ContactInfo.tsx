"use client";
import { ContactSchema } from "@/utils/ZodSchema";

import { useContext } from "react";

import FormWrapper from "./FormWrapper";
import FormProvider from "@/app/Context/FormContext";
import FormTitle from "./FormTitle";
import AuditButton from "../AuditButton";
import { FormProfileContext } from "../Screening/FormDisplay";
import { formAccessRole } from "@/utils/data";

const ContactInfo = () => {
  const { initialData, auditStatusHandle, formInputHandle, defaultdata, user } =
    useContext(FormProfileContext);
  const ContactInfoFormData = [
    {
      type: "text",
      label: "Mobile Number",
      accessor: "mobile_no",
    },
    {
      type: "text",
      label: "Land Line",
      accessor: "landline",
    },
    {
      type: "email",
      label: "Email",
      accessor: "email",
    },
  ];

  return (
    <div className="w-full  flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <FormTitle label="Contact Information" />
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
        typeSchema={ContactSchema}
        controlFunction={(data: any, deleteType?: "file_delete") =>
          formInputHandle(data, deleteType)
        }
        defaultInput={initialData}
      >
        <FormWrapper
          auditCheck={initialData?.audit_status}
          data={ContactInfoFormData}
          className="flex flex-col gap-5 lg:w-1/3"
        />
      </FormProvider>
    </div>
  );
};

export default ContactInfo;
