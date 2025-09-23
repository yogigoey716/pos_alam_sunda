import { cookies } from "next/headers";
import { loginApi } from "@/services/api/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email & password wajib diisi." }, { status: 400 });
    }

    const data = await loginApi({ email, password });

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

    return NextResponse.json({
      ok: true,
      status: 200,
      message: "Login berhasil.",
      backend: data,
    });
  } catch (err) {
    // log raw thrown value for production diagnostics
    console.error("Login error (raw):", err);

    const rawMsg = err && typeof err === "object" && "message" in err ? String((err as any).message).trim() : "";
    const errorMessage = rawMsg || "Login gagal.";
    return NextResponse.json({ ok: false, message: errorMessage }, { status: 401 });
  }
}