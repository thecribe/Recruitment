"use client";
import FormProvider from "@/Context/FormContext";
import { DrivingDetailsSchema } from "@/utils/ZodSchema";
import { useContext } from "react";
import FormWrapper from "./FormWrapper";

import AuditButton from "../AuditButton";
import { FormProfileContext } from "../Screening/FormDisplay";
import { formAccessRole } from "@/utils/data";

const DrivingDetails = () => {
  const { initialData, auditStatusHandle, formInputHandle, user, defaultdata } =
    useContext(FormProfileContext);
  const DrivingDetailsFormData = [
    {
      type: "radio",
      label: "Do you hold a valid UK driver &apos; licence?",
      accessor: "driver_license",
      options: ["Yes", "No"],
    },
    {
      type: "radio",
      label: "Do you have use of a car?",
      accessor: "posess_car",
      options: ["Yes", "No"],
    },
    {
      type: "file",
      label: "Upload front side of Driving Licence",
      accessor: "front_side_license",
    },
    {
      type: "file",
      label: "Upload back side of Driving Licence",
      accessor: "back_side_license",
    },
  ];

  return (
    <>
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
      <FormProvider
        typeSchema={DrivingDetailsSchema}
        controlFunction={(data: any, deleteType?: "file_delete") =>
          formInputHandle(data, deleteType)
        }
        defaultInput={{
          ...initialData,
        }}
      >
        <FormWrapper
          data={DrivingDetailsFormData}
          auditCheck={initialData?.audit_status}
          className={"flex flex-col gap-5"}
        />
      </FormProvider>
    </>
  );
};

export default DrivingDetails;
