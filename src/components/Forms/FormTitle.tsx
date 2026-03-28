import React from "react";

const FormTitle = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => {
  return (
    <h2 className={`font-semibold ${className ? className : "text-base"}`}>
      {label}
    </h2>
  );
};

export default FormTitle;
