"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useRouter } from "next/navigation";
import LoadingState from "./LoadingState";
import { IoIosMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { instance } from "@/utils/axiosConfig";
import { AuthContext } from "../Context/AuthContext";

const LoginForm = () => {
  const { refreshUser, user } = React.useContext(AuthContext);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [loadingState, setLoadingState] = useState(false);
  const [signInOption, setSignInOption] = useState<"credential" | "email">(
    "credential",
  );
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  const LoginSchemaCredential = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  });
  const LoginSchemaEmail = z.object({
    email: z.email({ message: "Invalid email address" }),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(
      signInOption === "credential" ? LoginSchemaCredential : LoginSchemaEmail,
    ),
  });

  const onSubmit = async (data: any) => {
    if (!executeRecaptcha) {
      setNotification({
        message: "Please check your internet connection",
        type: "error",
      });
      return;
    }

    //REST NOTIFICATION
    setNotification(null);

    //EXECUTE RECAPTCHA AND LOGIN USER
    const token = await executeRecaptcha("register_applicant");
    setLoadingState(true);

    //LOGIN USER
    let response;
    try {
      if (signInOption === "credential") {
        response = await instance.post(
          `/auth/credential?recaptchaToken=${token}`,
          data,
        );
        await refreshUser(); // 🔥 refresh user session after login
        router.replace("/dashboard");
      } else if (signInOption === "email") {
        response = await instance.post(
          `/auth/email?recaptchaToken=${token}`,
          data,
        );

        if (!response?.data?.status) {
          setLoadingState(false);
          setNotification({ message: response?.data?.message, type: "error" });
          return;
        }

        if (response?.data?.status) {
          setLoadingState(false);
          setNotification({
            message: response?.data?.message,
            type: "info",
          });
          return;
        }
      }
    } catch (error: any) {
      setLoadingState(false);
      setNotification({
        message: error.response?.data?.message,
        type: "error",
      });
    }
  };

  return (
    <div className="w-[70%] md:w-[60%] lg:w-[40%] xl:w-[30%] 2xl:w-[20%] bg-white shadow-sm shadow-blue-500/40 rounded-md px-10 py-10 flex flex-col gap-5 justify-between h-fit">
      {/* form title  */}
      <div className="w-full flex flex-col gap-3 items-center">
        <div className="w-full p-2 flex justify-center items-center">
          <Image
            src="/ariselogo.png"
            alt="logo"
            width={150}
            height={50}
            className="w-2/3 h-full"
            unoptimized
          />
        </div>
        <h2 className="text-xl text-blue-900 font-semibold text-center">
          User Login
        </h2>
      </div>
      {/* form content  */}

      <div className="w-full h-full flex flex-col items-center justify-center gap-5">
        <div className="flex flex-col gap-5 w-full">
          <div className="w-full flex flex-col gap-2 ">
            <label
              htmlFor="email"
              className="text-xs text-blue-900 tracking-wider font-bold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              // defaultValue={defaultValue}

              className="outline-1 outline-blue-700 border-2 border-gray-300 px-2 py-3 rounded-md text-xs "
            />
            {errors?.email?.message && (
              <p className="text-red-400 text-xs">
                {errors?.email?.message.toString()}
              </p>
            )}
          </div>
          {signInOption === "credential" && (
            <div className="w-full flex flex-col gap-2 ">
              <label
                htmlFor="password"
                className="text-xs text-blue-900 tracking-wider font-bold"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                // defaultValue={defaultValue}

                className="outline-1 outline-blue-700 border-2 border-gray-300 px-2 py-3 rounded-md text-xs "
              />
              {errors?.password?.message && (
                <p className="text-red-400 text-xs">
                  {errors?.password?.message.toString()}
                </p>
              )}
            </div>
          )}
        </div>

        {loadingState ? (
          <LoadingState className="w-full flex justify-center items-center " />
        ) : (
          <div className="flex gap-5 items-center w-full">
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-blue-500 text-sm text-white p-3 rounded-md w-full hover:bg-blue-600 hover:scale-102 transition-all duration-300 cursor-pointer active:scale-90"
            >
              Sign In
            </button>
          </div>
        )}
        {notification && (
          <p
            className={`text-sm tracking-wider italic ${notification?.type === "error" ? "text-red-500" : "text-green-500"} text-center`}
          >
            {notification?.message}
          </p>
        )}
        <p className="text-xs border w-fit px-3 py-1 rounded-md border-blue-900/50 text-gray-500 text-center">
          or sign in with
        </p>
        {signInOption === "credential" ? (
          <div className="flex gap-5 items-center w-full">
            <button
              onClick={() => setSignInOption("email")}
              className=" border-2 border-gray-500 text-sm text-black p-3 rounded-md w-full  hover:scale-102 transition-all duration-300 cursor-pointer active:scale-90 flex items-center justify-center gap-2"
            >
              <span>
                <IoIosMail className="text-lg" />
              </span>
              Sign in with Email
            </button>
          </div>
        ) : (
          <div className="flex gap-5 items-center w-full">
            <button
              onClick={() => setSignInOption("credential")}
              className=" border-2 border-gray-500 text-sm text-black p-3 rounded-md w-full  hover:scale-102 transition-all duration-300 cursor-pointer active:scale-90 flex items-center justify-center gap-2"
            >
              <span>
                <RiLockPasswordFill className="text-lg" />
              </span>
              Sign in with Credential
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
