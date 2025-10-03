"use client";

import { useEffect, useState } from "react";
import { msIngredientsService } from "@/services/api/msIngredients";
import { Ingredients, UseIngredientsParams } from "@/types/ingredient";

export default function useIngredients(params: UseIngredientsParams) {
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    msIngredientsService
      .getAll(params)
      .then((res) => {
        if (!isMounted) return;

        setIngredients(res.items);
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
    params.search,
    params.page,
    params.size,
    params.startDate,
    params.endDate,
    params.onUnauthorized,
  ]);

  return { ingredients, total, pages, isLoading, error };
}
