export interface Branch {
    id: string;
    name: string;
    description: string;
}

export interface RequestBodyBranch{
    name: string;
    description: string;
}

export interface UseBranchParams {
    status: string;
    cate: string;
    search: string;
    page: number;
    size: number;
    startDate: string;
    endDate: string;
    onUnauthorized?: () => void;
  }

export interface BranchResponse {
  total: number;
  pages: number;
  items: Branch[];
}