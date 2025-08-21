import * as XLSX from "xlsx";
import { Product } from "@/types/product";

export const exportToExcel = (data: Product[], filename: string = "products") => {
  const exportData = data.map(product => ({
    "Nama Produk": product.name,
    "Kategori": product.category,
    "Stok": product.stock,
    "Harga": `Rp ${product.price.toLocaleString()}`,
    "Status": product.status,
  }));

  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data Produk");
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

export const formatPrice = (price: number): string => {
  return `Rp ${price.toLocaleString()}`;
};

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
