"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { formatCurrency } from "@/utils/formatter";

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
  const [transactions, setTransactions] = useState<any[]>([]);
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
        

        setTotal(res.data.total);
        setPages(res.data.pages);
        setTransactions(
          res.data.items.map((trx: any) => ({
            ...trx,
            payment_methods: trx.payment_methods?.description ?? "-",
            amount_paid: formatCurrency(trx.amount_paid),
            change: formatCurrency(trx.change),
            total_amount: formatCurrency(trx.total_amount),
            branch: trx.branch ? trx.branch.description :"-",
          }))
        );
      } catch (err: any) {
        
        setError(err);
        if (err.message?.includes("Unauthorized") && onUnauthorized) {
          onUnauthorized();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [status, isPaid, page, size, search, startDate, endDate]);

  return { transactions, total, pages, isLoading, error };
}
