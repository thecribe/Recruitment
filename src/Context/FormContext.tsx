"use client";
import React, { createContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const FormContext = createContext<any | undefined>(undefined);

const FormProvider = ({
  children,
  typeSchema,
  defaultInput,
  controlFunction,
}: {
  children?: React.ReactNode;
  typeSchema: any;
  defaultInput?: z.infer<typeof typeSchema>;
  controlFunction: any;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof typeSchema>>({
    resolver: zodResolver(typeSchema),
    defaultValues: defaultInput,
  });

  const onSubmit = handleSubmit((data: z.infer<typeof typeSchema>) => {
    controlFunction(data);
  });

  const handleFileUploadDelete = (input: any, docId?: any) => {
    controlFunction(input, "file_delete", docId);
  };

  return (
    <FormContext.Provider
      value={{
        register,
        handleFileUploadDelete,
        onSubmit,
        watch,
        setValue,
        errors,
        defaultInput,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
