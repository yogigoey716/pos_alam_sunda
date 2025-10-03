import { apiFetch } from "@/lib/api";
import { API_CONFIG } from "@/config/api";
import { User, UserResponse, RequestBodyUser, UseUserParams } from "@/types/msUsers";

export const msUsersService = {
    getAll: async ({
        status,
        cate,
        search,
        page,
        size,
        startDate,
        endDate,
      }: UseUserParams): Promise<{
        items: User[];
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
            API_CONFIG.ENDPOINTS.USER + `?${queryParams.toString()}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
    
          if(response.code !== 200){
            throw new Error(response.detail || "Gagal memuat produk");
          }
    
          const data = response.data as UserResponse;
          const dataProduct: User[] = data.items.map((item) => ({
            id: item.id,
            username: item.username,
            email: item.email,
            role: item.role || null,
            branch: item.branch || null,
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

    getAllProjection: async () : Promise<User[]> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.USER + '/projections/');
        return response.data;
    },

    getProjectionById: async (id: string): Promise<User> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.USER + `${id}`);
        return response.data;
    },

    create: async (ingredient: RequestBodyUser): Promise<User> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.USER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredient),
        });
        return response.data;
    },
    update: async (id: string, ingredient: RequestBodyUser): Promise<User> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.USER + `${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredient),
        });
        return response.data;
    },
    delete: async (id: string): Promise<User> => {
        const response = await apiFetch(API_CONFIG.ENDPOINTS.USER + `${id}`, {
            method: 'DELETE',
        });
        return response.data;
    },
} 