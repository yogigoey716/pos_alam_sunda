import { API_CONFIG } from "@/config/api";
import { apiFetch } from "@/lib/api";
import { BranchIngredients, BranchIngredientsResponse, RequestBodyBranchIngredients, UseBranchIngredientsParams } from "@/types/branchIngredients";

export const branchIngredientsApi = {
  status: "",
  branch: "",
  search: "",
  page: 1,
  size: 10,
  startDate: "",
  endDate: "",
  getAll: async ({
    status,
    branch,
    search,
    page,
    size,
    startDate,
    endDate,
  }: UseBranchIngredientsParams): Promise<{
    items: BranchIngredients[];
    total: number;
    pages: number;
    isLoading: boolean;
    error: Error | null;
  }> => {
    try {
      const queryParams = new URLSearchParams({
        ...(status && { status_filter: status }),
        ...(branch && { branch: branch }),
        ...(search && { search }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
        page: page.toString(),
        size: size.toString(),
      });
      const response = await apiFetch(
        API_CONFIG.ENDPOINTS.GET_STOCK_INGREDIENTS + `?${queryParams.toString()}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response);

      if(response.code != 200){
        // throw new Error(response.detail || "Gagal memuat stock Bahan");
        return {
          items: [],
          total: 0,
          pages: 0,
          isLoading: false,
          error: null,
        };
      }

      const data = response.data as BranchIngredientsResponse;
      const dataProduct: BranchIngredients[] = data.items.map((item) => ({
        id: item.id,
        branch_id: item.branch_id,
        ingredient_id: item.ingredient_id,
        branch: item.branch,
        ingredient: item.ingredient,
        stock: item.stock,
        min_stock: item.min_stock,
      }));
      return { items: dataProduct, total: data.total, pages: data.pages, isLoading: false, error: null };
    } catch (error) {
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
  
  getById: async (id: string): Promise<BranchIngredients | null> => {
    try {
      const response = await apiFetch(API_CONFIG.ENDPOINTS.GET_STOCK_INGREDIENTS + `${id}`);
      return response.data;
    } catch {
      // Fallback to mock data
      return null;
    }
  },

  updateMinimumStock: async (id: string, branchIngredientsUpdateMinimumStock: RequestBodyBranchIngredients): Promise<BranchIngredients | null> => {
    try {
      const response = await apiFetch(API_CONFIG.ENDPOINTS.UPDATE_STOCK_INGREDIENTS_MINIMUM_STOCK + `${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(branchIngredientsUpdateMinimumStock),
      });
      return response.data;
    } catch {
      // Fallback to mock data
      return null;
    }
  },
  
  // Create new product
  create: async (product: FormData): Promise<BranchIngredients> => {
    try {
      const response = await apiFetch(API_CONFIG.ENDPOINTS.CREATE_STOCK_INGREDIENTS, {
        method: 'POST',
        body: product,
      });
      return response.data;
    } catch(error) {
      // Fallback to mock behavior
      console.log(error);
      
      throw error;
    }
  },
  
  // Update product
//   update: async (id: string, product: Partial<RequestBodyProduct>): Promise<ProductTable | null> => {
//     try {
//       const response = await apiFetch(`/products/${id}`, {
//         method: 'PUT',
//         body: JSON.stringify(product),
//       });
//       return response.data;
//     } catch(error) {
//       // Fallback to mock behavior
//       console.log(error);
      
//       throw error;
//     }
//   },
  
//   // Delete product
//   delete: async (id: string): Promise<boolean> => {
//     try {
//       await apiFetch(`/products/${id}`, {
//         method: 'DELETE',
//       });
//       return true;
//     } catch {
//       // Fallback to mock behavior
//       const index = mockProducts.findIndex(p => p.id === id);
//       if (index === -1) return false;
      
//       mockProducts.splice(index, 1);
//       return true;
//     }
//   }
};

// Export the old service for backward compatibility
export const branchIngredientsService = branchIngredientsApi;