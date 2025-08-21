import React from "react";

interface ProfitCardProps {
  price: number;
  hpp: number;
  profit: number;
  margin: number;
}

export default function ProfitCard({ price, hpp, profit, margin }: ProfitCardProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between text-sm">
        <span>Harga Jual</span>
        <span className="font-mono">Rp {price.toLocaleString("id-ID")}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>HPP</span>
        <span className="font-mono">Rp {hpp.toLocaleString("id-ID")}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Laba Kotor</span>
        <span className="font-mono">Rp {profit.toLocaleString("id-ID")}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Margin</span>
        <span className="font-mono">{margin.toFixed(1)}%</span>
      </div>
    </div>
  );
}
