"use client";

import { AuthContext } from "@/Context/AuthContext";
import { formToFormData } from "@/utils/extrafucntions";

import { useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import Notification from "../Notification";
import LoadingState from "../LoadingState";
import { instance } from "@/utils/axiosConfig";

export const FormProfileContext = createContext<any | undefined>(undefined);
const FormDisplay = ({
  formNav,
  id,
}: {
  id: any;
  formNav: {
    title: string;
    slug: string;
    menu: { title: string; component: React.ReactNode; query: string }[];
  }[];
}) => {
  const searchParams = useSearchParams();
  const query: any = searchParams.get("query");
  const [initialData, setInitialData] = useState<any | null>(null);
  const { user, defaultdata } = useContext(AuthContext);
  const [loadingState, setLoadingState] = useState(true);
  const [reloader, setReloader] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await getFormDetails(id ? id : user.id, query);
        const response = await instance.get(
          `/screening/${id ? id : user.id}/${query}`,
        );
        setInitialData(response.data.data);
        setLoadingState(false);
      } catch (error: any) {
        console.log(error);
        setLoadingState(false);
      }
    };

    setLoadingState(true);
    if (query) {
      fetchData();
    }
  }, [reloader, query]);

  const formInputHandle = async (
    data: any,
    deleteType?: "file_delete",
    formType?: string,
    defaultdata?: any,
  ) => {
    try {
      if (!initialData?.audit_status) {
        setLoadingState(true);
        let response;
        if (deleteType === "file_delete") {
          const responseData = await instance.put(
            `/screening/${id ? id : user.id}/${query}`,
            data,
          );
          response = responseData.data;
        } else {
          const formData = formToFormData(data);
          const responseData = await instance.post(
            `/screening/${id ? id : user.id}/${query}`,
            formData,
          );
          response = responseData.data;
        }

        setLoadingState(false);
        setReloader((prev) => !prev);
        setNotification({
          message: response.message,
          type: "success",
        });
      } else {
        setNotification({
          message: "Audited form. Unable to make changes",
          type: "error",
        });
      }
    } catch (error) {
      setLoadingState(false);
      setNotification({
        message: "Error updating details",
        type: "error",
      });
    }
  };

  const auditStatusHandle = async (body: {}) => {
    setLoadingState(true);
    try {
      // const response = await updateAuditStatus(body, id ? id : user.id, query);
      const response = await instance.patch(
        `/screening/${id ? id : user.id}/${query}`,
        body,
      );

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
        message: error.response.data.message,
        type: "error",
      });
    }
  };

  const deleteArrayEntry = async (objectId: any) => {
    setLoadingState(true);
    try {
      // const response = await deleteEntry(objectId, id ? id : user.id, query);
      const response = await instance.delete(`/screening/${objectId}/${query}`);
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

  return (() => {
    for (const eachNav of formNav) {
      const match = eachNav.menu.find((menuItem) => menuItem.query === query);
      if (match) {
        return (
          <FormProfileContext.Provider
            value={{
              type: query,
              id,
              initialData,
              loadingState,
              auditStatusHandle,
              formInputHandle,
              defaultdata,
              user,
              deleteArrayEntry,
            }}
          >
            {notification && (
              <Notification
                message={notification?.message}
                type={notification?.type}
                onClose={() => setNotification(null)}
              />
            )}
            {loadingState ? (
              <LoadingState className="w-full flex justify-center items-center" />
            ) : (
              match.component
            )}
          </FormProfileContext.Provider>
        );
      }
    }
    return null;
  })();
};

export default FormDisplay;
