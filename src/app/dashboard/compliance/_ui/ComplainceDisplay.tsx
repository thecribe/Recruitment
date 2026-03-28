"use client";
import { formNav } from "@/components/Screening/ScreeningWrapper";
import { COMPLIANCEDATA } from "@/utils/data";
import { useSearchParams } from "next/navigation";
import React from "react";

const ComplainceDisplay = () => {
  const searchParams = useSearchParams();
  const department = searchParams.get("department");

  const coloredRows = (index: number) => {
    if (index < 90) return "bg-red-300/30";
    if (index >= 90 && index < 100) return "bg-yellow-300/30";
    if (index === 100) return "bg-green-300/30";
    return "";
  };

  return (
    <div className="w-full h-full overflow-x-auto overflow-y-auto ">
      <table className="min-w-max text-xs">
        <thead className="sticky left-0 top-0 z-20 bg-gray-400">
          <tr>
            <th
              rowSpan={2}
              className="sticky left-0 z-10 row-span-2 w-fit border px-7 py-2 bg-gray-500"
            >
              <p>Staff Name</p>
            </th>
            {formNav.map((eachNav, index) => {
              return (
                <th
                  key={index}
                  colSpan={eachNav.menu.length}
                  className="row-span-2 border px-4 py-4 uppercase"
                >
                  {eachNav.title}
                </th>
              );
            })}
          </tr>
          <tr>
            {formNav.map((eachNav, index) => {
              return eachNav.menu.map((eachMenu, idx) => (
                <th key={idx} className=" border px-4 py-2">
                  {eachMenu.title}
                </th>
              ));
            })}
          </tr>
        </thead>
        <tbody>
          {COMPLIANCEDATA.map((eachData, index) => {
            return (
              <tr key={index} className="even:bg-gray-300/30">
                <td className="sticky left-0 z-10 border px-7 py-2 bg-gray-300 text-black    font-semibold">
                  <div className="flex gap-2 items-center py-2">
                    <p>{index + 1}.</p>
                    <p>{eachData.name}</p>
                  </div>
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.personal_info,
                  )}`}
                >
                  {eachData.personal_info}
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.address_details,
                  )}`}
                >
                  {eachData.address_details}
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.passport_photo,
                  )}`}
                >
                  {eachData.passport_photo}
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.resume,
                  )}`}
                >
                  {eachData.resume}
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.contact,
                  )}`}
                >
                  {eachData.contact}
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.emergency_contact,
                  )}`}
                >
                  {eachData.emergency_contact}
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.current_job,
                  )}`}
                >
                  {eachData.current_job}
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.previous_job,
                  )}`}
                >
                  {eachData.previous_job}
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.educational_qualification,
                  )}`}
                >
                  {eachData.educational_qualification}
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.right_to_work,
                  )}`}
                >
                  {eachData.right_to_work}
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.professional_memberships,
                  )}`}
                >
                  {eachData.professional_memberships}
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.bank_payment_details,
                  )}`}
                >
                  {eachData.bank_payment_details}
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.immunisations,
                  )}`}
                >
                  {eachData.immunisations}
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.driving_details,
                  )}`}
                >
                  {eachData.driving_details}
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.health_declarations,
                  )}`}
                >
                  {eachData.health_declarations}
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.disability_discrimination_act,
                  )}`}
                >
                  {eachData.disability_discrimination_act}
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.confidentiality,
                  )}`}
                >
                  {eachData.confidentiality}
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.consent_for_the_use_of_staff_photographic_images,
                  )}`}
                >
                  {eachData.consent_for_the_use_of_staff_photographic_images}
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.personal_declarations,
                  )}`}
                >
                  {eachData.personal_declarations}
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.working_time_regulations_declarations,
                  )}`}
                >
                  {eachData.working_time_regulations_declarations}
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.other_declarations,
                  )}`}
                >
                  {eachData.other_declarations}
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.health_and_safety,
                  )}`}
                >
                  {eachData.health_and_safety}
                </td>
                <td
                  className={`text-center border px-4 py-2 ${coloredRows(
                    eachData.rehabilitation_of_offenders_act_1974,
                  )}`}
                >
                  {eachData.rehabilitation_of_offenders_act_1974}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ComplainceDisplay;
