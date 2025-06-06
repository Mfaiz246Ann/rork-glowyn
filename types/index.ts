export type UserProfile = {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  location: string;
  profileImage: string;
  followers: number;
  following: number;
  posts: number;
};

export type AnalysisType = 'color' | 'face' | 'skin' | 'outfit';

export type AnalysisResult = {
  id: string;
  type: AnalysisType;
  title: string;
  date: string;
  result: string;
  details?: any;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: 'makeup' | 'skincare' | 'fashion' | 'accessories';
  price: number;
  currency: string;
  image: string;
  description?: string;
  rating?: number;
  isWishlisted?: boolean;
  isEditorsPick?: boolean;
};

export type Collection = {
  id: string;
  name: string;
  description?: string;
  image: string;
  subtitle?: string;
  isEditorsPick?: boolean;
};

export type FeedPost = {
  id: string;
  userId: string;
  username: string;
  userImage: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  tags: string[];
  timestamp: string;
};

export type Comment = {
  id: string;
  userId: string;
  username: string;
  userImage: string;
  text: string;
  timestamp: string;
};