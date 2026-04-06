import React from "react";

const FormTitle = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => {
  return (
    <h2
      className={`font-semibold ${className ? className : "mb-8"} text-2xl font-semibold text-gray-900 `}
    >
      {label}
    </h2>
  );
};

export default FormTitle;
