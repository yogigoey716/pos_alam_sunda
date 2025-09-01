export type Transactions = {
    id: string;
    transaction_date: string;
    order_number: string;
    total_amount: number;
    change: number;
    amount_paid: number;
    is_paid: boolean;
    payment_method: string;
    items: string;
}
