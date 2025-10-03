"use client";

import { useEffect, useState } from "react";
import { ProductProductionTable, UseProductProductionParams } from "@/types/productProductions";
import { productProductionsApi } from "@/services/api/productProductions";

export default function useProductProductions(params: UseProductProductionParams) {
    const [productProductions, setProductProductions] = useState<ProductProductionTable[]>([]);
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        setError(null);

        productProductionsApi
        .getAll(params)
        .then((res) => {
            if (!isMounted) return;

            setProductProductions(res.items);
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
        params.category,
        params.search,
        params.page,
        params.size,
        params.startDate,
        params.endDate,
        params.onUnauthorized,
    ]);

    return { productProductions, total, pages, isLoading, error };
}
