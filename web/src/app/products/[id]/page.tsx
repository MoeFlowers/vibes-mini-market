'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Product } from '../../../../../shared/types';
import { fetchProduct } from '../../../lib/api';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const productData = await fetchProduct(productId);
        setProduct(productData);
        setError(null);
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    if (productId) {
      loadProduct();
    }
  }, [productId]);
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (error || !product) {
    return <div className="error">{error || 'Product not found'}</div>;
  }
  
  return (
    <div className="product-detail">
      <div className="product-image">
        <img 
          src={product.image} 
          alt={product.name}
          width={400}
          height={400}
        />
      </div>
      
      <div className="product-info">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-price">${product.price.toFixed(2)}</p>
        
        <span className={`availability ${product.isAvailable ? 'in-stock' : 'out-of-stock'}`}>
          {product.isAvailable ? 'En stock' : 'Sin stock'}
        </span>
        
        <p className="product-category">Categoría: {product.category}</p>
        
        <button 
          className="favorite-btn"
          disabled={!product.isAvailable}
        >
          Agregar a favoritos
        </button>
      </div>
    </div>
  );
}