"use client";

import { useState, useCallback, useEffect } from "react";
import withAuth from "@/utils/withAuth";
import { useRouter } from "next/navigation";
import Selects from "@/components/ui/selects";
import Input from "@/components/ui/input";
import DataTablesReport from "@/components/tables/DataTablesReport";
import { useExportExcel } from "@/services/utils/formatters";
import useBranchIngredients from "@/hooks/useBranchIngredients";
import { Branch } from "@/types/ingredientPurchases";
import { setLoading } from "@/store/slices/authSlice";
import { msBranchesService } from "@/services/api/msBranches";

function BranchIngredientsPage() {
  const router = useRouter();
  const { exportToExcel } = useExportExcel();

  const [branch, setBranch] = useState<Branch[]>([]);

  const [filters, setFilters] = useState({
    branch: "",
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
          setBranch(res ?? []);
        })
        .catch((err) => {
          console.error("Gagal load branch:", err);
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
    exportToExcel(branchIngredients, "branch-ingredients", "Branch Ingredients");
  };

  const handleChangePage = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const onUnauthorized = useCallback(() => {
    router.push("/login");
  }, [router]);

  const { branchIngredients, total, pages, isLoading, error } = useBranchIngredients({
    ...filters,
    onUnauthorized,
  });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Data Stock Bahan</h1>
        <p className="text-base text-gray-500 dark:text-gray-400">
          Kelola semua data stock bahan dalam sistem Anda
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
              options={
                branch.map((branch) => ({ label: branch.name, value: branch.id ?? "" }))
              }
              value={filters.branch}
              onChange={(val) => handleChangeFilter("branch", val)}
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
              branchIngredients.map((item) => {
                return {
                  ...item,
                  ingredient: item.ingredient?.name,
                  branch: item.branch?.name,
                  action: (
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => router.push(`/branch-ingredients/edit-branch-ingredient-minimum-stock/${item.id}`)}
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
              { label: "Bahan", key: "ingredient" },
              { label: "Cabang", key: "branch" },
              { label: "Stock", key: "stock" },
              { label: "Minimal Stock", key: "min_stock" },
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

export default withAuth(BranchIngredientsPage);
