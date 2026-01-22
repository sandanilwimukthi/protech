"use client";

import { useState } from "react";
import Header from "@/components/Header";
import DataTable from "@/components/DataTable";
import type { Part } from "@/types";

// Mock data - replace with actual data source
const mockParts: Part[] = [
  {
    ddc: "D0612CBL",
    qty: 1,
    designation: "CABLE",
    characteristic: "R345 / R345 - 4P - 5m",
    manufacturer: "MULEX",
    reference: "1201080560",
  },
  {
    ddc: "W0105",
    qty: 1,
    designation: "CABLE",
    characteristic: "ÑLFLEX FD 091 1201.5",
    manufacturer: "LAPP",
    reference: "1026312",
  },
  {
    ddc: "W0105",
    qty: 2,
    designation: "INSERTS",
    characteristic: "10B - 10P - FEMALE - 0.75...2.5mm² - SCREW",
    manufacturer: "HARTING",
    reference: "09 33 010 2701",
  },
  {
    ddc: "W0105",
    qty: 2,
    designation: "HUUSING",
    characteristic: "10B - BULKHEAD MUUNTING",
    manufacturer: "HARTING",
    reference: "09 30 010 0301",
  },
  {
    ddc: "W0105",
    qty: 2,
    designation: "HUUD",
    characteristic: "10B - 1x M20 - LATERAL UUTPUT",
    manufacturer: "HARTING",
    reference: "19 30 010 1520",
  },
  {
    ddc: "W0210",
    qty: 1,
    designation: "INSERTS",
    characteristic: "10B - 10P - FEMALE - 0.75...2.5mm² - SCREW",
    manufacturer: "HARTING",
    reference: "09 33 010 2701",
  },
  {
    ddc: "W0210",
    qty: 1,
    designation: "HUUSING",
    characteristic: "10B - 1x M20 - HUUSING BULKHEAD",
    manufacturer: "HARTING",
    reference: "19 30 010 1230",
  },
  {
    ddc: "W0210A",
    qty: 1,
    designation: "CABLE",
    characteristic: "ÑLFLEX FD 091 1201.5",
    manufacturer: "LAPP",
    reference: "1026312",
  },
];

export default function BOMPage() {
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  const columns = [
    { header: "DDC", accessor: "ddc" },
    { header: "QTY", accessor: "qty" },
    { header: "DESIGNATION", accessor: "designation" },
    { header: "CHARACTERISTIC", accessor: "characteristic" },
    { header: "Manufacturer", accessor: "manufacturer" },
    { header: "REFERENCE", accessor: "reference" },
  ];

  return (
    <div className="min-h-screen bg-body-bg dark:bg-body-bg-dark pt-40">
      <Header />
      <main className="container py-14">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-lightsky dark:text-lightsky-dark mb-2">Bill of Materials</h1>
        <p className="text-lightblue dark:text-lightblue-dark mb-8">Browse parts and component information</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Parts Table */}
          <div className="lg:col-span-2 bg-tablebg dark:bg-tablebg-dark rounded-2xl border border-border dark:border-border-dark">
            <div className="p-6 border-b border-border dark:border-border-dark">
              <h2 className="text-xl font-semibold text-lightsky dark:text-lightsky-dark">PART LIST</h2>
            </div>
            <DataTable
              columns={columns}
              data={mockParts}
              onRowClick={(row) => setSelectedPart(row)}
            />
          </div>

          {/* Part Details Panel */}
          <div className="bg-tablebg dark:bg-tablebg-dark rounded-2xl border border-border dark:border-border-dark p-6">
            <h2 className="text-xl font-semibold text-lightsky dark:text-lightsky-dark mb-4">
              Component Manual
            </h2>
            {selectedPart ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-lightblue dark:text-lightblue-dark mb-1 block">Part Number</label>
                  <p className="text-lightsky dark:text-white font-medium">{selectedPart.reference}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-lightblue dark:text-lightblue-dark mb-1 block">Designation</label>
                  <p className="text-lightsky dark:text-white">{selectedPart.designation}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-lightblue dark:text-lightblue-dark mb-1 block">Characteristic</label>
                  <p className="text-lightsky dark:text-white">{selectedPart.characteristic}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-lightblue dark:text-lightblue-dark mb-1 block">Manufacturer</label>
                  <p className="text-lightsky dark:text-white">{selectedPart.manufacturer}</p>
                </div>
                <div className="pt-4 border-t border-border dark:border-border-dark">
                  <p className="text-sm text-lightblue dark:text-lightblue-dark mb-3">
                    Manual and datasheet will be displayed here when available.
                  </p>
                  {selectedPart.manualUrl && (
                    <a
                      href={selectedPart.manualUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-primary hover:bg-secondary text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      View Manual
                    </a>
                  )}
                  {selectedPart.datasheetUrl && (
                    <a
                      href={selectedPart.datasheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-primary hover:bg-secondary text-white rounded-lg transition-colors text-sm font-medium mt-2"
                    >
                      View Datasheet
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-lightblue dark:text-lightblue-dark text-sm">
                Select a part from the list to view its manual and datasheet.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
