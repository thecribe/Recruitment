import FormTitle from "@/app/components/Forms/FormTitle";
import FormWrapper from "@/app/components/Forms/FormWrapper";
import FormProvider from "@/app/Context/FormContext";
import { AddDataSchema } from "@/utils/ZodSchema";
import React, { useContext, useEffect } from "react";
import z from "zod";
import { DepartmentContext } from "./TypeHolder";
import { instance } from "@/utils/axiosConfig";

const AddInfo = ({
  type,
  defaultdata,
  displaytype,
}: {
  type?: string;
  defaultdata?: any;
  displaytype: string;
}) => {
  const { loader, setLoader, setNotification, viewType } =
    useContext(DepartmentContext);

  const formInputHandler = async (data: z.infer<typeof AddDataSchema>) => {
    setLoader(true);

    if (defaultdata) {
      try {
        const newData = { ...defaultdata, ...data };
        // const response = await editDepartment(newData, displaytype);
        const response = await instance.put(
          `/${displaytype}?id=${defaultdata.id}`,
          newData,
        );
        setNotification({
          message: `${defaultdata.title} updated successfully`,
          type: "success",
        });
        setLoader(false);
      } catch (error: any) {
        setNotification({
          message: error.response.data.message,
          type: "error",
        });
        setLoader(false);
      }
    } else {
      try {
        const response = await instance.post(`/${displaytype}`, data);
        // const response = await addDepartment(data, displaytype);

        setNotification({
          message: `New category created successfully`,
          type: "success",
        });
        setLoader(false);
      } catch (error: any) {
        setNotification({
          message: error.response.data.message,
          type: "error",
        });
        setLoader(false);
      }
    }
  };

  return (
    <div>
      <div className="w-full">
        <FormProvider
          typeSchema={AddDataSchema}
          controlFunction={formInputHandler}
          defaultInput={defaultdata ? defaultdata : undefined}
        >
          <FormWrapper data={ADDDATA} className={" grid grid-cols-1 gap-5"} />
        </FormProvider>
      </div>
    </div>
  );
};

export default AddInfo;

const ADDDATA = [
  {
    type: "text",
    label: "Title",
    accessor: "title",
  },
  {
    type: "text",
    label: "Slug",
    accessor: "slug",
  },
];
