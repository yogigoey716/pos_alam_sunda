"use client";

import { useEffect, useState } from "react";
import { ingredientPurchasesService } from "@/services/api/ingredientPurchases";
import { IngredientPurchase, UseIngredientPurchasesParams } from "@/types/ingredientPurchases";

export default function useIngredientPurchases(params: UseIngredientPurchasesParams) {
  const [ingredientPurchases, setIngredientPurchases] = useState<IngredientPurchase[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    ingredientPurchasesService
      .getAll(params)
      .then((res) => {
        if (!isMounted) return;

        setIngredientPurchases(res.items);
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
    params.branch,
    params.search,
    params.page,
    params.size,
    params.startDate,
    params.endDate,
    params.onUnauthorized,
  ]);

  return { ingredientPurchases, total, pages, isLoading, error };
}
