import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, logoutUser, initializeAuth } from '../actions/authActions';

export interface User {
  id: string;
  username: string;
  email: string;
  role: {
    id: string;
    name: string;
    description: string;
  };
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        console.log("Redux: loginUser.pending");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Redux: loginUser.fulfilled", action.payload);
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user || null;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("Redux: loginUser.rejected", action.payload);
        state.isLoading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.error = action.payload as string;
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      // Initialize auth cases
      .addCase(initializeAuth.pending, (state) => {
        console.log("Redux: initializeAuth.pending");
        state.isLoading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        console.log("Redux: initializeAuth.fulfilled", action.payload);
        state.isLoading = false;
        if (action.payload) {
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
        } else {
          state.isAuthenticated = false;
        }
      })
      .addCase(initializeAuth.rejected, (state) => {
        console.log("Redux: initializeAuth.rejected");
        state.isLoading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { setLoading, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
