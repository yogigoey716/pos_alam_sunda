import { apiFetch } from "@/lib/api";

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

// Get current user profile
export const getUserProfile = async (): Promise<User> => {
  const response = await apiFetch('/user/profile');
  return response.data;
};

// Update user profile
export const updateUserProfile = async (userData: Partial<User>): Promise<User> => {
  const response = await apiFetch('/user/profile', {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
  return response.data;
};

// Get all users (admin only)
export const getUsers = async (): Promise<User[]> => {
  const response = await apiFetch('/users');
  return response.data;
};
