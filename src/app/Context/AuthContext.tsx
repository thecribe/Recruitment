"use client";

import { instance } from "@/utils/axiosConfig";
import React, { createContext, useEffect, useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export const AuthContext = createContext<any | undefined>(undefined);

const AuthProvider = ({
  children,
  defaultdata,
}: {
  defaultdata: any;
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserSession = async () => {
    try {
      const response = await instance.get(`/auth/session`);
      setUser(response?.data ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await instance.get("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }

    setUser(null);
  };

  useEffect(() => {
    getUserSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        defaultdata,
        refreshUser: getUserSession, // 🔥 expose this
        logout,
      }}
    >
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
      >
        {children}
      </GoogleReCaptchaProvider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
