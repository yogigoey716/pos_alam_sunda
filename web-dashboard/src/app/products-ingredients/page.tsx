"use client";

import { useState, useCallback } from "react";
import withAuth from "@/utils/withAuth";
import useProductIngredients from "@/hooks/useProductIngredients";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Selects from "@/components/ui/selects";
import Input from "@/components/ui/input";
import { optionsCategory, optionsStatus } from "@/constants/productsOptions";
import DataTablesReport from "@/components/tables/DataTablesReport";
import { useExportExcel } from "@/services/utils/formatters";

function ProductsPage() {
  const router = useRouter();
  const { exportToExcel } = useExportExcel();

  const [filters, setFilters] = useState({
    status: "",
    cate: "",
    search: "",
    page: 1,
    size: 10,
    startDate: "",
    endDate: "",
  });

  const [showFilter, setShowFilter] = useState(false);

  const handleChangeFilter = (
    key: keyof typeof filters,
    value: string | number
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleExport = () => {
    exportToExcel(productsIngredients, "productsIngredients", "ProductsIngredients");
  };

  const handleChangePage = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const onUnauthorized = useCallback(() => {
    router.push("/login");
  }, [router]);

  const { productsIngredients, total, pages, isLoading, error } = useProductIngredients({
    ...filters,
    onUnauthorized,
  });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Produk Bahan</h1>
        <p className="text-base text-gray-500 dark:text-gray-400">
          Kelola semua produk bahan dalam sistem Anda
        </p>
      </div>

      {/* Action buttons */}
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className="flex justify-between mb-4">
          <Link
            href="/products/add"
            className="inline-block px-4 py-2 text-black bg-white rounded-lg border border-black transition hover:bg-gray-100"
          >
            + Tambah Produk
          </Link>
          <button
            onClick={() => setShowFilter((prev) => !prev)}
            className="px-4 py-2 text-sm text-green-700 rounded-lg border border-green-700 hover:bg-green-700 hover:text-white"
          >
            {showFilter ? "Hide Filter" : "Show Filter"}
          </button>
        </div>
        
        {/* Filters */}
        {showFilter && (
          <div className="flex flex-wrap gap-2 pb-4">
            <Selects
              id="status_filter"
              name="status_filter"
              label="Status"
              options={optionsStatus}
              value={filters.status}
              onChange={(val) => handleChangeFilter("status", val)}
            />
            <Selects
              id="category"
              name="category"
              label="Category"
              options={optionsCategory}
              value={filters.cate}
              onChange={(val) => handleChangeFilter("cate", val)}
            />
            <Input
              type="date"
              id="start_date"
              name="start_date"
              label="Start Date"
              value={filters.startDate}
              onChange={(e) => handleChangeFilter("startDate", e.target.value)}
              className="w-64"
            />
            <Input
              type="date"
              id="end_date"
              name="end_date"
              label="End Date"
              value={filters.endDate}
              onChange={(e) => handleChangeFilter("endDate", e.target.value)}
              className="w-64"
            />
            <button
              onClick={handleExport}
              className="px-3 py-2 mt-7 text-sm font-medium text-green-700 rounded-lg border border-green-700 hover:text-white hover:bg-green-800"
            >
              Export
            </button>
          </div>
        )}

        <hr />
        
        {/* Data table */}
        {error ? (
          <p className="p-4 text-red-500">{error.message}</p>
        ) : (
          <DataTablesReport
            data={
                productsIngredients.map((item) => ({
                    id: item.id,
                    nameProduct: item.nameProduct,
                    nameIngredients: item.nameIngredients,
                    qtyIngredients: item.qty,
                    ingredientId: item.ingredientId,
                    productId: item.productId,
                    satuan: item.satuan,
                }))
            }
            headers={[
              { label: "Nama Product", key: "nameProduct" },
              { label: "Nama Bahan", key: "nameIngredients" },
              { label: "Jumlah Bahan", key: "qtyIngredients" },
              { label: "Satuan", key: "satuan" },
            ]}
            page={filters.page}
            setPage={handleChangePage}
            pages={pages}
            total={total}
            loading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

export default withAuth(ProductsPage);
