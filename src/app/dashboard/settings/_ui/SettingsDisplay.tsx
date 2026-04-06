"use client";
import FormTitle from "@/components/Forms/FormTitle";
import FormWrapper from "@/components/Forms/FormWrapper";
import LoadingState from "@/components/LoadingState";
import Notification from "@/components/Notification";
import FormProvider from "@/Context/FormContext";
import { instance } from "@/utils/axiosConfig";
import { formToFormData } from "@/utils/extrafucntions";
import { SiteInfomationSchema } from "@/utils/ZodSchema";
import React, { useEffect, useState } from "react";
import z from "zod";

const SettingsDisplay = () => {
  const [display, setDisplay] = useState(1);
  const [initialData, setInitialData] = useState(null);
  const [reloader, setReloader] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await instance.get(`/site-details`);

      setInitialData(response.data.data[0]);
    };

    getData();
  }, [reloader]);

  return (
    initialData && (
      <div className="w-full h-full flex flex-col gap-3">
        <div>
          <FormTitle label="Site Details" />
        </div>
        <div className="flex flex-1 p-5">
          <div className="w-[12%] p-4 text-gray-700 shadow-sm rounded-3xl ">
            <div className=" flex flex-col gap-2">
              {["Site Information", "Logo"].map((eachMenu, index) => (
                <p
                  key={index}
                  className="flex items-center gap-3 px-5 py-4 hover:bg-indigo-50 hover:text-indigo-700 rounded-2xl font-medium cursor-pointer"
                  onClick={() => setDisplay(index + 1)}
                >
                  {eachMenu}
                </p>
              ))}
            </div>
          </div>
          <div className="flex-1 p-5">
            {display === 1 ? (
              <SiteInformation
                siteData={initialData}
                reloader={reloader}
                setReloader={setReloader}
              />
            ) : (
              <Logo
                siteLogo={initialData}
                reloader={reloader}
                setReloader={setReloader}
              />
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default SettingsDisplay;

const SiteInformation = ({
  siteData,
  reloader,
  setReloader,
}: {
  siteData?: any;
  reloader: boolean;
  setReloader: (value: boolean) => void;
}) => {
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [loader, setLoading] = useState<boolean>(false);
  const formInputHandler = async (
    data: z.infer<typeof SiteInfomationSchema>,
  ) => {
    setLoading(true);
    try {
      // const response = await editSiteDetails(data, siteData.id);
      const response = await instance.put(`/site-details/${siteData.id}`, data);
      setLoading(false);
      setNotification({ message: response.data.message, type: "success" });
      setReloader(!reloader);
    } catch (error: any) {
      setLoading(false);
      setNotification({ message: error.response.data.message, type: "error" });
    }
  };

  return (
    <div className="">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <FormTitle label="Site Information" />
      <div className="w-1/2">
        {
          <FormProvider
            typeSchema={SiteInfomationSchema}
            controlFunction={formInputHandler}
            defaultInput={{
              ...siteData,
            }}
          >
            <FormWrapper
              data={SITEINFORMATIONDATA}
              className={" grid grid-cols-1 gap-5"}
            />
          </FormProvider>
        }
        {loader && (
          <LoadingState className="w-1/4 flex justify-center items-center " />
        )}
      </div>
    </div>
  );
};

const Logo = ({
  siteLogo,
  reloader,
  setReloader,
}: {
  siteLogo?: any;
  reloader: boolean;
  setReloader: (value: boolean) => void;
}) => {
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [loader, setLoading] = useState<boolean>(false);
  const formInputHandler = async (data: any, type?: string) => {
    setLoading(true);
    if (type === "file_delete") {
      // try {
      //   const response = await deleteLogo(data, siteLogo.id);
      //   setLoading(false);
      //   setNotification({ message: response.message, type: "success" });
      //   setReloader(!reloader);
      // } catch (error: any) {
      //   setLoading(false);
      //   setNotification({ message: error.message, type: "error" });
      // }
      return null;
    }

    // const formData = buildFormDataFromFiles(data.site_logo[0]);
    try {
      const formData = formToFormData(data);

      const response = await instance.patch(
        `/site-details/${siteLogo.id}`,
        formData,
      );

      // const response = await editLogo(formData, siteLogo.id);
      setLoading(false);
      setNotification({ message: response.data.message, type: "success" });
      setReloader(!reloader);
    } catch (error: any) {
      setLoading(false);
      setNotification({ message: error.response.data.message, type: "error" });
    }
  };

  return (
    <div className="">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <FormTitle label="Logo" />
      <div className="w-1/2">
        {
          <FormProvider
            typeSchema={z.object({ site_logo: z.any().optional() })}
            controlFunction={formInputHandler}
            defaultInput={siteLogo}
          >
            <FormWrapper
              data={[
                {
                  type: "file",
                  label: "Upload Site Logo",
                  accessor: "site_logo",
                },
              ]}
              className={" grid grid-cols-1 gap-5"}
            />
          </FormProvider>
        }
        {loader && (
          <LoadingState className="w-1/4 flex justify-center items-center " />
        )}
      </div>
    </div>
  );
};

const SITEINFORMATIONDATA = [
  {
    type: "text",
    label: "Title",
    accessor: "title",
  },
  {
    type: "textarea",
    label: "Description",
    accessor: "description",
  },
  {
    type: "email",
    label: "Admistrative Email",
    accessor: "admin_email",
  },
];
