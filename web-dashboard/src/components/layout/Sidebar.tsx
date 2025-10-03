import React, { useState } from "react";
import { Home, Box, ChevronDown, FileText } from "lucide-react";
import Link from "next/link";
import { PiUnite } from "react-icons/pi";
import { BiBasket, BiCart, BiSolidBank, BiUser, BiUserCheck, BiUserCircle } from "react-icons/bi";

const menu = [
  { label: "Dashboard", icon: <Home className="w-5 h-5" />, href: "/" },
  {
    label: "Master Data",
    icon: <Box className="w-5 h-5" />,
    children: [
      { label: "Master Produk", icon: <Box className="w-5 h-5" />, href: "/products" },
      { label: "Master Bahan Baku", icon: <Box className="w-5 h-5" />, href: "/ingredients" },
      { label: "Master Satuan", icon: <PiUnite className="w-5 h-5" />, href: "/ms-satuan" },
      { label: "Master Supplier", icon: <Box className="w-5 h-5" />, href: "/suppliers" },
      { label: "Master Cabang", icon: <Box className="w-5 h-5" />, href: "/ms-branches" },
      { label: "Master Metode Pembayaran", icon: <Box className="w-5 h-5" />, href: "/ms-payment-methods" },
      { label: "Product Bahan", icon: <Box className="w-5 h-5" />, href: "/products-ingredients" }
    ],
  },
  { 
    label: "User Management", 
    icon: <BiUser className="w-5 h-5" />,
    children: [
      { label: "User", icon: <BiUserCircle className="w-5 h-5" />, href: "/ms-users" },
      { label: "Role", icon: <BiUserCheck className="w-5 h-5" />, href: "/ms-roles" },
    ]
  },
  { 
    label: "Report", 
    icon: <FileText className="w-5 h-5" />, 
    children: [
      { label: "Stock Bahan", icon: <Box className="w-5 h-5" />, href: "/branch-ingredients" },
      { label: "Stock Produk", icon: <Box className="w-5 h-5" />, href: "/branch-products" },
    ],
  },
  {
    label: "Transaksi",
    icon: <BiSolidBank className="w-5 h-5" />,
    children: [
      { label: "Pembelian Bahan", icon: <Box className="w-5 h-5" />, href: "/ingredient-purchases" },
      { label: "Penjualan", icon: <BiCart className="w-5 h-5" />, href: "/transactions" },
    ],
  },
  { label: "Produksi Produk", icon: <BiBasket className="w-5 h-5" />, href: "/product-productions" },
];

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  return (
    <aside className="hidden flex-col gap-4 px-4 py-6 w-full min-h-screen bg-white border-r border-gray-200 shadow-lg max-w-72 md:flex dark:bg-neutral-900 dark:border-neutral-800">
      <div className="mb-8 text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
        Alam Sunda Dashboard
      </div>

      <nav className="flex flex-col gap-2">
        {menu.map((item) => (
          <div key={item.label}>
            {item.children ? (
              <div>
                {/* Parent menu */}
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="flex justify-between items-center px-3 py-2 w-full font-medium text-gray-700 rounded-lg transition text-start hover:bg-green-50 dark:hover:bg-neutral-800 dark:text-gray-200"
                >
                  <div className="flex gap-3 items-center">
                    {item.icon}
                    {item.label}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openMenu === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown submenu */}
                {openMenu === item.label && (
                  <div className="flex flex-col gap-1 mt-1 ml-8">
                    {item.children.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="flex gap-3 items-center px-3 py-2 font-medium text-gray-700 rounded-lg transition hover:bg-green-50 dark:hover:bg-neutral-800 dark:text-gray-200"
                      >
                        {sub.icon}
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href!}
                className="flex gap-3 items-center px-3 py-2 font-medium text-gray-700 rounded-lg transition hover:bg-green-50 dark:hover:bg-neutral-800 dark:text-gray-200"
              >
                {item.icon}
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>

      <div className="flex-1" />
      <div className="text-xs text-gray-400">
        &copy; {new Date().getFullYear()} POS App
      </div>
    </aside>
  );
}

