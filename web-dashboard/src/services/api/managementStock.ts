
export type BranchStock = {
    name: string;
    stock: number;
};

import { ManagementStock as OriginalManagementStock } from "@/types/managementStock";

export type ManagementStock = OriginalManagementStock & {
    branches?: BranchStock[];
};

export const mockManagementStock: ManagementStock[] = [
    {
        id: 'BHN-001',
        codeBarang: "BHN-001",
        namaBarang: "Ayam Potong",
        kategori: "Bahan Baku",
        satuan: "kg",
        stockAwal: 100,
        stockMasuk: 50,
        stockKeluar: 80,
        sisaStock: 70,
        hargaSatuan: 40000,
        nilaiPersediaan: 2800000,
        status: "Tersedia",
        branches: [
            { name: "Cabang Utama", stock: 30 },
            { name: "Cabang Cimahi", stock: 20 },
            { name: "Cabang Bandung", stock: 20 },
        ],
    },
    {
        id: 'BHN-002',
        codeBarang: "BHN-002",
        namaBarang: "Nasi Putih",
        kategori: "Bahan Baku",
        satuan: "kg",
        stockAwal: 200,
        stockMasuk: 100,
        stockKeluar: 150,
        sisaStock: 150,
        hargaSatuan: 12000,
        nilaiPersediaan: 1800000,
        status: "Tersedia",
        branches: [
            { name: "Cabang Utama", stock: 60 },
            { name: "Cabang Cimahi", stock: 50 },
            { name: "Cabang Bandung", stock: 40 },
        ],
    },
    {
        id: 'BHN-003',
        codeBarang: "BHN-003",
        namaBarang: "Teh Celup",
        kategori: "Bahan Baku",
        satuan: "pak",
        stockAwal: 50,
        stockMasuk: 20,
        stockKeluar: 30,
        sisaStock: 40,
        hargaSatuan: 15000,
        nilaiPersediaan: 600000,
        status: "Tersedia",
        branches: [
            { name: "Cabang Utama", stock: 15 },
            { name: "Cabang Cimahi", stock: 15 },
            { name: "Cabang Bandung", stock: 10 },
        ],
    },
    {
        id: 'BHN-004',
        codeBarang: "BHN-004",
        namaBarang: "Kopi Bubuk",
        kategori: "Bahan Baku",
        satuan: "pak",
        stockAwal: 40,
        stockMasuk: 10,
        stockKeluar: 20,
        sisaStock: 30,
        hargaSatuan: 25000,
        nilaiPersediaan: 750000,
        status: "Tersedia",
        branches: [
            { name: "Cabang Utama", stock: 10 },
            { name: "Cabang Cimahi", stock: 10 },
            { name: "Cabang Bandung", stock: 10 },
        ],
    },
    {
        id: 'BHN-005',
        codeBarang: "BHN-005",
        namaBarang: "Sate Daging Sapi",
        kategori: "Bahan Baku",
        satuan: "tusuk",
        stockAwal: 300,
        stockMasuk: 100,
        stockKeluar: 120,
        sisaStock: 280,
        hargaSatuan: 3000,
        nilaiPersediaan: 840000,
        status: "Tersedia",
        branches: [
            { name: "Cabang Utama", stock: 100 },
            { name: "Cabang Cimahi", stock: 90 },
            { name: "Cabang Bandung", stock: 90 },
        ],
    },
    {
        id: 'BHN-006',
        codeBarang: "BHN-006",
        namaBarang: "Gula Pasir",
        kategori: "Bahan Baku",
        satuan: "kg",
        stockAwal: 60,
        stockMasuk: 20,
        stockKeluar: 30,
        sisaStock: 50,
        hargaSatuan: 14000,
        nilaiPersediaan: 700000,
        status: "Tersedia",
        branches: [
            { name: "Cabang Utama", stock: 20 },
            { name: "Cabang Cimahi", stock: 15 },
            { name: "Cabang Bandung", stock: 15 },
        ],
    },
    {
        id: 'BHN-007',
        codeBarang: "BHN-007",
        namaBarang: "Es Batu",
        kategori: "Bahan Baku",
        satuan: "kg",
        stockAwal: 80,
        stockMasuk: 40,
        stockKeluar: 60,
        sisaStock: 60,
        hargaSatuan: 5000,
        nilaiPersediaan: 300000,
        status: "Tersedia",
        branches: [
            { name: "Cabang Utama", stock: 20 },
            { name: "Cabang Cimahi", stock: 20 },
            { name: "Cabang Bandung", stock: 20 },
        ],
    },
];

export const managementStockService = {
    getAll: async (): Promise<ManagementStock[]> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 100));
        return mockManagementStock;
    },
    
    getById: async (id: string): Promise<ManagementStock | null> => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return mockManagementStock.find(p => p.id === id) || null;
    },
    
    update: async (id: string, managementStock: Partial<ManagementStock>): Promise<ManagementStock | null> => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const index = mockManagementStock.findIndex(p => p.id === id);
        if (index === -1) return null;
        
        mockManagementStock[index] = { ...mockManagementStock[index], ...managementStock };
        return mockManagementStock[index];
    }
}