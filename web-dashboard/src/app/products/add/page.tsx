"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { mockManagementStock } from "@/services/api/managementStock";
import { productService } from "@/services/api/products";
import { ProductIngredient } from "@/types/product";
import withAuth from "@/utils/withAuth";
import { msKategoriService } from "@/services/api/msKategori";
import { Category } from "@/types/category";

function AddProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [barcode, setBarcode] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [stocks, setStocks] = useState("");
  const [price, setPrice] = useState("");
  const [status_barang, setStatus_barang] = useState("Tersedia");
  const [ingredients, setIngredients] = useState<ProductIngredient[]>([]);
  const [ingredientCode, setIngredientCode] = useState("");
  const [ingredientQty, setIngredientQty] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  // const handleAddIngredient = () => {
  //   if (!ingredientCode || !ingredientQty) return;
  //   const bahan = mockManagementStock.find(b => b.codeBarang === ingredientCode);
  //   setIngredients(prev => {
  //     const idx = prev.findIndex(i => i.codeBarang === ingredientCode);
  //     if (idx !== -1) {
  //       // Jika sudah ada, update qty
  //       const updated = [...prev];
  //       updated[idx] = {
  //         ...updated[idx],
  //         qty: updated[idx].qty + parseFloat(ingredientQty),
  //       };
  //       return updated;
  //     }
  //     // Jika belum ada, tambah baru
  //     return [
  //       ...prev,
  //       {
  //         codeBarang: ingredientCode,
  //         qty: parseFloat(ingredientQty),
  //         namaBarang: bahan?.namaBarang,
  //         satuan: bahan?.satuan,
  //       },
  //     ];
  //   });
  //   setIngredientCode("");
  //   setIngredientQty("");
  // };

  useEffect(() => {
    setLoading(true);
    msKategoriService
      .getAll()
      .then((res) => {
        console.log("Kategori dari API:", res);
        setCategories(res ?? []);
      })
      .catch((err) => {
        console.error("Gagal load kategori:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !category_id || !stocks || !price || !status_barang) {
      setError("Nama, kategori, dan harga wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      await productService.create({
        name,
        description,
        category_id,
        stocks,
        barcode,
        price: Number(price),
        status_barang,
      });
      router.push("/products");
    } catch (err) {
      setError("Gagal menambah produk." + (err instanceof Error ? `: ${err.message}` : ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mx-auto max-w-xl bg-white rounded shadow dark:bg-neutral-900">
      <h1 className="mb-4 text-2xl font-bold">Tambah Produk</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Nama Produk</label>
          <input type="text" className="px-3 py-2 w-full rounded border" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Description Produk</label>
          <input type="text" className="px-3 py-2 w-full rounded border" value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Kategori</label>
          <select className="px-3 py-2 w-full rounded border" value={category_id} onChange={e => setCategory_id(e.target.value)} required>
            <option value="">{loading ? "Loading..." : "Pilih Kategori"}</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Stok</label>
          <input type="text" className="px-3 py-2 w-full rounded border" value={stocks} onChange={e => setStocks(e.target.value)} min={0} />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Harga</label>
          <input type="text" className="px-3 py-2 w-full rounded border" value={price} onChange={e => setPrice(e.target.value)} min={0} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Status</label>
          <select className="px-3 py-2 w-full rounded border" value={status_barang} onChange={e => setStatus_barang(e.target.value)}>
            <option value="Tersedia">Tersedia</option>
            <option value="Stok Rendah">Stok Rendah</option>
            <option value="Habis">Habis</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Barcode</label>
          <input type="text" className="px-3 py-2 w-full rounded border" value={barcode} onChange={e => setBarcode(e.target.value)} required />
        </div>
        {/* <div className="mb-3">
          <label className="block mb-1 font-medium">Komposisi (Bahan Baku)</label>
          <div className="flex gap-2 mb-2">
            <select className="px-2 py-1 rounded border" value={ingredientCode} onChange={e => setIngredientCode(e.target.value)}>
              <option value="">Pilih Bahan</option>
              {mockManagementStock.map(b => (
                <option key={b.codeBarang} value={b.codeBarang}>{b.namaBarang} ({b.satuan})</option>
              ))}
            </select>
            <input type="number" className="px-2 py-1 w-24 rounded border" placeholder="Qty" value={ingredientQty} onChange={e => setIngredientQty(e.target.value)} min={0} />
            <button type="button" className="px-3 py-1 text-black bg-white rounded border border-black hover:bg-gray-100" onClick={handleAddIngredient}>Tambah</button>
          </div>
          <ul className="text-sm">
            {ingredients.map((i, idx) => (
              <li key={idx} className="flex justify-between mb-1">
                <span>{i.namaBarang || i.codeBarang} ({i.qty} {i.satuan || ""})</span>
                <button type="button" className="text-xs text-red-500" onClick={() => setIngredients(ingredients.filter((_, j) => j !== idx))}>Hapus</button>
              </li>
            ))}
          </ul>
        </div> */}
        {error && <div className="mb-2 text-red-500">{error}</div>}
        <button type="submit" className="py-2 w-full text-black bg-white rounded border border-black hover:bg-gray-100" disabled={loading}>
          {loading ? "Menyimpan..." : "+ Tambah Produk"}
        </button>
      </form>
    </div>
  );
}

export default withAuth(AddProductPage);