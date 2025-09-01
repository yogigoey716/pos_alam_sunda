
"use client";

// removed unused JSX import
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { FC } from "react";
// Constrain P to always include IntrinsicAttributes (PropsWithChildren covers this)
export default function withAuth<P extends React.PropsWithChildren<object>>(WrappedComponent: React.ComponentType<P>): FC<P> {
  const ProtectedRoute: FC<P> = (props) => {
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
  return ProtectedRoute;
}