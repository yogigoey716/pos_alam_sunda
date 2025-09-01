import React from "react";
import "simple-datatables";

interface HeaderConfig {
  key: string;
  label: string;
}
interface DataTablesReportProps {
  data: Array<Record<string, string | number | React.ReactNode>>;
  headers: HeaderConfig[];
  page?: number;
  setPage?: (page: number) => void;
  pages?: number;
  total?: number;
  loading?: boolean;
}

export default function DataTablesReport({ data, headers, page, setPage, pages, total, loading }: DataTablesReportProps) {
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
            <table id="default-table" className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
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
          {page && setPage && (
            <nav className="flex flex-wrap justify-between items-center pt-4 flex-column md:flex-row" aria-label="Table navigation">
                <span className="block mb-4 w-full text-sm font-normal text-gray-500 dark:text-gray-400 md:mb-0 md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-{data.length}</span> of <span className="font-semibold text-gray-900 dark:text-white">{total}</span></span>
                <ul className="inline-flex -space-x-px h-8 text-sm rtl:space-x-reverse">
                    <li>
                        <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="flex justify-center items-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 ms-0 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
                    </li>
                    <li>
                        <button className="flex justify-center items-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{page}</button>
                    </li>
                    <li>
                        <button disabled={!pages || page >= pages} onClick={() => setPage(page + 1)} className="flex justify-center items-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
                    </li>
                </ul>
            </nav>
          )}
        </div>
      )}
    </>
  );
}
