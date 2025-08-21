import { useEffect, useState } from "react";
import { Sales, SalesFilters } from "@/types/sales";
import { salesService } from "@/services/api/seles";

export const useSales = () => {
    const [sales, setSales] = useState<Sales[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSales = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await salesService.getAll();
            setSales(data);
        } catch (err) {
            setError('Failed to fetch sales');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    return {
        sales,
        loading,
        error,
    };
}

export const useSalesFilters = (sales: Sales[]) => {
    const [filters, setFilters] = useState<SalesFilters>({
        searchTerm: '',
        startDate: '',
        endDate: '',
    });

    const filteredSales = sales.filter((sale) => {
        if (filters.searchTerm) {
            const searchLower = filters.searchTerm.toLowerCase();
            return sale.kasir.toLowerCase().includes(searchLower)
        }
        if (filters.startDate && filters.endDate){
            const date = new Date(sale.tanggal);
            if (date < new Date(filters.startDate) || date > new Date(filters.endDate)) {
                return false;
            }
        }
        return true;
    });

    const updateFilter = (key: keyof SalesFilters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    return {
        filters,
        filteredSales,
        updateFilter,
        setFilters
    };
}
