import { apiFetch } from "@/lib/api";
import { API_CONFIG } from "@/config/api";
import { Category } from "@/types/category";

export const msKategoriService = {
    getAll: async () : Promise<Category[]> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.GET_MS_KATEGORI);
        return response.data;
    },
    getAllProjection: async () : Promise<Category[]> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.GET_MS_KATEGORI_PROJECTIONS);
        return response.data;
    }
}   