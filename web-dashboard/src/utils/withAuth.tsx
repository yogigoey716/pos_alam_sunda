"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  return function ProtectedRoute(props: P) {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("JWT");

      if (!token) {
        // Kalau ga ada token → lempar ke login
        router.replace("/login");
      } else {
        setIsChecking(false);
      }
    }, [router]);

    // Biar ga flicker pas cek token
    if (isChecking) {
      return <p className="p-6">🔒 Checking authentication...</p>;
    }

    return <WrappedComponent {...props} />;
  };
}