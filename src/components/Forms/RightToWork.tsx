"use client";
import { RightToWorkSchema } from "@/utils/ZodSchema";
import { useContext } from "react";

import FormWrapper from "./FormWrapper";
import FormProvider from "@/Context/FormContext";

import AuditButton from "../AuditButton";
import FormTitle from "./FormTitle";

import { FormProfileContext } from "../Screening/FormDisplay";
import dayjs from "dayjs";
import { formAccessRole } from "@/utils/data";

const RightToWork = () => {
  const { initialData, auditStatusHandle, formInputHandle, user, defaultdata } =
    useContext(FormProfileContext);
  const RightToWorkformData = [
    {
      type: "select",
      label: "Your entitlement for working in the UK is based upon what status",
      accessor: "entitlement",
      options: defaultdata.visa_type,
    },
    {
      type: "text",
      label: "Passport/VISA/BRP Number",
      accessor: "passport_number",
    },
    {
      type: "date",
      label: "Passport/VISA/BRP/RTW Expiry Date",
      accessor: "expiry_date",
    },
    {
      type: "text",
      label: "Share Code",
      accessor: "share_code",
    },
    {
      type: "file",
      label: "Upload International passport Copy",
      accessor: "passport_proof",
    },
    {
      type: "file",
      label: "Upload International passport Copy",
      accessor: "brp_proof",
    },
    {
      type: "file",
      label: "Upload International passport Copy",
      accessor: "right_to_work_update_check",
    },
  ];

  return (
    <div className="flex flex-col gap-5 py-3">
      <div className="flex justify-between items-center">
        <FormTitle label="Right To Work" />
        {formAccessRole.includes(user.role.slug) && (
          <AuditButton
            buttonState={initialData?.audit_status}
            onClickFunction={() =>
              auditStatusHandle({ audit_status: initialData?.audit_status })
            }
          />
        )}
      </div>
      <p className="text-sm text-gray-500">
        Please complete this form, regardless of your nationality, as it is a
        legal requirement. If you are an overseas national or require a work
        permit to work in the UK, please include copies of supporting
        documentation
      </p>
      <FormProvider
        typeSchema={RightToWorkSchema}
        controlFunction={(data: any, deleteType?: "file_delete") =>
          formInputHandle(data, deleteType)
        }
        defaultInput={{
          ...initialData,
          expiry_date: dayjs(initialData?.expiry_date).format("YYYY-MM-DD"),
        }}
      >
        <FormWrapper
          data={RightToWorkformData}
          auditCheck={initialData?.audit_status}
          className={"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5"}
        />
      </FormProvider>
    </div>
  );
};

export default RightToWork;
