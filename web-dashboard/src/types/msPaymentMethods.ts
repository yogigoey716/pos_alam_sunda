export interface PaymentMethods {
    id: string;
    name: string;
    description: string;
}

export interface RequestBodyPaymentMethods{
    name: string;
    description: string;
}

export interface UsePaymentMethodsParams {
    status: string;
    cate: string;
    search: string;
    page: number;
    size: number;
    startDate: string;
    endDate: string;
    onUnauthorized?: () => void;
  }

export interface PaymentMethodsResponse {
  total: number;
  pages: number;
  items: PaymentMethods[];
}