
export interface ProductDummy{
  id?: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  status: ProductStatus;
  ingredients?: ProductIngredient[]; // komposisi bahan baku
  // UI / computed fields
  margin?: number;
  hpp?: number;
  trend?: number;
  laba?: number;
}

export type ProductStatus = 'Tersedia' | 'Stok Rendah' | 'Habis';


export interface ProductIngredient {
  codeBarang: string; // kode bahan baku
  stock: number; // jumlah yang digunakan per produk
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
  description: string;
  ingredient: Ingredient;
  satuan: Satuan;
  stock: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category?: Category;
  stocks: number;
  price: number;
  ingredients?: ApiProductIngredient[];
  status_barang: string;
  img?: string;
}

export interface ProductProjections{
  id: string,
  name: string,
  description: string
}

export interface ProductResponse {
  total: number;
  pages: number;
  items: Product[];
}

export interface ProductTable {
  id: string;
  name: string;
  description: string;
  price: number;
  // stocks: string;
  category: Category | null;
  status_barang: string;
  barcode?: string;
  ingredients?: ProductIngredient[];
  img?: string;
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
    barcode?: string;
    status_barang: string;
    category_id: string;
    img?: string;
}