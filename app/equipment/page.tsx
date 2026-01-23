"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { ChevronRight, Settings, Layers, Package } from "lucide-react";
import type { Equipment, Subsystem, Component } from "@/types";

// Mock data - replace with actual data source
const mockEquipment: Equipment[] = [
  {
    id: "eq-1",
    name: "Main Production Line",
    type: "Assembly Line",
    description: "Primary production equipment",
    subsystems: [
      {
        id: "sub-1",
        name: "Electrical System",
        equipmentId: "eq-1",
        components: [
          {
            id: "comp-1",
            name: "Main Control Panel",
            designation: "CP-001",
            subsystemId: "sub-1",
          },
          {
            id: "comp-2",
            name: "Motor Controller",
            designation: "MC-001",
            subsystemId: "sub-1",
          },
        ],
      },
      {
        id: "sub-2",
        name: "Mechanical System",
        equipmentId: "eq-1",
        components: [
          {
            id: "comp-3",
            name: "Conveyor Belt",
            designation: "CB-001",
            subsystemId: "sub-2",
          },
        ],
      },
    ],
  },
];

type NavigationLevel = "equipment" | "subsystem" | "component";

export default function EquipmentPage() {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [selectedSubsystem, setSelectedSubsystem] = useState<Subsystem | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [currentLevel, setCurrentLevel] = useState<NavigationLevel>("equipment");

  const handleEquipmentSelect = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setSelectedSubsystem(null);
    setSelectedComponent(null);
    setCurrentLevel("subsystem");
  };

  const handleSubsystemSelect = (subsystem: Subsystem) => {
    setSelectedSubsystem(subsystem);
    setSelectedComponent(null);
    setCurrentLevel("component");
  };

  const handleComponentSelect = (component: Component) => {
    setSelectedComponent(component);
  };

  const handleBack = () => {
    if (currentLevel === "component") {
      setCurrentLevel("subsystem");
      setSelectedComponent(null);
    } else if (currentLevel === "subsystem") {
      setCurrentLevel("equipment");
      setSelectedSubsystem(null);
      setSelectedEquipment(null);
    }
  };

  return (
    <div className="min-h-screen bg-body-bg dark:bg-body-bg-dark pt-40">
      <Header />
      <main className="container py-14">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-lightsky dark:text-lightsky-dark mb-2">Equipment</h1>
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-lightblue dark:text-lightblue-dark">
            <button
              onClick={() => {
                setCurrentLevel("equipment");
                setSelectedEquipment(null);
                setSelectedSubsystem(null);
                setSelectedComponent(null);
              }}
              className="hover:text-primary"
            >
              Equipment
            </button>
            {selectedEquipment && (
              <>
                <ChevronRight className="h-4 w-4 text-lightblue" />
                <button
                  onClick={() => {
                    setCurrentLevel("subsystem");
                    setSelectedSubsystem(null);
                    setSelectedComponent(null);
                  }}
                  className="hover:text-primary"
                >
                  {selectedEquipment.name}
                </button>
              </>
            )}
            {selectedSubsystem && (
              <>
                <ChevronRight className="h-4 w-4 text-lightblue dark:text-lightblue-dark" />
                <span className="text-lightsky dark:text-white">{selectedSubsystem.name}</span>
              </>
            )}
            {selectedComponent && (
              <>
                <ChevronRight className="h-4 w-4 text-lightblue dark:text-lightblue-dark" />
                <span className="text-lightsky dark:text-white">{selectedComponent.name}</span>
              </>
            )}
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Navigation Panel */}
          <div className="lg:col-span-2 bg-tablebg dark:bg-tablebg-dark rounded-xl md:rounded-2xl border border-border dark:border-border-dark p-4 md:p-6">
            {currentLevel === "equipment" && (
              <div>
                <h2 className="text-xl font-semibold text-lightsky dark:text-lightsky-dark mb-4">
                  Select Equipment
                </h2>
                <div className="space-y-3">
                  {mockEquipment.map((equipment) => (
                    <button
                      key={equipment.id}
                      onClick={() => handleEquipmentSelect(equipment)}
                      className="w-full flex items-center justify-between p-4 border border-border dark:border-border-dark rounded-lg hover:bg-darkmode dark:hover:bg-darkmode-dark hover:border-primary transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Settings className="h-5 w-5 text-lightblue dark:text-lightblue-dark" />
                        <div className="text-left">
                          <div className="font-medium text-lightsky dark:text-white">{equipment.name}</div>
                          <div className="text-sm text-lightblue dark:text-lightblue-dark">{equipment.type}</div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-lightblue dark:text-lightblue-dark" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentLevel === "subsystem" && selectedEquipment && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-lightsky dark:text-lightsky-dark">
                    {selectedEquipment.name} - Subsystems
                  </h2>
                  <button
                    onClick={handleBack}
                    className="text-sm text-primary hover:text-secondary"
                  >
                    ← Back
                  </button>
                </div>
                <div className="space-y-3">
                  {selectedEquipment.subsystems?.map((subsystem) => (
                    <button
                      key={subsystem.id}
                      onClick={() => handleSubsystemSelect(subsystem)}
                      className="w-full flex items-center justify-between p-4 border border-border dark:border-border-dark rounded-lg hover:bg-darkmode dark:hover:bg-darkmode-dark hover:border-primary transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Layers className="h-5 w-5 text-lightblue dark:text-lightblue-dark" />
                        <div className="font-medium text-lightsky dark:text-white">{subsystem.name}</div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-lightblue dark:text-lightblue-dark" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentLevel === "component" && selectedSubsystem && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-lightsky dark:text-lightsky-dark">
                    {selectedSubsystem.name} - Components
                  </h2>
                  <button
                    onClick={handleBack}
                    className="text-sm text-primary hover:text-secondary"
                  >
                    ← Back
                  </button>
                </div>
                <div className="space-y-3">
                  {selectedSubsystem.components?.map((component) => (
                    <button
                      key={component.id}
                      onClick={() => handleComponentSelect(component)}
                      className="w-full flex items-center justify-between p-4 border border-border dark:border-border-dark rounded-lg hover:bg-darkmode dark:hover:bg-darkmode-dark hover:border-primary transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Package className="h-5 w-5 text-lightblue dark:text-lightblue-dark" />
                        <div className="text-left">
                          <div className="font-medium text-lightsky dark:text-white">{component.name}</div>
                          <div className="text-sm text-lightblue dark:text-lightblue-dark">{component.designation}</div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-lightblue dark:text-lightblue-dark" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Details Panel */}
          <div className="bg-tablebg dark:bg-tablebg-dark rounded-xl md:rounded-2xl border border-border dark:border-border-dark p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold text-lightsky dark:text-lightsky-dark mb-4">Details</h2>
            {selectedComponent ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-lightblue dark:text-lightblue-dark">Component Name</label>
                  <p className="text-lightsky dark:text-white">{selectedComponent.name}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-lightblue dark:text-lightblue-dark">Designation</label>
                  <p className="text-lightsky dark:text-white">{selectedComponent.designation}</p>
                </div>
                <div className="pt-4 border-t border-border dark:border-border-dark">
                  <h3 className="font-semibold text-lightsky dark:text-lightsky-dark mb-2">Available Resources</h3>
                  <div className="space-y-2">
                    {selectedComponent.manualUrl && (
                      <a
                        href={selectedComponent.manualUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-primary hover:text-secondary underline"
                      >
                        View Manual
                      </a>
                    )}
                    {selectedComponent.datasheetUrl && (
                      <a
                        href={selectedComponent.datasheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-primary hover:text-secondary underline"
                      >
                        View Datasheet
                      </a>
                    )}
                    {!selectedComponent.manualUrl && !selectedComponent.datasheetUrl && (
                      <p className="text-sm text-lightblue dark:text-lightblue-dark">
                        No additional resources available for this component.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : selectedSubsystem ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-lightblue dark:text-lightblue-dark">Subsystem Name</label>
                  <p className="text-lightsky dark:text-white">{selectedSubsystem.name}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-lightblue dark:text-lightblue-dark">Components</label>
                  <p className="text-lightsky dark:text-white">
                    {selectedSubsystem.components?.length || 0} component(s)
                  </p>
                </div>
              </div>
            ) : selectedEquipment ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-lightblue dark:text-lightblue-dark">Equipment Name</label>
                  <p className="text-lightsky dark:text-white">{selectedEquipment.name}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-lightblue dark:text-lightblue-dark">Type</label>
                  <p className="text-lightsky dark:text-white">{selectedEquipment.type}</p>
                </div>
                {selectedEquipment.description && (
                  <div>
                    <label className="text-sm font-semibold text-lightblue dark:text-lightblue-dark">Description</label>
                    <p className="text-lightsky dark:text-white">{selectedEquipment.description}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-semibold text-lightblue dark:text-lightblue-dark">Subsystems</label>
                  <p className="text-lightsky dark:text-white">
                    {selectedEquipment.subsystems?.length || 0} subsystem(s)
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-lightblue dark:text-lightblue-dark text-sm">
                Select an item from the navigation to view details.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
