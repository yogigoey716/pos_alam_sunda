import { getToken } from "./auth";
import { BASE_URL } from "@/config/api";

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
      "token": token || "",
      ...options.headers,
    },
  });
  

  if (res.status === 401) {
    throw new Error("Unauthorized - token expired atau tidak valid");
  }

  return res.json();
};