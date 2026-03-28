import Error from "@/components/Error";
import { instance } from "@/utils/axiosConfig";
import React from "react";
import ResetPassword from "./_ui/ResetPassword";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const token = (await searchParams).token as string;

  if (!token) {
    return <Error error="Invalid authentication token" />;
  }

  let tokenValidation;
  try {
    const response = await instance.get(`/auth/reset-password?token=${token}`);
    tokenValidation = response.data;
  } catch (error: any) {
    tokenValidation = error.response?.data;
  }

  if (!tokenValidation || !tokenValidation.status) {
    return (
      <Error error={tokenValidation?.message || "Invalid or expired token"} />
    );
  }

  return <ResetPassword token={token} />;
};

export default page;
