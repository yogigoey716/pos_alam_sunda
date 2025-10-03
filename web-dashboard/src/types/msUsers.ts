import { Branch } from "./msBranches";
import { Role } from "./msRoles";

export interface User {
    id: string;
    username: string;
    email: string;
    role: Role;
    branch: Branch;
}

export interface RequestBodyUser{
    username: string;
    email: string;
    role_id: string;
    branches_id: string;
    password: string;
}

export interface UseUserParams {
    status: string;
    cate: string;
    search: string;
    page: number;
    size: number;
    startDate: string;
    endDate: string;
    onUnauthorized?: () => void;
  }

export interface UserResponse {
  total: number;
  pages: number;
  items: User[];
}