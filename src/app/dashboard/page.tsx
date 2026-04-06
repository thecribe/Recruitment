"use client";
import { formNav } from "@/components/Screening/ScreeningWrapper";
import { AuthContext } from "@/Context/AuthContext";
import { instance } from "@/utils/axiosConfig";
import React, { useEffect, useMemo, useState } from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-3 p-3">
      <ApplicantDashboard />
    </div>
  );
};

export default page;

const ApplicantDashboard = () => {
  const { user } = React.useContext(AuthContext);
  const [completionRate, setCompletionRate] = useState<any | null>(null);
  const [navSelector, setNavSelector] = useState<string>("screening");

  // Calculate completion average
  const averageCompletionRate = useMemo(() => {
    if (!completionRate) return 0;

    const values = Object.values(completionRate);

    if (values.length === 0) return 0;

    const total: any = values.reduce(
      (sum: any, value) => sum + Number(value),
      0,
    );

    return total / values.length;
  }, [completionRate]);

  useEffect(() => {
    const getData = async () => {
      try {
        const completionRate = await instance.get(
          `/completion-rate/${user?.id}`,
        );

        setCompletionRate(completionRate.data);
      } catch (error: any) {
        console.log(error.response.data);
        setCompletionRate(null);
      }
    };
    getData();
  }, [user]);

  return (
    <div className="p-8">
      {/* <!-- Overall Progress --> */}
      <div className="bg-white rounded-3xl p-8 shadow-sm mb-10 flex items-center gap-12">
        <div>
          <div className="w-48 h-48 rounded-full progress-circle flex items-center justify-center relative">
            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-6xl font-bold text-indigo-600">
                  {Math.ceil(averageCompletionRate)}%
                </p>
                <p className="text-sm text-gray-500">Overall Progress</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-6">
            Your Application Status
          </h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-gray-500">Next Step</p>
              <p className="font-medium text-orange-600">
                Complete Work History & Professional Memberships
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estimated Completion Time</p>
              <p className="font-medium">{`15-20 minutes`}</p>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Tabs --> */}
      <div className="flex border-b border-gray-300 mb-8">
        {["screening"].map((tab, index) => (
          <button
            key={index}
            className={`px-8 py-4 border-b-4 ${
              navSelector === tab
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            } font-medium`}
            onClick={() => setNavSelector(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* <!-- Sections Grid --> */}
      {navSelector === "screening" && <ScreeningDashboard />}
      {navSelector === "reference" && (
        <div className="text-center text-gray-500">
          Reference checks content will go here.
        </div>
      )}
      {navSelector === "training" && (
        <div className="text-center text-gray-500">
          Training content will go here.
        </div>
      )}
    </div>
  );
};

const ScreeningDashboard = () => {
  const { user } = React.useContext(AuthContext);
  const [formProgress, setFormProgress] = useState<any | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await instance.get(
          `/analytics/all-form-progress/${user?.id}`,
        );
        setFormProgress(response.data.data);
        // setCompletionRate(completionRate.data);
      } catch (error: any) {
        console.log(error.response.data);
        setFormProgress(null);
      }
    };
    getData();
  }, [user]);

  return (
    formProgress && (
      <div className="grid grid-cols-2 gap-8">
        {/* <!-- Personal Details --> */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Personal Details</h3>
            <span
              className={`${formProgress?.personal_details.section_progress > 80 ? "text-emerald-600" : "text-orange-500"} font-medium`}
            >
              {formProgress?.personal_details.section_progress || 0} %
            </span>
          </div>
          <div className="space-y-6">
            {formNav.map((parentMenu, index) => {
              if (parentMenu.slug === "personal_details") {
                return parentMenu.menu.map((childrenMenu, ind) => {
                  return formProgress?.personal_details.forms.map(
                    (form: any, inde: number) => {
                      if (form.key === childrenMenu.query) {
                        return (
                          <div
                            key={inde}
                            className="flex justify-between items-center"
                          >
                            <span>{childrenMenu.title}</span>
                            <span
                              className={`${form.progress > 80 ? "text-emerald-600" : "text-orange-500"} font-medium`}
                            >
                              {form.progress}%
                            </span>
                          </div>
                        );
                      }
                    },
                  );
                });
              }
            })}
          </div>
          <button className="mt-8 w-full py-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700">
            Continue Personal Details
          </button>
        </div>

        {/* <!-- Work History & Education --> */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Work History & Education</h3>
            <span
              className={`${formProgress?.work_history.section_progress > 80 ? "text-emerald-600" : "text-orange-500"} font-medium`}
            >
              {formProgress?.work_history.section_progress || 0} %
            </span>
          </div>
          <div className="space-y-6 text-sm">
            {formNav.map((parentMenu, index) => {
              if (parentMenu.slug === "work_history") {
                return parentMenu.menu.map((childrenMenu, ind) => {
                  return formProgress?.work_history.forms.map(
                    (form: any, inde: number) => {
                      if (form.key === childrenMenu.query) {
                        return (
                          <div
                            key={inde}
                            className="flex justify-between items-center"
                          >
                            <span>{childrenMenu.title}</span>
                            <span
                              className={`${form.progress > 80 ? "text-emerald-600" : "text-orange-500"} font-medium`}
                            >
                              {form.progress}%
                            </span>
                          </div>
                        );
                      }
                    },
                  );
                });
              } else {
                return parentMenu.menu.map((childrenMenu, ind) => {
                  return formProgress?.education_and_qualifications.forms.map(
                    (form: any, inde: number) => {
                      if (form.key === childrenMenu.query) {
                        return (
                          <div
                            key={inde}
                            className="flex justify-between items-center"
                          >
                            <span>{childrenMenu.title}</span>
                            <span
                              className={`${form.progress > 80 ? "text-emerald-600" : "text-orange-500"} font-medium`}
                            >
                              {form.progress}%
                            </span>
                          </div>
                        );
                      }
                    },
                  );
                });
              }
            })}
          </div>
          <button className="mt-8 w-full py-4 border border-indigo-600 text-indigo-600 rounded-2xl hover:bg-indigo-50">
            Resume Work History
          </button>
        </div>

        {/* <!-- Professional Memberships & Declarations --> */}
        <div className="bg-white rounded-3xl p-8 shadow-sm col-span-2">
          <h3 className="font-semibold text-lg mb-6">
            Professional Memberships & Declarations
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-gray-50 p-5 rounded-2xl">
              <p className="text-sm text-gray-600">Right To Work</p>
              <p
                className={`${
                  formProgress?.professional_details.forms.find(
                    (f: any) => f.key === "right_to_work",
                  )?.progress > 80
                    ? "text-emerald-600"
                    : "text-orange-500"
                } text-3xl font-bold mt-2`}
              >
                {formProgress?.professional_details.forms.find(
                  (f: any) => f.key === "right_to_work",
                )?.progress || 0}{" "}
                %
              </p>
            </div>
            <div className="bg-gray-50 p-5 rounded-2xl">
              <p className="text-sm text-gray-600">Professional Memberships</p>
              <p
                className={`${
                  formProgress?.professional_details.forms.find(
                    (f: any) => f.key === "professional_memberships",
                  )?.progress > 80
                    ? "text-emerald-600"
                    : "text-orange-500"
                } text-3xl font-bold mt-2`}
              >
                {formProgress?.professional_details.forms.find(
                  (f: any) => f.key === "professional_memberships",
                )?.progress || 0}{" "}
                %
              </p>
            </div>
            <div className="bg-gray-50 p-5 rounded-2xl">
              <p className="text-sm text-gray-600">
                Health & Safety Declaration
              </p>
              <p
                className={`${
                  formProgress?.declarations.section_progress > 80
                    ? "text-emerald-600"
                    : "text-orange-500"
                } text-3xl font-bold mt-2`}
              >
                {formProgress?.declarations.section_progress || 0} %
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
