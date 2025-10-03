import { getToken } from "./auth";
import { BASE_URL } from "@/config/api";

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "ngrok-skip-browser-warning": "true",
        "token": token || "",
        ...options.headers,
      },
    });
    

    if (res.status === 401) {
      throw new Error("Unauthorized - token expired atau tidak valid");
    }

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error(`API fetch error for ${endpoint}:`, error);
    throw error;
  }
};