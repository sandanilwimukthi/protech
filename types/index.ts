export type UserRole = 
  | "operator"
  | "maintenance_technician"
  | "engineer"
  | "supervisor"
  | "oem_service"
  | "administrator";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  description?: string;
  subsystems?: Subsystem[];
}

export interface Subsystem {
  id: string;
  name: string;
  equipmentId: string;
  components?: Component[];
}

export interface Component {
  id: string;
  name: string;
  designation: string;
  subsystemId: string;
  manualUrl?: string;
  datasheetUrl?: string;
}

export interface Part {
  ddc: string;
  qty: number;
  designation: string;
  characteristic: string;
  manufacturer: string;
  reference: string;
  manualUrl?: string;
  datasheetUrl?: string;
}

export interface Fault {
  id: string;
  name: string;
  possibleRootCauses: string[];
  troubleshootingSteps: string[];
  alarmCode?: string;
}

export interface MaintenanceTask {
  id: string;
  name: string;
  frequency: "daily" | "weekly" | "monthly" | "3months" | "6months" | "yearly";
  description?: string;
  howToDoIt?: string;
  notes?: string;
  requiredTools?: string[];
  requiredParts?: string[];
  dueDate?: Date;
  completedDate?: Date;
  completedBy?: string;
  completed: boolean;
}

export interface WorkOrder {
  id: string;
  taskId: string;
  taskName: string;
  dueDate: Date;
  completedDate?: Date;
  completedBy?: string;
  status: "overdue" | "due_today" | "upcoming" | "completed";
  safetyRequired: boolean;
}

export interface MaintenanceLog {
  id: string;
  taskId: string;
  taskName: string;
  completed: boolean;
  completedBy?: string;
  timestamp?: Date;
  notes?: string;
  attachments?: string[];
}
