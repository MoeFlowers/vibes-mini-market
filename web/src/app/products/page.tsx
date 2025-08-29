'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProductsResponse, QueryParams } from '../../../../shared/types';
import { getTopCheapestAvailable } from '../../../../shared/utils';
import { fetchProducts } from '../../lib/api';
import ProductCard from '../../components/ProductCard';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [productsData, setProductsData] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<QueryParams>({
    search: searchParams.get('search') || '',
    sort: (searchParams.get('sort') as 'price' | 'name') || 'name',
    order: (searchParams.get('order') as 'asc' | 'desc') || 'asc',
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10,
    available: searchParams.get('available') === 'true' ? true : undefined
  });
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(filters);
        setProductsData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, [filters]);

  const updateFilters = (newFilters: Partial<QueryParams>) => {
    const updatedFilters = { ...filters, ...newFilters, page: 1 };
    setFilters(updatedFilters);
    
    // Update URL
    const params = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.set(key, String(value));
      }
    });
    router.push(`/products?${params.toString()}`);
  };
  
  if (loading && !productsData) {
    return <div className="loading">Loading...</div>;
  }
  
  if (error) {
    return <div className="error">{error}</div>;
  }
  
  return (
    <div className="products-page">
      <h1>Productos</h1>
      
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={filters.search || ''}
          onChange={(e) => updateFilters({ search: e.target.value })}
        />
        
        <select
          value={filters.sort}
          onChange={(e) => updateFilters({ sort: e.target.value as 'price' | 'name' })}
        >
          <option value="name">Nombre</option>
          <option value="price">Precio</option>
        </select>
        
        <select
          value={filters.order}
          onChange={(e) => updateFilters({ order: e.target.value as 'asc' | 'desc' })}
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        
        <label>
          <input
            type="checkbox"
            checked={filters.available === true}
            onChange={(e) => updateFilters({ available: e.target.checked ? true : undefined })}
          />
          Solo disponibles
        </label>
      </div>
      
      <div className="products-grid">
        {productsData?.products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {productsData && productsData.totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={filters.page === 1}
            onClick={() => updateFilters({ page: (filters.page || 1) - 1 })}
          >
            Anterior
          </button>
          
          <span>Página {filters.page} de {productsData.totalPages}</span>
          
          <button
            disabled={filters.page === productsData.totalPages}
            onClick={() => updateFilters({ page: (filters.page || 1) + 1 })}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}