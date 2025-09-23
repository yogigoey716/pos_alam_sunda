import { apiFetch } from "@/lib/api";
import { API_CONFIG } from "@/config/api";
import { Ingredients, IngredientsResponse, RequestBodyIngredients, UseIngredientsParams } from "@/types/ingredient";

export const msIngredientsService = {
    getAll: async ({
        status,
        cate,
        search,
        page,
        size,
        startDate,
        endDate,
      }: UseIngredientsParams): Promise<{
        items: Ingredients[];
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
            API_CONFIG.ENDPOINTS.GET_MS_INGREDIENTS + `?${queryParams.toString()}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
    
          if(response.code !== 200){
            throw new Error(response.detail || "Gagal memuat produk");
          }
    
          const data = response.data as IngredientsResponse;
          const dataProduct: Ingredients[] = data.items.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            satuan: item.satuan
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

    getAllProjection: async () : Promise<Ingredients[]> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.GET_MS_INGREDIENTS_PROJECTIONS);
        return response.data;
    },

    create: async (ingredient: RequestBodyIngredients): Promise<Ingredients> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.CREATE_MS_INGREDIENTS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredient),
        });
        return response.data;
    },
} 