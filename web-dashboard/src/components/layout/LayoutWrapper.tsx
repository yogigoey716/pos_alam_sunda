"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ReduxProvider from "@/providers/ReduxProvider";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Daftar halaman yang tidak perlu Sidebar & Navbar
  const noLayoutPages = ["/login"];

  const isNoLayout = noLayoutPages.includes(pathname);

  return (
    <ReduxProvider>
      {isNoLayout ? (
        // 👉 Kalau di halaman login → tampilkan children langsung
        <>{children}</>
      ) : (
        // 👉 Default layout (ada sidebar + navbar)
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1 min-h-screen">
            <Navbar />
            <main className="flex-1 p-4 bg-gray-50 md:p-8 dark:bg-neutral-950">
              {children}
            </main>
          </div>
        </div>
      )}
    </ReduxProvider>
  );
}
