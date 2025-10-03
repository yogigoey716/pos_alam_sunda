import { API_CONFIG } from "@/config/api";
import { apiFetch } from "@/lib/api";
import { BranchProducts, BranchProductsResponse, UseBranchProductsParams } from "@/types/branchProducts";

export const branchProductsApi = {
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
  }: UseBranchProductsParams): Promise<{
    items: BranchProducts[];
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
        API_CONFIG.ENDPOINTS.GET_STOCK_PRODUCTS + `?${queryParams.toString()}`,
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
          error: response.detail,
        };
      }

      const data = response.data as BranchProductsResponse;
      const dataProduct: BranchProducts[] = data.items.map((item) => ({
        id: item.id,
        branch_id: item.branch_id,
        product_id: item.product_id,
        branch: item.branch,
        product: item.product,
        stock: item.stock,
        min_stock: item.min_stock || 0,
        category: item.product?.category,
        status: item.status,
        img: item.product?.img ? `http://localhost:8200/static/${item.product?.img}` : "Image not found",
      }));
      return { items: dataProduct, total: data.total, pages: data.pages, isLoading: false, error: response.detail };
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
  
  getById: async (id: string): Promise<BranchProducts | null> => {
    try {
      const response = await apiFetch(API_CONFIG.ENDPOINTS.GET_STOCK_PRODUCTS + `${id}`);
      return response.data;
    } catch {
      // Fallback to mock data
      return null;
    }
  },
  
  // Create new product
  create: async (product: FormData): Promise<BranchProducts> => {
    try {
      const response = await apiFetch(API_CONFIG.ENDPOINTS.CREATE_STOCK_PRODUCTS, {
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

  updateMinimumStock: async (id: string, branchProductsUpdateMinimumStock: { min_stock: number }): Promise<BranchProducts | null> => {
      try {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.UPDATE_STOCK_PRODUCTS_MINIMUM_STOCK + `${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(branchProductsUpdateMinimumStock),
        });
        return response.data;
      } catch {
        // Fallback to mock data
        return null;
      }
    },  
};

// Export the old service for backward compatibility
export const branchProductsService = branchProductsApi;