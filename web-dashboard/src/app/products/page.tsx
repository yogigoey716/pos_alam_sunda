"use client";

import { useState } from "react";
import DataTablesReport from "@/components/tables/DataTablesReport";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import Input from "@/components/ui/input";
import useMockProducts from "@/hooks/useMockProducts";
import { useProductFilters } from "@/hooks/useProducts";
import { exportToExcel, formatPrice } from "@/services/utils/formatters";
import Link from "next/link";

import { ProductIngredient } from "@/types/product";
import { mockManagementStock } from "@/services/api/managementStock";

export default function ProductsPage() {
  const [isOpen, setIsOpen] = useState(false);
  // Modal komposisi
  const [modalIngredients, setModalIngredients] = useState<ProductIngredient[] | null>(null);
  const [modalProductName, setModalProductName] = useState<string>("");
  const { products, loading, error } = useMockProducts();
  const { filters, filteredProducts, updateFilter } = useProductFilters(products);

  const handleSelect = (value: string) => {
    updateFilter('category', value);
    setIsOpen(false);
  };

  const headersProducts = [
    { key: "name", label: "Nama Produk" },
    { key: "category", label: "Kategori" },
    { key: "stock", label: "Stok" },
    { key: "price", label: "Harga" },
    { key: "ingredients", label: "Komposisi" },
    { key: "status", label: "Status" },
  ];

  const filterOptions = [
    { label: "Semua Produk", value: "all" },
    { label: "Makanan", value: "makanan" },
    { label: "Minuman", value: "minuman" },
  ];

  const handleExportData = () => {
    exportToExcel(filteredProducts, "data-produk");
  };

  // Only show 4 main products
  const mainProductNames = [
    "Nasi Ayam Kremes",
    "Teh Manis Dingin",
    "Es Kopi Susu",
    "Sate Maranggi",
  ];
  // Ambil 4 produk utama dari data asli, urut sesuai mainProductNames
  const mainProducts = mainProductNames
    .map(name => products.find(p => p.name.toLowerCase() === name.toLowerCase()))
    .filter(Boolean);

  const displayData = mainProducts.map(product => ({
    name: product!.name,
    category: product!.category,
    stock: product!.stock,
    price: formatPrice(product!.price),
    ingredients: (
      <button
        className="text-xs border border-black bg-white text-black rounded px-2 py-1 hover:bg-gray-100"
        onClick={() => {
          setModalIngredients(product!.ingredients ?? []);
          setModalProductName(product!.name);
          setIsOpen(false);
        }}
      >
        Lihat Komposisi
      </button>
    ),
    status: (
      <span
        className={
          product!.status === "Tersedia"
            ? "inline-block px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800"
            : product!.status === "Stok Rendah"
            ? "inline-block px-2 py-1 text-xs font-semibold rounded bg-yellow-100 text-yellow-800"
            : "inline-block px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-800"
        }
      >
        {product!.status}
      </span>
    ),
  }));

  if (loading) {
    return (
      <div className="w-full">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Produk</h1>
          <p className="text-base text-gray-500 dark:text-gray-400">
            Kelola semua produk dalam sistem Anda
          </p>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Produk</h1>
          <p className="text-base text-gray-500 dark:text-gray-400">
            Kelola semua produk dalam sistem Anda
          </p>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Produk</h1>
        <p className="text-base text-gray-500 dark:text-gray-400">
          Kelola semua produk dalam sistem Anda
        </p>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className="flex justify-end mb-4">
          <Link
            href="/products/add"
            className="inline-block px-4 py-2 border border-black bg-white text-black rounded-lg hover:bg-gray-100 transition"
          >
            + Tambah Produk
          </Link>
        </div>
        <div className="flex flex-wrap justify-between items-center pb-4 space-y-4 sm:flex-row sm:space-y-0">
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none 
                hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 
                dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 
                dark:focus:ring-gray-700 cursor-pointer"
              type="button"
            >
              <svg
                className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
              </svg>
              {filterOptions.find((f) => f.value === filters.category)?.label}
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <button
              onClick={handleExportData}
              type="button"
              className="border border-black bg-white text-black rounded-lg text-sm px-3 py-1.5 me-2 mb-2 hover:bg-gray-100 mx-3 cursor-pointer"
            >
              Export
            </button>

            {isOpen && (
              <div className="absolute z-10 mt-2 w-48 bg-white rounded-lg divide-y divide-gray-100 shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                  {filterOptions.map((option, idx) => (
                    <li key={idx}>
                      <Input
                        id={`filter-radio-${idx}`}
                        name="filter-radio"
                        value={option.value}
                        label={option.label}
                        type="radio"
                        checked={filters.category === option.value}
                        onChange={() => handleSelect(option.value)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pointer-events-none ps-3">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              value={filters.searchTerm}
              onChange={(e) => updateFilter('searchTerm', e.target.value)}
              className="block p-2 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 ps-10 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Cari produk..."
            />
          </div>
        </div>

        <DataTablesReport data={displayData} headers={headersProducts} />
        {/* Dialog Komposisi Produk (shadcn/ui) */}
        <Dialog open={modalIngredients !== null} onOpenChange={open => !open && setModalIngredients(null)}>
          <DialogContent>
            <DialogTitle>Komposisi {modalProductName}</DialogTitle>
            <ul className="mb-4 max-h-60 overflow-y-auto">
              {modalIngredients && modalIngredients.length > 0 ? (
                modalIngredients.map((i, idx) => {
                  // Prioritaskan data dari ingredient jika sudah ada, fallback ke managementStock
                  const namaBarang = i.namaBarang || mockManagementStock.find(b => b.codeBarang === i.codeBarang)?.namaBarang;
                  const satuan = i.satuan || mockManagementStock.find(b => b.codeBarang === i.codeBarang)?.satuan;
                  return (
                    <li key={idx} className="py-1 border-b border-gray-200 dark:border-neutral-700 flex flex-col sm:flex-row sm:justify-between">
                      <span>
                        {namaBarang ? (
                          <>
                            <span className="font-semibold">{namaBarang}</span>
                            <span className="text-xs text-gray-500 ml-2">({i.codeBarang})</span>
                          </>
                        ) : (
                          <span>Kode: {i.codeBarang}</span>
                        )}
                      </span>
                      <span className="font-mono">Qty: {i.qty} {satuan || ''}</span>
                    </li>
                  );
                })
              ) : (
                <li className="text-gray-500">Tidak ada komposisi</li>
              )}
            </ul>
            <DialogClose asChild>
              <button className="px-4 py-2 border border-black bg-white text-black rounded hover:bg-gray-100">Tutup</button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}