"use client";

import { useEffect, useState } from "react";
import { msRolesService } from "@/services/api/msRoles";
import { Role, UseRoleParams } from "@/types/msRoles";

export default function useMsRoles(params: UseRoleParams) {
    const [role, setRole] = useState<Role[]>([]);
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        setError(null);

        msRolesService
        .getAll(params)
        .then((res) => {
            if (!isMounted) return;

            setRole(res.items);
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

    return { role, total, pages, isLoading, error };
}
