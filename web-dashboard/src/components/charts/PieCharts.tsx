"use client";
import React from "react";
import { PieChart, ResponsiveContainer, Tooltip, Pie, Cell } from "recharts";
import { ChartDataItem } from "@/types/chartsCustom";

interface PieChartsProps {
  data: ChartDataItem[];
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export const PieCharts: React.FC<PieChartsProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Tooltip />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}