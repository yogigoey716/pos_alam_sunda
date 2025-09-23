"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/utils/withAuth";
import { msSuppliersService } from "@/services/api/msSuppliers";

function AddSupplierPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [contact_person, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !contact_person || !phone || !email) {
      setError("Nama, contact person, phone, dan email wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      await msSuppliersService.create({
        name,
        contact_person,
        phone,
        email,
      });
      router.push("/suppliers");
    } catch (err) {
      setError("Gagal menambah supplier." + (err instanceof Error ? `: ${err.message}` : ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mx-auto max-w-xl bg-white rounded shadow dark:bg-neutral-900">
      <h1 className="mb-4 text-2xl font-bold">Tambah Supplier</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Nama Supplier</label>
          <input type="text" className="px-3 py-2 w-full rounded border" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Contact Person</label>
          <input type="text" className="px-3 py-2 w-full rounded border" value={contact_person} onChange={e => setContactPerson(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Phone</label>
          <input type="text" className="px-3 py-2 w-full rounded border" value={phone} onChange={e => setPhone(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Email</label>
          <input type="text" className="px-3 py-2 w-full rounded border" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        {error && <div className="mb-2 text-red-500">{error}</div>}
        <button type="submit" className="py-2 w-full text-black bg-white rounded border border-black hover:bg-gray-100" disabled={loading}>
          {loading ? "Menyimpan..." : "+ Tambah Supplier"}
        </button>
      </form>
    </div>
  );
}

export default withAuth(AddSupplierPage);