"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setDark(document.documentElement.classList.contains("dark"));
    }
  }, []);

  const toggle = () => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark");
      setDark((d) => !d);
    }
  };

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="rounded-full p-2 border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
    >
      {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
    </button>
  );
}
