"use client";
import FormProvider from "@/app/Context/FormContext";
import { useContext } from "react";

import FormWrapper from "../Forms/FormWrapper";
import { ConfidentialitySchema } from "@/utils/ZodSchema";

import AuditButton from "../AuditButton";
import { FormProfileContext } from "../Screening/FormDisplay";
import dayjs from "dayjs";
import { formAccessRole } from "@/utils/data";

const Confidentiality = () => {
  const { initialData, auditStatusHandle, formInputHandle, user } =
    useContext(FormProfileContext);

  const ConfidentialityFormData = [
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
        I hereby declare that at no time will I divulge to any person, nor use
        for my own or any other person&apos;s benefit, any confidential
        information in relation to Arise Nursing or in relation to any of their
        employees, business affairs, transactions, or finances which I may
        acquire during the term of my agreement with Arise Nursing under the
        Terms of Engagement.
      </p>

      <FormProvider
        typeSchema={ConfidentialitySchema}
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
          data={ConfidentialityFormData}
          auditCheck={initialData?.audit_status || false}
          className={"flex flex-col gap-5 md:w-2/3"}
        />
      </FormProvider>
    </div>
  );
};

export default Confidentiality;
