import { apiFetch } from "@/lib/api";
import { API_CONFIG } from "@/config/api";
import { IngredientPurchase, IngredientPurchasesResponse, RequestBodyIngredientPurchases, UseIngredientPurchasesParams } from "@/types/ingredientPurchases";

export const ingredientPurchasesService = {
    getAll: async ({
        status,
        cate,
        search,
        page,
        size,
        startDate,
        endDate,
      }: UseIngredientPurchasesParams): Promise<{
        items: IngredientPurchase[];
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
            API_CONFIG.ENDPOINTS.GET_INGREDIENT_PURCHASE + `?${queryParams.toString()}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
    
          if(response.code !== 200){
            throw new Error(response.detail || "Gagal memuat pembelian bahan");
          }
    
          const data = response.data as IngredientPurchasesResponse;
          const dataProduct: IngredientPurchase[] = data.items.map((item) => ({
            id: item.id,
            supplier: item.supplier,
            ingredient: item.ingredient,
            branch: item.branch,
            quantity: item.quantity,
            unit_price: item.unit_price,
            total_price: item.total_price,
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

    getAllProjection: async () : Promise<IngredientPurchase[]> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.GET_INGREDIENT_PURCHASE_PROJECTIONS);
        return response.data;
    },

    create: async (supplier: RequestBodyIngredientPurchases): Promise<IngredientPurchase> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.CREATE_INGREDIENT_PURCHASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(supplier),
        });
        return response.data;
    },
} 