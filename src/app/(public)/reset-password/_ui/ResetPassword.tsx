"use client";
import FormTitle from "@/app/components/Forms/FormTitle";
import { instance } from "@/utils/axiosConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { RiLockPasswordFill } from "react-icons/ri";
import { z } from "zod";

const PasswordSchema = z
  .object({
    new_password: z
      .string()
      .min(6, { message: "Password must be more than 6 characters" }),
    confirm_password: z
      .string()
      .min(6, { message: "Password must be more than 6 characters" }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "New password and confirm password do not match",
    path: ["confirm_password"],
  });

const ResetPassword = ({ token }: { token: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
  });

  const onFormSubmit = async (data: z.infer<typeof PasswordSchema>) => {
    try {
      const response = await instance.put(`/reset-password/${token}`, data);

      console.log(response.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="bg-white rounded-md w-4/6 md:w-1/2 lg:w-2/6 xl:w-1/5 flex flex-col gap-5 items-center justify-center p-5 lg:p-10 "
      >
        <RiLockPasswordFill className="text-7xl text-blue-900" />

        <FormTitle label="Reset Password" className="text-xl" />

        <p className="text-sm text-gray-500 text-center tracking-wide">
          Please enter your new password below to reset your password
        </p>

        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="new_password"
              className="text-xs text-blue-900 tracking-wider font-bold"
            >
              New Password:
            </label>

            <input
              type="password"
              id="new_password"
              {...register("new_password")}
              className="outline-1 outline-blue-700 border-2 border-gray-300 px-2 py-2.5 rounded-md text-xs"
            />

            {errors?.new_password?.message && (
              <p className="text-red-400 text-xs">
                {errors.new_password.message}
              </p>
            )}
          </div>

          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="confirm_password"
              className="text-xs text-blue-900 tracking-wider font-bold"
            >
              Confirm Password:
            </label>

            <input
              type="password"
              id="confirm_password"
              {...register("confirm_password")}
              className="outline-1 outline-blue-700 border-2 border-gray-300 px-2 py-2.5 rounded-md text-xs"
            />

            {errors?.confirm_password?.message && (
              <p className="text-red-400 text-xs">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="text-xs w-fit bg-blue-500/50 px-3 py-1 rounded-md cursor-pointer hover:bg-blue-500/70 hover:scale-105 shadow-xs hover:shadow-black/30 active:shadow-black/10 active:scale-95 transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
