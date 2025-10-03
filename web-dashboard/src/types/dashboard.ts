export interface TransactionItem {
  total_amount: number;
  status: string;
}

export interface StockItem {
  stock: number;
}

export interface CategoryItem {
  name: string;
}

export interface ProductItem {
  category?: CategoryItem;
  name?: string;
  description?: string;
}

export interface StockCategory {
  product: ProductItem;
  stock: number;
}

export interface FrequentlyUsedMaterial {
  ingredient_id: string;
  ingredient_name: string;
  total_used: number;
  unit_name: string;
}

export interface SalesTotals {
  total: number;
  draft: number;
  success: number;
  pending: number;
}