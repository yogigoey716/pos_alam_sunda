"use client";

import { useEffect, useState } from "react";
import { msPaymentMethodsService } from "@/services/api/msPaymentMethods";
import { PaymentMethods, UsePaymentMethodsParams } from "@/types/msPaymentMethods";

export default function useMsPaymentMethods(params: UsePaymentMethodsParams) {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethods[]>([]);
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        setError(null);

        msPaymentMethodsService
        .getAll(params)
        .then((res) => {
            if (!isMounted) return;

            setPaymentMethods(res.items);
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

    return { paymentMethods, total, pages, isLoading, error };
}
