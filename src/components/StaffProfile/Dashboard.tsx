import React from "react";
import { FaCalendarAlt, FaUnlock } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import FormTitle from "../Forms/FormTitle";
import ModalWrapper, { ModalContent, ModalTrigger } from "../ModalWrapper";
import Button from "../Button";
import { AvailableShifts, ConfirmedShifts } from "./ManageShifts";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="bg-gray-300/50 rounded-md p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-md flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <div>
              <p className=" font-bold">0</p>
              <h3 className="text-sm font-semibold">Unconfirmed Shifts</h3>
            </div>
            <FaUnlock className="text-xl" />
          </div>
          <div className="flex gap-5 items-center">
            <h4 className="text-xs font-semibold">Amount</h4>
            <p className="bg-gray-500 text-white py-1 px-4 rounded-lg">0</p>
          </div>
        </div>
        <div className="bg-white p-3 rounded-md flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <div>
              <p className=" font-bold">0</p>
              <h3 className="text-sm font-semibold">Confirmed Shifts</h3>
            </div>
            <FaCalendarAlt className="text-xl" />
          </div>
          <div className="flex gap-5 items-center">
            <h4 className="text-xs font-semibold">Amount</h4>
            <p className="bg-gray-500 text-white py-1 px-4 rounded-lg">0</p>
          </div>
        </div>
        <div className="bg-white p-3 rounded-md flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <div>
              <p className=" font-bold">0</p>
              <h3 className="text-sm font-semibold">Completed Shifts</h3>
            </div>
            <SiTicktick className="text-xl" />
          </div>
          <div className="flex gap-5 items-center">
            <h4 className="text-xs font-semibold">Amount</h4>
            <p className="bg-gray-500 text-white py-1 px-4 rounded-lg">0</p>
          </div>
        </div>
        <div className="bg-white p-3 rounded-md flex flex-col divide-y-2 ">
          <div className="flex flex-col justify-center py-1 gap-3 ">
            <p className=" text-sm font-bold">0 Hr</p>
            <h3 className="text-xs font-semibold">Total Hours this Month</h3>
          </div>
          <div className="flex flex-col justify-center py-1 gap-3">
            <p className=" text-sm font-bold">0 Hr</p>
            <h3 className="text-xs font-semibold">Total Hours Lifetime</h3>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 w-full">
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:col-span-2">
          <div className="shadow-sm p-3 flex flex-col gap-5 bg-white rounded-md ">
            <div className="flex justify-between">
              <FormTitle label="Upcoming Shifts" className="text-base" />
              {/* <ModalWrapper>
                <ModalTrigger>
                  <div>
                    <Button label="View All" />
                  </div>
                </ModalTrigger>
                <ModalContent className="">
                  <p>hello</p>
                </ModalContent>
              </ModalWrapper> */}
            </div>
            <div className="flex flex-col gap-3 divide-y-1 divide-gray-300">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3"
                >
                  <p className="flex flex-col gap-1 font-semibold text-sm">
                    Client name
                    <span className="text-xs font-normal text-gray-500">
                      Addresss
                    </span>
                  </p>
                  <div>
                    <p className="flex items-center gap-1 font-semibold text-sm">
                      Time:
                      <span className="text-xs font-normal text-gray-500">
                        14:30
                      </span>
                    </p>
                    <p className="flex items-center gap-1 font-semibold text-sm">
                      Duration:
                      <span className="text-xs font-normal text-gray-500">
                        30 Minutes
                      </span>
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">12-10-2024</p>
                </div>
              ))}
            </div>
          </div>

          <div className="shadow-sm p-3 flex flex-col gap-5 bg-white rounded-md ">
            <div className="flex justify-between">
              <FormTitle label="Allocated Clients" className="text-base" />
              <ModalWrapper>
                <ModalTrigger>
                  <div>
                    <Button label="View All" />
                  </div>
                </ModalTrigger>
                <ModalContent className="w-[90%] lg:w-2/3 h-[80%] ">
                  <ConfirmedShifts />
                </ModalContent>
              </ModalWrapper>
            </div>
            <div className="flex flex-col gap-3 divide-y-1 divide-gray-300">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3"
                >
                  <p className="flex flex-col gap-1 font-semibold text-sm">
                    Client name
                    <span className="text-xs font-normal text-gray-500">
                      Addresss
                    </span>
                  </p>
                  {/* <div>
                    <p className="flex items-center gap-1 font-semibold text-sm">
                      Time:
                      <span className="text-xs font-normal text-gray-500">
                        14:30
                      </span>
                    </p>
                    <p className="flex items-center gap-1 font-semibold text-sm">
                      Duration:
                      <span className="text-xs font-normal text-gray-500">
                        30 Minutes
                      </span>
                    </p>
                  </div> */}
                  <p className="text-xs text-gray-500">12-10-2024</p>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="shadow-sm p-3 md:col-span-2">hello</div> */}
        </div>

        <div className="p-3 bg-white w-full rounded-md flex flex-col gap-5">
          <div className="flex justify-between">
            <FormTitle label="Available Shifts" className="text-base" />
            <ModalWrapper>
              <ModalTrigger>
                <div>
                  <Button label="View All" />
                </div>
              </ModalTrigger>
              <ModalContent className="w-[90%] lg:w-2/3 h-[80%] ">
                <AvailableShifts />
              </ModalContent>
            </ModalWrapper>
          </div>
          <div className="flex flex-col gap-3 divide-y-1 divide-gray-300">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3"
              >
                <p className="flex flex-col gap-1 font-semibold text-sm">
                  Client name
                  <span className="text-xs font-normal text-gray-500">
                    Addresss
                  </span>
                </p>
                <div>
                  <p className="flex items-center gap-1 font-semibold text-sm">
                    Time:
                    <span className="text-xs font-normal text-gray-500">
                      14:30
                    </span>
                  </p>
                  <p className="flex items-center gap-1 font-semibold text-sm">
                    Duration:
                    <span className="text-xs font-normal text-gray-500">
                      30 Minutes
                    </span>
                  </p>
                </div>
                <p className="text-xs text-gray-500">12-10-2024</p>
                <div>
                  <Button label="Apply" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
