import { Product, ProductsResponse, QueryParams } from '../../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

export const fetchProducts = async (params?: QueryParams): Promise<ProductsResponse> => {
  const queryString = params ? new URLSearchParams(
    Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== '')
      .map(([key, value]) => [key, String(value)])
  ).toString() : '';
  
  const url = `${API_BASE}/api/products?${queryString}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Failed to fetch products. Check if API server is running.');
  }
};