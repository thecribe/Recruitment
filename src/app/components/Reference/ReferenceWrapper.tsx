"use client";
import React, { useContext, useEffect, useState } from "react";
import ReferenceModal from "../Modals/ReferenceModal";
import { FiDelete } from "react-icons/fi";
import { ReferenceSchema } from "@/utils/ZodSchema";
import z from "zod";
import FormTitle from "../Forms/FormTitle";
import AuditButton from "../AuditButton";
import { AuthContext } from "@/app/Context/AuthContext";
import Notification from "../Notification";
import { instance } from "@/utils/axiosConfig";
import { formAccessRole } from "@/utils/data";

const ReferenceWrapper = ({
  data,
  userId,
}: {
  userId: any;
  data?: z.infer<typeof ReferenceSchema>;
}) => {
  const { user, defaultdata } = useContext(AuthContext);
  const [editIndex, setIndex] = useState<number | null>(null);
  const [initialData, setInitialData] = useState<any | null>(null);

  const [loadingState, setLoadingState] = useState(true);
  const [reloader, setReloader] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(
          `/reference/${userId ? userId : user.id}`,
        );

        setInitialData(response.data.data);
        setLoadingState(false);
      } catch (error: any) {
        alert("Error loading data, please referesh page");
        setLoadingState(false);
      }
    };

    setLoadingState(true);
    fetchData();
  }, [reloader]);

  const formInputHandle = async (data: any, formType?: string) => {
    try {
      if (!initialData[0]?.audit_status) {
        setLoadingState(true);
        let response;
        if (!formType) {
          response = await instance.post(
            `/reference/${userId ? userId : user.id}`,
            data,
          );
        } else {
          console.log(data);
          response = await instance.put(
            `/reference/${userId ? userId : user.id}`,
            data,
          );
        }
        setLoadingState(false);
        setReloader((prev) => !prev);
        setNotification({
          message: response.data.message,
          type: "success",
        });
      } else {
        setNotification({
          message: "Audited form. Unable to make changes",
          type: "error",
        });
      }
      return true;
    } catch (error: any) {
      setLoadingState(false);
      setNotification({
        message: error.message,
        type: "error",
      });
      return false;
    }
  };

  const auditStatusHandle = async (body: {}) => {
    setLoadingState(true);
    try {
      const response = await instance.patch(
        `/reference/${userId ? userId : user.id}`,
        body,
      );
      setLoadingState(false);
      setReloader((prev) => !prev);
      setNotification({
        message: response.data.message,
        type: "success",
      });
      // }
    } catch (error) {
      setLoadingState(false);
      setNotification({
        message: "Error updating audit status",
        type: "error",
      });
    }
  };

  const deleteArrayEntry = async (referenceId: any) => {
    setLoadingState(true);
    try {
      const response = await instance.delete(`/reference/${referenceId}`);
      setLoadingState(false);
      setReloader((prev) => !prev);
      setNotification({
        message: response.data.message,
        type: "success",
      });
      // }
    } catch (error: any) {
      setLoadingState(false);
      setNotification({
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    initialData && (
      <div className="flex flex-col gap-5">
        {notification && (
          <Notification
            message={notification?.message}
            type={notification?.type}
            onClose={() => setNotification(null)}
          />
        )}
        <div className="flex justify-between items-center">
          <FormTitle label="Reference" />
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

        <p className="text-sm text-gray-500">
          All reference should be an employment reference
        </p>
        <ReferenceModal
          buttonLabel="Add Referee"
          controlFunction={formInputHandle}
        />

        <div className="flex flex-col gap-5">
          {initialData.map((entry: any, index: number) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 divide-y-2 divide-gray-300 bg-blue-500/10 rounded-md p-5 text-xs"
            >
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Institute/Company Name</h3>
                <p className="text-gray-500">{entry.company_name}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Worked From</h3>
                <p className="text-gray-500">{entry.from_date}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Worked To</h3>
                <p className="text-gray-500">{entry.to_date}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Referee's Name</h3>
                <p className="text-gray-500">{entry.referee_name}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Referee's Email</h3>
                <p className="text-gray-500">{entry.referee_email}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Referee's Email</h3>
                <p className="text-gray-500">{entry.referee_phone}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Referee's Relationship</h3>
                <p className="text-gray-500">{entry.referee_relationship}</p>
              </div>

              {!entry.audit_status && (
                <div
                  className="flex gap-5 items-center"
                  onClick={() => setIndex(index)}
                >
                  <ReferenceModal
                    type="edit"
                    dataInput={initialData[index]}
                    controlFunction={formInputHandle}
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

export default ReferenceWrapper;
