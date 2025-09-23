import { apiFetch } from "@/lib/api";
import { API_CONFIG } from "@/config/api";
import { Branch, BranchResponse, RequestBodyBranch, UseBranchParams } from "@/types/msBranches";

export const msBranchesService = {
    getAll: async ({
        status,
        cate,
        search,
        page,
        size,
        startDate,
        endDate,
      }: UseBranchParams): Promise<{
        items: Branch[];
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
            API_CONFIG.ENDPOINTS.GET_MS_BRANCH + `?${queryParams.toString()}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
    
          if(response.code !== 200){
            throw new Error(response.detail || "Gagal memuat produk");
          }
    
          const data = response.data as BranchResponse;
          const dataProduct: Branch[] = data.items.map((item) => ({
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

    getAllProjection: async () : Promise<Branch[]> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.GET_MS_BRANCH_PROJECTIONS);
        return response.data;
    },

    create: async (ingredient: RequestBodyBranch): Promise<Branch> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.CREATE_MS_BRANCH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredient),
        });
        return response.data;
    },
} 