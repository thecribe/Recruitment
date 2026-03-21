import { useEffect } from "react";

type NotificationProps = {
  message: string | undefined;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
};

const styles = {
  base: "fixed top-20 right-10 z-50 px-4 py-3 text-sm rounded-sm text-white shadow-md",
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

export default function Notification({
  message,
  type = "info",
  onClose,
  duration = 3000,
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={`${styles.base} ${styles[type]} transition-all duration-600 ease-out  max-w-75 w-75`}
    >
      {message}
    </div>
  );
}
