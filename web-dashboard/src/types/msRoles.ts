export interface Role {
    id: string;
    name: string;
    description: string;
}

export interface RequestBodyRole{
    name: string;
    description: string;
}

export interface UseRoleParams {
    status: string;
    cate: string;
    search: string;
    page: number;
    size: number;
    startDate: string;
    endDate: string;
    onUnauthorized?: () => void;
  }

export interface RoleResponse {
  total: number;
  pages: number;
  items: Role[];
}