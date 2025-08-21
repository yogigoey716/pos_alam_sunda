export interface BranchStock {
    name: string;
    stock: number;
}

export interface ManagementStock {
    id: string;
    codeBarang: string;
    namaBarang: string;
    kategori: string;
    satuan: string; // e.g. "pcs", "porsi", "pak"
    stockAwal: number;
    stockMasuk: number;
    stockKeluar: number;
    sisaStock: number;
    hargaSatuan: number;
    nilaiPersediaan: number;
    status: string;
    branches?: BranchStock[];
}

export interface ManagementStockFormData {
    codeBarang: string;
    namaBarang: string;
    kategori: string;
    satuan: number;
    stockAwal: number;
    stockMasuk: number;
    stockKeluar: number;
    sisaStock: number;
    hargaSatuan: number;
    nilaiPersediaan: number;
    status: string;
}

export interface ManagementStockFilters {
    searchTerm: string;
    startDate: string;
    endDate: string;
}
