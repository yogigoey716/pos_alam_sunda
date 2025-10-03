"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/utils/withAuth";
import { msPaymentMethodsService } from "@/services/api/msPaymentMethods";

function AddPaymentMethodsPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name) {
      setError("Nama wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      await msPaymentMethodsService.create({
        name,
        description,
      });
      router.push("/ms-payment-methods");
    } catch (err) {
      setError("Gagal menambah satuan." + (err instanceof Error ? `: ${err.message}` : ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mx-auto max-w-xl bg-white rounded shadow dark:bg-neutral-900">
      <h1 className="mb-4 text-2xl font-bold">Tambah Metode Pembayaran</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Nama Metode Pembayaran</label>
          <input type="text" className="px-3 py-2 w-full rounded border" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Deskripsi Metode Pembayaran</label>
          <input type="text" className="px-3 py-2 w-full rounded border" value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        {error && <div className="mb-2 text-red-500">{error}</div>}
        <button type="submit" className="py-2 w-full text-black bg-white rounded border border-black hover:bg-gray-100" disabled={loading}>
          {loading ? "Menyimpan..." : "+ Tambah Metode Pembayaran"}
        </button>
      </form>
    </div>
  );
}

export default withAuth(AddPaymentMethodsPage);