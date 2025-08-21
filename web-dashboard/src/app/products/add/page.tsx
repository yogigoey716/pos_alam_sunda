"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockManagementStock } from "@/services/api/managementStock";
import { productService } from "@/services/api/products";
import { ProductIngredient } from "@/types/product";

export default function AddProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState("Tersedia");
  const [ingredients, setIngredients] = useState<ProductIngredient[]>([]);
  const [ingredientCode, setIngredientCode] = useState("");
  const [ingredientQty, setIngredientQty] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddIngredient = () => {
    if (!ingredientCode || !ingredientQty) return;
    const bahan = mockManagementStock.find(b => b.codeBarang === ingredientCode);
    setIngredients(prev => {
      const idx = prev.findIndex(i => i.codeBarang === ingredientCode);
      if (idx !== -1) {
        // Jika sudah ada, update qty
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          qty: updated[idx].qty + parseFloat(ingredientQty),
        };
        return updated;
      }
      // Jika belum ada, tambah baru
      return [
        ...prev,
        {
          codeBarang: ingredientCode,
          qty: parseFloat(ingredientQty),
          namaBarang: bahan?.namaBarang,
          satuan: bahan?.satuan,
        },
      ];
    });
    setIngredientCode("");
    setIngredientQty("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !category || !price) {
      setError("Nama, kategori, dan harga wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      await productService.create({
        name,
        category,
        stock,
        price,
        status: status as import("@/types/product").ProductStatus,
        ingredients,
      });
      router.push("/products");
    } catch (err) {
      setError("Gagal menambah produk." + (err instanceof Error ? `: ${err.message}` : ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-neutral-900 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Tambah Produk</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Nama Produk</label>
          <input type="text" className="w-full border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Kategori</label>
          <select className="w-full border rounded px-3 py-2" value={category} onChange={e => setCategory(e.target.value)} required>
            <option value="">Pilih Kategori</option>
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Stok</label>
          <input type="number" className="w-full border rounded px-3 py-2" value={stock} onChange={e => setStock(Number(e.target.value))} min={0} />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Harga</label>
          <input type="number" className="w-full border rounded px-3 py-2" value={price} onChange={e => setPrice(Number(e.target.value))} min={0} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Status</label>
          <select className="w-full border rounded px-3 py-2" value={status} onChange={e => setStatus(e.target.value)}>
            <option value="Tersedia">Tersedia</option>
            <option value="Stok Rendah">Stok Rendah</option>
            <option value="Habis">Habis</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Komposisi (Bahan Baku)</label>
          <div className="flex gap-2 mb-2">
            <select className="border rounded px-2 py-1" value={ingredientCode} onChange={e => setIngredientCode(e.target.value)}>
              <option value="">Pilih Bahan</option>
              {mockManagementStock.map(b => (
                <option key={b.codeBarang} value={b.codeBarang}>{b.namaBarang} ({b.satuan})</option>
              ))}
            </select>
            <input type="number" className="border rounded px-2 py-1 w-24" placeholder="Qty" value={ingredientQty} onChange={e => setIngredientQty(e.target.value)} min={0} />
            <button type="button" className="px-3 py-1 border border-black bg-white text-black rounded hover:bg-gray-100" onClick={handleAddIngredient}>Tambah</button>
          </div>
          <ul className="text-sm">
            {ingredients.map((i, idx) => (
              <li key={idx} className="mb-1 flex justify-between">
                <span>{i.namaBarang || i.codeBarang} ({i.qty} {i.satuan || ""})</span>
                <button type="button" className="text-red-500 text-xs" onClick={() => setIngredients(ingredients.filter((_, j) => j !== idx))}>Hapus</button>
              </li>
            ))}
          </ul>
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button type="submit" className="w-full py-2 border border-black bg-white text-black rounded hover:bg-gray-100" disabled={loading}>
          {loading ? "Menyimpan..." : "+ Tambah Produk"}
        </button>
      </form>
    </div>
  );
}
