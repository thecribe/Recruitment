"use client";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  RadialBar,
  RadialBarChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DepartmentCard = () => {
  const data = [
    {
      name: "Total",
      uv: 100,
      fill: "#ffffff",
    },
    {
      name: "Approved",
      uv: 40,
      fill: "#8dd1e1",
    },
    {
      name: "Unapproved",
      uv: 60,
      fill: "#83a6ed",
    },
  ];
  const dataApplicants = [
    {
      name: "Page A",
      uv: 4000,
    },
    {
      name: "Page B",
      uv: 3000,
    },
    {
      name: "Page C",
      uv: 2000,
    },
    {
      name: "Page D",
      uv: 2780,
    },
    {
      name: "Page E",
      uv: 1890,
    },
    {
      name: "Page F",
      uv: 2390,
    },
    {
      name: "Page G",
      uv: 3490,
    },
  ];
  return (
    <div className="w-full flex flex-col gap-3">
      <h2 className="w-full bg-white p-3 rounded-md font-bold text-base">
        Dormicillairy Overview
      </h2>
      <div className="w-full flex flex-col gap-3 xl:flex-row ">
        <div className="w-full xl:w-1/2 h-[400px] relative flex p-4 gap-4 flex-col justify-center items-center bg-white">
          <h3 className="font-semibold text-sm">
            Recruitment Data - Approved/Unapproved
          </h3>
          <div className="absolute  flex  gap-5 left-0 bottom-3 w-full justify-center items-center">
            <div className=" flex gap-2 items-center justify-center">
              <div className="w-3 h-3 bg-blue-500/50 rounded-full "></div>
              <div className="flex flex-col">
                <h3 className="text-xs font-bold text-blue-500/50">Name:</h3>
                <span className="font-semibold text-xs">60%</span>
              </div>
            </div>
            <div className=" flex gap-2 items-center justify-center">
              <div className="w-3 h-3 bg-blue-500/50 rounded-full "></div>
              <div className="flex flex-col">
                <h3 className="text-xs font-bold text-blue-500/50">Name:</h3>
                <span className="font-semibold text-xs">60%</span>
              </div>
            </div>
          </div>

          <RadialBarChart
            className=" w-full h-[80%] text-xs "
            responsive
            cx="50%"
            cy="40%"
            barSize={20}
            innerRadius={20}
            data={data}
          >
            <RadialBar
              label={{ position: "insideStart", fill: "#fff" }}
              background
              dataKey="uv"
            />
          </RadialBarChart>
        </div>
        <div className="w-full xl:w-1/2 h-[400px] p-4 relative flex gap-4 flex-col justify-center items-center bg-white">
          <h3 className="font-semibold text-sm">Total number of Applicants</h3>

          <LineChart
            className=" w-full h-[80%] text-xs "
            responsive
            data={dataApplicants}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis width="auto" />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
