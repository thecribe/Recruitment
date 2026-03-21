"use client";
import React, { Fragment, useRef } from "react";

import { FaFile } from "react-icons/fa";
import Button from "../Button";

const ProfilePrint = ({ id }: { id: number | string }) => {
  const pdfRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    //   const tables = pdfRef.current?.querySelectorAll("table");
    //   if (!tables) return;
    //   const pdf = new jsPDF("p", "mm", "a4");
    //   const pageWidth = 210;
    //   const pageHeight = 297;
    //   const margin = 10;
    //   let currentHeight = margin;
    //   for (let i = 0; i < tables.length; i++) {
    //     const table = tables[i] as HTMLElement;
    //     const canvas = await html2canvas(table, { scale: 2, useCORS: true });
    //     const imgData = canvas.toDataURL("image/png");
    //     const imgProps = pdf.getImageProperties(imgData);
    //     const pdfImgWidth = pageWidth - 2 * margin;
    //     const pdfImgHeight = (imgProps.height * pdfImgWidth) / imgProps.width;
    //     // Check if current table fits the current page
    //     if (currentHeight + pdfImgHeight > pageHeight - margin) {
    //       pdf.addPage();
    //       currentHeight = margin;
    //     }
    //     pdf.addImage(
    //       imgData,
    //       "PNG",
    //       margin,
    //       currentHeight,
    //       pdfImgWidth,
    //       pdfImgHeight,
    //     );
    //     currentHeight += pdfImgHeight + 5; // 5mm spacing
    //   }
    //   pdf.save("ClientProfile.pdf");
  };
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col gap-5" ref={pdfRef}>
        {/* Personal Info */}
        <table className="w-full table-auto border-collapse border border-gray-400 ">
          <thead>
            <tr>
              <th
                colSpan={3}
                className="text-left uppercase bg-blue-500/50 text-black  px-3 py-2 text-xs font-semibold"
              >
                Personal Infomation
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  Title<span className="text-gray-400">Name</span>
                </p>
              </td>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  Firstname<span className="text-gray-400">john</span>
                </p>
              </td>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  Lastname<span className="text-gray-400">doe</span>
                </p>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  Gender<span className="text-gray-400">Name</span>
                </p>
              </td>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  Date of Birth<span className="text-gray-400">john</span>
                </p>
              </td>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  Nationality<span className="text-gray-400">doe</span>
                </p>
              </td>
            </tr>
            <tr>
              <td
                className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3"
                colSpan={3}
              >
                <p className="flex flex-col gap-1">
                  Visa Type<span className="text-gray-400">Name</span>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        {/* Contact Address */}
        <table className="w-full table-auto border-collapse border border-gray-400 ">
          <thead>
            <tr>
              <th
                colSpan={3}
                className="text-left uppercase bg-blue-500/50 text-black  px-3 py-2 text-xs font-semibold"
              >
                Current Address
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  Address<span className="text-gray-400">Name</span>
                </p>
              </td>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  City/State<span className="text-gray-400">john</span>
                </p>
              </td>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  Postal/Zip Code<span className="text-gray-400">doe</span>
                </p>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  Country<span className="text-gray-400">Name</span>
                </p>
              </td>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  From Date<span className="text-gray-400">john</span>
                </p>
              </td>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  To Date<span className="text-gray-400">doe</span>
                </p>
              </td>
            </tr>
            <tr>
              <td
                className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3"
                colSpan={3}
              >
                <div className="flex items-center gap-2">
                  <p className="flex flex-col gap-1">Proof of Address:</p>
                  <FaFile className="text-gray-400 mt-1 text-2xl cursor-pointer" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        {/* Passport & NI Number */}
        <table className="w-full table-auto border-collapse border border-gray-400 ">
          <thead>
            <tr>
              <th
                colSpan={3}
                className="text-left uppercase bg-blue-500/50 text-black  px-3 py-2 text-xs font-semibold"
              >
                Passport Size Photo & Ni Number
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3"
                colSpan={3}
              >
                <div className="flex items-center gap-2">
                  <p className="flex flex-col gap-1">
                    Upload 2x Passport Size Photos
                  </p>
                  <FaFile className="text-gray-400 mt-1 text-2xl cursor-pointer" />
                </div>
              </td>
            </tr>
            <tr>
              <td
                className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3"
                colSpan={3}
              >
                <div className="flex items-center gap-2">
                  <p className="flex flex-col gap-1">
                    Upload Proof of National Insurance Number
                  </p>
                  <FaFile className="text-gray-400 mt-1 text-2xl cursor-pointer" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        {/* Upload Proof of National Insurance Number */}
        <table className="w-full table-auto border-collapse border border-gray-400 ">
          <thead>
            <tr>
              <th
                colSpan={3}
                className="text-left uppercase bg-blue-500/50 text-black  px-3 py-2 text-xs font-semibold"
              >
                Resume and Birth Certificate
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3"
                colSpan={3}
              >
                <div className="flex items-center gap-2">
                  <p className="flex flex-col gap-1">Upload your latest CV</p>
                  <FaFile className="text-gray-400 mt-1 text-2xl cursor-pointer" />
                </div>
              </td>
            </tr>
            <tr>
              <td
                className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3"
                colSpan={3}
              >
                <div className="flex items-center gap-2">
                  <p className="flex flex-col gap-1">
                    Upload your Date of Birth Certificate
                  </p>
                  <FaFile className="text-gray-400 mt-1 text-2xl cursor-pointer" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        {/* Contact Information */}
        <table className="w-full table-auto border-collapse border border-gray-400 ">
          <thead>
            <tr>
              <th
                colSpan={3}
                className="text-left uppercase bg-blue-500/50 text-black  px-3 py-2 text-xs font-semibold"
              >
                Contact Information
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  Mobile Number<span className="text-gray-400">Name</span>
                </p>
              </td>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  Land Line<span className="text-gray-400">Name</span>
                </p>
              </td>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  Email<span className="text-gray-400">Name</span>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        {/* Emergency Contact */}
        <table className="w-full table-auto border-collapse border border-gray-400 ">
          <thead>
            <tr>
              <th
                colSpan={3}
                className="text-left uppercase bg-blue-500/50 text-black  px-3 py-2 text-xs font-semibold"
              >
                Emergency Contact
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  Name of Next of Kin:
                  <span className="text-gray-400">Name</span>
                </p>
              </td>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  Relationship<span className="text-gray-400">Name</span>
                </p>
              </td>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  Address Line 1<span className="text-gray-400">Name</span>
                </p>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  City<span className="text-gray-400">Name</span>
                </p>
              </td>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  State/Region/Province
                  <span className="text-gray-400">Name</span>
                </p>
              </td>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  Postal/Zip Code<span className="text-gray-400">Name</span>
                </p>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  Country<span className="text-gray-400">Name</span>
                </p>
              </td>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  Mobile Number<span className="text-gray-400">Name</span>
                </p>
              </td>
              <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/3">
                <p className="flex flex-col gap-1">
                  Email<span className="text-gray-400">Name</span>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        {/* Current Job Information */}
        <table className="w-full table-auto border-collapse border border-gray-400 ">
          <thead>
            <tr>
              <th
                colSpan={4}
                className="text-left uppercase bg-blue-500/50 text-black  px-3 py-2 text-xs font-semibold"
              >
                Current Job Information
              </th>
            </tr>
          </thead>
          <tbody>
            <Fragment>
              <tr>
                <td
                  rowSpan={2}
                  className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/5"
                >
                  <p className="flex flex-col gap-1">
                    Job Title:<span className="text-gray-400">Name</span>
                  </p>
                </td>
                <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/5">
                  <p className="flex flex-col gap-1">
                    Job Title:<span className="text-gray-400">Name</span>
                  </p>
                </td>
                <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-2/5">
                  <p className="flex flex-col gap-1">
                    Current Place of Work
                    <span className="text-gray-400">Name</span>
                  </p>
                </td>
                <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/5">
                  <p className="flex flex-col gap-1">
                    Current Pay p/hour
                    <span className="text-gray-400">Name</span>
                  </p>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/5">
                  <p className="flex flex-col gap-1">
                    Day/Night Shift<span className="text-gray-400">Name</span>
                  </p>
                </td>
                <td
                  colSpan={2}
                  className="border border-gray-400/40 px-2 py-2 text-xs font-semibold"
                >
                  <p className="flex flex-col gap-1">
                    Duties<span className="text-gray-400">Name</span>
                  </p>
                </td>
              </tr>
            </Fragment>
          </tbody>
        </table>
        {/* Previous Job Information */}
        <table className="w-full table-auto border-collapse border border-gray-400 ">
          <thead>
            <tr>
              <th
                colSpan={4}
                className="text-left uppercase bg-blue-500/50 text-black  px-3 py-2 text-xs font-semibold"
              >
                Previous Job Information
              </th>
            </tr>
          </thead>
          <tbody>
            <Fragment>
              <tr>
                <td
                  rowSpan={2}
                  className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/5"
                >
                  <p className="flex flex-col gap-1">
                    Job Title:<span className="text-gray-400">Name</span>
                  </p>
                </td>
                <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/5">
                  <p className="flex flex-col gap-1">
                    Job Title:<span className="text-gray-400">Name</span>
                  </p>
                </td>
                <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-2/5">
                  <p className="flex flex-col gap-1">
                    Current Place of Work
                    <span className="text-gray-400">Name</span>
                  </p>
                </td>
                <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/5">
                  <p className="flex flex-col gap-1">
                    Current Pay p/hour
                    <span className="text-gray-400">Name</span>
                  </p>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/5">
                  <p className="flex flex-col gap-1">
                    Day/Night Shift<span className="text-gray-400">Name</span>
                  </p>
                </td>
                <td
                  colSpan={2}
                  className="border border-gray-400/40 px-2 py-2 text-xs font-semibold"
                >
                  <p className="flex flex-col gap-1">
                    Duties<span className="text-gray-400">Name</span>
                  </p>
                </td>
              </tr>
            </Fragment>
          </tbody>
        </table>
        {/* Educational Qualifications */}
        <table className="w-full table-auto border-collapse border border-gray-400 ">
          <thead>
            <tr>
              <th
                colSpan={4}
                className="text-left uppercase bg-blue-500/50 text-black  px-3 py-2 text-xs font-semibold"
              >
                Educational Qualification
              </th>
            </tr>
          </thead>
          <tbody>
            <Fragment>
              <tr>
                <td
                  rowSpan={2}
                  className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/5"
                >
                  <p className="flex flex-col gap-1">
                    Job Title:<span className="text-gray-400">Name</span>
                  </p>
                </td>
                <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/5">
                  <p className="flex flex-col gap-1">
                    Job Title:<span className="text-gray-400">Name</span>
                  </p>
                </td>
                <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-2/5">
                  <p className="flex flex-col gap-1">
                    Current Place of Work
                    <span className="text-gray-400">Name</span>
                  </p>
                </td>
                <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/5">
                  <p className="flex flex-col gap-1">
                    Current Pay p/hour
                    <span className="text-gray-400">Name</span>
                  </p>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400/40 px-2 py-2 text-xs font-semibold w-1/5">
                  <p className="flex flex-col gap-1">
                    Day/Night Shift<span className="text-gray-400">Name</span>
                  </p>
                </td>
                <td
                  colSpan={2}
                  className="border border-gray-400/40 px-2 py-2 text-xs font-semibold"
                >
                  <p className="flex flex-col gap-1">
                    Duties<span className="text-gray-400">Name</span>
                  </p>
                </td>
              </tr>
            </Fragment>
          </tbody>
        </table>
      </div>
      <div className="w-fit" onClick={downloadPDF}>
        <Button label="Print" />
      </div>
    </div>
  );
};

export default ProfilePrint;
