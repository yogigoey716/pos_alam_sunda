"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/utils/withAuth";
import { msUsersService } from "@/services/api/msUsers";
import { Branch } from "@/types/msBranches";
import { msBranchesService } from "@/services/api/msBranches";
import { msRolesService } from "@/services/api/msRoles";
import { Role } from "@/types/msRoles";

function AddUserPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role_id, setRoleId] = useState("");
  const [branches_id, setBranchesId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
        setLoading(true);
        msBranchesService
          .getAllProjection()
          .then((res) => {
            console.log("Branch dari API:", res);
            setBranches(res ?? []);
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
        msRolesService
          .getAllProjection()
          .then((res) => {
            console.log("Roles dari API:", res);
            setRoles(res ?? []);
          })
          .catch((err) => {
            console.error("Gagal load roles:", err);
          })
          .finally(() => {
            setLoading(false);
          });
      }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !email || !role_id || !branches_id || !password) {
      setError("Username wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      await msUsersService.create({
        username,
        email,
        role_id,
        branches_id,
        password,
      });
      router.push("/ms-users");
    } catch (err) {
      setError("Gagal menambah satuan." + (err instanceof Error ? `: ${err.message}` : ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mx-auto max-w-xl bg-white rounded shadow dark:bg-neutral-900">
      <h1 className="mb-4 text-2xl font-bold">Tambah User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Username</label>
          <input type="text" className="px-3 py-2 w-full rounded border" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Email</label>
          <input type="text" className="px-3 py-2 w-full rounded border" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Role</label>
          <select
            value={role_id}
            onChange={(e) => setRoleId(e.target.value)}
            className="px-3 py-2 w-full rounded border"
          >
            <option value="">Pilih Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Branch</label>
          <select
            value={branches_id}
            onChange={(e) => setBranchesId(e.target.value)}
            className="px-3 py-2 w-full rounded border"
          >
            <option value="">Pilih Cabang</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Password</label>
          <input type="text" className="px-3 py-2 w-full rounded border" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {error && <div className="mb-2 text-red-500">{error}</div>}
        <button type="submit" className="py-2 w-full text-black bg-white rounded border border-black hover:bg-gray-100" disabled={loading}>
          {loading ? "Menyimpan..." : "+ Tambah User"}
        </button>
      </form>
    </div>
  );
}

export default withAuth(AddUserPage);