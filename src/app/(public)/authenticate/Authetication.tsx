"use client";

import { useEffect, useState, useContext } from "react";
import { instance } from "@/utils/axiosConfig";
import { AuthContext } from "@/app/Context/AuthContext";
import Error from "@/app/components/Error";
import RedirectTimer from "@/app/components/RedirectTimer";

export default function Authentication({ token }: { token: string }) {
  const { refreshUser } = useContext(AuthContext);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      try {
        // Backend sets cookies
        await instance.get(`/auth/verify-email?token=${token}`);

        // Refresh auth state so context updates user
        await refreshUser();

        //Mark success
        setSuccess(true);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            "An error occurred while verifying your email.",
        );
      }
    };

    verify();
  }, [token, refreshUser]);

  if (error) return <Error error={error} />;

  if (!success) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h2 className="text-white tracking-wider">Authenticating....</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-3">
      <h2 className="text-white tracking-wider">Access Granted</h2>
      <RedirectTimer redirectTo="/dashboard" seconds={3} />
    </div>
  );
}
