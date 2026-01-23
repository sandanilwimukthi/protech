"use client";

import { ReactNode } from "react";

interface Column {
  header: string;
  accessor: string;
  render?: (value: any, row: any) => ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
}

export default function DataTable({ columns, data, onRowClick }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl md:rounded-2xl border border-border dark:border-border-dark -mx-4 md:mx-0">
      <table className="table-auto w-full min-w-[640px]">
        <thead>
          <tr className="text-lightsky dark:text-white bg-border dark:bg-border-dark rounded-2xl">
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="px-3 md:px-4 py-3 md:py-4 text-left text-xs font-normal text-lightsky dark:text-white uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-border dark:border-border-dark transition-colors duration-150 ${
                onRowClick
                  ? "cursor-pointer hover:bg-darkmode/50 dark:hover:bg-darkmode-dark/50 active:bg-darkmode dark:active:bg-darkmode-dark"
                  : ""
              }`}
            >
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className="px-3 md:px-4 py-4 md:py-6 text-xs md:text-sm text-lightsky dark:text-white"
                >
                  {column.render
                    ? column.render(row[column.accessor], row)
                    : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
