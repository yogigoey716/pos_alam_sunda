import { cookies } from "next/headers";
import { logoutApi } from "@/services/api/auth";

export async function POST() {
  try {
    // Get token from cookies before clearing
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    // Call backend logout if token exists
    if (token) {
      await logoutApi(token);
    }

    // Clear the auth cookies
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");

    return Response.json({
      ok: true,
      message: "Logout berhasil.",
    });
  } catch (err) {
    console.error("Logout error:", err);
    // Even if backend logout fails, we still clear cookies
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    
    return Response.json({
      ok: true,
      message: "Logout berhasil.",
    });
  }
}
