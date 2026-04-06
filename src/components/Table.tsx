import React from "react";

const Table = ({
  columns,
  data,
  renderRow,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  data: {}[] | null;
  renderRow: (item: any, index?: number) => React.ReactNode;
}) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="my-5 sticky top-0">
          {columns.map((eachCol) => (
            <th
              key={eachCol.accessor}
              className={`${eachCol.className}  ${
                eachCol.accessor !== "actions" && "text-left"
              } text-sm text-black font-bold py-5  bg-gray-200 px-2`}
            >
              {eachCol.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="">
        {data?.map((item, index) => renderRow(item, index))}
      </tbody>
    </table>
  );
};

export default Table;
