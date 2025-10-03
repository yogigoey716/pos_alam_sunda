"use client";
import { ChartDataItem } from "@/types/chartsCustom";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface BarChartsProps {
  data: ChartDataItem[];
}

export const BarCharts: React.FC<BarChartsProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#3b82f6" name="value" />
      </BarChart>
    </ResponsiveContainer>
  );
}