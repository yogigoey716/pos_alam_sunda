import { apiFetch } from "@/lib/api";
import { API_CONFIG } from "@/config/api";
import { Role, RoleResponse, RequestBodyRole, UseRoleParams } from "@/types/msRoles";

export const msRolesService = {
    getAll: async ({
        status,
        cate,
        search,
        page,
        size,
        startDate,
        endDate,
      }: UseRoleParams): Promise<{
        items: Role[];
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
            API_CONFIG.ENDPOINTS.ROLE + `?${queryParams.toString()}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
    
          if(response.code !== 200){
            throw new Error(response.detail || "Gagal memuat produk");
          }
    
          const data = response.data as RoleResponse;
          const dataProduct: Role[] = data.items.map((item) => ({
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

    getAllProjection: async () : Promise<Role[]> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.GET_ROLES_PROJECTIONS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    },

    getProjectionById: async (id: string): Promise<Role> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.ROLE + `${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    },

    create: async (ingredient: RequestBodyRole): Promise<Role> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.ROLE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredient),
        });
        return response.data;
    },

    update: async (id: string, ingredient: RequestBodyRole): Promise<Role> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.ROLE + `${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredient),
        });
        return response.data;
    },

    delete: async (id: string): Promise<Role> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.ROLE + `${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    },
} 