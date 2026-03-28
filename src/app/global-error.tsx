"use client";
import Error from "../components/Error";

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body className="flex sm:h-screen w-screen overflow-auto">
        <div className="flex-1 flex flex-col bg-blue-900  bg-[url('/bg-image2.jpg')] bg-blend-darken bg-cover  h-full  overflow-auto">
          <Error error={"Something went wrong"} reloadButton={true} />
        </div>
      </body>
    </html>
  );
}
