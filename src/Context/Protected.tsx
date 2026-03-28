"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/Context/AuthContext";
import LoadingState from "../components/LoadingState";

function FullScreenLoader() {
  return (
    <section className="flex sm:h-screen w-screen overflow-auto">
      <div className="w-full flex flex-col bg-blue-900 bg-[url('/bg-image2.jpg')] bg-blend-darken bg-cover h-full overflow-auto justify-center items-center">
        <LoadingState className="w-full flex justify-center items-center" />
      </div>
    </section>
  );
}

export default function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) return <FullScreenLoader />;

  if (!user) return <FullScreenLoader />;

  return <>{children}</>;
}
