import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser } from "@/store/actions/authActions";
import { clearError } from "@/store/slices/authSlice";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  // Clear error when hook is used
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await dispatch(loginUser({ email, password }));
    
    if (loginUser.fulfilled.match(result)) {
      router.push("/");
    }
    // Error handling is managed by Redux state
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    dispatch(clearError());
  };

  return {
    // Form state
    email,
    setEmail,
    password,
    setPassword,
    
    // Auth state
    isLoading,
    error,
    isAuthenticated,
    
    // Actions
    handleSubmit,
    resetForm,
  };
}
