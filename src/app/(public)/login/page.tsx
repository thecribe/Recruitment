"use client";
import LoginForm from "@/app/components/LoginForm";
import { instance } from "@/utils/axiosConfig";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("redirectToken");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      try {
        await instance.get(`/verify-email?token=${token}`);
        setSuccess(true);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            "An error occurred while verifying your email.",
        );
      }
    };

    verify();
  }, [token]);
  return (
    <section className="flex justify-center h-screen w-screen items-center">
      <LoginForm />
    </section>
  );
};

export default page;
