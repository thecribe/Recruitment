export function getFileExtension(pathOrUrl: string) {
  try {
    const pathname = pathOrUrl?.includes("://")
      ? new URL(pathOrUrl)?.pathname
      : pathOrUrl;
    const parts = pathname?.split(".") ?? [];
    const last = parts.pop();
    return (last ?? "").toLowerCase().split("?")[0];
  } catch {
    return "";
  }
}

export const generateSlug = (slug: string) => {
  return slug
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove symbols
    .replace(/\s+/g, "-");
};

export function buildFormDataFromFiles(files: any, fieldName = "files") {
  const formData = new FormData();

  if (!files) return formData;
  // FileList (browser)
  if (files instanceof FileList) {
    Array.from(files).forEach((file) => {
      formData.append(fieldName, file);
    });
    return formData;
  }

  // Array of Files
  if (Array.isArray(files)) {
    files.forEach((file) => {
      if (file instanceof File) {
        formData.append(fieldName, file);
      }
    });

    return formData;
  }

  // Single File
  if (files instanceof File) {
    formData.append(fieldName, files);
  }

  return formData;
}

export const formToFormData = (data: any) => {
  let formData = new FormData();
  Object.entries(data).forEach(([key, value]: [any, any]) => {
    if (value instanceof FileList) {
      Array.from(value).forEach((file) => {
        formData.append(key, file);
      });

      return formData;
    }
    // Array of Files
    if (Array.isArray(value)) {
      value.forEach((file) => {
        if (file instanceof File) {
          formData.append(key, file);
        }
      });

      return formData;
    }

    // Single File
    if (value instanceof File) {
      formData.append(key, value);
      return formData;
    }

    formData.append(key, value);
  });

  return formData;
};

//To be use on frontend return the obeject with the fukk input data
export const fileToFormData = (inputdata: any, previousObject?: any) => {
  let outputObject = { ...inputdata };

  Object.entries(inputdata).forEach(([key, value]: [any, any]) => {
    if (value instanceof FileList) {
      let fileArray: Array<File> = [];
      Array.from(value).forEach((file) => {
        fileArray.push(file);
      });
      const formData = buildFormDataFromFiles(fileArray);

      outputObject = {
        ...outputObject,
        [key]: {
          new: formData,
          old: previousObject ? previousObject[key] : "[]",
        },
      };
    } else {
      outputObject = { ...outputObject, [key]: value };
    }
  });
  return outputObject;
};

export const getCompletionPercentage = (dataset: any) => {
  const totalCount = Object.keys(dataset).length;
  const filledKeys = Object.keys(dataset).filter(
    (key) =>
      dataset[key] !== undefined &&
      dataset[key] !== null &&
      dataset[key] !== "" &&
      dataset[key] !== "[]",
  ).length;

  if (totalCount === 0) return 0;

  const percentage = (filledKeys / totalCount) * 100;

  return Math.min(100, Math.ceil(percentage * 10) / 10);
};
