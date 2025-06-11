import { z } from "zod";
import { publicProcedure } from "../../create-context";
import { Product } from "@/types";

// Mock products data with Rupiah prices
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Lipstik Coral Shine",
    description: "Lipstik dengan warna coral yang cerah dan formula tahan lama.",
    price: 189000,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "makeup",
    rating: 4.5,
    reviews: 120,
    brand: "BeautyGlow",
    currency: "IDR",
    isEditorsPick: true,
  },
  {
    id: "2",
    name: "Eyeshadow Palette Warm Tones",
    description: "Palet eyeshadow dengan 12 warna hangat yang cocok untuk kulit Asia.",
    price: 350000,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "makeup",
    rating: 4.8,
    reviews: 89,
    brand: "ColorPop",
    currency: "IDR",
  },
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
    currency: "IDR",
  },
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
    currency: "IDR",
  },
  {
    id: "5",
    name: "Anting Drop Gold",
    description: "Anting drop dengan material gold-plated yang elegan.",
    price: 225000,
    image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "accessories",
    rating: 4.7,
    reviews: 31,
    brand: "GlamAccessories",
    currency: "IDR",
    isEditorsPick: true,
  },
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
    currency: "IDR",
  },
  {
    id: "7",
    name: "Cleanser Gentle Foam",
    description: "Pembersih wajah berbusa lembut untuk semua jenis kulit.",
    price: 165000,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "skincare",
    rating: 4.4,
    reviews: 98,
    brand: "DermaCare",
    currency: "IDR",
  },
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
    currency: "IDR",
  },
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
    currency: "IDR",
    isEditorsPick: true,
  },
  {
    id: "10",
    name: "Kalung Choker Silver",
    description: "Kalung choker dengan material silver yang cocok untuk bentuk wajah hati.",
    price: 195000,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "accessories",
    rating: 4.3,
    reviews: 28,
    brand: "GlamAccessories",
    currency: "IDR",
  },
];

const getProductDetailsProcedure = publicProcedure
  .input(z.object({ productId: z.string() }))
  .query(({ input }) => {
    const { productId } = input;
    
    try {
      // Find the product by ID from our mock data
      const product = mockProducts.find((p: Product) => p.id === productId);
      
      if (!product) {
        return {
          success: false,
          error: "Product not found",
          product: null,
        };
      }
      
      return {
        success: true,
        product,
      };
    } catch (error) {
      console.error("Error in getProductDetails:", error);
      return {
        success: false,
        error: "Failed to fetch product details",
        product: null,
      };
    }
  });

export default getProductDetailsProcedure;