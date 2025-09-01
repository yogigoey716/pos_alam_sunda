import { getToken } from "./auth";
import { API_CONFIG } from "@/config/api";

const BASE_URL = API_CONFIG.BASE_URL;

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
