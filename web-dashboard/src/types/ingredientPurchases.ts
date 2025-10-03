

export interface Suppliers{
    id?: string;
    name: string;
}

export interface Bahan{
    id?: string;
    name: string;
}

export interface Branch{
    id?: string;
    name: string;
}

export interface IngredientPurchase{
    id: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    supplier?: Suppliers;
    ingredient?: Bahan;
    branch?: Branch;
}

export interface RequestBodyIngredientPurchases{
    supplier_id: string;
    ingredient_id: string;
    branch_id: string;
    quantity: number;
    unit_price: number;
    total_price: number;
}

export interface UseIngredientPurchasesParams {
    branch: string;
    search: string;
    page: number;
    size: number;
    startDate: string;
    endDate: string;
    onUnauthorized?: () => void;
  }

export interface IngredientPurchasesResponse {
  total: number;
  pages: number;
  items: IngredientPurchase[];
}