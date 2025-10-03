"use client";

import { useState, useCallback, useEffect } from "react";
import withAuth from "@/utils/withAuth";
import { useRouter } from "next/navigation";
import Selects from "@/components/ui/selects";
import Input from "@/components/ui/input";
import DataTablesReport from "@/components/tables/DataTablesReport";
import { useExportExcel } from "@/services/utils/formatters";
import useBranchProducts from "@/hooks/useBranchProducts";
import { Branch } from "@/types/ingredientPurchases";
import { msBranchesService } from "@/services/api/msBranches";
import Image from "next/image";
import { optionsStatus } from "@/constants/productsOptions";

function BranchProductsPage() {
  const router = useRouter();
  const { exportToExcel } = useExportExcel();

  const [branch, setBranch] = useState<Branch[]>([]);
  const [filters, setFilters] = useState({
    branch: "",
    status: "",
    search: "",
    page: 1,
    size: 10,
    startDate: "",
    endDate: "",
  });

  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    msBranchesService
      .getAllProjection()
      .then((res) => {
        console.log("Branch dari API:", res);
        setBranch(res ?? []);
      })
      .catch((err) => {
        console.error("Gagal load branch:", err);
      });
  }, []);

  const handleChangeFilter = (
    key: keyof typeof filters,
    value: string | number
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleExport = () => {
    exportToExcel(branchProducts, "branch-products", "Branch Products");
  };

  const handleChangePage = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const onUnauthorized = useCallback(() => {
    router.push("/login");
  }, [router]);

  const { branchProducts, total, pages, isLoading, error } = useBranchProducts({
    ...filters,
    onUnauthorized,
  });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">
          Data Stock Produk
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400">
          Kelola semua data stock produk dalam sistem Anda
        </p>
      </div>

      {/* Action buttons */}
      <div className="overflow-x-auto relative p-5 shadow-md sm:rounded-lg">
        <div className="flex justify-between mb-4">
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
              id="branch"
              name="branch"
              label="Cabang"
              options={branch.map((branch) => ({
                label: branch.name,
                value: branch.id ?? "",
              }))}
              value={filters.branch}
              onChange={(val) => handleChangeFilter("branch", val)}
            />
            <Selects
              id="status"
              name="status"
              label="Status"
              options={optionsStatus}
              value={filters.status}
              onChange={(val) => handleChangeFilter("status", val)}
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
              branchProducts
                .filter((item) => {
                  if (filters.status === "") return true;
          
                  if (filters.status === "tersedia") {
                    return item.stock > item.min_stock;
                  }
                  if (filters.status === "hampir habis") {
                    return item.stock > 0 && item.stock <= item.min_stock;
                  }
                  if (filters.status === "habis") {
                    return item.stock === 0;
                  }
          
                  return true;
                })
                .map((item) => {
                  const img = item.product?.img?.trim();
                  let stockStatus: React.ReactNode;
          
                  if (item.stock === 0) {
                    stockStatus = (
                      <span className="px-2 py-1 text-white bg-red-500 rounded">
                        Stock Habis
                      </span>
                    );
                  } else if (item.stock <= item.min_stock) {
                    stockStatus = (
                      <span className="px-2 py-1 text-white bg-yellow-500 rounded">
                        Stock Hampir Habis
                      </span>
                    );
                  } else {
                    stockStatus = (
                      <span className="px-2 py-1 text-white bg-green-500 rounded">
                        Stock Tersedia
                      </span>
                    );
                  }
          
                  return {
                    ...item,
                    img:
                      img && /^https?:\/\//.test(img) ? (
                        <Image
                          src={img}
                          alt={item.product?.name ?? ""}
                          width={64}
                          height={64}
                          className="object-cover w-16 h-16"
                        />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      ),
                    product: item.product?.name,
                    branch: item.branch?.name,
                    category: item.product?.category?.name,
                    status: stockStatus,
                    action: (
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() =>
                            router.push(`/branch-products/edit-minimum-stock/${item.id}`)
                          }
                          className="px-3 py-2 text-sm font-medium text-green-700 rounded-lg border border-green-700 hover:text-white hover:bg-green-800"
                        >
                          Edit Stock Minimum
                        </button>
                      </div>
                    ),
                  };
                }) ?? []
            }
            headers={[
              { label: "Produk", key: "product" },
              { label: "Cabang", key: "branch" },
              { label: "Stock", key: "stock" },
              { label: "Minimal Stock", key: "min_stock" },
              { label: "Kategori", key: "category" },
              { label: "Status", key: "status" },
              { label: "Gambar", key: "img" },
              { label: "Action", key: "action" },
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


export default withAuth(BranchProductsPage);
