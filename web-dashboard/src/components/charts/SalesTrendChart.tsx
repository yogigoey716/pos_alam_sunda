"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "1", sales: 1200000 },
  { name: "2", sales: 1300000 },
  { name: "3", sales: 1400000 },
  { name: "4", sales: 1350000 },
  { name: "5", sales: 1500000 },
  { name: "6", sales: 1450000 },
];

export default function SalesTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(v: number) => `Rp ${v.toLocaleString("id-ID")}`} />
        <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} name="Penjualan" />
      </LineChart>
    </ResponsiveContainer>
  );
}
