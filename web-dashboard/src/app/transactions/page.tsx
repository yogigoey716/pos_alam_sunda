"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import DataTablesReport from "@/components/tables/DataTablesReport";
import WithAuth from "@/utils/withAuth";
import Selects from "@/components/ui/selects";
import useTransactions from "@/hooks/useTransactions";
import { optionsStatus, optionsIsPaid } from "@/constants/transactionsOptions";
import Input from "@/components/ui/input";
import { useExportExcel } from "@/services/utils/formatters";


function TransactionsPage() {
  const router = useRouter();
  const { exportToExcel } = useExportExcel();

  const [status, setStatus] = useState("");
  const [isPaid, setIsPaid] = useState("");
  const [search] = useState("");
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const handleExport = () => {
    exportToExcel(transactions, "transactions", "Transactions");
  };

  const onUnauthorized = useCallback(() => {
    router.push("/login");
  }, [router]);

  const { transactions, total, pages, isLoading, error } = useTransactions({
    status,
    isPaid,
    search,
    page,
    size,
    startDate,
    endDate,
    onUnauthorized,
  });

  return (
    <div>
      <h1 className="text-xl font-semibold">Daftar Transaksi</h1>
      <button onClick={toggleCollapse} className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 my-6 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
        {isOpen ? 'Hide Filter' : 'Show Filter'}
      </button>
      {isOpen && (
        <div className="flex flex-wrap justify-between items-center pb-4">
          <div className="flex gap-2 items-center">
            <Selects
              id="status_filter"
              name="status_filter"
              label="Status"
              options={optionsStatus}
              value={status}
              onChange={setStatus}
            />
            <Selects
              id="is_paid"
              name="is_paid"
              label="Is Paid"
              options={optionsIsPaid}
              value={isPaid}
              onChange={setIsPaid}
            />
            <Input
              type="date"
              id="start_date"
              name="start_date"
              label="Start Date"
              value={startDate}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                      focus:ring-blue-500 focus:border-blue-500 block max-w-96 w-64 px-2.5 py-2
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setStartDate(e.target.value);
                setPage(1);
              }}
            />
            <Input
              type="date"
              id="end_date"
              name="end_date"
              label="End Date"
              value={endDate}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                      focus:ring-blue-500 focus:border-blue-500 block max-w-96 w-64 px-2.5 py-2
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setEndDate(e.target.value);
                setPage(1);
              }}
            />
            <button
              onClick={handleExport}
              type="button"
              className="px-3 py-2 mt-7 text-sm font-medium text-green-700 rounded-lg border border-green-700 hover:text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
            >
              Export
            </button>
            {/* <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pointer-events-none ps-3">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 ps-10 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div> */}
          </div>
        </div>
      )}
      <hr />

      {/* Table */}
      {error ? (
        <p className="text-red-500">Gagal memuat data transaksi</p>
      ) : (
        <DataTablesReport
          data={transactions}
          headers={[
            { label: "No Order", key: "order_number" },
            { label: "Tanggal Transaksi", key: "transaction_date" },
            { label: "Total Bayar", key: "total_amount" },
            { label: "Bayar", key: "amount_paid" },
            { label: "Status", key: "status" },
            { label: "Metode Bayar", key: "payment_methods" },
            { label: "Kasir", key: "created_by" },
            { label: "Cabang", key: "branch" },
          ]}
          page={page}
          setPage={setPage}
          pages={pages}
          total={total}
          loading={isLoading}
        />
      )}
    </div>
  );
}

export default WithAuth(TransactionsPage);
