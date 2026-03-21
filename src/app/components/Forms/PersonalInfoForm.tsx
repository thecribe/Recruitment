"use client";
import { useContext } from "react";
import { PersonalInfoSchema } from "@/utils/ZodSchema";
import FormProvider from "@/app/Context/FormContext";
import FormWrapper from "./FormWrapper";
import AuditButton from "../AuditButton";
import FormTitle from "./FormTitle";
import { FormProfileContext } from "../Screening/FormDisplay";
import dayjs from "dayjs";
import { formAccessRole } from "@/utils/data";

const PersonalInfoForm = () => {
  const { initialData, auditStatusHandle, formInputHandle, defaultdata, user } =
    useContext(FormProfileContext);

  const PersonalInfoFormData = [
    {
      type: "select",
      label: "Title",
      accessor: "title",
      options: ["Mr.", "Ms.", "Mrs."],
    },
    {
      type: "text",
      label: "First Name",
      accessor: "firstName",
    },
    {
      type: "text",
      label: "Last Name",
      accessor: "lastName",
    },
    {
      type: "select",
      label: "Gender",
      accessor: "gender",
      options: ["Male", "Female", "Non-binary", "Transgender", "Others"],
    },
    {
      type: "text",
      label: "Employee ID",
      accessor: "employee_id",
    },
    {
      type: "select",
      label: "Nationality",
      accessor: "country",
      options: defaultdata.countries,
    },
    {
      type: "date",
      label: "Birthday",
      accessor: "birthday",
    },
    {
      type: "select",
      label: "Visa Type",
      accessor: "visa_type",
      options: defaultdata.visa_type,
    },
    {
      type: "select",
      label: "Job Type",
      accessor: "job_type",
      options: defaultdata.job_type,
    },
  ];

  
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <FormTitle label="Personal Infomation" />
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
        typeSchema={PersonalInfoSchema}
        controlFunction={(data: any) => formInputHandle(data)}
        defaultInput={
          initialData && {
            ...initialData,
            birthday: dayjs(initialData.birthday).format("YYYY-MM-DD"),
          }
        }
      >
        <FormWrapper
          auditCheck={initialData?.audit_status}
          data={PersonalInfoFormData}
          className={"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5"}
        />
      </FormProvider>
    </div>
  );
};

export default PersonalInfoForm;
