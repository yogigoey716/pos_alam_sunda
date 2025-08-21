"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Teh", sold: 200 },
  { name: "Sate Maranggi", sold: 120 },
  { name: "Nasi Ayam Kremes", sold: 90 },
  { name: "Jus Jeruk", sold: 80 },
  { name: "Es Kopi Susu", sold: 70 },
];

export default function BestSellingBarChart() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="sold" fill="#3b82f6" name="Terjual" />
      </BarChart>
    </ResponsiveContainer>
  );
}
