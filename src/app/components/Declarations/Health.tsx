"use client";
import FormProvider from "@/app/Context/FormContext";
import { useContext } from "react";
import FormWrapper from "../Forms/FormWrapper";

import { HealthSchema } from "@/utils/ZodSchema";
import AuditButton from "../AuditButton";
import { FormProfileContext } from "../Screening/FormDisplay";
import dayjs from "dayjs";
import { formAccessRole } from "@/utils/data";

const HealthFormData = [
  {
    type: "text",
    label: "Name",
    accessor: "name",
  },
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

const Health = () => {
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
        We would ask all OVERSEAS candidates to provide a medical statement from
        their GP or medical department confirming your state of health. Your
        details will be passed to our Occupational Health Doctors to establish
        your fitness for work. Please sign the declaration below to allow Arise
        Nursing to release your information for inspection.
      </p>
      <p className="text-sm text-black">
        I consent to Arise Nursing releasing my health and immunisation records
        for review. I understand that based on this review I may be required to
        undergo a medical examination to establish my fitness for work. I
        confirm that I will immediately inform Arise Nursing in confidence if I
        am HIV Positive, Hep B positive or if I have AIDS in accordance with the
        Department of Health guidelines.
      </p>
      <p className="text-sm text-black">
        I am aware of my obligations regarding MRSA contact and the need for
        screening. I agree to immediately inform Arise Nursing should my general
        condition of health change.
      </p>
      <p className="text-sm text-black">
        I will inform Arise Nursing immediately if I discover that I am
        pregnant. I understand that withholding information or giving false
        answers may lead to dismissal. I also hereby consent to Arise Nursing
        obtaining further information regarding my health from my GP or
        Occupational Health Department.
      </p>
      <FormProvider
        typeSchema={HealthSchema}
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
          data={HealthFormData}
          auditCheck={initialData?.audit_status || false}
          className={"flex flex-col gap-5 md:w-2/3"}
        />
      </FormProvider>
    </div>
  );
};

export default Health;
