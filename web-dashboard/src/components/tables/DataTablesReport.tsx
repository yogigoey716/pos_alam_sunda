import React from "react";

interface HeaderConfig {
  key: string;
  label: string;
}
interface DataTablesReportProps {
  data: Array<Record<string, React.ReactNode>>;
  headers: HeaderConfig[];
}

export default function DataTablesReport({ data, headers }: DataTablesReportProps) {
  return (
    <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
      <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
        <tr>
          {headers.map((header) => (
            <th key={header.key} className="px-6 py-3 text-left">{header.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="bg-white dark:bg-gray-800">
            {headers.map((header) => (
              <td key={header.key} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {row[header.key] ?? "-"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
