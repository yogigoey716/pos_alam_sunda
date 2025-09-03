"use client";

import { useState, useCallback } from "react";
import withAuth from "@/utils/withAuth";
import useProducts from "@/hooks/useProducts";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Selects from "@/components/ui/selects";
import Input from "@/components/ui/input";
import { optionsCategory, optionsStatus } from "@/constants/productsOptions";
import DataTablesReport from "@/components/tables/DataTablesReport";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { ProductIngredient } from "@/types/product";
import { formatCurrency, useExportExcel } from "@/services/utils/formatters";

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

  const [modalData, setModalData] = useState<{
    name: string;
    items: ProductIngredient[];
  } | null>(null);

  const handleChangeFilter = (
    key: keyof typeof filters,
    value: string | number
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleExport = () => {
    exportToExcel(products, "products", "Products");
  };

  const handleChangePage = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const onUnauthorized = useCallback(() => {
    router.push("/login");
  }, [router]);

  const { products, total, pages, isLoading, error } = useProducts({
    ...filters,
    onUnauthorized,
  });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Produk</h1>
        <p className="text-base text-gray-500 dark:text-gray-400">
          Kelola semua produk dalam sistem Anda
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
              products.map((item) => {
                const { ingredients, ...rest } = item;
                return {
                  ...rest,
                  price: formatCurrency(item.price),
                  actions: (
                    <button
                      onClick={() =>
                        setModalData({
                          name: item.name,
                          items: item.ingredients ?? [],
                        })
                      }
                      className="px-2 py-1 text-xs text-black bg-white rounded border border-black hover:bg-gray-100"
                    >
                      Lihat Komposisi
                    </button>
                  ),
                };
              }) ?? []
            }
            headers={[
              { label: "Nama", key: "name" },
              { label: "Kategori", key: "category" },
              { label: "Harga", key: "price" },
              { label: "Stok", key: "stocks" },
              { label: "Status", key: "status_barang" },
              { label: "Komposisi", key: "actions" },
            ]}
            page={filters.page}
            setPage={handleChangePage}
            pages={pages}
            total={total}
            loading={isLoading}
          />
        )}

        {/* Modal Ingredients */}
        <Dialog open={!!modalData} onOpenChange={() => setModalData(null)}>
          <DialogContent aria-describedby={undefined}>
            <DialogTitle>Komposisi {modalData?.name}</DialogTitle>
            <ul className="overflow-y-auto mb-4 max-h-60">
              {modalData?.items.length ? (
                modalData.items.map((i, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between py-1 border-b border-gray-200 dark:border-neutral-700"
                  >
                    <span>{i.namaBarang}</span>
                    <span className="font-mono">
                      {i.qty} {i.satuan}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">Tidak ada komposisi</li>
              )}
            </ul>
            <DialogClose asChild>
              <button className="px-4 py-2 text-black bg-white rounded border border-black hover:bg-gray-100">
                Tutup
              </button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default withAuth(ProductsPage);
