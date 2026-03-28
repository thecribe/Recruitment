"use client";

import React, { Fragment, use, useContext, useState } from "react";
import { AuthContext } from "@/Context/AuthContext";
import z, { set } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useRouter } from "next/navigation";
import LoadingState from "./LoadingState";
import { instance } from "@/utils/axiosConfig";
import Link from "next/link";

const StaffProfileSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.email().refine((val) => {
    if (val.length > 0) {
      return /\.[a-z]{2,}$/i.test(val);
    } else {
      return true;
    }
  }, "Email must contain a valid domain"),
  phone: z.string().min(1, { message: "Mobile number is required" }),
  departmentSlug: z.string({ message: "Department is required" }),
  jobTypeSlug: z.string({ message: "Job Type is required" }),
  address: z.string().min(1, { message: "Field cannot be empty" }),
});
const RegisterApplicant = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { defaultdata } = useContext(AuthContext);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<z.infer<typeof StaffProfileSchema>>({
    resolver: zodResolver(StaffProfileSchema),
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const onFormSubmit = handleSubmit(async (data: any) => {
    setLoading(true);
    if (!executeRecaptcha) {
      setNotification({
        message: "Execute recaptcha not yet available",
        type: "error",
      });
      return;
    }
    const token = await executeRecaptcha("register_applicant");

    try {
      const response = await instance.post(
        `/users?recaptchaToken=${token}`,
        data,
      );
      // const response = await addUser(data, token);
      setNotification({
        message: response.data.message,
        type: "success",
      });
      setLoading(false);
    } catch (error: any) {
      setNotification({
        message: error.response.data?.message,
        type: "error",
      });
      setLoading(false);
    }
  });

  return notification?.type === "success" ? (
    <div className="flex flex-col">
      <h1 className="mb-3 text-center text-xl font-semibold text-gray-900">
        Check your email
      </h1>

      <p className="mb-4 text-center text-sm text-gray-600">
        We&apos;ve sent a confirmation link to your email address. Please click
        the link to complete your registration.
      </p>

      <p className="text-center text-xs text-gray-500">
        Didn&apos;t receive the email? Check your spam or junk folder.
      </p>
      <div className="flex items-center justify-center mt-8">
        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 text-sm text-white px-3 py-1 rounded-md w-fit hover:bg-blue-600 hover:scale-102 transition-all duration-300 cursor-pointer active:scale-90"
        >
          Login
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full h-full flex flex-col gap-5">
      <h2 className="text-2xl text-blue-900 font-semibold text-center">
        Registration Form
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="w-full flex flex-col gap-2 ">
          <label
            htmlFor="firstName"
            className="text-xs text-blue-900 tracking-wider font-bold"
          >
            Firstname:
          </label>
          <input
            type="text"
            id="firstName"
            {...register("firstName")}
            // defaultValue={defaultValue}

            className="outline-1 outline-blue-700 border-2 border-gray-300 px-2 py-2.5 rounded-md text-xs "
          />
          {errors?.firstName?.message && (
            <p className="text-red-400 text-xs">
              {errors?.firstName?.message.toString()}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label
            htmlFor="lastName"
            className="text-xs text-blue-900 tracking-wider font-bold"
          >
            Lastname:
          </label>
          <input
            type="text"
            id="lastName"
            {...register("lastName")}
            // defaultValue={defaultValue}

            className="outline-1 outline-blue-700 border-2 border-gray-300 px-2 py-2.5 rounded-md text-xs "
          />
          {errors?.lastName?.message && (
            <p className="text-red-400 text-xs">
              {errors?.lastName?.message.toString()}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="w-full flex flex-col gap-2 ">
          <label
            htmlFor="email"
            className="text-xs text-blue-900 tracking-wider font-bold"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            // defaultValue={defaultValue}

            className="outline-1 outline-blue-700 border-2 border-gray-300 px-2 py-2.5 rounded-md text-xs "
          />
          {errors?.email?.message && (
            <p className="text-red-400 text-xs">
              {errors?.email?.message.toString()}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label
            htmlFor="phone"
            className="text-xs text-blue-900 tracking-wider font-bold"
          >
            Phone Number:
          </label>
          <input
            type="phone"
            id="phone"
            {...register("phone")}
            // defaultValue={defaultValue}

            className="outline-1 outline-blue-700 border-2 border-gray-300 px-2 py-2.5 rounded-md text-xs "
          />
          {errors?.phone?.message && (
            <p className="text-red-400 text-xs">
              {errors?.phone?.message.toString()}
            </p>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 ">
        <label
          htmlFor="address"
          className="text-xs text-blue-900 tracking-wider font-bold"
        >
          Address
        </label>
        <input
          type="text"
          id="address"
          {...register("address")}
          // defaultValue={defaultValue}

          className="outline-1 outline-blue-700 border-2 border-gray-300 px-2 py-2.5 rounded-md text-xs "
        />
        {errors?.address?.message && (
          <p className="text-red-400 text-xs">
            {errors?.address?.message.toString()}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="w-full flex flex-col gap-2 ">
          <label
            htmlFor="departmentSlug"
            className="text-xs text-blue-900 tracking-wider font-bold"
          >
            Department:
          </label>
          <select
            className="outline-1 outline-blue-700 border-2 border-gray-300 px-2 py-2.5 rounded-md text-xs "
            {...register("departmentSlug")}
          >
            {defaultdata.department?.map((eachoption: any, index: number) => (
              <option
                key={index}
                value={eachoption.slug ? eachoption.slug : eachoption}
              >
                {eachoption.title ? eachoption.title : eachoption}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label
            htmlFor="jobTypeSlug"
            className="text-xs text-blue-900 tracking-wider font-bold"
          >
            Job Type:
          </label>
          <select
            className="outline-1 outline-blue-700 border-2 border-gray-300 px-2 py-2.5 rounded-md text-xs "
            {...register("jobTypeSlug")}
          >
            {defaultdata.job_type?.map((eachoption: any, index: number) => (
              <option
                key={index}
                value={eachoption.slug ? eachoption.slug : eachoption}
              >
                {eachoption.title ? eachoption.title : eachoption}
              </option>
            ))}
          </select>
        </div>
      </div>
      {loading ? (
        <LoadingState className="w-full flex justify-center items-center " />
      ) : (
        <div className="flex gap-5 items-center ">
          <button
            onClick={onFormSubmit}
            className="bg-blue-500 text-sm text-white px-3 py-1 rounded-md w-fit hover:bg-blue-600 hover:scale-102 transition-all duration-300 cursor-pointer active:scale-90"
          >
            Register
          </button>
        </div>
      )}
      <div className="text-sm flex gap-2 items-center">
        <p>Already a member?</p>
        <Link href="/" className="text-blue-500 hover:underline ">
          Login
        </Link>
      </div>
      <p
        className={`text-sm tracking-wider italic ${notification?.type === "error" ? "text-red-500" : "text-green-500"} text-center`}
      >
        {notification?.message}
      </p>
    </div>
  );
};

export default RegisterApplicant;
