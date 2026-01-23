"use client";

import { useState } from "react";
import Header from "@/components/Header";
import DataTable from "@/components/DataTable";
import type { Fault } from "@/types";

// Mock data - replace with actual data source
const mockFaults: Fault[] = [
  {
    id: "fault-1",
    name: "Fault 1",
    possibleRootCauses: ["Root cause 1", "Root cause 2", "Root cause 3"],
    troubleshootingSteps: ["Check 1", "Check 2", "Check 1"],
    alarmCode: "ALM001",
  },
  {
    id: "fault-2",
    name: "Fault 2",
    possibleRootCauses: ["Root cause 1", "Root cause 2"],
    troubleshootingSteps: ["Check 1", "Check 2", "Check 3"],
    alarmCode: "ALM002",
  },
  {
    id: "fault-3",
    name: "Fault 3",
    possibleRootCauses: ["Root cause 1"],
    troubleshootingSteps: ["Check 1"],
    alarmCode: "ALM003",
  },
];

export default function FaultsPage() {
  const [selectedFault, setSelectedFault] = useState<Fault | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaults = mockFaults.filter(
    (fault) =>
      fault.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fault.alarmCode?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { header: "Fault Name", accessor: "name" },
    {
      header: "Alarm Code",
      accessor: "alarmCode",
      render: (value: string) => value || "N/A",
    },
    {
      header: "Root Causes",
      accessor: "possibleRootCauses",
      render: (value: string[]) => `${value.length} possible cause(s)`,
    },
  ];

  return (
    <div className="min-h-screen bg-body-bg dark:bg-body-bg-dark pt-32 md:pt-40">
      <Header />
      <main className="container py-6 md:py-14 px-4">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-lightsky dark:text-lightsky-dark mb-2">
            Faults and Troubleshooting
          </h1>
          <p className="text-sm md:text-base text-lightblue dark:text-lightblue-dark mb-4 md:mb-6">Diagnose equipment faults and find solutions</p>
          <div className="w-full max-w-md">
            <input
              type="text"
              placeholder="Search by fault name or alarm code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 md:py-3 border border-border dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-darkmode dark:bg-darkmode-dark/50 text-sm md:text-base text-lightsky dark:text-white placeholder:text-lightblue dark:placeholder:text-lightblue-dark"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Faults List */}
          <div className="lg:col-span-2 bg-tablebg dark:bg-tablebg-dark rounded-xl md:rounded-2xl border border-border dark:border-border-dark">
            <div className="p-4 md:p-6 border-b border-border dark:border-border-dark">
              <h2 className="text-lg md:text-xl font-semibold text-lightsky dark:text-lightsky-dark">Fault List</h2>
            </div>
            <DataTable
              columns={columns}
              data={filteredFaults}
              onRowClick={(row) => setSelectedFault(row)}
            />
          </div>

          {/* Fault Details Panel */}
          <div className="bg-tablebg dark:bg-tablebg-dark rounded-xl md:rounded-2xl border border-border dark:border-border-dark p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold text-lightsky dark:text-lightsky-dark mb-4">Fault Details</h2>
            {selectedFault ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-lightsky dark:text-white mb-2">
                    {selectedFault.name}
                  </h3>
                  {selectedFault.alarmCode && (
                    <p className="text-sm text-lightblue dark:text-lightblue-dark bg-darkmode dark:bg-darkmode-dark px-3 py-1 rounded-lg inline-block border border-border dark:border-border-dark">
                      Alarm Code: <span className="font-semibold text-lightsky dark:text-white">{selectedFault.alarmCode}</span>
                    </p>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-lightsky dark:text-lightsky-dark mb-3">Possible Root Causes</h4>
                  <ul className="list-disc list-inside space-y-2 bg-darkmode dark:bg-darkmode-dark p-4 rounded-lg border border-border dark:border-border-dark">
                    {selectedFault.possibleRootCauses.map((cause, index) => (
                      <li key={index} className="text-sm text-lightblue dark:text-lightblue-dark">
                        {cause}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-lightsky dark:text-lightsky-dark mb-3">Troubleshooting Steps</h4>
                  <ol className="list-decimal list-inside space-y-2 bg-gradient-simple p-4 rounded-lg border border-border dark:border-border-dark">
                    {selectedFault.troubleshootingSteps.map((step, index) => (
                      <li key={index} className="text-sm text-lightsky dark:text-white">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ) : (
              <p className="text-lightblue dark:text-lightblue-dark text-sm">
                Select a fault from the list to view root causes and troubleshooting steps.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
