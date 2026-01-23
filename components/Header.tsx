"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, LogOut, LogIn, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 z-40 w-full transition-all duration-300 ${
          sticky
            ? "shadow-lg bg-white dark:bg-body-bg-dark py-3 md:py-5"
            : "shadow-none bg-white/80 dark:bg-body-bg-dark/80 backdrop-blur-md py-4 md:py-8"
        }`}
      >
        <div className="container flex items-center justify-between min-h-[60px] md:min-h-[80px]">
          {/* Logo and Company Name */}
          <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 md:h-14 md:w-14 bg-gradient-primary rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-base md:text-xl">PT</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base md:text-xl font-semibold text-lightsky dark:text-white">ProTech</h1>
              <p className="text-xs md:text-sm text-lightblue dark:text-lightblue-dark">Equipment Manual Platform</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="flex-1 max-w-lg mx-4 md:mx-8 hidden lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lightblue dark:text-lightblue-dark h-5 w-5" />
              <input
                type="text"
                placeholder="Search by keyword, component, fault code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-border dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-darkmode dark:bg-darkmode-dark/50 text-sm placeholder:text-lightblue dark:placeholder:text-lightblue-dark text-lightsky dark:text-white"
              />
            </div>
          </div>

          {/* Mobile Search Button */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-darkmode dark:hover:bg-darkmode-dark transition-colors"
            aria-label="Toggle search"
          >
            <Search className="h-5 w-5 text-lightblue dark:text-lightblue-dark" />
          </button>

          {/* Login/Logout and Theme Toggle */}
          <div className="flex items-center gap-2 md:gap-4">
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
                className="hidden lg:block bg-gradient-primary hover:bg-gradient-secondary text-white duration-300 px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium text-sm md:text-base"
              >
                Sign In
              </Link>
            )}
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-darkmode dark:hover:bg-darkmode-dark transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-lightblue dark:text-lightblue-dark" />
              ) : (
                <Menu className="h-6 w-6 text-lightblue dark:text-lightblue-dark" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="container pb-3 lg:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lightblue dark:text-lightblue-dark h-5 w-5" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-border dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-darkmode dark:bg-darkmode-dark/50 text-sm placeholder:text-lightblue dark:placeholder:text-lightblue-dark text-lightsky dark:text-white"
              />
            </div>
          </div>
        )}

        {/* Navigation - Desktop */}
        <nav className="container hidden lg:flex space-x-1 pt-3 pb-2 overflow-x-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
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

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-body-bg-dark shadow-xl z-40 lg:hidden transform transition-transform duration-300 overflow-y-auto">
            <div className="p-4 border-b border-border dark:border-border-dark">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">PT</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-lightsky dark:text-white">ProTech</h2>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-darkmode dark:hover:bg-darkmode-dark"
                >
                  <X className="h-6 w-6 text-lightblue dark:text-lightblue-dark" />
                </button>
              </div>
              {!isLoggedIn && (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full bg-gradient-primary hover:bg-gradient-secondary text-white text-center py-2.5 rounded-lg font-medium mb-4"
                >
                  Sign In
                </Link>
              )}
            </div>
            <nav className="p-4 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-primary/10 text-primary border-l-4 border-primary"
                        : "text-lightblue dark:text-lightblue-dark hover:bg-darkmode dark:hover:bg-darkmode-dark"
                    }`}
                  >
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
