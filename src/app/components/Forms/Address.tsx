"use client";
import { AddressSchema } from "@/utils/ZodSchema";
import { useContext } from "react";

import FormProvider from "@/app/Context/FormContext";
import FormWrapper from "./FormWrapper";
import FormTitle from "./FormTitle";
import AuditButton from "../AuditButton";

import { FormProfileContext } from "../Screening/FormDisplay";

import dayjs from "dayjs";
import { formAccessRole } from "@/utils/data";

const Address = () => {
  const { initialData, auditStatusHandle, formInputHandle, defaultdata, user } =
    useContext(FormProfileContext);

  const CurrentAddressFormData = [
    {
      type: "text",
      label: "House Number",
      accessor: "house_number",
    },
    {
      type: "text",
      label: "Address Line 1",
      accessor: "address",
    },
    {
      type: "text",
      label: "City",
      accessor: "city",
    },
    {
      type: "text",
      label: "State/Region/Province",
      accessor: "state",
    },
    {
      type: "text",
      label: "Postal/Zip Code",
      accessor: "postal_code",
    },

    {
      type: "select",
      label: "Country",
      accessor: "country",
      options: defaultdata.countries,
    },
    {
      type: "date",
      label: "From Date",
      accessor: "from_date",
    },
    {
      type: "date",
      label: "To Date",
      accessor: "to_date",
    },

    {
      type: "file",
      label: "Proof of Address",
      accessor: "proof_of_address",
    },
  ];

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <FormTitle label="Current Address" />
        {formAccessRole.includes(user.role.slug) && (
          <AuditButton
            buttonState={initialData?.audit_status}
            onClickFunction={() =>
              auditStatusHandle({ audit_status: initialData?.audit_status })
            }
          />
        )}
      </div>

      <FormProvider
        typeSchema={AddressSchema}
        controlFunction={(data: any, deleteType?: "file_delete") =>
          formInputHandle(data, deleteType)
        }
        defaultInput={{
          ...initialData,
          from_date: dayjs(initialData?.from_date).format("YYYY-MM-DD"),
          to_date: dayjs(initialData?.to_date).format("YYYY-MM-DD"),
        }}
      >
        <FormWrapper
          auditCheck={initialData?.audit_status}
          data={CurrentAddressFormData}
          className={"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5"}
        />
      </FormProvider>
    </div>
  );
};

export default Address;
