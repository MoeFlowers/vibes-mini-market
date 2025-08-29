import { Product, ProductsResponse, QueryParams } from "../../../shared/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

//mock para cuando la API no esté disponible
const mockProducts: Product[] = [
  { 
    id: "p1", 
    name: "Guantes GN102", 
    price: 59.9, 
    isAvailable: true, 
    category: "gloves", 
    image: "/api/placeholder/200/200" 
  },
  { 
    id: "p2", 
    name: "Casco CS433", 
    price: 79.9, 
    isAvailable: false, 
    category: "headgear", 
    image: "/api/placeholder/200/200" 
  },
  { 
    id: "p3", 
    name: "Bolsa AC990", 
    price: 24.5, 
    isAvailable: true, 
    category: "bag", 
    image: "/api/placeholder/200/200" 
  },
  { 
    id: "p4", 
    name: "Chaqueta WP200", 
    price: 120.0, 
    isAvailable: true, 
    category: "clothing", 
    image: "/api/placeholder/200/200" 
  },
  { 
    id: "p5", 
    name: "Botas SF500", 
    price: 89.9, 
    isAvailable: true, 
    category: "footwear", 
    image: "/api/placeholder/200/200" 
  }
];


export const fetchProducts = async (
  params?: QueryParams
): Promise<ProductsResponse> => {
  const queryString = params
    ? new URLSearchParams(
        Object.entries(params)
          .filter(([_, value]) => value !== undefined && value !== "")
          .map(([key, value]) => [key, String(value)])
      ).toString()
    : "";

  const url = `${API_BASE}/api/products?${queryString}`;

  //console.log("🌐 Fetching from:", url);

  try {
    // Intentar conectar con la API real
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    //console.log("API response:", data);
    return data;
  } catch (error) {
    console.warn("⚠️ API no disponible, usando datos mock", error);

    // Fallback a datos mock con filtros aplicados
    let filteredProducts = [...mockProducts];

    // Aplicar filtros a los datos mock
    if (params?.available !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.isAvailable === params.available
      );
    }

    if (params?.search) {
      const searchTerm = params.search.toLowerCase();
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
    }

    // Aplicar ordenamiento
    if (params?.sort) {
      filteredProducts.sort((a, b) => {
        if (params.sort === "price") {
          return params.order === "desc"
            ? b.price - a.price
            : a.price - b.price;
        } else {
          return params.order === "desc"
            ? b.name.localeCompare(a.name)
            : a.name.localeCompare(b.name);
        }
      });
    }

    // Aplicar paginación
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      products: filteredProducts.slice(startIndex, endIndex),
      total: filteredProducts.length,
      page,
      limit,
      totalPages: Math.ceil(filteredProducts.length / limit),
    };
  }
};

export const fetchProduct = async (id: string): Promise<Product | undefined> => {
  const url = `${API_BASE}/api/products/${id}`;
  //console.log("Fetching product from:", url);

  try {
    // Intentar conectar con la API real
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    //console.log("Product response:", data);
    return data;
  } catch (error) {
    console.warn("⚠️ API no disponible, usando producto mock", error);
  }
};
