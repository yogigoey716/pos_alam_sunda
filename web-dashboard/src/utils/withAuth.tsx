
"use client";
import { ComponentType, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { initializeAuth } from "@/store/actions/authActions";

export default function withAuth<P extends Record<string, never> = Record<string, never>>(WrappedComponent: ComponentType<P>): ComponentType<P> {
  const ProtectedRoute = (props: P) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

    // Initialize auth state on component mount
    useEffect(() => {
      dispatch(initializeAuth());
    }, [dispatch]);

    // Show loading while checking auth state
    if (isLoading) {
      return <p className="p-6">🔒 Checking authentication...</p>;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.replace("/login");
      return <p className="p-6">Redirecting to login...</p>;
    }

    return <WrappedComponent {...props} />;
  };
  return ProtectedRoute;
}