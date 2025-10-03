"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/utils/withAuth";
import { useParams } from "next/navigation";
import { branchProductsService } from "@/services/api/branchProducts";

function EditBranchProductsPage() {
  const router = useRouter();   
  const params = useParams(); // ambil id dari URL
  const id = params?.id as string;
  const [min_stock, setMin_stock] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!min_stock) {
      setError("Nama, kategori, dan harga wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      await branchProductsService.updateMinimumStock(id, {
        min_stock,
      });
      router.push("/branch-products");
    } catch (err) {
      setError("Gagal menambah produk." + (err instanceof Error ? `: ${err.message}` : ""));
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="p-6 mx-auto max-w-xl bg-white rounded shadow dark:bg-neutral-900">
      <h1 className="mb-4 text-2xl font-bold">Tambah Bahan Baku</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Min Stock</label>
          <input type="number" className="px-3 py-2 w-full rounded border" value={min_stock} onChange={(e) => setMin_stock(Number(e.target.value))} required />
        </div>
        {error && <div className="mb-2 text-red-500">{error}</div>}
        <button type="submit" className="py-2 w-full text-black bg-white rounded border border-black hover:bg-gray-100" disabled={loading}>
          {loading ? "Menyimpan..." : "+ Tambah Produk"}
        </button>
      </form>
    </div>
  );
}

export default withAuth(EditBranchProductsPage);