"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import FormTitle from "../Forms/FormTitle";
import CertificateBox from "./CertificateBox";

import LoadingState from "../LoadingState";
import UploadCertificate from "./UploadCertificate";
import Notification from "../Notification";
import AuditButton from "../AuditButton";
import { AuthContext } from "@/app/Context/AuthContext";
import { instance } from "@/utils/axiosConfig";
import { formAccessRole } from "@/utils/data";

export const CertificateContext = createContext<any | undefined>(undefined);
const TrainingWrapper = ({ applicantId }: { applicantId: string }) => {
  const [mandatoryCertificate, setMandatoryCertificate] = useState<null | []>(
    null,
  );
  const [applicantCertificate, setApplicantCertificate] = useState<any>(null);
  const [loadingState, setLoadingState] = useState(true);
  const [reloader, setReloader] = useState<true | false>(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const { user } = useContext(AuthContext);

  //Other Applicable Certificates logic

  let otherApplicableCertificates: any = [];

  if (applicantCertificate && applicantCertificate.length > 0) {
    otherApplicableCertificates = [...applicantCertificate];

    mandatoryCertificate?.forEach((eachMandatoryCert: any) => {
      const certIndex = otherApplicableCertificates.findIndex(
        (eachcert: any) =>
          eachcert.mandatory_certificateId === eachMandatoryCert.id,
      );
      if (certIndex !== -1) {
        otherApplicableCertificates.splice(certIndex, 1);
      }
    });
  }

  const auditStatusHandle = async (audit_status: any) => {
    setLoadingState(true);
    try {
      const response = await instance.patch(
        `/training/audit-status/${applicantId}`,
        audit_status,
      );

      setLoadingState(false);
      setNotification({
        message: response.data.message,
        type: "success",
      });
      setReloader((prev: boolean) => !prev);
    } catch (error: any) {
      setLoadingState(false);
      setNotification({
        message: error.response.data.message,
        type: "error",
      });
    }
  };

  useEffect(() => {
    const getMandantoryCert = async () => {
      try {
        const response = await instance.get(`training/mandatory-certificate`);
        setMandatoryCertificate(response.data.data);
        setLoadingState(false);
      } catch (error: any) {
        setLoadingState(false);
      }
    };
    getMandantoryCert();
  }, []);

  useEffect(() => {
    setLoadingState(true);
    const getAllUserCert = async () => {
      try {
        const response = await instance.get(
          `/training/certificate/${applicantId}`,
        );

        setApplicantCertificate(response.data.data);
        setLoadingState(false);
      } catch (error: any) {
        setLoadingState(false);
      }
    };
    getAllUserCert();
  }, [reloader]);

  return loadingState ? (
    <LoadingState className="w-full flex justify-center items-center" />
  ) : (
    <CertificateContext.Provider
      value={{
        applicantId,
        setReloader,
        setNotification,
        loadingState,
        setLoadingState,
      }}
    >
      <div className="flex flex-col gap-5 bg-white h-full rounded-md p-3 overflow-y-auto">
        {notification && (
          <Notification
            message={notification?.message}
            type={notification?.type}
            onClose={() => setNotification(null)}
          />
        )}
        <div className="flex flex-col md:flex-row gap-3 md:items-center justify-end">
          {formAccessRole.includes(user.role.slug) && (
            <AuditButton
              buttonState={
                applicantCertificate && applicantCertificate[0]?.audit_status
              }
              onClickFunction={() =>
                auditStatusHandle({
                  audit_status: applicantCertificate
                    ? applicantCertificate[0]?.audit_status
                    : false,
                })
              }
            />
          )}
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-500 font-semibold">
            Upload Certificates: Please upload your certificates in one of the
            following formats: JPG, PNG, or PDF.
          </p>
          <p className="text-sm text-gray-500">
            Please click the following buttons to select file from your device.
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <FormTitle label="Mandatory Certificates" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {
                mandatoryCertificate?.length===0 && <p>No mandatory certificate</p>
           }
              {mandatoryCertificate?.map(
              (eachMandatoryCert: any, index: number) => {
                let matchedApplicantCert;
                if (applicantCertificate) {
                  matchedApplicantCert = applicantCertificate?.find(
                    (eachApplicantCert: any) =>
                      eachApplicantCert.mandatory_certificateId ===
                      eachMandatoryCert.id,
                  );
                } else {
                  matchedApplicantCert = null;
                }

                return (
                  <CertificateBox
                    key={eachMandatoryCert.id}
                    mandatoryCertificateData={eachMandatoryCert}
                    defaultApplicantData={matchedApplicantCert}
                  />
                );
              },
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <FormTitle label="Other Applicable Certificates" />
          <UploadCertificate />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {otherApplicableCertificates.length > 0 ? (
              otherApplicableCertificates.map((eachCert: any) => (
                <CertificateBox
                  key={eachCert.id}
                  defaultApplicantData={eachCert}
                  type="other"
                />
              ))
            ) : (
              <p>No other certificate uploaded</p>
            )}
          </div>
        </div>
      </div>
    </CertificateContext.Provider>
  );
};

export default TrainingWrapper;
