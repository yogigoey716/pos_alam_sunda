"use client";

import { useEffect, useState } from "react";
import { productsApi } from "@/services/api/products";
import { ProductTable, UseProductsParams } from "@/types/product";

export default function useProducts(params: UseProductsParams) {
  const [products, setProducts] = useState<ProductTable[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    productsApi
      .getAll(params)
      .then((res) => {
        if (!isMounted) return;

        setProducts(res.items);
        setTotal(res.total);
        setPages(res.pages);
      })
      .catch((err) => {
        if (!isMounted) return;

        if (err.response?.status === 401 && params.onUnauthorized) {
          params.onUnauthorized();
        }
        setError(err);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [
    params.status,
    params.cate,
    params.search,
    params.page,
    params.size,
    params.startDate,
    params.endDate,
    params.onUnauthorized,
  ]);

  return { products, total, pages, isLoading, error };
}
