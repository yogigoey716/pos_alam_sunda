"use client";

import { useState, useCallback, useEffect } from "react";
import withAuth from "@/utils/withAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Selects from "@/components/ui/selects";
import Input from "@/components/ui/input";
import DataTablesReport from "@/components/tables/DataTablesReport";
import { useExportExcel } from "@/services/utils/formatters";
import useProductProductions from "@/hooks/useProductProductions";
import { setLoading } from "@/store/slices/authSlice";
import { msBranchesService } from "@/services/api/msBranches";
import { Branch } from "@/types/ingredientPurchases";
import { Category } from "@/types/category";
import { msKategoriService } from "@/services/api/msKategori";

function ProductProductionsPage() {
  const router = useRouter();
  const { exportToExcel } = useExportExcel();

  const [branches, setBranches] = useState<Branch[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [filters, setFilters] = useState({
    branch: "",
    category: "",
    search: "",
    page: 1,
    size: 10,
    startDate: "",
    endDate: "",
  });

  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
      setLoading(true);
      msBranchesService
        .getAllProjection()
        .then((res) => {
          console.log("Branch dari API:", res);
          setBranches(res ?? []);
        })
        .catch((err) => {
          console.error("Gagal load branch:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);

    useEffect(() => {
      setLoading(true);
      msKategoriService
        .getAllProjection()
        .then((res) => {
          console.log("Category dari API:", res);
          setCategories(res ?? []);
        })
        .catch((err) => {
          console.error("Gagal load category:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);

  const handleChangeFilter = (
    key: keyof typeof filters,
    value: string | number
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleExport = () => {
    exportToExcel(productProductions, "productProductions", "Product Productions");
  };

  const handleChangePage = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const onUnauthorized = useCallback(() => {
    router.push("/login");
  }, [router]);

  const { productProductions, total, pages, isLoading, error } = useProductProductions({
    ...filters,
    onUnauthorized,
  });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Produksi Produk</h1>
        <p className="text-base text-gray-500 dark:text-gray-400">
          Kelola semua produksi produk dalam sistem Anda
        </p>
      </div>

      {/* Action buttons */}
      <div className="overflow-x-auto relative p-5 shadow-md sm:rounded-lg">
        <div className="flex justify-between mb-4">
          <Link
            href="/product-productions/add"
            className="inline-block px-4 py-2 text-black bg-white rounded-lg border border-black transition hover:bg-gray-100"
          >
            + Tambah Produksi
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
              id="branch_filter"
              name="branch_filter"
              label="Cabang"
              options={branches.map((branch) => ({ label: branch.name, value: branch.id ?? "" }))}
              value={filters.branch}
              onChange={(val) => handleChangeFilter("branch", val)}
            />
            <Selects
              id="category"
              name="category"
              label="Category"
              options={categories.map((category) => ({ label: category.name, value: category.id }))}
              value={filters.category}
              onChange={(val) => handleChangeFilter("category", val)}
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
              productProductions.map((item) => {
                const productionDate = new Date(item.production_date);
                return {
                  ...item,
                  product: item.product?.description,
                  branch: item.branch?.name,
                  user: item.user?.username,
                  quantityProduced: item.quantity_produced,
                  productionDate: productionDate.toLocaleDateString(),
                  note: item.note,
                  category: item.product?.category?.description
                };
              }) ?? []
            }
            headers={[
              { label: "Nama Product", key: "product" },
              { label: "Kategori", key: "category" },
              { label: "Cabang", key: "branch" },
              { label: "Quantitas Produksi", key: "quantityProduced" },
              { label: "Tanggal Produksi", key: "productionDate" },
              { label: "Penanggung Jawab Produksi", key: "user" },
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

export default withAuth(ProductProductionsPage);
