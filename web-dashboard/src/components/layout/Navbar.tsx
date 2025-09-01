"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutUser } from "@/store/actions/authActions";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, token } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push("/login");
  };

  return (
    <header className="flex sticky top-0 z-30 justify-between items-center px-6 w-full h-16 bg-white border-b border-gray-200 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
      <div className="text-lg font-semibold tracking-tight text-gray-800 dark:text-gray-100">
        Selamat Datang {isAuthenticated ? `(${user?.email || 'User'})` : "(Belum Login)"}
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {isAuthenticated && token && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
