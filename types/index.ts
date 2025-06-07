// Define Product type to be used across the application
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

// Add other types as needed for the application
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio?: string;
  followers?: number;
  following?: number;
}

export interface AnalysisResult {
  id: string;
  userId: string;
  type: 'color' | 'face' | 'skin';
  result: string;
  date: string;
  recommendations?: string[];
}

export interface FeedPost {
  id: string;
  userId: string;
  user?: User;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  date: string;
  products?: Product[];
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user?: User;
  text: string;
  date: string;
}