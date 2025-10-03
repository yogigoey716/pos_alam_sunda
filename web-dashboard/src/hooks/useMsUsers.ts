"use client";

import { useEffect, useState } from "react";
import { msUsersService } from "@/services/api/msUsers";
import { User, UseUserParams } from "@/types/msUsers";

export default function useMsUsers(params: UseUserParams) {
    const [user, setUser] = useState<User[]>([]);
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        setError(null);

        msUsersService
        .getAll(params)
        .then((res) => {
            if (!isMounted) return;

            setUser(res.items);
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

    return { user, total, pages, isLoading, error };
}
