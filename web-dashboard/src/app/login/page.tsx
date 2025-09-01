"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input";
import { setToken } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/new-pos-api/login/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    // localStorage.setItem("JWT", data.data.token);
    setToken(data.data.token);
    if (data.code === 200) {
      router.push("/");
    }else{
        setError(data.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="p-6 mx-auto max-w-sm">
      <h1 className="mb-4 text-2xl font-semibold">Masuk</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* <div>
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            className="px-3 py-2 w-full rounded-lg border"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div> */}
        <Input
          id="email"
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />

        <Input
          id="password"
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />

        {/* <div>
          <label className="block mb-1 text-sm">Password</label>
          <input
            type="password"
            className="px-3 py-2 w-full rounded-lg border"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div> */}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          className="px-4 py-2 w-full text-white bg-black rounded-lg border disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "Memproses..." : "Login"}
        </button>
      </form>
    </div>
  );
}
