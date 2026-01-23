"use client";

import { useState } from "react";
import Header from "@/components/Header";
import DataTable from "@/components/DataTable";
import { formatDate, getDateRangeStatus, getDaysDifference } from "@/lib/utils";
import type { WorkOrder } from "@/types";

// Mock data - replace with actual data source
const mockWorkOrders: WorkOrder[] = [
  {
    id: "1",
    taskId: "task-1",
    taskName: "Daily Safety Inspection",
    dueDate: new Date("2024-02-19"),
    status: "overdue",
    safetyRequired: true,
  },
  {
    id: "2",
    taskId: "task-2",
    taskName: "Weekly Lubrication Check",
    dueDate: new Date("2024-03-06"),
    status: "overdue",
    safetyRequired: false,
  },
  {
    id: "3",
    taskId: "task-3",
    taskName: "Monthly Filter Replacement",
    dueDate: new Date("2024-03-21"),
    status: "due_today",
    safetyRequired: false,
  },
  {
    id: "4",
    taskId: "task-4",
    taskName: "Quarterly Calibration",
    dueDate: new Date("2024-03-25"),
    status: "upcoming",
    safetyRequired: true,
  },
];

interface DateRange {
  label: string;
  from?: Date;
  to?: Date;
  status: "overdue" | "due_today" | "upcoming";
}

export default function WorkOrdersPage() {
  const [selectedRange, setSelectedRange] = useState<string>("all");

  const dateRanges: DateRange[] = [
    {
      label: "> 30 Days Past Due",
      to: new Date("2024-02-19"),
      status: "overdue",
    },
    {
      label: "15-30 Days Past Due",
      from: new Date("2024-02-20"),
      to: new Date("2024-03-06"),
      status: "overdue",
    },
    {
      label: "1-14 Days Past Due",
      from: new Date("2024-03-07"),
      to: new Date("2024-03-20"),
      status: "overdue",
    },
    {
      label: "TODAY",
      from: new Date("2024-03-21"),
      to: new Date("2024-03-21"),
      status: "due_today",
    },
    {
      label: "Next 7 Days",
      from: new Date("2024-03-22"),
      to: new Date("2024-03-29"),
      status: "upcoming",
    },
    {
      label: "Next 8-14 Days",
      from: new Date("2024-03-30"),
      to: new Date("2024-04-05"),
      status: "upcoming",
    },
    {
      label: "Next 15+ Days",
      from: new Date("2024-04-06"),
      to: new Date("9999-12-31"),
      status: "upcoming",
    },
  ];

  const getFilteredOrders = () => {
    if (selectedRange === "all") return mockWorkOrders;
    
    const range = dateRanges.find((r) => r.label === selectedRange);
    if (!range) return mockWorkOrders;

    return mockWorkOrders.filter((order) => {
      const orderDate = new Date(order.dueDate);
      if (range.from && orderDate < range.from) return false;
      if (range.to && orderDate > range.to) return false;
      return order.status === range.status;
    });
  };

  const getRangeStats = (range: DateRange) => {
    const orders = mockWorkOrders.filter((order) => {
      const orderDate = new Date(order.dueDate);
      if (range.from && orderDate < range.from) return false;
      if (range.to && orderDate > range.to) return false;
      return order.status === range.status;
    });
    return {
      qty: orders.length,
      safety: orders.filter((o) => o.safetyRequired).length,
    };
  };

  const columns = [
    { header: "Task Name", accessor: "taskName" },
    {
      header: "Due Date",
      accessor: "dueDate",
      render: (value: Date) => formatDate(value),
    },
    {
      header: "Status",
      accessor: "status",
      render: (value: string) => {
        const colors: Record<string, string> = {
          overdue: "bg-red-500/20 text-red-400 border border-red-500/30",
          due_today: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
          upcoming: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
        };
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[value] || ""}`}>
            {value.replace("_", " ").toUpperCase()}
          </span>
        );
      },
    },
    {
      header: "Safety Required",
      accessor: "safetyRequired",
      render: (value: boolean) => (value ? "Yes" : "No"),
    },
  ];

  return (
    <div className="min-h-screen bg-body-bg dark:bg-body-bg-dark pt-32 md:pt-40">
      <Header />
      <main className="container py-6 md:py-14 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-lightsky dark:text-lightsky-dark mb-2">Open Work Orders</h1>
        <p className="text-sm md:text-base text-lightblue dark:text-lightblue-dark mb-6 md:mb-8">View and manage work orders by date range</p>

        {/* Date Range Filter Table */}
        <div className="bg-tablebg dark:bg-tablebg-dark rounded-xl md:rounded-2xl mb-4 md:mb-6 overflow-hidden border border-border dark:border-border-dark">
          <div className="overflow-x-auto">
            <table className="table-auto w-full min-w-[600px]">
              <thead>
                <tr className="text-lightsky dark:text-white bg-border dark:bg-border-dark rounded-2xl">
                  <th className="px-3 md:px-4 py-3 md:py-4 text-left text-xs font-normal text-lightsky dark:text-white uppercase tracking-wider">
                    Range
                  </th>
                  <th className="px-3 md:px-4 py-3 md:py-4 text-left text-xs font-normal text-lightsky dark:text-white uppercase tracking-wider">
                    From
                  </th>
                  <th className="px-3 md:px-4 py-3 md:py-4 text-left text-xs font-normal text-lightsky dark:text-white uppercase tracking-wider">
                    To
                  </th>
                  <th className="px-3 md:px-4 py-3 md:py-4 text-left text-xs font-normal text-lightsky dark:text-white uppercase tracking-wider">
                    Qty
                  </th>
                  <th className="px-3 md:px-4 py-3 md:py-4 text-left text-xs font-normal text-lightsky dark:text-white uppercase tracking-wider">
                    Safety
                  </th>
                </tr>
              </thead>
              <tbody>
                {dateRanges.map((range, index) => {
                  const stats = getRangeStats(range);
                  return (
                    <tr
                      key={index}
                      onClick={() => setSelectedRange(range.label)}
                      className={`cursor-pointer transition-colors duration-150 border-b border-border dark:border-border-dark hover:bg-darkmode/50 dark:hover:bg-darkmode-dark/50 ${
                        selectedRange === range.label ? "bg-darkmode dark:bg-darkmode-dark" : ""
                      }`}
                    >
                      <td className="px-3 md:px-4 py-4 md:py-6 text-xs md:text-sm font-medium text-lightsky dark:text-white">
                        {range.label}
                      </td>
                      <td className="px-3 md:px-4 py-4 md:py-6 text-xs md:text-sm text-lightblue dark:text-lightblue-dark">
                        {range.from ? formatDate(range.from) : ""}
                      </td>
                      <td className="px-3 md:px-4 py-4 md:py-6 text-xs md:text-sm text-lightblue dark:text-lightblue-dark">
                        {range.to ? formatDate(range.to) : ""}
                      </td>
                      <td className="px-3 md:px-4 py-4 md:py-6 text-xs md:text-sm font-semibold text-lightsky dark:text-white">
                        {stats.qty}
                      </td>
                      <td className="px-3 md:px-4 py-4 md:py-6 text-xs md:text-sm font-semibold text-lightsky dark:text-white">
                        {stats.safety}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Work Orders Table */}
        <div className="bg-tablebg dark:bg-tablebg-dark rounded-xl md:rounded-2xl border border-border dark:border-border-dark">
          <div className="p-4 md:p-6 border-b border-border dark:border-border-dark">
            <h2 className="text-lg md:text-xl font-semibold text-lightsky dark:text-lightsky-dark">
              Work Orders {selectedRange !== "all" && `- ${selectedRange}`}
            </h2>
          </div>
          <DataTable
            columns={columns}
            data={getFilteredOrders()}
            onRowClick={(row) => {
              // Navigate to work order detail or maintenance task
              console.log("Selected work order:", row);
            }}
          />
        </div>
      </main>
    </div>
  );
}
