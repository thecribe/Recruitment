"use client";
import FormProvider from "@/Context/FormContext";
import { BankDetailsSchema } from "@/utils/ZodSchema";
import { useContext } from "react";
import FormWrapper from "./FormWrapper";
import FormTitle from "./FormTitle";
import AuditButton from "../AuditButton";
import { FormProfileContext } from "../Screening/FormDisplay";
import { formAccessRole } from "@/utils/data";

const BankDetails = () => {
  const { initialData, auditStatusHandle, formInputHandle, user, defaultdata } =
    useContext(FormProfileContext);
  const BankDetailsFormData = [
    {
      type: "text",
      label: "Name of Bank/Building Society",
      accessor: "name_of_bank",
    },
    {
      type: "text",
      label: "Account Name",
      accessor: "account_name",
    },

    {
      type: "radio",
      label: "Account Type",
      accessor: "account_type",
      options: ["Personal", "LTD"],
    },

    {
      type: "text",
      label: "Address Line 1",
      accessor: "address",
    },
    {
      type: "text",
      label: "Postal/Zip Code",
      accessor: "postal_code",
    },

    {
      type: "text",
      label: "Account No",
      accessor: "account_no",
    },
    {
      type: "text",
      label: "Sort Code",
      accessor: "sort_code",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center">
        <FormTitle label="Bank Details" />
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
        typeSchema={BankDetailsSchema}
        controlFunction={(data: any, deleteType?: "file_delete") =>
          formInputHandle(data, deleteType)
        }
        defaultInput={{
          ...initialData,
        }}
      >
        <FormWrapper
          data={BankDetailsFormData}
          auditCheck={initialData?.audit_status}
          className={"flex flex-col gap-5"}
        />
      </FormProvider>
    </>
  );
};

export default BankDetails;
