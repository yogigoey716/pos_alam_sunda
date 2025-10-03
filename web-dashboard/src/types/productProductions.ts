interface Category {
    id: string;
    name: string;
    description: string;
}

interface Product{
    id: string;
    name: string;
    description: string;
    img?: string;
    category?: Category;
}
interface Branch {
    id: string;
    description: string;
    name: string;
}
interface User {
    id: string;
    description: string;
    username: string;
}
export interface ProductProductionResponse {
    total: number;
    pages: number;
    items: ProductProductionTable[];
}

export interface ProductProductionTable {
    id: string;
    product_id?: string;
    product?: Product;
    branch_id?: string;
    branch?: Branch;
    user_id?: string;
    user?: User;
    quantity_produced: string;
    production_date: string;
    note: string;
}

export interface UseProductProductionParams {
    branch: string;
    category: string;
    search: string;
    page: number;
    size: number;
    startDate: string;
    endDate: string;
    onUnauthorized?: () => void;
}

export interface RequestBodyProductProduction{
    product_id?: string;
    quantity_produced: string;
    production_date: string;
    note: string;
}