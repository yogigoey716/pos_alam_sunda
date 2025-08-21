import React from "react";

interface ScorecardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  subtitle?: string;
}

export default function Scorecard({ title, value, icon, subtitle }: ScorecardProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-4 flex flex-col gap-2 border">
      <div className="flex items-center gap-2">
        {icon && <span className="text-2xl">{icon}</span>}
        <span className="text-lg font-semibold">{title}</span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
    </div>
  );
}
