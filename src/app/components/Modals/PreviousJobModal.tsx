"use client";
import { PreviousJobSchema } from "@/utils/ZodSchema";
import React, { useContext, useState } from "react";

import { BiEdit, BiUpload } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import FormProvider from "@/app/Context/FormContext";
import FormWrapper from "../Forms/FormWrapper";
import { FormProfileContext } from "../Screening/FormDisplay";

const PreviousJobModal = ({
  buttonLabel,
  type,
  dataInput,
}: {
  buttonLabel?: string;
  type?: string;
  dataInput?: any;
}) => {
  const { formInputHandle } = useContext(FormProfileContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const PreviousJobFormData = [
    {
      type: "date",
      label: "From Date",
      accessor: "from_date",
    },
    {
      type: "date",
      label: "To Date",
      accessor: "to_date",
    },
    {
      type: "text",
      label: "Name of Employer",
      accessor: "name_of_employer",
    },
    {
      type: "text",
      label: "Job Title",
      accessor: "job_title",
    },
    {
      type: "text",
      label: "Address",
      accessor: "address",
    },
    {
      type: "text",
      label: "Reason for Leaving",
      accessor: "reason_for_leaving",
    },
    {
      type: "textarea",
      label: "Main Responsibilities",
      accessor: "duties",
      options: { row: 4, col: 10 },
    },
  ];

  return (
    <>
      {type ? (
        <div
          className="p-2 w-7 h-7  bg-blue-400 rounded-md flex items-center justify-center cursor-pointer "
          onClick={() => setIsOpen(true)}
        >
          <BiEdit className="text-xl text-white" />
        </div>
      ) : (
        <button
          className="text-xs w-fit bg-green-500/50 px-3 py-2 rounded-md cursor-pointer hover:bg-green-500/70 hover:scale-105 shadow-sm hover:shadow-black/30 active:shadow-black/10 active:scale-95 transition-all duration-300 "
          onClick={() => setIsOpen(true)}
        >
          {buttonLabel}
        </button>
      )}
      {isOpen && (
        <div className="fixed left-0 top-0 w-screen h-screen bg-black/50 flex justify-center items-center">
          <div className="bg-white rounded-md shadow-md p-5 w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] flex flex-col gap-5">
            <div className=" flex justify-between items-center w-full cursor-pointer border-b-2 border-gray-400 pb-2">
              <p className="font-semibold text-lg">
                {type ? "Edit Entries" : buttonLabel}
              </p>
              <MdClose className="text-4xl" onClick={() => setIsOpen(false)} />
            </div>
            <FormProvider
              typeSchema={PreviousJobSchema}
              controlFunction={(data: any, deleteType?: "file_delete") =>
                formInputHandle(
                  {
                    id: dataInput?.id,
                    ...data,
                  },
                  deleteType,
                  "arrayForm",
                  { ...dataInput }
                )
              }
              defaultInput={dataInput}
            >
              <FormWrapper
                data={PreviousJobFormData}
                auditCheck={dataInput?.audit_status}
                className="grid grid-cols-1 lg:grid-cols-2 gap-5"
              />
            </FormProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default PreviousJobModal;
