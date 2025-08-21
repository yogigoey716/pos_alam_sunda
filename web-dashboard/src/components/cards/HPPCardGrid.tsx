"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import useMockProducts from "@/hooks/useMockProducts";

const PAGE_SIZE = 8;
const sortOptions = [
  { label: "Margin Tertinggi", value: "margin" },
  { label: "Laba Tertinggi", value: "laba" },
  { label: "HPP Terendah", value: "hpp" },
  { label: "Harga Jual Tertinggi", value: "price" },
];

export default function HPPCardGrid() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("margin");
  const { products } = useMockProducts();

  // Map products to the UI fields used by this component
  const mapped = products.map(p => ({
    name: p.name,
    hargaJual: p.price,
    hpp: p.hpp ?? 0,
    laba: p.laba ?? (p.price - (p.hpp ?? 0)),
    margin: p.margin ?? (p.price ? ((p.price - (p.hpp ?? 0)) / p.price) * 100 : 0),
    trend: p.trend ?? 0,
  }));

  const dataSource = mapped;

  const sorted = [...dataSource].sort((a, b) => {
    const av = a[sortBy as keyof typeof a];
    const bv = b[sortBy as keyof typeof b];
    return Number(bv) - Number(av);
  });
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-500">Urutkan:</span>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={sortBy}
            onChange={e => { setSortBy(e.target.value); setPage(1); }}
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <button
            className="px-2 py-1 text-sm border rounded disabled:opacity-50"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="text-xs text-gray-500">{page} / {totalPages}</span>
          <button
            className="px-2 py-1 text-sm border rounded disabled:opacity-50"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {paged.map((row) => (
          <Card key={row.name} className="p-4 flex flex-col gap-2 items-center border-2 shadow-lg relative">
            <div className="font-semibold text-base mb-1 flex items-center gap-2">
              {row.name}
              {row.trend > 0 && <span className="text-green-600 flex items-center text-xs font-bold"><ArrowUpRight className="w-4 h-4 mr-0.5" />+{row.trend}%</span>}
              {row.trend < 0 && <span className="text-red-600 flex items-center text-xs font-bold"><ArrowDownRight className="w-4 h-4 mr-0.5" />{row.trend}%</span>}
              {row.trend === 0 && <span className="text-gray-400 text-xs">0%</span>}
            </div>
            <div className="flex flex-col w-full gap-1">
              <div className="flex justify-between text-xs">
                <span>Harga Jual</span>
                <span className="font-mono">Rp {row.hargaJual.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>HPP</span>
                <span className="font-mono">Rp {row.hpp.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Laba</span>
                <span className="font-mono">Rp {row.laba.toLocaleString('id-ID', {maximumFractionDigits: 1})}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Margin</span>
                <span className="font-mono">{row.margin.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-neutral-800 rounded h-2 mt-1">
                <div
                  className={`${row.margin > 80 ? "bg-green-500" : row.margin > 60 ? "bg-yellow-400" : "bg-red-500"} h-full rounded transition-all duration-300`}
                  style={{ width: `${Math.max(0, Math.min(row.margin, 100))}%` }}
                />
              </div>
            </div>
            <div className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-neutral-800 border text-gray-500">
              {row.margin > 80 ? "Sangat Baik" : row.margin > 60 ? "Baik" : row.margin > 40 ? "Cukup" : "Rendah"}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
