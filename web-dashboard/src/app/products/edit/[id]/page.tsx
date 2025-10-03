"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/utils/withAuth";
import { useParams } from "next/navigation";
import { productService } from "@/services/api/products";
import { Category } from "@/types/category";
import { msKategoriService } from "@/services/api/msKategori";

function EditProductPage() {
  const router = useRouter();   
  const params = useParams(); // ambil id dari URL
  const id = params?.id as string;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [barcode, setBarcode] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [price, setPrice] = useState(0);
  const [status_barang, setStatus_barang] = useState("Tersedia");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imgFile, setImgFile] = useState<File | null>(null); // untuk file baru dari input
  const [imgUrl, setImgUrl] = useState<string>("");


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

  useEffect(() => {
    setLoading(true);
    productService
      .getById(id)
      .then((res) => {
        console.log("Produk dari API:", res);
        setName(res?.name || "");
        setDescription(res?.description || "");
        setCategory_id(res?.category?.id || "");
        setPrice(res?.price || 0);
        setStatus_barang(res?.status_barang || "");
        setBarcode(res?.barcode || "");
        if (res?.img || res?.img === null) setImgUrl(res?.img);
      })
      .catch((err) => {
        console.error("Gagal load produk:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category_id", category_id);
    formData.append("price", String(price));
    formData.append("barcode", barcode);
    formData.append("status_barang", status_barang);
    if (imgFile) formData.append("img", imgFile);
    // if (imgUrl) formData.append("img", imgUrl);
    setError("");
    if (!name || !category_id || !price || !status_barang) {
      setError("Nama, kategori, dan harga wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      await productService.update(id, formData);
      // router.push("/products");
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
          <label className="block mb-1 font-medium">Nama</label>
          <input type="text" className="px-3 py-2 w-full rounded border" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Deskripsi</label>
          <input type="text" className="px-3 py-2 w-full rounded border" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Barcode</label>
          <input type="text" className="px-3 py-2 w-full rounded border" value={barcode} onChange={(e) => setBarcode(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Kategori</label>
          <select className="px-3 py-2 w-full rounded border" value={category_id} onChange={(e) => setCategory_id(e.target.value)} required>
            <option value="">Pilih Kategori</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Harga</label>
          <input type="number" className="px-3 py-2 w-full rounded border" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Status</label>
          <select className="px-3 py-2 w-full rounded border" value={status_barang} onChange={(e) => setStatus_barang(e.target.value)} required>
            <option value="">Pilih Status</option>
            <option value="Tersedia">Tersedia</option>
            <option value="Stok Rendah">Stok Rendah</option>
            <option value="Habis">Habis</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Gambar</label>
          <input
            type="file"
            className="px-3 py-2 w-full rounded border"
            onChange={(e) => setImgFile(e.target.files?.[0] || null)}
          />
          {imgFile && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">File yang dipilih: {imgFile.name}</p>
            </div>
          )}
          {imgUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">URL Gambar: {imgUrl}</p>
            </div>
          )}
        </div>
        {error && <div className="mb-2 text-red-500">{error}</div>}
        <button type="submit" className="py-2 w-full text-black bg-white rounded border border-black hover:bg-gray-100" disabled={loading}>
          {loading ? "Menyimpan..." : "+ Tambah Produk"}
        </button>
      </form>
    </div>
  );
}

export default withAuth(EditProductPage);