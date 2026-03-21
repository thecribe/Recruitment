"use client";
import { EmergencySchema } from "@/utils/ZodSchema";
import React, { useContext } from "react";
import FormProvider from "@/app/Context/FormContext";
import FormWrapper from "./FormWrapper";
import FormTitle from "./FormTitle";
import AuditButton from "../AuditButton";
import { FormProfileContext } from "../Screening/FormDisplay";
import { formAccessRole } from "@/utils/data";

const EmergencyContact = () => {
  const { initialData, auditStatusHandle, formInputHandle, user, defaultdata } =
    useContext(FormProfileContext);
  const EmergencyFormData = [
    {
      type: "text",
      label: "Name of Next of Kin",
      accessor: "next_of_kin",
    },
    {
      type: "text",
      label: "Relationship",
      accessor: "relationship",
    },
    {
      type: "text",
      label: "Address Line 1",
      accessor: "address",
    },
    {
      type: "text",
      label: "City",
      accessor: "city",
    },
    {
      type: "text",
      label: "State/Region/Province",
      accessor: "state",
    },
    {
      type: "text",
      label: "Postal/Zip Code",
      accessor: "postal_code",
    },

    {
      type: "select",
      label: "Country",
      accessor: "country",
      options: defaultdata.countries,
    },
    {
      type: "text",
      label: "Mobile Number",
      accessor: "mobile_no",
    },

    {
      type: "email",
      label: "Email",
      accessor: "email",
    },
  ];

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <FormTitle label="Emergency Contact" />
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
        typeSchema={EmergencySchema}
        controlFunction={(data: any, deleteType?: "file_delete") =>
          formInputHandle(data, deleteType)
        }
        defaultInput={{ ...initialData }}
      >
        <FormWrapper
          data={EmergencyFormData}
          auditCheck={initialData?.audit_status}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5"
        />
      </FormProvider>
    </div>
  );
};

export default EmergencyContact;
