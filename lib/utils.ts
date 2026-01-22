import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function getDateRangeStatus(date: Date): "overdue" | "due_today" | "upcoming" {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const taskDate = new Date(date);
  taskDate.setHours(0, 0, 0, 0);
  
  if (taskDate < today) return "overdue";
  if (taskDate.getTime() === today.getTime()) return "due_today";
  return "upcoming";
}

export function getDaysDifference(date: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const taskDate = new Date(date);
  taskDate.setHours(0, 0, 0, 0);
  
  return Math.floor((taskDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}
