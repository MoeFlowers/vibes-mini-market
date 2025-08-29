import Link from 'next/link';
import { Product } from '../../../shared/types';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <Link href={`/products/${product.id}`} className="block">
        {/* Imagen del producto */}
        <div className="w-full h-48 bg-gray-200 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            width={200}
            height={200}
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>

          <p className="text-xl font-bold text-blue-600 mb-3">
            ${product.price.toFixed(2)}
          </p>

          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${product.isAvailable
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-red-800'
            }`}>
            {product.isAvailable ? 'En stock' : 'Sin stock'}
          </span>

          <p className="text-sm text-gray-500 mt-2">
            {product.category}
          </p>
        </div>
      </Link>
    </div>
  );
}