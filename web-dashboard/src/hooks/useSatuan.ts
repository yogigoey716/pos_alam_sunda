"use client";

import { useEffect, useState } from "react";
import { msSatuanService } from "@/services/api/msSatuan";
import { Satuan, UseSatuanParams } from "@/types/msSatuan";

export default function useSatuan(params: UseSatuanParams) {
    const [satuan, setSatuan] = useState<Satuan[]>([]);
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        setError(null);

        msSatuanService
        .getAll(params)
        .then((res) => {
            if (!isMounted) return;

            setSatuan(res.items);
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

    return { satuan, total, pages, isLoading, error };
}
