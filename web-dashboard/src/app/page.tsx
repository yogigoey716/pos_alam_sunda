import HPPCardGrid from "@/components/cards/HPPCardGrid";


import Scorecard from "@/components/cards/Scorecard";
import ProfitCard from "@/components/cards/ProfitCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HPPLineChart from "@/components/charts/HPPLineChart";
import SalesTrendChart from "@/components/charts/SalesTrendChart";
import BestSellingTable from "@/components/tables/BestSellingTable";
import MostProfitableTable from "@/components/tables/MostProfitableTable";
import BestSellingBarChart from "@/components/charts/BestSellingBarChart";
import MostProfitableBarChart from "@/components/charts/MostProfitableBarChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BarCharts from "@/components/charts/BarCharts";
import PieCharts from "@/components/charts/PieCharts";
import DataTablesReport from "@/components/tables/DataTablesReport";

export default function Home() {

  // Dummy data
  const totalSales = 12000000;
  const totalStock = 350;
  const totalProfit = 3200000;
  const totalOrders = 120;
  const price = 50000;
  const hpp = 30000;
  const profit = price - hpp;
  const margin = (profit / price) * 100;
  const totalPenjualanPending = 120;
  const totalPenjualanSuccess = 120;

  const dataStock = [
    { name: "Nasi Ayam Kremes", stock: 150 },
    { name: "Teh", stock: 120 },
    { name: "Es Kopi Susu", stock: 110 },
    { name: "Sate Maranggi", stock: 100 },
    { name: "Soto Ayam", stock: 95 },
    { name: "Jus Jeruk", stock: 90 },
    { name: "Lemon Tea", stock: 85 },
    { name: "Mie Goreng", stock: 80 },
    { name: "Nasi Goreng", stock: 77 },
    { name: "Ayam Bakar", stock: 20 },
  ]

  const dataCategoryStock = [
    { name: "Makanan", stock: 150 },
    { name: "Minuman", stock: 120 },
  ]

  const dataBahanBaku = [
    { name: "Beras", item: 150 },
    { name: "Gula", item: 120 },
    { name: "Telur", item: 110 },
    { name: "Ikan", item: 100 },
    { name: "Daging", item: 95 },
    { name: "Sayuran", item: 90 },
  ]

  const headersBahanBaku = [
    { key: "name", label: "Nama" },
    { key: "item", label: "Item" },
    { key: "batasMinimum", label: "Batas Minimum" },
    { key: "status", label: "Status" },
  ]

  const bahanBakuBatasMinimum = [
    {
      name: "Beras",
      item: 30,
      batasMinimum: 50,
      status: "⚠️"
    },
    {
      name: "Gula",
      item: 25,
      batasMinimum: 50,
      status: "⚠️"
    },
    {
      name: "Telur",
      item: 20,
      batasMinimum: 50,
      status: "⚠️"
    },
    {
      name: "Ikan",
      item: 20,
      batasMinimum: 50,
      status: "⚠️"
    },
    {
      name: "Daging",
      item: 0,
      batasMinimum: 50,
      status: "🔴"
    },
    {
      name: "Sayuran",
      item: 0,
      batasMinimum: 50,
      status: "🔴"
    },
  ]

  // Ambil bulan dan tahun sekarang
  const now = new Date();
  const monthYear = now.toLocaleString("id-ID", { month: "long", year: "numeric" });

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-base text-gray-500 dark:text-gray-400">Ringkasan performa bisnis Anda hari ini</p>
      </div>
      <div className="my-2">
        <h1 className="text-3xl font-bold">Overview</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 items-stretch mb-8 md:grid-cols-4">
        <div className="flex flex-col flex-1 h-full">
          <Scorecard
            title="Total Penjualan"
            value={"Rp. " + totalSales.toLocaleString()}
            icon={<span className="text-blue-500">💰</span>}
            subtitle={monthYear}
          />
        </div>
        <div className="flex flex-col flex-1 h-full">
          <Scorecard title="Total Stok" value={totalStock} icon={<span className="text-green-500">📦</span>} />
        </div>
        <div className="flex flex-col flex-1 h-full">
          <Scorecard title="Total Profit" value={"Rp. " + totalProfit.toLocaleString()} icon={<span className="text-pink-500">📈</span>} />
        </div>
        <div className="flex flex-col flex-1 h-full">
          <Scorecard title="Total Penjualan" value={totalOrders.toLocaleString()} icon={<span className="text-pink-500">📦</span>} />
        </div>
      </div>
      <div className="my-2">
        <h1 className="text-3xl font-bold">Statistik Penjualan</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 items-stretch mb-8 md:grid-cols-3">
        <div className="flex flex-col flex-1 h-full">
          <Scorecard
            title="Total Penjualan"
            value={totalOrders.toLocaleString()}
            icon={<span className="text-blue-500">📦</span>}
          />
        </div>
        <div className="flex flex-col flex-1 h-full">
          <Scorecard
            title="Total Penjualan Pending"
            value={totalPenjualanPending.toLocaleString()}
            icon={<span className="text-blue-500">📦</span>}
          />
        </div>
        <div className="flex flex-col flex-1 h-full">
          <Scorecard
            title="Total Penjualan Success"
            value={totalPenjualanSuccess.toLocaleString()}
            icon={<span className="text-blue-500">📦</span>}
          />
        </div>
      </div>
      <div className="my-2">
        <h1 className="text-3xl font-bold">Management Stock</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 items-stretch mb-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Stock Terbanyak & Stock Terendah</CardTitle>
          </CardHeader>
          <CardContent>
            <BarCharts data={dataStock} dataKey="stock" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Stock per Kategori</CardTitle>
          </CardHeader>
          <PieCharts data={dataCategoryStock.map(item => ({ name: item.name, value: item.stock }))} />
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-6 items-stretch mb-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Bahan Baku yang sering dipakai</CardTitle>
          </CardHeader>
          <CardContent>
            <BarCharts data={dataBahanBaku} dataKey="item" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bahan Baku dibawah batas minimum</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
              <DataTablesReport data={bahanBakuBatasMinimum} headers={headersBahanBaku} />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="my-2">
        <h1 className="text-3xl font-bold">Laporan Keuangan</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 items-stretch mb-8 md:grid-cols-2">
        <Card className="md:col-span-1 flex flex-col justify-center items-center min-h-[260px] md:min-h-[320px] md:text-lg shadow-lg border-2">
          <CardHeader className="flex flex-col items-center w-full">
            <CardTitle className="mb-2 text-2xl font-bold md:text-3xl">HPP & Profit</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-center items-center w-full">
            <ProfitCard price={price} hpp={hpp} profit={profit} margin={margin} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Grafik Penjualan, HPP, Laba Kotor (1 Bulan)</CardTitle>
          </CardHeader>
          <CardContent>
            <HPPLineChart />
          </CardContent>
        </Card>
      </div>
      {/* Section: Kinerja Penjualan */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Tren Penjualan (1 Bulan)</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesTrendChart />
          </CardContent>
        </Card>
        <Card className="flex flex-col col-span-1">
          <CardHeader>
            <CardTitle>Produk Terlaris & Paling Menguntungkan</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="terlaris" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="terlaris">Produk Terlaris</TabsTrigger>
                <TabsTrigger value="untung">Paling Menguntungkan</TabsTrigger>
              </TabsList>
              <TabsContent value="terlaris">
                <BestSellingBarChart />
                <div className="mt-4">
                  <BestSellingTable />
                </div>
              </TabsContent>
              <TabsContent value="untung">
                <MostProfitableBarChart />
                <div className="mt-4">
                  <MostProfitableTable />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
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
