import React, { useContext, useEffect, useState } from "react";
import ModalWrapper, { ModalContent, ModalTrigger } from "../ModalWrapper";
import Table from "../Table";
import FormTitle from "../Forms/FormTitle";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Notification from "../Notification";
import LoadingState from "../LoadingState";
import { instance } from "@/utils/axiosConfig";

const ManageCertificate = () => {
  const [currentState, setCurrentState] = useState<number>(1);

  let output;

  switch (currentState) {
    case 1:
      output = <AllCertificates />;
      break;
    case 2:
      output = <AddCertificateMandatory />;
      break;

    default:
      break;
  }
  return (
    <ModalWrapper>
      <ModalTrigger>
        <button className="text-xs w-fit bg-green-500/50 px-3 py-2 rounded-md cursor-pointer hover:bg-green-500/70 hover:scale-101 shadow-sm hover:shadow-black/30 active:shadow-black/10 active:scale-98 transition-all duration-300 flex items-center gap-1 ">
          <p className="text-xs">Manage Mandatory Certificates</p>
        </button>
      </ModalTrigger>
      <ModalContent
        className="h-fit max-h-[80%] w-[80%]"
        title={<FormTitle label="Manage Certificates" />}
      >
        <div className="flex flex-col lg:flex-row divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-gray-300 gap-3 ">
          <div className="w-full lg:w-1/6 flex lg:flex-col divide-x-2 divide-gray-200">
            {["All certificates", "Add new certificate"].map(
              (eachNav, index) => {
                return (
                  <p
                    className="text-xs lg:text-sm hover:bg-gray-300/50 cursor-pointer py-2 lg:px-1 px-3 hover:rounded-md duration-300 transition-all "
                    key={index}
                    onClick={() => setCurrentState(index + 1)}
                  >
                    {eachNav}
                  </p>
                );
              },
            )}
          </div>
          <div className="flex-1">{output}</div>
        </div>
      </ModalContent>
    </ModalWrapper>
  );
};

export default ManageCertificate;

const AllCertificates = () => {
  // const certificateContext = useContext(CertificateContext);
  // const { getCertificate } = certificateContext;
  const [allcertificate, setAllCertificate] = useState<null | []>(null);
  const [loadingState, setLoadingState] = useState(true);
  const [reloader, setReloader] = useState<true | false>(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const tableHeader = [
    {
      header: "S/N",
      accessor: "id",
      className: "w-[10%] hidden md:table-cell",
    },
    { header: "Title", accessor: "title", className: "" },
    { header: "Action", accessor: "action", className: "" },
  ];

  const deleteMandatoryCertificateHandler = async (input: any) => {
    try {
      setLoadingState(true);
      // const response = await deleteMandatoryCertificate(input.id);
      const response = await instance.delete(
        `/training/mandatory-certificate/${input.id}`,
      );
      setLoadingState(false);
      setNotification({
        message: response.data.message,
        type: "success",
      });
      setReloader((prev) => !prev);
    } catch (error: any) {
      setLoadingState(false);
      setNotification({
        message: error.response.data.message,
        type: "error",
      });
    }
    return;
  };
  const editMandatoryCertificateHandler = async (input: string, id: any) => {
    if (input.trim() === "") {
      setNotification({
        message: "Certificate name cannot be empty",
        type: "error",
      });

      return;
    }
    try {
      setLoadingState(true);
      // const response = await editMandatoryCertificate({ name: input }, id);
      const response = await instance.put(
        `/training/mandatory-certificate/${id}`,
        { name: input },
      );

      setLoadingState(false);
      setNotification({
        message: response.data.message,
        type: "success",
      });
      setReloader((prev) => !prev);
    } catch (error: any) {
      setLoadingState(false);
      setNotification({
        message: error.response.data.message,
        type: "error",
      });
    }
    return;
  };

  const renderRow = (
    eachCertificate: { id: number; name: string },
    index?: any,
  ) => {
    return (
      <tr
        key={eachCertificate.id}
        className="border-b border-gray-200 even:bg-slate-200/30 hover:bg-blue-200/40 transition-all duration-300 cursor-pointer text-xs"
      >
        <td className="py-3 px-2 hidden md:table-cell">{index + 1}</td>
        <td className="py-3 px-2">{eachCertificate.name}</td>
        <td>
          <div className="flex gap-2 items-center px-2">
            <CustomizeCertificate
              type="edit"
              data={eachCertificate}
              formHandler={(e: any) =>
                editMandatoryCertificateHandler(e, eachCertificate.id)
              }
            />

            <CustomizeCertificate
              type="delete"
              data={eachCertificate}
              formHandler={(e: any) => deleteMandatoryCertificateHandler(e)}
            />
          </div>
        </td>
      </tr>
    );
  };

  useEffect(() => {
    setLoadingState(true);
    const getCertificate = async () => {
      try {
        const response = await instance.get(`training/mandatory-certificate`);
        setAllCertificate(response.data.data);
        setLoadingState(false);
      } catch (error: any) {
        setLoadingState(false);
      }
    };

    getCertificate();
  }, [reloader]);

  return (
    <div className=" flex flex-col gap-3 w-full">
      {notification && (
        <Notification
          message={notification?.message}
          type={notification?.type}
          onClose={() => setNotification(null)}
        />
      )}
      <h3 className="text-sm font-semibold text-gray-600 border-b-2 pb-2 border-gray-200">
        All Mandatory Certificates
      </h3>

      {loadingState ? (
        <LoadingState className="w-full flex justify-center items-center" />
      ) : (
        <div className="w-full">
          {allcertificate ? (
            allcertificate.length > 0 ? (
              <Table
                columns={tableHeader}
                data={allcertificate}
                renderRow={renderRow}
              />
            ) : (
              <p className="text-center text-sm"> Please add a certificate</p>
            )
          ) : (
            <p>Error loading certificate</p>
          )}
        </div>
      )}
    </div>
  );
};

const CustomizeCertificate = ({
  data,
  type,
  formHandler,
}: {
  data?: any;
  type: string;
  formHandler: (input?: string) => void;
}) => {
  const [formInput, setInput] = useState<string>("");

  useEffect(() => {
    if (data?.name) {
      setInput(data.name);
    }
  }, []);

  return (
    <>
      {type === "add" ? (
        <div className=" flex flex-col gap-3 w-full">
          <h3 className="text-sm font-semibold text-gray-600 border-b-2 pb-2 border-gray-200">
            {data ? "Edit/Update" : "Add Mandatory Certificate"}s
          </h3>
          <div>
            <label className="text-xs text-gray-600 font-bold">
              Certificate Title:
            </label>
          </div>
        </div>
      ) : (
        <ModalWrapper>
          <ModalTrigger>
            {type === "edit" ? (
              <FaEdit className="text-blue-500 cursor-pointer text-sm" />
            ) : (
              <MdDeleteOutline className="text-red-500 cursor-pointer  text-sm" />
            )}
          </ModalTrigger>
          <ModalContent
            className="w-[80%] md:w-[30%]"
            title={
              <FormTitle
                label={`${
                  type === "edit" ? "Edit Category" : "Delete confirmation"
                }`}
              />
            }
          >
            {type === "edit" ? (
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-600 font-bold">
                  Certificate Name:
                </label>
                <input
                  type="text"
                  placeholder="Enter certificate name"
                  className="outline-none border-2 border-gray-300 p-2 rounded-md text-xs "
                  id="certificate_name"
                  name="certificate_name"
                  value={formInput}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  onClick={() => formHandler(formInput)}
                  className="text-xs w-fit bg-blue-500/50 px-3 py-1 rounded-md cursor-pointer hover:bg-blue-500/70 hover:scale-105 shadow-xs hover:shadow-black/30 active:shadow-black/10 active:scale-95 transition-all duration-300"
                >
                  Update
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 items-center justify-center">
                <p>Are you sure you want to delete? </p>
                <button
                  className="text-xs w-fit bg-red-500 px-3 py-2 rounded-md cursor-pointer hover:bg-red-600 hover:scale-101 shadow-sm hover:shadow-black/30 active:shadow-black/10 active:scale-98 transition-all duration-300 flex items-center gap-1"
                  onClick={() => formHandler(data)}
                >
                  Delete
                </button>
              </div>
            )}
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

const AddCertificateMandatory = ({ type }: { type?: string }) => {
  const [formInput, setInput] = useState<string>("");
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [loadingState, setLoadingState] = useState(false);

  const handleSubmit = async () => {
    if (formInput.trim() === "") {
      setNotification({
        message: "Certificate name cannot be empty",
        type: "error",
      });

      return;
    }

    try {
      setLoadingState(true);
      const response = await instance.post(`/training/mandatory-certificate`, {
        name: formInput,
      });

      setLoadingState(false);
      setNotification({
        message: response.data.message,
        type: "success",
      });
      setInput("");
    } catch (error: any) {
      setLoadingState(false);
      setNotification({
        message: error.response.data.message,
        type: "error",
      });
    }
    return;
  };

  return (
    <div className="flex flex-col gap-3">
      {notification && (
        <Notification
          message={notification?.message}
          type={notification?.type}
          onClose={() => setNotification(null)}
        />
      )}
      <FormTitle label="Add Mandatory Category" />
      {loadingState ? (
        <LoadingState className="w-full flex justify-center items-center" />
      ) : (
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-600 font-bold">
            Certificate Name:
          </label>
          <input
            type="text"
            placeholder="Enter certificate name"
            className="outline-none border-2 border-gray-300 p-2 rounded-md text-xs md:w-[50%] lg:w-1/3 "
            id="certificate_name"
            name="certificate_name"
            value={formInput}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="text-xs w-fit bg-blue-500/50 px-3 py-1 rounded-md cursor-pointer hover:bg-blue-500/70 hover:scale-105 shadow-xs hover:shadow-black/30 active:shadow-black/10 active:scale-95 transition-all duration-300"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};
