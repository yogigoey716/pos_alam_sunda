"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { msIngredientsService } from "@/services/api/msIngredients";
import withAuth from "@/utils/withAuth";
import { ingredientPurchasesService } from "@/services/api/ingredientPurchases";
import { msSuppliersService } from "@/services/api/msSuppliers";
import { Suppliers } from "@/types/suppliers";
import { Ingredients } from "@/types/ingredient";
import { Branch } from "@/types/msBranches";
import { msBranchesService } from "@/services/api/msBranches";

function AddIngredientPurchasesPage() {
  const router = useRouter();
  const [supplier_id, setSupplier_id] = useState("");
  const [ingredient_id, setIngredient_id] = useState("");
  const [branch_id, setBranch_id] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit_price, setUnit_price] = useState(0);
//   const [total_price, setTotal_price] = useState(0);
  const [supplier, setSupplier] = useState<Suppliers[]>([]);
  const [ingredient, setIngredient] = useState<Ingredients[]>([]);
  const [branch, setBranch] = useState<Branch[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(value);
  };

  const handleUnitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setUnit_price(value);
  };

  const total_price = quantity * unit_price;

  useEffect(() => {
    setLoading(true);
    msBranchesService
      .getAllProjection()
      .then((res) => {
        console.log("Branch dari API:", res);
        setBranch(res ?? []);
      })
      .catch((err) => {
        console.error("Gagal load branch:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    msIngredientsService
      .getAllProjection()
      .then((res) => {
        console.log("Satuan dari API:", res);
        setIngredient(res ?? []);
      })
      .catch((err) => {
        console.error("Gagal load ingredient:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    msSuppliersService
      .getAllProjection()
      .then((res) => {
        console.log("Satuan dari API:", res);
        setSupplier(res ?? []);
      })
      .catch((err) => {
        console.error("Gagal load supplier:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!supplier_id || !ingredient_id || !branch_id || !quantity || !unit_price) {
      setError("Nama, kategori, dan harga wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      await ingredientPurchasesService.create({
        supplier_id,
        ingredient_id,
        branch_id,
        quantity,
        unit_price,
        total_price,
      });
      router.push("/ingredient-purchases");
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
          <label className="block mb-1 font-medium">Supplier</label>
          <select className="px-3 py-2 w-full rounded border" value={supplier_id} onChange={e => setSupplier_id(e.target.value)} required>
            <option value="">{loading ? "Loading..." : "Pilih Supplier"}</option>
            {supplier.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Bahan Baku</label>
          <select className="px-3 py-2 w-full rounded border" value={ingredient_id} onChange={e => setIngredient_id(e.target.value)} required>
            <option value="">{loading ? "Loading..." : "Pilih Bahan Baku"}</option>
            {ingredient.map((ingredient) => (
              <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Branch</label>
          <select className="px-3 py-2 w-full rounded border" value={branch_id} onChange={e => setBranch_id(e.target.value)} required>
            <option value="">{loading ? "Loading..." : "Pilih Branch"}</option>
            {branch.map((branch) => (
              <option key={branch.id} value={branch.id}>{branch.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Quantity</label>
          <input type="number" className="px-3 py-2 w-full rounded border" value={quantity} onInput={handleQuantityChange} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Unit Price</label>
          <input type="number" className="px-3 py-2 w-full rounded border" value={unit_price} onInput={handleUnitPriceChange} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Total Price</label>
          <input type="number" className="px-3 py-2 w-full rounded border" value={total_price} readOnly required />
        </div>
        {error && <div className="mb-2 text-red-500">{error}</div>}
        <button type="submit" className="py-2 w-full text-black bg-white rounded border border-black hover:bg-gray-100" disabled={loading}>
          {loading ? "Menyimpan..." : "+ Tambah Produk"}
        </button>
      </form>
    </div>
  );
}

export default withAuth(AddIngredientPurchasesPage);