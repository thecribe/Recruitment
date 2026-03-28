"use client";
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const StaffCountChart = () => {
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
    <div className="flex flex-col gap-10  bg-white px-3 py-5">
      <h2 className="w-full rounded-md font-bold text-base">Number of Staff</h2>
      <div className="w-full h-[350px]">
        <LineChart
          className=" w-full h-[100%] text-sm"
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
  );
};

export default StaffCountChart;
