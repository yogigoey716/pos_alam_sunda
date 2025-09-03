import * as XLSX from "xlsx";

export function useExportExcel<T extends object>() {
  const exportToExcel = (data: T[], fileName: string, sheetName = "Sheet1") => {
    if (!data || data.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return { exportToExcel };
}


export const formatCurrency = (value?: number) => {
  if (!value) return "Rp. 0";
  return "Rp. " + Number(value).toLocaleString("id-ID");
};

export const formatPrice = formatCurrency;

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Tersedia':
      return 'text-green-600';
    case 'Stok Rendah':
      return 'text-yellow-600';
    case 'Habis':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};
