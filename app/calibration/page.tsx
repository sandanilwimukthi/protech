"use client";

import Header from "@/components/Header";
import DataTable from "@/components/DataTable";
import { formatDate } from "@/lib/utils";
import { Calendar, CheckCircle2, XCircle } from "lucide-react";

// Mock data - replace with actual data source
const mockCalibrations = [
  {
    id: "cal-1",
    equipmentName: "Pressure Sensor 001",
    calibrationDate: new Date("2024-01-15"),
    nextDueDate: new Date("2024-07-15"),
    status: "valid",
    performedBy: "John Doe",
    certificateNumber: "CAL-2024-001",
  },
  {
    id: "cal-2",
    equipmentName: "Temperature Probe 002",
    calibrationDate: new Date("2023-12-01"),
    nextDueDate: new Date("2024-06-01"),
    status: "due_soon",
    performedBy: "Jane Smith",
    certificateNumber: "CAL-2023-045",
  },
  {
    id: "cal-3",
    equipmentName: "Flow Meter 003",
    calibrationDate: new Date("2023-06-10"),
    nextDueDate: new Date("2024-03-10"),
    status: "overdue",
    performedBy: "Bob Johnson",
    certificateNumber: "CAL-2023-023",
  },
];

export default function CalibrationPage() {
  const columns = [
    { header: "Equipment Name", accessor: "equipmentName" },
    {
      header: "Calibration Date",
      accessor: "calibrationDate",
      render: (value: Date) => formatDate(value),
    },
    {
      header: "Next Due Date",
      accessor: "nextDueDate",
      render: (value: Date) => formatDate(value),
    },
    {
      header: "Status",
      accessor: "status",
      render: (value: string) => {
        const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
          valid: {
            label: "Valid",
            color: "bg-green-100 text-green-800",
            icon: CheckCircle2,
          },
          due_soon: {
            label: "Due Soon",
            color: "bg-yellow-100 text-yellow-800",
            icon: Calendar,
          },
          overdue: {
            label: "Overdue",
            color: "bg-red-100 text-red-800",
            icon: XCircle,
          },
        };
        const config = statusConfig[value] || statusConfig.valid;
        const Icon = config.icon;
        return (
          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium ${config.color}`}>
            <Icon className="h-3 w-3" />
            <span>{config.label}</span>
          </span>
        );
      },
    },
    { header: "Performed By", accessor: "performedBy" },
    { header: "Certificate Number", accessor: "certificateNumber" },
  ];

  return (
    <div className="min-h-screen bg-body-bg dark:bg-body-bg-dark pt-40">
      <Header />
      <main className="container py-14">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-lightsky dark:text-lightsky-dark mb-2">
          Calibration and Validation
        </h1>
        <p className="text-lightblue dark:text-lightblue-dark mb-8">Equipment calibration records and validation checklists</p>

        <div className="bg-tablebg dark:bg-tablebg-dark rounded-2xl border border-border dark:border-border-dark">
          <div className="p-6 border-b border-border dark:border-border-dark">
            <h2 className="text-xl font-semibold text-lightsky dark:text-lightsky-dark">
              Calibration Records
            </h2>
          </div>
          <DataTable columns={columns} data={mockCalibrations} />
        </div>

        <div className="mt-4 md:mt-6 bg-tablebg dark:bg-tablebg-dark rounded-xl md:rounded-2xl border border-border dark:border-border-dark p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-lightsky dark:text-lightsky-dark mb-4">
            Validation Checklists
          </h2>
          <p className="text-sm md:text-base text-lightblue dark:text-lightblue-dark">
            Validation checklists and records will be displayed here. This section can include
            Factory Acceptance Test (FAT) reports, run-off data, capability studies, and
            commissioning documentation.
          </p>
        </div>
      </main>
    </div>
  );
}
