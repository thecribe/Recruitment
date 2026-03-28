import React, { createContext, useContext, useState } from "react";

const HoverDropdown = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="group relative flex items-center justify-center gap-2 cursor-pointer w-fit ">
      {children}
    </div>
  );
};

export default HoverDropdown;

export const HoverDropdownTrigger = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return children;
};

export const HoverDropdownContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="hidden group-hover:flex flex-col z-5 absolute w-[200px] right-[50%] bottom-0   bg-white rounded-sm shadow-lg shadow-black/10 border border-gray-200 ">
      {children}
    </div>
  );
};
