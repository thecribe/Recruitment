import RegisterApplicant from "@/components/RegisterApplicant";

import Image from "next/image";

const page = () => {
  return (
    <div className="w-full h-screen flex gap-5 flex-col justify-center items-center ">
      <div className="w-[80%] md:w-[70%] lg:w-[40%] lg:h-fit rounded-xl bg-white p-8 shadow-sm flex flex-col gap-5 justify-between  ">
        <div>
          <div className="w-full p-2 flex justify-center items-center">
            <Image
              src="/ariselogo.png"
              alt="logo"
              width={150}
              height={150}
              className="w-1/4 h-full"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto px-5">
          <RegisterApplicant />
        </div>
      </div>
    </div>
  );
};

export default page;
