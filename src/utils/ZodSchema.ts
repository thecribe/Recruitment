import { getNames } from "country-list";
import z, { RefinementCtx } from "zod";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const countries = getNames();

const getArray = (data: { title: string; slug: string }[]) => {
  let array: string[] = [];

  data.forEach((datum) => {
    array.push(datum.slug ? datum.slug : "");
  });

  return array;
};
export const loginSchema = z.object({
  email: z.string().refine((val) => {
    if (val.length > 0) {
      return /\.[a-z]{2,}$/i.test(val);
    } else {
      return true;
    }
  }, "Email must contain a valid domain"),
  password: z.string().min(6, {
    message: "Password must be at least six characters",
  }),
});

export const signupForm = z
  .object({
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().min(2, "Last name is too short"),
    email: z.string().refine((val) => {
      if (val.length > 0) {
        return /\.[a-z]{2,}$/i.test(val);
      } else {
        return true;
      }
    }, "Email must contain a valid domain"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    departmentSlug: z.string({ message: "Field is required" }),
    address: z.string().optional(),
    profileImage: z.string().optional(),
    phone: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const PersonalInfoSchema = z.object({
  title: z.enum(["Mr.", "Mrs.", "Ms."], { message: "Title is required" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  gender: z.enum(["Male", "Female", "Non-binary", "Transgender", "Others"], {
    message: "Gender is required",
  }),
  employee_id: z.string().optional(),
  country: z.enum(countries, {
    message: "Nationality is required",
  }),
  birthday: z
    .string()
    .min(1, { message: "Date of Birth is required" })
    .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
  visa_type: z.string({ message: "Field is required" }),
  job_type: z.string({ message: "Field is required" }),
  join_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date")
    .optional(),
  // photo: z
  //   .any()
  //   .optional()
  //   .refine(
  //     (files) => {
  //       // allow no file
  //       if (!files || !(files instanceof FileList) || files.length === 0)
  //         return true;
  //       // only allow JPEG, PNG, or WEBP
  //       return ["image/jpeg", "image/png", "image/webp"].includes(
  //         files[0].type
  //       );
  //     },
  //     { message: "Only JPEG, PNG, or WEBP images are allowed." }
  //   ),
});
export const AddressSchema = z.object({
  house_number: z.string().min(1, { message: "House number is required" }),
  address: z.string().min(1, { message: "Field cannot be empty" }),
  city: z.string().min(1, { message: "Field cannot be empty" }),
  state: z.string().min(1, { message: "Field cannot be empty" }),
  postal_code: z.string().min(1, { message: "Field cannot be empty" }),
  country: z.enum(countries, {
    message: "Nationality is required",
  }),
  from_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date")
    .optional(),
  to_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date")
    .optional(),
  proof_of_address: z.any().optional(),
});

export const PassportSchema = z.object({
  passport: z.any().optional(),
  proof_of_insurance: z.any().optional(),
});

export const ResumeSchema = z.object({
  resume: z.any().optional(),
  date_of_birth_certificate: z.any().optional(),
});
export const ContactSchema = z.object({
  mobile_no: z.string().min(1, { message: "Mobile number is required" }),
  landline: z.string().optional(),
  email: z.string().refine((val) => {
    if (val.length > 0) {
      return /\.[a-z]{2,}$/i.test(val);
    } else {
      return true;
    }
  }, "Email must contain a valid domain"),
});
export const EmergencySchema = z.object({
  next_of_kin: z.string().min(1, { message: "Field is required" }),
  relationship: z.string().min(1, { message: "Field is required" }),
  address: z.string().min(1, { message: "Field cannot be empty" }),
  city: z.string().min(1, { message: "Field cannot be empty" }),
  state: z.string().min(1, { message: "Field cannot be empty" }),
  postal_code: z.string().min(1, { message: "Field cannot be empty" }),
  country: z.enum(countries, {
    message: "Nationality is required",
  }),
  mobile_no: z.string().min(1, { message: "Mobile number is required" }),
  email: z.string().refine((val) => {
    if (val.length > 0) {
      return /\.[a-z]{2,}$/i.test(val);
    } else {
      return true;
    }
  }, "Email must contain a valid domain"),
});

export const CurrentJobSchema = z.object({
  job_title: z.string().min(1, { message: "Name is required" }),
  current_place_of_work: z.string().optional(),
  current_pay: z.string().min(1, { message: "Name is required" }),
  shift: z.string().optional(),
  duties: z.string().optional(),
});

export const PreviousJobSchema = z.object({
  from_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
  to_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
  name_of_employer: z.string().optional(),
  job_title: z.string().min(1, { message: "Name is required" }),
  address: z.string().optional(),
  reason_for_leaving: z.string().optional(),
  duties: z.string().optional(),
});

export const EducationSchema = z.object({
  establishment: z.string().min(1, { message: "Name is required" }),
  from_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
  to_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
  qualification: z.string().optional(),
  grade: z.string().optional(),
  photo_cert: z.any().optional(),
});
export const RightToWorkSchema = z.object({
  entitlement: z.string().optional(),
  passport_number: z.string().optional(),
  expiry_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
  share_code: z.string().min(1, { message: "Field is required" }),
  passport_proof: z.any().optional(),
  brp_proof: z.any().optional(),
  right_to_work_update_check: z.any().optional(),
});
export const ProfessionalMembershipSchema = z.object({
  body_type: z.string().optional(),
  pin: z.string().optional(),
  renewal_date: z.string().optional(),
  dbs_disclosure: z.string().optional(),
  issue_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
  clear: z.string().optional(),
  disclosure_number: z.string().optional(),
  certificate_registration: z.enum(["Yes", "No"], {
    message: "Field is required",
  }),
  membership_card_upload: z.any().optional(),
  current_dbs_upload: z.any().optional(),
  dbs_update_check: z.any().optional(),
  expiry_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
});
export const BankDetailsSchema = z.object({
  name_of_bank: z.string().optional(),
  account_name: z.string().optional(),
  account_type: z.enum(["Personal", "LTD"], {
    message: "Field is required",
  }),
  address: z.string().optional(),
  postal_code: z.string().optional(),
  account_no: z.string().optional(),
  sort_code: z.string().optional(),
});

export const ImmunisationSchema = z.object({
  hep_b: z.enum(["Yes", "No"], { message: "Field is required" }),
  hep_b_certificate: z.any().optional(),
  tb: z.enum(["Yes", "No"], { message: "Field is required" }),
  tb_certificate: z.any().optional().optional(),
  varicella: z.enum(["Yes", "No"], { message: "Field is required" }),
  varicella_certificate: z.any().optional(),
  measles: z.enum(["Yes", "No"], { message: "Field is required" }),
  measles_certificate: z.any().optional(),
  rubella: z.enum(["Yes", "No"], { message: "Field is required" }),
  rubella_certificate: z.any().optional(),
  hep_b_antigen: z.enum(["No Proof", "Negative", "Positive"], {
    message: "Field is required",
  }),
  hep_b_antigen_certificate: z.any().optional(),
  hep_c: z.enum(["No Proof", "Negative", "Positive"], {
    message: "Field is required",
  }),
  hep_c_certificate: z.any().optional(),
  hiv: z.enum(["No Proof", "Negative", "Positive"], {
    message: "Field is required",
  }),
  hiv_certificate: z.any().optional(),
  signature: z.any().optional(),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
});

export const DrivingDetailsSchema = z.object({
  driver_license: z.enum(["Yes", "No"], {
    message: "Field is required",
  }),
  posess_car: z.enum(["Yes", "No"], {
    message: "Field is required",
  }),
  front_side_license: z.any().optional(),
  back_side_license: z.any().optional(),
});
export const HealthSchema = z.object({
  name: z.string().optional(),
  signature: z.any().optional(),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
});
export const DisabilitySchema = z.object({
  disability: z.enum(["Yes", "No"], {
    message: "Field is required",
  }),
  signature: z.any().optional(),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
});
export const ConfidentialitySchema = z.object({
  signature: z.any().optional(),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
});
export const ConsentSchema = z.object({
  signature: z.any().optional(),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
});
export const PersonalDeclarationSchema = z.object({
  signature: z.any().optional(),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
});
export const WorkingTimeSchema = z.object({
  signature: z.any().optional(),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
});
export const OtherDeclarationsSchema = z.object({
  signature: z.any().optional(),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
});
export const HealthAndSafetySchema = z.object({
  signature: z.any().optional(),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
});
export const RehabilitationSchema = z.object({
  conviction: z.enum(["Yes", "No"], {
    message: "Field is required",
  }),
  disciplinary_action: z.enum(["Yes", "No"], {
    message: "Field is required",
  }),
  criminal_charges: z.enum(["Yes", "No"], {
    message: "Field is required",
  }),
  consent: z.enum(["Yes", "No"], {
    message: "Field is required",
  }),
  police_check: z.enum(["Yes", "No"], {
    message: "Field is required",
  }),
});

export const ReferenceSchema = z.object({
  company_name: z.string().optional(),
  from_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
  to_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
  referee_name: z.string().optional(),
  referee_email: z
    .string()
    .min(1, { message: "Field is required" })
    .refine((val) => {
      if (val.length > 0) {
        return /\.[a-z]{2,}$/i.test(val);
      } else {
        return true;
      }
    }, "Email must contain a valid domain"),
  referee_phone: z.string().min(1, { message: "Field is required" }),
  referee_relationship: z.string().optional(),
});

export const UploadCertificateSchema = z.object({
  name: z.string().optional(),
  file: z.any().optional(),
  lifetime: z.string({ message: "Field is required" }),
  issue_date: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Must be a valid date",
    }),

  expiry_date: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Must be a valid date",
    }),
});

export const StaffProfileSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().refine((val) => {
    if (val.length > 0) {
      return /\.[a-z]{2,}$/i.test(val);
    } else {
      return true;
    }
  }, "Email must contain a valid domain"),
  phone: z.string().min(1, { message: "Mobile number is required" }),
  departmentSlug: z.string({ message: "Department is required" }),
  jobTypeSlug: z.string({ message: "Job Type is required" }),
  address: z.string().min(1, { message: "Field cannot be empty" }),
  profileImage: z
    .any()
    .optional()
    .refine(
      (files) => {
        // allow no file
        if (!files || !(files instanceof FileList) || files.length === 0)
          return true;
        // only allow JPEG, PNG, or WEBP
        return ["image/jpeg", "image/png", "image/webp"].includes(
          files[0].type,
        );
      },
      { message: "Only JPEG, PNG, or WEBP images are allowed." },
    ),
});

export const AddShiftSchema = z
  .object({
    start_date: z
      .string({ message: "Start date is required" })
      .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
    start_time: z
      .string({ message: "Start time is required" })
      .regex(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Must be a valid time (HH:mm)",
      ),
    end_date: z
      .string({ message: "End date is required" })
      .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
    end_time: z
      .string({ message: "End time is required" })
      .regex(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Must be a valid time (HH:mm)",
      ),
    client_name: z.string().optional(),
    no_of_staff: z.coerce
      .number()
      .min(1, { message: "Number of staff must be at least 1" })
      .int("Number of staff must be an integer"),
  })
  .superRefine(
    (
      data: {
        start_date: string;
        end_date: string;
        start_time: string;
        end_time: string;
      },
      ctx: RefinementCtx,
    ) => {
      const now = dayjs();

      const startDate = dayjs(data.start_date, "YYYY-MM-DD");
      const endDate = dayjs(data.end_date, "YYYY-MM-DD");

      const startTime = dayjs(data.start_time, "HH:mm");
      const endTime = dayjs(data.end_time, "HH:mm");

      // 1️⃣ Start date >= today
      if (!startDate.isSameOrAfter(now, "day")) {
        ctx.addIssue({
          code: "custom",
          message: "Start date cannot be before current date",
          path: ["start_date"],
        });
      }

      // 2️⃣ End date >= start date
      if (!endDate.isSameOrAfter(startDate, "day")) {
        ctx.addIssue({
          code: "custom",
          message: "End date cannot be before start date",
          path: ["end_date"],
        });
      }

      // 3️⃣ Start time cannot be in the past if start_date is today
      if (startDate.isSame(now, "day") && !startTime.isAfter(now, "minute")) {
        ctx.addIssue({
          code: "custom",
          message: "Start time cannot be in the past for today",
          path: ["start_time"],
        });
      }

      // 4️⃣ Start time < end time
      if (!startTime.isBefore(endTime, "minute")) {
        ctx.addIssue({
          code: "custom",
          message: "Start time must be before end time",
          path: ["end_time"],
        });
      }
    },
  );
export const EditShiftSchema = z
  .object({
    start_date: z
      .string({ message: "Start date is required" })
      .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
    start_time: z
      .string({ message: "Start time is required" })
      .regex(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Must be a valid time (HH:mm)",
      ),
    end_date: z
      .string({ message: "End date is required" })
      .refine((val) => !isNaN(Date.parse(val)), "Must be a valid date"),
    end_time: z
      .string({ message: "End time is required" })
      .regex(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Must be a valid time (HH:mm)",
      ),
    client_name: z.string().optional(),
    no_of_staff: z.coerce
      .number()
      .min(1, { message: "Number of staff must be at least 1" })
      .int("Number of staff must be an integer"),
  })
  .superRefine(
    (
      data: {
        start_date: string;
        end_date: string;
        start_time: string;
        end_time: string;
      },
      ctx: RefinementCtx,
    ) => {
      const now = dayjs();

      const startDate = dayjs(data.start_date, "YYYY-MM-DD");
      const endDate = dayjs(data.end_date, "YYYY-MM-DD");

      const startTime = dayjs(data.start_time, "HH:mm");
      const endTime = dayjs(data.end_time, "HH:mm");

      // 1️⃣ Start date >= today
      if (!startDate.isSameOrAfter(now, "day")) {
        ctx.addIssue({
          code: "custom",
          message: "Start date cannot be before current date",
          path: ["start_date"],
        });
      }

      // 2️⃣ End date >= start date
      if (!endDate.isSameOrAfter(startDate, "day")) {
        ctx.addIssue({
          code: "custom",
          message: "End date cannot be before start date",
          path: ["end_date"],
        });
      }

      // 3️⃣ Start time cannot be in the past if start_date is today
      if (startDate.isSame(now, "day") && !startTime.isAfter(now, "minute")) {
        ctx.addIssue({
          code: "custom",
          message: "Start time cannot be in the past for today",
          path: ["start_time"],
        });
      }

      // 4️⃣ Start time < end time
      if (!startTime.isBefore(endTime, "minute")) {
        ctx.addIssue({
          code: "custom",
          message: "Start time must be before end time",
          path: ["end_time"],
        });
      }
    },
  );

export const SiteInfomationSchema = z.object({
  title: z.string().min(1, { message: "Field is required" }),
  description: z.string().min(1, { message: "Field is required" }),
  admin_email: z.string().refine((val) => {
    if (val.length > 0) {
      return /\.[a-z]{2,}$/i.test(val);
    } else {
      return true;
    }
  }, "Email must contain a valid domain"),
});
export const AddDataSchema = z.object({
  title: z.string().min(1, { message: "Field is required" }),
  slug: z.string().optional(),
});

export const ManagePasswordSchema = z
  .object({
    current_password: z
      .string()
      .min(6, "Current password must be at least 6 characters"),
    new_password: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirm_password: z
      .string()
      .min(6, "New password must be at least 6 characters"),
  })
  .superRefine(
    (
      data: {
        current_password: string;
        new_password: string;
        confirm_password: string;
      },
      ctx: RefinementCtx,
    ) => {
      if (data.new_password !== data.confirm_password) {
        ctx.addIssue({
          code: "custom",
          message: "New password and confirm password do not match",
          path: ["confirm_password", "new_password"],
        });
      }

      if (data.current_password === data.new_password) {
        ctx.addIssue({
          code: "custom",
          message: "New password must be different from current password",
          path: ["new_password"],
        });
      }
    },
  );
