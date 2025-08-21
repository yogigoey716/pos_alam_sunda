export interface Sales {
    id: string;
    tanggal: string;
    noTransaksi: string;
    totalItem: number;
    totalPenjualan: number;
    diskon: number;
    pajak: number;
    grandTotal: number;
    metodeBayar: string;
    kasir: string;
}

export interface SalesFormData {
    tanggal: string;
    noTransaksi: string;
    totalItem: number;
    totalPenjualan: number;
    diskon: number;
    pajak: number;
    grandTotal: number;
    metodeBayar: string;
    kasir: string;
}

export interface SalesFilters {
    searchTerm: string;
    startDate: string;
    endDate: string;
}
