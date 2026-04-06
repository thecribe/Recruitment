"use client";
import React, { createContext, useContext, useState } from "react";
import Profile from "./Profile";
import ManageProfile from "../ManageProfile";
import Compliance from "./Compliance";

export const SinglePageContext = createContext<any | undefined>(undefined);
const SinglePageWrapper = ({ id }: { id: string }) => {
  const [display, setDisplay] = useState<number>(1);

  let output;
  switch (display) {
    case 1:
      output = <Profile id={id} />;
      break;
    case 2:
      output = <Compliance />;
      break;
    case 3:
      output = (
        <div className="w-full h-full flex items-center justify-center p-8">
          <div className="bg-white p-6 w-full  h-full rounded-3xl shadow-sm flex flex-col gap-5">
            <ManageProfile id={id} type="staff" />
          </div>
        </div>
      );
      break;
    default:
      output = <Profile id={id} />;
      break;
  }
  return (
    <SinglePageContext.Provider value={{ setDisplay, id, display }}>
      <div className="p-3 flex flex-col gap-3 h-full w-full overflow-y-auto">
        <div className=" rounded-md">
          <MenuBar />
        </div>
        <div className="flex-1 w-full overflow-y-auto">{output}</div>
      </div>
    </SinglePageContext.Provider>
  );
};

export default SinglePageWrapper;

const MenuBar = () => {
  const { display, setDisplay } = useContext(SinglePageContext);

  return (
    <div className="flex border-b border-gray-300">
      {[
        "Profile",
        "Compliance",
        "Settings",
        "Reference",
        "Training",
        "Download Profile",
      ].map((eachMenu, index) => {
        return (
          <p
            key={index}
            onClick={() => setDisplay(index + 1)}
            className={`px-8 py-4 border-b-4 font-medium cursor-pointer ${
              display === index + 1
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {eachMenu}
          </p>
        );
      })}
    </div>
  );
};
