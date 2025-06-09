import { FeedPost, Comment } from "@/types";

// Mock feed posts with products in Rupiah
export const feedPosts: FeedPost[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Anisa Wijaya",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    caption: "Outfit of the day! Loving this new blouse from StyleFusion. #OOTD #StyleFusion",
    likes: 120,
    comments: 24,
    date: "2025-06-01T08:30:00Z",
    products: [
      {
        id: "8",
        name: "Atasan Coral Blouse",
        description: "Blouse warna coral dengan potongan yang flattering untuk semua bentuk tubuh.",
        price: 320000,
        image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "clothing",
        rating: 4.2,
        reviews: 45,
        brand: "StyleFusion",
        currency: "IDR"
      }
    ]
  },
  {
    id: "2",
    userId: "user2",
    userName: "Budi Santoso",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    image: "https://images.unsplash.com/photo-1596704017254-9a89b0a9f651?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    caption: "Just got this amazing blush from BeautyGlow. The color is perfect for my skin tone! #BeautyGlow #MakeupLover",
    likes: 85,
    comments: 12,
    date: "2025-06-02T10:15:00Z",
    products: [
      {
        id: "3",
        name: "Blush On Peach Perfect",
        description: "Blush on dengan warna peach yang memberikan efek natural dan segar.",
        price: 175000,
        image: "https://images.unsplash.com/photo-1596704017254-9a89b0a9f651?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "makeup",
        rating: 4.3,
        reviews: 67,
        brand: "BeautyGlow",
        currency: "IDR"
      }
    ]
  },
  {
    id: "3",
    userId: "user3",
    userName: "Citra Dewi",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    image: "https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    caption: "My skincare routine just got better with this new moisturizer from DermaCare. My skin feels so hydrated! #SkincareTips #DermaCare",
    likes: 210,
    comments: 32,
    date: "2025-06-03T15:45:00Z",
    products: [
      {
        id: "6",
        name: "Moisturizer Hydra Boost",
        description: "Pelembab ringan dengan formula hydrating untuk kulit normal hingga berminyak.",
        price: 210000,
        image: "https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "skincare",
        rating: 4.9,
        reviews: 156,
        brand: "DermaCare",
        currency: "IDR"
      }
    ]
  },
  {
    id: "4",
    userId: "user4",
    userName: "Dian Pratama",
    userAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    caption: "These new aviator glasses are perfect for my face shape! Thanks to the virtual try-on feature, I found my perfect match. #StyleTips #VisionPlus",
    likes: 95,
    comments: 18,
    date: "2025-06-04T12:20:00Z",
    products: [
      {
        id: "4",
        name: "Kacamata Frame Aviator",
        description: "Kacamata dengan frame aviator yang cocok untuk bentuk wajah hati.",
        price: 450000,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "accessories",
        rating: 4.6,
        reviews: 42,
        brand: "VisionPlus",
        currency: "IDR"
      }
    ]
  },
  {
    id: "5",
    userId: "user5",
    userName: "Eka Putri",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    caption: "These black culottes are so versatile and comfortable! Perfect for both office and casual outings. #FashionTips #StyleFusion",
    likes: 150,
    comments: 27,
    date: "2025-06-05T09:10:00Z",
    products: [
      {
        id: "9",
        name: "Celana Kulot Hitam",
        description: "Celana kulot hitam dengan bahan premium yang nyaman dipakai seharian.",
        price: 275000,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "clothing",
        rating: 4.5,
        reviews: 37,
        brand: "StyleFusion",
        currency: "IDR"
      }
    ]
  }
];

// Mock comments data
export const comments: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      postId: "1",
      userId: "user2",
      userName: "Budi Santoso",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      text: "Warna coral-nya bagus banget! Cocok sama skin tone kamu",
      date: "2025-06-01T09:15:00Z",
    },
    {
      id: "c2",
      postId: "1",
      userId: "user3",
      userName: "Citra Dewi",
      userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      text: "Dimana beli blouse-nya? Pengen yang sama!",
      date: "2025-06-01T10:30:00Z",
    }
  ],
  "2": [
    {
      id: "c3",
      postId: "2",
      userId: "user1",
      userName: "Anisa Wijaya",
      userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      text: "BeautyGlow emang the best! Aku juga pakai brand ini",
      date: "2025-06-02T11:00:00Z",
    }
  ]
};