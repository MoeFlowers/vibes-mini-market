import { Product } from './types';

export const getTopCheapestAvailable = (products: Product[], top: number = 3): Product[] => {
  return products
    .filter(product => product.isAvailable)
    .sort((a, b) => a.price - b.price)
    .slice(0, top);
};

// Función de prueba para verificar que funciona
export const testAlgorithm = () => {
  const testProducts: Product[] = [
    { id: "1", name: "Product 1", price: 100, isAvailable: true, category: "test", image: "" },
    { id: "2", name: "Product 2", price: 50, isAvailable: true, category: "test", image: "" },
    { id: "3", name: "Product 3", price: 75, isAvailable: false, category: "test", image: "" },
    { id: "4", name: "Product 4", price: 25, isAvailable: true, category: "test", image: "" }
  ];

  const result = getTopCheapestAvailable(testProducts, 2);
  console.log('🧪 Algorithm test:', result);
  return result;
};