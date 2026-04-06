"use client";
import { USER_ROLE } from "@/utils/data";
import React, { createContext, useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import FormWrapper from "./Forms/FormWrapper";

import { StaffProfileSchema } from "@/utils/ZodSchema";
import z from "zod";

import { fileToFormData, formToFormData } from "@/utils/extrafucntions";
import { ManagePasswordSchema } from "@/utils/ZodSchema";
import LoadingState from "./LoadingState";

import Notification from "./Notification";
import { AuthContext } from "@/Context/AuthContext";
import FormProvider from "@/Context/FormContext";
import { instance } from "@/utils/axiosConfig";

const ManageProfileContext = createContext<any | undefined>(undefined);

const ManageProfile = ({ id, type }: { id: string; type?: string }) => {
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [reloader, setReloader] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      setLoadingState(true);
      try {
        const response = await instance.get(`/users/${id}`);
        setUserProfile(response.data.user);
        setLoadingState(false);
      } catch (error: any) {
        setLoadingState(false);
        setNotification({
          message: error.response.data.message,
          type: "error",
        });
      }
    };

    getUser();
  }, [reloader]);

  const [panelSwitch, setPanelSwitch] = useState<number>(1);
  let output;
  switch (panelSwitch) {
    case 1:
      output = <UserProfile />;
      break;
    case 2:
      output = <ManagePassword />;
      break;
    case 3:
      output = <ManageRole />;
      break;

    default:
      output = <UserProfile />;
      break;
  }
  return (
    <ManageProfileContext.Provider
      value={{
        setPanelSwitch,
        panelSwitch,
        userProfile,
        setLoadingState,
        loadingState,
        setNotification,
        reloader,
        setReloader,
        type,
      }}
    >
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="w-full h-full flex flex-col lg:flex-row gap-3">
        <div className="w-full lg:w-1/6 shadow-sm rounded-md flex lg:flex-col items-center  p-4">
          <NavigationPanel />
        </div>
        {loadingState ? (
          <LoadingState className="w-full flex justify-center items-center " />
        ) : (
          <div className="lg:flex-1  shadow-sm rounded-md p-3 h-full overflow-y-auto">
            {output}
          </div>
        )}
      </div>
    </ManageProfileContext.Provider>
  );
};

export default ManageProfile;

const NavigationPanel = () => {
  const { user } = useContext(AuthContext);
  const { setPanelSwitch } = useContext(ManageProfileContext);

  const navList = [
    {
      name: "Profile",
      icon: <FaUser />,
      access: [
        "applicant",
        "recruitment_manager",
        "staff",
        "administrator",
        "super_administrator",
      ],
    },
    {
      name: "Change Password",
      icon: <RiLockPasswordFill />,
      access: [
        "applicant",
        "recruitment_manager",
        "staff",
        "administrator",
        "super_administrator",
      ],
    },
    {
      name: "Current Status/Role",
      icon: <FaUser />,
      access: ["recruitment_manager", "administrator", "super_administrator"],
    },
  ];
  return (
    <>
      {navList.map((item, index) => {
        return (
          item.access.includes(user?.role.slug.toLowerCase()) && (
            <div
              className="w-full flex items-center gap-3 px-5 py-4 hover:bg-indigo-50 hover:text-indigo-700 rounded-2xl font-medium cursor-pointer"
              key={index}
              onClick={() => setPanelSwitch(index + 1)}
            >
              <div className="flex items-center justify-center md:justify-start gap-2 ">
                <span className="text-gray-600 text-sm">{item.icon}</span>
                <span className="font-medium hidden md:block text-sm ">
                  {item.name}
                </span>
              </div>
            </div>
          )
        );
      })}
    </>
  );
};

const UserProfile = ({
  data,
}: {
  data?: z.infer<typeof StaffProfileSchema>;
}) => {
  const { defaultdata } = useContext(AuthContext);
  const { userProfile, setNotification, setReloader } =
    useContext(ManageProfileContext);

  const formInputHandler = async (
    input: z.infer<typeof StaffProfileSchema>,
    type?: string,
  ) => {
    const formData = formToFormData(input);

    try {
      const response = await instance.put(`/users/${userProfile.id}`, formData);
      setNotification({
        message:
          type === "file_delete"
            ? "File deleted successfully"
            : response.data.message,
        type: "success",
      });
    } catch (error: any) {
      setNotification({ message: error.response.data.message, type: "error" });
    }

    return null;
  };

  const StaffProfileFormData = [
    {
      type: "text",
      label: "First Name",
      accessor: "firstName",
    },
    {
      type: "text",
      label: "Last Name",
      accessor: "lastName",
    },
    {
      type: "email",
      label: "Email",
      accessor: "email",
    },
    {
      type: "phone",
      label: "Phone Number",
      accessor: "phone",
    },
    {
      type: "select",
      label: "Department",
      accessor: "departmentSlug",
      options: defaultdata.department,
    },
    {
      type: "select",
      label: "Job Type",
      accessor: "jobTypeSlug",
      options: defaultdata.job_type,
    },

    {
      type: "text",
      label: "Address",
      accessor: "address",
    },
    {
      type: "file",
      label: "Upload a photo",
      accessor: "profileImage",
    },
  ];

  return (
    <div>
      <FormProvider
        typeSchema={StaffProfileSchema}
        controlFunction={formInputHandler}
        defaultInput={{ ...userProfile }}
      >
        <FormWrapper
          data={StaffProfileFormData}
          className={"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5"}
        ></FormWrapper>
      </FormProvider>
    </div>
  );
};

const ManagePassword = () => {
  const { userProfile, setNotification, setReloader, type } =
    useContext(ManageProfileContext);
  type PasswordField = { input: string; error: string | null };
  const [formInput, setFormInput] = useState<{
    current_password: PasswordField;
    new_password: PasswordField;
    confirm_password: PasswordField;
  }>({
    current_password: { input: "", error: null },
    new_password: { input: "", error: null },
    confirm_password: { input: "", error: null },
  });

  const handleSubmit = async () => {
    if (!formInput.current_password.input) {
      formInput.current_password.input = "generate_random_password"; // Set a dummy value if current password is empty
    }

    const result = ManagePasswordSchema.safeParse({
      current_password: formInput.current_password.input,
      new_password: formInput.new_password.input,
      confirm_password: formInput.confirm_password.input,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setFormInput((prev) => ({
        ...prev,
        current_password: {
          ...prev.current_password,
          error: fieldErrors.current_password?.[0] ?? null,
        },
        new_password: {
          ...prev.new_password,
          error: fieldErrors.new_password?.[0] ?? null,
        },
        confirm_password: {
          ...prev.confirm_password,
          error: fieldErrors.confirm_password?.[0] ?? null,
        },
      }));
      return;
    }

    try {
      const response = await instance.put(
        `/users/${userProfile.id}/change-password`,
        {
          current_password: formInput.current_password.input,
          new_password: formInput.new_password.input,
          confirm_password: formInput.confirm_password.input,
        },
      );

      setReloader((prev: any) => !prev);
      setNotification({
        message: response.data.message,
        type: "success",
      });
      setFormInput((prev) => ({
        ...prev,
        current_password: {
          input: "",
          error: null,
        },
        new_password: {
          input: "",
          error: null,
        },
        confirm_password: {
          input: "",
          error: null,
        },
      }));
    } catch (error: any) {
      setNotification({ message: error.response.data.message, type: "error" });
    }
  };

  return type ? (
    <AdminResetPassword />
  ) : (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600 mb-2 flex gap-3">
          Current Password:
        </label>
        <p className="text-sm italic text-blue-400">
          Leave Empty if you do not have a password set
        </p>
        <input
          type="password"
          placeholder="Enter current password"
          className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-[50%] lg:w-1/3 "
          id="current_password"
          name="current_password"
          value={formInput.current_password.input}
          onChange={(e) =>
            setFormInput((prev) => ({
              ...prev,
              current_password: {
                ...prev.current_password,
                input: e.target.value,
              },
            }))
          }
        />
        {formInput.current_password.error && (
          <p className="text-sm text-red-500">
            {formInput.current_password.error}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600 mb-2 flex gap-3">
          New Password:
        </label>
        <input
          type="password"
          placeholder="Enter new password"
          className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-[50%] lg:w-1/3 "
          id="new_password"
          name="new_password"
          value={formInput.new_password.input}
          onChange={(e) =>
            setFormInput((prev) => ({
              ...prev,
              new_password: {
                ...prev.new_password,
                input: e.target.value,
              },
            }))
          }
        />
        {formInput.new_password.error && (
          <p className="text-sm text-red-500">{formInput.new_password.error}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600 mb-2 flex gap-3">
          Confirm Password:
        </label>
        <input
          type="password"
          placeholder="Enter new password again"
          className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-[50%] lg:w-1/3 "
          id="confirm_password"
          name="confirm_password"
          value={formInput.confirm_password.input}
          onChange={(e) =>
            setFormInput((prev) => ({
              ...prev,
              confirm_password: {
                ...prev.confirm_password,
                input: e.target.value,
              },
            }))
          }
        />
        {formInput.confirm_password.error && (
          <p className="text-sm text-red-500">
            {formInput.confirm_password.error}
          </p>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="text-sm w-fit bg-blue-500/50 px-10 py-3.5 rounded-md cursor-pointer hover:bg-blue-500/70 hover:scale-105 shadow-xs hover:shadow-black/30 active:shadow-black/10 active:scale-95 transition-all duration-300"
      >
        Update
      </button>
    </div>
  );
};

const ManageRole = () => {
  const { userProfile, setNotification, setReloader, reloader } =
    useContext(ManageProfileContext);
  const [input, setInput] = useState(userProfile.roleSlug);
  const [allRole, setAllRole] = useState<any[] | null>(null);

  const handleSubmit = async () => {
    try {
      const response = await instance.put(
        `/users/${userProfile.id}/change-role`,
        { roleSlug: input },
      );
      setReloader((prev: any) => !prev);
      setNotification({
        message: response.data.message,
        type: "success",
      });
    } catch (error: any) {
      setNotification({ message: error.response.data.message, type: "error" });
    }
  };

  useEffect(() => {
    const getRole = async () => {
      try {
        const response = await instance.get(`/role`);
        setAllRole([...response.data.data]);
      } catch (error: any) {
        setNotification({ message: error.message, type: "error" });
      }
    };

    getRole();
  }, [reloader]);

  return (
    <div className="flex flex-col gap-3">
      <div className=" flex flex-col gap-2 w-full md:w-1/3 ">
        <label className="text-sm font-medium text-gray-600 mb-2 flex gap-3">
          Current Status:
        </label>
        <select
          className="border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 "
          onChange={(e) => setInput(e.target.value)}
          value={input}
        >
          {allRole &&
            allRole.map((eachoption: any, index: number) => (
              <option
                key={index}
                value={eachoption.slug ? eachoption.slug : eachoption}
              >
                {eachoption.role ? eachoption.role : eachoption}
              </option>
            ))}
        </select>
      </div>
      <button
        className="text-sm w-fit bg-blue-500/50 px-10 py-3.5 rounded-md cursor-pointer hover:bg-blue-500/70 hover:scale-105 shadow-xs hover:shadow-black/30 active:shadow-black/10 active:scale-95 transition-all duration-300"
        onClick={handleSubmit}
      >
        Save
      </button>
    </div>
  );
};

const AdminResetPassword = () => {
  const { userProfile, setNotification, setReloader } =
    useContext(ManageProfileContext);
  const sendPasswordRestLink = async () => {
    try {
      const response = await instance.post(`/email/reset-password`, {
        userId: userProfile.id,
      });

      console.log(response.data);
      setReloader((prev: any) => !prev);
      setNotification({
        message: "Password reset link sent successfully",
        type: "success",
      });
    } catch (error: any) {
      setNotification({ message: error.response.data.message, type: "error" });
    }
  };
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-gray-600 mb-2">
        This will send a secure password reset link to the user&apos;s
        registered email address. The link will expire after a limited time for
        security purposes.
      </p>
      <button
        className="text-sm w-fit bg-blue-500/50 p-3 rounded-md cursor-pointer hover:bg-blue-500/70 hover:scale-105 shadow-xs hover:shadow-black/30 active:shadow-black/10 active:scale-95 transition-all duration-300"
        onClick={sendPasswordRestLink}
      >
        Send Password Reset Link to User's Email
      </button>
    </div>
  );
};
