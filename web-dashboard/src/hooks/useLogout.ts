import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/actions/authActions";

export function useLogout() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails, clear local state and redirect
      router.push("/login");
    }
  };

  return { logout };
}
