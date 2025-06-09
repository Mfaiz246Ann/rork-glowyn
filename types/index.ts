// Product type
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
  currency?: string;
  isEditorsPick?: boolean;
}

// Category type
export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

// Collection type
export interface Collection {
  id: string;
  name: string;
  image: string;
  count: number;
}

// User type
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  followers?: number;
  following?: number;
}

// Analysis Type enum
export type AnalysisType = 'color' | 'face' | 'skin' | 'outfit';

// Analysis Result type
export interface AnalysisResult {
  id: string;
  type: AnalysisType;
  result: string;
  date: string;
  title: string;
  details?: any;
  recommendations?: Product[];
}

// Analysis API Response type - using discriminated union for better type safety
export type AnalysisResponse = 
  | {
      success: true;
      result: AnalysisResult;
    }
  | {
      success: false;
      error: string;
    };

// Feed Post type
export interface FeedPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  date: string;
  products?: Product[];
}

// Comment type
export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  date: string;
}

// Social API Response types
export type SocialPostsResponse = {
  success: true;
  posts: FeedPost[];
  nextCursor: string | null;
} | {
  success: false;
  error: string;
};

export type CommentResponse = {
  success: true;
  comment: Comment;
} | {
  success: false;
  error: string;
};

export type LikeResponse = {
  success: true;
} | {
  success: false;
  error: string;
};