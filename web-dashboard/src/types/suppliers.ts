

export interface Suppliers{
    id: string;
    name: string;
    contact_person: string;
    phone: string;
    email: string;
}

export interface RequestBodySuppliers{
    name: string;
    contact_person: string;
    phone: string;
    email: string;
}

export interface UseSuppliersParams {
    status: string;
    cate: string;
    search: string;
    page: number;
    size: number;
    startDate: string;
    endDate: string;
    onUnauthorized?: () => void;
  }

export interface SuppliersResponse {
  total: number;
  pages: number;
  items: Suppliers[];
}