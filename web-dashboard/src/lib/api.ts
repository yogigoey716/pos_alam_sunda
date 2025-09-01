import { getToken } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL; 
// contoh: http://127.0.0.1:8200

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
      "token": token || "",   // sesuai requirement user (bukan Bearer)
      ...options.headers,
    },
  });
  

  if (res.status === 401) {
    throw new Error("Unauthorized - token expired atau tidak valid");
  }

  return res.json();
};
