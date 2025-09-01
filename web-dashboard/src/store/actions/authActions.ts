import { createAsyncThunk } from '@reduxjs/toolkit';
import { setToken, clearToken } from '@/lib/auth';

export interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  ok: boolean;
  status: number;
  message: string;
  backend?: {
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
  };
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok || !data.ok) {
        return rejectWithValue(data.message || 'Login failed');
      }

      if (data.backend?.data?.token) {
        // Store token in localStorage
        setToken(data.backend.data.token);
        
        return {
          token: data.backend.data.token,
          user: data.backend.data.user,
        };
      }

      return rejectWithValue('No access token received');
    } catch {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    try {
      // Clear token from localStorage
      clearToken();
      
      // Call logout API to clear server-side cookies
      await fetch('/api/logout', { method: 'POST' });
      
      return true;
    } catch {
      // Even if API call fails, we still want to clear local state
      return true;
    }
  }
);

export const initializeAuth = createAsyncThunk(
  'auth/initializeAuth',
  async () => {
    const token = localStorage.getItem('JWT');
    
    if (token) {
      // Optional: Verify token with backend
      // For now, just assume it's valid if it exists
      return { token, user: null };
    }
    
    return null;
  }
);
