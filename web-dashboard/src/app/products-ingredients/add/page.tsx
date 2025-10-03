"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/utils/withAuth";
import { productIngredientsApi } from "@/services/api/productIngredients";
import { Ingredients } from "@/types/ingredient";
import { msIngredientsService } from "@/services/api/msIngredients";
import { ProductProjections } from "@/types/product";
import { productService } from "@/services/api/products";

function AddProductIngredientPage() {
  const router = useRouter();
  const [qty, setQty] = useState("");
  const [ingredientId, setingredientId] = useState("");
  const [productId, setProductId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);
  const [products, setProducts] = useState<ProductProjections[]>([]);

  useEffect(() => {
    setLoading(true);
    msIngredientsService
      .getAllProjection()
      .then((res) => {
        console.log("Ingredients dari API:", res);
        setIngredients(res ?? [])
      })
      .catch((err) => {
        console.error("Gagal load ingredients:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  useEffect(() => {
    setLoading(true);
    productService
      .getProjection()
      .then((res) => {
        console.log("Ingredients dari API:", res);
        setProducts(res ?? [])
      })
      .catch((err) => {
        console.error("Gagal load ingredients:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("qty", qty);
    formData.append("ingredient_id", ingredientId);
    formData.append("product_id", productId);
    setError("");
    // if (!name || !category_id || !stocks || !price || !status_barang) {
    //   setError("Nama, kategori, dan harga wajib diisi.");
    //   return;
    // }
    setLoading(true);
    try {
      await productIngredientsApi.create(formData);
      router.push("/products-ingredients");
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
          <label className="block mb-1 font-medium">Quantity</label>
          <input type="text" className="px-3 py-2 w-full rounded border" value={qty} onChange={e => setQty(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Bahan</label>
          <select className="px-3 py-2 w-full rounded border" value={ingredientId} onChange={e => setingredientId(e.target.value)} required>
            <option value="">{loading ? "Loading..." : "Pilih Bahan"}</option>
            {ingredients.map((ing) => (
              <option key={ing.id} value={ing.id}>{ing.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Product</label>
          <select className="px-3 py-2 w-full rounded border" value={productId} onChange={e => setProductId(e.target.value)} required>
            <option value="">{loading ? "Loading..." : "Pilih Product"}</option>
            {products.map((prd) => (
              <option key={prd.id} value={prd.id}>{prd.name}</option>
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

export default withAuth(AddProductIngredientPage);