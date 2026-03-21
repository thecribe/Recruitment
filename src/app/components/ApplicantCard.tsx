import Image from "next/image";
import React from "react";

const ApplicantCard = () => {
  return (
    <tr>
      <td className="flex  gap-5 justify-start items-center w-fit">
        <div className="w-1/4">
          <Image
            src="/globe.svg"
            alt=" "
            width={52}
            height={52}
            className="object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col ">
          <h3 className="text-sm font-bold">Name</h3>
          <span className="text-gray-500 text-sm font-semibold">Role</span>
          <span className="text-xs font-semibold text-gray-400">Status</span>
        </div>
      </td>
      <td className="flex  gap-5 justify-start items-center w-fit">
        <div className="w-1/4">
          <Image
            src="/globe.svg"
            alt=" "
            width={52}
            height={52}
            className="object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col ">
          <h3 className="text-sm font-bold">Name</h3>
          <span className="text-gray-500 text-sm font-semibold">Role</span>
          <span className="text-xs font-semibold text-gray-400">Status</span>
        </div>
      </td>
      <td className="flex  gap-5 justify-start items-center w-fit">
        <div className="w-1/4">
          <Image
            src="/globe.svg"
            alt=" "
            width={52}
            height={52}
            className="object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col ">
          <h3 className="text-sm font-bold">Name</h3>
          <span className="text-gray-500 text-sm font-semibold">Role</span>
          <span className="text-xs font-semibold text-gray-400">Status</span>
        </div>
      </td>
      <td className="flex  gap-5 justify-start items-center w-fit">
        <div className="w-1/4">
          <Image
            src="/globe.svg"
            alt=" "
            width={52}
            height={52}
            className="object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col ">
          <h3 className="text-sm font-bold">Name</h3>
          <span className="text-gray-500 text-sm font-semibold">Role</span>
          <span className="text-xs font-semibold text-gray-400">Status</span>
        </div>
      </td>
      <td className="flex  gap-5 justify-start items-center w-fit">
        <div className="w-1/4">
          <Image
            src="/globe.svg"
            alt=" "
            width={52}
            height={52}
            className="object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col ">
          <h3 className="text-sm font-bold">Name</h3>
          <span className="text-gray-500 text-sm font-semibold">Role</span>
          <span className="text-xs font-semibold text-gray-400">Status</span>
        </div>
      </td>
    </tr>
  );
};

export default ApplicantCard;
