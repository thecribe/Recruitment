"use client";

import { useEffect, useState } from "react";

import { instance } from "@/utils/axiosConfig";
import Error from "@/components/Error";
import RedirectTimer from "@/components/RedirectTimer";

export default function VerifyEmailPage({ token }: { token: string }) {
  //   const searchParams = useSearchParams();
  //   const token = searchParams.get("token");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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

  if (error) return <Error error={error} />;

  if (!success) return <div>Verifying...</div>;

  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-3">
      <h2 className="text-white tracking-wider">Account Verified</h2>
      <RedirectTimer redirectTo="/dashboard" seconds={5} />
    </div>
  );
}
