"use client";
import FormProvider from "@/Context/FormContext";
import React, { useContext } from "react";
import FormWrapper from "./FormWrapper";
import { ImmunisationSchema } from "@/utils/ZodSchema";
import AuditButton from "../AuditButton";
import { FormProfileContext } from "../Screening/FormDisplay";
import dayjs from "dayjs";
import { formAccessRole } from "@/utils/data";
const Immunisation = () => {
  const { initialData, auditStatusHandle, formInputHandle, user, defaultdata } =
    useContext(FormProfileContext);

  const ImmunisationFormData = [
    {
      type: "conditional",
      label: "Hep B",
      accessor: "hep_b",
      options: ["Yes", "No"],
      emptyForm: ["No"],
      subform: [
        {
          optionType: ["Yes"],
          type: "file",
          label: " Upload Hep B Certificate",
          accessor: "hep_b_certificate",
        },
      ],
    },
    {
      type: "conditional",
      label: "TB",
      accessor: "tb",
      options: ["Yes", "No"],

      subform: [
        {
          type: "file",
          optionType: ["Yes"],
          label: ` Evidence of BCG (-) OR completed TB form, or confirmation on Letter Head paper, including your details and the GMC NMC number of the practitioner confirming the scar`,
          accessor: "tb_certificate",
        },
      ],
    },
    {
      type: "conditional",
      label: "Varicella",
      accessor: "varicella",
      options: ["Yes", "No"],

      subform: [
        {
          type: "file",
          optionType: ["Yes"],
          label: ` Upload Varicella Certificate`,
          accessor: "varicella_certificate",
        },
      ],
    },
    {
      type: "conditional",
      label: "Measles",
      accessor: "measles",
      options: ["Yes", "No"],
      subform: [
        {
          type: "file",
          optionType: ["Yes"],
          label: ` Upload Measles Certificate`,
          accessor: "measles_certificate",
        },
      ],
    },
    {
      type: "conditional",
      label: "Rubella",
      accessor: "rubella",
      options: ["Yes", "No"],
      subform: [
        {
          type: "file",
          optionType: ["Yes"],
          label: ` Upload Rubella Certificate`,
          accessor: "rubella_certificate",
        },
      ],
    },
    {
      type: "conditional",
      label: "Hep B Antigen",
      accessor: "hep_b_antigen",
      options: ["No Proof", "Negative", "Positive"],
      subform: [
        {
          type: "file",
          optionType: ["Negative", "Positive"],
          label: ` Upload Hep B Surface Antigen Certificate`,
          accessor: "hep_b_antigen_certificate",
        },
      ],
    },
    {
      type: "conditional",
      label: "Hep C",
      accessor: "hep_c",
      options: ["No Proof", "Negative", "Positive"],
      subform: [
        {
          type: "file",
          optionType: ["Negative", "Positive"],
          label: ` Upload Hep C Certificate`,
          accessor: "hep_c_certificate",
        },
      ],
    },
    {
      type: "conditional",
      label: "HIV",
      accessor: "hiv",
      options: ["No Proof", "Negative", "Positive"],
      subform: [
        {
          type: "file",
          optionType: ["Negative", "Positive"],
          label: ` Upload HIV Test  Certificate`,
          accessor: "hiv_certificate",
        },
      ],
    },

    {
      type: "file",
      label:
        "Signature (Please upload your signature say you have read and understood the above)",
      accessor: "signature",
    },
    {
      type: "date",
      label: "Date",
      accessor: "date",
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
        typeSchema={ImmunisationSchema}
        controlFunction={(data: any, deleteType?: "file_delete") => {
          formInputHandle(data, deleteType);
        }}
        defaultInput={{
          ...initialData,
          date: initialData?.date
            ? dayjs(initialData?.date).format("YYYY-MM-DD")
            : "",
        }}
      >
        <FormWrapper
          data={ImmunisationFormData}
          auditCheck={initialData?.audit_status}
          className={"flex flex-col w-2/3 gap-5"}
        />
      </FormProvider>
    </>
  );
};

export default Immunisation;
