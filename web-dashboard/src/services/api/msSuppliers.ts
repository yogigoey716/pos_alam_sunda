import { apiFetch } from "@/lib/api";
import { API_CONFIG } from "@/config/api";
import { Suppliers, SuppliersResponse, RequestBodySuppliers, UseSuppliersParams } from "@/types/suppliers";

export const msSuppliersService = {
    getAll: async ({
        status,
        cate,
        search,
        page,
        size,
        startDate,
        endDate,
      }: UseSuppliersParams): Promise<{
        items: Suppliers[];
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
            API_CONFIG.ENDPOINTS.GET_MS_SUPPLIERS + `?${queryParams.toString()}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
    
          if(response.code !== 200){
            throw new Error(response.detail || "Gagal memuat supplier");
          }
    
          const data = response.data as SuppliersResponse;
          const dataProduct: Suppliers[] = data.items.map((item) => ({
            id: item.id,
            name: item.name,
            contact_person: item.contact_person,
            phone: item.phone,
            email: item.email,
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

    getAllProjection: async () : Promise<Suppliers[]> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.GET_MS_SUPPLIERS_PROJECTIONS);
        return response.data;
    },

    create: async (supplier: RequestBodySuppliers): Promise<Suppliers> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.CREATE_MS_SUPPLIERS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(supplier),
        });
        return response.data;
    },
} 