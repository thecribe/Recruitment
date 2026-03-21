import {
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import {  FaSearch, FaUser } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { FaWpforms } from "react-icons/fa6";
import { IoAnalyticsSharp } from "react-icons/io5";

import { IoSettingsOutline } from "react-icons/io5";


export const USER_ROLE = "administrator";

export const formAccessRole = [
  "super_administrator",
  "administrator",
  "recruitment_manager",
];
export const MENULIST = {
  title: [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <MdOutlineSpaceDashboard />,
      access: ["applicant", "staff", "recruitment_manager", "administrator", "super_administrator",],
    },
    {
      name: "Application Form",
      link: "/application",
      icon: <FaWpforms />,
      access: ["applicant", "staff", "recruitment_manager", "administrator", "super_administrator",],
    },
    {
      name: "Recruitment",
      link: "/recruitment",
      icon: <FaSearch />,
      access: ["applicant", "staff", "recruitment_manager", "administrator", "super_administrator",],
    },
    {
      name: "Compliance",
      link: "/compliance",
      icon: <IoAnalyticsSharp />,
      access: ["applicant", "staff", "recruitment_manager", "administrator", "super_administrator",],
    },
    {
      name: "Staff Manager",
      link: "/staff-manager",
      icon: <MdPeopleAlt />,
      access: ["applicant", "staff", "recruitment_manager", "administrator", "super_administrator",],
    },

    {
      name: "General Settings",
      link: "/settings?page=general-settings",
      icon: <IoSettingsOutline />,
      access: ["applicant", "staff", "recruitment_manager", "administrator", "super_administrator",],
    },
  ],
};

export const APPLICANTS = [
  {
    id: 1,
    name: "Waheed Ajibade",
    role: "Health Care Assistant",
    status: "Inactive",
    contact: {
      email: "ajibade.waheed@gmail.com",
      phone: "0777059640",
      address: "AL7 45X",
    },
    recruitment_stage: "New applicant",
    progress: 60,
    days_in: 0,
  },
  {
    id: 15,
    name: "Waheed Ajibade",
    role: "Health Care Assistant",
    status: "Inactive",
    contact: {
      email: "ajibade.waheed@gmail.com",
      phone: "0777059640",
      address: "AL7 45X",
    },
    recruitment_stage: "New applicant",
    progress: 60,
    days_in: 0,
  },
  {
    id: 2,
    name: "Ehimae Ikhalea",
    role: "Health Care Assistant",
    status: "Inactive",
    contact: {
      email: "kaycollins17@outlook.com",
      phone: "07424717842",
      address: "NP19 0QE",
    },
    recruitment_stage: "New applicant",
    progress: 15,
    days_in: 0,
  },
  {
    id: 3,
    name: "Akinlua Moyosore",
    role: "Health Care Assistant",
    status: "Inactive",
    contact: {
      email: "moyosoreakinlua@gmail.com",
      phone: "7833829465",
      address: "CH1 4BT",
    },
    recruitment_stage: "New applicant",
    progress: 18,
    days_in: 1,
  },
  {
    id: 4,
    name: "Olabisi Hassan",
    role: "Health Care Assistant",
    status: "Inactive",
    contact: {
      email: "olabisih@yahoo.com",
      phone: "0765666087",
      address: "SA5 5QJ",
    },
    recruitment_stage: "New applicant",
    progress: 0,
    days_in: 2,
  },
  {
    id: 5,
    name: "Chioma Ali",
    role: "Health Care Assistant",
    status: "Inactive",
    contact: {
      email: "mabilchionmzy@gmail.com",
      phone: "0777161905",
      address: "BS13 9PW",
    },
    recruitment_stage: "New applicant",
    progress: 100,
    days_in: 3,
  },
  {
    id: 6,
    name: "Chinazor Ogbah",
    role: "Health Care Assistant",
    status: "Inactive",
    contact: {
      email: "chinazorogbah@gmail.com",
      phone: "07440789029",
      address: "BD7 2HJ",
    },
    recruitment_stage: "New applicant",
    progress: 18,
    days_in: 4,
  },
  {
    id: 7,
    name: "Adebayo Idris",
    role: "Health Care Assistant",
    status: "Inactive",
    contact: {
      email: "mreedris@yahoo.com",
      phone: "07760873444",
      address: "NP20 2SD",
    },
    recruitment_stage: "New applicant",
    progress: 50,
    days_in: 6,
  },
  {
    id: 8,
    name: "Idris Adebayo",
    role: "Health Care Assistant",
    status: "Inactive",
    contact: {
      email: "Eedris.rep@gmail.com",
      phone: "07760873444",
      address: "NP20 2SD",
    },
    recruitment_stage: "New applicant",
    progress: 90,
    days_in: 6,
  },
  {
    id: 9,
    name: "Favour Ndubuisi",
    role: "Health Care Assistant",
    status: "Inactive",
    contact: {
      email: "ndubuisifavour24@gmail.com",
      phone: "",
      address: "",
    },
    recruitment_stage: "New applicant",
    progress: 0,
    days_in: 0,
  },
  {
    id: 10,
    name: "Idris Adebayo",
    role: "Health Care Assistant",
    status: "Inactive",
    contact: {
      email: "Eedris.rep@gmail.com",
      phone: "07760873444",
      address: "NP20 2SD",
    },
    recruitment_stage: "New applicant",
    progress: 10,
    days_in: 6,
  },
];

export const ALLUSERS = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "admin",
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.williams@example.com",
    role: "staff",
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
    role: "user",
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.johnson@example.com",
    role: "staff",
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Smith",
    email: "david.smith@example.com",
    role: "admin",
  },
  {
    id: 6,
    firstName: "Jessica",
    lastName: "Taylor",
    email: "jessica.taylor@example.com",
    role: "user",
  },
  {
    id: 7,
    firstName: "Daniel",
    lastName: "Clark",
    email: "daniel.clark@example.com",
    role: "staff",
  },
  {
    id: 8,
    firstName: "Laura",
    lastName: "Adams",
    email: "laura.adams@example.com",
    role: "user",
  },
  {
    id: 9,
    firstName: "Peter",
    lastName: "Wilson",
    email: "peter.wilson@example.com",
    role: "admin",
  },
  {
    id: 10,
    firstName: "Olivia",
    lastName: "Martin",
    email: "olivia.martin@example.com",
    role: "user",
  },
];

export const COMPLIANCEDATA = [
  {
    id: 1,
    name: "Waheed Ajibade",
    role: "Health Care Assistant",
    status: "Inactive",
    contact_info: {
      email: "ajibade.waheed@gmail.com",
      phone: "0777059640",
      address: "AL7 45X",
    },
    recruitment_stage: "New applicant",
    progress: 60,
    days_in: 0,

    personal_info: 74,
    address_details: 33,
    passport_photo: 91,
    resume: 15,
    contact: 89,
    emergency_contact: 21,

    current_job: 4,
    previous_job: 57,

    educational_qualification: 62,

    right_to_work: 10,
    professional_memberships: 43,
    bank_payment_details: 98,
    immunisations: 27,
    driving_details: 100,

    health_declarations: 36,
    disability_discrimination_act: 81,
    confidentiality: 52,
    consent_for_the_use_of_staff_photographic_images: 7,
    personal_declarations: 89,
    working_time_regulations_declarations: 46,
    other_declarations: 12,
    health_and_safety: 55,
    rehabilitation_of_offenders_act_1974: 19,
  },

  {
    id: 2,
    name: "Ehimae Ikhalea",
    role: "Health Care Assistant",
    status: "Inactive",
    contact_info: {
      email: "kaycollins17@outlook.com",
      phone: "07424717842",
      address: "NP19 0QE",
    },
    recruitment_stage: "New applicant",
    progress: 15,
    days_in: 0,

    personal_info: 13,
    address_details: 74,
    passport_photo: 92,
    resume: 28,
    contact: 41,
    emergency_contact: 10,

    current_job: 67,
    previous_job: 8,

    educational_qualification: 65,

    right_to_work: 52,
    professional_memberships: 85,
    bank_payment_details: 90,
    immunisations: 34,
    driving_details: 63,

    health_declarations: 47,
    disability_discrimination_act: 12,
    confidentiality: 77,
    consent_for_the_use_of_staff_photographic_images: 19,
    personal_declarations: 28,
    working_time_regulations_declarations: 53,
    other_declarations: 48,
    health_and_safety: 62,
    rehabilitation_of_offenders_act_1974: 24,
  },

  {
    id: 3,
    name: "Akinlua Moyosore",
    role: "Health Care Assistant",
    status: "Inactive",
    contact_info: {
      email: "moyosoreakinlua@gmail.com",
      phone: "7833829465",
      address: "CH1 4BT",
    },
    recruitment_stage: "New applicant",
    progress: 18,
    days_in: 1,

    personal_info: 95,
    address_details: 21,
    passport_photo: 56,
    resume: 40,
    contact: 38,
    emergency_contact: 73,

    current_job: 88,
    previous_job: 11,

    educational_qualification: 57,

    right_to_work: 34,
    professional_memberships: 42,
    bank_payment_details: 18,
    immunisations: 90,
    driving_details: 12,

    health_declarations: 67,
    disability_discrimination_act: 55,
    confidentiality: 95,
    consent_for_the_use_of_staff_photographic_images: 61,
    personal_declarations: 43,
    working_time_regulations_declarations: 71,
    other_declarations: 14,
    health_and_safety: 52,
    rehabilitation_of_offenders_act_1974: 76,
  },

  {
    id: 4,
    name: "Olabisi Hassan",
    role: "Health Care Assistant",
    status: "Inactive",
    contact_info: {
      email: "olabisih@yahoo.com",
      phone: "0765666087",
      address: "SA5 5QJ",
    },
    recruitment_stage: "New applicant",
    progress: 0,
    days_in: 2,

    personal_info: 61,
    address_details: 48,
    passport_photo: 77,
    resume: 33,
    contact: 15,
    emergency_contact: 96,

    current_job: 84,
    previous_job: 29,

    educational_qualification: 11,

    right_to_work: 14,
    professional_memberships: 57,
    bank_payment_details: 25,
    immunisations: 40,
    driving_details: 93,

    health_declarations: 88,
    disability_discrimination_act: 23,
    confidentiality: 78,
    consent_for_the_use_of_staff_photographic_images: 59,
    personal_declarations: 42,
    working_time_regulations_declarations: 50,
    other_declarations: 76,
    health_and_safety: 33,
    rehabilitation_of_offenders_act_1974: 9,
  },

  {
    id: 5,
    name: "Chioma Ali",
    role: "Health Care Assistant",
    status: "Inactive",
    contact_info: {
      email: "mabilchionmzy@gmail.com",
      phone: "0777161905",
      address: "BS13 9PW",
    },
    recruitment_stage: "New applicant",
    progress: 100,
    days_in: 3,

    personal_info: 27,
    address_details: 95,
    passport_photo: 12,
    resume: 84,
    contact: 33,
    emergency_contact: 20,

    current_job: 44,
    previous_job: 56,

    educational_qualification: 39,

    right_to_work: 62,
    professional_memberships: 21,
    bank_payment_details: 91,
    immunisations: 30,
    driving_details: 68,

    health_declarations: 49,
    disability_discrimination_act: 67,
    confidentiality: 15,
    consent_for_the_use_of_staff_photographic_images: 87,
    personal_declarations: 61,
    working_time_regulations_declarations: 14,
    other_declarations: 91,
    health_and_safety: 53,
    rehabilitation_of_offenders_act_1974: 28,
  },

  {
    id: 6,
    name: "Chinazor Ogbah",
    role: "Health Care Assistant",
    status: "Inactive",
    contact_info: {
      email: "chinazorogbah@gmail.com",
      phone: "07440789029",
      address: "BD7 2HJ",
    },
    recruitment_stage: "New applicant",
    progress: 18,
    days_in: 4,

    personal_info: 41,
    address_details: 72,
    passport_photo: 53,
    resume: 44,
    contact: 9,
    emergency_contact: 62,

    current_job: 29,
    previous_job: 97,

    educational_qualification: 22,

    right_to_work: 39,
    professional_memberships: 83,
    bank_payment_details: 77,
    immunisations: 21,
    driving_details: 56,

    health_declarations: 63,
    disability_discrimination_act: 14,
    confidentiality: 35,
    consent_for_the_use_of_staff_photographic_images: 52,
    personal_declarations: 26,
    working_time_regulations_declarations: 80,
    other_declarations: 31,
    health_and_safety: 72,
    rehabilitation_of_offenders_act_1974: 47,
  },

  {
    id: 7,
    name: "Adebayo Idris",
    role: "Health Care Assistant",
    status: "Inactive",
    contact_info: {
      email: "mreedris@yahoo.com",
      phone: "07760873444",
      address: "NP20 2SD",
    },
    recruitment_stage: "New applicant",
    progress: 50,
    days_in: 6,

    personal_info: 88,
    address_details: 45,
    passport_photo: 32,
    resume: 76,
    contact: 20,
    emergency_contact: 53,

    current_job: 40,
    previous_job: 91,

    educational_qualification: 30,

    right_to_work: 79,
    professional_memberships: 33,
    bank_payment_details: 90,
    immunisations: 11,
    driving_details: 48,

    health_declarations: 17,
    disability_discrimination_act: 41,
    confidentiality: 54,
    consent_for_the_use_of_staff_photographic_images: 91,
    personal_declarations: 34,
    working_time_regulations_declarations: 66,
    other_declarations: 22,
    health_and_safety: 49,
    rehabilitation_of_offenders_act_1974: 61,
  },

  {
    id: 8,
    name: "Idris Adebayo",
    role: "Health Care Assistant",
    status: "Inactive",
    contact_info: {
      email: "Eedris.rep@gmail.com",
      phone: "07760873444",
      address: "NP20 2SD",
    },
    recruitment_stage: "New applicant",
    progress: 90,
    days_in: 6,

    personal_info: 58,
    address_details: 27,
    passport_photo: 41,
    resume: 13,
    contact: 85,
    emergency_contact: 71,

    current_job: 66,
    previous_job: 37,

    educational_qualification: 94,

    right_to_work: 48,
    professional_memberships: 55,
    bank_payment_details: 30,
    immunisations: 67,
    driving_details: 29,

    health_declarations: 10,
    disability_discrimination_act: 72,
    confidentiality: 91,
    consent_for_the_use_of_staff_photographic_images: 73,
    personal_declarations: 82,
    working_time_regulations_declarations: 86,
    other_declarations: 77,
    health_and_safety: 28,
    rehabilitation_of_offenders_act_1974: 36,
  },

  {
    id: 9,
    name: "Favour Ndubuisi",
    role: "Health Care Assistant",
    status: "Inactive",
    contact_info: {
      email: "ndubuisifavour24@gmail.com",
      phone: "",
      address: "",
    },
    recruitment_stage: "New applicant",
    progress: 0,
    days_in: 0,

    personal_info: 99,
    address_details: 14,
    passport_photo: 47,
    resume: 35,
    contact: 68,
    emergency_contact: 12,

    current_job: 51,
    previous_job: 32,

    educational_qualification: 53,

    right_to_work: 71,
    professional_memberships: 33,
    bank_payment_details: 12,
    immunisations: 40,
    driving_details: 52,

    health_declarations: 28,
    disability_discrimination_act: 61,
    confidentiality: 85,
    consent_for_the_use_of_staff_photographic_images: 13,
    personal_declarations: 34,
    working_time_regulations_declarations: 73,
    other_declarations: 42,
    health_and_safety: 76,
    rehabilitation_of_offenders_act_1974: 25,
  },

  {
    id: 10,
    name: "Idris Adebayo",
    role: "Health Care Assistant",
    status: "Inactive",
    contact_info: {
      email: "Eedris.rep@gmail.com",
      phone: "07760873444",
      address: "NP20 2SD",
    },
    recruitment_stage: "New applicant",
    progress: 10,
    days_in: 6,

    personal_info: 68,
    address_details: 55,
    passport_photo: 92,
    resume: 31,
    contact: 18,
    emergency_contact: 66,

    current_job: 75,
    previous_job: 42,

    educational_qualification: 63,

    right_to_work: 95,
    professional_memberships: 28,
    bank_payment_details: 14,
    immunisations: 29,
    driving_details: 60,

    health_declarations: 83,
    disability_discrimination_act: 26,
    confidentiality: 77,
    consent_for_the_use_of_staff_photographic_images: 18,
    personal_declarations: 92,
    working_time_regulations_declarations: 51,
    other_declarations: 17,
    health_and_safety: 89,
    rehabilitation_of_offenders_act_1974: 45,
  },
];
