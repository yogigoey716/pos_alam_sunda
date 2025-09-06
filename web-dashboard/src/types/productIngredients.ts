    interface Product{
        id: string;
        name: string;
        description: string;
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
    export interface IngredientResponse {
        total: number;
        pages: number;
        items: IngredientTable[];
    }
    
    export interface IngredientTable {
        id: string;
        qty: string;
        nameIngredients?: string;
        ingredientId?: string;
        productId?: string;
        ingredient?: Ingredient;
        product?: Product;
        nameProduct?: string;
        satuan?: string;
    }
    
    export interface UseIngredientParams {
        status: string;
        cate: string;
        search: string;
        page: number;
        size: number;
        startDate: string;
        endDate: string;
        onUnauthorized?: () => void;
    }
    
    export interface RequestBodyIngredient{
        qty: string;
        ingredientId?: string;
        productId?: string;
    }