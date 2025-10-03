"use client";
import HPPCardGrid from "@/components/cards/HPPCardGrid";


import Scorecard from "@/components/cards/Scorecard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTablesReport from "@/components/tables/DataTablesReport";
import Selects from "@/components/ui/selects";
import { useState, useEffect } from "react";
import withAuth from "@/utils/withAuth";
import { apiFetch } from "@/lib/api";
import { API_CONFIG } from "@/config/api";
import { BarCharts } from "@/components/charts/BarCharts";
import { PieCharts } from "@/components/charts/PieCharts";
import { ChartDataItem } from "@/types/chartsCustom";
import { Branch } from "@/types/ingredientPurchases";
import { BranchIngredients } from "@/types/branchIngredients";
import { TransactionItem, StockItem, StockCategory, FrequentlyUsedMaterial, SalesTotals } from "@/types/dashboard";


function Home() {

  // Dummy data
  const [totalSales, setTotalSales] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const totalProfit = 3200000;
  const [totalPenjualanDraft, setTotalPenjualanDraft] = useState(0);
  const [totalPenjualanSuccess, setTotalPenjualanSuccess] = useState(0);
  const [totalPenjualanPending, setTotalPenjualanPending] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [categoryChart, setCategoryChart] = useState<ChartDataItem[]>([]);
  const [productChart, setProductChart] = useState<ChartDataItem[]>([]);
  const [frequentlyUsedMaterial, setFrequentlyUsedMaterial] = useState<ChartDataItem[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);  // list dari API
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [bahanBakuBatasMinimum, setBahanBakuBatasMinimum] = useState<BranchIngredients[]>([]);


  const fetchTotalSales = async (branch: string) => {
    try {
      const response = await apiFetch(API_CONFIG.ENDPOINTS.TRANSACTIONS + "?branch=" + branch, {
        method: "GET",
        headers: { "Content-Type": "application/json"},
      });
      
      if(response.code != 200){
        setTotalSales(0);
        return;
      }

      // Calculate totals for different transaction statuses
      const totals: SalesTotals = response.data.items.reduce((acc: SalesTotals, trx: TransactionItem) => {
        acc.total += trx.total_amount;
        if (trx.status === "draft") acc.draft += trx.total_amount;
        if (trx.status === "selesai") acc.success += trx.total_amount;
        if (trx.status === "pending") acc.pending += trx.total_amount;
        return acc;
      }, { total: 0, draft: 0, success: 0, pending: 0 });

      const totalItems = response.data.items.length;

      // Update all state variables at once
      setTotalSales(totals.total);
      setTotalPenjualanDraft(totals.draft);
      setTotalPenjualanSuccess(totals.success);
      setTotalPenjualanPending(totals.pending);
      setTotalItems(totalItems);
    } catch (err) {
      console.error("Fetch total sales error:", err);
    }
  };
  const fetchTotalStockBahanBaku = async (branch: string) => {
    try {
      const response = await apiFetch(API_CONFIG.ENDPOINTS.GET_STOCK_INGREDIENTS + "?branch=" + branch, {
        method: "GET",
        headers: { "Content-Type": "application/json"},
      });
      if(response.code != 200){
        setTotalStock(0);
        return;
      }
      const totalStock = response.data.items.reduce((acc: number, item: StockItem) => acc + item.stock, 0);
      setTotalStock(totalStock);
    } catch (err) {
      console.error("Fetch total stock error:", err);
    }
  }
  const fetchStockPerCategory = async (branch: string) => {
    const res = await apiFetch(API_CONFIG.ENDPOINTS.GET_STOCK_PRODUCTS + "?branch=" + branch, {
      method: "GET",
      headers: { "Content-Type": "application/json"},
    });
    if(res.code != 200){
      setCategoryChart([]);
      return;
    }
    const items: StockCategory[] = res.data.items;
  
    const grouped = items.reduce((acc: Record<string, number>, item) => {
      const categoryName = item.product?.category?.name ?? "Unknown";
      acc[categoryName] = (acc[categoryName] || 0) + item.stock;
      return acc;
    }, {});
  
    setCategoryChart(
      Object.entries(grouped).map(([name, value]) => ({ name, value }))
    );
  };
  
  // Fetch per produk
  const fetchStockPerProduct = async (branch: string) => {
    const res = await apiFetch(API_CONFIG.ENDPOINTS.GET_STOCK_PRODUCTS + "?branch=" + branch, {
      method: "GET",
      headers: { "Content-Type": "application/json"},
    });
    if(res.code != 200){
      setProductChart([]);
      return;
    }
    const items: StockCategory[] = res.data.items;

    const grouped = items.reduce((acc: Record<string, number>, item) => {
      const productName = item.product?.name ?? "Unknown";
      acc[productName] = (acc[productName] || 0) + item.stock;
      return acc;
    }, {});

    const aggregate: ChartDataItem[] = Object.entries(grouped).map(([name, value]) => ({ name, value }));
  
    setProductChart(
      aggregate
    );
  }

  // Fetch frequently used material
  const fetchFrequentlyUsedMaterialByBranch = async (branch: string) => {
    try {
      const res = await apiFetch(API_CONFIG.ENDPOINTS.GET_FREQUENTLY_USED_MATERIAL + "?branch=" + branch, {
        method: "GET",
        headers: { "Content-Type": "application/json"},
      });
      if(res.code != 200){
        setFrequentlyUsedMaterial([]);
        return;
      }
      const items: FrequentlyUsedMaterial[] = res.data;
  
      // group by ingredient
      const grouped = items.reduce((acc: Record<string, number>, item) => {
        const ingredientName = item.ingredient_name ?? "Unknown";
        acc[ingredientName] = (acc[ingredientName] || 0) + item.total_used;
        return acc;
      }, {});
  
      const aggregate: ChartDataItem[] = Object.entries(grouped).map(([name, value]) => ({
        name,
        value,
      }));
  
      setFrequentlyUsedMaterial(aggregate);
    } catch (err) {
      setFrequentlyUsedMaterial([]);
      console.error("Fetch frequently used error:", err);
    }
  };
  
  const fetchBranch = async () => {
    try {
      const res = await apiFetch(API_CONFIG.ENDPOINTS.GET_MS_BRANCH);
      const items: Branch[] = res.data.items;
      setBranches(items);
    } catch (err) {
      console.error("Fetch branch error:", err);
    }
  };

  const fetchBranchIngredients = async (branch: string) => {
    try {
      const res = await apiFetch(API_CONFIG.ENDPOINTS.GET_STOCK_INGREDIENTS + "?branch=" + branch, {
        method: "GET",
        headers: { "Content-Type": "application/json"},
      });
      if(res.code != 200){
        setBahanBakuBatasMinimum([]);
        return;
      }
      const items: BranchIngredients[] = res.data.items;
      setBahanBakuBatasMinimum(items);
    } catch (err) {
      setBahanBakuBatasMinimum([]);
      console.error("Fetch branch ingredients error:", err);
    }
  };

  useEffect(() => {
    fetchBranch();
  }, []);

  // Set default branch when branches are loaded
  useEffect(() => {
    if (branches.length > 0 && !selectedBranch) {
      setSelectedBranch(branches[0].id ?? "");
    }
  }, [branches, selectedBranch]);

  useEffect(() => {
    if (selectedBranch && selectedBranch !== "") {
      fetchFrequentlyUsedMaterialByBranch(selectedBranch);
      fetchTotalSales(selectedBranch);
      fetchTotalStockBahanBaku(selectedBranch);
      fetchBranchIngredients(selectedBranch);
      fetchStockPerProduct(selectedBranch);
      fetchStockPerCategory(selectedBranch);
    }
  }, [selectedBranch]);

  const sortOptionsBranch = branches.map((b) => ({
    label: b.name,
    value: b.id ?? "",
  }));

  const headersBahanBaku = [
    { key: "name", label: "Nama" },
    { key: "item", label: "Item" },
    { key: "batasMinimum", label: "Batas Minimum" },
    { key: "status", label: "Status" },
  ]

  // Ambil bulan dan tahun sekarang
  const now = new Date();
  const monthYear = now.toLocaleString("id-ID", { month: "long", year: "numeric" });

  return (
    <div className="w-full">
      <div className="grid grid-cols-2">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-base text-gray-500 dark:text-gray-400">Ringkasan performa bisnis Anda hari ini</p>
        </div>
        <Selects
          label="Cabang"
          options={sortOptionsBranch}
          id="sort"
          name="sort"
          value={selectedBranch}
          onChange={(val) => setSelectedBranch(val as string)}
          className="flex gap-2 justify-end items-start"
        />
      </div>
      <div className="my-2">
        <h1 className="text-3xl font-bold">Overview</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 items-stretch mb-8 md:grid-cols-4">
        <div className="flex flex-col flex-1 h-full">
          <Scorecard
            title="Total Penjualan"
            value={"Rp. " + totalSales.toLocaleString("id-ID")}
            icon={<span className="text-blue-500">💰</span>}
            subtitle={monthYear}
          />
        </div>
        <div className="flex flex-col flex-1 h-full">
          <Scorecard title="Total Stok" value={totalStock} icon={<span className="text-green-500">📦</span>} />
        </div>
        <div className="flex flex-col flex-1 h-full">
          <Scorecard title="Total Profit" value={"Rp. " + totalProfit.toLocaleString("id-ID")} icon={<span className="text-pink-500">📈</span>} />
        </div>
        <div className="flex flex-col flex-1 h-full">
          <Scorecard title="Total Penjualan" value={totalItems.toLocaleString()} icon={<span className="text-pink-500">📦</span>} />
        </div>
      </div>
      <div className="my-2">
        <h1 className="text-3xl font-bold">Statistik Penjualan</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 items-stretch mb-8 md:grid-cols-4">
        <div className="flex flex-col flex-1 h-full">
          <Scorecard
            title="Total Penjualan"
            value={"Rp. " + totalSales.toLocaleString("id-ID")}
            icon={<span className="text-blue-500">💰</span>}
          />
        </div>
        <div className="flex flex-col flex-1 h-full">
          <Scorecard
            title="Total Penjualan Draft"
            value={"Rp. " + totalPenjualanDraft.toLocaleString("id-ID")}
            icon={<span className="text-blue-500">💰</span>}
          />
        </div>
        <div className="flex flex-col flex-1 h-full">
          <Scorecard
            title="Total Penjualan Pending"
            value={"Rp. " + totalPenjualanPending.toLocaleString("id-ID")}
            icon={<span className="text-blue-500">💰</span>}
          />
        </div>
        <div className="flex flex-col flex-1 h-full">
          <Scorecard
            title="Total Penjualan Success"
            value={"Rp. " + totalPenjualanSuccess.toLocaleString("id-ID")}
            icon={<span className="text-blue-500">💰</span>}
          />
        </div>
      </div>
      <div className="my-2">
        <h1 className="text-3xl font-bold">Management Stock</h1>
      </div>
      <div className="grid grid-col-1">
        
      </div>
      <div className="grid grid-cols-1 gap-6 items-stretch mb-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Stock Terbanyak & Stock Terendah</CardTitle>
          </CardHeader>
          <CardContent>
            <BarCharts data={productChart} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Stock per Kategori</CardTitle>
          </CardHeader>
          <PieCharts data={categoryChart} />
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-6 items-stretch mb-8 md:grid-cols-2">
        <Card>
          <CardHeader>
          <div className="grid grid-cols-2">
            <CardTitle>Bahan Baku yang sering dipakai</CardTitle>
          </div>
          </CardHeader>
          <CardContent>
            <BarCharts data={frequentlyUsedMaterial} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bahan Baku dibawah batas minimum</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <DataTablesReport
              data={bahanBakuBatasMinimum.map((item) => ({
                name: item.ingredient?.name ?? "-",
                item: item.stock ?? 0,
                batasMinimum: item.min_stock ?? 0,
                status:
                  (item.stock ?? 0) > (item.min_stock ?? 0)
                    ? "Aman"
                    : "Di bawah batas minimum",
              }))}
              headers={headersBahanBaku}
            />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="my-2">
        <h1 className="text-3xl font-bold">Laporan Keuangan</h1>
      </div>
      {/* Section: HPP Produk */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>HPP & Laba Kotor per Produk</CardTitle>
          </CardHeader>
          <CardContent>
            <HPPCardGrid />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default withAuth(Home);
