"use client"; // kalau pakai Next.js App Router

import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { getToken, clearToken } from "@/lib/auth";

export default function Navbar() {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // hanya jalan di browser
    if (typeof window !== "undefined") {
      const storedToken = getToken();
      const storedUsername = localStorage.getItem("username");
      
      setToken(storedToken);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      clearToken();
        window.location.href = "/login"; // redirect manual
    }
  };

  return (
    <header className="flex sticky top-0 z-30 justify-between items-center px-6 w-full h-16 bg-white border-b border-gray-200 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
      <div className="text-lg font-semibold tracking-tight text-gray-800 dark:text-gray-100">
        Selamat Datang {token ? "(" + username + ")" : "(Belum Login)"}
      </div>
      <ThemeToggle />
      {token && (
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </header>
  );
}
