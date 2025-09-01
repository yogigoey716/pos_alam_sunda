"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { formatCurrency } from "@/utils/formatter";

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

interface TransactionResponse {
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

interface UseTransactionsParams {
  status: string;
  isPaid: string;
  search: string;
  page: number;
  size: number;
  startDate: string;
  endDate: string;
  onUnauthorized?: () => void;
}

export default function useTransactions({
  status,
  isPaid,
  search,
  page,
  size,
  startDate,
  endDate,
  onUnauthorized,
}: UseTransactionsParams) {
  const [transactions, setTransactions] = useState<TransactionTable[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (status) queryParams.append("status_filter", status);
        if (isPaid) queryParams.append("is_paid", isPaid);
        if (search) queryParams.append("search", search);
        if (startDate) queryParams.append("start_date", startDate);
        if (endDate) queryParams.append("end_date", endDate);
        queryParams.append("page", page.toString());
        queryParams.append("size", size.toString());

        const url = `/new-pos-api/transactions/transactions${
          queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`;

        const res = await apiFetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = res.data as TransactionResponse;

        const formattedTransactions: TransactionTable[] = data.items.map((item) => ({
          ...item,
          payment_methods: item.payment_methods?.description || "",
          amount_paid: formatCurrency(item.amount_paid),
          change: formatCurrency(item.change),
          total_amount: formatCurrency(item.total_amount),
          branch: item.branch?.description || "",
        }));  

        setTotal(data.total);
        setPages(data.pages);
        setTransactions(formattedTransactions);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
          if (err.message?.includes("Unauthorized") && onUnauthorized) {
            onUnauthorized();
          }
        } else {
          console.error("Unexpected error: ", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [status, isPaid, page, size, search, startDate, endDate, onUnauthorized]);

  return { transactions, total, pages, isLoading, error };
}
