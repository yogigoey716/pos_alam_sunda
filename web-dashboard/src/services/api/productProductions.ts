import { API_CONFIG } from "@/config/api";
import { apiFetch } from "@/lib/api";
import { IngredientTable } from "@/types/productIngredients";
import { ProductProductionResponse, ProductProductionTable, RequestBodyProductProduction, UseProductProductionParams } from "@/types/productProductions";

export const productProductionsApi = {
  branch: "",
  category: "",
  search: "",
  page: 1,
  size: 10,
  startDate: "",
  endDate: "",
  getAll: async ({
    branch,
    category,
    search,
    page,
    size,
    startDate,
    endDate,
  }: UseProductProductionParams): Promise<{
    items: ProductProductionTable[];
    total: number;
    pages: number;
    isLoading: boolean;
    error: Error | null;
  }> => {
    try {
      const queryParams = new URLSearchParams({
        ...(branch && { branch: branch }),
        ...(category && { category: category }),
        ...(search && { search }),
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
        page: page.toString(),
        size: size.toString(),
      });
      const response = await apiFetch(
        API_CONFIG.ENDPOINTS.GET_PRODUCT_PRODUCTION + `?${queryParams.toString()}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if(response.code !== 200){
        return {
          items: [],
          total: 0,
          pages: 0,
          isLoading: false,
          error: new Error(response.detail || "Gagal memuat produk"),
        };
      }

      const data = response.data as ProductProductionResponse;
      const dataProductProductions: ProductProductionTable[] = data.items.map((item) => ({
        id: item.id,
        product_id: item.product_id,
        branch_id: item.branch_id,
        product: item.product,
        branch: item.branch,
        user_id: item.user_id,
        user: item.user,
        quantity_produced: item.quantity_produced,
        production_date: item.production_date,
        note: item.note,
      }));
      return { items: dataProductProductions, total: data.total, pages: data.pages, isLoading: false, error: null };
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
  
  getById: async (id: string): Promise<IngredientTable | null> => {
    try {
      const response = await apiFetch(`/products/${id}`);
      return response.data;
    } catch {
      // Fallback to mock data
      return null;
    }
  },
  
  // Create new product
  create: async (product: RequestBodyProductProduction): Promise<IngredientTable> => {
    try {
      const response = await apiFetch(API_CONFIG.ENDPOINTS.CREATE_PRODUCT_PRODUCTION, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
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
export const productService = productProductionsApi;