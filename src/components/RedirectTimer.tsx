"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingState from "./LoadingState";

type RedirectTimerProps = {
  seconds?: number;
  redirectTo: string;
};

export default function RedirectTimer({
  seconds = 5,
  redirectTo,
}: RedirectTimerProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft === 0) {
      router.push(redirectTo);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, router, redirectTo]);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <LoadingState className="w-full flex justify-center items-center " />
      <p className="text-sm text-white">
        Redirecting in <span className="font-semibold">{timeLeft}</span>{" "}
        seconds…
      </p>
    </div>
  );
}
