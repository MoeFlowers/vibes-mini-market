import { Router, Request, Response } from 'express';
import { Product, ProductsResponse, QueryParams } from './types';
import productsData from '../data/products.json';

const router = Router();

// Helper function to filter and sort products
const getFilteredProducts = (params: QueryParams): ProductsResponse => {
  let filteredProducts: Product[] = [...productsData as Product[]];
  
  // Filter by availability
  if (params.available !== undefined) {
    filteredProducts = filteredProducts.filter(product => 
      product.isAvailable === params.available
    );
  }
  
  // Search by name
  if (params.search) {
    const searchTerm = params.search.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm)
    );
  }
  
  // Sort products
  if (params.sort) {
    const order = params.order === 'desc' ? -1 : 1;
    filteredProducts.sort((a, b) => {
      if (params.sort === 'price') {
        return (a.price - b.price) * order;
      } else {
        return a.name.localeCompare(b.name) * order;
      }
    });
  }
  
  // Pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  return {
    products: paginatedProducts,
    total: filteredProducts.length,
    page,
    limit,
    totalPages: Math.ceil(filteredProducts.length / limit)
  };
};

// GET /api/products
router.get('/', (req: Request, res: Response) => {
  try {
    const queryParams: QueryParams = {
      search: req.query.search as string,
      sort: req.query.sort as 'price' | 'name',
      order: req.query.order as 'asc' | 'desc',
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      available: req.query.available ? req.query.available === 'true' : undefined
    };
    
    const result = getFilteredProducts(queryParams);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/products/:id
router.get('/:id', (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const product = (productsData as Product[]).find(p => p.id === productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;