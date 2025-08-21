import { ManagementStock } from "@/types/managementStock";

export const mockManagementStock = [
    {
        id: '1',
        codeBarang: "2025-08-20",
        namaBarang: "Nasi Ayam Kremes",
        kategori: "Makanan",
        satuan: 100000,
        stockAwal: 0,
        stockMasuk: 0,
        stockKeluar: 0,
        sisaStock: 0,
        hargaSatuan: 0,
        nilaiPersediaan: 0,
        status: "Tersedia",
    },
    {
        id: '2',
        codeBarang: "2025-08-20",
        namaBarang: "Teh",
        kategori: "Minuman",
        satuan: 100000,
        stockAwal: 0,
        stockMasuk: 0,
        stockKeluar: 0,
        sisaStock: 0,
        hargaSatuan: 0,
        nilaiPersediaan: 0,
        status: "Tersedia",
    },
    {
        id: '3',
        codeBarang: "2025-08-20",
        namaBarang: "Es Kopi Susu",
        kategori: "Minuman",
        satuan: 100000,
        stockAwal: 0,
        stockMasuk: 0,
        stockKeluar: 0,
        sisaStock: 0,
        hargaSatuan: 0,
        nilaiPersediaan: 0,
        status: "Tersedia",
    },
    {
        id: '4',
        codeBarang: "2025-08-20",
        namaBarang: "Sate Maranggi",
        kategori: "Makanan",
        satuan: 100000,
        stockAwal: 0,
        stockMasuk: 0,
        stockKeluar: 0,
        sisaStock: 0,
        hargaSatuan: 0,
        nilaiPersediaan: 0,
        status: "Tersedia",
    },
]

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