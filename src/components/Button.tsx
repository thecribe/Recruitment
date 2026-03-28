import React from "react";

const Button = ({ label }: { label: any }) => {
  return (
    <button className="w-full text-xs bg-gray-500/50 rounded-sm px-2 py-1 cursor-pointer">
      {label}
    </button>
  );
};

export default Button;
