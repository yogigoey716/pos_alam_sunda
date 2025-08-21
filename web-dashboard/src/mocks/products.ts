import { Product } from "@/types/product";

export const mockProducts: Product[] = [
  { id: "p1", name: "Sate Maranggi", category: "makanan", stock: 20, price: 25000, status: "Tersedia", margin: 44.0, hpp: 14000, trend: 8, laba: 11000 },
  { id: "p2", name: "Nasi Ayam Kremes", category: "makanan", stock: 12, price: 22000, status: "Tersedia", margin: 69.1, hpp: 6804, trend: -3, laba: 15196 },
  { id: "p3", name: "Teh", category: "minuman", stock: 50, price: 5000, status: "Tersedia", margin: 91.6, hpp: 420.2, trend: 2, laba: 4579.8 },
  { id: "p4", name: "Jus Jeruk", category: "minuman", stock: 30, price: 8000, status: "Tersedia", margin: 79.7, hpp: 1620.2, trend: 0, laba: 6379.8 },
  { id: "p5", name: "Es Kopi Susu", category: "minuman", stock: 18, price: 18000, status: "Tersedia", margin: 61.1, hpp: 7000, trend: 5, laba: 11000 },
  { id: "p6", name: "Mie Goreng", category: "makanan", stock: 8, price: 15000, status: "Stok Rendah", margin: 60.0, hpp: 6000, trend: -1, laba: 9000 },
  { id: "p7", name: "Soto Ayam", category: "makanan", stock: 15, price: 17000, status: "Tersedia", margin: 52.9, hpp: 8000, trend: 4, laba: 9000 },
  { id: "p8", name: "Lemon Tea", category: "minuman", stock: 40, price: 7000, status: "Tersedia", margin: 82.9, hpp: 1200, trend: 3, laba: 5800 },
  { id: "p9", name: "Nasi Goreng", category: "makanan", stock: 25, price: 16000, status: "Tersedia", margin: 56.3, hpp: 7000, trend: 2, laba: 9000 },
  { id: "p10", name: "Ayam Bakar", category: "makanan", stock: 6, price: 20000, status: "Stok Rendah", margin: 55.0, hpp: 9000, trend: -2, laba: 11000 },
];

export default mockProducts;
