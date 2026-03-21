"use client";
import { useContext } from "react";
import { FiDelete } from "react-icons/fi";
import EducationModal from "../Modals/EducationModal";
import FormTitle from "./FormTitle";
import AuditButton from "../AuditButton";
import { FormProfileContext } from "../Screening/FormDisplay";
import dayjs from "dayjs";
import { formAccessRole } from "@/utils/data";

const Education = () => {
  const { initialData, auditStatusHandle, deleteArrayEntry, user } =
    useContext(FormProfileContext);

  return (
    initialData && (
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <FormTitle label="Educational Qualification" />
          {formAccessRole.includes(user.role.slug) &&
            initialData.length > 0 && (
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
        <EducationModal buttonLabel="Add Qualification" />

        <div className="flex flex-col gap-5">
          {initialData.length > 0 &&
            [...initialData].map((entry, index) => (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 divide-y-2 divide-gray-300 bg-blue-500/10 rounded-md p-5 text-xs"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Establishment</h3>
                  <p className="text-gray-500">{entry.establishment}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">From</h3>
                  <p className="text-gray-500">
                    {dayjs(entry.from_date).format("YYYY-MM-DD")}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">To</h3>
                  <p className="text-gray-500">
                    {dayjs(entry.to_date).format("YYYY-MM-DD")}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Qualification</h3>
                  <p className="text-gray-500">{entry.qualification}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Grade</h3>
                  <p className="text-gray-500">{entry.grade}</p>
                </div>
                {!entry.audit_status && (
                  <div className="flex gap-5 items-center">
                    <EducationModal
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

export default Education;
