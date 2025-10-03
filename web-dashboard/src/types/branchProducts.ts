interface Branch {
    id: string;
    name: string;
    description: string;
}

interface Category {
    id: string;
    name: string;
    description: string;
}

interface Products {
    id: string;
    name: string;
    description: string;
    img?: string;
    category?: Category;
}

export interface BranchProducts {
    id: string;
    branch_id: string;
    product_id: string;
    branch?: Branch;
    product?: Products;
    stock: number;
    min_stock: number;
    status?: string;
}

export interface RequestBodyBranchProducts{
    branch_id: string;
    product_id: string;
    stock: number;
    min_stock: number;
}

export interface UseBranchProductsParams {
    status?: string;
    branch: string;
    search: string;
    page: number;
    size: number;
    startDate: string;
    endDate: string;
    onUnauthorized?: () => void;
  }

export interface BranchProductsResponse {
  total: number;
  pages: number;
  items: BranchProducts[];
}