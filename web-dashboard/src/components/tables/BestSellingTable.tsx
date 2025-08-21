import React from "react";

const mockData = [
  { name: "Teh", sold: 200, profit: 4579.8 },
  { name: "Sate Maranggi", sold: 120, profit: 11000 },
  { name: "Nasi Ayam Kremes", sold: 90, profit: 15196 },
  { name: "Jus Jeruk", sold: 80, profit: 6379.8 },
  { name: "Es Kopi Susu", sold: 70, profit: 11000 },
];

export default function BestSellingTable() {
  return (
    <table className="min-w-full text-xs md:text-sm">
      <thead>
        <tr className="border-b">
          <th className="text-left py-1 px-2">Produk</th>
          <th className="text-right py-1 px-2">Terjual</th>
          <th className="text-right py-1 px-2">Laba</th>
        </tr>
      </thead>
      <tbody>
        {mockData.map((row) => (
          <tr key={row.name} className="border-b last:border-0">
            <td className="py-1 px-2">{row.name}</td>
            <td className="py-1 px-2 text-right">{row.sold}</td>
            <td className="py-1 px-2 text-right font-mono">Rp {row.profit.toLocaleString("id-ID")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
