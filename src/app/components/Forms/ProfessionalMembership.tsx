"use client";
import FormProvider from "@/app/Context/FormContext";
import { useContext } from "react";
import FormWrapper from "./FormWrapper";

import { ProfessionalMembershipSchema } from "@/utils/ZodSchema";

import FormTitle from "./FormTitle";
import AuditButton from "../AuditButton";
import { FormProfileContext } from "../Screening/FormDisplay";
import dayjs from "dayjs";
import { formAccessRole } from "@/utils/data";

const ProfessionalMembership = () => {
  const { initialData, auditStatusHandle, formInputHandle, user, defaultdata } =
    useContext(FormProfileContext);
  const ProfessionalMembershipFormData = [
    {
      type: "text",
      label: "Professional Body/Type",
      accessor: "body_type",
    },
    {
      type: "text",
      label: "PIN (if applicable)",
      accessor: "pin",
    },
    {
      type: "text",
      label: "Renewal Date (if applicable)",
      accessor: "renewal_date",
    },
    {
      type: "text",
      label: "Current DBS Disclosure (Formally known as CRB)",
      accessor: "dbs_disclosure",
    },
    {
      type: "date",
      label: "Issue Date",
      accessor: "issue_date",
    },
    {
      type: "text",
      label: "Clear",
      accessor: "clear",
    },
    {
      type: "text",
      label: "Disclosure Number",
      accessor: "disclosure_number",
    },
    {
      type: "radio",
      label: "Is this certificate registered with the updated service?",
      accessor: "certificate_registration",
      options: ["Yes", "No"],
    },
    {
      type: "file",
      label: "Upload your membership card",
      accessor: "membership_card_upload",
    },
    {
      type: "file",
      label: "Upload your Current DBS Disclosure",
      accessor: "current_dbs_upload",
    },
    {
      type: "file",
      label: "DBS Update Check",
      accessor: "dbs_update_check",
    },
    {
      type: "date",
      label: "Expiry Date",
      accessor: "expiry_date",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center">
        <FormTitle label="Professional Membership" />
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
        typeSchema={ProfessionalMembershipSchema}
        controlFunction={(data: any, deleteType?: "file_delete") =>
          formInputHandle(data, deleteType)
        }
        defaultInput={{
          ...initialData,
          expiry_date: dayjs(initialData?.expiry_date).format("YYYY-MM-DD"),
          renewal_date: dayjs(initialData?.renewal_date).format("YYYY-MM-DD"),
          issue_date: dayjs(initialData?.issue_date).format("YYYY-MM-DD"),
        }}
      >
        <FormWrapper
          data={ProfessionalMembershipFormData}
          auditCheck={initialData?.audit_status}
          className={"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5"}
        />
      </FormProvider>
    </>
  );
};

export default ProfessionalMembership;
