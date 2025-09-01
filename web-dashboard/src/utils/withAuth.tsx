
"use client";
import { useEffect, useState, ComponentType } from "react";
import { useRouter } from "next/navigation";

export default function withAuth<P extends Record<string, never> = Record<string, never>>(WrappedComponent: ComponentType<P>): ComponentType<P> {
  const ProtectedRoute = (props: P) => {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("JWT");
      if (!token) {
        router.replace("/login");
      } else {
        setIsChecking(false);
      }
    }, [router]);

    if (isChecking) {
      return <p className="p-6">🔒 Checking authentication...</p>;
    }

    return <WrappedComponent {...props} />;
  };
  return ProtectedRoute;
}