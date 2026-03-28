"use client";

import { instance } from "@/utils/axiosConfig";
import { getNames } from "country-list";
import React, { createContext, useEffect, useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Error from "../components/Error";

export const AuthContext = createContext<any | undefined>(undefined);

const AuthProvider = ({
  children,
  // defaultdata,
}: {
  // defaultdata: any;
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [job_type, setJobType] = useState<any>(null);
  const [visa_type, setVisaType] = useState<any>(null);
  const [department, setDepartment] = useState<any>(null);
  const [siteData, setSiteData] = useState<any>(null);

  const [errors, setErrors] = useState<{
    job_type?: string;
    visa_type?: string;
    department?: string;
    siteData?: string;
    status: boolean;
  }>({ status: false });

  const countries = getNames();

  const getUserSession = async () => {
    try {
      const response = await instance.get(`/auth/session`);
      setUser(response?.data ?? null);
    } catch (error: any) {
      console.log(error.response);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await instance.get("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }

    setUser(null);
  };

  useEffect(() => {
    getUserSession();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const requests = [
        instance.get(`/job-type?limit=${0}&offset=${0}`),
        instance.get(`/visa-type?limit=${0}&offset=${0}`),
        instance.get(`/department?limit=${0}&offset=${0}`),
        instance.get(`/site-details`),
      ];

      const results = await Promise.allSettled(requests);

      const newErrors: any = {};

      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          const data = result.value.data;

          if (index === 0) setJobType(data.data);
          if (index === 1) setVisaType(data.data);
          if (index === 2) setDepartment(data.data);
          if (index === 3) setSiteData(data.data[0]);
        } else {
          const errorMessage =
            result.reason?.response?.data?.message ||
            result.reason?.message ||
            "Something went wrong";
          newErrors.status = true;
          if (index === 0) newErrors.job_type = errorMessage;
          if (index === 1) newErrors.visa_type = errorMessage;
          if (index === 2) newErrors.department = errorMessage;
          if (index === 3) newErrors.siteData = errorMessage;
        }
      });

      setErrors(newErrors);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (errors.status)
    return (
      <div className="flex sm:h-screen w-screen overflow-auto">
        <div className="flex-1 flex flex-col bg-blue-900  bg-[url('/bg-image2.jpg')] bg-blend-darken bg-cover  h-full  overflow-auto">
          <Error error={"Something went wrong"} reloadButton={true} />
        </div>
      </div>
    );
  console.log(user);
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        defaultdata: {
          job_type,
          visa_type,
          site_data: siteData,
          department,
          countries,
        },
        refreshUser: getUserSession, // 🔥 expose this
        logout,
      }}
    >
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
      >
        {loading ? <p>loading</p> : children}
      </GoogleReCaptchaProvider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
