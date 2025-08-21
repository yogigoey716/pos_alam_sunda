import { useEffect, useState } from "react";
import { ManagementStock, ManagementStockFilters } from "@/types/managementStock";
import { managementStockService } from "@/services/api/managementStock";

export const useManagementStock = () => {
    const [managementStock, setManagementStock] = useState<ManagementStock[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchManagementStock = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await managementStockService.getAll();
            setManagementStock(data);
        } catch (err) {
            setError('Failed to fetch management stock');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchManagementStock();
    }, []);

    return {
        managementStock,
        loading,
        error,
    };
}

export const useManagementStockFilters = (managementStock: ManagementStock[]) => {
    const [filters, setFilters] = useState<ManagementStockFilters>({
        searchTerm: '',
        startDate: '',
        endDate: '',
    });

    const filteredManagementStock = managementStock.filter((managementStock) => {
        if (filters.searchTerm) {
            const searchLower = filters.searchTerm.toLowerCase();
            return (managementStock.namaBarang.toLowerCase().includes(searchLower) ||
            managementStock.codeBarang.toLowerCase().includes(searchLower))
        }
        // if (filters.startDate && filters.endDate){
        //     const date = new Date(managementStock.);
        //     if (date < new Date(filters.startDate) || date > new Date(filters.endDate)) {
        //         return false;
        //     }
        // }
        return true;
    });

    const updateFilter = (key: keyof ManagementStockFilters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    return {
        filters,
        filteredManagementStock,
        updateFilter,
        setFilters
    };
}
