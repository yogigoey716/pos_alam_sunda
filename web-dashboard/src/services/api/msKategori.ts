import { apiFetch } from "@/lib/api";
import { API_CONFIG } from "@/config/api";
import { Category } from "@/types/category";

export const msKategoriService = {
    getAll: async () : Promise<Category[]> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.MS_KATEGORI);
        return response.data;
    },
}   