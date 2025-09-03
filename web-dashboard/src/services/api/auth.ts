import { buildApiUrl, API_CONFIG } from "@/config/api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  code: number;
  data: {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
      role: {
        id: string;
        name: string;
        description: string;
      };
    };
  };
}

export interface ApiResponse<T> {
  ok: boolean;
  status: number;
  message: string;
  data?: T;
}

// Login API call to backend
export const loginApi = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.LOGIN), {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true"
    },
    body: JSON.stringify(credentials),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    console.error("Backend login error:", {
      status: response.status,
      statusText: response.statusText,
      data
    });
    throw new Error(data?.message || data?.backend?.message || `Login failed with status ${response.status}`);
  }

  return data;
};

// Logout API call to backend (if backend has logout endpoint)
export const logoutApi = async (token: string): Promise<void> => {
  try {
    await fetch(buildApiUrl("/logout"), {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        "token": token
      },
    });
  } catch (error) {
    // Logout can fail silently as we're clearing local state anyway
    console.warn("Backend logout failed:", error);
  }
};
