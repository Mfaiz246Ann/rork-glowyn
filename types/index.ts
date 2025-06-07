// Add or update Product type if it doesn't exist
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  brand: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  image: string;
  count: number;
}

export interface ProductCollection {
  id: string;
  name: string;
  image: string;
  count: number;
}

// Add other types as needed