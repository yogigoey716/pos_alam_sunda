export interface Satuan {
    id: string;
    name: string;
    description: string;
}

export interface RequestBodySatuan{
    name: string;
    description: string;
}

export interface UseSatuanParams {
    status: string;
    cate: string;
    search: string;
    page: number;
    size: number;
    startDate: string;
    endDate: string;
    onUnauthorized?: () => void;
  }

export interface SatuanResponse {
  total: number;
  pages: number;
  items: Satuan[];
}