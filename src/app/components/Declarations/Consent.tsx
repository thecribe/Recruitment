"use client";
import FormProvider from "@/app/Context/FormContext";
import FormWrapper from "../Forms/FormWrapper";
import { ConsentSchema } from "@/utils/ZodSchema";
import AuditButton from "../AuditButton";
import { FormProfileContext } from "../Screening/FormDisplay";
import { useContext } from "react";
import dayjs from "dayjs";
import { formAccessRole } from "@/utils/data";

const ConsentFormData = [
  {
    type: "file",
    label: "Signature",
    accessor: "signature",
  },
  {
    type: "date",
    label: "Date",
    accessor: "date",
  },
];

const Consent = () => {
  const { initialData, auditStatusHandle, formInputHandle, user } =
    useContext(FormProfileContext);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end w-full items-center">
        {formAccessRole.includes(user.role.slug) && (
          <AuditButton
            buttonState={initialData?.audit_status}
            onClickFunction={() =>
              auditStatusHandle({ audit_status: initialData?.audit_status })
            }
          />
        )}
      </div>
      <p className="text-sm text-black">
        To comply with the principle, set out in the Data Protection Act 2018
        and GDPR, Arise Nursing requires consent to take and use staff
        photographic images. By signing this declaration, you authorise Arise
        Nursing to use your images in publications, promotions, social media,
        advertising, website and any other digital media or filming which Arise
        Nursing approves and authorise. If you should wish to withdraw your
        consent at any time, please contact us at info@arisenursing.co.uk.
        Please note that although your images will be removed from our data base
        on request, we cannot guarantee it will not be in circulation in any
        media produced prior to your request. I hereby consent for my
        photographic images to be used as stated above.
      </p>

      <FormProvider
        typeSchema={ConsentSchema}
        controlFunction={(data: any, deleteType?: "file_delete") =>
          formInputHandle(data, deleteType)
        }
        defaultInput={{
          ...initialData,
          date: initialData?.date
            ? dayjs(initialData?.date).format("YYYY-MM-DD")
            : "",
        }}
      >
        <FormWrapper
          data={ConsentFormData}
          auditCheck={initialData?.audit_status || false}
          className={"flex flex-col gap-5 md:w-2/3"}
        />
      </FormProvider>
    </div>
  );
};

export default Consent;
