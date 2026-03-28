"use client";
import React, { useState } from "react";
import FormTitle from "../Forms/FormTitle";
import Table from "../Table";
import Pagination from "../Pagination";
import { MdOutlineSignpost } from "react-icons/md";
import { FaRegAddressCard, FaRegClock } from "react-icons/fa";
import { GiDuration } from "react-icons/gi";
import ModalWrapper, { ModalContent, ModalTrigger } from "../ModalWrapper";

const ManageShifts = () => {
  const [display, setDisplay] = useState<number>(1);

  return (
    <div className="w-full h-full flex items-center justify-center p-3">
      <div className="bg-white p-3 w-full md:w-4/5 h-full rounded-md shadow-sm flex flex-col gap-5">
        <div className=" flex flex-wrap divide-x-2 divide-gray-300 border-b-2 pb-3 border-gray-300">
          {["Confirmed Shifts", "Unconfirmed Shifts", "Available Shifts"].map(
            (eachMenu, index) => (
              <p
                key={index}
                className={`text-xs ${
                  display === index + 1 && "bg-gray-400 text-white"
                } font-semibold shadow-sm shadow-gray-200 p-3  cursor-pointer hover:bg-gray-400 hover:text-white transition-all duration-300`}
                onClick={() => setDisplay(index + 1)}
              >
                {eachMenu}
              </p>
            ),
          )}
        </div>
        <div className="w-full flex-1 overflow-y-auto">
          {display === 1 ? (
            <ConfirmedShifts />
          ) : display === 2 ? (
            <UnconfirmedShifts />
          ) : (
            <AvailableShifts />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageShifts;

export const ConfirmedShifts = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [response, setResponse] = useState({
    loading: false,
    error: { status: false, message: "hello" },
    message: "",
  });
  const [paginationSettings, setPaginationSettings] = useState<{
    currentPage: number;
    toShow: number;
  }>({ currentPage: 1, toShow: 10 });
  const headers = [
    { header: "S/N", accessor: "s_n", className: "" },
    { header: "Client Name", accessor: "client_name", className: "" },
    { header: "Address", accessor: "address", className: "" },
    {
      header: "Shift Time/Duration",
      accessor: "shift_time",
      className: "",
    },
    { header: "Date", accessor: "date", className: "" },
    { header: "Actions", accessor: "actions", className: "" },
  ];
  const data = [
    {
      client_name: "John Doe",
      address: "123 Main St",
      postCode: "BRT345",
      date: "2024-06-01",
      shift_time: "09:00 - 17:00",
      duration: "8h",
    },
    {
      client_name: "Jane Smith",
      address: "45 Oxford Road",
      postCode: "OX12 9NJ",
      date: "2024-06-02",
      shift_time: "08:00 - 14:00",
      duration: "6h",
    },
    {
      client_name: "Michael Brown",
      address: "22 Station Lane",
      postCode: "LS11 4QT",
      date: "2024-06-03",
      shift_time: "12:00 - 20:00",
      duration: "8h",
    },
    {
      client_name: "Emily Carter",
      address: "7 Park Avenue",
      postCode: "M1 2AB",
      date: "2024-06-04",
      shift_time: "07:00 - 15:00",
      duration: "8h",
    },
    {
      client_name: "Samuel Lee",
      address: "9 Elm Street",
      postCode: "SW1A 1AA",
      date: "2024-06-05",
      shift_time: "10:00 - 18:00",
      duration: "8h",
    },
    {
      client_name: "Anna Johnson",
      address: "33 Bridge Street",
      postCode: "NE4 7AG",
      date: "2024-06-06",
      shift_time: "14:00 - 22:00",
      duration: "8h",
    },
    {
      client_name: "Daniel White",
      address: "55 Hillcrest Drive",
      postCode: "B1 1AA",
      date: "2024-06-07",
      shift_time: "09:30 - 17:30",
      duration: "8h",
    },
    {
      client_name: "Sarah Green",
      address: "18 Church Road",
      postCode: "SE15 3HB",
      date: "2024-06-08",
      shift_time: "11:00 - 19:00",
      duration: "8h",
    },
    {
      client_name: "Peter Wilson",
      address: "77 Queens Street",
      postCode: "EH1 1BB",
      date: "2024-06-09",
      shift_time: "07:00 - 13:00",
      duration: "6h",
    },
    {
      client_name: "Laura Adams",
      address: "12 Market Square",
      postCode: "CV1 2WT",
      date: "2024-06-10",
      shift_time: "13:00 - 21:00",
      duration: "8h",
    },
  ];

  const handleCancellation = () => {
    // Handle shift cancellation logic here
    console.log("Shift cancelled for reason:", userInput);
    // Clear the input after cancellation
    setUserInput("");
  };

  const renderRow = (rowData: any, index?: number) => {
    return (
      <tr key={rowData.client_name} className="text-xs even:bg-gray-100">
        <td>
          <p className="text-left p-3">
            {index !== undefined ? index + 1 : ""}
          </p>
        </td>
        <td className="p-3">
          <p>{rowData.client_name}</p>
        </td>
        <td className="p-3">
          <div className="flex flex-col gap-1">
            <p className="flex gap-3 items-center">
              <span>
                <MdOutlineSignpost className="text-sm font-semibold" />
              </span>
              {rowData.postCode}
            </p>
            <p className="flex gap-3 items-center">
              <span>
                <FaRegAddressCard className="text-sm font-semibold" />
              </span>
              {rowData.address}
            </p>
          </div>
        </td>
        <td className="p-3">
          <div className="flex flex-col gap-1">
            <p className="flex gap-3 items-center">
              <span>
                <FaRegClock className="text-sm font-semibold" />
              </span>
              {rowData.shift_time}
            </p>
            <p className="flex gap-3 items-center">
              <span>
                <GiDuration className="text-sm font-semibold" />
              </span>
              {rowData.duration}
            </p>
          </div>
        </td>
        <td className="p-3">
          <p>{rowData.date}</p>
        </td>
        <td className="p-3">
          <div className="flex items-center justify-center">
            <ModalWrapper>
              <ModalTrigger>
                <button className="text-xs bg-red-500 text-white px-3 py-1 rounded-sm cursor-pointer active:scale-95 active:shadow-black/10 shadow-sm hover:shadow-black/30 hover:scale-105 transition-all duration-300">
                  Cancel Shift
                </button>
              </ModalTrigger>
              <ModalContent
                className="w-1/3"
                title={<FormTitle label="Cancel Shift" />}
              >
                <div className=" flex flex-col gap-5 w-full">
                  <div className="w-full flex flex-col gap-2 ">
                    <label className="text-xs text-gray-600 font-bold">
                      Reason for cancellation:
                    </label>
                    <textarea
                      id={"reason"}
                      rows={4}
                      cols={6}
                      placeholder="Write your text here..."
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      className="outline-none border-2 border-gray-300 px-2 py-4 rounded-md text-xs "
                    />
                  </div>
                  <div className="w-full flex flex-col gap-3 items-center justify-center">
                    <button
                      onClick={handleCancellation}
                      className="text-xs bg-red-500 text-white px-3 py-1 rounded-sm cursor-pointer active:scale-95 active:shadow-black/10 shadow-sm hover:shadow-black/30 hover:scale-105 transition-all duration-300"
                    >
                      Cancel Shift
                    </button>
                    {response.error.status ? (
                      <p className="text-red-400 text-xs">
                        {response.error.message}
                      </p>
                    ) : (
                      response.message.length > 0 && (
                        <p className=" text-xs">{response.message}</p>
                      )
                    )}
                  </div>
                </div>
              </ModalContent>
            </ModalWrapper>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div className="w-full h-full flex flex-col gap-3 overflow-y-auto">
      <FormTitle label="Confirmed Shifts" />
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
        <div className="flex-1 overflow-y-auto">
          <Table columns={headers} data={data} renderRow={renderRow} />
        </div>
        <div className="items-self-end ">
          <Pagination
            arrayLength={data.length}
            toShow={paginationSettings.toShow}
            currentPageHandler={(currentPage) =>
              setPaginationSettings((prev) => ({ ...prev, currentPage }))
            }
          />
        </div>
      </div>
    </div>
  );
};
export const UnconfirmedShifts = () => {
  const [response, setResponse] = useState({
    loading: false,
    error: { status: false, message: "hello" },
    message: "",
  });
  const [paginationSettings, setPaginationSettings] = useState<{
    currentPage: number;
    toShow: number;
  }>({ currentPage: 1, toShow: 10 });
  const headers = [
    { header: "S/N", accessor: "s_n", className: "" },
    { header: "Client Name", accessor: "client_name", className: "" },
    { header: "Address", accessor: "address", className: "" },
    {
      header: "Shift Time/Duration",
      accessor: "shift_time",
      className: "",
    },
    { header: "Date", accessor: "date", className: "" },
    { header: "Actions", accessor: "actions", className: "" },
  ];
  const data = [
    {
      client_name: "John Doe",
      address: "123 Main St",
      postCode: "BRT345",
      date: "2024-06-01",
      shift_time: "09:00 - 17:00",
      duration: "8h",
    },
    {
      client_name: "Jane Smith",
      address: "45 Oxford Road",
      postCode: "OX12 9NJ",
      date: "2024-06-02",
      shift_time: "08:00 - 14:00",
      duration: "6h",
    },
    {
      client_name: "Michael Brown",
      address: "22 Station Lane",
      postCode: "LS11 4QT",
      date: "2024-06-03",
      shift_time: "12:00 - 20:00",
      duration: "8h",
    },
    {
      client_name: "Emily Carter",
      address: "7 Park Avenue",
      postCode: "M1 2AB",
      date: "2024-06-04",
      shift_time: "07:00 - 15:00",
      duration: "8h",
    },
    {
      client_name: "Samuel Lee",
      address: "9 Elm Street",
      postCode: "SW1A 1AA",
      date: "2024-06-05",
      shift_time: "10:00 - 18:00",
      duration: "8h",
    },
    {
      client_name: "Anna Johnson",
      address: "33 Bridge Street",
      postCode: "NE4 7AG",
      date: "2024-06-06",
      shift_time: "14:00 - 22:00",
      duration: "8h",
    },
    {
      client_name: "Daniel White",
      address: "55 Hillcrest Drive",
      postCode: "B1 1AA",
      date: "2024-06-07",
      shift_time: "09:30 - 17:30",
      duration: "8h",
    },
    {
      client_name: "Sarah Green",
      address: "18 Church Road",
      postCode: "SE15 3HB",
      date: "2024-06-08",
      shift_time: "11:00 - 19:00",
      duration: "8h",
    },
    {
      client_name: "Peter Wilson",
      address: "77 Queens Street",
      postCode: "EH1 1BB",
      date: "2024-06-09",
      shift_time: "07:00 - 13:00",
      duration: "6h",
    },
    {
      client_name: "Laura Adams",
      address: "12 Market Square",
      postCode: "CV1 2WT",
      date: "2024-06-10",
      shift_time: "13:00 - 21:00",
      duration: "8h",
    },
  ];

  const handleCancellation = () => {
    // Handle shift cancellation logic here
    console.log("Shift cancelled for reason:");
    // Clear the input after cancellation
  };

  const renderRow = (rowData: any, index?: number) => {
    return (
      <tr key={rowData.client_name} className="text-xs even:bg-gray-100">
        <td>
          <p className="text-left p-3">
            {index !== undefined ? index + 1 : ""}
          </p>
        </td>
        <td className="p-3">
          <p>{rowData.client_name}</p>
        </td>
        <td className="p-3">
          <div className="flex flex-col gap-1">
            <p className="flex gap-3 items-center">
              <span>
                <MdOutlineSignpost className="text-sm font-semibold" />
              </span>
              {rowData.postCode}
            </p>
            <p className="flex gap-3 items-center">
              <span>
                <FaRegAddressCard className="text-sm font-semibold" />
              </span>
              {rowData.address}
            </p>
          </div>
        </td>
        <td className="p-3">
          <div className="flex flex-col gap-1">
            <p className="flex gap-3 items-center">
              <span>
                <FaRegClock className="text-sm font-semibold" />
              </span>
              {rowData.shift_time}
            </p>
            <p className="flex gap-3 items-center">
              <span>
                <GiDuration className="text-sm font-semibold" />
              </span>
              {rowData.duration}
            </p>
          </div>
        </td>
        <td className="p-3">
          <p>{rowData.date}</p>
        </td>
        <td className="p-3">
          <div className="flex items-center justify-center">
            <button
              onClick={handleCancellation}
              className="text-xs bg-red-500 text-white px-3 py-1 rounded-sm cursor-pointer active:scale-95 active:shadow-black/10 shadow-sm hover:shadow-black/30 hover:scale-105 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div className="w-full h-full flex flex-col gap-3 overflow-y-auto">
      <FormTitle label="Unconfirmed Shifts" />
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
        <div className="flex-1 overflow-y-auto">
          <Table columns={headers} data={data} renderRow={renderRow} />
        </div>
        <div className="items-self-end ">
          <Pagination
            arrayLength={data.length}
            toShow={paginationSettings.toShow}
            currentPageHandler={(currentPage) =>
              setPaginationSettings((prev) => ({ ...prev, currentPage }))
            }
          />
        </div>
      </div>
    </div>
  );
};
export const AvailableShifts = () => {
  const [response, setResponse] = useState({
    loading: false,
    error: { status: false, message: "hello" },
    message: "",
  });

  const [paginationSettings, setPaginationSettings] = useState<{
    currentPage: number;
    toShow: number;
  }>({ currentPage: 1, toShow: 10 });
  const headers = [
    { header: "S/N", accessor: "s_n", className: "" },
    { header: "Client Name", accessor: "client_name", className: "" },
    { header: "Address", accessor: "address", className: "" },
    {
      header: "Shift Time/Duration",
      accessor: "shift_time",
      className: "",
    },
    { header: "Date", accessor: "date", className: "" },
    { header: "Actions", accessor: "actions", className: "" },
  ];
  const data = [
    {
      client_name: "John Doe",
      address: "123 Main St",
      postCode: "BRT345",
      date: "2024-06-01",
      shift_time: "09:00 - 17:00",
      duration: "8h",
    },
    {
      client_name: "Jane Smith",
      address: "45 Oxford Road",
      postCode: "OX12 9NJ",
      date: "2024-06-02",
      shift_time: "08:00 - 14:00",
      duration: "6h",
    },
    {
      client_name: "Michael Brown",
      address: "22 Station Lane",
      postCode: "LS11 4QT",
      date: "2024-06-03",
      shift_time: "12:00 - 20:00",
      duration: "8h",
    },
    {
      client_name: "Emily Carter",
      address: "7 Park Avenue",
      postCode: "M1 2AB",
      date: "2024-06-04",
      shift_time: "07:00 - 15:00",
      duration: "8h",
    },
    {
      client_name: "Samuel Lee",
      address: "9 Elm Street",
      postCode: "SW1A 1AA",
      date: "2024-06-05",
      shift_time: "10:00 - 18:00",
      duration: "8h",
    },
    {
      client_name: "Anna Johnson",
      address: "33 Bridge Street",
      postCode: "NE4 7AG",
      date: "2024-06-06",
      shift_time: "14:00 - 22:00",
      duration: "8h",
    },
    {
      client_name: "Daniel White",
      address: "55 Hillcrest Drive",
      postCode: "B1 1AA",
      date: "2024-06-07",
      shift_time: "09:30 - 17:30",
      duration: "8h",
    },
    {
      client_name: "Sarah Green",
      address: "18 Church Road",
      postCode: "SE15 3HB",
      date: "2024-06-08",
      shift_time: "11:00 - 19:00",
      duration: "8h",
    },
    {
      client_name: "Peter Wilson",
      address: "77 Queens Street",
      postCode: "EH1 1BB",
      date: "2024-06-09",
      shift_time: "07:00 - 13:00",
      duration: "6h",
    },
    {
      client_name: "Laura Adams",
      address: "12 Market Square",
      postCode: "CV1 2WT",
      date: "2024-06-10",
      shift_time: "13:00 - 21:00",
      duration: "8h",
    },
  ];

  const handleCancellation = () => {
    // Handle shift cancellation logic here
    console.log("Shift cancelled for reason:");
    // Clear the input after cancellation
  };

  const renderRow = (rowData: any, index?: number) => {
    return (
      <tr key={rowData.client_name} className="text-xs even:bg-gray-100">
        <td>
          <p className="text-left p-3">
            {index !== undefined ? index + 1 : ""}
          </p>
        </td>
        <td className="p-3">
          <p>{rowData.client_name}</p>
        </td>
        <td className="p-3">
          <div className="flex flex-col gap-1">
            <p className="flex gap-3 items-center">
              <span>
                <MdOutlineSignpost className="text-sm font-semibold" />
              </span>
              {rowData.postCode}
            </p>
            <p className="flex gap-3 items-center">
              <span>
                <FaRegAddressCard className="text-sm font-semibold" />
              </span>
              {rowData.address}
            </p>
          </div>
        </td>
        <td className="p-3">
          <div className="flex flex-col gap-1">
            <p className="flex gap-3 items-center">
              <span>
                <FaRegClock className="text-sm font-semibold" />
              </span>
              {rowData.shift_time}
            </p>
            <p className="flex gap-3 items-center">
              <span>
                <GiDuration className="text-sm font-semibold" />
              </span>
              {rowData.duration}
            </p>
          </div>
        </td>
        <td className="p-3">
          <p>{rowData.date}</p>
        </td>
        <td className="p-3">
          <div className="flex items-center justify-center">
            <button
              onClick={handleCancellation}
              className="text-xs bg-green-900 text-white px-3 py-1 rounded-sm cursor-pointer active:scale-95 active:shadow-black/10 shadow-sm hover:shadow-black/30 hover:scale-105 transition-all duration-300"
            >
              Apply
            </button>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div className="w-full h-full flex flex-col gap-3 overflow-y-auto">
      <FormTitle label="Available Shifts" />
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
        <div className="flex-1 overflow-y-auto">
          <Table columns={headers} data={data} renderRow={renderRow} />
        </div>
        <div className="items-self-end ">
          <Pagination
            arrayLength={data.length}
            toShow={paginationSettings.toShow}
            currentPageHandler={(currentPage) =>
              setPaginationSettings((prev) => ({ ...prev, currentPage }))
            }
          />
        </div>
      </div>
    </div>
  );
};
