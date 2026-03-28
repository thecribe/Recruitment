import LoginForm from "@/components/LoginForm";
import React from "react";

const page = () => {
  return (
    <section className="flex justify-center  h-screen w-screen items-center">
      <div className="w-full flex flex- justify-center items-center bg-blue-900  bg-[url('/bg-image2.jpg')] bg-blend-darken bg-cover  h-full">
        <LoginForm />
      </div>
    </section>
  );
};

export default page;
