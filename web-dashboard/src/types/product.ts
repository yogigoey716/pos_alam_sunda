export interface ProductIngredient {
  codeBarang: string; // kode bahan baku
  qty: number; // jumlah yang digunakan per produk
  namaBarang?: string; // opsional, hasil lookup untuk UI
  satuan?: string; // opsional, hasil lookup untuk UI
}

interface Satuan{
  id: string;
  name: string;
  description: string;
}

interface Ingredient {
  id: string;
  description: string;
  satuan: Satuan;
}

export interface ApiProductIngredient {
  id: string;
  ingredient: Ingredient;
  satuan: Satuan;
  qty: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

interface Product {
  id: string;
  name: string;
  category?: Category;
  stocks: number;
  price: number;
  ingredients: ApiProductIngredient[];
  status_barang: string;
}

export interface ProductResponse {
  total: number;
  pages: number;
  items: Product[];
}

export interface ProductTable {
  id: string;
  name: string;
  price: number;
  stocks: string;
  category: string;
  status_barang: string;
  ingredients?: ProductIngredient[];
}

export interface UseProductsParams {
  status: string;
  cate: string;
  search: string;
  page: number;
  size: number;
  startDate: string;
  endDate: string;
  onUnauthorized?: () => void;
}

export interface RequestBodyProduct{
    name: string;
    description: string;
    stocks: string;
    price: number;
    barcode: string;
    status_barang: string;
    category_id: string;
}