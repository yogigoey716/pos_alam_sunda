"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { msIngredientsService } from "@/services/api/msIngredients";
import withAuth from "@/utils/withAuth";
import { msSatuanService } from "@/services/api/msSatuan";
import { Satuan } from "@/types/satuan";

function AddIngredientsPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [satuan_id, setSatuan_id] = useState("");
  const [satuan, setSatuan] = useState<Satuan[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    msSatuanService
      .getAllProjection()
      .then((res) => {
        console.log("Satuan dari API:", res);
        setSatuan(res ?? []);
      })
      .catch((err) => {
        console.error("Gagal load satuan:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !satuan_id) {
      setError("Nama, kategori, dan harga wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      await msIngredientsService.create({
        name,
        description,
        satuan_id,
      });
      router.push("/ingredients");
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
          <label className="block mb-1 font-medium">Nama Bahan Baku</label>
          <input type="text" className="px-3 py-2 w-full rounded border" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Description Produk</label>
          <input type="text" className="px-3 py-2 w-full rounded border" value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Satuan</label>
          <select className="px-3 py-2 w-full rounded border" value={satuan_id} onChange={e => setSatuan_id(e.target.value)} required>
            <option value="">{loading ? "Loading..." : "Pilih Satuan"}</option>
            {satuan.map((satuan) => (
              <option key={satuan.id} value={satuan.id}>{satuan.name}</option>
            ))}
          </select>
        </div>
        {error && <div className="mb-2 text-red-500">{error}</div>}
        <button type="submit" className="py-2 w-full text-black bg-white rounded border border-black hover:bg-gray-100" disabled={loading}>
          {loading ? "Menyimpan..." : "+ Tambah Produk"}
        </button>
      </form>
    </div>
  );
}

export default withAuth(AddIngredientsPage);