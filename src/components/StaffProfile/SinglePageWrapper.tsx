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
        <div className="w-full h-full flex items-center justify-center p-3">
          <div className="bg-white p-3 w-full md:w-4/5 h-full rounded-md shadow-sm flex flex-col gap-5">
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
        <div className="p-3 bg-white rounded-md">
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
    <div className="flex flex-wrap divide-x divide-gray-400/50 w-full  gap-3 ">
      {["Profile", "Compliance", "Settings"].map((eachMenu, index) => {
        return (
          <p
            key={index}
            onClick={() => setDisplay(index + 1)}
            className={`text-xs px-3  cursor-pointer hover:text-black transition-all duration-300 hover:underline hover:underline-offset-4 ${
              display === index + 1
                ? "text-black underline underline-offset-4"
                : "text-gray-500 "
            }`}
          >
            {eachMenu}
          </p>
        );
      })}
    </div>
  );
};
