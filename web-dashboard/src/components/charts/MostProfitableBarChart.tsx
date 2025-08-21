"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Sate Maranggi", profit: 11000 },
  { name: "Nasi Ayam Kremes", profit: 15196 },
  { name: "Teh", profit: 4579.8 },
  { name: "Jus Jeruk", profit: 6379.8 },
  { name: "Es Kopi Susu", profit: 11000 },
];

export default function MostProfitableBarChart() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(v: number) => `Rp ${v.toLocaleString("id-ID")}`} />
        <Bar dataKey="profit" fill="#f43f5e" name="Laba" />
      </BarChart>
    </ResponsiveContainer>
  );
}
