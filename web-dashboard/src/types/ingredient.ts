export interface Satuan{
    id: string;
    name: string;
    description: string;
}

export interface Ingredients{
    id: string;
    name: string;
    description: string;
    satuan?: Satuan;
}

export interface RequestBodyIngredients{
    name: string;
    description: string;
    satuan_id: string;
}

export interface UseIngredientsParams {
    status: string;
    cate: string;
    search: string;
    page: number;
    size: number;
    startDate: string;
    endDate: string;
    onUnauthorized?: () => void;
  }

export interface IngredientsResponse {
  total: number;
  pages: number;
  items: Ingredients[];
}