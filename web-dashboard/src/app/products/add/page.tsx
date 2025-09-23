"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { productService } from "@/services/api/products";
import withAuth from "@/utils/withAuth";
import { msKategoriService } from "@/services/api/msKategori";
import { Category } from "@/types/category";

function AddProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [barcode, setBarcode] = useState("");
  const [category_id, setCategory_id] = useState("");
  // const [stocks, setStocks] = useState("");
  const [price, setPrice] = useState("");
  const [status_barang, setStatus_barang] = useState("Tersedia");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [img, setImg] = useState<File | null>(null);

  useEffect(() => {
    setLoading(true);
    msKategoriService
      .getAllProjection()
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
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category_id", category_id);
    // formData.append("stocks", String(stocks));
    formData.append("price", String(price));
    formData.append("barcode", barcode);
    formData.append("status_barang", status_barang);
    if (img) formData.append("img", img);
    setError("");
    if (!name || !category_id || !price || !status_barang) {
      setError("Nama, kategori, dan harga wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      await productService.create(formData);
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
        {/* <div className="mb-3">
          <label className="block mb-1 font-medium">Stok</label>
          <input type="text" className="px-3 py-2 w-full rounded border" value={stocks} onChange={e => setStocks(e.target.value)} min={0} />
        </div> */}
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
        <div className="mb-3">
          <label className="block mb-1 font-medium">Gambar</label>
          <input
            type="file"
            className="px-3 py-2 w-full rounded border"
            onChange={(e) => setImg(e.target.files?.[0] || null)}
          />
        </div>
        {error && <div className="mb-2 text-red-500">{error}</div>}
        <button type="submit" className="py-2 w-full text-black bg-white rounded border border-black hover:bg-gray-100" disabled={loading}>
          {loading ? "Menyimpan..." : "+ Tambah Produk"}
        </button>
      </form>
    </div>
  );
}

export default withAuth(AddProductPage);