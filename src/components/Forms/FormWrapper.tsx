"use client";
import { FormContext } from "@/Context/FormContext";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { BiUpload } from "react-icons/bi";
import FileNameBox from "../FileNameBox";
import Button from "../Button";
import { AuthContext } from "@/Context/AuthContext";
import { FaSave } from "react-icons/fa";

type Data = {
  label: string;
  accessor: string;
  type: string;
  options?: any;
  subform?: any;
}[];

const FormWrapper = ({
  data,
  className,
  auditCheck,
}: {
  data: Data;
  className?: any;
  auditCheck?: boolean | undefined;
}) => {
  const allContext = useContext(FormContext);
  const { onSubmit } = allContext;
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full h-full">
      <div className="my-5 flex flex-col gap-5">
        <div className={className}>
          {data.map((eachData, index) => {
            if (eachData.type === "conditional") {
              return (
                <ConditionalFormInput
                  key={index}
                  label={eachData.label}
                  accessor={eachData.accessor}
                  optionInput={eachData?.options}
                  subform={eachData?.subform}
                />
              );
            } else {
              return (
                <FormInput
                  key={index}
                  type={eachData.type}
                  label={eachData.label}
                  accessor={eachData.accessor}
                  optionInput={eachData?.options}
                />
              );
            }
          })}
        </div>
        {!auditCheck && (
          <div className="mt-10 flex justify-start">
            <button
              onClick={onSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3.5 rounded-2xl font-medium flex items-center gap-2 transition"
            >
              <FaSave />
              Save
            </button>
          </div>
        )}
      </div>
      {auditCheck && ["applicant", "staff"].includes(user.role) && (
        <div className="w-fit">
          <Button label="Request Editing rights" />
        </div>
      )}
    </div>
  );
};

export default FormWrapper;

const FormInput = ({
  type,
  label,
  accessor,
  inputProps,
  optionInput,
}: {
  type: string;
  label: string;
  accessor: string;
  optionInput?: any;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}) => {
  const [preview, setPreview] = useState<{
    [accessor]: { images: string[]; pdfs: string[] };
  }>({});
  const allContext = useContext(FormContext);
  const { register, errors, watch, defaultInput } = allContext;

  useEffect(() => {
    if (type !== "file") return;

    const value = watch(accessor);

    // Handle default string URLs (already uploaded images)
    if (Array.isArray(value) && typeof value[0] === "string") {
      setPreview((prev: any) => ({ ...prev, [accessor]: value }));
      return;
    }

    if (!(value instanceof FileList)) return;

    const files = Array.from(value);

    // Image files → preview URLs
    const imageFiles = files.filter(
      (file) => file instanceof File && file.type.startsWith("image/"),
    );

    // PDF files → file names only
    const pdfFiles = files.filter(
      (file) => file instanceof File && file.type.toLowerCase().includes("pdf"),
    );

    const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));

    const pdfNames = pdfFiles.map((file) => file.name);

    setPreview((prev) => ({
      ...prev,
      [accessor]: {
        images: imageUrls,
        pdfs: pdfNames,
      },
    }));

    return () => {
      imageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [watch(accessor)]);

  let imagefile = null;

  if (
    type === "file" &&
    defaultInput?.[accessor] &&
    defaultInput?.[accessor].length > 0
  ) {
    imagefile = JSON.parse(defaultInput?.[accessor]);
  }
  // } else if (type === "conditional") {
  //   console.log(accessor);
  // }

  return (
    <>
      {type === "file" ? (
        <div className="col-span-1 lg:col-span-2 xl:col-span-3 flex flex-col gap-2">
          <p className="text-xs text-gray-600 font-bold">{label}:</p>
          <div className="flex flex-col  gap-5">
            <div className="w-fit h-fit flex flex-col gap-2  border rounded-md">
              <label
                className="text-sm text-gray-500 font-semibold flex items-center p-3  gap-3 cursor-pointer"
                htmlFor={accessor}
              >
                <BiUpload />
                <span>Upload document(s)</span>
              </label>
              <input
                type={type}
                multiple
                id={accessor}
                {...register(accessor)}
                className="hidden"
              />
            </div>
            <div className="flex gap-5 flex-wrap">
              {preview?.[accessor]?.images.length > 0 &&
                preview?.[accessor]?.images.map((eachImg, index) => (
                  <Image
                    key={index}
                    src={eachImg ? eachImg : "/file.svg"}
                    alt="Upload Image"
                    width={14}
                    height={14}
                    className="w-32 object-cover rounded-md"
                  />
                ))}
            </div>
            <div className="flex flex-col gap-2 flex-wrap">
              {preview?.[accessor]?.pdfs.length > 0 &&
                preview?.[accessor]?.pdfs.map((eachpdfs, index) => (
                  <p key={index} className="italic text-sm text-blue-500">
                    {eachpdfs}
                  </p>
                ))}
            </div>
          </div>

          {errors?.[accessor]?.message && (
            <p className="text-red-400 text-sm">
              {errors?.[accessor]?.message.toString()}
            </p>
          )}

          <div className=" flex flex-col gap-2">
            {imagefile &&
              imagefile?.length > 0 &&
              imagefile.map((eachfile: any, index: number) => (
                <FileNameBox
                  key={index}
                  accessor={accessor}
                  file={{ eachfile, index }}
                />
              ))}
          </div>
        </div>
      ) : type === "select" ? (
        <div className="w-full flex flex-col gap-2 ">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            {label}:
          </label>
          <select
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 "
            {...register(accessor)}
          >
            {optionInput?.map((eachoption: any, index: number) => (
              <option
                key={index}
                value={eachoption.slug ? eachoption.slug : eachoption}
              >
                {eachoption.title ? eachoption.title : eachoption}
              </option>
            ))}
          </select>
          {errors?.[accessor]?.message && (
            <p className="text-red-400 text-xs">
              {errors?.[accessor]?.message.toString()}
            </p>
          )}
        </div>
      ) : type === "textarea" ? (
        <div className="w-full flex flex-col gap-2 text-sm">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            {label}:
          </label>
          <textarea
            {...register(accessor)}
            id={accessor}
            rows={optionInput ? optionInput.row : 4}
            cols={optionInput ? optionInput.col : 6}
            placeholder="Write your text here..."
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />

          <p className="text-red-400 text-sm">
            {errors?.[accessor]?.message?.toString()}
          </p>
        </div>
      ) : type === "radio" ? (
        <div className="w-full flex flex-col gap-2 text-sm">
          <p className="text-xs text-gray-600 font-bold">{label}:</p>
          <div className="flex items-center gap-5">
            {optionInput?.map((eachoption: any, index: number) => (
              <label
                key={eachoption.title ? eachoption.title : eachoption}
                className=" text-sm font-medium text-gray-600 mb-2 flex gap-3"
              >
                <input
                  type={type}
                  {...register(accessor)}
                  value={eachoption.slug ? eachoption.slug : eachoption}
                  {...inputProps}
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span>{eachoption.title ? eachoption.title : eachoption}</span>
              </label>
            ))}
          </div>
          {errors?.[accessor]?.message && (
            <p className="text-red-400 text-xs">
              {errors?.[accessor]?.message.toString()}
            </p>
          )}
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2 text-sm ">
          <label
            htmlFor={accessor}
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            {label}:
          </label>
          <input
            type={type}
            id={accessor}
            {...register(accessor)}
            // defaultValue={defaultValue}
            {...inputProps}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />

          {accessor.includes(".") && errors ? (
            <p className="text-red-400 text-xs">
              {(accessor + ".message")
                .split(".")
                .reduce((acc, key) => acc?.[key], errors)}
            </p>
          ) : (
            <p className="text-red-400 text-xs">
              {errors?.[accessor]?.message.toString()}
            </p>
          )}
        </div>
      )}
    </>
  );
};

const ConditionalFormInput = ({
  subform,
  label,
  accessor,
  inputProps,
  optionInput,
}: {
  subform?: any;
  label: string;
  accessor: string;
  optionInput?: any;

  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}) => {
  const [selection, setSelection] = useState<string | null>(null);
  const allContext = useContext(FormContext);
  const { register, setValue, errors, watch } = allContext;

  // ✅ Watch the specific field once
  const watchedValue = watch(accessor);

  useEffect(() => {
    if (!watchedValue) return;
    setSelection(watchedValue);
  }, [watchedValue]);

  return (
    <div className="col-span-3 flex flex-col gap-3 ">
      <p className="block text-sm font-medium text-gray-600 mb-2">{label}:</p>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-5">
          {optionInput?.map((eachoption: any, index: number) => (
            <label
              key={eachoption.title ? eachoption.title : eachoption}
              className="text-sm flex gap-3"
            >
              <input
                type={"radio"}
                id={accessor}
                {...register(accessor)}
                value={eachoption.slug ? eachoption.slug : eachoption}
                {...inputProps}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span>{eachoption.title ? eachoption.title : eachoption}</span>
            </label>
          ))}
        </div>
        {errors?.[accessor.split(".")[0]]?.value?.message && (
          <p className="text-red-400 text-sm">
            {errors?.[accessor.split(".")[0]]?.value?.message.toString()}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {subform?.map(
          (eachData: any, index: number) =>
            eachData.optionType.includes(selection) && (
              <FormInput
                key={index}
                type={eachData.type}
                label={eachData.label}
                accessor={eachData.accessor}
                optionInput={eachData?.options}
              />
            ),
        )}
        {errors?.[accessor]?.message && (
          <p className="text-red-400 text-sm">
            {errors?.[accessor]?.message.toString()}
          </p>
        )}
      </div>
    </div>
  );
};
