import { API_CONFIG } from "@/config/api";
import { apiFetch } from "@/lib/api";
import { IngredientResponse, IngredientTable, RequestBodyIngredient, UseIngredientParams } from "@/types/productIngredients";

export const productIngredientsApi = {
  status: "",
  cate: "",
  search: "",
  page: 1,
  size: 10,
  startDate: "",
  endDate: "",
  getAll: async ({
    status,
    cate,
    search,
    page,
    size,
    startDate,
    endDate,
  }: UseIngredientParams): Promise<{
    items: IngredientTable[];
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
        API_CONFIG.ENDPOINTS.GET_PRODUCT_INGREDIENTS + `?${queryParams.toString()}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if(response.code !== 200){
        throw new Error(response.detail || "Gagal memuat produk");
      }

      const data = response.data as IngredientResponse;
      const dataProduct: IngredientTable[] = data.items.map((item) => ({
        id: item.id,
        qty: item.qty,
        nameProduct: item.product?.description,
        nameIngredients: item.ingredient?.description,
        ingredientId: item.ingredientId,
        productId: item.productId,
        satuan: item.ingredient?.satuan?.name,
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
  create: async (product: Omit<RequestBodyIngredient, 'id'>): Promise<IngredientTable> => {
    try {
      const response = await apiFetch(API_CONFIG.ENDPOINTS.CREATE_PRODUCT, {
        method: 'POST',
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
export const productService = productIngredientsApi;