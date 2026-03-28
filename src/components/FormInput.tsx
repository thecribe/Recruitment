import React from "react";
import { FieldError } from "react-hook-form";

const InputForm = ({
  type,
  label,
  register,
  defaultValue,
  error,
  inputProps,
}: {
  type: string;
  label: string;
  defaultValue?: string;
  register: any;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}) => {
  return (
    <div className="w-full flex flex-col gap-2 ">
      <label className="text-xs text-blue-900 tracking-wider font-bold">
        {label}:
      </label>
      <input
        type={type}
        {...register}
        // defaultValue={defaultValue}
        {...inputProps}
        className="outline-1 outline-blue-700 border-2 border-gray-300 px-2 py-2.5 rounded-md text-xs "
      />
      {error?.message && (
        <p className="text-red-400 text-xs">{error?.message.toString()}</p>
      )}
    </div>
  );
};

export default InputForm;
