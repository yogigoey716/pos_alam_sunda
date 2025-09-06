"use client";

import { useEffect, useState } from "react";
import { productIngredientsApi } from "@/services/api/productIngredients";
import { IngredientTable, UseIngredientParams } from "@/types/productIngredients";

export default function useProductIngredients(params: UseIngredientParams) {
  const [productsIngredients, setProductsIngredients] = useState<IngredientTable[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    productIngredientsApi
      .getAll(params)
      .then((res) => {
        if (!isMounted) return;

        setProductsIngredients(res.items);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return { productsIngredients, total, pages, isLoading, error };
}
