import { cookies } from "next/headers";
import { loginApi } from "@/services/api/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ message: "Email & password wajib diisi." }, { status: 400 });
    }

    // Use data layer for login
    const data = await loginApi({ email, password });

    // Extract token from response
    const { token } = data.data || {};
    if (token) {
      const secure = process.env.NODE_ENV === "production";
      const cookieBase = {
        httpOnly: true as const,
        sameSite: "lax" as const,
        secure,
        path: "/",
      };

      (await cookies()).set("access_token", token, { ...cookieBase, maxAge: 60 * 60 });
    }

    console.log("Login berhasil:", data);

    return Response.json({
      ok: true,
      status: 200,
      message: "Login berhasil.",
      backend: data, // kirim balik full response backend dengan struktur yang benar
    });
  } catch (err) {
    console.error("Login error:", err);
    const errorMessage = err instanceof Error ? err.message : "Login gagal.";
    return Response.json({ 
      ok: false, 
      message: errorMessage 
    }, { status: 401 });
  }
}
