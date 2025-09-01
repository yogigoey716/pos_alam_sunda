import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ message: "Email & password wajib diisi." }, { status: 400 });
    }

    const upstream = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/new-pos-api/login/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Ambil sekali saja data JSON dari backend
    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      console.log("Respon backend (gagal):", data);
      return Response.json(
        { message: data?.message ?? "Login gagal.", backend: data },
        { status: upstream.status }
      );
    }

    // Ambil token dari response backend
    const { accessToken, refreshToken } = data;
    const secure = process.env.NODE_ENV === "production";
    const cookieBase = {
      httpOnly: true as const,
      sameSite: "lax" as const,
      secure,
      path: "/",
    };

    (await cookies()).set("access_token", accessToken, { ...cookieBase, maxAge: 60 * 60 });
    (await cookies()).set("refresh_token", refreshToken, { ...cookieBase, maxAge: 60 * 60 * 24 * 30 });

    console.log("Respon backend (sukses):", data);

    return Response.json({
      ok: true,
      status: upstream.status,
      message: "Login berhasil.",
      backend: data, // kirim balik full response backend
    });
  } catch (err) {
    console.error("Error:", err);
    return Response.json({ message: "Terjadi kesalahan server." }, { status: 500 });
  }
}
