"use client";
import { PreviousJobSchema } from "@/utils/ZodSchema";

import React, { useContext, useState } from "react";

import PreviousJobModal from "../Modals/PreviousJobModal";
import { FiDelete } from "react-icons/fi";
import AuditButton from "../AuditButton";
import FormTitle from "./FormTitle";
import { FormProfileContext } from "../Screening/FormDisplay";
import { formAccessRole } from "@/utils/data";

const PreviousJob = () => {
  const { initialData, auditStatusHandle, deleteArrayEntry, user } =
    useContext(FormProfileContext);

  return (
    initialData && (
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <FormTitle label="Previous Job Information" />
          {formAccessRole.includes(user.role.slug) &&
            initialData?.length > 0 && (
              <AuditButton
                buttonState={initialData[0].audit_status}
                onClickFunction={() =>
                  auditStatusHandle({
                    audit_status: initialData[0].audit_status,
                  })
                }
              />
            )}
        </div>
        <PreviousJobModal buttonLabel="Add Previous Work History" />
        <div className="flex flex-col gap-5">
          {initialData.length > 0 &&
            [...initialData].map((entry: any, index: number) => (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 divide-y-2 divide-gray-300 bg-blue-500/10 rounded-md p-5 text-xs"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">From</h3>
                  <p className="text-gray-500">{entry.from_date}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">To</h3>
                  <p className="text-gray-500">{entry.to_date}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Name of Employer</h3>
                  <p className="text-gray-500">{entry.name_of_employer}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Job Title</h3>
                  <p className="text-gray-500">{entry.job_title}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-500">{entry.address}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Reason for Leaving</h3>
                  <p className="text-gray-500">{entry.reason_for_leaving}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Main Responsibilites</h3>
                  <p className="text-gray-500">{entry.duties}</p>
                </div>
                {!entry.audit_status && (
                  <div className="flex gap-5 items-center">
                    <PreviousJobModal
                      type="edit"
                      dataInput={{
                        id: entry.id,
                        audit_status: entry.audit_status,
                        ...initialData[index],
                      }}
                    />
                    <div
                      className="p-2 w-7 h-7 bg-red-400 rounded-md flex items-center justify-center cursor-pointer"
                      onClick={() => deleteArrayEntry(entry.id)}
                    >
                      <FiDelete className="text-xl text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    )
  );
};

export default PreviousJob;
