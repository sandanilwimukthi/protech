import Header from "@/components/Header";
import Link from "next/link";
import { Wrench, FileText, AlertTriangle, Package, Calendar, Settings } from "lucide-react";

export default function Home() {
  const quickLinks = [
    {
      title: "Equipment",
      description: "Navigate equipment hierarchy and components",
      href: "/equipment",
      icon: Settings,
      color: "bg-blue-500",
    },
    {
      title: "Preventive Maintenance",
      description: "View and manage maintenance schedules",
      href: "/maintenance",
      icon: Calendar,
      color: "bg-green-500",
    },
    {
      title: "Work Orders",
      description: "View open work orders and tasks",
      href: "/work-orders",
      icon: Wrench,
      color: "bg-orange-500",
    },
    {
      title: "Faults & Troubleshooting",
      description: "Diagnose equipment faults and issues",
      href: "/faults",
      icon: AlertTriangle,
      color: "bg-red-500",
    },
    {
      title: "Bill of Materials",
      description: "Browse parts and component information",
      href: "/bom",
      icon: Package,
      color: "bg-purple-500",
    },
    {
      title: "Calibration & Validation",
      description: "Equipment calibration and validation records",
      href: "/calibration",
      icon: FileText,
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen bg-body-bg dark:bg-body-bg-dark pt-40">
      <Header />
      <main className="container py-14">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-lightsky dark:text-white mb-4">
            Equipment Manual{" "}
            <span className="gradient-text">Platform</span>
          </h1>
          <p className="text-lg text-lightblue dark:text-lightblue-dark max-w-2xl mx-auto">
            Access equipment documentation, maintenance schedules, and troubleshooting guides
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.title}
                href={link.href}
                className="group bg-tablebg dark:bg-tablebg-dark rounded-2xl shadow-lg p-6 card-hover border border-border dark:border-border-dark"
              >
                <div className={`${link.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-lightsky dark:text-lightsky-dark mb-2 group-hover:text-primary transition-colors">
                  {link.title}
                </h2>
                <p className="text-lightblue dark:text-lightblue-dark text-sm leading-relaxed">{link.description}</p>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
