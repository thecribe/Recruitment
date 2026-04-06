"use client";
import FormProvider from "@/Context/FormContext";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import FormWrapper from "../Forms/FormWrapper";
import { ReferenceSchema } from "@/utils/ZodSchema";

const ReferenceData = [
  {
    type: "text",
    label: "Institute/Company Name",
    accessor: "company_name",
  },
  {
    type: "date",
    label: "Worked From",
    accessor: "from_date",
  },
  {
    type: "date",
    label: "Worked To",
    accessor: "to_date",
  },
  {
    type: "text",
    label: "Referee's Name",
    accessor: "referee_name",
  },
  {
    type: "email",
    label: "Referee's Email",
    accessor: "referee_email",
  },
  {
    type: "text",
    label: "Referee's Phone",
    accessor: "referee_phone",
  },
  {
    type: "text",
    label: "Referee's Relationship",
    accessor: "referee_relationship",
  },
];

const ReferenceModal = ({
  buttonLabel,
  controlFunction,
  type,
  dataInput,
}: {
  buttonLabel?: string;
  controlFunction: any;
  type?: string;
  dataInput?: any;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const formInputHandler = async (data: any) => {
    const response: true | false = await controlFunction(
      { ...data, id: dataInput ? dataInput.id : null },
      type,
    );
    if (response) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {type ? (
        <div
          className="p-2 w-7 h-7  bg-blue-400 rounded-md flex items-center justify-center cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <BiEdit className="text-xl text-white" />
        </div>
      ) : (
        <button
          className="text-sm w-fit bg-green-500/50 px-10 py-3.5 rounded-2xl cursor-pointer hover:bg-green-500/70 hover:scale-102 shadow-xs hover:shadow-black/30 active:shadow-black/10 active:scale-95 transition-all duration-300"
          onClick={() => setIsOpen(true)}
        >
          {buttonLabel}
        </button>
      )}
      {isOpen && (
        <div className="fixed left-0 top-0 w-screen h-screen bg-black/50 flex justify-center items-center">
          <div className="bg-white rounded-md shadow-md p-5 w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] flex flex-col gap-5">
            <div className=" flex justify-between items-center w-full cursor-pointer border-b-2 border-gray-400 pb-2">
              <p className="text-2xl font-semibold text-gray-900 ">
                {type ? "Edit Entries" : buttonLabel}
              </p>
              <MdClose className="text-4xl" onClick={() => setIsOpen(false)} />
            </div>

            <FormProvider
              typeSchema={ReferenceSchema}
              controlFunction={formInputHandler}
              defaultInput={dataInput}
            >
              <FormWrapper
                data={ReferenceData}
                className="grid grid-cols-1 lg:grid-cols-2 gap-5"
              />
            </FormProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default ReferenceModal;
