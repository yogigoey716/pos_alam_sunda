"use client";
import { useManagementStock, useManagementStockFilters } from "@/hooks/useManagementStock";
import Input from "@/components/ui/input";
import * as XLSX from "xlsx";
import { formatPrice } from "@/services/utils/formatters";
import DataTablesReport from "@/components/tables/DataTablesReport";

export default function ManagementStockPage() {
    const { managementStock, loading, error } = useManagementStock();
        const { filters, filteredManagementStock, updateFilter } = useManagementStockFilters(managementStock);
    
        const headersReportManagementStock = [
            { key: "codeBarang", label: "Code Barang" },
            { key: "namaBarang", label: "Nama Barang" },
            { key: "kategori", label: "Kategori" },
            { key: "satuan", label: "Satuan" },
            { key: "stockAwal", label: "Stock Awal" },
            { key: "stockMasuk", label: "Stock Masuk" },
            { key: "stockKeluar", label: "Stock Keluar" },
            { key: "sisaStock", label: "Sisa Stock" },
            { key: "hargaSatuan", label: "Harga Satuan" },
            { key: "nilaiPersediaan", label: "Nilai Persediaan" },
            { key: "status", label: "Status" },
        ];
    
        const handleExportData = () => {
            const ws = XLSX.utils.json_to_sheet(filteredManagementStock);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Data Report Management Stock");
            XLSX.writeFile(wb, "data-report-management-stock.xlsx");
        };
    
        const datas = filteredManagementStock.map(managementStock => ({
            ...managementStock,
            satuan: formatPrice(managementStock.satuan),
            hargaSatuan: formatPrice(managementStock.hargaSatuan),
            nilaiPersediaan: formatPrice(managementStock.nilaiPersediaan),
        }))
    
        if (loading) return <p className="p-4">Loading...</p>;
        if (error) return <p className="p-4 text-red-500">Data tidak ditemukan</p>;
    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <div className="flex flex-wrap justify-between items-center pb-4">
                <div className="flex gap-2 items-center">
                    <Input
                        id="start-date"
                        label="Start Date"
                        name="startDate"
                        type="date"
                        value={filters.startDate}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => updateFilter('startDate', e.target.value)}
                    />
                    <Input
                        id="end-date"
                        label="End Date"
                        name="endDate"
                        type="date"
                        value={filters.endDate}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => updateFilter('endDate', e.target.value)}
                    />
                    <button
                        onClick={handleExportData}
                        type="button"
                        className="px-3 py-2 mt-7 text-sm font-medium text-green-700 rounded-lg border border-green-700 hover:text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                    >
                        Export
                    </button>
                </div>
        
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pointer-events-none ps-3">
                        <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
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
                        className="block p-2 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 ps-10 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for items"
                        value={filters.searchTerm}
                        onChange={(e) => updateFilter('searchTerm', e.target.value)}
                    />
                </div>
            </div>
            <DataTablesReport data={datas} headers={headersReportManagementStock} />
            </div>
    );
}