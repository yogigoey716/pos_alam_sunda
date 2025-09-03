"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { formatCurrency } from "@/services/utils/formatters";
import { TransactionResponse, TransactionTable, UseTransactionsParams } from "@/types/transactions";
import { API_CONFIG } from "@/config/api";
import { salesService } from "@/services/api/seles";



export default function useTransactions(params: UseTransactionsParams) {
  const [transactions, setTransactions] = useState<TransactionTable[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true)
    setError(null);

    salesService
    .getAll(params)
    .then((res) => {
      if (!isMounted) return;

      setTransactions(res.items);
      setTotal(res.total);
      setPages(res.pages);
    })
    .catch((err) => {
      if (!isMounted) return;

      if (err.response?.status === 401 && params.onUnauthorized){
        params.onUnauthorized();
      }
      setError(err);
    })
    .finally(() => {
      if(isMounted) {
        setIsLoading(false);
      }
    })

    return () => {
      isMounted = false;
    }
  }, [params.status, params.isPaid, params.page, params.size, params.search, params.startDate, params.endDate, params.onUnauthorized]);

  return { transactions, total, pages, isLoading, error };
}
