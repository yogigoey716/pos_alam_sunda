"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ChartDataItem {
  name: string;
  [key: string]: string | number | undefined;
}

interface BarChartsProps {
  data: ChartDataItem[];
  dataKey: string;
}

export default function BarCharts({ data, dataKey }: BarChartsProps) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey={dataKey} fill="#3b82f6" name={dataKey} />
      </BarChart>
    </ResponsiveContainer>
  );
}