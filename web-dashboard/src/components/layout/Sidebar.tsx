import React from "react";
import { Home, BarChart2, ShoppingBag, Box } from "lucide-react";
import Link from "next/link";

const menu = [
  { label: "Dashboard", icon: <Home className="w-5 h-5" />, href: "/" },
  { label: "Penjualan", icon: <BarChart2 className="w-5 h-5" />, href: "/sales" },
  { label: "Produk", icon: <ShoppingBag className="w-5 h-5" />, href: "/products" },
  { label: "Management Stock", icon: <Box className="w-5 h-5" />, href: "/management-stock" },
  { label: "Transaksi", icon: <Box className="w-5 h-5" />, href: "/transactions" },
];

export default function Sidebar() {
  return (
    <aside className="hidden flex-col gap-4 px-4 py-6 w-56 min-h-screen bg-white border-r border-gray-200 shadow-lg md:flex dark:bg-neutral-900 dark:border-neutral-800">
  <div className="mb-8 text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100">Alam Sunda Dashboard</div>
      <nav className="flex flex-col gap-2">
        {menu.map((item) => (
          <Link key={item.label} href={item.href} className="flex gap-3 items-center px-3 py-2 font-medium text-gray-700 rounded-lg transition hover:bg-green-50 dark:hover:bg-neutral-800 dark:text-gray-200">
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex-1" />
      <div className="text-xs text-gray-400">&copy; {new Date().getFullYear()} POS App</div>
    </aside>
  );
}
