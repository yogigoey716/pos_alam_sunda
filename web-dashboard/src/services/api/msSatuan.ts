import { apiFetch } from "@/lib/api";
import { API_CONFIG } from "@/config/api";
import { RequestBodySatuan, Satuan, SatuanResponse, UseSatuanParams } from "@/types/msSatuan";

export const msSatuanService = {

    getAll: async ({
        status,
        cate,
        search,
        page,
        size,
        startDate,
        endDate,
        }: UseSatuanParams): Promise<{
        items: Satuan[];
        total: number;
        pages: number;
        isLoading: boolean;
        error: Error | null;
        }> => {
        try {
            const queryParams = new URLSearchParams({
            ...(status && { status_filter: status }),
            ...(cate && { category: cate }),
            ...(search && { search }),
            ...(startDate && { start_date: startDate }),
            ...(endDate && { end_date: endDate }),
            page: page.toString(),
            size: size.toString(),
            });
            const response = await apiFetch(
            API_CONFIG.ENDPOINTS.GET_MS_SATUAN + `?${queryParams.toString()}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
            );
    
            if(response.code !== 200){
            throw new Error(response.detail || "Gagal memuat produk");
            }
    
            const data = response.data as SatuanResponse;
            const dataProduct: Satuan[] = data.items.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            }));
            return { items: dataProduct, total: data.total, pages: data.pages, isLoading: false, error: null };
        } catch (error) {
            // Fallback to mock data during development
            console.error("Error fetching products:", error);
            return {
            items: [],
            total: 0,
            pages: 0,
            isLoading: false,
            error: error as Error,
            };
        }
    },
    getAllProjection: async () : Promise<Satuan[]> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.GET_MS_SATUAN_PROJECTIONS);
        return response.data;
    },

    create: async (ingredient: RequestBodySatuan): Promise<Satuan> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.CREATE_MS_SATUAN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredient),
        });
        return response.data;
    },
}