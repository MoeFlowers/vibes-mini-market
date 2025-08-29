import Link from 'next/link';
import { Product } from '../../../shared/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <Link href={`/products/${product.id}`}>
        <div className="product-image">
          <img 
            src={product.image} 
            alt={product.name}
            width={200}
            height={200}
          />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <span className={`availability-badge ${product.isAvailable ? 'in-stock' : 'out-of-stock'}`}>
            {product.isAvailable ? 'En stock' : 'Sin stock'}
          </span>
        </div>
      </Link>
    </div>
  );
}