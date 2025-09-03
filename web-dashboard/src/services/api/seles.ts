import { API_CONFIG } from "@/config/api";
import { apiFetch } from "@/lib/api";
import { Sales } from "@/types/sales";
import { TransactionResponse, TransactionTable, UseTransactionsParams } from "@/types/transactions";
import { formatCurrency } from "../utils/formatters";

export const mockSales = [
    {
        id: '1',
        tanggal: "2025-08-20",
        noTransaksi: "TRX-001",
        totalItem: 10,
        totalPenjualan: 100000,
        diskon: 0,
        pajak: 0,
        grandTotal: 100000,
        metodeBayar: "Cash",
        kasir: "Admin",
        cabang: "Bogor",
    },
    {
        id: '2',
        tanggal: "2025-08-21",
        noTransaksi: "TRX-002",
        totalItem: 5,
        totalPenjualan: 50000,
        diskon: 0,
        pajak: 0,
        grandTotal: 50000,
        metodeBayar: "QRIS",
        kasir: "Admin",
        cabang: "Depok",
    },
    {
        id: '3',
        tanggal: "2025-08-19",
        noTransaksi: "TRX-003",
        totalItem: 7,
        totalPenjualan: 70000,
        diskon: 0,
        pajak: 0,
        grandTotal: 70000,
        metodeBayar: "QRIS",
        kasir: "Orang",
        cabang: "Bogor",
    },
    {
        id: '4',
        tanggal: "2025-08-30",
        noTransaksi: "TRX-004",
        totalItem: 12,
        totalPenjualan: 120000,
        diskon: 0,
        pajak: 0,
        grandTotal: 120000,
        metodeBayar: "QRIS",
        kasir: "Admin",
        cabang: "Depok",
    },
]

export const salesService = {
    getAll: async ({
        status,
        isPaid,
        search,
        page,
        size,
        startDate,
        endDate,
    }: UseTransactionsParams): Promise<{
        items: TransactionTable[];
        total: number;
        pages: number;
        isLoading: boolean;
        error: Error | null;
    }> => {
        // Simulate API delay
        const queryParams = new URLSearchParams({
            ...(status && { status_filter: status }),
            ...(isPaid && { category: isPaid }),
            ...(search && { search }),
            ...(startDate && { start_date: startDate }),
            ...(endDate && { end_date: endDate }),
            page: page.toString(),
            size: size.toString(),
        });
        const response = await apiFetch(
            API_CONFIG.ENDPOINTS.TRANSACTIONS + `?${queryParams.toString()}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );

        if(response.code !== 200){
            throw new Error(response.detail || "Gagal memuat produk");
        }

        const data = response.data as TransactionResponse;
        
        const formattedTransactions: TransactionTable[] = data.items.map((item) => ({
            ...item,
            payment_methods: item.payment_methods?.description || "",
            amount_paid: formatCurrency(item.amount_paid),
            change: formatCurrency(item.change),
            total_amount: formatCurrency(item.total_amount),
            branch: item.branch?.description || "",
        })); 
        console.log(formattedTransactions);
        return { items: formattedTransactions, total: data.total, pages: data.pages, isLoading: false, error: null };
    },
    
    getById: async (id: string): Promise<Sales | null> => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return mockSales.find(p => p.id === id) || null;
    },
    
    update: async (id: string, product: Partial<Sales>): Promise<Sales | null> => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const index = mockSales.findIndex(p => p.id === id);
        if (index === -1) return null;
        
        mockSales[index] = { ...mockSales[index], ...product };
        return mockSales[index];
    }
}
