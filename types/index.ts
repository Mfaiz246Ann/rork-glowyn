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
  location?: string; // Location property added
};

export type Comment = {
  id: string;
  userId: string;
  username: string;
  userImage: string;
  text: string;
  timestamp: string;
};

export type ColorSeason = 'spring' | 'summer' | 'autumn' | 'winter';
export type ColorTone = 'warm' | 'cool' | 'neutral';

export type ColorResult = {
  season: ColorSeason;
  tone: ColorTone;
  palette: string[];
  recommendations: string;
  confidence?: number;
  perfectColors?: string[];
  goodColors?: string[];
  sparinglyColors?: string[];
  makeupRecommendations?: {
    lipstick: string[];
    eyeshadow: string[];
    blush: string[];
  };
  clothingRecommendations?: {
    tops: string[];
    bottoms: string[];
    accessories: string[];
    metals: string[];
  };
};

export type FaceShape = 'oval' | 'round' | 'square' | 'heart' | 'diamond' | 'rectangle';

export type ShapeResult = {
  shape: FaceShape;
  description: string;
  confidence?: number;
  features?: {
    faceLength?: string;
    cheekbones?: string;
    jawline?: string;
    forehead?: string;
    chinShape?: string;
  };
  hairstyles: {
    name: string;
    rating: 'Perfect' | 'Excellent' | 'Great' | 'Good';
    description: string;
  }[];
  glasses: {
    name: string;
    rating: 'Perfect' | 'Excellent' | 'Great' | 'Good';
    description: string;
  }[];
  accessories: {
    name: string;
    rating: 'Perfect' | 'Excellent' | 'Great' | 'Good';
    description: string;
  }[];
};

export type SkinType = 'dry' | 'oily' | 'combination' | 'normal' | 'sensitive';

export type SkinResult = {
  type: SkinType;
  description: string;
  confidence?: number;
  concerns: string[];
  recommendations: {
    category: string;
    products: string[];
  }[];
};

export type StylePreference = 'Minimalist' | 'Casual' | 'Edgy' | 'Formal' | 'Bohemian' | 'Sporty';
export type BodyType = 'Hourglass' | 'Pear' | 'Apple' | 'Rectangle' | 'Inverted Triangle';
export type Occasion = 'Work' | 'Casual' | 'Date Night' | 'Formal Event' | 'Workout';
export type Weather = 'Hot' | 'Warm' | 'Cool' | 'Cold' | 'Rainy';

export type OutfitItem = {
  type: 'Top' | 'Bottom' | 'Outerwear' | 'Shoes' | 'Accessories';
  name: string;
  color: string;
  imageUrl?: string;
};

export type OutfitRecommendation = {
  title: string;
  matchScore: number;
  items: OutfitItem[];
  imageUrl?: string;
};

export type StylingTip = {
  title: string;
  description: string;
};

export type OutfitResult = {
  stylePreference: StylePreference;
  bodyType?: BodyType;
  occasion?: Occasion;
  weather?: Weather;
  recommendations: OutfitRecommendation[];
  tips: StylingTip[];
};