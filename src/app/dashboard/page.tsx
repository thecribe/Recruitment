import DepartmentCard from "@/components/DepartmentCard";
import StaffCountChart from "@/components/StaffCountChart";
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
  const { user, logout } = React.useContext(AuthContext);
  const [completionRate, setCompletionRate] = useState<any | null>(null);

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
              <p className="font-medium">15–20 minutes</p>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Tabs --> */}
      <div className="flex border-b mb-8">
        <button className="px-8 py-4 border-b-4 border-indigo-600 text-indigo-600 font-medium">
          Screening
        </button>
        <button className="px-8 py-4 text-gray-500 hover:text-gray-700">
          Reference
        </button>
        <button className="px-8 py-4 text-gray-500 hover:text-gray-700">
          Training
        </button>
      </div>

      {/* <!-- Sections Grid --> */}
      <div className="grid grid-cols-2 gap-8">
        {/* <!-- Personal Details --> */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Personal Details</h3>
            <span className="text-emerald-600 font-medium">88.9%</span>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span>Personal Info</span>
              <span className="text-emerald-600">Completed</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Address Details</span>
              <span className="text-emerald-600">Completed</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Passport Photo & NI Number</span>
              <span className="text-orange-500 font-medium">
                0% — Upload Required
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Contact Information</span>
              <span className="text-emerald-600">Completed</span>
            </div>
          </div>
          <button className="mt-8 w-full py-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700">
            Continue Personal Details
          </button>
        </div>

        {/* <!-- Work History & Education --> */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Work History & Education</h3>
            <span className="text-orange-500 font-medium">32%</span>
          </div>
          <div className="space-y-6 text-sm">
            <div className="flex justify-between items-center">
              <span>Current Job Details</span>
              <span className="text-orange-500">Incomplete</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Previous Job Details</span>
              <span className="text-orange-500">Incomplete</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Educational Qualification</span>
              <span className="text-emerald-600">Completed</span>
            </div>
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
              <p className="text-3xl font-bold text-orange-500 mt-2">0%</p>
              <p className="text-xs text-orange-600 mt-1">Missing document</p>
            </div>
            <div className="bg-gray-50 p-5 rounded-2xl">
              <p className="text-sm text-gray-600">Professional Memberships</p>
              <p className="text-3xl font-bold text-orange-500 mt-2">0%</p>
            </div>
            <div className="bg-gray-50 p-5 rounded-2xl">
              <p className="text-sm text-gray-600">
                Health & Safety Declaration
              </p>
              <p className="text-3xl font-bold text-emerald-600 mt-2">100%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
