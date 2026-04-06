"use client";
import React, { createContext, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import FormDisplay from "./FormDisplay";
import PersonalInfoForm from "../Forms/PersonalInfoForm";
import Address from "../Forms/Address";
import Passports from "../Forms/Passports";
import Resume from "../Forms/Resume";
import ContactInfo from "../Forms/ContactInfo";
import EmergencyContact from "../Forms/EmergencyContact";
import CurrentJob from "../Forms/CurrentJob";
import PreviousJob from "../Forms/PreviousJob";
import Education from "../Forms/Education";
import RightToWork from "../Forms/RightToWork";
import ProfessionalMembership from "../Forms/ProfessionalMembership";
import BankDetails from "../Forms/BankDetails";
import Immunisation from "../Forms/Immunisation";
import DrivingDetails from "../Forms/DrivingDetails";
import Health from "../Declarations/Health";
import DisabilityAct from "../Declarations/DisabilityAct";
import Confidentiality from "../Declarations/Confidentiality";
import Consent from "../Declarations/Consent";
import PersonalDeclaration from "../Declarations/PersonalDeclaration";
import WorkingTime from "../Declarations/WorkingTime";
import OtherDeclarations from "../Declarations/OtherDeclarations";
import HealthAndSafety from "../Declarations/HealthAndSafety";
import Rehabilitation from "../Declarations/Rehabilitation";
import { usePathname } from "next/navigation";
import LoadingState from "../LoadingState";
import { instance } from "@/utils/axiosConfig";

export const formNav = [
  {
    title: "Personal Details",
    slug: "personal_details",
    menu: [
      {
        title: "Personal Info",
        component: <PersonalInfoForm />,
        query: "personal_info",
      },
      {
        title: "Address Details",
        component: <Address />,
        query: "address_details",
      },
      {
        title: "Passport Size Photo & Ni Number",
        component: <Passports />,
        query: "passport_photo",
      },
      {
        title: "Resume & Birth Certificate",
        component: <Resume />,
        query: "resume",
      },
      {
        title: "Contact Information",
        component: <ContactInfo />,
        query: "contact",
      },
      {
        title: "Emergency Contact",
        component: <EmergencyContact />,
        query: "emergency_contact",
      },
    ],
  },
  {
    title: "Work History",
    slug: "work_history",
    menu: [
      {
        title: "Current Job details",
        component: <CurrentJob />,
        query: "current_job",
      },
      {
        title: "Previous Job Details",
        component: <PreviousJob />,
        query: "previous_job",
      },
    ],
  },
  {
    title: "EDUCATION, QUALIFICATION AND TRAINING",
    slug: "qualification",
    menu: [
      {
        title: "Educational Qualification",
        component: <Education />,
        query: "educational_qualification",
      },
    ],
  },
  {
    title: "Professional Memberships",
    slug: "memberships",
    menu: [
      {
        title: "Right To Work",
        component: <RightToWork />,
        query: "right_to_work",
      },
      {
        title: "Professional Memberships",
        component: <ProfessionalMembership />,
        query: "professional_memberships",
      },
      {
        title: "Bank Payment Details",
        component: <BankDetails />,
        query: "bank_payment_details",
      },
      {
        title: "Immunisations",
        component: <Immunisation />,
        query: "immunisations",
      },
      {
        title: "Driving Details",
        component: <DrivingDetails />,
        query: "driving_details",
      },
    ],
  },
  {
    title: "Registration Declaration",
    slug: "declarations",
    menu: [
      {
        title: "Health Declarations",
        component: <Health />,
        query: "health_declarations",
      },
      {
        title: "Disability Discrimination Act",
        component: <DisabilityAct />,
        query: "disability_discrimination_act",
      },
      {
        title: "Confidentiality",
        component: <Confidentiality />,
        query: "confidentiality",
      },
      {
        title: "Consent For The Use Of Staff Photographic Images",
        component: <Consent />,
        query: "consent",
      },
      {
        title: "Personal Declarations",
        component: <PersonalDeclaration />,
        query: "personal_declarations",
      },
      {
        title: "Working Time Regulations Declarations",
        component: <WorkingTime />,
        query: "working_time",
      },
      {
        title: "Other Declarations",
        component: <OtherDeclarations />,
        query: "other_declarations",
      },
      {
        title: "Health And Safety",
        component: <HealthAndSafety />,
        query: "health_and_safety",
      },
      {
        title: "Rehabilitation Of Offenders Act 1974",
        component: <Rehabilitation />,
        query: "rehabilitation",
      },
    ],
  },
  // {
  //   title: "Availability",
  //   menu: [
  //     {
  //       title: "Care Work Availability",
  //       component: "",
  //       query: "care_work_availability",
  //     },
  //     {
  //       title: "Work Time Availability",
  //       component: "",
  //       query: "work_time_availability",
  //     },
  //     { title: "Availability", component: "", query: "availability" },
  //   ],
  // },
];

const ScreeningWrapper = ({ id, type }: { id: string; type?: string }) => {
  const pathname = usePathname();
  const [completionRate, setCompletionRate] = useState<any | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await instance.get(`/completion-rate/forms/${id}`);

        setCompletionRate(response.data.completionRates);
      } catch (error) {
        setCompletionRate(null);
      }
    };

    getData();
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center p-8 overflow-y-auto">
      <div className="flex flex-col  md:flex-row gap-3 w-full h-full overflow-y-auto">
        <div className="w-full md:w-1/5 overflow-y-auto bg-white rounded-3xl p-6 flex flex-col gap-10 md:h-full shadow-sm border border-gray-100">
          {formNav.map((parentMenu, index) => {
            return (
              <div key={index} className="flex gap-4 flex-col w-full  ">
                <h2 className="uppercase font-medium text-gray-800/70 truncate text-lg">
                  {parentMenu.title}
                </h2>
                <div className=" flex flex-col text-xs ">
                  {parentMenu.menu.map((childrenMenu, index) => (
                    <Link
                      href={`${pathname}?query=${childrenMenu.query}`}
                      key={index}
                      className="py-2 rounded-md hover:bg-gray-500/30 cursor-pointer hover:shadow-sm hover:shadow-black/10 active:scale-95 active:shadow-black/10 transition-all duration-300 text-sm px-4 text-gray-500 truncate lg:overflow-visible lg:whitespace-normal "
                    >
                      {childrenMenu.title}
                      <span className="hidden xl:block float-right text-sm font-medium text-gray-400">
                        {completionRate
                          ? completionRate[childrenMenu.query] + "%"
                          : "0%"}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="md:flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:overflow-y-auto">
          <Suspense
            fallback={
              <LoadingState className="w-full flex justify-center items-center " />
            }
          >
            <FormDisplay formNav={formNav} id={id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ScreeningWrapper;
