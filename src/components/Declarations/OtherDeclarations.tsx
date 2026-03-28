"use client";
import FormProvider from "@/Context/FormContext";

import { OtherDeclarationsSchema } from "@/utils/ZodSchema";
import React, { useContext } from "react";
import FormWrapper from "../Forms/FormWrapper";
import AuditButton from "../AuditButton";
import { FormProfileContext } from "../Screening/FormDisplay";
import dayjs from "dayjs";
import { formAccessRole } from "@/utils/data";

const OtherDeclarations = () => {
  const { initialData, auditStatusHandle, formInputHandle, user } =
    useContext(FormProfileContext);
  const OtherDeclarationsData = [
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
        In addition, I also consent to work more than the maximum number of
        hours permitted to work at night under the directive. Please note you
        are under no obligation to sign either declaration.
      </p>

      <FormProvider
        typeSchema={OtherDeclarationsSchema}
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
          data={OtherDeclarationsData}
          auditCheck={initialData?.audit_status || false}
          className={"flex flex-col gap-5 md:w-2/3"}
        />
      </FormProvider>
    </div>
  );
};

export default OtherDeclarations;
