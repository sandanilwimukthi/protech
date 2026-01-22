"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-darkmode dark:bg-darkmode-dark border border-border dark:border-border-dark flex items-center justify-center">
        <div className="w-5 h-5" />
      </div>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 rounded-lg bg-darkmode dark:bg-darkmode-dark border border-border dark:border-border-dark flex items-center justify-center hover:bg-border dark:hover:bg-border-dark transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-lightsky dark:text-lightsky-dark" />
      ) : (
        <Moon className="h-5 w-5 text-lightsky dark:text-lightsky-dark" />
      )}
    </button>
  );
}
