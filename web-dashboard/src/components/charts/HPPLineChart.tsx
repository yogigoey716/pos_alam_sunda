"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "1", hpp: 12000, profit: 8000 },
  { name: "2", hpp: 13000, profit: 9000 },
  { name: "3", hpp: 14000, profit: 10000 },
  { name: "4", hpp: 13500, profit: 9500 },
  { name: "5", hpp: 15000, profit: 11000 },
  { name: "6", hpp: 14500, profit: 10500 },
];

export default function HPPLineChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(v: number) => `Rp ${v.toLocaleString("id-ID")}`} />
        <Line type="monotone" dataKey="hpp" stroke="#22c55e" strokeWidth={2} name="HPP" />
        <Line type="monotone" dataKey="profit" stroke="#f43f5e" strokeWidth={2} name="Laba" />
      </LineChart>
    </ResponsiveContainer>
  );
}
