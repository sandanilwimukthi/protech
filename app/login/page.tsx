"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Mock authentication - replace with actual authentication logic
    if (email && password) {
      // In production, validate against actual user database
      // For demo purposes, accept any email/password
      router.push("/");
    } else {
      setError("Please enter both email and password");
    }
  };

  return (
    <div className="min-h-screen bg-body-bg dark:bg-body-bg-dark pt-40">
      <Header />
      <main className="container py-16">
        <div className="max-w-md mx-auto bg-tablebg dark:bg-tablebg-dark rounded-2xl border border-border dark:border-border-dark p-8 glass-effect">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-primary rounded-full p-4 shadow-md">
              <LogIn className="h-7 w-7 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-lightsky dark:text-lightsky-dark text-center mb-2">
            Sign In
          </h2>
          <p className="text-lightblue dark:text-lightblue-dark text-center mb-6">
            Enter your credentials to access the platform
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-500 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-lightblue dark:text-lightblue-dark mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-border dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-darkmode dark:bg-darkmode-dark/50 text-lightsky dark:text-white placeholder:text-lightblue dark:placeholder:text-lightblue-dark"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-lightblue dark:text-lightblue-dark mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-border dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-darkmode dark:bg-darkmode-dark/50 text-lightsky dark:text-white placeholder:text-lightblue dark:placeholder:text-lightblue-dark"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-primary text-white py-3 px-4 rounded-lg hover:bg-gradient-secondary transition-all font-semibold shadow-md hover:shadow-lg"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-lightblue dark:text-lightblue-dark">
              Demo: Enter any email and password to continue
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
