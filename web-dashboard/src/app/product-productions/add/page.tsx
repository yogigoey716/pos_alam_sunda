"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/utils/withAuth";
import { ProductProjections } from "@/types/product";
import { productService } from "@/services/api/products";
import { productProductionsApi } from "@/services/api/productProductions";

function AddProductProductionsPage() {
  const router = useRouter();
  const [product_id, setProduct_id] = useState("");
  const [quantity_produced, setQuantity_produced] = useState("");
  const [production_date, setProduction_date] = useState("");
  const [note, setNote] = useState("");
  const [product, setProduct] = useState<ProductProjections[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    productService
      .getProjection()
      .then((res) => {
        console.log("Product dari API:", res);
        setProduct(res );
      })
      .catch((err) => {
        console.error("Gagal load product:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!product_id || !quantity_produced || !production_date || !note) {
      setError("Nama, kategori, dan harga wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      await productProductionsApi.create({
        product_id,
        quantity_produced,
        production_date,
        note,
      });
      router.push("/product-productions");
    } catch (err) {
      setError("Gagal menambah produk." + (err instanceof Error ? `: ${err.message}` : ""));
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="p-6 mx-auto max-w-xl bg-white rounded shadow dark:bg-neutral-900">
      <h1 className="mb-4 text-2xl font-bold">Tambah Produksi</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Produk</label>
          <select className="px-3 py-2 w-full rounded border" value={product_id} onChange={e => setProduct_id(e.target.value)} required>
            <option value="">{loading ? "Loading..." : "Pilih Produk"}</option>
            {product.map((product) => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Quantity</label>
          <input type="number" className="px-3 py-2 w-full rounded border" value={quantity_produced} onChange={e => setQuantity_produced(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Production Date</label>
          <input type="date" className="px-3 py-2 w-full rounded border" value={production_date} onChange={e => setProduction_date(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Note</label>
          <input type="text" className="px-3 py-2 w-full rounded border" value={note} onChange={e => setNote(e.target.value)} required />
        </div>
        {error && <div className="mb-2 text-red-500">{error}</div>}
        <button type="submit" className="py-2 w-full text-black bg-white rounded border border-black hover:bg-gray-100" disabled={loading}>
          {loading ? "Menyimpan..." : "+ Tambah Produk"}
        </button>
      </form>
    </div>
  );
}

export default withAuth(AddProductProductionsPage);