// export type Transactions = {
//     id: string;
//     transaction_date: string;
//     order_number: string;
//     total_amount: number;
//     change: number;
//     amount_paid: number;
//     is_paid: boolean;
//     payment_method: string;
//     items: string;
// }

interface Branch {
  description: string;
}

interface PaymentMethod {
  description: string;
}
interface TransactionRaw {
  id: string;
  payment_methods?: PaymentMethod;
  amount_paid: number;
  change: number;
  total_amount: number;
  branch?: Branch;
}

export interface TransactionResponse {
  total: number;
  pages: number;
  items: TransactionRaw[];
}

export interface TransactionTable {
  id: string;
  payment_methods: string;
  amount_paid: string;
  change: string;
  total_amount: string;
  branch: string;
  [key: string]: string;
}

export interface UseTransactionsParams {
  status: string;
  isPaid: string;
  search: string;
  page: number;
  size: number;
  startDate: string;
  endDate: string;
  onUnauthorized?: () => void;
}
