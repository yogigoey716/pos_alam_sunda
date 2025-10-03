"use client";

import { useEffect, useState } from "react";
import { branchProductsApi } from "@/services/api/branchProducts";
import { BranchProducts, UseBranchProductsParams } from "@/types/branchProducts";

export default function useBranchProducts(params: UseBranchProductsParams) {
    const [branchProducts, setBranchProducts] = useState<BranchProducts[]>([]);
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        setError(null);

        branchProductsApi
        .getAll(params)
        .then((res) => {
            if (!isMounted) return;

            setBranchProducts(res.items);
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
        params.branch,
        params.search,
        params.page,
        params.size,
        params.startDate,
        params.endDate,
        params.onUnauthorized,
    ]);

    return { branchProducts, total, pages, isLoading, error };
}
