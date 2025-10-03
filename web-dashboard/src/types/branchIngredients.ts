interface Branch {
    id: string;
    name: string;
    description: string;
}

interface Ingredient {
    id: string;
    name: string;
    description: string;
}

export interface BranchIngredients {
    id: string;
    branch_id?: string;
    ingredient_id?: string;
    branch?: Branch;
    ingredient?: Ingredient;
    stock?: number;
    min_stock?: number;
}

export interface RequestBodyBranchIngredients{
    branch_id?: string;
    ingredient_id?: string;
    stock?: number;
    min_stock?: number;
}

export interface UseBranchIngredientsParams {
    status?: string;
    branch?: string;
    search: string;
    page: number;
    size: number;
    startDate: string;
    endDate: string;
    onUnauthorized?: () => void;
  }

export interface BranchIngredientsResponse {
  total: number;
  pages: number;
  items: BranchIngredients[];
}