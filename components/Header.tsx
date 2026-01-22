"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, LogOut, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = [
    { name: "Equipment", href: "/equipment" },
    { name: "Calibration and Validation", href: "/calibration" },
    { name: "Preventive Maintenance Schedule", href: "/maintenance" },
    { name: "Bill of Materials", href: "/bom" },
    { name: "Faults and Troubleshooting", href: "/faults" },
    { name: "Open Work Orders", href: "/work-orders" },
  ];

  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY >= 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        sticky
          ? "shadow-lg bg-white dark:bg-body-bg-dark py-5"
          : "shadow-none bg-white/80 dark:bg-body-bg-dark/80 backdrop-blur-md py-8"
      }`}
    >
      <div className="container flex items-center justify-between min-h-[80px]">
        {/* Logo and Company Name */}
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="h-14 w-14 bg-gradient-primary rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">PT</span>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-lightsky dark:text-white">ProTech</h1>
            <p className="text-sm text-lightblue dark:text-lightblue-dark">Equipment Manual Platform</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg mx-8 hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lightblue dark:text-lightblue-dark h-5 w-5" />
            <input
              type="text"
              placeholder="Search by keyword, component, fault code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-darkmode dark:bg-darkmode-dark/50 text-sm placeholder:text-lightblue dark:placeholder:text-lightblue-dark text-lightsky dark:text-white"
            />
          </div>
        </div>

        {/* Login/Logout and Theme Toggle */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isLoggedIn ? (
            <button
              onClick={() => setIsLoggedIn(false)}
              className="hidden lg:flex items-center space-x-2 text-lightsky dark:text-white hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-darkmode dark:hover:bg-darkmode-dark"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          ) : (
            <Link
              href="/login"
              className="hidden lg:block bg-gradient-primary hover:bg-gradient-secondary text-white duration-300 px-6 py-3 rounded-lg font-medium"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="container flex space-x-1 pt-3 pb-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "text-primary border-b-2 border-primary"
                  : "text-lightblue dark:text-lightblue-dark hover:text-primary"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
