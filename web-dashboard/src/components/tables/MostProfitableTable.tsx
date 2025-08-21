import React from "react";

const mockData = [
  { name: "Sate Maranggi", profit: 11000, sold: 120 },
  { name: "Nasi Ayam Kremes", profit: 15196, sold: 90 },
  { name: "Teh", profit: 4579.8, sold: 200 },
  { name: "Jus Jeruk", profit: 6379.8, sold: 80 },
  { name: "Es Kopi Susu", profit: 11000, sold: 70 },
];

export default function MostProfitableTable() {
  return (
    <table className="min-w-full text-xs md:text-sm">
      <thead>
        <tr className="border-b">
          <th className="text-left py-1 px-2">Produk</th>
          <th className="text-right py-1 px-2">Laba</th>
          <th className="text-right py-1 px-2">Terjual</th>
        </tr>
      </thead>
      <tbody>
        {mockData.map((row) => (
          <tr key={row.name} className="border-b last:border-0">
            <td className="py-1 px-2">{row.name}</td>
            <td className="py-1 px-2 text-right font-mono">Rp {row.profit.toLocaleString("id-ID")}</td>
            <td className="py-1 px-2 text-right">{row.sold}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
