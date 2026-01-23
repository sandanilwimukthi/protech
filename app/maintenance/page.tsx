"use client";

import { useState } from "react";
import Header from "@/components/Header";
import DataTable from "@/components/DataTable";
import { formatDate } from "@/lib/utils";
import type { MaintenanceTask, MaintenanceLog } from "@/types";
import { Calendar, CheckCircle2, Circle } from "lucide-react";

// Mock data - replace with actual data source
const mockTasks: MaintenanceTask[] = [
  {
    id: "task-1",
    name: "Daily Safety Inspection",
    frequency: "daily",
    description: "Inspect all safety systems and emergency stops",
    howToDoIt: "1. Check all emergency stop buttons\n2. Verify safety interlocks\n3. Inspect guards and barriers",
    completed: false,
  },
  {
    id: "task-2",
    name: "Weekly Lubrication Check",
    frequency: "weekly",
    description: "Check and lubricate all moving parts",
    howToDoIt: "1. Inspect lubrication points\n2. Apply appropriate lubricant\n3. Check for leaks",
    completed: false,
  },
  {
    id: "task-3",
    name: "Monthly Filter Replacement",
    frequency: "monthly",
    description: "Replace air and fluid filters",
    howToDoIt: "1. Shut down equipment\n2. Remove old filters\n3. Install new filters\n4. Test operation",
    completed: false,
  },
];

const frequencyLabels: Record<string, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  "3months": "3 Months",
  "6months": "6 Months",
  yearly: "Yearly",
};

export default function MaintenancePage() {
  const [selectedFrequency, setSelectedFrequency] = useState<string>("all");
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);
  const [isPasswordProtected, setIsPasswordProtected] = useState(true);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const frequencies = ["daily", "weekly", "monthly", "3months", "6months", "yearly"];

  const filteredTasks = selectedFrequency === "all"
    ? mockTasks
    : mockTasks.filter((task) => task.frequency === selectedFrequency);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, validate password properly
    if (password === "maintenance") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (isPasswordProtected && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-body-bg dark:bg-body-bg-dark pt-32 md:pt-40">
        <Header />
        <main className="container py-8 md:py-16 px-4">
          <div className="max-w-md mx-auto bg-tablebg dark:bg-tablebg-dark rounded-xl md:rounded-2xl border border-border dark:border-border-dark p-6 md:p-8 glass-effect">
            <h2 className="text-2xl font-bold text-lightsky dark:text-lightsky-dark mb-4">
              Maintenance Access
            </h2>
            <p className="text-lightblue dark:text-lightblue-dark mb-6">
              This section is password protected. Please enter your credentials.
            </p>
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-lightblue dark:text-lightblue-dark mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-border dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-darkmode dark:bg-darkmode-dark/50 text-lightsky dark:text-white placeholder:text-lightblue dark:placeholder:text-lightblue-dark"
                  placeholder="Enter password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-primary text-white py-3 px-4 rounded-lg hover:bg-gradient-secondary transition-all font-semibold shadow-md hover:shadow-lg"
              >
                Access Maintenance
              </button>
            </form>
            <p className="mt-4 text-xs text-lightblue dark:text-lightblue-dark text-center">
              Demo password: maintenance
            </p>
          </div>
        </main>
      </div>
    );
  }

  const logColumns = [
    {
      header: "Maintenance Task",
      accessor: "taskName",
    },
    {
      header: "Completion",
      accessor: "completed",
          render: (value: boolean) => (
            <div className="flex items-center">
              {value ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400 dark:text-gray-600" />
              )}
            </div>
          ),
    },
    {
      header: "Direct Responsible Individual",
      accessor: "completedBy",
      render: (value: string) => value || "—",
    },
    {
      header: "Time Stamp",
      accessor: "timestamp",
      render: (value: Date) => (value ? formatDate(value) : "—"),
    },
  ];

  return (
    <div className="min-h-screen bg-body-bg dark:bg-body-bg-dark pt-32 md:pt-40">
      <Header />
      <main className="container py-6 md:py-14 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-lightsky dark:text-lightsky-dark mb-2">
          Preventive Maintenance Schedule
        </h1>
        <p className="text-sm md:text-base text-lightblue dark:text-lightblue-dark mb-6 md:mb-8">View and manage maintenance schedules by frequency</p>

        {/* Frequency Filter */}
        <div className="bg-tablebg dark:bg-tablebg-dark rounded-2xl border border-border dark:border-border-dark p-5 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFrequency("all")}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                selectedFrequency === "all"
                  ? "bg-gradient-primary text-white shadow-md"
                  : "bg-darkmode dark:bg-darkmode-dark text-lightblue dark:text-lightblue-dark hover:bg-border dark:hover:bg-border-dark"
              }`}
            >
              All
            </button>
            {frequencies.map((freq) => (
              <button
                key={freq}
                onClick={() => setSelectedFrequency(freq)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  selectedFrequency === freq
                    ? "bg-gradient-primary text-white shadow-md"
                    : "bg-darkmode dark:bg-darkmode-dark text-lightblue dark:text-lightblue-dark hover:bg-border dark:hover:bg-border-dark"
                }`}
              >
                {frequencyLabels[freq]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tasks List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Maintenance Log */}
            <div className="bg-tablebg dark:bg-tablebg-dark rounded-2xl border border-border dark:border-border-dark">
              <div className="p-6 border-b border-border dark:border-border-dark">
                <h2 className="text-xl font-semibold text-lightsky dark:text-lightsky-dark">
                  Preventive Maintenance Log - {frequencyLabels[selectedFrequency] || "All"}
                </h2>
              </div>
              <DataTable
                columns={logColumns}
                data={filteredTasks.map((task) => ({
                  taskName: task.name,
                  completed: task.completed,
                  completedBy: task.completedBy || "",
                  timestamp: task.completedDate,
                }))}
                onRowClick={(row) => {
                  const task = mockTasks.find((t) => t.name === row.taskName);
                  if (task) setSelectedTask(task);
                }}
              />
            </div>

            {/* Task Details */}
            {selectedTask && (
              <div className="bg-tablebg dark:bg-tablebg-dark rounded-xl md:rounded-2xl border border-border dark:border-border-dark p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold text-lightsky dark:text-lightsky-dark mb-4">
                  {selectedTask.name}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-lightblue dark:text-lightblue-dark mb-1 block">How to do it</label>
                    <div className="mt-1 whitespace-pre-line text-xs md:text-sm text-lightsky dark:text-white bg-darkmode dark:bg-darkmode-dark p-3 md:p-4 rounded-lg border border-border dark:border-border-dark">
                      {selectedTask.howToDoIt || "No instructions available"}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-lightblue dark:text-lightblue-dark mb-1 block">Notes</label>
                    <textarea
                      className="mt-1 w-full px-3 md:px-4 py-2.5 md:py-3 border border-border dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-darkmode dark:bg-darkmode-dark/50 text-sm md:text-base text-lightsky dark:text-white placeholder:text-lightblue dark:placeholder:text-lightblue-dark"
                      rows={3}
                      placeholder="Add notes..."
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                    <button className="flex-1 sm:flex-none px-4 md:px-5 py-2.5 bg-gradient-primary text-white rounded-lg hover:bg-gradient-secondary transition-all font-semibold shadow-md hover:shadow-lg text-sm md:text-base">
                      Mark as Completed
                    </button>
                    <button className="flex-1 sm:flex-none px-4 md:px-5 py-2.5 bg-darkmode dark:bg-darkmode-dark text-lightblue dark:text-lightblue-dark rounded-lg hover:bg-border dark:hover:bg-border-dark transition-colors font-medium border border-border dark:border-border-dark text-sm md:text-base">
                      Today
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="bg-tablebg dark:bg-tablebg-dark rounded-xl md:rounded-2xl border border-border dark:border-border-dark p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-lightsky dark:text-lightsky-dark mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2.5 bg-darkmode dark:bg-darkmode-dark rounded-lg hover:bg-border dark:hover:bg-border-dark hover:text-primary transition-colors font-medium text-lightsky dark:text-white">
                View All Tasks
              </button>
              <button className="w-full text-left px-4 py-2.5 bg-darkmode dark:bg-darkmode-dark rounded-lg hover:bg-border dark:hover:bg-border-dark hover:text-primary transition-colors font-medium text-lightsky dark:text-white">
                Export Log
              </button>
              <button className="w-full text-left px-4 py-2.5 bg-darkmode dark:bg-darkmode-dark rounded-lg hover:bg-border dark:hover:bg-border-dark hover:text-primary transition-colors font-medium text-lightsky dark:text-white">
                Schedule Report
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
