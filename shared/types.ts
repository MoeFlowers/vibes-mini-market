export interface Product {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  category: string;
  image: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface QueryParams {
  search?: string;
  sort?: 'price' | 'name';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  available?: boolean;
}