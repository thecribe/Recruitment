"use client";

import { useEffect, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthContext } from "../Context/AuthContext";
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

export default function PublicRedirectGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useContext(AuthContext);

  const publicRoutes = ["/", "/login", "/register"];

  useEffect(() => {
    if (!loading && user && publicRoutes.includes(pathname)) {
      router.replace("/dashboard");
    }
  }, [user, loading, pathname, router]);

  // While auth state is loading
  if (loading) {
    return <FullScreenLoader />;
  }

  // If logged in and currently on a public page,
  // show loader while redirecting (prevents white flash)
  if (user && publicRoutes.includes(pathname)) {
    return <FullScreenLoader />;
  }

  return <>{children}</>;
}
