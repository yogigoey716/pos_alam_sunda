import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="w-full h-16 flex items-center justify-between px-6 bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 shadow-sm sticky top-0 z-30">
      <div className="text-lg font-semibold tracking-tight  text-gray-800 dark:text-gray-100">Selamat Datang </div>
      <ThemeToggle />
    </header>
  );
}
